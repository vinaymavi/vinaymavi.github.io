import sharp from "sharp";
import { getCollection } from "astro:content";
import katori from "../../katori";
export async function getStaticPaths() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return Array.from(posts).map((p) => ({
    params: { slug: p.id },
    props: { posts: posts },
  }));
}

export async function GET() {
  // Create a 200x200 red square image
  const imageBuffer = await katori("Hello world");

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
