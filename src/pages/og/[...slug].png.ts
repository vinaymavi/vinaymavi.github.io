import sharp from "sharp";
import { getCollection } from "astro:content";
import katori from "../../katori";
import OgImage from "../../components/Og";
export async function getStaticPaths() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return Array.from(posts).map((p) => {
    return {
      params: { slug: p.id, title: p.data.title },
      props: { post: p },
    };
  });
}

export async function GET({ props }) {
  const {
    post: {
      data: { title },
    },
  } = props;

  const svgBuffer = await katori(OgImage({ title: title }));

  const imageBuffer = await sharp(Buffer.from(svgBuffer)).png().toBuffer();

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
}
