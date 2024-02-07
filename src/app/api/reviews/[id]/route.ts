import { reviews } from "@/utils/api/info";
import fs from "fs";

type Params = {
  params: {
    id: number;
  };
};

export async function DELETE(_req: Request, { params: { id } }: Params) {
  const reviewsFind = reviews.filter((_review, i) => i !== id);
  const review = reviews.find((_review, i) => i === id);

  if (!review) {
    return Response.json({
      message: "Review not found",
    });
  }

  fs.writeFileSync(
    "src/info/reviews/reviews.json",
    JSON.stringify(reviewsFind)
  );

  return Response.json({
    message: "Success",
  });
}

export async function PUT(req: Request, { params: { id } }: Params) {
  const { location, image, name, description, star } = await req.json();

  const newReviews = reviews.map((_review, i) => {
    if (id === i) {
      return {
        location,
        image,
        name,
        description,
        star,
      };
    }

    return _review;
  });

  fs.writeFileSync("src/info/reviews/reviews.json", JSON.stringify(newReviews));

  return Response.json({
    message: "Success",
  });
}
