import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "audio");
const STORIES_PATH = path.join(__dirname, "stories.json");

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

if (!API_KEY || !VOICE_ID) {
  console.error("Missing ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID environment variables.");
  process.exit(1);
}

const elevenlabs = new ElevenLabsClient({ apiKey: API_KEY });
const stories = JSON.parse(await fs.readFile(STORIES_PATH, "utf-8"));

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function generateStory(story, index) {
  const outputPath = path.join(OUTPUT_DIR, story.filename);
  console.log(`[${index + 1}/${stories.length}] Generating: ${story.title}`);

  try {
    const audioStream = await elevenlabs.textToSpeech.convert(VOICE_ID, {
      text: story.text,
      modelId: "eleven_multilingual_v2",
      outputFormat: "mp3_44100_128",
    });

    const buffer = await streamToBuffer(audioStream);
    await fs.writeFile(outputPath, buffer);
    console.log(`  ✓ Saved ${outputPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
  } catch (err) {
    console.error(`  ✗ Failed to generate ${story.title}:`, err.message);
  }
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  for (let i = 0; i < stories.length; i++) {
    await generateStory(stories[i], i);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
