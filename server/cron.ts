import cron from "node-cron";
import https from "https";
import http from "http";
import { insertArticle, publishDueArticles, articleExists } from "./db.js";

// ═══════════════════════════════════════════════════════════════
// CONFIG — All from Railway env vars
// ═══════════════════════════════════════════════════════════════
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const FAL_API_KEY = process.env.FAL_API_KEY || "";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_ZONE = "oracle-lover";
const BUNNY_API_KEY = process.env.BUNNY_STORAGE_KEY || "9369c8ad-563a-4589-83bf139485f1-b5cf-4941";
const BUNNY_CDN_HOST = "oracle-lover.b-cdn.net";
const AUTO_GEN_ENABLED = process.env.AUTO_GEN_ENABLED === "true";

// ═══════════════════════════════════════════════════════════════
// TOPIC POOL — Health & wellness topics for weekly generation
// ═══════════════════════════════════════════════════════════════
const TOPIC_POOL = [
  { title: "The Spiritual Dimension of Adaptogens", herbs: ["ashwagandha", "rhodiola", "holy-basil"], desc: "How adaptogenic herbs support the body, energetic and emotional systems. Stress, cortisol, and spiritual clarity." },
  { title: "Healing the Gut as a Spiritual Practice", herbs: ["probiotics", "triphala", "berberine"], desc: "The gut-brain-spirit connection. Digestive health influences intuition and emotional processing." },
  { title: "Sleep as Sacred Medicine", herbs: ["magnesium-glycinate", "valerian", "passionflower"], desc: "Deep rest as the foundation of spiritual practice. Herbs and minerals for genuine restoration." },
  { title: "Detox as a Form of Letting Go", herbs: ["nac", "milk-thistle", "glutathione"], desc: "Physical detoxification parallels emotional and spiritual release. Clearing the liver clears the mind." },
  { title: "Ancient Mushrooms for Modern Seekers", herbs: ["lions-mane", "reishi", "cordyceps"], desc: "Medicinal mushrooms across spiritual traditions. Lion's mane for clarity, reishi for calm, cordyceps for vitality." },
  { title: "Essential Oils and the Subtle Body", herbs: ["frankincense", "lavender", "sandalwood"], desc: "Aromatherapy interfaces with the chakra system, emotional release, and meditation practice." },
  { title: "Adaptogens for the Anxious Mind", herbs: ["ashwagandha", "rhodiola", "schisandra"], desc: "How adaptogens modulate the stress response for people living with chronic anxiety." },
  { title: "The Forgotten Medicine of Bitter Herbs", herbs: ["dandelion", "gentian", "artichoke-leaf"], desc: "Bitter herbs stimulate digestion, liver function, and metabolic clarity." },
  { title: "Magnesium and the Spiritual Nervous System", herbs: ["magnesium-glycinate", "magnesium-threonate", "magnesium-taurate"], desc: "Why magnesium deficiency mimics spiritual disconnection and how to restore it." },
  { title: "Herbal Allies for Grief and Loss", herbs: ["st-johns-wort", "hawthorn", "rose"], desc: "Herbs that support the heart during periods of deep grief without numbing the process." },
  { title: "The Ayurvedic Kitchen as Healing Space", herbs: ["turmeric", "ginger", "triphala"], desc: "How Ayurvedic cooking principles transform daily meals into medicine." },
  { title: "Breathwork and Herbs: A Combined Practice", herbs: ["holy-basil", "peppermint", "eucalyptus"], desc: "Pairing breathwork with herbal support for deeper respiratory and nervous system healing." },
  { title: "Immune Intelligence: Beyond Just Not Getting Sick", herbs: ["elderberry", "astragalus", "echinacea"], desc: "The immune system as a form of bodily wisdom. Herbs that support intelligent immune response." },
  { title: "Herbs for the Overthinking Mind", herbs: ["lemon-balm", "passionflower", "bacopa"], desc: "Specific herbs that quiet mental loops without dulling cognitive function." },
  { title: "The Sacred Art of Herbal Tea Ceremony", herbs: ["chamomile", "holy-basil", "lavender"], desc: "How preparing and drinking herbal tea can become a daily contemplative practice." },
  { title: "Liver Health as Emotional Clearing", herbs: ["milk-thistle", "dandelion", "schisandra"], desc: "The liver processes not just toxins but unresolved emotions. Herbs that support both." },
  { title: "Nootropic Herbs for Spiritual Clarity", herbs: ["lions-mane", "gotu-kola", "bacopa"], desc: "Natural cognitive enhancers that support meditation, focus, and spiritual insight." },
  { title: "The Endocrine System as Energetic Map", herbs: ["maca", "vitex", "ashwagandha"], desc: "How hormonal balance mirrors energetic alignment across the chakra system." },
  { title: "Herbs for Empaths Who Absorb Everything", herbs: ["skullcap", "reishi", "holy-basil"], desc: "Protective and restorative herbs for highly sensitive people who take on others' energy." },
  { title: "Fermented Foods as Living Medicine", herbs: ["probiotics", "apple-cider-vinegar", "miso"], desc: "The ancient wisdom of fermentation and how it supports gut health and mental clarity." },
  { title: "Grounding Herbs for Scattered Energy", herbs: ["valerian", "vetiver", "ashwagandha"], desc: "Herbs that help bring scattered, anxious energy back into the body." },
  { title: "The Wisdom of Warming Herbs in Cold Seasons", herbs: ["ginger", "cinnamon", "cayenne"], desc: "How warming herbs support circulation, digestion, and emotional warmth during winter." },
  { title: "Herbal Support for Digital Overwhelm", herbs: ["rhodiola", "gotu-kola", "blue-light-herbs"], desc: "Herbs that counteract the nervous system effects of constant screen exposure." },
  { title: "Seeds and Sprouts as Concentrated Life Force", herbs: ["flaxseed", "chia", "fenugreek"], desc: "The nutritional and energetic density of seeds and how to incorporate them daily." },
  { title: "Flower Essences and Emotional Alchemy", herbs: ["bach-flower", "rose", "lavender"], desc: "How flower essences work on the subtle body to shift emotional patterns." },
  { title: "The Anti-Anxiety Garden: Growing Your Own Medicine", herbs: ["chamomile", "lemon-balm", "lavender"], desc: "How to grow a small medicinal garden focused on calming herbs." },
  { title: "Bone Broth as Ancestral Medicine", herbs: ["collagen", "turmeric", "astragalus"], desc: "The deep nourishment of bone broth and how to enhance it with medicinal herbs." },
  { title: "Herbs That Support Meditation Practice", herbs: ["gotu-kola", "holy-basil", "brahmi"], desc: "Specific herbs used across traditions to deepen meditation and contemplative practice." },
  { title: "The Healing Power of Herbal Baths", herbs: ["epsom-salt", "lavender", "chamomile"], desc: "How herbal baths support the nervous system, skin, and emotional release." },
  { title: "Cordyceps and the Vitality Principle", herbs: ["cordyceps", "maca", "ginseng"], desc: "How cordyceps and other vitality herbs restore deep energy without stimulation." },
];

