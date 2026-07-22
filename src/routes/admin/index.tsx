import { createFileRoute } from "@tanstack/react-router";
import { Users, FileText, Settings, Image as ImageIcon, Plus, Edit, Activity, BookOpen, GraduationCap, Award } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function StatCard({ title, count, icon: Icon, color }: { title: string, count: string | number, icon: any, color: string }) {
  return (
    <div className="p-6 rounded-2xl glass-card border border-gold/30 hover-lift transition-all shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-gold">{title}</h3>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={20} className="text-primary" />
        </div>
      </div>
      <p className="text-4xl font-display font-bold text-gold">{count}</p>
    </div>
  );
}

function ActionButton({ to, icon: Icon, label }: { to: string, icon: any, label: string }) {
  return (
    <Link to={to} className="flex flex-col items-center justify-center p-5 rounded-2xl glass-card border border-gold/30 hover:border-gold hover:bg-gold/15 transition-all gap-3 text-foreground group shadow-xs">
      <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon size={22} className="text-gold group-hover:text-white transition-colors" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-center">{label}</span>
    </Link>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display text-gold-gradient font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground font-medium">Welcome back. Here is what's happening today.</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pages/Sections" count="16" icon={FileText} color="bg-primary/15" />
        <StatCard title="Gallery Images" count="42" icon={ImageIcon} color="bg-primary/15" />
        <StatCard title="Testimonials" count="12" icon={Users} color="bg-primary/15" />
        <StatCard title="Certificates" count="8" icon={Award} color="bg-primary/15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl glass-card border border-gold/30 shadow-xs">
          <h2 className="text-xl font-display text-gold font-bold mb-6 flex items-center gap-2">
            <Settings size={20} className="text-gold" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ActionButton to="/admin/gallery" icon={Plus} label="Add Gallery Image" />
            <ActionButton to="/admin/testimonials" icon={Plus} label="Add Testimonial" />
            <ActionButton to="/admin/events" icon={Plus} label="Add Blog/Event" />
            <ActionButton to="/admin/content" icon={Edit} label="Update About Me" />
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="p-6 md:p-8 rounded-2xl glass-card border border-gold/30 shadow-xs">
          <h2 className="text-xl font-display text-gold font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-gold" />
            Recent Activity
          </h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gold/20">
            {[
              { log: "Admin updated Vision text", time: "2 mins ago" },
              { log: "Admin added new certificate", time: "1 hour ago" },
              { log: "Admin deleted old gallery image", time: "3 hours ago" },
              { log: "Admin updated Contact Info", time: "1 day ago" }
            ].map((activity, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-gold bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white/90 p-3 rounded-xl border border-gold/20 shadow-xs">
                  <p className="text-xs font-semibold text-foreground">{activity.log}</p>
                  <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
