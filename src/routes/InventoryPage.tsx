// src/routes/InventoryPage.tsx
import { useMemo } from "react";
import { useGame } from "@/store/gameStore";
import SwordCard from "@/components/SwordCard";

// 1) selector는 "순수한 참조"만 반환(필터 금지)
const selectSwords = (s: ReturnType<typeof useGame.getState>) => s.inv.swords;

export default function InventoryPage() {
  // 2) 스토어 구독은 참조 안정 slice만
  const swords = useGame(selectSwords);

  // 3) 필터링은 렌더 단계에서 메모
  const storedSwords = useMemo(
    () => swords.filter((sw) => sw.stored),
    [swords]
  );

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">아이템 창</h2>

      {storedSwords.length === 0 ? (
        <div className="text-gray-500 text-sm">보관한 검이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {storedSwords.map((s) => (
            <SwordCard key={s.id} id={s.id} />
          ))}
        </div>
      )}
    </div>
  );
}
