const fs = require('fs');
const path = require('path');

const sections = [
  { name: 'Education', icon: 'GraduationCap', model: 'Education', cols: '[{ header: "Degree", accessorKey: "degree" }, { header: "Institution", accessorKey: "institution" }, { header: "Year", accessorKey: "year" }, { header: "Grade", accessorKey: "grade" }]', fields: ['degree', 'institution', 'year', 'grade'] },
  { name: 'Skills', icon: 'Star', model: 'Skill', cols: '[{ header: "Name", accessorKey: "name" }, { header: "Category", accessorKey: "category" }, { header: "Proficiency", accessorKey: "proficiency" }]', fields: ['name', 'category', 'proficiency'] },
  { name: 'Community', icon: 'HeartHandshake', model: 'SocialWork', cols: '[{ header: "Title", accessorKey: "title" }, { header: "Organization", accessorKey: "organization" }, { header: "Date", accessorKey: "date" }]', fields: ['title', 'organization', 'date', 'description', 'link'] },
  { name: 'Trainings', icon: 'Book', model: 'Training', cols: '[{ header: "Title", accessorKey: "title" }, { header: "Organizer", accessorKey: "organizer" }, { header: "Status", accessorKey: "status" }]', fields: ['title', 'organizer', 'date', 'status'] },
  { name: 'Workshops', icon: 'Users', model: 'Workshop', cols: '[{ header: "Title", accessorKey: "title" }, { header: "Date", accessorKey: "date" }, { header: "Venue", accessorKey: "venue" }]', fields: ['title', 'date', 'venue', 'description'] },
  { name: 'Events', icon: 'Calendar', model: 'Event', cols: '[{ header: "Title", accessorKey: "title" }, { header: "Date", accessorKey: "date" }, { header: "Status", accessorKey: "status" }]', fields: ['title', 'date', 'status', 'description'] },
  { name: 'Seminars', icon: 'Video', model: 'Seminar', cols: '[{ header: "Title", accessorKey: "title" }, { header: "Date", accessorKey: "date" }, { header: "Venue", accessorKey: "venue" }]', fields: ['title', 'date', 'venue'] },
  { name: 'Camps', icon: 'Tent', model: 'Camp', cols: '[{ header: "Name", accessorKey: "name" }, { header: "Dates", accessorKey: "dates" }, { header: "Location", accessorKey: "location" }]', fields: ['name', 'dates', 'location', 'description'] },
  { name: 'Projects', icon: 'Briefcase', model: 'Project', cols: '[{ header: "Name", accessorKey: "name" }, { header: "Status", accessorKey: "status" }]', fields: ['name', 'role', 'status', 'description', 'link'] },
  { name: 'Publications', icon: 'BookOpen', model: 'Publication', cols: '[{ header: "Title", accessorKey: "title" }, { header: "Author", accessorKey: "author" }, { header: "Type", accessorKey: "type" }]', fields: ['title', 'author', 'type', 'link'] },
  { name: 'Downloads', icon: 'Download', model: 'Download', cols: '[{ header: "Title", accessorKey: "title" }, { header: "Category", accessorKey: "category" }]', fields: ['title', 'category', 'link'] },
  { name: 'Testimonials', icon: 'MessageSquare', model: 'Testimonial', cols: '[{ header: "Name", accessorKey: "name" }, { header: "Role", accessorKey: "role" }]', fields: ['name', 'role', 'message'] },
  { name: 'Gallery', icon: 'Image', model: 'Gallery', cols: '[{ header: "Image", cell: (item: any) => <img src={item.imageUrl} className="w-16 h-12 object-cover rounded" /> }, { header: "Alt Text", accessorKey: "altText" }, { header: "Category", accessorKey: "category" }]', fields: ['imageUrl', 'altText', 'category'] },
  { name: 'Settings', icon: 'Settings', model: 'Settings', cols: '[{ header: "Key", accessorKey: "key" }, { header: "Value", accessorKey: "value" }]', fields: ['key', 'value'] }
];

sections.forEach(sec => {
  const route = sec.name.toLowerCase();
  const componentName = 'Admin' + sec.name;
  
  const formFieldsHtml = sec.fields.map(field => {
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    if (field === 'description' || field === 'message') {
      return `              <div>
                <label className="block text-sm text-gray-400 mb-1">${label}</label>
                <textarea 
                  value={formData.${field} || ''}
                  onChange={e => setFormData({ ...formData, ${field}: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors min-h-[100px] custom-scrollbar"
                />
              </div>`;
    }
    return `              <div>
                <label className="block text-sm text-gray-400 mb-1">${label}</label>
                <input 
                  type="text"
                  value={formData.${field} || ''}
                  onChange={e => setFormData({ ...formData, ${field}: e.target.value })}
                  className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-lg px-3 py-2 text-cream outline-none focus:border-[color:var(--gold)] transition-colors"
                />
              </div>`;
  }).join('\n');

  const fileContent = `import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { get${sec.model}s, add${sec.model}, update${sec.model}, delete${sec.model} } from "@/lib/api";
import Cookies from "js-cookie";
import { Plus, Loader2, X, Edit, ${sec.icon} } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/admin/DataTable";

export const Route = createFileRoute("/admin/${route}")({
  component: ${componentName},
});

function ${componentName}() {
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
      const data = await get${sec.model}s();
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
        await update${sec.model}({ data: { token, id: editingId, item: formData } });
      } else {
        await add${sec.model}({ data: { token, item: formData } });
      }
      closeModal();
      fetchItems();
    } catch (e: any) {
      alert(e.message || "Error saving ${sec.name.toLowerCase()}.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this ${sec.name.toLowerCase()}?")) return;
    try {
      await delete${sec.model}({ data: { token, id: item._id } });
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

  const columns: ColumnDef<any>[] = ${sec.cols};
  columns.push({ header: "Date Added", cell: (item: any) => new Date(item.createdAt || Date.now()).toLocaleDateString() });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-gold-gradient">${sec.name}</h1>
          <p className="text-gray-400">Manage your ${sec.name.toLowerCase()}.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <Plus size={18} /> Add ${sec.model}
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
              <h2 className="text-xl font-display text-cream">{editingId ? "Edit" : "Add"} ${sec.model}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
${formFieldsHtml}
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
`;

  const filePath = path.join(__dirname, 'src', 'routes', 'admin', route + '.tsx');
  fs.writeFileSync(filePath, fileContent);
});

console.log("Generated all route components.");
