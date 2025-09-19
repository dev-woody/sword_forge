import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import HUD from "@/components/HUD";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "강화" },
    { to: "/inventory", label: "아이템 창" },
    { to: "/junkyard", label: "잡템 보관소" },
    { to: "/exchange", label: "교환소" },
    { to: "/shop", label: "상점" },
  ];

  const navClass = ({ isActive }: { isActive: boolean }) =>
    [
      "px-3 py-2 rounded-md text-sm",
      isActive
        ? "font-bold underline underline-offset-4"
        : "text-gray-700 hover:text-gray-900",
    ].join(" ");

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-3 py-2">
        {/* 모바일: 3열 / 데스크톱: 플렉스 */}
        <div className="flex items-center md:flex md:items-center md:justify-between">
          {/* 좌측: 로고 */}
          <div className="col-span-1">
            <Link to="/" className="font-bold block">
              Sword
              <br />
              Forge
            </Link>
          </div>

          {/* 가운데: 모바일 전용 2줄 텍스트 */}
          <div className="md:hidden flex-1 text-left leading-tight">
            <HUD />
          </div>

          {/* 우측: 모바일 햄버거 */}
          <div className="col-span-1 md:hidden justify-self-end">
            <button
              className="p-2"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label="메뉴 열기"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* 데스크톱: GNB */}
          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* 데스크톱: HUD */}
          <div className="hidden md:block">
            <HUD />
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      {isOpen && (
        <nav className="md:hidden relative z-40">
          <ul className="absolute left-0 right-0 top-0 bg-white shadow-md border-b">
            {navItems.map((item) => (
              <li key={item.to} className="border-t first:border-t-0">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "block px-4 py-3 text-sm",
                      isActive
                        ? "font-bold underline underline-offset-4"
                        : "text-gray-700",
                    ].join(" ")
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
