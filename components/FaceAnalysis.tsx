import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Product } from '../types';
import ProductCard from './ProductCard';
import { COSMETIC_PRODUCTS, CosmeticProduct } from '../data/cosmeticsProducts';
import {
  askCosmeticAssistant,
  CosmeticAssistantResult,
  initializeCosmeticKnowledgeStore
} from '../lib/cosmeticAssistantTool';

interface FaceAnalysisProps {
  lang: Language;
  onProductClick: (p: Product) => void;
  onBack: () => void;
}

const EXAMPLE_QUESTIONS = [
  '我是暖黄皮、圆脸、单眼皮、宽鼻、薄唇，预算 30 美元，想要日常自然妆。',
  '冷白皮内双，想要约会感、显温柔的唇妆和腮红。',
  '圆脸宽鼻，预算 20 美元以内，想要控油持久一点。',
];

const CosmeticAssistantPage: React.FC<FaceAnalysisProps> = ({ lang, onProductClick, onBack }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<CosmeticAssistantResult | null>(null);
  const [streamedAnswer, setStreamedAnswer] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const categories = useMemo(() => ['All', 'Face', 'Eyes', 'Lips'], []);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    initializeCosmeticKnowledgeStore();
  }, []);

  useEffect(() => {
    if (!result) {
      setStreamedAnswer('');
      setIsStreaming(false);
      return;
    }

    setStreamedAnswer('');
    setIsStreaming(true);
    let index = 0;
    const answer = result.answer;
    const timer = window.setInterval(() => {
      index += 1;
      setStreamedAnswer(answer.slice(0, index));
      if (index >= answer.length) {
        window.clearInterval(timer);
        setIsStreaming(false);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [result]);

  const products = COSMETIC_PRODUCTS.filter(product => activeCategory === 'All' || product.category === activeCategory);

  const ask = (question = query) => {
    const cleaned = question.trim();
    if (!cleaned) return;
    setQuery(cleaned);
    setResult(null);
    setResult(askCosmeticAssistant(cleaned));
  };

  const openProduct = (product: CosmeticProduct) => {
    window.location.hash = product.route;
    onProductClick(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3 flex items-center">
        <button onClick={onBack} className="text-gray-600 px-2" aria-label="Back">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">
          {lang === Language.ZH ? '化妆品推荐助手' : 'Beauty Advisor'}
        </h1>
        <div className="w-8"></div>
      </div>

      <div className="px-4 pt-4">
        <div className="bg-white border border-rose-100 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wide">Beauty Advisor</p>
              <h2 className="text-xl font-serif font-bold text-gray-900 mt-1">个人定制化妆助手</h2>
            </div>
            <div className="w-11 h-11 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
              <i className="fas fa-wand-magic-sparkles"></i>
            </div>
          </div>

          <textarea
            value={query}
            onChange={event => setQuery(event.target.value)}
            rows={4}
            placeholder="描述肤色、脸型、眼型、鼻型、唇形、预算和偏好，例如：暖黄皮、圆脸、单眼皮、薄唇，预算 30 美元，想要日常自然妆。"
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-800 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          />

          <button
            onClick={() => ask()}
            className="mt-3 w-full h-11 rounded-full bg-gradient-to-r from-primary to-rose-600 text-white font-bold shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
          >
            询问并推荐商品
          </button>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {EXAMPLE_QUESTIONS.map(example => (
              <button
                key={example}
                onClick={() => ask(example)}
                className="shrink-0 max-w-[260px] text-left rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 hover:border-primary hover:text-primary transition-colors truncate"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="mt-4 bg-white border border-gray-100 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center">
                  <i className="fas fa-comment-dots text-sm"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">助手回答</h3>
                </div>
              </div>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
                {streamedAnswer}
                {isStreaming && <span className="ml-0.5 inline-block h-4 w-1 translate-y-0.5 animate-pulse bg-primary align-baseline"></span>}
              </p>

              <div className="mt-4 space-y-2">
                {result.recommendations.map(product => (
                  <button
                    key={product.id}
                    onClick={() => openProduct(product)}
                    className="w-full rounded-lg border border-rose-100 bg-rose-50 p-3 flex items-center gap-3 text-left hover:bg-rose-100 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-14 rounded-lg object-cover bg-white"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-primary mb-1">推荐商品卡</p>
                      <h4 className="font-bold text-gray-900 text-sm whitespace-normal leading-5">{product.title}</h4>
                      <p className="text-primary font-bold mt-1">${product.price}</p>
                    </div>
                    <i className="fas fa-chevron-right text-primary text-xs"></i>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 mb-4 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">推荐商品</h3>
        </div>

        <div className="bg-white border-y border-gray-100 -mx-4 px-4 py-3 flex gap-6 overflow-x-auto sticky top-[53px] z-40 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-sm font-bold relative ${activeCategory === category ? 'text-primary' : 'text-gray-500'}`}
            >
              {category === 'All' ? '全部' : category === 'Face' ? '底妆/脸部' : category === 'Eyes' ? '眼妆/眉毛' : '唇妆'}
              {activeCategory === category && <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-primary rounded-full"></span>}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-4 mt-4">
          <AnimatePresence mode="popLayout">
            {products.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} lang={lang} onClick={() => openProduct(product)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CosmeticAssistantPage;
