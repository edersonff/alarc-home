import { imageReviewPath, infoData } from "@/utils/api/info";
import { verifyToken } from "@/utils/jwt";
import fs from "fs";

export async function POST(req: Request) {
  const reviews = infoData("reviews");
  const formData = await req.formData();

  if (!verifyToken(req)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

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
