import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAwards, addAward, deleteAward, updateAward, uploadImage } from "@/lib/api"; // You will need to create these endpoints
import Cookies from "js-cookie";
import { Plus, Loader2, X, Upload, Edit } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/admin/DataTable";

export const Route = createFileRoute("/admin/awards")({
  component: AdminAwards,
});

function AdminAwards() {
  const [awards, setAwards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const token = Cookies.get("admin_token") || "";

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    setLoading(true);
    try {
      const data = await getAwards();
      setAwards(data);
    } catch (e) {
      console.error("Endpoint might not exist yet", e);
      setAwards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (award: any) => {
    setEditingId(award._id);
    setTitle(award.title);
    setYear(award.year || "");
    setDescription(award.description || "");
    setFile(null);
    setIsModalOpen(true);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setUploading(true);
    try {
      let imageUrl = awards.find(a => a._id === editingId)?.image || "";

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise<void>((resolve, reject) => {
          reader.onload = async () => {
            const base64Image = reader.result as string;
            try {
              const uploadRes = await uploadImage({ data: { token, base64Image, folder: "awards" } });
              imageUrl = uploadRes.url;
              resolve();
            } catch (err) {
              reject(err);
            }
          };
        });
      }

      if (editingId) {
        await updateAward({
          data: {
            token,
            id: editingId,
            award: { title, year, description, image: imageUrl },
          }
        });
      } else {
        await addAward({
          data: {
            token,
            award: { title, year, description, image: imageUrl },
          }
        });
      }
      
      closeModal();
      fetchAwards();
    } catch (e: any) {
      alert(e.message || "Error saving award.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this award?")) return;
    try {
      await deleteAward({ data: { token, id: item._id } });
      fetchAwards();
    } catch (e) {
      alert("Failed to delete.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setTitle("");
    setYear("");
    setDescription("");
    setFile(null);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Image",
      cell: (item) => item.image ? (
        <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded-md bg-black" />
      ) : <span className="text-gray-600 text-xs italic">No Image</span>
    },
    { header: "Title", accessorKey: "title" },
    { header: "Year", accessorKey: "year" },
    { 
      header: "Date Added", 
      cell: (item) => new Date(item.createdAt || Date.now()).toLocaleDateString()
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-gold-gradient">Awards</h1>
          <p className="text-gray-400">Manage your honors and awards.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={18} /> Add Award
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 size={32} className="animate-spin text-[color:var(--gold)]" /></div>
      ) : (
        <DataTable 
          data={awards}
          columns={columns}
          searchKey="title"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md rounded-[2rem] border border-gold/40 p-8 shadow-2xl bg-card">
            <div className="flex items-center justify-between mb-6 border-b border-gold/20 pb-4">
              <h2 className="text-2xl font-display text-gold-gradient font-bold">{editingId ? "Edit Award" : "Add Award"}</h2>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-gold/10 transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1.5">Award Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-white/90 border border-gold/30 rounded-xl px-4 py-3 text-foreground font-semibold focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1.5">Year</label>
                <input 
                  type="text" 
                  value={year} 
                  onChange={e => setYear(e.target.value)}
                  placeholder="e.g. 2023"
                  className="w-full bg-white/90 border border-gold/30 rounded-xl px-4 py-3 text-foreground font-semibold placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1.5">Description</label>
                <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-white/90 border border-gold/30 rounded-xl px-4 py-3 text-foreground font-medium focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none custom-scrollbar transition-all"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1.5">Upload Image {editingId && "(Leave blank to keep existing)"}</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="w-full bg-white/90 border border-gold/30 rounded-xl px-3 py-2 text-foreground text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#4A654E] file:text-white hover:file:bg-[#39503D] cursor-pointer"
                />
              </div>
              <button 
                type="submit" 
                disabled={uploading}
                className="w-full btn-gold rounded-xl px-4 py-3.5 mt-6 flex justify-center items-center gap-2 disabled:opacity-50 font-bold uppercase tracking-widest text-xs shadow-sm"
              >
                {uploading ? <Loader2 size={18} className="animate-spin" /> : (editingId ? <Edit size={18} /> : <Upload size={18} />)}
                {uploading ? "Saving..." : (editingId ? "Update Award" : "Add Award")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
