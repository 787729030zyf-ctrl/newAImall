import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Page, Language, Product } from './types';
import { MOCK_PRODUCTS, TRANSLATIONS } from './constants';
import ProductCard from './components/ProductCard';
import AIMakeup from './components/AIMakeup';
import FaceAnalysis from './components/FaceAnalysis';

// --- Helper Components ---

const NavBar = ({ active, onChange, lang }: { active: string, onChange: (p: Page) => void, lang: Language }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-16 flex items-center justify-around z-50 text-xs">
      <button 
        onClick={() => onChange(Page.HOME)}
        className={`flex flex-col items-center gap-1 ${active === Page.HOME ? 'text-primary font-bold' : 'text-gray-400'}`}
      >
        <i className="fas fa-home text-xl"></i>
        <span>{TRANSLATIONS.home[lang]}</span>
      </button>
      <button 
        onClick={() => onChange(Page.FACE_ANALYSIS)}
        className={`flex flex-col items-center gap-1 ${active === Page.FACE_ANALYSIS ? 'text-primary font-bold' : 'text-gray-400'}`}
      >
        <i className="fas fa-grin-stars text-xl"></i>
        <span>{TRANSLATIONS.faceAnalysis[lang]}</span>
      </button>
      <button 
        onClick={() => onChange(Page.AI_MAKEUP)}
        className="flex flex-col items-center gap-1 -mt-6"
      >
        <div className="w-14 h-14 bg-gradient-to-tr from-primary to-orange-500 rounded-full flex items-center justify-center shadow-lg text-white">
           <i className="fas fa-magic text-2xl"></i>
        </div>
        <span className={`${active === Page.AI_MAKEUP ? 'text-primary font-bold' : 'text-gray-400'}`}>AI</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <i className="fas fa-shopping-cart text-xl"></i>
        <span>Cart</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <i className="fas fa-user text-xl"></i>
        <span>Me</span>
      </button>
    </div>
  );
};

// --- Pages ---

