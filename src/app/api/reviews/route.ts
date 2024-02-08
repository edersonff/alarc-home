import { imageReviewPath, reviews } from "@/utils/api/info";
import fs from "fs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const { name, location, description, star } = Object.fromEntries(formData);
  const length = reviews.length;

  const id = length + 1;

  const image = formData.get("image") as File;

  const arrayBuffer = await image.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${id}.${image.name.split(".").pop()}`;

  fs.writeFileSync(`${imageReviewPath}${fileName}`, buffer);

  const newPosts = [
    {
      name,
      location,
      description,
      star: +star,
      image: `/images/review/${fileName}`,
    },
    ...reviews,
  ];

  fs.writeFileSync("src/info/reviews/reviews.json", JSON.stringify(newPosts));

  return Response.json({
    message: "Success",
  });
}
