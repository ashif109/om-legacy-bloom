import { createFileRoute, Outlet, redirect, useRouter, useLocation } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { ChevronDown, ChevronRight, GraduationCap, LayoutDashboard, FileText, Image as ImageIcon, Settings, LogOut, Award, Users, Calendar, Briefcase, BookOpen, MessageSquare, Phone, User, Database, Link as LinkIcon, ShieldAlert, HeartHandshake } from "lucide-react";
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

function NavGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavItem({ to, icon: Icon, label, exact = false }: { to: string, icon: any, label: string, exact?: boolean }) {
  return (
    <Link 
      to={to} 
      activeOptions={{ exact }}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/80 hover:text-gold hover:bg-gold/10 transition-all [&.active]:bg-[#4A654E] [&.active]:text-white [&.active]:font-semibold [&.active]:shadow-sm"
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}

function AdminLayout() {
  const router = useRouter();
  const location = useLocation();
  
  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  const handleLogout = () => {
    Cookies.remove("admin_token");
    router.navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gold/25 bg-card/90 flex flex-col h-full flex-shrink-0 z-10">
        <div className="p-6 pb-4 border-b border-gold/20">
          <h2 className="text-2xl font-display text-gold-gradient tracking-wide">Admin Panel</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <NavGroup title="Dashboard">
            <NavItem to="/admin" icon={LayoutDashboard} label="Overview" exact />
          </NavGroup>
          
          <NavGroup title="Site Content">
            <NavItem to="/admin/content" icon={FileText} label="Main Pages" />
          </NavGroup>

          <NavGroup title="Achievements">
            <NavItem to="/admin/awards" icon={Award} label="Awards" />
            <NavItem to="/admin/certificates" icon={ShieldAlert} label="Certificates" />
          </NavGroup>

          <NavGroup title="Education & Skills">
            <NavItem to="/admin/education" icon={GraduationCap} label="Education" />
            <NavItem to="/admin/skills" icon={GraduationCap} label="Skills" />
          </NavGroup>

          <NavGroup title="Social & Community">
            <NavItem to="/admin/community" icon={HeartHandshake} label="Community Work" />
          </NavGroup>

          <NavGroup title="Events & Programs">
            <NavItem to="/admin/events" icon={Calendar} label="Events" />
            <NavItem to="/admin/camps" icon={Calendar} label="Camps" />
          </NavGroup>

          <NavGroup title="Resources">
            <NavItem to="/admin/publications" icon={BookOpen} label="Publications" />
          </NavGroup>

          <NavGroup title="Media & Feedback">
            <NavItem to="/admin/gallery" icon={ImageIcon} label="Gallery" />
            <NavItem to="/admin/media" icon={LinkIcon} label="Media & Press" />
          </NavGroup>
        </div>

        <div className="p-4 border-t border-gold/20 bg-card">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all font-semibold text-sm border border-red-200"
          >
            <LogOut size={18} />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background relative">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
