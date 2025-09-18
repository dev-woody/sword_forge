import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGame } from "@store/gameStore";
import { EXCHANGE } from "@domain/config/balance";
import { exchangeByIndex } from "@services/exchange";
export default function ExchangePage() {
    const st = useGame();
    const rules = EXCHANGE[st.mode];
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-bold", children: "\uAD50\uD658\uC18C" }), _jsx("div", { className: "grid md:grid-cols-2 gap-3", children: rules.map((r, idx) => (_jsxs("div", { className: "border rounded p-3", children: [_jsxs("div", { className: "font-semibold mb-1", children: ["\uB808\uC2DC\uD53C #", idx + 1] }), _jsxs("div", { className: "text-sm", children: ["\uC785\uB825:", " ", Object.entries(r.in)
                                    .map(([k, v]) => `${k}×${v}`)
                                    .join(", ")] }), _jsxs("div", { className: "text-sm", children: ["\uCD9C\uB825:", " ", Object.entries(r.out)
                                    .map(([k, v]) => `${k}×${v}`)
                                    .join(", ")] }), _jsx("button", { className: "mt-2 px-3 py-1 border rounded", onClick: () => exchangeByIndex(idx), children: "\uAD50\uD658" })] }, idx))) })] }));
}
