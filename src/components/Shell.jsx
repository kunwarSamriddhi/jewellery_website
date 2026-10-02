import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, Store } from "lucide-react";
import { clearToken } from "../api/client";

const LINKS = [
  ["/", "Dashboard", LayoutDashboard],
  ["/products", "Products", Package],
  ["/orders", "Orders", ShoppingBag],
  ["/customers", "Customers", Users],
  ["/settings", "Settings", Settings],
];

export default function Shell() {
  const nav = useNavigate();

  const logout = () => {
    clearToken();
    nav("/login");
  };

  return (
    <div className="shell">
      <aside className="side">
        <div className="brand"><i><Store size={18} /></i>Velora Admin</div>
        {LINKS.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => "nav" + (isActive ? " active" : "")}>
            <Icon size={19} /><span>{label}</span>
          </NavLink>
        ))}
        <div className="grow" />
        <button className="nav logout" onClick={logout}>
          <LogOut size={19} /><span>Log out</span>
        </button>
      </aside>
      <main className="main"><Outlet /></main>
    </div>
  );
}
