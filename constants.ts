import { Product, Translation, Language } from './types';

export const COUNTRIES = [
  { code: 'US', name: 'USA', lang: Language.EN, flag: '🇺🇸' },
  { code: 'GB', name: 'UK', lang: Language.EN, flag: '🇬🇧' },
  { code: 'CN', name: 'China', lang: Language.ZH, flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', lang: Language.JP, flag: '🇯🇵' },
  { code: 'KR', name: 'Korea', lang: Language.KR, flag: '🇰🇷' },
  { code: 'FR', name: 'France', lang: Language.FR, flag: '🇫🇷' },
];

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
  appTitle: { 
    [Language.EN]: "Lumina Beauty", 
    [Language.ZH]: "Lumina 美妆",
    [Language.JP]: "Lumina ビューティー",
    [Language.KR]: "루미나 뷰티",
    [Language.FR]: "Lumina Beauté"
  },
  login: { 
    [Language.EN]: "Login", 
    [Language.ZH]: "登录",
    [Language.JP]: "ログイン",
    [Language.KR]: "로그인",
    [Language.FR]: "Connexion"
  },
  email: { 
    [Language.EN]: "Email", 
    [Language.ZH]: "邮箱",
    [Language.JP]: "メール",
    [Language.KR]: "이메일",
    [Language.FR]: "Email"
  },
  password: { 
    [Language.EN]: "Password", 
    [Language.ZH]: "密码",
    [Language.JP]: "パスワード",
    [Language.KR]: "비밀번호",
    [Language.FR]: "Mot de passe"
  },
  home: { 
    [Language.EN]: "Home", 
    [Language.ZH]: "首页",
    [Language.JP]: "ホーム",
    [Language.KR]: "홈",
    [Language.FR]: "Accueil"
  },
  aiMakeup: { 
    [Language.EN]: "AI Makeup", 
    [Language.ZH]: "AI 试妆",
    [Language.JP]: "AI メイク",
    [Language.KR]: "AI 메이크업",
    [Language.FR]: "Maquillage IA"
  },
  faceAnalysis: { 
    [Language.EN]: "Face Analysis", 
    [Language.ZH]: "面部分析",
    [Language.JP]: "顔分析",
    [Language.KR]: "얼굴 분석",
    [Language.FR]: "Analyse faciale"
  },
  recommendations: { 
    [Language.EN]: "Recommended For You", 
    [Language.ZH]: "为您推荐",
    [Language.JP]: "おすすめ",
    [Language.KR]: "추천 상품",
    [Language.FR]: "Recommandé pour vous"
  },
  price: { 
    [Language.EN]: "$", 
    [Language.ZH]: "¥",
    [Language.JP]: "¥",
    [Language.KR]: "₩",
    [Language.FR]: "€"
  },
  sold: { 
    [Language.EN]: "sold", 
    [Language.ZH]: "人付款",
    [Language.JP]: "購入済み",
    [Language.KR]: "구매 완료",
    [Language.FR]: "vendus"
  },
  addToCart: { 
    [Language.EN]: "Add to Cart", 
    [Language.ZH]: "加入购物车",
    [Language.JP]: "カートに追加",
    [Language.KR]: "장바구니 담기",
    [Language.FR]: "Ajouter au panier"
  },
  buyNow: { 
    [Language.EN]: "Buy Now", 
    [Language.ZH]: "立即购买",
    [Language.JP]: "今すぐ購入",
    [Language.KR]: "바로 구매",
    [Language.FR]: "Acheter"
  },
  uploadImage: { 
    [Language.EN]: "Upload Selfie", 
    [Language.ZH]: "上传自拍",
    [Language.JP]: "自撮りをアップ",
    [Language.KR]: "셀카 업로드",
    [Language.FR]: "Télécharger un selfie"
  },
  generating: { 
    [Language.EN]: "AI is applying makeup...", 
    [Language.ZH]: "AI 正在上妆...",
    [Language.JP]: "AIメイク適用中...",
    [Language.KR]: "AI 메이크업 적용 중...",
    [Language.FR]: "L'IA applique le maquillage..."
  },
  analyzeDesc: { 
    [Language.EN]: "Select your features to get personalized recommendations.", 
    [Language.ZH]: "选择您的面部特征以获取个性化推荐。",
    [Language.JP]: "特徴を選択して、パーソナライズされたおすすめを取得します。",
    [Language.KR]: "얼굴 특징을 선택하여 맞춤 추천을 받으세요.",
    [Language.FR]: "Sélectionnez vos caractéristiques pour obtenir des recommandations."
  },
  selectEye: { 
    [Language.EN]: "Select Eye Shape", 
    [Language.ZH]: "选择眼型",
    [Language.JP]: "目の形を選択",
    [Language.KR]: "눈 모양 선택",
    [Language.FR]: "Forme des yeux"
  },
  selectNose: { 
    [Language.EN]: "Select Nose Shape", 
    [Language.ZH]: "选择鼻型",
    [Language.JP]: "鼻の形を選択",
    [Language.KR]: "코 모양 선택",
    [Language.FR]: "Forme du nez"
  },
  selectLip: { 
    [Language.EN]: "Select Lip Shape", 
    [Language.ZH]: "选择唇型",
    [Language.JP]: "唇の形を選択",
    [Language.KR]: "입술 모양 선택",
    [Language.FR]: "Forme des lèvres"
  },
  getResults: { 
    [Language.EN]: "Get Recommendations", 
    [Language.ZH]: "获取推荐",
    [Language.JP]: "おすすめを表示",
    [Language.KR]: "추천 받기",
    [Language.FR]: "Obtenir des recommandations"
  },
  promptPlaceholder: { 
    [Language.EN]: "Describe makeup (e.g., red lipstick)", 
    [Language.ZH]: "描述妆容 (例如：红唇, 烟熏妆)",
    [Language.JP]: "メイクを説明 (例: 赤い口紅)",
    [Language.KR]: "메이크업 설명 (예: 레드 립스틱)",
    [Language.FR]: "Décrivez le maquillage (ex: rouge à lèvres)"
  },
  logout: { 
    [Language.EN]: "Logout", 
    [Language.ZH]: "退出登录",
    [Language.JP]: "ログアウト",
    [Language.KR]: "로그아웃",
    [Language.FR]: "Déconnexion"
  },
  myCart: { 
    [Language.EN]: "My Cart", 
    [Language.ZH]: "我的购物车",
    [Language.JP]: "マイカート",
    [Language.KR]: "장바구니",
    [Language.FR]: "Mon panier"
  },
  checkout: { 
    [Language.EN]: "Checkout", 
    [Language.ZH]: "去结算",
    [Language.JP]: "チェックアウト",
    [Language.KR]: "결제하기",
    [Language.FR]: "Payer"
  },
  total: { 
    [Language.EN]: "Total", 
    [Language.ZH]: "合计",
    [Language.JP]: "合計",
    [Language.KR]: "합계",
    [Language.FR]: "Total"
  },
  emptyCart: { 
    [Language.EN]: "Your cart is empty", 
    [Language.ZH]: "购物车空空如也",
    [Language.JP]: "カートは空です",
    [Language.KR]: "장바구니가 비었습니다",
    [Language.FR]: "Votre panier est vide"
  },
  orderSuccess: { 
    [Language.EN]: "Order Placed!", 
    [Language.ZH]: "支付成功!",
    [Language.JP]: "注文完了!",
    [Language.KR]: "주문 완료!",
    [Language.FR]: "Commande passée !"
  },
  paymentProcessing: { 
    [Language.EN]: "Processing Payment...", 
    [Language.ZH]: "正在处理支付...",
    [Language.JP]: "支払い処理中...",
    [Language.KR]: "결제 처리 중...",
    [Language.FR]: "Traitement du paiement..."
  },
  continueShopping: { 
    [Language.EN]: "Continue Shopping", 
    [Language.ZH]: "继续购物",
    [Language.JP]: "買い物を続ける",
    [Language.KR]: "쇼핑 계속하기",
    [Language.FR]: "Continuer vos achats"
  },
  itemAdded: { 
    [Language.EN]: "Added to cart", 
    [Language.ZH]: "已加入购物车",
    [Language.JP]: "カートに追加しました",
    [Language.KR]: "장바구니에 추가됨",
    [Language.FR]: "Ajouté au panier"
  }
};