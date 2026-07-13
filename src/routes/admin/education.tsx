import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getEducations, addEducation, updateEducation, deleteEducation } from "@/lib/api";
import Cookies from "js-cookie";
import { Plus, Loader2, X, Edit, GraduationCap } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/admin/DataTable";

export const Route = createFileRoute("/admin/education")({
  component: AdminEducation,
});

function AdminEducation() {
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
      const data = await getEducations();
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
        await updateEducation({ data: { token, id: editingId, item: formData } });
      } else {
        await addEducation({ data: { token, item: formData } });
      }
      closeModal();
      fetchItems();
    } catch (e: any) {
      alert(e.message || "Error saving education.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this education?")) return;
    try {
      await deleteEducation({ data: { token, id: item._id } });
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

  const columns: ColumnDef<any>[] = [{ header: "Degree", accessorKey: "degree" }, { header: "Institution", accessorKey: "institution" }, { header: "Year", accessorKey: "year" }, { header: "Grade", accessorKey: "grade" }];
  columns.push({ header: "Date Added", cell: (item: any) => new Date(item.createdAt || Date.now()).toLocaleDateString() });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-gold-gradient">Education</h1>
          <p className="text-gray-400">Manage your education.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <Plus size={18} /> Add Education
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
              <h2 className="text-xl font-display text-cream">{editingId ? "Edit" : "Add"} Education</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Degree</label>
                <input 
                  type="text"
                  value={formData.degree || ''}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Institution</label>
                <input 
                  type="text"
                  value={formData.institution || ''}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Year</label>
                <input 
                  type="text"
                  value={formData.year || ''}
                  onChange={e => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Grade</label>
                <input 
                  type="text"
                  value={formData.grade || ''}
                  onChange={e => setFormData({ ...formData, grade: e.target.value })}
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
