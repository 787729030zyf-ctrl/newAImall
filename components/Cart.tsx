import React from 'react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CartProps {
  items: CartItem[];
  lang: Language;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onBack: () => void;
}

const Cart: React.FC<CartProps> = ({ items, lang, onUpdateQuantity, onRemove, onCheckout, onBack }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 animate-fade-in-up">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3 flex items-center">
        <button onClick={onBack} className="text-gray-600 px-2">
           <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">{TRANSLATIONS.myCart[lang]}</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      <div className="p-4 space-y-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-32 text-gray-400">
            <i className="fas fa-shopping-basket text-6xl mb-4 text-gray-200"></i>
            <p>{TRANSLATIONS.emptyCart[lang]}</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm flex gap-3 border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{item.title}</h3>
                  <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 p-1">
                    <i className="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-primary font-bold">{TRANSLATIONS.price[lang]}{item.price}</span>
                  <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-7">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2 text-gray-500 hover:text-primary disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2 text-gray-500 hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Checkout Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 shadow-up z-40 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
             <span className="text-gray-500 text-sm">{TRANSLATIONS.total[lang]}</span>
             <span className="text-2xl font-bold text-primary">{TRANSLATIONS.price[lang]}{total}</span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full bg-gradient-to-r from-primary to-rose-600 text-white font-bold py-3.5 rounded-full shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
          >
            {TRANSLATIONS.checkout[lang]} ({items.reduce((s, i) => s + i.quantity, 0)})
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;