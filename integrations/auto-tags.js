import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
// Load Environment variables
import { config } from "dotenv";
config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Import the tag generation logic with OpenAI integration
export async function generateTagsForBlog(isDryRun = false) {
  const blogDir = path.join(__dirname, "../src/content/blog");

  async function analyzeContentWithAI(content, title) {
    // Fallback to rule-based analysis if OpenAI is not available
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
      console.log("⚠️  OPENAI_API_KEY not found, using rule-based tagging...");
      throw Error("OPENAI key or model not found");
    }

    try {
      // Extract the main content (remove frontmatter)
      const contentBody = content.replace(/^---\n([\s\S]*?)\n---/, "").trim();

      const prompt = `Analyze this blog post and generate relevant tags.

Title: ${title}

Content: ${contentBody.substring(0, 2000)}...

Please generate 3-8 relevant tags in lowercase, separated by commas. Focus on:
- Technology stacks (TERRAFORM, JAVASCRIPT, PYTHON, AWS, etc.)
- Concepts (IAC, DEVOPS, CI-CD, SCRUM, AGILE, etc.)
- Categories (ENTERPRISE, SECURITY, CLOUD, etc.)

Only return the tags as a comma-separated list in lowsercase, no explanations:`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are an expert content tagger for technical blog posts. Generate concise, relevant tags in lowercase format.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const aiTags =
        completion.choices[0]?.message?.content
          ?.trim()
          ?.split(",")
          ?.map((tag) => tag.trim().toUpperCase())
          ?.filter((tag) => tag.length > 0) || [];

      console.log(`🤖 AI suggested tags: [${aiTags.join(", ")}]`);
      return aiTags;
    } catch (error) {
      console.error("❌ OpenAI API error:", error.message);
      console.log("🔄 Falling back to rule-based tagging...");
      return analyzeContentFallback(content);
    }
  }

  // Process all blog files
  const files = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, "utf8");

    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;

    // Extract title from frontmatter
    const titleMatch = frontmatterMatch[1].match(/title:\s*['"]([^'"]+)['"]/);
    const title = titleMatch ? titleMatch[1] : file.replace(/\.(mdx?|md)$/, "");

    // Extract existing tags
    const existingTagsMatch = frontmatterMatch[1].match(/tags:\s*\[(.*?)\]/);
    let existingTags = [];

    if (existingTagsMatch) {
      console.log(`Tags already created for this "${filePath}" document`);
      continue;
    }

    const suggestedTags = await analyzeContentWithAI(content, title);

    if (!suggestedTags.length) {
      console.warn(`No tags created for this ${filePath} document`);
    }

    // Update file if needed
    if (
      JSON.stringify(suggestedTags.sort()) !==
      JSON.stringify(existingTags.sort())
    ) {
      const tagString = `tags: [${suggestedTags
        .map((tag) => `"${tag}"`)
        .join(", ")}]`;
      console.log(`Created tags for this ${filePath} is ${tagString}`);

      // Add tag at the end of frontmatter
      const newContent = content.replace(
        /^(---\n[\s\S]*?)\n---/,
        `$1\n${tagString}\n---`
      );

      fs.writeFileSync(filePath, newContent, "utf8");

      if (!isDryRun) {
        fs.writeFileSync(filePath, newContent, "utf8");
        console.log(
          `✅ Auto-generated tags for ${file}: [${suggestedTags.join(", ")}]`
        );
      } else {
        console.log(`[DRY RUN] Would write to ${filePath}`);
      }
    }
  }
}

// Astro Integration
export default function autoTagsIntegration() {
  return {
    name: "auto-tags",
    hooks: {
      "astro:config:setup": async () => {
        console.log("🏷️  Auto-generating blog tags with AI...");
        try {
          await generateTagsForBlog();
          console.log("✅ Tag generation completed successfully!");
        } catch (error) {
          console.error("❌ Error during tag generation:", error.message);
        }
      },
    },
  };
}
