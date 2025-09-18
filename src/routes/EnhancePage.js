import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/routes/EnhancePage.tsx
import { useGame } from "@store/gameStore";
import { STAGES } from "@domain/config/balance";
import { enhanceToNext, sellSword, storeAndRestart } from "@services/economy";
import { Link } from "react-router-dom";
import SwordCard from "@components/SwordCard";
import FailOverlay from "@components/FailOverlay";
export default function EnhancePage() {
    const st = useGame();
    const sw = st.inv.swords.find((s) => s.id === st.selectedSwordId);
    const stage = sw ? STAGES[st.mode][sw.level + 1] : undefined;
    const isFail = !!st.failure;
    if (isFail) {
        return (_jsx("div", { className: "space-y-4", children: _jsx(FailOverlay, {}) }));
    }
    const protectHave = st.inv.tickets.Protect ?? 0;
    const protectNeed = stage && stage.protect !== "FORBIDDEN" && stage.protect !== "-"
        ? Number(stage.protect)
        : 0;
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "flex gap-2", children: [sw?.level === 0 && (_jsx(Link, { className: "px-3 py-1 border rounded", to: "/inventory", children: "\uC778\uBCA4\uD1A0\uB9AC" })), sw && sw.level >= 1 && (_jsx(Link, { className: "px-3 py-1 border rounded", to: "/exchange", children: "\uAD50\uD658\uC18C" }))] }), _jsx("div", { children: sw?.level === 0 && (_jsx(Link, { className: "px-3 py-1 border rounded", to: "/shop", children: "\uC0C1\uC810" })) })] }), _jsx("h2", { className: "text-lg font-bold", children: "\uD65C\uC131 \uAC80" }), sw ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: _jsx(SwordCard, { id: sw.id }) })) : (_jsx("div", { className: "text-gray-500", children: "\uC120\uD0DD\uB41C \uAC80\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })), _jsxs("div", { className: "border rounded p-3 space-y-2", children: [_jsx("h3", { className: "font-semibold", children: "\uAC15\uD654" }), !sw && _jsx("div", { className: "text-gray-500", children: "\uAC15\uD654\uD560 \uAC80\uC744 \uC120\uD0DD\uD558\uC2ED\uC2DC\uC624." }), sw && (_jsxs(_Fragment, { children: [_jsxs("div", { children: ["\uC120\uD0DD: ", sw.name ?? "미상", " / +", sw.level] }), stage ? (_jsxs("div", { className: "text-sm text-gray-700", children: ["\uB2E4\uC74C \uB2E8\uACC4: ", stage.name, " / \uBE44\uC6A9 ", stage.costGold ?? 0, " / \uD655\uB960", " ", (stage.prob * 100).toFixed(1), "% / \uBC29\uC9C0\uAD8C \uD544\uC694", " ", stage.protect === "FORBIDDEN" || stage.protect === "-"
                                        ? String(stage.protect)
                                        : `${protectNeed}개`, "  ", "\uFF5C \uBCF4\uC720 ", protectHave, "\uAC1C \uFF5C Gold ", st.gold.toLocaleString()] })) : (_jsx("div", { className: "text-sm text-gray-700", children: "\uCD5C\uC885 \uB2E8\uACC4\uC785\uB2C8\uB2E4." })), _jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsx("button", { className: "px-3 py-2 border rounded", onClick: () => sw && enhanceToNext(sw.id), children: "\uAC15\uD654 \uC2DC\uB3C4" }), _jsx("button", { className: "px-3 py-2 border rounded", onClick: () => storeAndRestart(), children: "\uBCF4\uAD00\uD558\uACE0 \uC7AC\uC2DC\uC791(+0)" }), _jsx("button", { className: "px-3 py-2 border rounded", onClick: () => sw && sellSword(sw.id), children: "\uD310\uB9E4\uD558\uACE0 \uC7AC\uC2DC\uC791(+0)" })] })] }))] })] }));
}
