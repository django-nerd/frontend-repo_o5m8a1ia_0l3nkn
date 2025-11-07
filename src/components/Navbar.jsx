import React from 'react';
import { Image as ImageIcon, Video, Upload, LogIn, LogOut } from 'lucide-react';

const Navbar = ({ isLoggedIn, onLoginClick, onLogout, activeFilter, onChangeFilter }) => {
  const filters = [
    { key: 'all', label: 'Semua' },
    { key: 'image', label: 'Foto', icon: <ImageIcon className="h-4 w-4" /> },
    { key: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-200 via-amber-200 to-sky-200 ring-1 ring-white shadow-inner" />
          <div className="leading-tight">
            <p className="font-semibold text-slate-800">SoftGallery</p>
            <p className="text-[11px] text-slate-500">Upload Foto & Video</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => onChangeFilter(f.key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors border ${
                activeFilter === f.key
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 px-3 py-1.5 text-sm"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 text-sm"
            >
              <LogIn className="h-4 w-4" /> Login Admin
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-500 text-sm">
            <Upload className="h-4 w-4" />
            Unggah dengan mudah
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
