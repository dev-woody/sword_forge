import { Link, NavLink, Route, Routes } from "react-router-dom";
import EnhancePage from "@routes/EnhancePage";
import InventoryPage from "@routes/InventoryPage";
import JunkyardPage from "@routes/JunkyardPage";
import ExchangePage from "@routes/ExchangePage";
import ShopPage from "@routes/ShopPage";
import HUD from "@components/HUD";

export default function App() {
  const nav = "px-3 py-2 rounded hover:bg-gray-200";
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? nav + " bg-gray-200" : nav;
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto p-3 flex items-center justify-between">
          <Link to="/" className="font-bold">
            Sword Forge
          </Link>
          <nav className="flex gap-2">
            <NavLink to="/" className={active}>
              강화
            </NavLink>
            <NavLink to="/inventory" className={active}>
              아이템 창
            </NavLink>
            <NavLink to="/junkyard" className={active}>
              잡템 보관소
            </NavLink>
            <NavLink to="/exchange" className={active}>
              교환소
            </NavLink>
            <NavLink to="/shop" className={active}>
              상점
            </NavLink>
          </nav>
          <HUD />
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<EnhancePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/junkyard" element={<JunkyardPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </main>
    </div>
  );
}
