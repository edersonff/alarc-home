import { imagePath, posts } from "@/utils/api/info";
import fs from "fs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const { title, slug, date, tags, text, owner } = Object.fromEntries(formData);

  const image = formData.get("image") as File;

  const arrayBuffer = await image.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${slug}.${image.name.split(".").pop()}`;

  fs.writeFileSync(`${imagePath}${fileName}`, buffer);

  const newPosts = [
    {
      title,
      slug,
      date,
      tags: String(tags)
        .split(",")
        .map((tag: string) => tag.trim()),
      text,
      owner,
      image: `/images/blog/${fileName}`,
    },
    ...posts,
  ];

  fs.writeFileSync("src/info/posts/posts.json", JSON.stringify(newPosts));

  return Response.json({
    message: "Success",
  });
}
