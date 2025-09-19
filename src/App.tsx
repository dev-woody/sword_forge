import { Route, Routes } from "react-router-dom";
import EnhancePage from "@/routes/EnhancePage";
import InventoryPage from "@/routes/InventoryPage";
import JunkyardPage from "@/routes/JunkyardPage";
import ExchangePage from "@/routes/ExchangePage";
import ShopPage from "@/routes/ShopPage";
import BgmPlayer from "@/components/BgmPlayer";
import Header from "./layouts/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<EnhancePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/junkyard" element={<JunkyardPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </main>
      <BgmPlayer />
    </div>
  );
}
