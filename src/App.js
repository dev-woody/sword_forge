import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import EnhancePage from "@routes/EnhancePage";
import InventoryPage from "@routes/InventoryPage";
import JunkyardPage from "@routes/JunkyardPage";
import ExchangePage from "@routes/ExchangePage";
import ShopPage from "@routes/ShopPage";
import HUD from "@components/HUD";
export default function App() {
    const nav = "px-3 py-2 rounded hover:bg-gray-200";
    const active = ({ isActive }) => isActive ? nav + " bg-gray-200" : nav;
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 text-gray-900", children: [_jsx("header", { className: "border-b bg-white", children: _jsxs("div", { className: "max-w-5xl mx-auto p-3 flex items-center justify-between", children: [_jsx(Link, { to: "/", className: "font-bold", children: "Sword Forge" }), _jsxs("nav", { className: "flex gap-2", children: [_jsx(NavLink, { to: "/", className: active, children: "\uAC15\uD654" }), _jsx(NavLink, { to: "/inventory", className: active, children: "\uC544\uC774\uD15C \uCC3D" }), _jsx(NavLink, { to: "/junkyard", className: active, children: "\uC7A1\uD15C \uBCF4\uAD00\uC18C" }), _jsx(NavLink, { to: "/exchange", className: active, children: "\uAD50\uD658\uC18C" }), _jsx(NavLink, { to: "/shop", className: active, children: "\uC0C1\uC810" })] }), _jsx(HUD, {})] }) }), _jsx("main", { className: "max-w-5xl mx-auto p-4", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(EnhancePage, {}) }), _jsx(Route, { path: "/inventory", element: _jsx(InventoryPage, {}) }), _jsx(Route, { path: "/junkyard", element: _jsx(JunkyardPage, {}) }), _jsx(Route, { path: "/exchange", element: _jsx(ExchangePage, {}) }), _jsx(Route, { path: "/shop", element: _jsx(ShopPage, {}) })] }) })] }));
}
