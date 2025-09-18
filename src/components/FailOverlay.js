import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGame } from "@store/gameStore";
import { collectFailureDrop, restoreFromFailure, closeFailure, } from "@services/economy";
export default function FailOverlay() {
    const st = useGame();
    const f = st.failure;
    const protectHave = st.inv.tickets.Protect ?? 0;
    if (!f)
        return null;
    const onRetry = () => {
        closeFailure();
    };
    const onRestore = () => {
        const r = restoreFromFailure();
        if (!r.ok) {
            alert(r.reason === "NO_PROTECT"
                ? "방지권이 부족합니다."
                : r.reason === "FORBIDDEN"
                    ? "이 단계는 방지권 복구가 불가합니다."
                    : "복구할 수 없습니다.");
            return;
        }
    };
    const onPickup = () => {
        const r = collectFailureDrop();
        if (!r.ok)
            return;
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/40 z-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg w-full max-w-md p-5", children: [_jsx("div", { className: "text-lg font-bold mb-2", children: "\uAC15\uD654 \uC2E4\uD328" }), _jsx("div", { className: "mb-3", children: "\uAC15\uD654\uC5D0 \uC2E4\uD328\uD558\uC5EC \uAC80\uC774 \uD30C\uAD34\uB418\uC5C8\uC2B5\uB2C8\uB2E4 ." }), _jsxs("div", { className: "text-sm text-gray-700 space-y-1 mb-4", children: [_jsxs("div", { children: ["\uC2E4\uD328 \uB77C\uC6B4\uB4DC: +", f.prevLevel, " \u2192 +", f.attemptedNext, " \uC2DC\uB3C4"] }), f.drop && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { children: ["\uB4DC\uB86D \uC544\uC774\uD15C: ", f.drop, " ", f.dropCollected ? "(획득 완료)" : ""] }), !f.dropCollected && (_jsx("button", { className: "px-2 py-1 border rounded", onClick: onPickup, children: "\uC90D\uAE30" }))] }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("button", { className: "px-3 py-2 border rounded", onClick: onRetry, children: "\uB2E4\uC2DC \uAC15\uD654\uD558\uAE30" }), _jsxs("button", { className: "px-3 py-2 border rounded disabled:opacity-50", onClick: onRestore, disabled: f.protectNeed == null, title: f.protectNeed == null ? "복구 불가 단계" : "", children: ["\uBC29\uC9C0\uAD8C\uC73C\uB85C \uBCF5\uAD6C\uD558\uAE30", f.protectNeed != null ? ` (${f.protectNeed}개)` : ""] })] }), _jsxs("div", { className: "mt-3 text-sm flex justify-end gap-4 text-gray-700", children: [_jsxs("div", { children: ["\uBC29\uC9C0\uAD8C: ", protectHave, "\uAC1C"] }), _jsxs("div", { children: ["Gold: ", st.gold.toLocaleString()] })] })] }) }));
}
