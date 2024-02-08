import fs from "fs";
import { basePath, infoData, infoPath } from "@/utils/api/info";

type Params = {
  params: {
    name: keyof typeof infoPath;
  };
};

export async function PUT(req: Request, { params: { name } }: Params) {
  const data: any = infoData();
  const { name: row, value } = await req.json();

  const file = data[name] as any;

  if (!file) {
    return Response.json(
      {
        message: "Nome inválido",
      },
      {
        status: 400,
      }
    );
  }

  file[row] = value;

  const path = infoPath[name];

  await fs.promises.writeFile(
    process.cwd() + basePath + path,
    JSON.stringify(file, null, 2),
    "utf8"
  );

  return Response.json({
    message: "Success",
  });
}
