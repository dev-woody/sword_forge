import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGame } from "@store/gameStore";
import SwordCard from "@components/SwordCard";
export default function InventoryPage() {
    const swords = useGame((s) => s.inv.swords);
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold mb-3", children: "\uC544\uC774\uD15C \uCC3D" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: swords.map((s) => (_jsx(SwordCard, { id: s.id }, s.id))) })] }));
}
