export interface BeautyKnowledgeFile {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  content: string;
}

export const ADVANCED_BEAUTY_KNOWLEDGE_FILES: BeautyKnowledgeFile[] = [
  {
    id: 'foundation-undertone-and-finish',
    title: 'Foundation undertone, finish, and wear logic',
    source: 'Sephora foundation guides and shade-finder references',
    sourceUrl: 'https://www.sephora.com/beauty/foundation-shade-finder/',
    content: `
Foundation matching should combine shade depth, undertone, skin type, desired coverage, and lighting. A useful assistant should ask whether the user is fair, light, medium, tan, or deep, then identify undertone as cool, warm, neutral, olive, peach, golden, or red. 

Cool undertones usually pair better with pink, rose, berry, blue-red lipstick, mauve blush, pink brightening powder, and foundations that do not turn orange. Warm undertones usually pair better with peach, coral, golden beige, caramel, bronze, warm brown, and orange-red products. Neutral undertones can use balanced beige, rose nude, neutral brown, soft berry, and flexible base shades. Olive undertones often need muted or golden-olive bases and can look gray in overly pink foundation.

Foundation finish should answer the user's real situation. Oily skin and humid weather favor matte, soft-matte, powder, gripping primer, oil-control setting powder, and setting spray. Dry skin favors hydrating primer, satin foundation, skin tint, glow base, cream blush, and minimal powder. Combination skin often needs targeted powder only in the T-zone. For mature or textured skin, avoid heavy powder across the whole face; use thin layers and set only where makeup moves.

For shade matching, compare the jaw, neck, and chest rather than only the center of the face. Store lighting can mislead; natural daylight is better. If a foundation is slightly wrong, warm it with bronzer, deepen it with a darker mixer, or correct redness with a muted neutral base. Avoid recommending a full-coverage matte foundation to a user asking for natural daily makeup unless oil control is the priority.
`
  },
  {
    id: 'face-shape-blush-contour-placement',
    title: 'Face shape blush, bronzer, contour, and highlight placement',
    source: 'L’Oreal Paris blush and contour face-shape guides',
    sourceUrl: 'https://www.lorealparisusa.com/beauty-magazine/makeup/face-makeup/blush-by-face-shape',
    content: `
Face shape changes placement more than product category. Round faces usually benefit from blush swept diagonally from outer cheek toward temple, soft contour under cheekbone, and limited highlight at the center of the face. This visually lifts and lengthens rather than widening the cheeks.

Square faces benefit from soft blended blush on the upper cheek, diffused bronzer around jaw and temples, and avoid harsh horizontal contour lines. The goal is softening the jaw and adding movement.

Long faces benefit from blush placed more horizontally across the center cheek and not too high at the temple. This visually shortens the face. Avoid strong vertical nose contour or overextended wing liner if the user already feels their face is long.

Heart-shaped faces often need balance: keep blush soft on the apple and outer cheek, avoid too much highlight on the forehead, and add softness near the lower face with lip color.

Oval faces can wear most placements. Recommend based on desired effect: lifted blush for sculpted, apple-of-cheek blush for youthful, bronzer around perimeter for warmth, highlighter on cheekbone and bridge for glow.

For nose concerns, wide noses need subtle matte contour on the side walls plus a narrow highlight. Button or flat noses need gentle highlight on bridge and tip, not heavy dark lines. Straight noses should not be over-contoured.
`
  },
  {
    id: 'eye-shape-eyeliner-shadow-mascara',
    title: 'Eye shape eyeliner, shadow, mascara, and brow logic',
    source: 'Maybelline eye-shape eyeliner guide and Makeup.com monolid guidance',
    sourceUrl: 'https://www.maybelline.com/makeup-tips/eye/eyeliner-makeup-tutorials/eyeliner-for-different-eye-shapes',
    content: `
Eye shape should control eyeliner thickness, visible shadow placement, and mascara emphasis. Monolids often need eyeliner that remains visible with eyes open, waterproof formulas, tightlining, lifted outer-corner definition, and shimmer placed in the center or inner corner. Thick black liner can work for dramatic looks, but daily looks usually need thin outer definition plus curled lashes.

Hooded eyes need open-eye placement. If eyeliner disappears when the eyes open, keep liner thin at the lash line, place shadow slightly above the natural crease, use smudge-resistant formulas, and prioritize lash curl and mascara. Avoid heavy shimmer directly inside the hooded crease if it transfers.

Round eyes often look more elongated with outer-corner liner, a small wing, deeper shadow at the outer third, and less dark product on the inner lower lash line. Almond eyes are flexible and can handle classic wing, soft smoky liner, rose-brown shadow, or clean mascara looks.

Downturned eyes benefit from lifting the outer third, avoiding heavy lower outer-corner shadow, and curling lashes upward. Close-set eyes benefit from inner-corner brightness and more definition at the outer eye. Wide-set eyes can carry more inner-corner definition.

Brows affect facial proportion. Sparse brows need fine pencils or brow pens. Round faces often benefit from a softly lifted arch. Long faces should avoid overly high arches. Square faces benefit from a softened but structured brow.
`
  },
  {
    id: 'lip-shape-color-texture',
    title: 'Lip shape, color depth, texture, and balance logic',
    source: 'Sephora makeup buying guides and retail product education',
    sourceUrl: 'https://www.sephora.com/makeup-guides',
    content: `
Lip products should consider lip fullness, lip edge definition, undertone, and the strength of the rest of the makeup. Thin lips usually benefit from lip liner close to the natural lip shade, rose nude, peach nude, brown nude, sheer gloss, lip oil, and high-shine formulas because light reflection adds volume. Avoid very dark matte lipstick if the user wants fuller lips.

Full lips can wear sheer berry, satin red, soft matte, blurred lip, or balm lipstick. If the user wants to reduce emphasis, recommend translucent color or diffused edges rather than overlining. Cupid bow or M-shaped lips can be enhanced with precise liner, classic red, velvet matte, or satin lipstick focused at the lip peak.

Warm skin generally pairs with coral, peach, terracotta, orange-red, warm nude, caramel, and brown rose. Cool skin pairs with berry, mauve, blue-red, rose, plum, and pink nude. Neutral skin can wear many balanced shades. Deep skin often looks strong in berry, brown, red, bronze gloss, caramel nude, and pigmented blush/lip colors.

Balance matters. If the eye look is heavy, choose a softer nude gloss or balm. If the base and eyes are minimal, a red lip or berry lip can be the focus. For date makeup, choose rosy, berry, glossy, or soft pink-brown products. For work makeup, choose low-saturation nude, soft matte, or balm-gloss hybrids.
`
  },
  {
    id: 'skin-safety-sunscreen-acne-sensitive',
    title: 'Skin safety, sunscreen, acne-prone, and sensitive-skin makeup',
    source: 'Cleveland Clinic sunscreen guidance and WebMD acne makeup guidance',
    sourceUrl: 'https://health.clevelandclinic.org/is-the-sunscreen-in-your-makeup-enough',
    content: `
Makeup recommendations should not replace dermatology advice. For acne-prone skin, recommend lightweight, oil-free, non-comedogenic, fragrance-conscious, and easy-to-remove products. Heavy occlusive layers, sleeping in makeup, and harsh scrubbing can worsen breakouts. Recommend cleansing tools and brushes be kept clean.

For sensitive skin, avoid recommending too many new active products at once. Prefer fragrance-free, simple base, patch testing, and removing makeup gently. If the user reports irritation, burning, rash, severe acne, rosacea flare, or eye infection, advise pausing the product and seeking medical advice.

Sunscreen in makeup is usually not enough by itself because people rarely apply enough foundation or powder to reach the labeled SPF. Recommend a dedicated broad-spectrum sunscreen under makeup, then reapplication strategy if outdoors. Tinted sunscreen or sunscreen stick can be paired with makeup.

For daily routines, order matters: skin prep, sunscreen, primer if needed, thin base, concealer, cream color products, powder only where necessary, brows/eyes, lips, setting spray. For long wear, thin layers last better than one thick layer.
`
  },
  {
    id: 'scenario-budget-routine-builder',
    title: 'Scenario and budget based makeup routine builder',
    source: 'Beauty retail education and makeup artist best practices',
    sourceUrl: 'https://www.lorealparisusa.com/beauty-magazine/makeup/face-makeup/how-to-contour-like-a-pro-makeup-artist',
    content: `
A recommendation assistant should convert user needs into routines. Beginner daily routine: skin prep, sunscreen, light base or concealer, cream blush, brow gel or brow pencil, mascara, tinted balm or gloss. This is lower risk than recommending a full contour palette and large eyeshadow palette.

Office routine: natural matte or satin base, subtle brow, curled mascara, soft blush, neutral lip. Date routine: glow base, peach or rose blush, curled lashes, glossy lip, soft highlight. Photo routine: oil-control primer, medium coverage base, concealer, setting powder, contour, blush, setting spray, defined lip. Party routine: longwear base, waterproof eyeliner, shimmer shadow, stronger lip or cheek, setting spray.

Budget logic matters. Under 15 dollars: prioritize primer, drugstore foundation, brow pen, single shadow, lip balm, or gloss. 15-30 dollars: choose one hero item like mascara, blush, lip liner, lipstick, contour stick, or lip oil. 30-50 dollars: invest in base, powder, setting spray, or premium lip oil. Over 50 dollars: invest in foundation, palette, or complexion enhancer if the user already owns basics.

Avoid recommending products above budget unless explaining why it is optional. If the user provides no budget, provide one practical option, one value option, and one premium option if available. The final answer should be concise, actionable, and include why the chosen product matches the user's features.
`
  }
];
