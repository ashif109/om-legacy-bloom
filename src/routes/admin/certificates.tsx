import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getCertificates, addCertificate, updateCertificate, deleteCertificate, uploadImage } from "@/lib/api";
import Cookies from "js-cookie";
import { Plus, Trash2, Upload, Loader2, X, Edit } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/admin/DataTable";

export const Route = createFileRoute("/admin/certificates")({
  component: AdminCertificates,
});

function AdminCertificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("camp");
  const [organization, setOrganization] = useState("");
  const [achievement, setAchievement] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const token = Cookies.get("admin_token") || "";

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cert: any) => {
    setEditingId(cert._id);
    setTitle(cert.title);
    setCategory(cert.category);
    setOrganization(cert.organization || "");
    setAchievement(cert.achievement || "");
    setDate(cert.date || "");
    setUrl(cert.url || "");
    setFile(null);
    setIsModalOpen(true);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    if (!editingId && !file) return;

    setUploading(true);
    try {
      let imageUrl = "";

      // 1. Convert file to base64 if a new file is selected
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise<void>((resolve, reject) => {
          reader.onload = async () => {
            const base64Image = reader.result as string;
            try {
              const uploadRes = await uploadImage({ data: { token, base64Image, folder: "certificates" } });
              imageUrl = uploadRes.url;
              resolve();
            } catch (err) {
              reject(err);
            }
          };
        });
      }

      // 3. Save to MongoDB
      if (editingId) {
        await updateCertificate({
          data: {
            token,
            id: editingId,
            certificate: {
              title,
              category,
              organization,
              achievement,
              date,
              url,
              imageUrl: imageUrl || certificates.find(c => c._id === editingId)?.imageUrl
            },
          }
        });
      } else {
        await addCertificate({
          data: {
            token,
            certificate: {
              title,
              category,
              organization,
              achievement,
              date,
              url,
              imageUrl: imageUrl
            },
          }
        });
      }

      closeModal();
      fetchCertificates();
    } catch (e: any) {
      alert(e.message || "Error saving certificate.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await deleteCertificate({ data: { token, id: item._id } });
      fetchCertificates();
    } catch (e) {
      alert("Failed to delete.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setTitle("");
    setCategory("camp");
    setOrganization("");
    setAchievement("");
    setDate("");
    setUrl("");
    setFile(null);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Image",
      cell: (item) => (
        <img src={item.imageUrl} alt={item.title} className="w-16 h-12 object-cover rounded-md bg-black" />
      )
    },
    { header: "Title", accessorKey: "title" },
    {
      header: "Category",
      cell: (item) => <span className="uppercase text-xs font-semibold px-2 py-1 bg-[color:var(--gold)]/20 text-[color:var(--gold)] rounded">{item.category}</span>
    },
    {
      header: "Date Added",
      cell: (item) => new Date(item.createdAt || Date.now()).toLocaleDateString()
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-gold-gradient">Certificates</h1>
          <p className="text-gray-400">Manage your certificates and awards.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={18} /> Add Certificate
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 size={32} className="animate-spin text-[color:var(--gold)]" /></div>
      ) : (
        <DataTable
          data={certificates}
          columns={columns}
          searchKey="title"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[color:var(--card)] w-full max-w-md rounded-2xl gold-border p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display text-cream">{editingId ? "Edit Certificate" : "Add Certificate"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream focus:border-[color:var(--gold)] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream focus:border-[color:var(--gold)] outline-none"
                >
                  <option value="camp">Camp</option>
                  <option value="competition">Competition</option>
                  <option value="conference">Conference</option>
                  <option value="award">Award</option>
                  <option value="olympiad">Olympiad</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Organization</label>
                <input
                  type="text"
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream focus:border-[color:var(--gold)] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Achievement Details</label>
                <textarea
                  value={achievement}
                  onChange={e => setAchievement(e.target.value)}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream focus:border-[color:var(--gold)] outline-none"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    placeholder="e.g. 2024-25"
                    className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream focus:border-[color:var(--gold)] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">URL (Optional)</label>
                  <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream focus:border-[color:var(--gold)] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Upload Image {editingId && "(Leave blank to keep existing)"}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[color:var(--gold)] file:text-black hover:file:bg-[color:var(--gold)]/80"
                  required={!editingId}
                />
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full btn-gold rounded-lg px-4 py-2.5 mt-6 flex justify-center items-center gap-2 disabled:opacity-50 font-medium"
              >
                {uploading ? <Loader2 size={18} className="animate-spin" /> : (editingId ? <Edit size={18} /> : <Upload size={18} />)}
                {uploading ? "Saving..." : (editingId ? "Update Certificate" : "Add Certificate")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
