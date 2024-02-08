import { ReviewType } from "@/@types/Review";
import { infoData } from "@/utils/api/info";
import fs from "fs";

type Params = {
  params: {
    id: number;
  };
};
export async function DELETE(_req: Request, { params: { id: idStr } }: Params) {
  const reviews: ReviewType[] = infoData("reviews");
  const id = Number(idStr);

  const reviewsFind = reviews.filter((_review, i) => i !== id);
  const review = reviews.find((_review, i) => i === id);

  if (!review) {
    return Response.json({
      message: "Publicação não encontrada.",
    });
  }

  if (review.image.includes("/images/review/")) {
    fs.unlinkSync(`public${review.image}`);
  }

  fs.writeFileSync(
    "src/info/reviews/reviews.json",
    JSON.stringify(reviewsFind)
  );

  return Response.json({
    message: "Success",
  });
}

export async function PUT(req: Request, { params: { id: idStr } }: Params) {
  const reviews: ReviewType[] = infoData("reviews");
  const id = Number(idStr);

  const formData = await req.formData();

  const { name, location, description, star } = Object.fromEntries(formData);

  const image = formData.get("image");

  let fileName: string | null;

  if (image) {
    fileName = await saveImage(image as File, id);
  }

  const newReviews = reviews.map((review, i) => {
    if (review.image.includes("/images/review/") && fileName === null) {
      fs.unlinkSync(`public${review.image}`);
    }

    if (i === id) {
      return {
        name: name || review.name,
        location: location || review.location,
        description: description || review.description,
        star: +star || review.star,
        image: fileName || review.image,
      };
    }

    return review;
  });

  fs.writeFileSync("src/info/reviews/reviews.json", JSON.stringify(newReviews));

  return Response.json({
    message: "Success",
  });
}

async function saveImage(image: File, id: number) {
  const arrayBuffer = await image.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${id}.${image.name.split(".").pop()}`;

  fs.writeFileSync(`public/images/review/${fileName}`, buffer);

  return `/images/review/${fileName}`;
}
