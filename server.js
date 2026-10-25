import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint to generate student photo with AI
app.post('/api/generate-student-photo', async (req, res) => {
  try {
    const { name, gender, grade, age, style = 'formal', customPrompt = '' } = req.body || {};
    const isGirl = String(gender || '').includes('ស្រី') || String(gender || '').toLowerCase().includes('female');
    const genderEn = isGirl ? 'girl' : 'boy';
    const ageNum = parseInt(age, 10) || 8;

    let stylePrompt = '';
    if (style === 'formal') {
      stylePrompt = `High quality official ID passport photograph of a young Cambodian ${genderEn} student aged ${ageNum}, wearing a crisp white primary school uniform shirt with neat dark blue collar and tie, tidy hair, gentle pleasant smile, looking directly forward, head and shoulders portrait, solid light blue passport photo background, sharp focus, professional student ID photography.`;
    } else if (style === 'cartoon_3d') {
      stylePrompt = `Charming 3D animated character portrait of a cheerful Cambodian school ${genderEn} student aged ${ageNum}, wearing white school uniform shirt with blue accents, soft studio lighting, cute expressive Pixar style animated character, solid soft sky-blue background, centered portrait bust, high resolution render.`;
    } else if (style === 'cambodia_art') {
      stylePrompt = `Elegant graphic illustration of a Cambodian ${genderEn} student aged ${ageNum} in school uniform, neat portrait, warm respectful expression, clean vector aesthetic, student ID badge portrait.`;
    } else {
      stylePrompt = `Cute anime style student portrait of a Cambodian ${genderEn} aged ${ageNum}, white school shirt uniform, tidy hair, bright friendly eyes, pastel studio background, high quality portrait illustration.`;
    }

    if (customPrompt) {
      stylePrompt += ` Additional details: ${customPrompt}.`;
    }

    // Attempt direct image generation using gemini-3.1-flash-lite-image
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: stylePrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: '3:4',
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          return res.json({
            success: true,
            photoUrl: `data:${mime};base64,${part.inlineData.data}`,
            source: 'gemini-3.1-flash-lite-image',
          });
        }
      }
    } catch (imgErr) {
      console.warn('Direct image model unavailable or error, falling back to gemini-3.8-flash SVG:', imgErr.message);
    }

    // High quality SVG Vector Portrait fallback with gemini-3.8-flash
    const svgPrompt = `Create a clean, charming standalone SVG portrait illustration of a young Cambodian ${genderEn} student aged ${ageNum} wearing a white Cambodian school uniform with blue collar.
Style: ${style}. Return ONLY valid, complete SVG code with viewBox="0 0 300 360", width="100%", height="100%".
Include a soft pastel blue studio gradient background, face, hair, eyes, friendly smile, white uniform collar, and tie/badge.
DO NOT wrap in markdown, no backticks, only pure SVG code starting with <svg and ending with </svg>.`;

    try {
      const textResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: svgPrompt,
      });

      let rawSvg = textResponse.text || '';
      rawSvg = rawSvg.replace(/```xml/gi, '').replace(/```svg/gi, '').replace(/```/g, '').trim();
      const svgStart = rawSvg.indexOf('<svg');
      const svgEnd = rawSvg.lastIndexOf('</svg>');
      if (svgStart !== -1 && svgEnd !== -1) {
        rawSvg = rawSvg.slice(svgStart, svgEnd + 6);
        const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
        return res.json({
          success: true,
          photoUrl: svgDataUrl,
          source: 'gemini-3.8-flash-svg',
        });
      }
    } catch (txtErr) {
      console.warn('Text SVG model failed, falling back to smart avatar:', txtErr.message);
    }

    // Fallback: If cloud generation throws, create an intelligent tailored Cambodian Student ID avatar
    const defaultColor = isGirl ? '#ec4899' : '#2563eb';
    const skinTone = isGirl ? '#fed7aa' : '#fcd34d';
    const hairColor = '#1e293b';
    const initials = (name || 'ស').trim().slice(0, 4);

    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#bae6fd"/>
          <stop offset="100%" stop-color="#e0f2fe"/>
        </linearGradient>
      </defs>
      <rect width="300" height="360" fill="url(#bgGrad)"/>
      <!-- Soft aura -->
      <circle cx="150" cy="140" r="85" fill="#ffffff" opacity="0.6"/>
      <!-- Body / School Uniform -->
      <path d="M 50 360 C 50 240, 250 240, 250 360 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Dark Blue Collar & Tie -->
      <polygon points="150,250 120,285 150,335 180,285" fill="${defaultColor}"/>
      <path d="M 95 245 L 150 285 L 205 245" fill="none" stroke="#0369a1" stroke-width="6" stroke-linecap="round"/>
      <!-- Neck -->
      <rect x="135" y="190" width="30" height="40" fill="${skinTone}" rx="6"/>
      <!-- Head -->
      <ellipse cx="150" cy="135" rx="65" ry="72" fill="${skinTone}"/>
      <!-- Hair -->
      ${isGirl ? `
        <!-- Girl Long Hair / Ponytail -->
        <path d="M 75 140 C 65 60, 235 60, 225 140 C 210 90, 90 90, 75 140 Z" fill="${hairColor}"/>
        <path d="M 72 135 Q 60 210, 85 240 Q 82 170, 88 140 Z" fill="${hairColor}"/>
        <path d="M 228 135 Q 240 210, 215 240 Q 218 170, 212 140 Z" fill="${hairColor}"/>
        <!-- Hair pin / ribbon -->
        <circle cx="215" cy="100" r="9" fill="#f43f5e"/>
      ` : `
        <!-- Boy Neat Hair -->
        <path d="M 78 130 C 70 60, 230 60, 222 130 C 205 80, 95 80, 78 130 Z" fill="${hairColor}"/>
        <path d="M 80 115 Q 150 70, 220 115" stroke="${hairColor}" stroke-width="12" fill="none"/>
      `}
      <!-- Ears -->
      <circle cx="82" cy="140" r="12" fill="${skinTone}"/>
      <circle cx="218" cy="140" r="12" fill="${skinTone}"/>
      <!-- Eyes & Eyebrows -->
      <ellipse cx="125" cy="130" rx="6" ry="8" fill="#0f172a"/>
      <ellipse cx="175" cy="130" rx="6" ry="8" fill="#0f172a"/>
      <circle cx="127" cy="128" r="2.5" fill="#ffffff"/>
      <circle cx="177" cy="128" r="2.5" fill="#ffffff"/>
      <path d="M 112 115 Q 125 110, 138 115" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 162 115 Q 175 110, 188 115" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Cheeks blush -->
      <ellipse cx="115" cy="150" rx="10" ry="6" fill="#f43f5e" opacity="0.25"/>
      <ellipse cx="185" cy="150" rx="10" ry="6" fill="#f43f5e" opacity="0.25"/>
      <!-- Nose & Smile -->
      <path d="M 150 138 Q 153 148, 146 150" stroke="#d97706" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 134 165 Q 150 180, 166 165" stroke="#e11d48" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- School Badge Pin -->
      <circle cx="215" cy="295" r="15" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      <polygon points="215,285 218,293 226,293 220,298 222,306 215,301 208,306 210,298 204,293 212,293" fill="#ffffff"/>
      <!-- Grade text -->
      <rect x="90" y="325" width="120" height="22" rx="11" fill="rgba(15, 23, 42, 0.75)"/>
      <text x="150" y="340" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">ថ្នាក់ ${grade || 'សិស្ស'}</text>
    </svg>`;

    const defaultDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(fallbackSvg)}`;
    return res.json({
      success: true,
      photoUrl: defaultDataUrl,
      source: 'smart-khmer-avatar',
    });
  } catch (err) {
    console.error('Generate student photo error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to generate photo' });
  }
});

// Default entry point

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() });
});

process.on('uncaughtException', (err) => {
  console.error('Server uncaughtException:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Server unhandledRejection:', reason);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
