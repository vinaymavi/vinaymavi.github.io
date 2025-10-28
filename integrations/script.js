import { generateTagsForBlog } from "./auto-tags.js";

// Read command line arguments
const args = process.argv.slice(2); // Remove 'node' and script path
const isDryRun = args.includes("--dry-run");

generateTagsForBlog(isDryRun).then(() => {
  console.log("Tag generation done.");
});
