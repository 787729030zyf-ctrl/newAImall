import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Page, Language, Product, CartItem } from './types';
import { MOCK_PRODUCTS, TRANSLATIONS, COUNTRIES } from './constants';
import ProductCard from './components/ProductCard';
import AIMakeup from './components/AIMakeup';
import FaceAnalysis from './components/FaceAnalysis';
import Cart from './components/Cart';

// --- Helper Components ---

const NavBar = ({ active, onChange, lang, cartCount }: { active: string, onChange: (p: Page) => void, lang: Language, cartCount: number }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 h-16 flex items-center justify-around z-40 text-xs shadow-lg max-w-md mx-auto">
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
        className="flex flex-col items-center gap-1 -mt-6 group z-50"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-rose-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/40 text-white transform group-active:scale-95 transition-all duration-200 ring-4 ring-white">
           <i className="fas fa-magic text-2xl group-hover:rotate-12 transition-transform"></i>
        </div>
        <span className={`${active === Page.AI_MAKEUP ? 'text-primary font-bold' : 'text-gray-400'}`}>AI</span>
      </button>
      <button 
        onClick={() => onChange(Page.CART)}
        className={`flex flex-col items-center gap-1 relative ${active === Page.CART ? 'text-primary font-bold scale-105 transition-transform' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <div className="relative">
          <i className="fas fa-shopping-cart text-xl"></i>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border border-white">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>
      <button 
        onClick={() => onChange(Page.PROFILE)}
        className={`flex flex-col items-center gap-1 ${active === Page.PROFILE ? 'text-primary font-bold scale-105 transition-transform' : 'text-gray-400 hover:text-gray-600 transition-colors'}`}
      >
        <i className="fas fa-user text-xl"></i>
        <span>{TRANSLATIONS.profile[lang]}</span>
      </button>
    </div>
  );
};

// --- Toast Component ---
const Toast = ({ message }: { message: string | null }) => {
  if (!message) return null;
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-2xl animate-fade-in-up flex items-center gap-2">
      <i className="fas fa-check-circle text-green-400"></i>
      <span className="font-medium">{message}</span>
    </div>
  );
};

// --- Success Overlay ---
const OrderSuccess = ({ onContinue, lang }: { onContinue: () => void, lang: Language }) => {
  return (
    <div className="fixed inset-0 z-[70] bg-white flex flex-col items-center justify-center animate-fade-in">
       <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-blob">
         <i className="fas fa-check text-4xl text-green-500"></i>
       </div>
       <h2 className="text-2xl font-bold text-gray-800 mb-2">{TRANSLATIONS.orderSuccess[lang]}</h2>
       <p className="text-gray-500 mb-8">Your beauty products are on the way!</p>
       <button 
         onClick={onContinue}
         className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
       >
         {TRANSLATIONS.continueShopping[lang]}
       </button>
    </div>
  );
};

// --- Profile Page ---
const Profile: React.FC<{ lang: Language, onLogout: () => void }> = ({ lang, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
      <div className="bg-gradient-to-br from-primary to-rose-600 h-48 rounded-b-[3rem] relative shadow-lg">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl bg-white">
            <img src="https://picsum.photos/seed/user/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center px-6">
        <h2 className="text-2xl font-bold text-gray-800">Lumina User</h2>
        <p className="text-gray-500 text-sm">premium member</p>
      </div>

      <div className="mt-8 px-6 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-primary">
              <i className="fas fa-heart"></i>
            </div>
            <span className="font-medium text-gray-700">My Favorites</span>
          </div>
          <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
              <i className="fas fa-box"></i>
            </div>
            <span className="font-medium text-gray-700">My Orders</span>
          </div>
          <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
              <i className="fas fa-cog"></i>
            </div>
            <span className="font-medium text-gray-700">Settings</span>
          </div>
          <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
        </div>

        <button 
          onClick={onLogout}
          className="w-full mt-8 bg-white text-red-500 font-bold py-4 rounded-2xl shadow-sm border border-red-50 hover:bg-red-50 transition-colors"
        >
          {TRANSLATIONS.logout[lang]}
        </button>
      </div>
    </div>
  );
};

// --- Pages ---

const Login: React.FC<{ onLogin: () => void, countryCode: string, setCountryCode: (c: string) => void, lang: Language }> = ({ onLogin, countryCode, setCountryCode, lang }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const currentCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      setTimeout(() => {
        onLogin();
      }, 800);
    }
  };

  const handleSocialLogin = () => {
      // Simulate login
      setIsLoading(true);
      setTimeout(() => {
        onLogin();
      }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#fff0f3]">
      
      {/* Country/Language Selector */}
      <div className="absolute top-6 right-6 z-50">
          <div className="relative">
              <button 
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/60 pl-3 pr-4 py-2 rounded-full shadow-sm hover:bg-white/60 transition-all group"
              >
                  <span className="text-xl drop-shadow-sm">{currentCountry.flag}</span>
                  <span className="font-medium text-gray-700 text-sm group-hover:text-gray-900">{currentCountry.name}</span>
                  <i className={`fas fa-chevron-down text-[10px] text-gray-500 ml-1 transition-transform duration-300 ${isCountryOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {isCountryOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 overflow-hidden animate-fade-in origin-top-right">
                      {COUNTRIES.map(c => (
                          <button
                              key={c.code}
                              onClick={() => {
                                  setCountryCode(c.code);
                                  setIsCountryOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left
                                  ${c.code === countryCode ? 'bg-rose-50 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}
                              `}
                          >
                              <span className="text-lg">{c.flag}</span>
                              <span>{c.name}</span>
                              {c.code === countryCode && <i className="fas fa-check text-xs ml-auto text-primary"></i>}
                          </button>
                      ))}
                  </div>
              )}
          </div>
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-r from-rose-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-l from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-[60%] h-[60%] bg-gradient-to-t from-red-100 to-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-6">
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/80 p-8 transform transition-all duration-500 hover:shadow-[0_25px_60px_rgba(255,77,79,0.1)]">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4 group">
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
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-300/50 flex-1"></div>
              <span className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">{lang === Language.EN ? 'Or login with' : '其他登录方式'}</span>
              <div className="h-px bg-gray-300/50 flex-1"></div>
            </div>
            <div className="flex justify-center gap-5">
              <button 
                onClick={handleSocialLogin}
                className="w-12 h-12 rounded-full bg-[#07C160] text-white shadow-lg hover:shadow-green-200 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center"
              >
                <i className="fab fa-weixin text-2xl"></i>
              </button>
              <button 
                onClick={handleSocialLogin}
                className="w-12 h-12 rounded-full bg-[#12B7F5] text-white shadow-lg hover:shadow-blue-200 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center"
              >
                <i className="fab fa-qq text-xl"></i>
              </button>
               <button 
                onClick={handleSocialLogin}
                className="w-12 h-12 rounded-full bg-black text-white shadow-lg hover:shadow-gray-300 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center"
              >
                <i className="fab fa-tiktok text-xl"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  lang: Language;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, lang, onAddToCart, onBuyNow }) => {
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
      </div>
      <div className="p-5 pb-24 -mt-6 relative bg-white rounded-t-3xl shadow-up">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="flex items-baseline justify-between mb-3">
           <div className="flex items-baseline gap-2">
             <span className="text-3xl font-bold text-primary">{TRANSLATIONS.price[lang]}{product.price}</span>
           </div>
           <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded font-medium">Top Seller</span>
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

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 px-4 flex gap-3 h-[80px] items-center pb-6 z-50 max-w-md mx-auto">
        <div className="flex gap-6 px-2 mr-2 text-gray-400">
           <div className="flex flex-col items-center cursor-pointer hover:text-gray-800 transition-colors"><i className="fas fa-store text-lg mb-0.5"></i><span className="text-[10px]">Shop</span></div>
           <div className="flex flex-col items-center cursor-pointer hover:text-gray-800 transition-colors"><i className="fas fa-comment-dots text-lg mb-0.5"></i><span className="text-[10px]">Chat</span></div>
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="flex-1 bg-gradient-to-r from-orange-300 to-orange-400 text-white font-bold h-11 rounded-full text-sm shadow-md hover:shadow-lg transition-shadow"
        >
           {TRANSLATIONS.addToCart[lang]}
        </button>
        <button 
          onClick={() => onBuyNow(product)}
          className="flex-1 bg-gradient-to-r from-primary to-rose-600 text-white font-bold h-11 rounded-full text-sm shadow-lg hover:shadow-xl shadow-primary/30 transition-shadow"
        >
           {TRANSLATIONS.buyNow[lang]}
        </button>
      </div>
    </div>
  );
};

const Home: React.FC<{ 
  lang: Language, 
  onProductClick: (p: Product) => void,
  countryCode: string,
  setCountryCode: (c: string) => void
}> = ({ lang, onProductClick, countryCode, setCountryCode }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const categories = ['All', 'Lips', 'Face', 'Eyes', 'Skincare'];
  const filteredProducts = activeCategory === 'All' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  
  const currentCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white/90 backdrop-blur-md px-4 py-3 sticky top-0 z-30 shadow-sm transition-all">
        <div className="flex items-center gap-3">
           <div className="flex-1 bg-gray-100 rounded-full h-10 flex items-center px-4 gap-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
             <i className="fas fa-search text-gray-400 text-sm"></i>
             <input type="text" placeholder="Search products..." className="bg-transparent text-sm w-full outline-none placeholder-gray-400 text-gray-700" />
           </div>
           
           {/* Home Country Selector */}
           <div className="relative">
             <button 
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex items-center gap-1 text-gray-500 font-bold text-xs border border-gray-200 pl-2 pr-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
             >
                <span className="text-base">{currentCountry.flag}</span>
                <i className={`fas fa-chevron-down text-[10px] transform transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}></i>
             </button>
             {isCountryOpen && (
               <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden z-50 animate-fade-in">
                  {COUNTRIES.map(c => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCountryCode(c.code);
                        setIsCountryOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 ${c.code === countryCode ? 'bg-rose-50 text-primary font-bold' : 'text-gray-600'}`}
                    >
                       <span className="text-base">{c.flag}</span>
                       <span>{c.name}</span>
                    </button>
                  ))}
               </div>
             )}
           </div>
        </div>
      </div>
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
  const [countryCode, setCountryCode] = useState('US');
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Derived Language State
  const currentCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];
  const lang = currentCountry.lang;

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Handlers ---

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const addToCart = (product: Product, showFeedback = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (showFeedback) showToast(TRANSLATIONS.itemAdded[lang]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleBuyNow = (product: Product) => {
    // Immediate "One-Click" Purchase Simulation
    setIsProcessing(true);
    // In a real app, this would redirect to checkout with just this item
    // Here we simulate a processing delay then success
    setTimeout(() => {
      setIsProcessing(false);
      setShowOrderSuccess(true);
      setSelectedProduct(null); // Close modal
    }, 1500);
  };

  const handleCartCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCart([]); // Clear cart
      setShowOrderSuccess(true);
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <Login 
        onLogin={() => setIsLoggedIn(true)} 
        countryCode={countryCode} 
        setCountryCode={setCountryCode} 
        lang={lang}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden">
      
      {/* Notifications & Overlays */}
      <Toast message={toastMessage} />
      {showOrderSuccess && (
        <OrderSuccess 
          lang={lang} 
          onContinue={() => {
            setShowOrderSuccess(false);
            setActivePage(Page.HOME);
          }} 
        />
      )}
      
      {/* Loading Overlay for Payments */}
      {isProcessing && (
        <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center">
             <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary mb-3"></div>
             <p className="font-bold text-gray-700">{TRANSLATIONS.paymentProcessing[lang]}</p>
          </div>
        </div>
      )}

      {/* Pages */}
      <div className={`transition-opacity duration-300 ${selectedProduct ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {activePage === Page.HOME && (
          <Home 
            lang={lang} 
            onProductClick={setSelectedProduct} 
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
        )}
        
        {activePage === Page.FACE_ANALYSIS && (
          <FaceAnalysis lang={lang} onProductClick={setSelectedProduct} onBack={() => setActivePage(Page.HOME)} />
        )}

        {activePage === Page.AI_MAKEUP && (
          <AIMakeup lang={lang} onBack={() => setActivePage(Page.HOME)} />
        )}

        {activePage === Page.CART && (
          <Cart 
            items={cart} 
            lang={lang} 
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onCheckout={handleCartCheckout}
            onBack={() => setActivePage(Page.HOME)}
          />
        )}

        {activePage === Page.PROFILE && (
          <Profile lang={lang} onLogout={() => setIsLoggedIn(false)} />
        )}
      </div>

      {/* Global Product Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          lang={lang} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* Navigation */}
      {activePage !== Page.AI_MAKEUP && !selectedProduct && (
        <NavBar 
          active={activePage} 
          onChange={setActivePage} 
          lang={lang} 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
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