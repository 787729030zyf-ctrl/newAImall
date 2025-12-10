import { Product, Translation, Language } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Velvet Matte Lipstick - Ruby Woo",
    price: 129,
    sales: 12000,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
    category: "Lips",
    tags: ["Matte", "Long-lasting"],
    description: "Iconic red lipstick with a velvet matte finish."
  },
  {
    id: 2,
    title: "Hydrating Foundation - Ivory",
    price: 249,
    sales: 8500,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=600&auto=format&fit=crop",
    category: "Face",
    tags: ["Full Coverage", "Hydrating"],
    description: "Flawless coverage that lasts all day."
  },
  {
    id: 3,
    title: "Volumizing Mascara",
    price: 89,
    sales: 22000,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?q=80&w=600&auto=format&fit=crop",
    category: "Eyes",
    tags: ["Waterproof", "Black"],
    description: "Dramatic volume and length for your lashes."
  },
  {
    id: 4,
    title: "Rose Gold Eyeshadow Palette",
    price: 320,
    sales: 5400,
    image: "https://zyflgj.oss-cn-beijing.aliyuncs.com/f70bfb49daaa62af702be204c12a51b3.jpg",
    category: "Eyes",
    tags: ["Shimmer", "Matte", "12 Colors"],
    description: "A versatile palette for day and night looks."
  },
  {
    id: 5,
    title: "Soft Blush - Peachy Keen",
    price: 110,
    sales: 9000,
    image: "https://images.unsplash.com/photo-1557205465-f3762edea6d3?q=80&w=600&auto=format&fit=crop",
    category: "Face",
    tags: ["Natural", "Powder"],
    description: "Adds a natural flush to your cheeks."
  },
  {
    id: 6,
    title: "Liquid Eyeliner - Jet Black",
    price: 75,
    sales: 15000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    category: "Eyes",
    tags: ["Precise", "Waterproof"],
    description: "Create sharp wings with ease."
  }
];

export const TRANSLATIONS: Translation = {
  appTitle: { [Language.EN]: "Lumina Beauty", [Language.ZH]: "Lumina 美妆" },
  login: { [Language.EN]: "Login", [Language.ZH]: "登录" },
  email: { [Language.EN]: "Email", [Language.ZH]: "邮箱" },
  password: { [Language.EN]: "Password", [Language.ZH]: "密码" },
  home: { [Language.EN]: "Home", [Language.ZH]: "首页" },
  aiMakeup: { [Language.EN]: "AI Makeup", [Language.ZH]: "AI 试妆" },
  faceAnalysis: { [Language.EN]: "Face Analysis", [Language.ZH]: "面部分析" },
  recommendations: { [Language.EN]: "Recommended For You", [Language.ZH]: "为您推荐" },
  price: { [Language.EN]: "$", [Language.ZH]: "¥" },
  sold: { [Language.EN]: "sold", [Language.ZH]: "人付款" },
  addToCart: { [Language.EN]: "Add to Cart", [Language.ZH]: "加入购物车" },
  buyNow: { [Language.EN]: "Buy Now", [Language.ZH]: "立即购买" },
  uploadImage: { [Language.EN]: "Upload Selfie", [Language.ZH]: "上传自拍" },
  generating: { [Language.EN]: "AI is applying makeup...", [Language.ZH]: "AI 正在上妆..." },
  analyzeDesc: { [Language.EN]: "Select your features to get personalized recommendations.", [Language.ZH]: "选择您的面部特征以获取个性化推荐。" },
  selectEye: { [Language.EN]: "Select Eye Shape", [Language.ZH]: "选择眼型" },
  selectNose: { [Language.EN]: "Select Nose Shape", [Language.ZH]: "选择鼻型" },
  selectLip: { [Language.EN]: "Select Lip Shape", [Language.ZH]: "选择唇型" },
  getResults: { [Language.EN]: "Get Recommendations", [Language.ZH]: "获取推荐" },
  promptPlaceholder: { [Language.EN]: "Describe makeup (e.g., red lipstick)", [Language.ZH]: "描述妆容 (例如：红唇, 烟熏妆)" },
  logout: { [Language.EN]: "Logout", [Language.ZH]: "退出登录" }
};