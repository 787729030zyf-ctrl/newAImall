import React, { useRef, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { editImageWithStability } from '../services/stabilityEditService';
import {
  buildMakeupMask,
  MAKEUP_SHADES,
  type MakeupShade,
  type MakeupZone,
} from '../services/makeupMaskService';

interface AIMakeupProps {
  lang: Language;
  onBack: () => void;
}

async function normalizeUpload(file: File, maxSide = 1280): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image'));
    image.src = dataUrl;
  });

  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  if (scale >= 1 && file.size < 2.5 * 1024 * 1024) {
    return dataUrl;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.92);
}

const AIMakeup: React.FC<AIMakeupProps> = ({ lang, onBack }) => {
  const [image, setImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [maskPreview, setMaskPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [selectedZones, setSelectedZones] = useState<MakeupZone[]>([
    'lips',
    'eyeshadow',
    'blush',
  ]);
  const [selectedShade, setSelectedShade] = useState<MakeupShade>(MAKEUP_SHADES[0]);
  const [analysisNote, setAnalysisNote] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const labels = {
    preciseMask: lang === Language.ZH ? '精准区域' : 'Precise Areas',
    shade: lang === Language.ZH ? '商品色号' : 'Product Shade',
    maskReady: lang === Language.ZH ? '局部 Mask 已生成' : 'Local mask ready',
    lips: lang === Language.ZH ? '唇部' : 'Lips',
    eyeshadow: lang === Language.ZH ? '眼影' : 'Eyes',
    blush: lang === Language.ZH ? '腮红' : 'Blush',
    skin: lang === Language.ZH ? '肤色' : 'Skin',
  };

  const zoneOptions: { id: MakeupZone; label: string }[] = [
    { id: 'lips', label: labels.lips },
    { id: 'eyeshadow', label: labels.eyeshadow },
    { id: 'blush', label: labels.blush },
    { id: 'skin', label: labels.skin },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      normalizeUpload(file)
        .then((normalized) => {
        setImage(normalized);
        setResultImage(null);
        setMaskPreview(null);
        setAnalysisNote('');
        })
        .catch((error) => {
          console.error('Failed to prepare image', error);
          alert(error instanceof Error ? error.message : 'Failed to prepare image');
        });
    }
  };

  const toggleZone = (zone: MakeupZone) => {
    setSelectedZones((current) => {
      if (current.includes(zone)) {
        return current.length === 1
          ? current
          : current.filter((item) => item !== zone);
      }
      return [...current, zone];
    });
  };

  const handleApplyMakeup = async () => {
    if (!image || !prompt) return;

    setLoading(true);
    try {
      const mask = await buildMakeupMask(
        image,
        prompt,
        selectedZones,
        selectedShade
      );
      setMaskPreview(mask.maskDataUrl);
      setAnalysisNote(mask.analysis);

      const editedDataUrl = await editImageWithStability(image, mask.prompt, {
        maskDataUrl: mask.maskDataUrl,
        negativePrompt:
          'changed identity, changed face shape, changed background, changed hair, changed clothing, plastic skin, heavy artifacts, distorted eyes, distorted mouth',
      });
      setResultImage(editedDataUrl);
    } catch (error) {
      console.error('Failed to apply makeup', error);
      const msg =
        error instanceof Error ? error.message : 'Unknown error';
      alert(msg.length > 400 ? `${msg.slice(0, 400)}...` : msg);
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
              {maskPreview && !resultImage && !loading && (
                <img
                  src={maskPreview}
                  alt="Makeup mask"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                />
              )}
              {/* Split View Slider Simulation (Visual only for effect) */}
              {resultImage && (
                 <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs">
                    {TRANSLATIONS.aiGenerated[lang]}
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

          <div className="space-y-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{labels.preciseMask}</div>
              <div className="grid grid-cols-4 gap-2">
                {zoneOptions.map((zone) => {
                  const active = selectedZones.includes(zone.id);
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => toggleZone(zone.id)}
                      className={`h-10 rounded-lg border text-sm font-semibold transition-all ${
                        active
                          ? 'border-primary bg-primary/15 text-white'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-500'
                      }`}
                    >
                      {zone.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{labels.shade}</div>
              <div className="grid grid-cols-4 gap-2">
                {MAKEUP_SHADES.map((shade) => {
                  const active = selectedShade.id === shade.id;
                  return (
                    <button
                      key={shade.id}
                      type="button"
                      onClick={() => setSelectedShade(shade)}
                      className={`h-12 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                        active
                          ? 'border-primary bg-zinc-900 text-white'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-500'
                      }`}
                      title={shade.label}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/20"
                        style={{ backgroundColor: shade.value }}
                      ></span>
                      <span className="text-[10px] font-semibold leading-none">{shade.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {analysisNote && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-400">
              <span className="text-primary font-semibold">{labels.maskReady}</span>
              <span className="ml-2">{analysisNote}</span>
            </div>
          )}

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
             {loading ? TRANSLATIONS.processing[lang] : TRANSLATIONS.applyMakeup[lang]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIMakeup;
