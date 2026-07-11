import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import Cookies from "js-cookie";
import { loginAdmin } from "@/lib/api";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAdmin({ data: { password } });
      if (res.success && res.token) {
        Cookies.set("admin_token", res.token, { expires: 1 }); // 1 day
        router.navigate({ to: "/admin" });
      }
    } catch (err: any) {
      setError(err.message || "Invalid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 rounded-2xl gold-border bg-[color:var(--card)]">
        <h1 className="text-3xl font-display text-gold-gradient text-center mb-8">Admin Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-500/50 text-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cream mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-[color:var(--gold)] focus:ring-1 focus:ring-[color:var(--gold)]"
              placeholder="Enter admin password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-gold rounded-lg px-4 py-3 font-semibold uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
