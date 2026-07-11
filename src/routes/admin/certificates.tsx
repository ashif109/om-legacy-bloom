import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getCertificates, addCertificate, deleteCertificate, uploadImage } from "@/lib/api";
import Cookies from "js-cookie";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/certificates")({
  component: AdminCertificates,
});

function AdminCertificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("camp");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const token = Cookies.get("admin_token") || "";

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    setUploading(true);
    try {
      // 1. Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result as string;
        
        try {
          // 2. Upload to Cloudinary
          const uploadRes = await uploadImage({ data: { token, base64Image, folder: "certificates" } });
          
          // 3. Save to MongoDB
          await addCertificate({
            data: {
              token,
              certificate: { title, category, imageUrl: uploadRes.url },
            }
          });
          
          setTitle("");
          setFile(null);
          fetchCertificates();
        } catch (e: any) {
          alert(e.message || "Failed to upload to Cloudinary. Check your keys.");
          return; // Stop execution if upload fails
        } finally {
          setUploading(false);
        }
      };
    } catch (e) {
      alert("Error processing file.");
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await deleteCertificate({ data: { token, id } });
      fetchCertificates();
    } catch (e) {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display text-gold-gradient">Manage Certificates</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-6 gold-border sticky top-8">
            <h2 className="text-xl font-display text-cream mb-6 flex items-center gap-2">
              <Plus size={20} className="text-[color:var(--gold)]" />
              Add New
            </h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-black border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream"
                >
                  <option value="camp">Camp</option>
                  <option value="competition">Competition</option>
                  <option value="conference">Conference</option>
                  <option value="award">Award</option>
                  <option value="olympiad">Olympiad</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Upload Image</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[color:var(--gold)] file:text-black hover:file:bg-[color:var(--gold)]/80"
                    required
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={uploading}
                className="w-full btn-gold rounded-lg px-4 py-2 mt-4 flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {uploading ? "Uploading..." : "Add Certificate"}
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 py-10">Loading...</div>
          ) : certificates.length === 0 ? (
            <div className="text-center text-gray-400 py-10 glass-card rounded-2xl">No certificates found. Add one above.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map(cert => (
                <div key={cert._id} className="glass-card rounded-xl overflow-hidden gold-border flex flex-col">
                  <div className="aspect-video bg-black/80 relative">
                    <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-contain" />
                    <span className="absolute top-2 left-2 bg-black/80 text-[color:var(--gold)] text-xs px-2 py-1 rounded border border-[color:var(--gold)]/30 uppercase">
                      {cert.category}
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between flex-1">
                    <h3 className="text-cream font-medium truncate pr-4">{cert.title}</h3>
                    <button 
                      onClick={() => handleDelete(cert._id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-400/10 rounded-lg shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
