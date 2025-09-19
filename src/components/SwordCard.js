import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGame } from "@store/gameStore";
export default function SwordCard({ id }) {
    const st = useGame();
    const sw = st.inv.swords.find((s) => s.id === id);
    if (!sw)
        return null;
    const selected = st.selectedSwordId === id;
    return (_jsx("div", { className: `border rounded p-3 ${selected ? "ring-2 ring-blue-500" : ""}`, children: _jsx("div", { className: "flex justify-between items-center", children: _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: sw.name ?? "미상" }), _jsxs("div", { className: "text-sm", children: ["\uB808\uBCA8 +", sw.level] })] }) }) }));
}
