import React, { useState } from 'react';
import { Upload, CheckCircle2, Loader2, FolderPlus } from 'lucide-react';

const AdminPanel = ({
  isLoggedIn,
  onLogin,
  onLogout,
  onUpload,
  categories = [],
  selectedCategory,
  onSelectCategory,
  onAddCategory,
}) => {
  const [form, setForm] = useState({ title: '', description: '', type: 'image', file: null, category: selectedCategory || 'none' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newCat, setNewCat] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm((f) => ({ ...f, file: files?.[0] ?? null }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
      if (name === 'category') onSelectCategory?.(value === 'none' ? 'all' : value);
    }
  };

  const addCategoryLocal = (e) => {
    e.preventDefault();
    const n = newCat.trim();
    if (!n) return;
    onAddCategory?.(n);
    onSelectCategory?.(n);
    setForm((f) => ({ ...f, category: n }));
    setNewCat('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file) return;

    setLoading(true);
    try {
      const url = URL.createObjectURL(form.file);
      onUpload({
        title: form.title || form.file.name,
        description: form.description,
        type: form.type,
        url,
        category: form.category !== 'none' ? form.category : undefined,
      });
      setSuccess(true);
      setForm({ title: '', description: '', type: form.type, file: null, category: selectedCategory || 'none' });
      setTimeout(() => setSuccess(false), 1800);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Login Admin</h3>
              <p className="text-sm text-slate-500">Masuk untuk mengunggah foto dan video.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:max-w-sm">
            <button onClick={onLogin} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2">
              Masuk sebagai Admin
            </button>
            <p className="text-xs text-slate-500">Untuk demo, tombol ini akan mensimulasikan proses login.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Panel Admin</h3>
            <p className="text-sm text-slate-500">Unggah foto dan video ke galeri, kelola kategori (folder) untuk mengelompokkan konten.</p>
          </div>
          <button onClick={onLogout} className="text-sm text-rose-600 hover:text-rose-700">Keluar</button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Kategori Aktif</h4>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <option value="none">Tanpa kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <form onSubmit={addCategoryLocal} className="mt-3 flex items-center gap-2">
              <input
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                placeholder="Nama kategori baru"
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 text-sm">
                <FolderPlus className="h-4 w-4" /> Tambah
              </button>
            </form>
          </div>
          <form onSubmit={handleSubmit} className="md:col-span-2 grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm text-slate-600">Judul</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Judul konten"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-slate-600">Deskripsi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Deskripsi singkat"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm text-slate-600">Tipe</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                  <option value="image">Foto</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-600">File</label>
                <input
                  type="file"
                  accept={form.type === 'image' ? 'image/*' : 'video/*'}
                  name="file"
                  onChange={handleChange}
                  className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-sky-100 file:px-3 file:py-2 file:text-sky-700 hover:file:bg-sky-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading || !form.file}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-60 disabled:hover:bg-sky-500 text-white px-4 py-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload
              </button>
              {success && (
                <span className="inline-flex items-center gap-1 text-emerald-600 text-sm">
                  <CheckCircle2 className="h-4 w-4" /> Berhasil diunggah
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
