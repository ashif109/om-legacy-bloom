import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getSiteData, updateSiteData } from "@/lib/api";
import Cookies from "js-cookie";
import { Plus, Trash2 } from "lucide-react";
import * as fallbackData from "@/lib/site-data";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

function AdminContent() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const token = Cookies.get("admin_token") || "";

  useEffect(() => {
    getSiteData().then(dbData => {
      // If DB is empty, use fallback data to initialize
      if (!dbData || Object.keys(dbData).length === 0) {
        setData({
          contact: fallbackData.contact || {},
          stats: fallbackData.stats || [],
          missionCards: fallbackData.missionCards || [],
          skills: fallbackData.skills || [],
          journey: fallbackData.journey || [],
          education: fallbackData.education || []
        });
      } else {
        setData(dbData);
      }
    }).catch(() => {
      // Fallback if MongoDB is completely offline
      setData({
        contact: fallbackData.contact || {},
        stats: fallbackData.stats || [],
        missionCards: fallbackData.missionCards || [],
        skills: fallbackData.skills || [],
        journey: fallbackData.journey || [],
        education: fallbackData.education || []
      });
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteData({ data: { token, payload: data } });
      alert("Saved successfully! Data is now live on the homepage.");
    } catch (e) {
      alert("Failed to save. Your MongoDB cluster is unreachable. Please ensure it is active and allows network access.");
    } finally {
      setSaving(false);
    }
  };

  const updateArrayField = (key: string, index: number, field: string, value: any) => {
    const newArray = [...data[key]];
    newArray[index] = { ...newArray[index], [field]: value };
    setData({ ...data, [key]: newArray });
  };

  const removeArrayItem = (key: string, index: number) => {
    const newArray = [...data[key]];
    newArray.splice(index, 1);
    setData({ ...data, [key]: newArray });
  };

  const addArrayItem = (key: string, defaultObj: any) => {
    setData({ ...data, [key]: [...(data[key] || []), defaultObj] });
  };

  if (!data) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10 border-b border-[color:var(--gold)]/20">
        <h1 className="text-3xl font-display text-gold-gradient">Site Content</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="btn-gold px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Contact Info */}
        <section className="glass-card p-6 rounded-2xl gold-border">
          <h2 className="text-xl font-display text-cream mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input value={data.contact?.email || ""} onChange={e => setData({ ...data, contact: { ...data.contact, email: e.target.value }})} className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone</label>
              <input value={data.contact?.phone || ""} onChange={e => setData({ ...data, contact: { ...data.contact, phone: e.target.value }})} className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Address</label>
              <input value={data.contact?.address || ""} onChange={e => setData({ ...data, contact: { ...data.contact, address: e.target.value }})} className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="glass-card p-6 rounded-2xl gold-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display text-cream">Stats</h2>
            <button onClick={() => addArrayItem("stats", { value: "", label: "" })} className="text-[color:var(--gold)] hover:text-white flex items-center gap-1 text-sm"><Plus size={16}/> Add</button>
          </div>
          <div className="space-y-3">
            {data.stats?.map((stat: any, i: number) => (
              <div key={i} className="flex gap-3 items-start">
                <input value={stat.value} onChange={e => updateArrayField("stats", i, "value", e.target.value)} placeholder="Value (e.g. 14)" className="w-1/3 bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
                <input value={stat.label} onChange={e => updateArrayField("stats", i, "label", e.target.value)} placeholder="Label" className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
                <button onClick={() => removeArrayItem("stats", i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Cards */}
        <section className="glass-card p-6 rounded-2xl gold-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display text-cream">Mission & Vision</h2>
            <button onClick={() => addArrayItem("missionCards", { title: "", body: "" })} className="text-[color:var(--gold)] hover:text-white flex items-center gap-1 text-sm"><Plus size={16}/> Add</button>
          </div>
          <div className="space-y-4">
            {data.missionCards?.map((card: any, i: number) => (
              <div key={i} className="flex gap-3 items-start border border-[color:var(--gold)]/10 p-3 rounded-lg relative">
                <div className="flex-1 space-y-3">
                  <input value={card.title} onChange={e => updateArrayField("missionCards", i, "title", e.target.value)} placeholder="Title" className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream font-bold" />
                  <textarea value={card.body} onChange={e => updateArrayField("missionCards", i, "body", e.target.value)} placeholder="Body Text" className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream min-h-[80px]" />
                </div>
                <button onClick={() => removeArrayItem("missionCards", i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg h-fit"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
        </section>

        {/* Journey */}
        <section className="glass-card p-6 rounded-2xl gold-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display text-cream">Journey / Timeline</h2>
            <button onClick={() => addArrayItem("journey", { year: "", title: "", body: "" })} className="text-[color:var(--gold)] hover:text-white flex items-center gap-1 text-sm"><Plus size={16}/> Add</button>
          </div>
          <div className="space-y-4">
            {data.journey?.map((j: any, i: number) => (
              <div key={i} className="flex gap-3 items-start border border-[color:var(--gold)]/10 p-3 rounded-lg">
                <div className="flex-1 space-y-3">
                  <div className="flex gap-3">
                    <input value={j.year} onChange={e => updateArrayField("journey", i, "year", e.target.value)} placeholder="Year/Period" className="w-1/3 bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
                    <input value={j.title} onChange={e => updateArrayField("journey", i, "title", e.target.value)} placeholder="Title" className="w-2/3 bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream font-bold" />
                  </div>
                  <textarea value={j.body} onChange={e => updateArrayField("journey", i, "body", e.target.value)} placeholder="Description" className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
                </div>
                <button onClick={() => removeArrayItem("journey", i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg h-fit"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="glass-card p-6 rounded-2xl gold-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display text-cream">Skills</h2>
            <button onClick={() => addArrayItem("skills", { name: "", value: 0 })} className="text-[color:var(--gold)] hover:text-white flex items-center gap-1 text-sm"><Plus size={16}/> Add</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.skills?.map((s: any, i: number) => (
              <div key={i} className="flex gap-2 items-center border border-[color:var(--gold)]/10 p-2 rounded-lg">
                <input value={s.name} onChange={e => updateArrayField("skills", i, "name", e.target.value)} placeholder="Skill Name" className="flex-1 bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream text-sm" />
                <input type="number" value={s.value} onChange={e => updateArrayField("skills", i, "value", Number(e.target.value))} placeholder="%" className="w-20 bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream text-sm" />
                <button onClick={() => removeArrayItem("skills", i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