// ═══════════════════════════════════════════════════════════════
// VOICE PROFILE — The Oracle Lover voice
// ═══════════════════════════════════════════════════════════════
const VOICE_PROMPT = `You are writing as "The Oracle Lover" — an intuitive educator and oracle guide. Voice profile:

SENTENCE RHYTHM: Long, unfolding sentences that build and turn. Average 18-28 words. Write 3-4 flowing sentences before dropping a short one like a stone. Paragraphs breathe — open wide, explore, close sharply.
Pattern: Long → Long → Long (with internal comma rhythm) → Short drop → Long → Short drop.

EMOTIONAL REGISTER: Intellectual warmth. The teacher who sits with you in silence before saying one thing that rearranges everything. Trusts the reader to arrive at the insight.
Ratio: 40% teaching + 30% tender + 20% philosophical + 10% fierce

SPIRITUAL DEPTH: Philosophical and cross-traditional. References Buddhism, Taoism, Vedanta, and neuroscience equally. Comfortable with paradox. Avoids devotional language. Says "awareness" or "consciousness" — never "the divine" or "God."

HUMOR: Intellectual wit. Unexpected metaphors. Observer-humor, not warmth-humor.

SIGNATURE MOVES:
- Em-dashes within long sentences for internal turns
- Prefers "we" and "one" over direct "you"
- Builds analogies across 2-3 sentences before revealing the point
- Ends sections with questions that open rather than close
- Loves triads: "not the thought, not the thinker, but the space in which both appear"

CRITICAL RULES:
- Do NOT mention Paul Wagner anywhere
- Do NOT link to paulwagner.com/readings or any commercial page
- Only link to paulwagner.com/healing/ or /wisdom/ pages
- 2-3 inline editorial links per article, mid-paragraph, natural
- Vary anchor text — never repeat the same anchor across articles
- 2,000-2,500 words
- No "click here" or "read more" — use descriptive anchor text with herb name`;

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function httpRequest(url: string, options: any, body?: string | Buffer): Promise<{ status: number; data: string; buffer?: Buffer }> {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith("https");
    const mod = isHttps ? https : http;
    const req = mod.request(url, options, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve({ status: res.statusCode || 0, data: buffer.toString("utf-8"), buffer });
      });
    });
    req.on("error", reject);
    req.setTimeout(120000, () => { req.destroy(); reject(new Error("Request timeout")); });
    if (body) req.write(body);
    req.end();
  });
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ═══════════════════════════════════════════════════════════════
// STEP 1: Fetch paulwagner.com sitemap for real herb URLs
// ═══════════════════════════════════════════════════════════════
async function fetchPaulWagnerUrls(): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>();
  try {
    console.log("[CRON] Fetching paulwagner.com sitemap...");
    const resp = await httpRequest("https://paulwagner.com/sitemap.xml", { method: "GET" });
    if (resp.status === 200) {
      const urls = resp.data.match(/<loc>([^<]+)<\/loc>/g) || [];
      for (const loc of urls) {
        const url = loc.replace(/<\/?loc>/g, "");
        if (url.includes("/healing/") || url.includes("/wisdom/")) {
          const parts = url.split("/").filter(Boolean);
          const slug = parts[parts.length - 1];
          if (slug) urlMap.set(slug, url);
        }
      }
    }
    console.log(`[CRON] Found ${urlMap.size} herb/wisdom URLs on paulwagner.com`);
  } catch (err) {
    console.error("[CRON] Failed to fetch paulwagner.com sitemap:", err);
  }
  return urlMap;
}

