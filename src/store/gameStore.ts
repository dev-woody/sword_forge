// src/store/gameStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GameState, Sword, Mode, MatName, FailureState } from "@domain/types";
import { BALANCE_VERSION, MODE } from "@domain/config/balance";

// 모드별 시작 골드
const START_GOLD: Record<Mode, number> = {
  HARD: 2_000_000,
  EASY: 1_000_000,
};

// +0 기본 검 생성
const mkBase = (): Sword => ({
  id: crypto.randomUUID().slice(0, 8),
  tier: 0,
  level: 0,
  name: "낡은 단검",
});

// 모드별 초기 상태 생성 (reset/migrate에서 공통 사용)
const makeInitialState = (mode: Mode): GameState => {
  const base = mkBase();
  return {
    mode,
    gold: START_GOLD[mode],
    inv: {
      swords: [base],
      mats: {},
      tickets: { Protect: 0 },
    },
    selectedSwordId: base.id,
    stats: { attempts: 0, success: 0, destroys: 0, bestLevel: 0, goldSpent: 0, goldEarned: 0 },
    version: BALANCE_VERSION,
    failure: undefined, // 실패 오버레이 상태
  };
};

type A = {
  // 라이프사이클
  reset: () => void;
  setMode: (m: Mode) => void;             // 모드만 변경(상태 유지)
  setModeAndReset: (m: Mode) => void;     // 모드 변경 + 초기화(시작 골드/+0 재시작)

  // 선택/자원
  selectSword: (id?: string) => void;
  addGold: (n: number) => void;
  spendGold: (n: number) => boolean;

  // 인벤토리
  addSword: (s: Sword) => void;
  removeSword: (id: string) => void;
  addMat: (name: MatName, n: number) => void;
  addProtect: (n: number) => void;

  // 통계
  record: (p: Partial<GameState["stats"]>) => void;

  // 실패 오버레이
  setFailure: (f?: FailureState) => void;
};

export const useGame = create<GameState & A>()(
  persist(
    (set, get) => ({
      ...makeInitialState(MODE),

      // 현재 모드 기준으로 전체 초기화
      reset: () => set((s) => makeInitialState(s.mode)),

      // 모드만 변경(진행 중 자원/검 유지)
      setMode: (m) => set(() => ({ mode: m })),

      // 모드 변경 + 즉시 초기화(시작 골드/+0 검 적용)
      setModeAndReset: (m) => set(() => makeInitialState(m)),

      selectSword: (id) => set(() => ({ selectedSwordId: id })),

      addGold: (n) =>
        set((s) => ({
          gold: s.gold + n,
          stats: { ...s.stats, goldEarned: s.stats.goldEarned + (n > 0 ? n : 0) },
        })),

      spendGold: (n) => {
        const s = get();
        if (s.gold < n) return false;
        set({
          gold: s.gold - n,
          stats: { ...s.stats, goldSpent: s.stats.goldSpent + n },
        });
        return true;
      },

      addSword: (sw) => set((s) => ({ inv: { ...s.inv, swords: [...s.inv.swords, sw] } })),
      removeSword: (id) =>
        set((s) => ({
          inv: { ...s.inv, swords: s.inv.swords.filter((x) => x.id !== id) },
          selectedSwordId: s.selectedSwordId === id ? undefined : s.selectedSwordId,
        })),

      addMat: (name, n) =>
        set((s) => ({
          inv: { ...s.inv, mats: { ...s.inv.mats, [name]: (s.inv.mats[name] ?? 0) + n } },
        })),

      addProtect: (n) =>
        set((s) => ({
          inv: { ...s.inv, tickets: { ...s.inv.tickets, Protect: s.inv.tickets.Protect + n } },
        })),

      record: (p) =>
        set((s) => ({
          stats: {
            ...s.stats,
            ...p,
            bestLevel: Math.max(s.stats.bestLevel, p.bestLevel ?? s.stats.bestLevel),
          },
        })),

      setFailure: (f) => set(() => ({ failure: f })),
    }),
    {
      name: "sword-forge",
      storage: createJSONStorage(() => localStorage),
      version: 4, // 마이그레이션 시 실패 상태 초기화를 위해 상향
      // 밸런스 버전 변경 시, 기존 저장을 현재(또는 저장에 있던) 모드 기준으로 초기화
      migrate: (persisted: any) => {
        const mode: Mode =
          persisted?.mode === "HARD" || persisted?.mode === "EASY" ? persisted.mode : MODE;

        // 저장 없음 → 초기 상태
        if (!persisted) return makeInitialState(mode);

        // 밸런스 버전이 바뀌면 초기화
        if (persisted.version !== BALANCE_VERSION) return makeInitialState(mode);

        // 실패 오버레이 필드가 없을 수 있으므로 보정
        return { ...persisted, failure: persisted.failure ?? undefined } as GameState;
      },
    }
  )
);
