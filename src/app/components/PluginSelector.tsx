'use client';

import { Search, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import { translations, Language } from '../../lib/translations';
import { useLanguage } from '../context/LanguageContext';

interface Plugin {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface PluginSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlugins: string[];
  onPluginToggle: (pluginId: string) => void;
}

export function PluginSelector({ isOpen, onClose, selectedPlugins, onPluginToggle }: PluginSelectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language as Language];

  const pluginsList: Plugin[] = [
    {
      id: 'web-search',
      name: t.webSearch,
      description: t.webSearchDesc,
      icon: <Search className="size-5" />,
    },
    {
      id: 'fact-check',
      name: t.factCheck,
      description: t.factCheckDesc,
      icon: <CheckCircle2 className="size-5" />,
    },
    {
      id: 'image-generation',
      name: t.imageGeneration,
      description: t.imageGenerationDesc,
      icon: <ImageIcon className="size-5" />,
    },
    {
      id: 'deep-search',
      name: t.deepSearch,
      description: t.deepSearchDesc,
      icon: <Sparkles className="size-5" />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          transition={{ duration: 0.3, type: "spring", damping: 25 }}
          className="absolute bottom-full left-0 mb-6 bg-white/90 backdrop-blur-3xl border border-white/50 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden w-[calc(100vw-32px)] sm:w-96 max-w-[90vw] z-[100] p-3"
        >
          {/* Arrow */}
          <div className="absolute -bottom-2 left-6 size-4 bg-white/90 border-r border-b border-white/50 rotate-45" />

          <div className="p-5 border-b border-blue-100/30 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 rounded-[2rem] mb-3">
            <h3 className="font-bold text-blue-900 flex items-center gap-2">
              <Sparkles className="size-4 text-blue-500" />
              {t.plugins}
            </h3>
            <p className="text-[11px] text-blue-600/70 mt-1.5">{t.selectPlugins}</p>
          </div>

          <div className="space-y-1.5 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
            {pluginsList.map((plugin) => {
              const isSelected = selectedPlugins.includes(plugin.id);

              return (
                <button
                  key={plugin.id}
                  onClick={() => onPluginToggle(plugin.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-colors border ${isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-200/50'
                    : 'border-transparent bg-white/50 text-slate-700'
                    }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 transition-colors ${isSelected ? 'bg-white/20' : 'bg-blue-100/50'}`}>
                    <div className={isSelected ? 'text-white' : 'text-blue-600'}>
                      {plugin.icon}
                    </div>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-bold flex items-center justify-between text-sm sm:text-base">
                      <span className="truncate">{plugin.name || plugin.id}</span>
                      {isSelected && (
                        <div className="size-5 rounded-full bg-white flex items-center justify-center shadow-lg shrink-0">
                          <CheckCircle2 className="size-3 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <p className={`text-[10px] sm:text-xs mt-1.5 leading-relaxed ${isSelected ? 'text-blue-50' : 'text-slate-400'}`}>
                      {plugin.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}