function findHerbUrl(herbSlug: string, urlMap: Map<string, string>): string {
  if (urlMap.has(herbSlug)) return urlMap.get(herbSlug)!;
  for (const [key, url] of Array.from(urlMap.entries())) {
    if (key.includes(herbSlug) || herbSlug.includes(key)) return url;
  }
  return `https://paulwagner.com/wisdom/${herbSlug}`;
}

// ═══════════════════════════════════════════════════════════════
// STEP 2: Generate article via Anthropic Claude
// ═══════════════════════════════════════════════════════════════
async function generateArticle(topic: typeof TOPIC_POOL[0], herbUrls: Map<string, string>): Promise<{ title: string; content: string; slug: string; excerpt: string }> {
  const herbLinks = topic.herbs.map((h) => {
    const url = findHerbUrl(h, herbUrls);
    return `- ${h}: ${url}`;
  }).join("\n");

  const prompt = `${VOICE_PROMPT}

Write a complete article titled "${topic.title}".

Topic: ${topic.desc}

You MUST include 2-3 natural inline links to these paulwagner.com pages (use the EXACT URLs provided):
${herbLinks}

The links must appear mid-paragraph as natural editorial recommendations with descriptive anchor text that includes the herb name. NOT in a resources section.

Format: Start with # ${topic.title} as the heading. Use ## for section headings. Write 2,000-2,500 words. Include a compelling opening that draws the reader in, 4-6 substantive sections, and a closing that opens rather than closes.

Use 3-5 of these voice phrases naturally woven in:
- "The mind is not the enemy. The identification with it is."
- "Awareness doesn't need to be cultivated. It needs to be uncovered."
- "The nervous system doesn't respond to what you believe. It responds to what it senses."
- "Information without integration is just intellectual hoarding."
- "Sit with it long enough and even the worst feeling reveals its edges."
- "The paradox of acceptance is that nothing changes until you stop demanding that it does."
- "What we call 'stuck' is usually the body doing exactly what it was designed to do under conditions that no longer exist."`;

  console.log(`[CRON] Generating article: "${topic.title}" via Anthropic...`);

  const body = JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const resp = await httpRequest("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
  }, body);

  if (resp.status !== 200) {
    throw new Error(`Anthropic API error ${resp.status}: ${resp.data.substring(0, 500)}`);
  }

  const result = JSON.parse(resp.data);
  const content = result.content?.[0]?.text || "";
  const slug = slugify(topic.title);

  const lines = content.split("\n").filter((l: string) => l.trim() && !l.startsWith("#"));
  const excerpt = lines[0]?.substring(0, 200).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") + "..." || topic.desc;

  return { title: topic.title, content, slug, excerpt };
}

