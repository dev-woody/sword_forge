import { useGame } from "@/store/gameStore";
import { EXCHANGE } from "@/domain/config/balance";
import { exchangeByIndex } from "@/services/exchange";

export default function ExchangePage() {
  const st = useGame();
  const rules = EXCHANGE[st.mode];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">교환소</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {rules.map((r, idx) => (
          <div key={idx} className="border rounded p-3">
            <div className="font-semibold mb-1">레시피 #{idx + 1}</div>
            <div className="text-sm">
              입력:{" "}
              {Object.entries(r.in)
                .map(([k, v]) => `${k}×${v}`)
                .join(", ")}
            </div>
            <div className="text-sm">
              출력:{" "}
              {Object.entries(r.out)
                .map(([k, v]) => `${k}×${v}`)
                .join(", ")}
            </div>
            <button
              className="mt-2 px-3 py-1 border rounded"
              onClick={() => exchangeByIndex(idx)}
            >
              교환
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