const Login: React.FC<{ onLogin: () => void, lang: Language }> = ({ onLogin, lang }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      // Simulate network request for better UX feel
      setTimeout(() => {
        onLogin();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 m-4 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-pink-500 text-white mb-6 shadow-xl shadow-primary/20 transform rotate-6 hover:rotate-0 transition-transform duration-500">
             <i className="fas fa-gem text-4xl"></i>
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-2 tracking-tight">
            {TRANSLATIONS.appTitle[lang]}
          </h1>
          <p className="text-gray-500 text-sm tracking-wide uppercase font-medium">
            {lang === Language.EN ? 'Premium Beauty Experience' : '高端美妆体验'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <i className="fas fa-envelope text-gray-400 group-focus-within:text-primary transition-colors"></i>
               </div>
               <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={TRANSLATIONS.email[lang]}
                className="w-full pl-11 pr-4 py-4 bg-white/60 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all placeholder-gray-400 shadow-sm"
                required 
              />
            </div>
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <i className="fas fa-lock text-gray-400 group-focus-within:text-primary transition-colors"></i>
               </div>
               <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={TRANSLATIONS.password[lang]}
                className="w-full pl-11 pr-4 py-4 bg-white/60 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all placeholder-gray-400 shadow-sm"
                required 
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 px-1 font-medium">
             <label className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
               <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300 w-4 h-4" />
               <span>{lang === Language.EN ? 'Remember me' : '记住我'}</span>
             </label>
             <button type="button" className="hover:text-primary transition-colors">
               {lang === Language.EN ? 'Forgot Password?' : '忘记密码?'}
             </button>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
               <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
               <>
                 {TRANSLATIONS.login[lang]}
                 <i className="fas fa-arrow-right text-sm opacity-80"></i>
               </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex justify-center text-xs">
            <span className="bg-white/0 px-2 text-gray-400 uppercase tracking-widest z-10 font-medium shadow-sm backdrop-blur-sm rounded">
               {lang === Language.EN ? 'Or continue with' : '其他方式登录'}
            </span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200 -z-0"></div>
          </div>
          <div className="mt-6 flex justify-center gap-6">
             {['google', 'apple', 'facebook'].map(icon => (
               <button key={icon} className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/30 hover:shadow-md transition-all duration-300 transform hover:scale-110">
                 <i className={`fab fa-${icon} text-xl`}></i>
               </button>
             ))}
          </div>
        </div>
      </div>
      
      {/* CSS Animation for background blobs */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

const ProductDetail: React.FC<{ product: Product | null, onClose: () => void, lang: Language }> = ({ product, onClose, lang }) => {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-white overflow-y-auto animate-fade-in-up">
      <div className="relative">
        <img src={product.image} className="w-full aspect-square object-cover" alt={product.title} />
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 bg-black/30 text-white rounded-full p-2 backdrop-blur-md"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>
      <div className="p-4 pb-24">
        <div className="flex items-baseline gap-2 mb-2">
           <span className="text-2xl font-bold text-primary">{TRANSLATIONS.price[lang]}{product.price}</span>
           <span className="text-sm text-gray-400 line-through">{TRANSLATIONS.price[lang]}{Math.floor(product.price * 1.2)}</span>
        </div>
        <h1 className="text-lg font-medium text-gray-900 mb-4">{product.title}</h1>
        
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
           <h2 className="text-sm font-bold text-gray-700 mb-2">Details</h2>
           <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
           {product.tags.map(t => (
             <span key={t} className="px-3 py-1 bg-pink-50 text-primary text-xs rounded-full">{t}</span>
           ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 px-4 flex gap-2 h-16 items-center">
        <div className="flex-1 flex gap-4 justify-center text-gray-500 text-xs">
           <div className="flex flex-col items-center"><i className="fas fa-store mb-1"></i>Shop</div>
           <div className="flex flex-col items-center"><i className="fas fa-comment-dots mb-1"></i>Chat</div>
        </div>
        <button className="flex-1 bg-yellow-400 text-white font-bold h-10 rounded-l-full text-sm">
           {TRANSLATIONS.addToCart[lang]}
        </button>
        <button className="flex-1 bg-primary text-white font-bold h-10 rounded-r-full text-sm">
           {TRANSLATIONS.buyNow[lang]}
        </button>
      </div>
    </div>
  );
};

const Home: React.FC<{ 
  lang: Language, 
  onProductClick: (p: Product) => void,
  setLang: (l: Language) => void 
}> = ({ lang, onProductClick, setLang }) => {
  
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Lips', 'Face', 'Eyes', 'Skincare'];

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-primary p-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
           <div className="flex-1 bg-white rounded-full h-9 flex items-center px-3 gap-2">
             <i className="fas fa-search text-gray-400"></i>
             <input type="text" placeholder="Search" className="bg-transparent text-sm w-full outline-none" />
           </div>
           <button 
             onClick={() => setLang(lang === Language.EN ? Language.ZH : Language.EN)}
             className="text-white font-medium text-xs border border-white/30 px-2 py-1 rounded"
           >
             {lang}
           </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white overflow-x-auto whitespace-nowrap px-4 py-3 flex gap-6 scrollbar-hide">
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`text-sm font-medium relative ${activeCategory === c ? 'text-primary' : 'text-gray-600'}`}
          >
            {c}
            {activeCategory === c && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"></div>}
          </button>
        ))}
      </div>

      {/* Banner */}
      <div className="px-3 py-3">
        <div className="w-full h-32 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-between px-6 text-white shadow-lg overflow-hidden relative">
           <div className="z-10">
             <h2 className="font-bold text-lg mb-1">New Arrivals</h2>
             <p className="text-xs opacity-90">Check out the latest trends</p>
           </div>
           <i className="fas fa-crown text-6xl opacity-20 absolute -right-2 -bottom-4"></i>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-2">
        <div className="grid grid-cols-2 gap-2">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              lang={lang} 
              onClick={onProductClick} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App Controller ---

const AppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState<Language>(Language.EN);
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Simple Router Logic replacement for complex Routing
  // Since we are using HashRouter for top level, but internal navigation is custom state based for the "App" feel
  
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} lang={lang} />;
  }

  const handleProductClick = (p: Product) => {
    setSelectedProduct(p);
  };

  return (
    <div className="max-w-screen-sm mx-auto bg-white min-h-screen relative shadow-2xl">
      {/* Pages */}
      {activePage === Page.HOME && (
        <Home lang={lang} onProductClick={handleProductClick} setLang={setLang} />
      )}
      
      {activePage === Page.FACE_ANALYSIS && (
        <FaceAnalysis lang={lang} onProductClick={handleProductClick} onBack={() => setActivePage(Page.HOME)} />
      )}

      {activePage === Page.AI_MAKEUP && (
        <AIMakeup lang={lang} onBack={() => setActivePage(Page.HOME)} />
      )}

      {/* Global Product Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          lang={lang} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Navigation - Hide on full screen features if desired, but good to keep generally */}
      {activePage !== Page.AI_MAKEUP && !selectedProduct && (
        <NavBar active={activePage} onChange={setActivePage} lang={lang} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;