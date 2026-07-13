import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getWorkshops, addWorkshop, updateWorkshop, deleteWorkshop } from "@/lib/api";
import Cookies from "js-cookie";
import { Plus, Loader2, X, Edit, Users } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/admin/DataTable";

export const Route = createFileRoute("/admin/workshops")({
  component: AdminWorkshops,
});

function AdminWorkshops() {
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
      const data = await getWorkshops();
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
        await updateWorkshop({ data: { token, id: editingId, item: formData } });
      } else {
        await addWorkshop({ data: { token, item: formData } });
      }
      closeModal();
      fetchItems();
    } catch (e: any) {
      alert(e.message || "Error saving workshops.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this workshops?")) return;
    try {
      await deleteWorkshop({ data: { token, id: item._id } });
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

  const columns: ColumnDef<any>[] = [{ header: "Title", accessorKey: "title" }, { header: "Date", accessorKey: "date" }, { header: "Venue", accessorKey: "venue" }];
  columns.push({ header: "Date Added", cell: (item: any) => new Date(item.createdAt || Date.now()).toLocaleDateString() });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-gold-gradient">Workshops</h1>
          <p className="text-gray-400">Manage your workshops.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <Plus size={18} /> Add Workshop
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
              <h2 className="text-xl font-display text-cream">{editingId ? "Edit" : "Add"} Workshop</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input 
                  type="text"
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <input 
                  type="text"
                  value={formData.date || ''}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Venue</label>
                <input 
                  type="text"
                  value={formData.venue || ''}
                  onChange={e => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea 
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors min-h-[100px] custom-scrollbar"
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
