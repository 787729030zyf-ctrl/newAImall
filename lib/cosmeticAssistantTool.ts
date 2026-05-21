import { COSMETIC_PRODUCTS, CosmeticProduct } from '../data/cosmeticsProducts';
import { COSMETICS_FEATURE_GUIDE } from '../data/cosmeticsFeatureGuide';

export interface CosmeticAssistantResult {
  answer: string;
  recommendation: CosmeticProduct;
  recommendations: CosmeticProduct[];
  evidence: string[];
  extractedProfile: Record<string, string>;
}

interface VectorRecord {
  id: string;
  source: string;
  text: string;
  vector: Record<string, number>;
  productRoute?: string;
}

const DB_KEY = 'cosmetic-assistant-db-v1';
const VECTOR_KEY = 'cosmetic-assistant-vector-store-v1';

const FEATURE_ALIASES: Record<string, string[]> = {
  'fair cool': ['冷白', '冷调白', '白皮冷调', 'cool fair'],
  'fair warm': ['暖白', '暖调白', '黄一白', 'warm fair'],
  'light neutral': ['浅肤', '中性白', 'neutral light'],
  'medium warm': ['黄皮', '暖黄皮', '中等暖肤', 'medium warm'],
  'deep warm': ['深肤', '小麦', '深色皮肤', 'deep'],
  round: ['圆脸', '圆润脸', 'round face'],
  square: ['方脸', '下颌明显', 'square face'],
  long: ['长脸', '脸长', 'long face'],
  heart: ['心形脸', '倒三角脸', 'heart face'],
  oval: ['鹅蛋脸', '椭圆脸', 'oval face'],
  monolid: ['单眼皮', 'monolid'],
  hooded: ['内双', '肿眼泡', 'hooded'],
  almond: ['杏眼', 'almond'],
  'round eye': ['圆眼'],
  wide: ['宽鼻', '鼻翼宽', 'wide nose'],
  button: ['塌鼻', '小翘鼻', '纽扣鼻', 'button nose'],
  straight: ['直鼻', '高鼻梁', 'straight nose'],
  thin: ['薄唇', 'thin lips'],
  full: ['厚唇', '丰满唇', 'full lips'],
  'cupid bow': ['m唇', '唇峰', '丘比特弓', 'cupid bow'],
  budget: ['预算', '便宜', '平价', 'budget'],
  glow: ['水光', '光泽', '提亮', 'glow'],
  matte: ['哑光', '控油', 'matte'],
  natural: ['日常', '自然', '通勤', 'natural'],
  date: ['约会', '温柔', 'date'],
  photo: ['上镜', '拍照', '持久', 'photo']
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function tokenize(text: string): string[] {
  const normalized = normalize(text);
  const words = normalized.match(/[\u4e00-\u9fff]+|[a-z0-9]+/g) || [];
  const tokens = new Set<string>();

  for (const word of words) {
    tokens.add(word);
    if (/^[\u4e00-\u9fff]+$/.test(word)) {
      for (const char of word) tokens.add(char);
      for (let index = 0; index < word.length - 1; index += 1) {
        tokens.add(word.slice(index, index + 2));
      }
    }
  }

  return Array.from(tokens);
}

function vectorize(text: string): Record<string, number> {
  const vector: Record<string, number> = {};
  for (const token of tokenize(text)) {
    vector[token] = (vector[token] || 0) + 1;
  }
  return vector;
}

function cosine(a: Record<string, number>, b: Record<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const [token, value] of Object.entries(a)) {
    normA += value * value;
    dot += value * (b[token] || 0);
  }
  for (const value of Object.values(b)) {
    normB += value * value;
  }

  return normA && normB ? dot / Math.sqrt(normA * normB) : 0;
}

function productKnowledgeText(product: CosmeticProduct): string {
  return [
    product.title,
    product.category,
    product.description,
    product.tags.join(' '),
    `适合肤色 ${product.suitableSkinTone.join(' ')}`,
    `适合脸型 ${product.suitableFaceShape.join(' ')}`,
    `适合眼型 ${product.suitableEyeShape.join(' ')}`,
    `适合鼻型 ${product.suitableNoseShape.join(' ')}`,
    `适合唇形 ${product.suitableLipShape.join(' ')}`,
    `价格 ${product.price}`,
    `商品卡路由 ${product.route}`,
    product.recommendationReason
  ].join('\n');
}

