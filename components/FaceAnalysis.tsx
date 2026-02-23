import React, { useState } from 'react';
import { Language, Product, UserPreferences } from '../types';
import { MOCK_PRODUCTS, TRANSLATIONS } from '../constants';
import ProductCard from './ProductCard';

interface FaceAnalysisProps {
  lang: Language;
  onProductClick: (p: Product) => void;
  onBack: () => void;
}

const FaceAnalysis: React.FC<FaceAnalysisProps> = ({ lang, onProductClick, onBack }) => {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState<UserPreferences>({});
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const eyes = [
    { id: 'almond', label: TRANSLATIONS.almond[lang], icon: 'fa-eye' },
    { id: 'round', label: TRANSLATIONS.round[lang], icon: 'fa-regular fa-eye' },
    { id: 'monolid', label: TRANSLATIONS.monolid[lang], icon: 'fa-eye-slash' },
  ];

  const noses = [
    { id: 'button', label: TRANSLATIONS.button[lang], icon: 'fa-circle' },
    { id: 'straight', label: TRANSLATIONS.straight[lang], icon: 'fa-grip-lines-vertical' },
    { id: 'wide', label: TRANSLATIONS.wide[lang], icon: 'fa-cloud' },
  ];

  const lips = [
    { id: 'full', label: TRANSLATIONS.full[lang], icon: 'fa-heart' },
    { id: 'thin', label: TRANSLATIONS.thin[lang], icon: 'fa-minus' },
    { id: 'bow', label: TRANSLATIONS.bow[lang], icon: 'fa-kiss-wink-heart' },
  ];

  const handleSelection = (type: keyof UserPreferences, value: string) => {
    setPrefs(prev => ({ ...prev, [type]: value }));
  };

  const getRecommendations = () => {
    // Simple mock logic for recommendation based on selection
    // In a real app, this would use Gemini or a complex algorithm
    let recs = [...MOCK_PRODUCTS];
    if (prefs.eyeShape === 'monolid') {
      recs = recs.filter(p => p.category === 'Eyes');
    } else if (prefs.lipShape === 'full') {
      recs = recs.filter(p => p.category === 'Lips');
    } else {
      recs = recs.filter(p => p.category === 'Face' || p.sales > 10000);
    }
    setRecommendations(recs.slice(0, 4));
    setStep(4);
  };

  const SelectionCard = ({ 
    options, 
    currentValue, 
    field, 
    title 
  }: { 
    options: any[], 
    currentValue: string | undefined, 
    field: keyof UserPreferences, 
    title: string 
  }) => (
    <div className="mb-8 animate-fade-in-up">
      <h3 className="text-xl font-serif text-gray-800 mb-6 text-center">{title}</h3>
      <div className="grid grid-cols-3 gap-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelection(field, opt.id)}
            className={`
              flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300
              ${currentValue === opt.id 
                ? 'border-primary bg-accent text-primary scale-105 shadow-lg' 
                : 'border-gray-200 bg-white text-gray-500 hover:border-primary/50'}
            `}
          >
            <i className={`fas ${opt.icon} text-3xl mb-3`}></i>
            <span className="text-sm font-medium">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3 flex items-center">
        <button onClick={onBack} className="text-gray-600 px-2">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">{TRANSLATIONS.faceAnalysis[lang]}</h1>
        <div className="w-8"></div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {step < 4 && (
          <div className="mb-8">
             <div className="flex justify-between mb-2">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`h-1 flex-1 mx-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-200'}`} />
               ))}
             </div>
             <p className="text-center text-gray-500 text-sm mt-4">
               {TRANSLATIONS.analyzeDesc[lang]}
             </p>
          </div>
        )}

        {step === 1 && (
          <SelectionCard 
            title={TRANSLATIONS.selectEye[lang]} 
            options={eyes} 
            field="eyeShape" 
            currentValue={prefs.eyeShape} 
          />
        )}

        {step === 2 && (
          <SelectionCard 
            title={TRANSLATIONS.selectNose[lang]} 
            options={noses} 
            field="noseShape" 
            currentValue={prefs.noseShape} 
          />
        )}

        {step === 3 && (
          <SelectionCard 
            title={TRANSLATIONS.selectLip[lang]} 
            options={lips} 
            field="lipShape" 
            currentValue={prefs.lipShape} 
          />
        )}

        {step === 4 && (
          <div className="animate-fade-in">
             <h2 className="text-2xl font-serif text-center mb-6 text-gray-800">
               {TRANSLATIONS.recommendations[lang]}
             </h2>
             <div className="grid grid-cols-2 gap-4">
               {recommendations.map(p => (
                 <ProductCard 
                   key={p.id} 
                   product={p} 
                   lang={lang} 
                   onClick={onProductClick} 
                 />
               ))}
             </div>
             <button 
               onClick={() => { setStep(1); setPrefs({}); }}
               className="w-full mt-8 py-3 text-gray-500 font-medium underline"
             >
               {TRANSLATIONS.startOver[lang]}
             </button>
          </div>
        )}

        {step < 4 && (
          <button
            disabled={
              (step === 1 && !prefs.eyeShape) ||
              (step === 2 && !prefs.noseShape) ||
              (step === 3 && !prefs.lipShape)
            }
            onClick={() => step === 3 ? getRecommendations() : setStep(s => s + 1)}
            className={`
              w-full py-3.5 rounded-full text-white font-bold text-lg shadow-lg mt-6 transition-all
              ${((step === 1 && !prefs.eyeShape) || (step === 2 && !prefs.noseShape) || (step === 3 && !prefs.lipShape))
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary to-pink-500 hover:shadow-xl transform hover:-translate-y-0.5'}
            `}
          >
            {step === 3 ? TRANSLATIONS.getResults[lang] : TRANSLATIONS.next[lang]}
          </button>
        )}
      </div>
    </div>
  );
};

export default FaceAnalysis;