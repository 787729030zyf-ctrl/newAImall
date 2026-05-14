export type MakeupZone = 'lips' | 'eyeshadow' | 'blush' | 'skin';

export type MakeupShade = {
  id: string;
  label: string;
  value: string;
  prompt: string;
};

export type MakeupMaskResult = {
  maskDataUrl: string;
  prompt: string;
  analysis: string;
};

type FaceBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type FaceDetectorResult = {
  boundingBox: DOMRectReadOnly;
};

type FaceDetectorConstructor = new (options?: {
  fastMode?: boolean;
  maxDetectedFaces?: number;
}) => {
  detect(source: CanvasImageSource): Promise<FaceDetectorResult[]>;
};

declare global {
  interface Window {
    FaceDetector?: FaceDetectorConstructor;
  }
}

export const MAKEUP_SHADES: MakeupShade[] = [
  {
    id: 'rose-red',
    label: 'Rose Red',
    value: '#B7354B',
    prompt: 'rose red, balanced warm-cool undertone',
  },
  {
    id: 'coral',
    label: 'Coral Glow',
    value: '#E16855',
    prompt: 'fresh coral peach, bright natural glow',
  },
  {
    id: 'berry',
    label: 'Berry',
    value: '#7C2E55',
    prompt: 'deep berry mauve, elegant satin finish',
  },
  {
    id: 'nude',
    label: 'Nude Pink',
    value: '#C98279',
    prompt: 'soft nude pink, natural daily makeup',
  },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

function getFallbackFaceBox(width: number, height: number): FaceBox {
  const faceWidth = width * 0.48;
  const faceHeight = Math.min(height * 0.68, faceWidth * 1.45);
  return {
    x: (width - faceWidth) / 2,
    y: height * 0.16,
    width: faceWidth,
    height: faceHeight,
  };
}

async function detectFaceBox(
  image: HTMLImageElement,
  width: number,
  height: number
): Promise<{ box: FaceBox; source: 'detected' | 'estimated' }> {
  if (!window.FaceDetector) {
    return { box: getFallbackFaceBox(width, height), source: 'estimated' };
  }

  try {
    const detector = new window.FaceDetector({
      fastMode: true,
      maxDetectedFaces: 1,
    });
    const faces = await detector.detect(image);
    const first = faces[0]?.boundingBox;
    if (!first || first.width < 20 || first.height < 20) {
      return { box: getFallbackFaceBox(width, height), source: 'estimated' };
    }
    return {
      box: {
        x: first.x,
        y: first.y,
        width: first.width,
        height: first.height,
      },
      source: 'detected',
    };
  } catch {
    return { box: getFallbackFaceBox(width, height), source: 'estimated' };
  }
}

function drawSoftEllipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  opacity = 1,
  rotation = 0
) {
  ctx.save();
  ctx.filter = `blur(${Math.max(2, Math.min(rx, ry) * 0.12)}px)`;
  ctx.globalAlpha = opacity;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSoftRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.save();
  ctx.filter = `blur(${Math.max(3, height * 0.18)}px)`;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
  ctx.restore();
}

function createMask(
  width: number,
  height: number,
  face: FaceBox,
  zones: MakeupZone[]
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported');

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  const cx = face.x + face.width * 0.5;
  const leftEyeX = face.x + face.width * 0.34;
  const rightEyeX = face.x + face.width * 0.66;
  const eyeY = face.y + face.height * 0.38;
  const cheekY = face.y + face.height * 0.58;
  const mouthY = face.y + face.height * 0.73;

  if (zones.includes('skin')) {
    drawSoftEllipse(
      ctx,
      cx,
      face.y + face.height * 0.52,
      face.width * 0.42,
      face.height * 0.46,
      0.65
    );
  }

  if (zones.includes('eyeshadow')) {
    drawSoftEllipse(ctx, leftEyeX, eyeY, face.width * 0.17, face.height * 0.055, 0.9, -0.08);
    drawSoftEllipse(ctx, rightEyeX, eyeY, face.width * 0.17, face.height * 0.055, 0.9, 0.08);
  }

  if (zones.includes('blush')) {
    drawSoftEllipse(ctx, face.x + face.width * 0.28, cheekY, face.width * 0.12, face.height * 0.08, 0.72, -0.2);
    drawSoftEllipse(ctx, face.x + face.width * 0.72, cheekY, face.width * 0.12, face.height * 0.08, 0.72, 0.2);
  }

  if (zones.includes('lips')) {
    drawSoftRect(
      ctx,
      cx - face.width * 0.18,
      mouthY - face.height * 0.035,
      face.width * 0.36,
      face.height * 0.075,
      face.height * 0.035
    );
  }

  return canvas.toDataURL('image/png');
}

function zoneText(zones: MakeupZone[]) {
  const labels: Record<MakeupZone, string> = {
    lips: 'lips only',
    eyeshadow: 'upper eyelids and eye makeup area',
    blush: 'cheek blush area',
    skin: 'facial skin foundation area',
  };
  return zones.map((zone) => labels[zone]).join(', ');
}

export async function buildMakeupMask(
  imageDataUrl: string,
  userPrompt: string,
  zones: MakeupZone[],
  shade: MakeupShade
): Promise<MakeupMaskResult> {
  const image = await loadImage(imageDataUrl);
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const { box, source } = await detectFaceBox(image, width, height);
  const maskDataUrl = createMask(width, height, box, zones);

  const prompt = [
    userPrompt,
    `Use product shade ${shade.label} (${shade.value}): ${shade.prompt}.`,
    `Apply makeup only inside the provided mask: ${zoneText(zones)}.`,
    'Preserve the person identity, facial structure, skin texture, hair, clothing, background, lighting, and camera angle.',
    'Blend edges naturally like real cosmetics on skin; avoid changing unmasked areas.',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    maskDataUrl,
    prompt,
    analysis:
      source === 'detected'
        ? 'Face detected; precise makeup mask generated.'
        : 'Face estimated; adjust the selfie crop if the mask is not aligned.',
  };
}
