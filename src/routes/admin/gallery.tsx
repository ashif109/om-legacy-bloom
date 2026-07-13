import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getGallerys, addGallery, updateGallery, deleteGallery } from "@/lib/api";
import Cookies from "js-cookie";
import { Plus, Loader2, X, Edit, Image } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/admin/DataTable";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const token = Cookies.get("admin_token") || "";

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getGallerys();
      setItems(data);
    } catch (e) {
      console.error(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateGallery({ data: { token, id: editingId, item: formData } });
      } else {
        await addGallery({ data: { token, item: formData } });
      }
      closeModal();
      fetchItems();
    } catch (e: any) {
      alert(e.message || "Error saving gallery.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this gallery?")) return;
    try {
      await deleteGallery({ data: { token, id: item._id } });
      fetchItems();
    } catch (e) {
      alert("Failed to delete.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const columns: ColumnDef<any>[] = [{ header: "Image", cell: (item: any) => <img src={item.imageUrl} className="w-16 h-12 object-cover rounded" /> }, { header: "Alt Text", accessorKey: "altText" }, { header: "Category", accessorKey: "category" }];
  columns.push({ header: "Date Added", cell: (item: any) => new Date(item.createdAt || Date.now()).toLocaleDateString() });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-gold-gradient">Gallery</h1>
          <p className="text-gray-400">Manage your gallery.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <Plus size={18} /> Add Gallery
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 size={32} className="animate-spin text-[color:var(--gold)]" /></div>
      ) : (
        <DataTable data={items} columns={columns} searchKey={columns[0].accessorKey || "title"} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm custom-scrollbar overflow-y-auto">
          <div className="bg-[color:var(--card)] w-full max-w-md rounded-2xl gold-border p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display text-cream">{editingId ? "Edit" : "Add"} Gallery</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">ImageUrl</label>
                <input 
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">AltText</label>
                <input 
                  type="text"
                  value={formData.altText || ''}
                  onChange={e => setFormData({ ...formData, altText: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <input 
                  type="text"
                  value={formData.category || ''}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <button type="submit" disabled={saving} className="w-full btn-gold rounded-lg px-4 py-2.5 mt-6 flex justify-center items-center gap-2 disabled:opacity-50 font-medium">
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Edit size={18} />}
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