function buildVectorRecords(): VectorRecord[] {
  const guideSections = COSMETICS_FEATURE_GUIDE
    .split(/\n(?=[^\n]+：)/)
    .map((section, index) => ({
      id: `guide-${index + 1}`,
      source: 'feature-guide',
      text: section.trim(),
      vector: vectorize(section)
    }))
    .filter(record => record.text.length > 0);

  const productRecords = COSMETIC_PRODUCTS.map(product => {
    const text = productKnowledgeText(product);
    return {
      id: `product-${product.id}`,
      source: 'product-catalog',
      text,
      vector: vectorize(text),
      productRoute: product.route
    };
  });

  return [...productRecords, ...guideSections];
}

export function initializeCosmeticKnowledgeStore(): void {
  const vectorRecords = buildVectorRecords();
  const dbPayload = {
    namespace: 'cosmetic-recommendation-assistant',
    version: 1,
    productCount: COSMETIC_PRODUCTS.length,
    guideCharacterCount: COSMETICS_FEATURE_GUIDE.length,
    products: COSMETIC_PRODUCTS,
    guide: COSMETICS_FEATURE_GUIDE,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(DB_KEY, JSON.stringify(dbPayload));
    localStorage.setItem(VECTOR_KEY, JSON.stringify(vectorRecords));
  } catch {
    // Storage can be unavailable in private or restricted browser modes; the assistant still works in memory.
  }
}

export function getCosmeticKnowledgeStoreStatus() {
  let productCount = COSMETIC_PRODUCTS.length;
  let vectorCount = buildVectorRecords().length;
  let hasDatabase = false;
  let hasVectorStore = false;

  try {
    const db = localStorage.getItem(DB_KEY);
    const vectorStore = localStorage.getItem(VECTOR_KEY);
    hasDatabase = Boolean(db);
    hasVectorStore = Boolean(vectorStore);
    if (db) productCount = JSON.parse(db).productCount || productCount;
    if (vectorStore) vectorCount = JSON.parse(vectorStore).length || vectorCount;
  } catch {
    hasDatabase = false;
    hasVectorStore = false;
  }

  return { hasDatabase, hasVectorStore, productCount, vectorCount };
}

