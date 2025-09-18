// src/services/economy.ts
import { useGame } from "@store/gameStore";
import { STAGES } from "@domain/config/balance";
/** 실패창용: 실패 상태 세팅 */
function setFailureState(args) {
    const f = { ...args, dropCollected: args.dropCollected ?? false };
    useGame.getState().setFailure(f);
}
/** +0 기본 검 생성 후 자동 선택(보관 후 재시작에 사용) */
function spawnBaseAndSelect() {
    const id = crypto.randomUUID().slice(0, 8);
    const base = { id, tier: 0, level: 0, name: "낡은 단검" };
    useGame.getState().addSword(base);
    useGame.getState().selectSword(id);
    return id;
}
/** 요구 재료/검 소모 */
function hasAndConsumeRequires(req) {
    if (!req)
        return true;
    const st = useGame.getState();
    // 1) 보유 확인
    for (const [k, need] of Object.entries(req)) {
        const matQty = st.inv.mats[k];
        if (typeof matQty === "number") {
            if ((matQty ?? 0) < need)
                return false;
        }
        else {
            if (st.inv.swords.filter((sw) => sw.name === k).length < need)
                return false;
        }
    }
    // 2) 소모
    useGame.setState((s) => {
        let swords = s.inv.swords.slice();
        const mats = { ...s.inv.mats };
        for (const [k, need] of Object.entries(req)) {
            if (typeof mats[k] === "number")
                mats[k] -= need;
            else {
                let left = need;
                swords = swords.filter((sw) => (left > 0 && sw.name === k ? (left--, false) : true));
            }
        }
        return { inv: { ...s.inv, swords, mats } };
    });
    return true;
}
/** 강화 시도: 성공 시 상승, 실패 시 +0 리셋 + 실패창 오픈(줍기/복구 선택) */
export function enhanceToNext(swordId) {
    const st = useGame.getState();
    const sw = st.inv.swords.find((s) => s.id === swordId);
    if (!sw)
        return { ok: false, reason: "NO_SWORD" };
    const next = sw.level + 1;
    const stage = STAGES[st.mode][next];
    if (!stage || stage.prob === undefined)
        return { ok: false, reason: "NO_STAGE" };
    // 비용
    if (stage.costGold && !useGame.getState().spendGold(stage.costGold))
        return { ok: false, reason: "NO_GOLD" };
    // 요구물
    if (!hasAndConsumeRequires(stage.requires))
        return { ok: false, reason: "LACK_REQ" };
    // 방지권은 실패 후 복구에서 사용(사전 소모 안 함)
    // 시도
    useGame.getState().record({ attempts: st.stats.attempts + 1 });
    const success = Math.random() < stage.prob;
    if (success) {
        sw.level = next;
        sw.name = stage.name;
        useGame.getState().record({ success: st.stats.success + 1, bestLevel: sw.level });
        useGame.setState((s) => ({ inv: { ...s.inv }, failure: undefined }));
        return { ok: true, result: "SUCCESS", level: sw.level };
    }
    // 실패 처리: 드롭은 "줍기" 버튼으로 수령
    const drop = stage.drop && stage.drop !== "-" ? String(stage.drop) : undefined;
    // 통계(파괴 1카운트)
    useGame.getState().record({ destroys: st.stats.destroys + 1 });
    // 규칙: 같은 검을 +0으로 리셋
    const prevLevel = sw.level;
    const prevName = sw.name ?? "낡은 단검";
    sw.level = 0;
    sw.name = "낡은 단검";
    useGame.setState((s) => ({ inv: { ...s.inv } }));
    // 실패 오버레이 상태 저장(복구 필요 방지권 수: 숫자면 그 값, FORBIDDEN/"-"이면 null)
    const protectNeed = stage.protect !== "FORBIDDEN" && stage.protect !== "-" ? Number(stage.protect) : null;
    setFailureState({
        swordId: sw.id,
        prevLevel,
        prevName,
        attemptedNext: next,
        drop,
        protectNeed,
    });
    return { ok: true, result: "RESET_TO_ZERO_AND_FAIL_MODAL" };
}
/** 실패창: 드롭 아이템 줍기 */
export function collectFailureDrop() {
    const st = useGame.getState();
    const f = st.failure;
    if (!f || !f.drop || f.dropCollected)
        return { ok: false, reason: "NO_DROP" };
    useGame.getState().addMat(f.drop, 1);
    useGame.getState().setFailure({ ...f, dropCollected: true });
    return { ok: true, item: f.drop };
}
/** 실패창: 방지권으로 복구(실패 직전 상태로 되돌림) */
export function restoreFromFailure() {
    const st = useGame.getState();
    const f = st.failure;
    if (!f)
        return { ok: false, reason: "NO_FAILURE" };
    if (f.protectNeed == null)
        return { ok: false, reason: "FORBIDDEN" };
    const have = st.inv.tickets.Protect ?? 0;
    if (have < f.protectNeed)
        return { ok: false, reason: "NO_PROTECT" };
    // 방지권 차감
    useGame.setState((s) => ({
        inv: {
            ...s.inv,
            tickets: { ...s.inv.tickets, Protect: s.inv.tickets.Protect - f.protectNeed },
        },
    }));
    // 검을 실패 직전 상태로 복구
    const sw = useGame.getState().inv.swords.find((x) => x.id === f.swordId);
    if (!sw)
        return { ok: false, reason: "NO_SWORD" };
    sw.level = f.prevLevel;
    sw.name = f.prevName;
    useGame.setState((s) => ({ inv: { ...s.inv } }));
    // 복구 완료: 추가 복구 방지
    useGame.getState().setFailure({ ...f, protectNeed: null });
    return { ok: true, result: "RESTORED" };
}
/** 실패창 닫기 */
export function closeFailure() {
    useGame.getState().setFailure(undefined);
    return { ok: true };
}
/** 판매: 골드 획득 후 같은 검을 +0으로 리셋 (아이템창에는 보관하지 않음) */
export function sellSword(swordId) {
    const st = useGame.getState();
    const sw = st.inv.swords.find((s) => s.id === swordId);
    if (!sw)
        return { ok: false, reason: "NO_SWORD" };
    const stage = STAGES[st.mode][sw.level];
    const price = stage?.sellGold ?? null;
    if (price === null || price === "-")
        return { ok: false, reason: "NO_PRICE" };
    useGame.getState().addGold(price);
    // 규칙: 판매 후 최하단계로 즉시 리셋(검은 유지, 보관 아님)
    sw.level = 0;
    sw.name = "낡은 단검";
    useGame.setState((s) => ({ inv: { ...s.inv }, failure: undefined }));
    return { ok: true, result: "SOLD_AND_RESET", gold: price };
}
/** 보관하고 재시작(+0): 현재 검을 그대로 두고, 새 +0을 생성해 그쪽으로 플레이 전환 */
export function storeAndRestart() {
    const newId = spawnBaseAndSelect();
    return { ok: true, result: "STORED_AND_NEW_BASE_SELECTED", newId };
}
