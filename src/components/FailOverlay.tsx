import { useGame } from "@store/gameStore";
import {
  collectFailureDrop,
  restoreFromFailure,
  closeFailure,
} from "@services/economy";

export default function FailOverlay() {
  const st = useGame();
  const f = st.failure;
  const protectHave = st.inv.tickets.Protect ?? 0;
  if (!f) return null;

  const onRetry = () => {
    closeFailure();
  };

  const onRestore = () => {
    const r = restoreFromFailure();
    if (!r.ok) {
      alert(
        r.reason === "NO_PROTECT"
          ? "방지권이 부족합니다."
          : r.reason === "FORBIDDEN"
          ? "이 단계는 방지권 복구가 불가합니다."
          : "복구할 수 없습니다."
      );
      return;
    }
  };

  const onPickup = () => {
    const r = collectFailureDrop();
    if (!r.ok) return;
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5">
        <div className="text-lg font-bold mb-2">강화 실패</div>
        <div className="mb-3">강화에 실패하여 검이 파괴되었습니다 .</div>

        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <div>
            실패 라운드: +{f.prevLevel} → +{f.attemptedNext} 시도
          </div>
          {f.drop && (
            <div className="flex items-center justify-between">
              <span>
                드롭 아이템: {f.drop} {f.dropCollected ? "(획득 완료)" : ""}
              </span>
              {!f.dropCollected && (
                <button className="px-2 py-1 border rounded" onClick={onPickup}>
                  줍기
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 border rounded" onClick={onRetry}>
            다시 강화하기
          </button>
          <button
            className="px-3 py-2 border rounded disabled:opacity-50"
            onClick={onRestore}
            disabled={f.protectNeed == null}
            title={f.protectNeed == null ? "복구 불가 단계" : ""}
          >
            방지권으로 복구하기
            {f.protectNeed != null ? ` (${f.protectNeed}개)` : ""}
          </button>
        </div>

        <div className="mt-3 text-sm flex justify-end gap-4 text-gray-700">
          <div>방지권: {protectHave}개</div>
          <div>Gold: {st.gold.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
