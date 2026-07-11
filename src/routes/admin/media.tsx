import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getMedia, addMedia, deleteMedia } from "@/lib/api";
import Cookies from "js-cookie";
import { Plus, Trash2, Youtube, ExternalLink } from "lucide-react";
import * as fallbackData from "@/lib/site-data";

export const Route = createFileRoute("/admin/media")({
  component: AdminMedia,
});

function AdminMedia() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const [type, setType] = useState("YouTube");
  const [source, setSource] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const token = Cookies.get("admin_token") || "";

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const data = await getMedia();
      setMedia(data || fallbackData.media || []);
    } catch (e) {
      console.error(e);
      setMedia(fallbackData.media || []);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMedia({
        data: {
          token,
          mediaItem: { type, source, year, title, url, image }
        }
      });
      setIsAdding(false);
      fetchMedia();
      setTitle(""); setUrl(""); setImage(""); setSource(""); setYear("");
    } catch (e) {
      alert("Failed to add media");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this media?")) return;
    try {
      await deleteMedia({ data: { token, id } });
      fetchMedia();
    } catch (e) {
      alert("Failed to delete media");
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10 border-b border-[color:var(--gold)]/20">
        <h1 className="text-3xl font-display text-gold-gradient">Manage Media</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 text-sm uppercase font-bold tracking-widest"
        >
          <Plus size={16} /> {isAdding ? "Cancel" : "Add Media"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="glass-card p-6 rounded-2xl gold-border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <h2 className="text-xl font-display text-cream mb-4">New Media Item</h2>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream">
              <option value="YouTube">YouTube</option>
              <option value="News">News</option>
              <option value="Interview">Interview</option>
              <option value="Event">Event</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Source / Channel</label>
            <input value={source} onChange={e => setSource(e.target.value)} required className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Year</label>
            <input value={year} onChange={e => setYear(e.target.value)} required className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Link / URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream" placeholder="https://youtube.com/..." />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full btn-gold rounded-lg px-4 py-3 mt-2 uppercase font-bold tracking-widest text-sm">Save Media</button>
          </div>
        </form>
      )}

      <div className="glass-card p-6 rounded-2xl gold-border">
        {loading ? (
          <div className="text-center text-gray-400 py-10">Loading media...</div>
        ) : media.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No media found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {media.map((item, i) => (
              <div key={item._id || i} className="border border-[color:var(--gold)]/20 bg-black/40 rounded-xl overflow-hidden group">
                <div className="aspect-video bg-[color:var(--card)] flex items-center justify-center text-[color:var(--gold)]">
                  {item.type === "YouTube" ? <Youtube size={40} /> : <div className="text-xs uppercase">{item.type}</div>}
                </div>
                <div className="p-4 relative">
                  <div className="text-xs text-[color:var(--gold)] mb-1 uppercase tracking-wider">{item.year}</div>
                  <h3 className="text-cream font-medium truncate">{item.title}</h3>
                  <div className="text-xs text-gray-400 truncate mt-1">{item.source}</div>
                  
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
