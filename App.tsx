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
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 h-16 flex items-center justify-around z-50 text-xs shadow-lg">
      <button 
        onClick={() => onChange(Page.HOME)}
        className={`flex flex-col items-center gap-1 ${active === Page.HOME ? 'text-primary font-bold scale-105 transition-transform' : 'text-gray-400'}`}
      >
        <i className="fas fa-home text-xl"></i>
        <span>{TRANSLATIONS.home[lang]}</span>
      </button>
      <button 
        onClick={() => onChange(Page.FACE_ANALYSIS)}
        className={`flex flex-col items-center gap-1 ${active === Page.FACE_ANALYSIS ? 'text-primary font-bold scale-105 transition-transform' : 'text-gray-400'}`}
      >
        <i className="fas fa-grin-stars text-xl"></i>
        <span>{TRANSLATIONS.faceAnalysis[lang]}</span>
      </button>
      <button 
        onClick={() => onChange(Page.AI_MAKEUP)}
        className="flex flex-col items-center gap-1 -mt-6 group"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-rose-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/40 text-white transform group-active:scale-95 transition-all duration-200 ring-4 ring-white">
           <i className="fas fa-magic text-2xl group-hover:rotate-12 transition-transform"></i>
        </div>
        <span className={`${active === Page.AI_MAKEUP ? 'text-primary font-bold' : 'text-gray-400'}`}>AI</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
        <i className="fas fa-shopping-cart text-xl"></i>
        <span>Cart</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
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
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#fff0f3]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-r from-rose-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-l from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-[60%] h-[60%] bg-gradient-to-t from-red-100 to-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        {/* Subtle mesh overlay pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-6">
        {/* Glass Card */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/80 p-8 transform transition-all duration-500 hover:shadow-[0_25px_60px_rgba(255,77,79,0.1)]">
          
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-rose-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-rose-50 flex items-center justify-center shadow-inner border border-white">
                <i className="fas fa-gem text-4xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-rose-600"></i>
              </div>
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2 tracking-tight">
              {TRANSLATIONS.appTitle[lang]}
            </h1>
            <p className="text-gray-500 text-xs tracking-[0.2em] uppercase font-medium">
              {lang === Language.EN ? 'Redefining Beauty' : '重塑美妆体验'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="group relative">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <i className="fas fa-envelope text-gray-400 group-focus-within:text-primary transition-colors duration-300"></i>
                 </div>
                 <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={TRANSLATIONS.email[lang]}
                  className="block w-full pl-11 pr-4 py-4 bg-white/50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-white transition-all duration-300 shadow-sm"
                  required 
                />
              </div>
              <div className="group relative">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <i className="fas fa-lock text-gray-400 group-focus-within:text-primary transition-colors duration-300"></i>
                 </div>
                 <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={TRANSLATIONS.password[lang]}
                  className="block w-full pl-11 pr-4 py-4 bg-white/50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-white transition-all duration-300 shadow-sm"
                  required 
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
               <label className="flex items-center gap-2 cursor-pointer group">
                 <div className="relative flex items-center">
                   <input type="checkbox" className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-all cursor-pointer" />
                 </div>
                 <span className="text-gray-500 group-hover:text-gray-700 transition-colors">{lang === Language.EN ? 'Keep signed in' : '保持登录'}</span>
               </label>
               <button type="button" className="text-primary font-medium hover:text-rose-700 transition-colors">
                 {lang === Language.EN ? 'Forgot Password?' : '忘记密码?'}
               </button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-rose-500 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(255,77,79,0.3)] hover:shadow-[0_15px_25px_rgba(255,77,79,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              {isLoading ? (
                 <div className="flex items-center justify-center gap-2">
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 </div>
              ) : (
                 <span className="flex items-center justify-center gap-2">
                   {TRANSLATIONS.login[lang]}
                   <i className="fas fa-arrow-right text-sm transform group-hover:translate-x-1 transition-transform"></i>
                 </span>
              )}
              {/* Shine effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#fff6f7]/80 backdrop-blur px-4 py-1 text-gray-400 uppercase tracking-widest z-10 font-medium rounded-full border border-white/50">
                 {lang === Language.EN ? 'Or connect with' : '第三方登录'}
              </span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <div className="mt-6 flex justify-center gap-5">
               {[
                 { icon: 'google', color: 'hover:text-red-500 hover:border-red-100' }, 
                 { icon: 'apple', color: 'hover:text-black hover:border-gray-300' }, 
                 { icon: 'facebook', color: 'hover:text-blue-600 hover:border-blue-100' }
               ].map((item) => (
                 <button key={item.icon} className={`w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm ${item.color} hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
                   <i className={`fab fa-${item.icon} text-xl`}></i>
                 </button>
               ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-xs text-gray-400 font-medium">
          <p>{lang === Language.EN ? "Don't have an account?" : "还没有账号？"} 
            <button className="text-primary hover:underline ml-1 font-bold">
              {lang === Language.EN ? "Sign up" : "立即注册"}
            </button>
          </p>
        </div>
      </div>
      
      {/* CSS Animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shine {
          100% { left: 125%; }
        }
        .animate-shine {
          animation: shine 1s;
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-60"></div>
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 backdrop-blur-md transition-all"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <button 
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 backdrop-blur-md transition-all"
        >
          <i className="far fa-heart"></i>
        </button>
      </div>
      <div className="p-5 pb-24 -mt-6 relative bg-white rounded-t-3xl shadow-up">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="flex items-baseline justify-between mb-3">
           <div className="flex items-baseline gap-2">
             <span className="text-3xl font-bold text-primary">{TRANSLATIONS.price[lang]}{product.price}</span>
             <span className="text-sm text-gray-400 line-through decoration-gray-300">{TRANSLATIONS.price[lang]}{Math.floor(product.price * 1.2)}</span>
           </div>
           <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded font-medium">
             Top Seller
           </span>
        </div>
        <h1 className="text-xl font-serif font-bold text-gray-900 mb-6 leading-snug">{product.title}</h1>
        
        <div className="space-y-4">
           <div>
             <h2 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide opacity-80">Description</h2>
             <p className="text-sm text-gray-500 leading-relaxed font-light">{product.description}</p>
           </div>
           
           <div>
             <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide opacity-80">Tags</h2>
             <div className="flex flex-wrap gap-2">
               {product.tags.map(t => (
                 <span key={t} className="px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-100 text-xs rounded-full">{t}</span>
               ))}
            </div>
           </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 px-4 flex gap-3 h-[80px] items-center pb-6 z-50">
        <div className="flex gap-6 px-2 mr-2 text-gray-400">
           <div className="flex flex-col items-center cursor-pointer hover:text-gray-800 transition-colors"><i className="fas fa-store text-lg mb-0.5"></i><span className="text-[10px]">Shop</span></div>
           <div className="flex flex-col items-center cursor-pointer hover:text-gray-800 transition-colors"><i className="fas fa-comment-dots text-lg mb-0.5"></i><span className="text-[10px]">Chat</span></div>
        </div>
        <button className="flex-1 bg-gradient-to-r from-orange-300 to-orange-400 text-white font-bold h-11 rounded-full text-sm shadow-md hover:shadow-lg transition-shadow">
           {TRANSLATIONS.addToCart[lang]}
        </button>
        <button className="flex-1 bg-gradient-to-r from-primary to-rose-600 text-white font-bold h-11 rounded-full text-sm shadow-lg hover:shadow-xl shadow-primary/30 transition-shadow">
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
      <div className="bg-white/90 backdrop-blur-md px-4 py-3 sticky top-0 z-40 shadow-sm transition-all">
        <div className="flex items-center gap-3">
           <div className="flex-1 bg-gray-100 rounded-full h-10 flex items-center px-4 gap-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
             <i className="fas fa-search text-gray-400 text-sm"></i>
             <input type="text" placeholder="Search products..." className="bg-transparent text-sm w-full outline-none placeholder-gray-400 text-gray-700" />
           </div>
           <button 
             onClick={() => setLang(lang === Language.EN ? Language.ZH : Language.EN)}
             className="text-gray-500 font-bold text-xs border border-gray-200 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
           >
             {lang}
           </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-50 overflow-x-auto whitespace-nowrap px-4 py-4 flex gap-8 scrollbar-hide">
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`text-sm tracking-wide relative transition-colors ${activeCategory === c ? 'text-primary font-bold' : 'text-gray-500 font-medium hover:text-gray-800'}`}
          >
            {c}
            {activeCategory === c && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
          </button>
        ))}
      </div>

      {/* Banner */}
      <div className="p-4">
        <div className="w-full aspect-[2/1] rounded-2xl bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] flex items-center justify-between px-8 text-white shadow-xl shadow-pink-200/50 overflow-hidden relative group cursor-pointer">
           <div className="z-10 transform group-hover:translate-x-2 transition-transform duration-500">
             <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">New Season</span>
             <h2 className="font-serif font-bold text-2xl mb-1 leading-tight">Summer <br/>Collection</h2>
             <p className="text-xs opacity-90 mt-2 font-medium">Up to 50% OFF</p>
           </div>
           <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent"></div>
           <i className="fas fa-crown text-8xl opacity-10 absolute -right-4 -bottom-6 rotate-12 group-hover:rotate-0 transition-transform duration-700"></i>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 text-lg">Popular</h3>
          <button className="text-xs text-primary font-medium">See All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
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

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} lang={lang} />;
  }

  const handleProductClick = (p: Product) => {
    setSelectedProduct(p);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden">
      {/* Pages */}
      <div className={`transition-opacity duration-300 ${selectedProduct ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {activePage === Page.HOME && (
          <Home lang={lang} onProductClick={handleProductClick} setLang={setLang} />
        )}
        
        {activePage === Page.FACE_ANALYSIS && (
          <FaceAnalysis lang={lang} onProductClick={handleProductClick} onBack={() => setActivePage(Page.HOME)} />
        )}

        {activePage === Page.AI_MAKEUP && (
          <AIMakeup lang={lang} onBack={() => setActivePage(Page.HOME)} />
        )}
      </div>

      {/* Global Product Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          lang={lang} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Navigation */}
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