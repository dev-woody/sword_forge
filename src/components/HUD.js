import { jsxs as _jsxs } from "react/jsx-runtime";
import { useGame } from "@store/gameStore";
export default function HUD() {
    const { gold, stats } = useGame();
    return (_jsxs("div", { className: "text-sm", children: [_jsxs("span", { className: "font-medium", children: ["Gold: ", gold.toLocaleString()] }), _jsxs("span", { className: "ml-4", children: ["\uC131\uACF5 ", stats.success, " / \uC2DC\uB3C4 ", stats.attempts, " / \uD30C\uAD34 ", stats.destroys] }), _jsxs("span", { className: "ml-4", children: ["\uCD5C\uACE0\uAC15\uD654 +", stats.bestLevel] })] }));
}
