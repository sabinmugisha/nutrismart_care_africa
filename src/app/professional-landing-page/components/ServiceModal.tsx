// components/ServiceModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  description: string;  // Short description (shown on card)
  expandedContent: {
    intro?: string;
    bulletPoints?: string[];
    outcomes?: string[];
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function ServiceModal({ 
  isOpen, 
  onClose, 
  title, 
  icon, 
  description, 
  expandedContent 
}: ServiceModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-[201]"
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
            >
              <X size={20} className="text-slate-600" />
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                {icon && (
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    {icon}
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{title}</h2>
              </div>

              {/* Short description */}
              <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-green-500 pl-4 mb-6">
                {description}
              </p>

              {/* Expanded intro */}
              {expandedContent.intro && (
                <p className="text-slate-700 mb-6 leading-relaxed">{expandedContent.intro}</p>
              )}

              {/* Bullet points */}
              {expandedContent.bulletPoints && expandedContent.bulletPoints.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {expandedContent.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Outcomes */}
              {expandedContent.outcomes && expandedContent.outcomes.length > 0 && (
                <div className="bg-green-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Expected Outcomes</h3>
                  <ul className="space-y-2">
                    {expandedContent.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2.5" />
                        <span className="text-slate-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              {expandedContent.ctaText && (
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      if (expandedContent.ctaLink) window.location.href = expandedContent.ctaLink;
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all group"
                  >
                    {expandedContent.ctaText} 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}