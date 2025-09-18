import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGame } from "@store/gameStore";
import { SHOP_PRICE } from "@domain/config/balance";
import { buyProtect, buyWarp } from "@services/shop";
export default function ShopPage() {
    const st = useGame();
    const price = SHOP_PRICE[st.mode];
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-bold", children: "\uC0C1\uC810" }), _jsxs("div", { children: ["Gold: ", st.gold.toLocaleString()] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-3", children: [_jsxs("div", { className: "border rounded p-3", children: [_jsx("div", { className: "font-semibold mb-2", children: "\uC6CC\uD504\uAD8C" }), [
                                ["+9", price.WARP_9],
                                ["+13", price.WARP_13],
                                ["+14", price.WARP_14],
                                ["+15", price.WARP_15],
                            ].map(([k, p]) => (_jsxs("button", { className: "block w-full text-left px-3 py-1 border rounded mb-2", onClick: () => buyWarp(k), children: [k, "\uAC15 \uC6CC\uD504\uAD8C \uAD6C\uB9E4 (", p.toLocaleString(), ")"] }, k)))] }), _jsxs("div", { className: "border rounded p-3", children: [_jsx("div", { className: "font-semibold mb-2", children: "\uAE68\uC9D0 \uBC29\uC9C0\uAD8C" }), _jsxs("div", { className: "text-sm mb-2", children: ["\uBCF4\uC720: ", st.inv.tickets.Protect] }), _jsxs("button", { className: "block w-full text-left px-3 py-1 border rounded mb-2", onClick: () => buyProtect(1), children: ["\uBC29\uC9C0\uAD8C 1\uAC1C (", price.PROTECT_1.toLocaleString(), ")"] }), _jsxs("button", { className: "block w-full text-left px-3 py-1 border rounded", onClick: () => buyProtect(3), children: ["\uBC29\uC9C0\uAD8C 3\uAC1C (", price.PROTECT_3.toLocaleString(), ")"] })] })] })] }));
}
