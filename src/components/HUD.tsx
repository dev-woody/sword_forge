import { useGame } from "@/store/gameStore";

export default function HUD() {
  const { gold, stats } = useGame();
  return (
    <div className="flex flex-col gap-1 text-sm md:flex-row md:items-center">
      <span className="font-medium">Gold: {gold.toLocaleString()}</span>
      <div>
        <span className="md:ml-4">
          성공 {stats.success} / 시도 {stats.attempts} / 파괴 {stats.destroys}
        </span>
        <span className="md:ml-4">최고강화 +{stats.bestLevel}</span>
      </div>
    </div>
  );
}
