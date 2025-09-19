export type Mode = "HARD" | "EASY";
export type MatName = string;

export interface Sword {
  id: string;
  tier: number;
  level: number;
  name?: string;
  stored: boolean;
}

export interface StageDef {
  name: string;
  costGold?: number;
  prob?: number;
  sellGold?: number | null | "-";
  protect: number | "FORBIDDEN" | "-";
  drop?: MatName | "-";
  requires?: Record<string, number>;
  note?: string;
}

// ▼ 실패 상태 추가
export interface FailureState {
  swordId: string;
  prevLevel: number;
  prevName: string;
  attemptedNext: number;
  drop?: string;
  dropCollected: boolean;
  protectNeed: number | null;
}

export interface Inventory {
  swords: Sword[];
  mats: Record<MatName, number>;
  tickets: { Protect: number };
}

export interface Stats {
  attempts: number; success: number; destroys: number; bestLevel: number;
  goldSpent: number; goldEarned: number;
}

export interface GameState {
  mode: Mode;
  gold: number;
  inv: Inventory;
  selectedSwordId?: string;
  stats: Stats;
  version: string;
  failure?: FailureState;   // ▼ 실패 오버레이 상태
}
