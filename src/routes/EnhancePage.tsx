// src/routes/EnhancePage.tsx
import { useGame } from "@store/gameStore";
import { STAGES } from "@domain/config/balance";
import { enhanceToNext, sellSword, storeAndRestart } from "@services/economy";
import { Link } from "react-router-dom";
import SwordCard from "@components/SwordCard";
import FailOverlay from "@components/FailOverlay";

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
            <div className="grid grid-cols-3 gap-2">
              <button
                className="px-3 py-2 border rounded"
                onClick={() => sw && enhanceToNext(sw.id)}
              >
                강화 시도
              </button>
              <button
                className="px-3 py-2 border rounded"
                onClick={() => storeAndRestart()}
              >
                보관하고 재시작(+0)
              </button>
              <button
                className="px-3 py-2 border rounded"
                onClick={() => sw && sellSword(sw.id)}
              >
                판매하고 재시작(+0)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
