import { infoData } from "@/utils/api/info";

export async function GET() {
  return Response.json(infoData);
}