// ═══════════════════════════════════════════════════════════════
// STEP 3: Generate hero image via FAL.ai
// ═══════════════════════════════════════════════════════════════
async function generateHeroImage(title: string): Promise<Buffer> {
  console.log(`[CRON] Generating hero image for "${title}" via FAL.ai...`);

  const imagePrompt = `A warm, softly lit photograph related to "${title}". Natural herbs, plants, or healing elements arranged on a rustic wooden surface with warm candlelight. Soft bokeh background. No text, no words, no letters. Warm amber and earth tones. Professional food/lifestyle photography style. Shot from slightly above. Shallow depth of field.`;

  const submitBody = JSON.stringify({
    prompt: imagePrompt,
    image_size: "landscape_16_9",
    num_images: 1,
  });

  const submitResp = await httpRequest("https://queue.fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Key ${FAL_API_KEY}`,
    },
  }, submitBody);

  if (submitResp.status !== 200) {
    throw new Error(`FAL submit error ${submitResp.status}: ${submitResp.data.substring(0, 500)}`);
  }

  const submitResult = JSON.parse(submitResp.data);

  let imageUrl = "";
  if (submitResult.images?.[0]?.url) {
    imageUrl = submitResult.images[0].url;
  } else if (submitResult.request_id) {
    const requestId = submitResult.request_id;
    for (let i = 0; i < 30; i++) {
      await sleep(2000);
      const pollResp = await httpRequest(`https://queue.fal.run/fal-ai/flux/schnell/requests/${requestId}`, {
        method: "GET",
        headers: { "Authorization": `Key ${FAL_API_KEY}` },
      });
      if (pollResp.status === 200) {
        const pollResult = JSON.parse(pollResp.data);
        if (pollResult.images?.[0]?.url) {
          imageUrl = pollResult.images[0].url;
          break;
        }
      }
    }
  }

  if (!imageUrl) {
    throw new Error("Failed to get image URL from FAL.ai");
  }

  console.log(`[CRON] Downloading generated image...`);
  const imgResp = await httpRequest(imageUrl, { method: "GET" });
  if (!imgResp.buffer) throw new Error("Failed to download image");

  return imgResp.buffer;
}

// ═══════════════════════════════════════════════════════════════
// STEP 4: Upload to Bunny CDN as WebP
// ═══════════════════════════════════════════════════════════════
async function uploadToBunny(imageBuffer: Buffer, filename: string): Promise<string> {
  const remotePath = `articles/${filename}`;
  console.log(`[CRON] Uploading to Bunny CDN: ${remotePath}...`);

  const resp = await httpRequest(
    `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${remotePath}`,
    {
      method: "PUT",
      headers: {
        "AccessKey": BUNNY_API_KEY,
        "Content-Type": "image/webp",
        "Content-Length": imageBuffer.length.toString(),
      },
    },
    imageBuffer
  );

  if (resp.status !== 201 && resp.status !== 200) {
    throw new Error(`Bunny upload error ${resp.status}: ${resp.data}`);
  }

  const cdnUrl = `https://${BUNNY_CDN_HOST}/${remotePath}`;
  console.log(`[CRON] Uploaded: ${cdnUrl}`);
  return cdnUrl;
}

