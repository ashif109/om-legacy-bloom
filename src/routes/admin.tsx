import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { LogOut, LayoutDashboard, FileText, Image as ImageIcon, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    // If not on login page, check token
    if (location.pathname !== "/admin/login") {
      const token = Cookies.get("admin_token");
      if (!token) {
        throw redirect({
          to: "/admin/login",
          search: {
            redirect: location.href,
          },
        });
      }
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  
  // If we're exactly on /admin/login, don't show the sidebar
  if (router.state.location.pathname === "/admin/login") {
    return <Outlet />;
  }

  const handleLogout = () => {
    Cookies.remove("admin_token");
    router.navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[color:var(--gold)]/20 bg-black/90 p-6 flex flex-col h-full">
        <h2 className="text-2xl font-display text-gold-gradient mb-8">Admin Panel</h2>
        
        <nav className="flex-1 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[color:var(--gold)]/10 text-cream transition-colors [&.active]:bg-[color:var(--gold)]/20 [&.active]:text-[color:var(--gold)]" activeOptions={{ exact: true }}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/admin/content" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[color:var(--gold)]/10 text-cream transition-colors [&.active]:bg-[color:var(--gold)]/20 [&.active]:text-[color:var(--gold)]">
            <FileText size={20} />
            Site Content
          </Link>
          <Link to="/admin/certificates" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[color:var(--gold)]/10 text-cream transition-colors [&.active]:bg-[color:var(--gold)]/20 [&.active]:text-[color:var(--gold)]">
            <Settings size={20} />
            Certificates
          </Link>
          <Link to="/admin/media" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[color:var(--gold)]/10 text-cream transition-colors [&.active]:bg-[color:var(--gold)]/20 [&.active]:text-[color:var(--gold)]">
            <ImageIcon size={20} />
            Media & Gallery
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/30 transition-colors mt-auto"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[color:var(--background)] p-8">
        <Outlet />
      </main>
    </div>
  );
}
