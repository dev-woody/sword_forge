import { useGame } from "@/store/gameStore";
import { SHOP_PRICE } from "@/domain/config/balance";
import { buyProtect, buyWarp } from "@/services/shop";

export default function ShopPage() {
  const st = useGame();
  const price = SHOP_PRICE[st.mode];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">상점</h2>
      <div>Gold: {st.gold.toLocaleString()}</div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="border rounded p-3">
          <div className="font-semibold mb-2">워프권</div>
          {(
            [
              ["+9", price.WARP_9],
              ["+13", price.WARP_13],
              ["+14", price.WARP_14],
              ["+15", price.WARP_15],
            ] as const
          ).map(([k, p]) => (
            <button
              key={k}
              className="block w-full text-left px-3 py-1 border rounded mb-2"
              onClick={() => buyWarp(k as any)}
            >
              {k}강 워프권 구매 ({p.toLocaleString()})
            </button>
          ))}
        </div>

        <div className="border rounded p-3">
          <div className="font-semibold mb-2">깨짐 방지권</div>
          <div className="text-sm mb-2">보유: {st.inv.tickets.Protect}</div>
          <button
            className="block w-full text-left px-3 py-1 border rounded mb-2"
            onClick={() => buyProtect(1)}
          >
            방지권 1개 ({price.PROTECT_1.toLocaleString()})
          </button>
          <button
            className="block w-full text-left px-3 py-1 border rounded"
            onClick={() => buyProtect(3)}
          >
            방지권 3개 ({price.PROTECT_3.toLocaleString()})
          </button>
        </div>
      </div>
    </div>
  );
}