// ═══════════════════════════════════════════════════════════════
// MAIN: Weekly article generation — writes to MySQL
// ═══════════════════════════════════════════════════════════════
async function generateWeeklyArticle(): Promise<void> {
  if (!AUTO_GEN_ENABLED) {
    console.log("[CRON] Auto-generation disabled (AUTO_GEN_ENABLED != true). Skipping.");
    return;
  }

  if (!ANTHROPIC_API_KEY || !FAL_API_KEY) {
    console.log("[CRON] Missing API keys. Skipping generation.");
    return;
  }

  const now = new Date();
  const startDate = new Date("2026-07-22T00:00:00Z");
  if (now < startDate) {
    console.log(`[CRON] Weekly generation starts July 22, 2026. Current: ${now.toISOString()}. Skipping.`);
    return;
  }

  console.log(`[CRON] ═══ Starting weekly health article generation ═══`);

  try {
    // Pick an unused topic by checking DB
    let topic = null;
    for (const t of TOPIC_POOL) {
      const slug = slugify(t.title);
      const exists = await articleExists(slug);
      if (!exists) {
        topic = t;
        break;
      }
    }

    if (!topic) {
      console.log("[CRON] All topics in pool have been used. Skipping.");
      return;
    }

    console.log(`[CRON] Selected topic: "${topic.title}"`);

    // Step 1: Fetch paulwagner.com sitemap for real URLs
    const herbUrls = await fetchPaulWagnerUrls();

    // Step 2: Generate article via Anthropic
    const article = await generateArticle(topic, herbUrls);

    // Step 3: Generate hero image via FAL.ai
    const imageBuffer = await generateHeroImage(topic.title);

    // Step 4: Upload to Bunny CDN
    const filename = `${slugify(topic.title)}-${Date.now()}.webp`;
    const heroImageUrl = await uploadToBunny(imageBuffer, filename);

    // Step 5: Insert into MySQL database
    await insertArticle({
      slug: article.slug,
      title: article.title,
      reading_time: "10 min read",
      excerpt: article.excerpt,
      content: article.content,
      hero_image: heroImageUrl,
      status: "published",
      category: "health",
    });

    console.log(`[CRON] ═══ Weekly article generation complete: "${article.title}" ═══`);
  } catch (err) {
    console.error("[CRON] Weekly generation failed:", err);
  }
}

// ═══════════════════════════════════════════════════════════════
// EXPORTS — Start all cron jobs
// ═══════════════════════════════════════════════════════════════
export function startCronJobs(): void {
  // Daily at midnight: publish any scheduled drafts in DB
  cron.schedule("0 0 * * *", async () => {
    try {
      const count = await publishDueArticles();
      if (count > 0) {
        console.log(`[CRON] Published ${count} scheduled article(s).`);
      } else {
        console.log(`[CRON] No articles due for publishing today.`);
      }
    } catch (err) {
      console.error("[CRON] Error publishing scheduled articles:", err);
    }
  });

  // Weekly on Tuesdays at 3am: generate 1 new health article
  cron.schedule("0 3 * * 2", () => {
    generateWeeklyArticle();
  });

  console.log("[CRON] ═══════════════════════════════════════════════");
  console.log("[CRON] Cron jobs initialized:");
  console.log("[CRON]   • Daily midnight: publish scheduled drafts (MySQL)");
  console.log("[CRON]   • Weekly Tuesday 3am: generate new health article");
  console.log("[CRON]   • Auto-gen enabled:", AUTO_GEN_ENABLED);
  console.log("[CRON]   • Start date: July 22, 2026");
  console.log("[CRON] ═══════════════════════════════════════════════");

  // Run draft publisher on startup
  publishDueArticles().then((count) => {
    if (count > 0) console.log(`[CRON] Startup: published ${count} due article(s).`);
  }).catch((err) => {
    console.error("[CRON] Startup publish check failed:", err);
  });
}
