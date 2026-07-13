import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Edit, Trash2, GripVertical, CheckCircle, XCircle } from "lucide-react";

export type ColumnDef<T> = {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  searchKey?: keyof T;
}

export function DataTable<T extends { _id?: string }>({ 
  data, 
  columns, 
  onEdit, 
  onDelete,
  searchKey 
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!searchTerm || !searchKey) return true;
    const value = item[searchKey];
    if (typeof value === "string") {
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[color:var(--card)] rounded-2xl border border-[color:var(--gold)]/20 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-[color:var(--gold)]/10 flex justify-between items-center bg-black/20">
        <div className="relative w-72">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-black/50 border border-[color:var(--gold)]/20 rounded-lg pl-10 pr-4 py-2 text-sm text-cream focus:outline-none focus:border-[color:var(--gold)]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black/40 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium w-12"></th>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 font-medium">{col.header}</th>
              ))}
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--gold)]/10">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr key={item._id || idx} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-[color:var(--gold)]/30 group-hover:text-[color:var(--gold)] cursor-grab">
                    <GripVertical size={16} />
                  </td>
                  {columns.map((col, i) => (
                    <td key={i} className="px-6 py-4 text-cream">
                      {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey] || "") : null}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button 
                      onClick={() => onEdit(item)}
                      className="p-2 text-gray-400 hover:text-[color:var(--gold)] hover:bg-[color:var(--gold)]/10 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(item)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-[color:var(--gold)]/10 flex items-center justify-between bg-black/20 text-sm">
          <span className="text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-black border border-[color:var(--gold)]/20 text-cream disabled:opacity-50 hover:bg-[color:var(--gold)]/10"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-black border border-[color:var(--gold)]/20 text-cream disabled:opacity-50 hover:bg-[color:var(--gold)]/10"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
