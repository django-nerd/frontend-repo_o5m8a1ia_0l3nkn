import React from 'react';
import { Sparkles, ShieldCheck, Upload } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,182,193,0.35),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(135,206,250,0.35),transparent_40%),radial-gradient(ellipse_at_top_right,rgba(255,228,181,0.35),transparent_40%)]" />
      <div className="mx-auto max-w-6xl px-4 py-12 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-sky-700 border border-sky-100 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Tampilan modern dengan warna soft</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-800">
              Galeri Foto & Video yang Elegan
            </h1>
            <p className="text-slate-600">
              Unggah, kelola, dan pamerkan momen terbaik Anda. Admin dapat login dan mengunggah konten langsung dari halaman ini.
            </p>
            <ul className="flex flex-wrap gap-3 text-sm text-slate-600">
              <li className="inline-flex items-center gap-2 bg-white/80 border border-slate-100 rounded-full px-3 py-1">
                <Upload className="h-4 w-4 text-sky-600" /> Upload cepat
              </li>
              <li className="inline-flex items-center gap-2 bg-white/80 border border-slate-100 rounded-full px-3 py-1">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Login admin
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-rose-100 via-amber-100 to-sky-100 border border-white shadow-lg" />
            <div className="absolute -bottom-4 -right-4 hidden md:block">
              <div className="rounded-xl bg-white/80 backdrop-blur border border-slate-100 shadow px-4 py-3 text-slate-600 text-sm">
                Tampilan soft dan bersih untuk pengalaman yang nyaman.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
