import { useGame } from "@store/gameStore";

export default function JunkyardPage() {
  const mats = useGame((s) => s.inv.mats);
  const stats = useGame((s) => s.stats);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">잡템 보관소</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-1">재료</th>
            <th className="text-right p-1">수량</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(mats).map(([k, v]) => (
            <tr key={k} className="border-b">
              <td className="p-1">{k}</td>
              <td className="p-1 text-right">{v}</td>
            </tr>
          ))}
          {Object.keys(mats).length === 0 && (
            <tr>
              <td className="p-2 text-gray-500" colSpan={2}>
                획득한 재료가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="text-sm text-gray-700">누적 파괴: {stats.destroys}회</div>
    </div>
  );
}
