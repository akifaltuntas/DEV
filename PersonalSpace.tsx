
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, CheckCircle2, ShieldCheck, Shield, User, EyeOff
} from 'lucide-react';

interface NoteEntry {
  id: string;
  text: string;
  date: string;
}

interface PersonalSpaceProps {
  onBack: () => void;
  isFocusMode: boolean;
  setIsFocusMode: (val: boolean) => void;
}

const PersonalSpace: React.FC<PersonalSpaceProps> = ({ onBack, isFocusMode, setIsFocusMode }) => {
  const [timer, setTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [roadmap, setRoadmap] = useState({ learn: '', struggle: '', nextStep: '' });
  const [notesHistory, setNotesHistory] = useState<NoteEntry[]>([]);

  useEffect(() => {
    const savedRoadmap = localStorage.getItem('akif_dev_roadmap');
    if (savedRoadmap) setRoadmap(JSON.parse(savedRoadmap));
    const savedNotes = localStorage.getItem('akif_dev_personal_notes');
    if (savedNotes) setNotesHistory(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    let interval: any;
    if (timerActive && timer !== null && timer > 0) {
      interval = setInterval(() => setTimer(prev => (prev !== null ? prev - 1 : null)), 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isFocusMode) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
        <motion.p 
          animate={{ opacity: [0.2, 0.5, 0.2] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className="text-white text-3xl font-light tracking-[0.6em] uppercase mb-16"
        >
          Derin Odak
        </motion.p>
        <button 
          onClick={() => setIsFocusMode(false)} 
          className="text-slate-500 hover:text-white transition-all text-xs border border-slate-900 px-8 py-3 rounded-full hover:border-violet-500/50"
        >
          Odak Modundan Çık
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto selection:bg-violet-500/30"
    >
      <button onClick={onBack} className="flex items-center gap-3 text-slate-500 hover:text-violet-400 transition-all mb-16 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </button>

      <div className="mb-24 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-10">
          <Shield className="w-32 h-32 text-violet-500" />
        </div>
        <h1 className="text-6xl font-bold mb-6 text-white tracking-tight">Kişisel <span className="text-violet-400">Zihin Alanı</span></h1>
        <p className="text-slate-500 text-xl font-light max-w-2xl mx-auto italic leading-relaxed">
          “Gürültüyü kapat, zihnini dinle. Burada sadece senin hedeflerin ve gelişimin var.”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Odak Süresi Kartı */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-slate-900/30 border border-violet-500/10 p-12 rounded-[3.5rem] hover:border-violet-500/30 transition-all shadow-2xl backdrop-blur-md flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
              <Clock className="text-violet-400 w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-white">Odak Süresi Başlat</h3>
          </div>
          
          <div className="flex gap-4 mb-12">
            {[15, 25, 45].map(m => (
              <button 
                key={m} 
                onClick={() => { setTimer(m * 60); setTimerActive(true); }} 
                className="bg-slate-950/50 border border-slate-800 px-8 py-4 rounded-2xl hover:border-violet-500/50 hover:text-violet-400 transition-all text-sm font-bold"
              >
                {m} Dk
              </button>
            ))}
          </div>

          {timer !== null ? (
            <div className="text-center">
              <div className="text-6xl font-mono text-violet-400 mb-8 tracking-tighter">{formatTime(timer)}</div>
              <button 
                onClick={() => setIsFocusMode(true)}
                className="px-10 py-4 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-all flex items-center gap-3"
              >
                <EyeOff className="w-5 h-5" /> Görünümü Kapat
              </button>
            </div>
          ) : (
            <p className="text-slate-500 text-sm italic">Bir süre seçerek derin çalışmaya başla.</p>
          )}
        </motion.div>

        {/* Günlük Gelişim Kartı */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-slate-900/30 border border-violet-500/10 p-12 rounded-[3.5rem] hover:border-violet-500/30 transition-all shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
              <CheckCircle2 className="text-violet-400 w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-white">Bugün Kendim İçin</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { id: 'l', label: 'Yeni bir kavram öğrendim', sub: 'Teorik veya pratik bir bilgi.' },
              { id: 's', label: 'Zorluğa rağmen devam ettim', sub: 'Pes etmeme iradesi.' },
              { id: 'p', label: 'Planıma sadık kaldım', sub: 'Disiplinli ilerleme.' },
              { id: 'r', label: 'Zihnimi dinlendirdim', sub: 'Kaliteli mola.' }
            ].map(item => (
              <label key={item.id} className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-violet-500/5 transition-all">
                <div className="relative flex items-center">
                  <input type="checkbox" className="w-6 h-6 rounded-lg bg-slate-950 border-slate-800 text-violet-500 focus:ring-0 cursor-pointer" />
                </div>
                <div>
                  <span className="block text-slate-200 font-medium group-hover:text-violet-300 transition-colors">{item.label}</span>
                  <span className="text-slate-500 text-xs italic">{item.sub}</span>
                </div>
              </label>
            ))}
          </div>
        </motion.div>

      </div>

      <div className="mt-32 pt-16 border-t border-slate-900/50 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 text-slate-600 text-[10px] uppercase tracking-[0.4em] font-bold">
          <ShieldCheck className="w-4 h-4 text-violet-500/50" />
          <span>Gizli ve Yerel Arşiv</span>
        </div>
        <p className="text-slate-700 text-[11px] text-center max-w-sm font-light leading-relaxed">
          Bu alandaki tüm veriler sadece senin tarayıcında saklanır. <br />
          Dış dünya burayı göremez.
        </p>
      </div>
    </motion.div>
  );
};

export default PersonalSpace;
