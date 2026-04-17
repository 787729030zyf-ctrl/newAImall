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
    title: "Velvet Matte Lipstick",
    price: 129,
    sales: 12000,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
    category: "Lips",
    tags: ["Matte", "Long-lasting"],
    description: "Iconic red lipstick with a velvet matte finish.",
    regions: ["US", "GB", "CN", "JP", "KR", "FR"]
  },
  {
    id: 2,
    title: "Hydrating Foundation",
    price: 249,
    sales: 8500,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=600&auto=format&fit=crop",
    category: "Face",
    tags: ["Full Coverage", "Hydrating"],
    description: "Flawless coverage that lasts all day.",
    regions: ["US", "GB", "FR"]
  },
  {
    id: 3,
    title: "Volumizing Mascara",
    price: 89,
    sales: 22000,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?q=80&w=600&auto=format&fit=crop",
    category: "Eyes",
    tags: ["Waterproof", "Black"],
    description: "Dramatic volume and length for your lashes.",
    regions: ["US", "GB", "CN", "JP", "FR"]
  },
  {
    id: 4,
    title: "Rose Gold Eyeshadow",
    price: 320,
    sales: 5400,
    image: "https://zyflgj.oss-cn-beijing.aliyuncs.com/f70bfb49daaa62af702be204c12a51b3.jpg",
    category: "Eyes",
    tags: ["Shimmer", "Matte"],
    description: "A versatile palette for day and night looks.",
    regions: ["US", "FR", "CN"]
  },
  {
    id: 5,
    title: "Soft Blush",
    price: 110,
    sales: 9000,
    image: "https://images.unsplash.com/photo-1557205465-f3762edea6d3?q=80&w=600&auto=format&fit=crop",
    category: "Face",
    tags: ["Natural", "Powder"],
    description: "Adds a natural flush to your cheeks.",
    regions: ["GB", "KR", "JP"]
  },
  {
    id: 6,
    title: "Liquid Eyeliner",
    price: 75,
    sales: 15000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    category: "Eyes",
    tags: ["Precise", "Waterproof"],
    description: "Create sharp wings with ease.",
    regions: ["US", "GB", "CN", "JP", "KR", "FR"]
  },
  {
    id: 7,
    title: "Luxury Skincare Serum",
    price: 580,
    sales: 3200,
    image: "https://zyflgj.oss-cn-beijing.aliyuncs.com/Gemini_Generated_Image_o9ocdao9ocdao9oc%20(2).png",
    category: "Skincare",
    tags: ["Anti-aging", "Radiance"],
    description: "Premium formula for youthful, glowing skin.",
    regions: ["CN", "JP", "KR"]
  },
  {
    id: 8,
    title: "Lavender Bath Oil",
    price: 185,
    sales: 4500,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop",
    category: "Skincare",
    tags: ["Relieving", "Organic"],
    description: "Relaxing bath essence with natural lavender extracts.",
    regions: ["FR", "GB"]
  },
  {
    id: 9,
    title: "Waterproof Sunscreen",
    price: 155,
    sales: 18000,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=600&auto=format&fit=crop",
    category: "Skincare",
    tags: ["UV Protect", "Lightweight"],
    description: "High performance protection for all outdoor activities.",
    regions: ["US", "KR"]
  },
  {
    id: 10,
    title: "Cherry Blossom Primer",
    price: 210,
    sales: 6700,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    category: "Face",
    tags: ["Poreless", "Brightening"],
    description: "Silk smooth base for a long lasting glow.",
    regions: ["JP", "CN"]
  },
  {
    id: 11,
    title: "Makeup Brush Set",
    price: 450,
    sales: 2100,
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=600&auto=format&fit=crop",
    category: "Face",
    tags: ["Synthetic"],
    description: "Everything you need for expert makeup application.",
    regions: ["US", "GB", "CN", "JP", "KR", "FR"]
  },
  {
    id: 12,
    title: "Deep Cleansing Foam",
    price: 95,
    sales: 25000,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    category: "Skincare",
    tags: ["Pore Care", "Moisturizing"],
    description: "Mild yet effective cleaning for daily routine.",
    regions: ["KR", "JP"]
  },
  {
    id: 13,
    title: "High-Shine Lip Gloss",
    price: 85,
    sales: 11000,
    image: "https://zyflgj.oss-cn-beijing.aliyuncs.com/Gemini_Generated_Image_o9ocdao9ocdao9oc.png",
    category: "Lips",
    tags: ["Non-sticky", "Plumping"],
    description: "Brilliant shine and comfortable wear for daily looks.",
    regions: ["US", "GB"]
  },
  {
    id: 14,
    title: "Tea Tree Soothing Mask",
    price: 25,
    sales: 42000,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
    category: "Skincare",
    tags: ["Tea Tree", "Calming"],
    description: "Quick relief for troubled skin and redness.",
    regions: ["CN", "KR"]
  },
  {
    id: 15,
    title: "Silk Night Repair Cream",
    price: 420,
    sales: 2800,
    image: "https://images.unsplash.com/photo-1591130901921-3f0652bb3915?q=80&w=600&auto=format&fit=crop",
    category: "Skincare",
    tags: ["Overnight", "Nourishing"],
    description: "Intensive repair while you sleep for velvety skin.",
    regions: ["FR", "JP"]
  },
  {
    id: 16,
    title: "Radiant BB Cream",
    price: 135,
    sales: 31000,
    image: "https://zyflgj.oss-cn-beijing.aliyuncs.com/Gemini_Generated_Image_ul2usrul2usrul2u.png",
    category: "Face",
    tags: ["Multi-benefit", "SPF 30"],
    description: "Perfect blend of skincare and natural coverage.",
    regions: ["KR", "CN", "JP"]
  },
  {
    id: 17,
    title: "Bold Brow Sculpt Gel",
    price: 98,
    sales: 7200,
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=600&auto=format&fit=crop",
    category: "Eyes",
    tags: ["Tinted", "Definition"],
    description: "Sculpt and define your brows with a long-wear formula.",
    regions: ["US", "GB", "FR"]
  },
  {
    id: 18,
    title: "Mineral Setting Powder",
    price: 195,
    sales: 9600,
    image: "https://zyflgj.oss-cn-beijing.aliyuncs.com/Gemini_Generated_Image_o9ocdao9ocdao9oc%20(1).png",
    category: "Face",
    tags: ["Mattifying", "Finishing"],
    description: "Ulta-fine powder to lock your makeup in place.",
    regions: ["FR", "US"]
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
  cart: {
    [Language.EN]: "Cart",
    [Language.ZH]: "购物车",
    [Language.JP]: "カート",
    [Language.KR]: "장바구니",
    [Language.FR]: "Panier"
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
  },
  profile: {
    [Language.EN]: "Me",
    [Language.ZH]: "我的",
    [Language.JP]: "マイページ",
    [Language.KR]: "마이페이지",
    [Language.FR]: "Moi"
  },
  searchPlaceholder: {
    [Language.EN]: "Search products...",
    [Language.ZH]: "搜索商品...",
    [Language.JP]: "商品を検索...",
    [Language.KR]: "상품 검색...",
    [Language.FR]: "Rechercher des produits..."
  },
  popular: {
    [Language.EN]: "Popular",
    [Language.ZH]: "热门商品",
    [Language.JP]: "人気商品",
    [Language.KR]: "인기 상품",
    [Language.FR]: "Populaire"
  },
  seeAll: {
    [Language.EN]: "See All",
    [Language.ZH]: "查看全部",
    [Language.JP]: "すべて見る",
    [Language.KR]: "모두 보기",
    [Language.FR]: "Voir tout"
  },
  newSeason: {
    [Language.EN]: "New Season",
    [Language.ZH]: "新品上市",
    [Language.JP]: "新シーズン",
    [Language.KR]: "새 시즌",
    [Language.FR]: "Nouvelle saison"
  },
  summerCollection: {
    [Language.EN]: "Summer Collection",
    [Language.ZH]: "夏季系列",
    [Language.JP]: "サマーコレクション",
    [Language.KR]: "여름 컬렉션",
    [Language.FR]: "Collection d'été"
  },
  off: {
    [Language.EN]: "Up to 50% OFF",
    [Language.ZH]: "最高 5 折优惠",
    [Language.JP]: "最大50%OFF",
    [Language.KR]: "최대 50% 할인",
    [Language.FR]: "Jusqu'à 50% de réduction"
  },
  description: {
    [Language.EN]: "Description",
    [Language.ZH]: "产品描述",
    [Language.JP]: "説明",
    [Language.KR]: "설명",
    [Language.FR]: "Description"
  },
  tags: {
    [Language.EN]: "Tags",
    [Language.ZH]: "标签",
    [Language.JP]: "タグ",
    [Language.KR]: "태그",
    [Language.FR]: "Mots-clés"
  },
  premiumMember: {
    [Language.EN]: "Premium Member",
    [Language.ZH]: "高级会员",
    [Language.JP]: "プレミアム会員",
    [Language.KR]: "프리미엄 회원",
    [Language.FR]: "Membre Premium"
  },
  myFavorites: {
    [Language.EN]: "My Favorites",
    [Language.ZH]: "我的收藏",
    [Language.JP]: "お気に入り",
    [Language.KR]: "내 즐겨찾기",
    [Language.FR]: "Mes favoris"
  },
  myOrders: {
    [Language.EN]: "My Orders",
    [Language.ZH]: "我的订单",
    [Language.JP]: "注文履歴",
    [Language.KR]: "내 주문",
    [Language.FR]: "Mes commandes"
  },
  settings: {
    [Language.EN]: "Settings",
    [Language.ZH]: "设置",
    [Language.JP]: "設定",
    [Language.KR]: "설정",
    [Language.FR]: "Paramètres"
  },
  orderSuccessDesc: {
    [Language.EN]: "Your beauty products are on the way!",
    [Language.ZH]: "您的美妆产品正在配送中！",
    [Language.JP]: "美容製品が配送中です！",
    [Language.KR]: "뷰티 제품이 배송 중입니다!",
    [Language.FR]: "Vos produits de beauté sont en route !"
  },
  redefiningBeauty: {
    [Language.EN]: "Redefining Beauty",
    [Language.ZH]: "重塑美妆体验",
    [Language.JP]: "美を再定義する",
    [Language.KR]: "아름다움을 재정의하다",
    [Language.FR]: "Redéfinir la beauté"
  },
  orLoginWith: {
    [Language.EN]: "Or login with",
    [Language.ZH]: "其他登录方式",
    [Language.JP]: "または以下でログイン",
    [Language.KR]: "또는 다음으로 로그인",
    [Language.FR]: "Ou connectez-vous avec"
  },
  topSeller: {
    [Language.EN]: "Top Seller",
    [Language.ZH]: "热卖爆款",
    [Language.JP]: "ベストセラー",
    [Language.KR]: "베스트셀러",
    [Language.FR]: "Meilleure vente"
  },
  shop: {
    [Language.EN]: "Shop",
    [Language.ZH]: "店铺",
    [Language.JP]: "ショップ",
    [Language.KR]: "상점",
    [Language.FR]: "Boutique"
  },
  chat: {
    [Language.EN]: "Chat",
    [Language.ZH]: "客服",
    [Language.JP]: "チャット",
    [Language.KR]: "채팅",
    [Language.FR]: "Chat"
  },
  luminaUser: {
    [Language.EN]: "Lumina User",
    [Language.ZH]: "Lumina 用户",
    [Language.JP]: "Lumina ユーザー",
    [Language.KR]: "루미나 사용자",
    [Language.FR]: "Utilisateur Lumina"
  },
  prod1Title: {
    [Language.EN]: "Velvet Matte Lipstick - Ruby Woo",
    [Language.ZH]: "丝绒哑光口红 - 复古红",
    [Language.JP]: "ベルベットマットリップスティック - ルビーウー",
    [Language.KR]: "벨벳 매트 립스틱 - 루비 우",
    [Language.FR]: "Rouge à Lèvres Mat Velours - Ruby Woo"
  },
  prod1Desc: {
    [Language.EN]: "Iconic red lipstick with a velvet matte finish.",
    [Language.ZH]: "经典的复古红色口红，丝绒哑光质地。",
    [Language.JP]: "ベルベットのようなマットな仕上がりの象徴的な赤の口紅。",
    [Language.KR]: "벨벳 매트 피니시의 아이코닉한 레드 립스틱.",
    [Language.FR]: "Rouge à lèvres rouge emblématique avec un fini mat velouté."
  },
  prod2Title: {
    [Language.EN]: "Hydrating Foundation - Ivory",
    [Language.ZH]: "水润粉底液 - 象牙色",
    [Language.JP]: "ハイドレイティングファンデーション - アイボリー",
    [Language.KR]: "하이드레이팅 파운데이션 - 아이보리",
    [Language.FR]: "Fond de Teint Hydratant - Ivoire"
  },
  prod2Desc: {
    [Language.EN]: "Flawless coverage that lasts all day.",
    [Language.ZH]: "全天候持久遮瑕，打造无暇妆感。",
    [Language.JP]: "一日中続く完璧なカバー力。",
    [Language.KR]: "하루 종일 지속되는 결점 없는 커버리지.",
    [Language.FR]: "Une couvrance impeccable qui dure toute la journée."
  },
  prod3Title: {
    [Language.EN]: "Volumizing Mascara",
    [Language.ZH]: "浓密睫毛膏",
    [Language.JP]: "ボリュームマスカラ",
    [Language.KR]: "볼륨 마스카라",
    [Language.FR]: "Mascara Volumateur"
  },
  prod3Desc: {
    [Language.EN]: "Dramatic volume and length for your lashes.",
    [Language.ZH]: "为您的睫毛带来惊人的浓密和修长效果。",
    [Language.JP]: "まつげにドラマチックなボリュームと長さを与えます。",
    [Language.KR]: "속눈썹에 드라마틱한 볼륨과 길이를 선사합니다.",
    [Language.FR]: "Volume et longueur dramatiques pour vos cils."
  },
  prod4Title: {
    [Language.EN]: "Rose Gold Eyeshadow Palette",
    [Language.ZH]: "玫瑰金眼影盘",
    [Language.JP]: "ローズゴールドアイシャドウパレット",
    [Language.KR]: "로즈 골드 아이섀도우 팔레트",
    [Language.FR]: "Palette d'Ombres à Paupières Rose Gold"
  },
  prod4Desc: {
    [Language.EN]: "A versatile palette for day and night looks.",
    [Language.ZH]: "一款适合日常和晚宴妆容的多功能眼影盘。",
    [Language.JP]: "昼夜のルックに対応する多目的パレット。",
    [Language.KR]: "낮과 밤의 룩을 위한 다재다능한 팔레트.",
    [Language.FR]: "Une palette polyvalente pour les looks de jour et de nuit."
  },
  prod5Title: {
    [Language.EN]: "Soft Blush - Peachy Keen",
    [Language.ZH]: "柔和腮红 - 蜜桃色",
    [Language.JP]: "ソフトブラッシュ - ピーチィキーン",
    [Language.KR]: "소프트 블러셔 - 피치 킨",
    [Language.FR]: "Blush Doux - Peachy Keen"
  },
  prod5Desc: {
    [Language.EN]: "Adds a natural flush to your cheeks.",
    [Language.ZH]: "为您的双颊增添自然红润气色。",
    [Language.JP]: "頬に自然な赤みを与えます。",
    [Language.KR]: "뺨에 자연스러운 홍조를 더해줍니다.",
    [Language.FR]: "Ajoute un éclat naturel à vos joues."
  },
  prod6Title: {
    [Language.EN]: "Liquid Eyeliner - Jet Black",
    [Language.ZH]: "液体眼线笔 - 极黑色",
    [Language.JP]: "リキッドアイライナー - ジェットブラック",
    [Language.KR]: "리퀴드 아이라이너 - 젯 블랙",
    [Language.FR]: "Eyeliner Liquide - Noir Intense"
  },
  prod6Desc: {
    [Language.EN]: "Create sharp wings with ease.",
    [Language.ZH]: "轻松勾勒锋利眼线。",
    [Language.JP]: "シャープなウィングを簡単に作成できます。",
    [Language.KR]: "날카로운 윙을 쉽게 연출할 수 있습니다.",
    [Language.FR]: "Créez des traits précis en toute simplicité."
  },
  prod7Title: {
    [Language.EN]: "Luxury Skincare Serum",
    [Language.ZH]: "奢宠修护精华液",
    [Language.JP]: "ラグジュアリースキンケアセラム",
    [Language.KR]: "럭셔리 스킨케어 세럼",
    [Language.FR]: "Sérum de Soin de Luxe"
  },
  prod7Desc: {
    [Language.EN]: "Premium formula for youthful, glowing skin.",
    [Language.ZH]: "高端配方，打造年轻透亮的肌肤。",
    [Language.JP]: "若々しく輝く肌のためのプレミアム処方。",
    [Language.KR]: "어리고 빛나는 피부를 위한 프리미엄 포뮬러.",
    [Language.FR]: "Formule premium pour une peau jeune et éclatante."
  },
  prod8Title: {
    [Language.EN]: "French Lavender Bath Oil",
    [Language.ZH]: "法国薰衣草沐浴油",
    [Language.JP]: "フレンチラベンダーバスオイル",
    [Language.KR]: "프렌치 라벤더 배스 오일",
    [Language.FR]: "Huile de Bain Lavande Française"
  },
  prod8Desc: {
    [Language.EN]: "Relaxing bath essence with natural lavender extracts.",
    [Language.ZH]: "含天然薰衣草成分，舒缓身心的沐浴精华。",
    [Language.JP]: "天然のラベンダーエキスを配合したリラックスバスエッセンス。",
    [Language.KR]: "천연 라벤더 추출물이 함유된 릴랙싱 배스 에센스.",
    [Language.FR]: "Essence de bain relaxante aux extraits naturels de lavande."
  },
  prod9Title: {
    [Language.EN]: "Waterproof Sunscreen SPF 50",
    [Language.ZH]: "防汗防水防晒霜 SPF 50",
    [Language.JP]: "ウォータープルーフ日焼け止め SPF 50",
    [Language.KR]: "워터프루프 선크림 SPF 50",
    [Language.FR]: "Écran Solaire Imperméable SPF 50"
  },
  prod9Desc: {
    [Language.EN]: "High performance protection for all outdoor activities.",
    [Language.ZH]: "为户外活动提供高效防晒保护。",
    [Language.JP]: "すべての屋外活動に適した高性能の保護。",
    [Language.KR]: "모든 야외 활동을 위한 고성능 보호.",
    [Language.FR]: "Protection haute performance pour toutes les activités de plein air."
  },
  prod10Title: {
    [Language.EN]: "Cherry Blossom Primer",
    [Language.ZH]: "樱花焕采隔离乳",
    [Language.JP]: "チェリーブロッサムプライマー",
    [Language.KR]: "체리 블라썸 프라이머",
    [Language.FR]: "Base à la Fleur de Cerisier"
  },
  prod10Desc: {
    [Language.EN]: "Silk smooth base for a long lasting glow.",
    [Language.ZH]: "丝滑妆前底乳，持久焕发光彩。",
    [Language.JP]: "輝きを持続させるシルクのように滑らかなベース。",
    [Language.KR]: "오래 지속되는 광채를 위한 실크처럼 부드러운 베이스.",
    [Language.FR]: "Base de teint soyeuse pour un éclat durable."
  },
  prod11Title: {
    [Language.EN]: "Professional Makeup Brush Set",
    [Language.ZH]: "专业彩妆刷套装",
    [Language.JP]: "プロフェッショナルメイクブラシセット",
    [Language.KR]: "전문가용 메이크업 브러쉬 세트",
    [Language.FR]: "Ensemble de Pinceaux de Maquillage Professionnel"
  },
  prod11Desc: {
    [Language.EN]: "Everything you need for expert makeup application.",
    [Language.ZH]: "满足专家级上妆需求的一切工具。",
    [Language.JP]: "エキスパートなメイクアップに必要なすべて。",
    [Language.KR]: "전문적인 메이크업 적용을 위해 필요한 모든 것.",
    [Language.FR]: "Tout ce dont vous avez besoin pour un maquillage d'expert."
  },
  prod12Title: {
    [Language.EN]: "Deep Cleansing Foam",
    [Language.ZH]: "深层洁面泡沫",
    [Language.JP]: "ディープクレンジングフォーム",
    [Language.KR]: "딥 클렌징 폼",
    [Language.FR]: "Mousse Nettoyante en Profondeur"
  },
  prod12Desc: {
    [Language.EN]: "Mild yet effective cleaning for daily routine.",
    [Language.ZH]: "温和且高效的日常洁面程序。",
    [Language.JP]: "日常のルーチンに適した、マイルドでありながら効果的な洗浄。",
    [Language.KR]: "데일리 루틴을 위한 순하면서도 효과적인 세안.",
    [Language.FR]: "Nettoyage doux mais efficace pour la routine quotidienne."
  },
  prod13Title: {
    [Language.EN]: "High-Shine Lip Gloss",
    [Language.ZH]: "高光泽唇釉",
    [Language.JP]: "ハイシャインリップグロス",
    [Language.KR]: "하이 샤인 립글로스",
    [Language.FR]: "Brillant à Lèvres Haute Brillance"
  },
  prod13Desc: {
    [Language.EN]: "Brilliant shine and comfortable wear for daily looks.",
    [Language.ZH]: "亮泽迷人，佩戴舒适，适合日常妆容。",
    [Language.JP]: "毎日のルックに輝きと快適な着け心地を。",
    [Language.KR]: "데일리 룩을 위한 눈부신 광채와 편안한 착용감.",
    [Language.FR]: "Une brillance éclatante et un confort optimal pour tous les jours."
  },
  prod14Title: {
    [Language.EN]: "Tea Tree Soothing Mask",
    [Language.ZH]: "茶树舒缓面膜",
    [Language.JP]: "ティーツリー収れんマスク",
    [Language.KR]: "티트리 수딩 마스크",
    [Language.FR]: "Masque Apaisant à l'Arbre à Thé"
  },
  prod14Desc: {
    [Language.EN]: "Quick relief for troubled skin and redness.",
    [Language.ZH]: "快速缓解皮肤不适和红肿。",
    [Language.JP]: "肌荒れや赤みを素早くケアします。",
    [Language.KR]: "트러블 피부와 붉은 기를 빠르게 진정시켜줍니다.",
    [Language.FR]: "Soulagement rapide pour les peaux à problèmes et les rougeurs."
  },
  prod15Title: {
    [Language.EN]: "Silk Night Repair Cream",
    [Language.ZH]: "蚕丝修护晚霜",
    [Language.JP]: "シルクナイトリペアクリーム",
    [Language.KR]: "실크 나이트 리페어 크림",
    [Language.FR]: "Crème de Nuit Réparatrice en Soie"
  },
  prod15Desc: {
    [Language.EN]: "Intensive repair while you sleep for velvety skin.",
    [Language.ZH]: "睡眠期间深度修护，打造丝绒般肌肤。",
    [Language.JP]: "睡眠中に集中ケアし、ベルベットのような肌へ。",
    [Language.KR]: "잠든 사이 집중 리페어로 실크처럼 부드러운 피부를 만듭니다.",
    [Language.FR]: "Réparation intensive pendant votre sommeil pour une peau de velours."
  },
  prod16Title: {
    [Language.EN]: "Radiant BB Cream",
    [Language.ZH]: "焕彩隔离 BB 霜",
    [Language.JP]: "ラディアント BB クリーム",
    [Language.KR]: "래디언트 BB 크림",
    [Language.FR]: "BB Crème Éclatante"
  },
  prod16Desc: {
    [Language.EN]: "Perfect blend of skincare and natural coverage.",
    [Language.ZH]: "护肤成分与自然遮瑕的完美融合。",
    [Language.JP]: "スキンケアと自然なカバー力の完璧なブレンド。",
    [Language.KR]: "스킨케어와 자연스러운 커버리지의 완벽한 조화.",
    [Language.FR]: "Mélange parfait de soin et de couvrance naturelle."
  },
  prod17Title: {
    [Language.EN]: "Bold Brow Sculpt Gel",
    [Language.ZH]: "眉部定型塑形膏",
    [Language.JP]: "ボールドブロウスカルプトジェル",
    [Language.KR]: "볼드 브로우 스컬프트 젤",
    [Language.FR]: "Gel Sculptant pour Sourcils"
  },
  prod17Desc: {
    [Language.EN]: "Sculpt and define your brows with a long-wear formula.",
    [Language.ZH]: "长效定型配方，雕琢并定义您的眉形。",
    [Language.JP]: "ロングウェア処方で見栄えの良い眉を演出します。",
    [Language.KR]: "롱웨어 포뮬러로 눈썹을 조각하고 정의하세요.",
    [Language.FR]: "Sculptez et définissez vos sourcils avec une formule longue tenue."
  },
  prod18Title: {
    [Language.EN]: "Mineral Setting Powder",
    [Language.ZH]: "矿物质定妆散粉",
    [Language.JP]: "ミネラルセッティングパウダー",
    [Language.KR]: "미네랄 세팅 파우더",
    [Language.FR]: "Poudre de Fixation Minérale"
  },
  prod18Desc: {
    [Language.EN]: "Ulta-fine powder to lock your makeup in place.",
    [Language.ZH]: "超细粉质，持久锁定妆容。",
    [Language.JP]: "メイクをしっかり固定する超微細パウダー。",
    [Language.KR]: "메이크업을 고정해주는 울트라 파인 파우더.",
    [Language.FR]: "Poudre ultra-fine pour fixer votre maquillage."
  },
  all: {
    [Language.EN]: "All",
    [Language.ZH]: "全部",
    [Language.JP]: "すべて",
    [Language.KR]: "전체",
    [Language.FR]: "Tout"
  },
  lips: {
    [Language.EN]: "Lips",
    [Language.ZH]: "唇部",
    [Language.JP]: "リップ",
    [Language.KR]: "립",
    [Language.FR]: "Lèvres"
  },
  face: {
    [Language.EN]: "Face",
    [Language.ZH]: "面部",
    [Language.JP]: "フェイス",
    [Language.KR]: "페이스",
    [Language.FR]: "Visage"
  },
  eyes: {
    [Language.EN]: "Eyes",
    [Language.ZH]: "眼部",
    [Language.JP]: "アイ",
    [Language.KR]: "아이",
    [Language.FR]: "Yeux"
  },
  skincare: {
    [Language.EN]: "Skincare",
    [Language.ZH]: "护肤",
    [Language.JP]: "スキンケア",
    [Language.KR]: "스킨케어",
    [Language.FR]: "Soin"
  },
  next: {
    [Language.EN]: "Next",
    [Language.ZH]: "下一步",
    [Language.JP]: "次へ",
    [Language.KR]: "다음",
    [Language.FR]: "Suivant"
  },
  startOver: {
    [Language.EN]: "Start Over",
    [Language.ZH]: "重新开始",
    [Language.JP]: "最初から",
    [Language.KR]: "다시 시작",
    [Language.FR]: "Recommencer"
  },
  almond: {
    [Language.EN]: "Almond",
    [Language.ZH]: "杏仁眼",
    [Language.JP]: "アーモンド型",
    [Language.KR]: "아몬드형",
    [Language.FR]: "Amande"
  },
  round: {
    [Language.EN]: "Round",
    [Language.ZH]: "圆眼",
    [Language.JP]: "丸型",
    [Language.KR]: "둥근형",
    [Language.FR]: "Rond"
  },
  monolid: {
    [Language.EN]: "Monolid",
    [Language.ZH]: "单眼皮",
    [Language.JP]: "一重まぶた",
    [Language.KR]: "홑꺼풀",
    [Language.FR]: "Monolide"
  },
  button: {
    [Language.EN]: "Button",
    [Language.ZH]: "小翘鼻",
    [Language.JP]: "ボタン型",
    [Language.KR]: "단추형",
    [Language.FR]: "Bouton"
  },
  straight: {
    [Language.EN]: "Straight",
    [Language.ZH]: "直鼻",
    [Language.JP]: "ストレート型",
    [Language.KR]: "직선형",
    [Language.FR]: "Droit"
  },
  wide: {
    [Language.EN]: "Wide",
    [Language.ZH]: "宽鼻",
    [Language.JP]: "ワイド型",
    [Language.KR]: "넓은형",
    [Language.FR]: "Large"
  },
  full: {
    [Language.EN]: "Full",
    [Language.ZH]: "厚唇",
    [Language.JP]: "フルリップ",
    [Language.KR]: "도톰한 입술",
    [Language.FR]: "Plein"
  },
  thin: {
    [Language.EN]: "Thin",
    [Language.ZH]: "薄唇",
    [Language.JP]: "薄い唇",
    [Language.KR]: "얇은 입술",
    [Language.FR]: "Mince"
  },
  bow: {
    [Language.EN]: "Cupid Bow",
    [Language.ZH]: "M形唇",
    [Language.JP]: "キューピッドボウ",
    [Language.KR]: "큐피트 보우",
    [Language.FR]: "Arc de Cupidon"
  },
  aiGenerated: {
    [Language.EN]: "AI Generated",
    [Language.ZH]: "AI 生成",
    [Language.JP]: "AI生成",
    [Language.KR]: "AI 생성됨",
    [Language.FR]: "Généré par l'IA"
  },
  processing: {
    [Language.EN]: "Processing...",
    [Language.ZH]: "处理中...",
    [Language.JP]: "処理中...",
    [Language.KR]: "처리 중...",
    [Language.FR]: "Traitement..."
  },
  applyMakeup: {
    [Language.EN]: "Apply Makeup",
    [Language.ZH]: "立即上妆",
    [Language.JP]: "メイクを適用",
    [Language.KR]: "메이크업 적용",
    [Language.FR]: "Appliquer le maquillage"
  },
  tenKPlus: {
    [Language.EN]: "10k+",
    [Language.ZH]: "1万+",
    [Language.JP]: "1万+",
    [Language.KR]: "1만+",
    [Language.FR]: "10k+"
  }
};