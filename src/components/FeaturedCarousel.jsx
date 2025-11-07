import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Video } from 'lucide-react';

const FeaturedCarousel = ({ items, typeFilter, categoryFilter, onClickItem }) => {
  const filtered = useMemo(() => {
    let arr = items;
    if (typeFilter !== 'all') arr = arr.filter((i) => i.type === typeFilter);
    if (categoryFilter && categoryFilter !== 'all') arr = arr.filter((i) => i.category === categoryFilter);
    return arr;
  }, [items, typeFilter, categoryFilter]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [typeFilter, categoryFilter]);

  useEffect(() => {
    if (filtered.length === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % filtered.length);
    }, 3500);
    return () => clearInterval(id);
  }, [filtered.length]);

  const current = filtered[index];

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-slate-800">Sorotan</h3>
        <p className="text-sm text-slate-500">Konten pilihan bergeser otomatis dengan transisi halus</p>
      </div>
      <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full w-full"
            >
              <button onClick={() => onClickItem?.(current)} className="h-full w-full">
                {current.type === 'image' ? (
                  <img src={current.url} alt={current.title} className="h-full w-full object-cover" />
                ) : (
                  <video src={current.url} className="h-full w-full object-cover" controls />
                )}
              </button>
              <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1.5 text-slate-700 border border-slate-200 shadow-sm">
                  {current.type === 'image' ? (
                    <ImageIcon className="h-4 w-4 text-sky-600" />
                  ) : (
                    <Video className="h-4 w-4 text-rose-600" />
                  )}
                  <span className="text-sm font-medium truncate max-w-[14rem]">{current.title}</span>
                  {current.category && (
                    <span className="text-xs text-slate-500">• {current.category}</span>
                  )}
                </div>
                <div className="text-xs text-slate-600 bg-white/85 backdrop-blur px-2 py-1 rounded-full border border-slate-200">
                  {filtered.length > 0 ? `${index + 1} / ${filtered.length}` : '0 / 0'}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">Belum ada konten</div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
