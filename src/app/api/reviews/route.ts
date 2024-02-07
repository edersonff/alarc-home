import { reviews } from "@/utils/api/info";
import fs from "fs";

export async function POST(req: Request) {
  const { location, image, name, description, star } = await req.json();

  const newReviews = [
    {
      location,
      image,
      name,
      description,
      star,
    },
    ...reviews,
  ];

  fs.writeFileSync("src/info/reviews/reviews.json", JSON.stringify(newReviews));

  return Response.json({
    message: "Success",
  });
}
