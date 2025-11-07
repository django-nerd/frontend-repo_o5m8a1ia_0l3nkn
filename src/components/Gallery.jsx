import React, { useMemo } from 'react';
import { Image as ImageIcon, Video } from 'lucide-react';

const GalleryCard = ({ item }) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-slate-100">
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <video src={item.url} controls className="h-full w-full object-cover" />
        )}
        <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-2 py-1 text-xs text-slate-700 border border-slate-200">
          {item.type === 'image' ? <ImageIcon className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
          {item.type === 'image' ? 'Foto' : 'Video'}
        </div>
      </div>
      <div className="p-3">
        <p className="text-slate-800 text-sm font-medium truncate">{item.title}</p>
        {item.description && (
          <p className="text-slate-500 text-xs line-clamp-2 mt-0.5">{item.description}</p>
        )}
      </div>
    </div>
  );
};

const Gallery = ({ items, filter }) => {
  const visible = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((i) => i.type === filter);
  }, [items, filter]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Galeri</h2>
          <p className="text-sm text-slate-500">Menampilkan {visible.length} item</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
