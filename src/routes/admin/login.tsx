import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import Cookies from "js-cookie";
import { loginAdmin } from "@/lib/api";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAdmin({ data: { email, password } });
      if (res.success && res.token) {
        Cookies.set("admin_token", res.token, { expires: 1/24 }); // 1 hour
        router.navigate({ to: "/admin" });
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 md:p-10 rounded-[2rem] glass-card border border-gold/30 shadow-xl">
        <h1 className="text-3xl font-display text-gold-gradient text-center mb-8">Admin Login</h1>
        
        {error && (
          <div className="mb-6 p-3.5 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 font-sans">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/90 border border-gold/30 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              placeholder="admin@omlegacybloom.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 font-sans">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/90 border border-gold/30 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-gold rounded-xl px-4 py-3.5 font-semibold uppercase tracking-widest text-xs disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
