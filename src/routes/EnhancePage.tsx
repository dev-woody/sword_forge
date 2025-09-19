// src/routes/EnhancePage.tsx
import { useGame } from "@/store/gameStore";
import { STAGES } from "@/domain/config/balance";
import { enhanceToNext, sellSword, storeAndRestart } from "@/services/economy";
import { Link } from "react-router-dom";
import SwordCard from "@/components/SwordCard";
import FailOverlay from "@/components/FailOverlay";

export default function EnhancePage() {
  const st = useGame();
  const sw = st.inv.swords.find((s) => s.id === st.selectedSwordId);
  const stage = sw ? STAGES[st.mode][sw.level + 1] : undefined;
  const isFail = !!st.failure;

  if (isFail) {
    return (
      <div className="space-y-4">
        <FailOverlay />
      </div>
    );
  }

  // 보관 가능 여부: 현재 검 이름이 향후 단계 requires에 포함되는가
  const canStore = (() => {
    if (!sw?.name) return false;
    const stages = STAGES[st.mode];
    for (const [lvlStr, info] of Object.entries(stages)) {
      const lvl = Number(lvlStr);
      if (!Number.isFinite(lvl)) continue;
      if (lvl <= (sw.level ?? 0)) continue; // 현재 레벨보다 높은 단계만 검사
      const req = (info as any)?.requires as Record<string, number> | undefined;
      if (req && req[sw.name] && req[sw.name] > 0) return true;
    }
    return false;
  })();

  const protectHave = st.inv.tickets.Protect ?? 0;
  const protectNeed =
    stage && stage.protect !== "FORBIDDEN" && stage.protect !== "-"
      ? Number(stage.protect)
      : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {sw?.level === 0 && (
            <Link className="px-3 py-1 border rounded" to="/inventory">
              인벤토리
            </Link>
          )}
          {sw && sw.level >= 1 && (
            <Link className="px-3 py-1 border rounded" to="/exchange">
              교환소
            </Link>
          )}
        </div>
        <div>
          {sw?.level === 0 && (
            <Link className="px-3 py-1 border rounded" to="/shop">
              상점
            </Link>
          )}
        </div>
      </div>

      <h2 className="text-lg font-bold">활성 검</h2>
      {sw ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SwordCard id={sw.id} />
        </div>
      ) : (
        <div className="text-gray-500">선택된 검이 없습니다.</div>
      )}

      <div className="border rounded p-3 space-y-2">
        <h3 className="font-semibold">강화</h3>
        {!sw && <div className="text-gray-500">강화할 검을 선택하십시오.</div>}
        {sw && (
          <>
            <div>
              선택: {sw.name ?? "미상"} / +{sw.level}
            </div>
            {stage ? (
              <div className="text-sm text-gray-700">
                다음 단계: {stage.name} / 비용 {stage.costGold ?? 0} / 확률{" "}
                {(stage.prob! * 100).toFixed(1)}% / 방지권 필요{" "}
                {stage.protect === "FORBIDDEN" || stage.protect === "-"
                  ? String(stage.protect)
                  : `${protectNeed}개`}
                {"  "}｜ 보유 {protectHave}개 ｜ Gold {st.gold.toLocaleString()}
              </div>
            ) : (
              <div className="text-sm text-gray-700">최종 단계입니다.</div>
            )}

            {!canStore && (
              <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                보관 불가: 해당 검은 이후 단계의 재료로 사용되지 않습니다.
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              <button
                className="px-3 py-2 border rounded"
                onClick={() => sw && enhanceToNext(sw.id)}
              >
                강화 시도
              </button>

              <button
                className="px-3 py-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!canStore}
                onClick={() => {
                  if (!canStore) return;
                  storeAndRestart();
                }}
                title={
                  canStore
                    ? ""
                    : "이후 단계 재료가 아닌 검은 보관할 수 없습니다."
                }
              >
                보관하기
              </button>

              <button
                className="px-3 py-2 border rounded"
                onClick={() => sw && sellSword(sw.id)}
              >
                판매하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
