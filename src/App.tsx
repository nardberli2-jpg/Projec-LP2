/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Copy, 
  Check, 
  Terminal, 
  Package, 
  Target, 
  FileText, 
  Star, 
  Image as ImageIcon, 
  Palette, 
  Tag, 
  Code2,
  AlertCircle,
  Sparkles,
  RefreshCw
} from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

type Framework = "Before-After-Bridge (BAB)" | "AIDA (Attention-Interest-Desire-Action)" | "PAS (Problem-Agitate-Solution)";
type Style = "Direct & To The Point" | "Willy Wang Style (Pattern Interrupt)" | "Emotional & Persuasive";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    productName: "",
    marketingNarrative: "",
    description: "",
    advantages: "",
    images: "",
    dominantColor: "#f97316",
    strikethroughPrice: "",
    sellingPrice: "",
    visualDominant: "Image",
    embedForm: "",
    framework: "Before-After-Bridge (BAB)" as Framework,
    tone: "Willy Wang Style (Pattern Interrupt)" as Style,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateNow = async () => {
    if (!formData.productName || !formData.description) {
      setError("Isi data produk dan deskripsi dulu bro!");
      return;
    }
    setError(null);
    setLoading(true);
    setOutput("");

    const promptText = `
      Kamu adalah Expert Copywriter & Web Developer Landing Page Level Dunia.
      
      TUGAS: Buat Landing Page HTML lengkap (Single File) menggunakan Tailwind CSS.
      
      DATA INPUT:
      - Nama Produk: ${formData.productName}
      - Narasi Marketing: ${formData.marketingNarrative}
      - Deskripsi: ${formData.description}
      - Keunggulan: ${formData.advantages}
      - Gambar (URL dipisah koma): ${formData.images}
      - Warna Dominan: ${formData.dominantColor}
      - Harga Coret: ${formData.strikethroughPrice}
      - Harga Jual: ${formData.sellingPrice}
      - Visual Dominan: ${formData.visualDominant}
      - Embed Form: ${formData.embedForm}
      - Framework Copywriting: ${formData.framework}
      - Tone Style: ${formData.tone}
      
      INSTRUKSI KHUSUS:
      1. Gunakan Tone ${formData.tone}. Jika Willy Wang style, gunakan pola pikir yang sangat logis, mematahkan asumsi (pattern interrupt), to the point, dan tidak banyak basa-basi emosional yang lebay.
      2. Struktur harus mengikuti Framework ${formData.framework}.
      3. Warna dominan Produk adalah ${formData.dominantColor}. Gunakan warna ini untuk tombol, aksen, gradasi, dan bayangan (shadow) agar selaras.
      4. Pastikan Landing Page memiliki:
         - Hero Section (Headline yang nendang, Subheadline, CTA).
         - Section Visual Dominan (Gambar/Video Headline).
         - Section Masalah/Keinginan (berdasarkan framework).
         - Section Solusi & Deskripsi Produk.
         - Section Keunggulan (Gunakan icon dari lucide-react via CDN atau elemen visual Tailwind).
         - Section Galeri Gambar (jika ada input gambar).
         - Section Harga (Tampilan Harga Coret vs Harga Jual yang mencolok).
         - Section Embed Form (Tampilkan form atau placeholder area jika itu kode embed).
         - Footer.
      5. Landing Page harus Responsive (Mobile Friendly).
      6. Tambahkan animasi halus menggunakan transisi CSS atau Tailwind.
      
      OUTPUT: Hanya berikan kode HTML lengkap (termasuk tag <html>, <head>, <body>) tanpa penjelasan tambahan. Gunakan CDN Tailwind CSS: <script src="https://cdn.tailwindcss.com"></script>.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: promptText }] }],
      });

      const text = response.text || "";
      const cleanHtml = text.replace(/```html|```/g, "").trim();
      setOutput(cleanHtml);
    } catch (err: any) {
      console.error(err);
      setError("Koneksi Error! " + (err.message || "Gagal generate konten."));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#cbd5e1] font-sans p-6 overflow-x-hidden flex flex-col selection:bg-orange-500/30">
      <div className="w-full max-w-[1400px] mx-auto flex-1 flex flex-col">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6 border-b border-[#2d3748] pb-4">
          <div className="flex items-center gap-3">
            <Zap className="text-orange-500 fill-orange-500" size={24} />
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
              SESUAI<span className="text-orange-500 underline decoration-2 underline-offset-4">FORMAT</span> ENGINE_
              <span className="text-[10px] bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded ml-3 uppercase tracking-widest font-bold">PRO v2.4</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-emerald-500 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> DB CONNECTION ACTIVE</span>
            <span className="text-slate-500">v8.2.1-stable</span>
          </div>
        </header>

        <main className="grid grid-cols-12 gap-6 flex-1 min-h-0">
          {/* Configuration Panel (Left) */}
          <section className="col-span-12 lg:col-span-5 flex flex-col gap-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#151b27] border border-[#2d3748] rounded-xl p-6 flex-1 flex flex-col gap-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-orange-500 font-bold uppercase text-[10px] tracking-[0.25em] italic flex items-center gap-2">
                  <Terminal size={14} /> LANDING PAGE SETUP_
                </h2>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#2d3748]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#2d3748]"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Target size={10} /> Framework</label>
                  <select 
                    name="framework"
                    value={formData.framework}
                    onChange={handleInputChange}
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md p-2.5 text-sm text-white focus:border-orange-500 outline-none cursor-pointer appearance-none"
                  >
                    <option value="Before-After-Bridge (BAB)">BAB</option>
                    <option value="AIDA (Attention-Interest-Desire-Action)">AIDA</option>
                    <option value="PAS (Problem-Agitate-Solution)">PAS</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Sparkles size={10} /> Style Tone</label>
                  <select 
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md p-2.5 text-sm text-white focus:border-orange-500 outline-none cursor-pointer appearance-none"
                  >
                    <option value="Direct & To The Point">Direct</option>
                    <option value="Willy Wang Style (Pattern Interrupt)">Willy Wang</option>
                    <option value="Emotional & Persuasive">Emotional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Package size={10} /> Nama Produk</label>
                  <input 
                    type="text" 
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Ex: Scentpreneur Class"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md p-2.5 text-sm text-white focus:border-orange-500 outline-none placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Palette size={10} /> Warna Dominan</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      name="dominantColor"
                      value={formData.dominantColor}
                      onChange={handleInputChange}
                      className="flex-1 bg-[#1e293b] border border-[#334155] rounded-md p-2.5 text-xs text-white font-mono uppercase"
                    />
                    <input 
                      type="color" 
                      name="dominantColor"
                      value={formData.dominantColor}
                      onChange={handleInputChange}
                      className="w-10 h-10 bg-[#1e293b] border border-[#334155] rounded-md p-0.5 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><FileText size={10} /> Narasi Marketing</label>
                <input 
                  type="text" 
                  name="marketingNarrative"
                  value={formData.marketingNarrative}
                  onChange={handleInputChange}
                  placeholder="Arah marketing yang diinginkan..."
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-md p-2.5 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1 flex-1 min-h-0">
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Star size={10} /> Keunggulan Produk</label>
                <textarea 
                  name="advantages"
                  value={formData.advantages}
                  onChange={handleInputChange}
                  placeholder="Poin 1: Data akurat&#10;Poin 2: Profit nyata..."
                  className="w-full h-full bg-[#1e293b] border border-[#334155] rounded-md p-2.5 text-sm text-white resize-none outline-none focus:border-orange-500 min-h-[100px]"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Tag size={10} /> Harga Coret</label>
                  <input 
                    type="text" 
                    name="strikethroughPrice"
                    value={formData.strikethroughPrice}
                    onChange={handleInputChange}
                    placeholder="Rp 999.000"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md p-2.5 text-sm text-white/50 line-through outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><Tag size={10} /> Harga Jual</label>
                  <input 
                    type="text" 
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    placeholder="Rp 249.000"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-md p-2.5 text-sm text-orange-500 font-bold outline-none border-orange-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#2d3748]">
                {formData.images ? formData.images.split(',').slice(0, 3).map((img, i) => (
                  <div key={i} className="aspect-video bg-[#0b0e14] border border-[#334155] rounded overflow-hidden relative group">
                    <img src={img.trim()} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[9px] text-white font-mono">IMG 0{i+1}</span>
                    </div>
                  </div>
                )) : [1, 2, 3].map((_, i) => (
                  <div key={i} className="aspect-video bg-[#0b0e14] border border-dashed border-[#334155] rounded flex items-center justify-center text-[9px] text-slate-600">
                    EMPTY 0{i+1}
                  </div>
                ))}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] rounded-md">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                onClick={generateNow}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:scale-[1.01] transition-transform active:scale-95 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-900/20 uppercase tracking-[0.2em] text-xs disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
                {loading ? "Constructing Architecture..." : "Generate HTML Landing Page"}
              </button>
            </motion.div>
          </section>

          {/* Code Output (Right) */}
          <section className="col-span-12 lg:col-span-7 flex flex-col gap-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#05070a] border border-[#2d3748] rounded-xl flex-1 flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="bg-[#151b27] px-4 py-3 border-b border-[#2d3748] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  <span className="text-[10px] font-mono text-slate-500 ml-3 uppercase tracking-widest">Output: index.html</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  disabled={!output}
                  className={`text-[10px] px-4 py-1.5 rounded transition-all uppercase font-bold tracking-tight border ${
                    copySuccess 
                    ? "bg-green-500 text-white border-green-400" 
                    : "bg-[#1e293b] hover:bg-[#2d3748] text-white border-[#334155] disabled:opacity-20"
                  }`}
                >
                  {copySuccess ? "Copied!" : "Copy Code"}
                </button>
              </div>
              
              <div className="flex-1 font-mono text-[11px] overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-10 h-full bg-[#0a0c10] border-r border-[#1e293b] flex flex-col items-center pt-5 text-[#2d3748] select-none text-[9px] gap-0.5 opacity-50">
                  {Array.from({ length: 40 }).map((_, i) => <span key={i}>{i + 1}</span>)}
                </div>

                <AnimatePresence mode="wait">
                  {loading && (
                    <motion.div 
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin mb-4"></div>
                      <p className="text-orange-500 text-[10px] font-mono tracking-[0.3em] uppercase italic animate-pulse">Assembling Logical Modules...</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pl-12 p-5 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#2d3748] scrollbar-track-transparent">
                  <pre className="text-emerald-500/90 whitespace-pre-wrap selection:bg-emerald-500/20">
                    {output || (
                      <div className="h-full flex flex-col items-center justify-center text-slate-800 opacity-40 italic">
                        <Code2 size={48} className="mb-4" />
                        <span>$ Waiting for architecture input data...</span>
                      </div>
                    )}
                  </pre>
                </div>
              </div>

              {/* Analytics Bar */}
              <div className="bg-[#151b27] border-t border-[#2d3748] p-4 lg:grid grid-cols-4 gap-4 hidden">
                <div className="border-r border-[#2d3748] pr-4">
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Conversion Logic</p>
                  <p className="text-lg font-black text-white">{output ? "98.4%" : "0.0%"}</p>
                </div>
                <div className="border-r border-[#2d3748] pr-4">
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Speed Score</p>
                  <p className="text-lg font-black text-emerald-500">{output ? "0.4s" : "N/A"}</p>
                </div>
                <div className="border-r border-[#2d3748] pr-4">
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">SEO Readiness</p>
                  <p className="text-lg font-black text-white">{output ? "Optimal" : "WAIT"}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Status</p>
                  <p className={`text-lg font-black ${output ? "text-orange-500" : "text-slate-700"}`}>{output ? "READY" : "IDLE"}</p>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="mt-8 text-[9px] text-slate-600 flex justify-between items-center py-4 border-t border-[#151b27]">
          <span className="uppercase tracking-[0.2em] font-bold">© 2026 SESUAI FORMAT ENGINE. DESIGNED FOR HIGH CONVERSION CONTEXT.</span>
          <span className="flex gap-6 font-bold uppercase tracking-widest">
            <span className="hover:text-slate-400 cursor-pointer">TERMINAL LOGS</span>
            <span className="hover:text-slate-400 cursor-pointer">API_X_CORE</span>
            <span className="text-emerald-500/50">UPTIME 99.9%</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
