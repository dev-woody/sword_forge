import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGame } from "@store/gameStore";
export default function JunkyardPage() {
    const mats = useGame((s) => s.inv.mats);
    const stats = useGame((s) => s.stats);
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-bold", children: "\uC7A1\uD15C \uBCF4\uAD00\uC18C" }), _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "text-left p-1", children: "\uC7AC\uB8CC" }), _jsx("th", { className: "text-right p-1", children: "\uC218\uB7C9" })] }) }), _jsxs("tbody", { children: [Object.entries(mats).map(([k, v]) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-1", children: k }), _jsx("td", { className: "p-1 text-right", children: v })] }, k))), Object.keys(mats).length === 0 && (_jsx("tr", { children: _jsx("td", { className: "p-2 text-gray-500", colSpan: 2, children: "\uD68D\uB4DD\uD55C \uC7AC\uB8CC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) }))] })] }), _jsxs("div", { className: "text-sm text-gray-700", children: ["\uB204\uC801 \uD30C\uAD34: ", stats.destroys, "\uD68C"] })] }));
}
