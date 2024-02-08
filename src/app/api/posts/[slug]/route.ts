import { PostType } from "@/@types/Post";
import { infoData } from "@/utils/api/info";
import fs from "fs";

type Params = {
  params: {
    slug: string;
  };
};

export async function DELETE(_req: Request, { params: { slug } }: Params) {
  const posts: PostType[] = infoData("posts");
  const postsFind = posts.filter((post) => post.slug !== slug);
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return Response.json({
      message: "Publicação não encontrada.",
    });
  }

  if (post.image.includes("/images/blog/")) {
    fs.unlinkSync(`public${post.image}`);
  }

  fs.writeFileSync("src/info/posts/posts.json", JSON.stringify(postsFind));

  return Response.json({
    message: "Success",
  });
}

export async function PUT(req: Request, { params: { slug: oldSlug } }: Params) {
  const posts: PostType[] = infoData("posts");
  const formData = await req.formData();

  const { title, date, tags, text, owner, slug } = Object.fromEntries(formData);

  const repeatedSlug = posts.find(
    (post) => post.slug === slug && slug !== oldSlug
  );

  if (repeatedSlug) {
    return Response.json(
      {
        message: "O slug já está em uso.",
      },
      {
        status: 400,
      }
    );
  }

  const image = formData.get("image");

  let fileName: string | null;

  if (image) {
    fileName = await saveImage(image as File, oldSlug);
  }

  const newPosts = posts.map((post) => {
    if (post.image.includes("/images/blog/") && fileName === null) {
      fs.unlinkSync(`public${post.image}`);
    }

    if (post.slug === oldSlug) {
      return {
        title,
        slug,
        date,
        tags: String(tags)
          .split(",")
          .map((tag: string) => tag.trim()),
        text,
        owner,
        image: fileName || post.image,
      };
    }

    return post;
  });

  fs.writeFileSync("src/info/posts/posts.json", JSON.stringify(newPosts));

  return Response.json({
    message: "Success",
  });
}

async function saveImage(image: File, slug: string) {
  const arrayBuffer = await image.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${slug}.${image.name.split(".").pop()}`;

  fs.writeFileSync(`public/images/blog/${fileName}`, buffer);

  return `/images/blog/${fileName}`;
}
