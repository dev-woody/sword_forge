import { useGame } from "@/store/gameStore";
import { EXCHANGE } from "@/domain/config/balance";

export function exchangeByIndex(idx:number){
  const st = useGame.getState();
  const rule = EXCHANGE[st.mode][idx];
  if (!rule) return { ok:false, reason:"NO_RULE" };

  // 보유 확인
  for (const [k,v] of Object.entries(rule.in)){
    const isMat = typeof (st.inv.mats[k as any]) === "number";
    if (isMat){
      if ((st.inv.mats[k as any] ?? 0) < v) return { ok:false, reason:"LACK_MAT" };
    } else {
      const have = st.inv.swords.filter(sw=>sw.name===k).length;
      if (have < v) return { ok:false, reason:"LACK_SWORD" };
    }
  }
  // 소모
  useGame.setState(s=>{
    let swords = s.inv.swords.slice();
    const mats = { ...s.inv.mats };
    for (const [k,v] of Object.entries(rule.in)){
      if (typeof mats[k as any] === "number") mats[k as any] -= v;
      else {
        let left = v;
        swords = swords.filter(sw=>{
          if (left>0 && sw.name===k){ left--; return false; }
          return true;
        });
      }
    }
    return { inv:{...s.inv, swords, mats } };
  });

  // 산출
  for (const [k,v] of Object.entries(rule.out)){
    if (k==="깨짐 방지권"){ useGame.getState().addProtect(v); continue; }
    if (k.startsWith("+")){
      const m = k.match(/^\+(\d+)강\s*(.+)$/);
      if (m){
        const lv = parseInt(m[1],10), nm = m[2];
        for (let i=0;i<v;i++) useGame.getState().addSword({ id:crypto.randomUUID().slice(0,8), tier:0, level:lv, name:nm });
        continue;
      }
    }
    // 일반명 아이템을 "레벨0 검"으로 추가(필요 시 개별 로직 분기)
    for (let i=0;i<v;i++) useGame.getState().addSword({ id:crypto.randomUUID().slice(0,8), tier:0, level:0, name:k });
  }
  return { ok:true };
}
