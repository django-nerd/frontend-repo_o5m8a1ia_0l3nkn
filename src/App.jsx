import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCarousel from './components/FeaturedCarousel';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import CategoryManager from './components/CategoryManager';
import ModalViewer from './components/ModalViewer';
import { Image as ImageIcon, Video } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all'); // all | image | video
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState({ open: false, tab: 'image' });

  const handleUpload = ({ title, description, type, url }) => {
    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        description,
        type,
        url,
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  };

  const addCategory = (name) => {
    setCategories((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  const onClickFeatured = () => {
    setModal({ open: true, tab: typeFilter === 'all' ? 'image' : typeFilter });
  };

  const images = useMemo(() => items.filter((i) => i.type === 'image'), [items]);
  const videos = useMemo(() => items.filter((i) => i.type === 'video'), [items]);

  const filteredForGrid = useMemo(() => {
    return items.filter((i) => {
      const okType = typeFilter === 'all' || i.type === typeFilter;
      const okCat = categoryFilter === 'all' || i.category === categoryFilter;
      return okType && okCat;
    });
  }, [items, typeFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50 text-slate-800">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
        activeFilter={typeFilter}
        onChangeFilter={setTypeFilter}
      />

      <Hero />

      <FeaturedCarousel
        items={items}
        typeFilter={typeFilter}
        categoryFilter={categoryFilter}
        onClickItem={onClickFeatured}
      />

      <CategoryManager
        categories={categories}
        onAddCategory={addCategory}
        activeCategory={categoryFilter}
        onChangeCategory={setCategoryFilter}
      />

      <Gallery items={filteredForGrid} filter={'all'} />

      <AdminPanel
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
        onUpload={handleUpload}
      />

      <ModalViewer
        open={modal.open}
        onClose={() => setModal({ open: false, tab: 'image' })}
        title={modal.tab === 'image' ? 'Semua Foto' : 'Semua Video'}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            {modal.tab === 'image' ? (
              <ImageIcon className="h-4 w-4 text-sky-600" />
            ) : (
              <Video className="h-4 w-4 text-rose-600" />
            )}
            <span className="text-sm text-slate-600">Klik item untuk melihat</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {(modal.tab === 'image' ? images : videos).map((item) => (
              <div key={item.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.title} className="h-36 w-full object-cover" />
                ) : (
                  <video src={item.url} className="h-36 w-full object-cover" controls />
                )}
                <div className="px-2 py-1 text-xs text-slate-600 truncate">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </ModalViewer>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
        <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-4 py-3 text-center">
          SoftGallery — login admin simulasi; siap diintegrasikan ke backend untuk penyimpanan, autentikasi, dan kategori.
        </div>
      </footer>
    </div>
  );
}

export default App;
