import React from 'react';
import { X } from 'lucide-react';

const ModalViewer = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative z-10 w-[92vw] max-w-5xl max-h-[86vh] rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
          <h4 className="text-slate-800 font-medium truncate">{title}</h4>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-0 bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalViewer;
