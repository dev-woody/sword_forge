import { useGame } from "@store/gameStore";

export default function HUD() {
  const { gold, stats } = useGame();
  return (
    <div className="text-sm">
      <span className="font-medium">Gold: {gold.toLocaleString()}</span>
      <span className="ml-4">
        성공 {stats.success} / 시도 {stats.attempts} / 파괴 {stats.destroys}
      </span>
      <span className="ml-4">최고강화 +{stats.bestLevel}</span>
    </div>
  );
}