function retrieveKnowledge(query: string, limit = 5): VectorRecord[] {
  const queryVector = vectorize(query);
  let records = buildVectorRecords();

  try {
    const stored = localStorage.getItem(VECTOR_KEY);
    if (stored) records = JSON.parse(stored);
  } catch {
    records = buildVectorRecords();
  }

  return records
    .map(record => ({ record, score: cosine(queryVector, record.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.record);
}

function extractProfile(query: string): Record<string, string> {
  const normalized = normalize(query);
  const profile: Record<string, string> = {};

  for (const [feature, aliases] of Object.entries(FEATURE_ALIASES)) {
    if (aliases.some(alias => normalized.includes(alias.toLowerCase()))) {
      if (['fair cool', 'fair warm', 'light neutral', 'medium warm', 'deep warm'].includes(feature)) {
        profile.skinTone = feature;
      } else if (['round', 'square', 'long', 'heart', 'oval'].includes(feature)) {
        profile.faceShape = feature;
      } else if (['monolid', 'hooded', 'almond', 'round eye'].includes(feature)) {
        profile.eyeShape = feature === 'round eye' ? 'round' : feature;
      } else if (['wide', 'button', 'straight'].includes(feature)) {
        profile.noseShape = feature;
      } else if (['thin', 'full', 'cupid bow'].includes(feature)) {
        profile.lipShape = feature;
      } else {
        profile.preference = [profile.preference, feature].filter(Boolean).join(' ');
      }
    }
  }

  const budgetMatch = normalized.match(/(?:预算|budget|under|以内|不超过|低于)\s*[$￥¥]?\s*(\d+)/);
  if (budgetMatch) profile.budget = budgetMatch[1];

  return profile;
}

function includesFeature(values: string[], target?: string): boolean {
  if (!target) return false;
  return values.some(value => value === 'all' || value.toLowerCase().includes(target.toLowerCase()));
}

function scoreProduct(product: CosmeticProduct, profile: Record<string, string>, query: string): number {
  let score = cosine(vectorize(query), vectorize(productKnowledgeText(product))) * 4;
  if (includesFeature(product.suitableSkinTone, profile.skinTone)) score += 2;
  if (includesFeature(product.suitableFaceShape, profile.faceShape)) score += 2;
  if (includesFeature(product.suitableEyeShape, profile.eyeShape)) score += 2;
  if (includesFeature(product.suitableNoseShape, profile.noseShape)) score += 1.5;
  if (includesFeature(product.suitableLipShape, profile.lipShape)) score += 1.5;

  const budget = Number(profile.budget);
  if (budget > 0) {
    if (product.price <= budget) score += 3;
    else score -= Math.min(4, (product.price - budget) / 10);
  }

  const preference = profile.preference || '';
  if (preference.includes('glow') && /glow|shine|oil|glowy|highlight/i.test(productKnowledgeText(product))) score += 1.5;
  if (preference.includes('matte') && /matte|powder|setting|oil/i.test(productKnowledgeText(product))) score += 1.5;
  if (preference.includes('natural') && /natural|nude|soft|daily|balm/i.test(productKnowledgeText(product))) score += 1.5;
  if (preference.includes('date') && /rose|pink|glow|berry|soft/i.test(productKnowledgeText(product))) score += 1;
  if (preference.includes('photo') && /setting|contour|red|long|waterproof/i.test(productKnowledgeText(product))) score += 1;

  return score;
}

function chooseRecommendations(query: string, profile: Record<string, string>, limit = 3): CosmeticProduct[] {
  return [...COSMETIC_PRODUCTS]
    .map(product => ({ product, score: scoreProduct(product, profile, query) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
}

function buildAnswer(query: string, profile: Record<string, string>, evidence: string[]): string {
  const parts: string[] = [];
  const wantsBase = /粉底|底妆|遮瑕|base|foundation|concealer/.test(query);
  const wantsLip = /口红|唇|lip|唇蜜|唇油/.test(query);
  const wantsEye = /眼|睫毛|眉|eyeliner|mascara|brow|shadow/.test(query);

  if (wantsBase) {
    parts.push('底妆优先看肤色、肤质和持妆需求：油皮或想要更利落的妆面可以选哑光控油，干皮或约会妆更适合缎光、光泽型底妆。');
  } else if (wantsLip) {
    parts.push('唇妆优先看肤色冷暖和唇形：薄唇更适合唇线叠加光泽质地，厚唇或想显高级时可以选柔雾、莓调或低饱和色。');
  } else if (wantsEye) {
    parts.push('眼妆要先看眼型：单眼皮、内双更适合细眼线、卷翘睫毛和局部提亮，圆眼可以用外眼角拉长来增加精致度。');
  } else {
    parts.push('我会先按你的肤色、脸型、眼型、鼻型、唇形和预算做匹配，再在妆效偏好里选择最稳的单品。');
  }

  const profileText = [
    profile.skinTone && `肤色偏 ${profile.skinTone}`,
    profile.faceShape && `脸型偏 ${profile.faceShape}`,
    profile.eyeShape && `眼型偏 ${profile.eyeShape}`,
    profile.noseShape && `鼻型偏 ${profile.noseShape}`,
    profile.lipShape && `唇形偏 ${profile.lipShape}`,
    profile.budget && `预算约 ${profile.budget} 美元`
  ].filter(Boolean).join('，');

  if (profileText) {
    parts.push(`从你的描述里我识别到：${profileText}。`);
  } else {
    parts.push('你还没有给出很完整的面部特征，所以我会优先选择适配面更广、容错率更高的单品。');
  }

  if (evidence[0]) {
    parts.push(`知识库里的搭配逻辑提示：${evidence[0].replace(/\s+/g, ' ')}`);
  }

  return parts.join('\n');
}

export function askCosmeticAssistant(query: string): CosmeticAssistantResult {
  initializeCosmeticKnowledgeStore();
  const retrieved = retrieveKnowledge(query, 4);
  const profile = extractProfile(query);
  const recommendations = chooseRecommendations(query, profile, 3);

  return {
    answer: buildAnswer(query, profile, retrieved.map(item => item.text)),
    recommendation: recommendations[0],
    recommendations,
    evidence: retrieved.map(item => item.id),
    extractedProfile: profile
  };
}

export function findCosmeticProductByRoute(route: string): CosmeticProduct | undefined {
  return COSMETIC_PRODUCTS.find(product => product.route === route);
}
