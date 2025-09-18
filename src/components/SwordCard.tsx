import { useGame } from "@store/gameStore";
import { sellSword } from "@services/economy";

export default function SwordCard({ id }: { id: string }) {
  const st = useGame();
  const sw = st.inv.swords.find((s) => s.id === id);
  if (!sw) return null;
  const selected = st.selectedSwordId === id;

  return (
    <div
      className={`border rounded p-3 ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{sw.name ?? "미상"}</div>
          <div className="text-sm">레벨 +{sw.level}</div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 border rounded"
            onClick={() => st.selectSword(id)}
          >
            선택
          </button>
          <button
            className="px-2 py-1 border rounded"
            onClick={() => sellSword(id)}
          >
            판매
          </button>
        </div>
      </div>
    </div>
  );
}
