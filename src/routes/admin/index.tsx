import { createFileRoute } from "@tanstack/react-router";
import { Users, FileText, Settings, Image as ImageIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-display text-gold-gradient mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/content" className="p-6 rounded-2xl bg-[color:var(--card)] gold-border hover-lift transition-all">
          <div className="flex items-center gap-4 mb-4 text-[color:var(--gold)]">
            <FileText size={24} />
            <h3 className="font-display text-xl text-cream">Site Content</h3>
          </div>
          <p className="text-sm text-gray-400">Manage mission, vision, stats, journey, and other text content.</p>
        </Link>
        
        <Link to="/admin/certificates" className="p-6 rounded-2xl bg-[color:var(--card)] gold-border hover-lift transition-all">
          <div className="flex items-center gap-4 mb-4 text-[color:var(--gold)]">
            <Settings size={24} />
            <h3 className="font-display text-xl text-cream">Certificates</h3>
          </div>
          <p className="text-sm text-gray-400">Add, edit, or remove certificates from different categories.</p>
        </Link>
        
        <Link to="/admin/media" className="p-6 rounded-2xl bg-[color:var(--card)] gold-border hover-lift transition-all">
          <div className="flex items-center gap-4 mb-4 text-[color:var(--gold)]">
            <ImageIcon size={24} />
            <h3 className="font-display text-xl text-cream">Media</h3>
          </div>
          <p className="text-sm text-gray-400">Manage YouTube videos, media appearances, and gallery.</p>
        </Link>

        <div className="p-6 rounded-2xl bg-[color:var(--card)] border border-[color:var(--gold)]/10 hover-lift transition-all opacity-70">
          <div className="flex items-center gap-4 mb-4 text-[color:var(--gold)]">
            <Users size={24} />
            <h3 className="font-display text-xl text-cream">Users</h3>
          </div>
          <p className="text-sm text-gray-400">User management is currently limited to the admin account.</p>
        </div>
      </div>
    </div>
  );
}
