import { useGame } from "@/store/gameStore";
import { SHOP_PRICE, WARP_PROB } from "@/domain/config/balance";

const WARP_NAME = { "+9":"타우 스워드", "+13":"불꽃 마검", "+14":"마검 아포피스", "+15":"데몬 배틀 엑스" } as const;

export function buyProtect(count:1|3){
  const st = useGame.getState();
  const price = count===1 ? SHOP_PRICE[st.mode].PROTECT_1 : SHOP_PRICE[st.mode].PROTECT_3;
  if (!useGame.getState().spendGold(price)) return { ok:false, reason:"NO_GOLD" };
  useGame.getState().addProtect(count);
  return { ok:true };
}

export function buyWarp(kind:"+9"|"+13"|"+14"|"+15"){
  const st = useGame.getState();
  const price = kind==="+9" ? SHOP_PRICE[st.mode].WARP_9
              : kind==="+13"? SHOP_PRICE[st.mode].WARP_13
              : kind==="+14"? SHOP_PRICE[st.mode].WARP_14
              : SHOP_PRICE[st.mode].WARP_15;
  if (!useGame.getState().spendGold(price)) return { ok:false, reason:"NO_GOLD" };

  if (Math.random() < WARP_PROB[kind]){
    const lv = parseInt(kind.slice(1),10);
    const sword = { id: crypto.randomUUID().slice(0,8), tier:0, level:lv, name: WARP_NAME[kind] };
    useGame.getState().addSword(sword);
    return { ok:true, result:"WARP_OK" };
  }
  return { ok:true, result:"WARP_FAIL" };
}
