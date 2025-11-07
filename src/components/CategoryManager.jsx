import React, { useState } from 'react';
import { FolderPlus, FolderClosed } from 'lucide-react';

const CategoryManager = ({ categories, onAddCategory, activeCategory, onChangeCategory }) => {
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    onAddCategory(n);
    setName('');
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Kategori</h3>
            <p className="text-sm text-slate-500">Kelola folder untuk menempatkan foto dan video</p>
          </div>
          <form onSubmit={submit} className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kategori baru"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white px-4 py-2">
              <FolderPlus className="h-4 w-4" /> Tambah
            </button>
          </form>
        </div>
        {categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onChangeCategory('all')}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
                activeCategory === 'all' ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              <FolderClosed className="h-4 w-4" /> Semua
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => onChangeCategory(c)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
                  activeCategory === c ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <FolderClosed className="h-4 w-4" /> {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryManager;
