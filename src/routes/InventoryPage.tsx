import { useGame } from "@store/gameStore";
import SwordCard from "@components/SwordCard";

export default function InventoryPage() {
  const swords = useGame((s) => s.inv.swords);
  return (
    <div>
      <h2 className="text-lg font-bold mb-3">아이템 창</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {swords.map((s) => (
          <SwordCard key={s.id} id={s.id} />
        ))}
      </div>
    </div>
  );
}
