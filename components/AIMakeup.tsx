import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { applyMakeup } from '../services/geminiService';

interface AIMakeupProps {
  lang: Language;
  onBack: () => void;
}

const AIMakeup: React.FC<AIMakeupProps> = ({ lang, onBack }) => {
  const [image, setImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyMakeup = async () => {
    if (!image || !prompt) return;

    setLoading(true);
    try {
      const base64Data = image.split(',')[1]; // Remove data:image/jpeg;base64, prefix
      const editedBase64 = await applyMakeup(base64Data, prompt);
      setResultImage(`data:image/jpeg;base64,${editedBase64}`);
    } catch (error) {
      console.error("Failed to apply makeup", error);
      alert("Failed to generate makeup. Ensure API Key is set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
       {/* Header */}
       <div className="px-4 py-4 flex items-center justify-between bg-zinc-900 border-b border-zinc-800">
        <button onClick={onBack} className="text-white p-2">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-lg font-bold tracking-wider">{TRANSLATIONS.aiMakeup[lang]}</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 flex flex-col items-center p-4">
        
        {/* Main Display Area */}
        <div className="relative w-full max-w-md aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl mb-6 group">
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors"
            >
              <i className="fas fa-camera text-4xl text-zinc-600 mb-2"></i>
              <span className="text-zinc-500">{TRANSLATIONS.uploadImage[lang]}</span>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={resultImage || image} 
                alt="Makeup Trial" 
                className="w-full h-full object-cover"
              />
              {/* Split View Slider Simulation (Visual only for effect) */}
              {resultImage && (
                 <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs">
                    AI Generated
                 </div>
              )}
              {loading && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-3"></div>
                  <p className="text-primary font-medium animate-pulse">{TRANSLATIONS.generating[lang]}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Re-upload button overlaid */}
          {image && !loading && (
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
             >
               <i className="fas fa-sync-alt text-white"></i>
             </button>
          )}
        </div>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Controls */}
        <div className="w-full max-w-md space-y-4">
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={TRANSLATIONS.promptPlaceholder[lang]}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <i className="fas fa-magic absolute right-4 top-3.5 text-zinc-500"></i>
          </div>

          <button
            onClick={handleApplyMakeup}
            disabled={!image || !prompt || loading}
            className={`
              w-full py-4 rounded-xl font-bold text-lg tracking-wide uppercase transition-all
              ${(!image || !prompt || loading)
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-primary text-white shadow-[0_0_20px_rgba(255,77,79,0.4)] hover:shadow-[0_0_30px_rgba(255,77,79,0.6)] transform hover:scale-[1.02]'}
            `}
          >
             {loading ? 'Processing...' : 'Apply Makeup'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIMakeup;