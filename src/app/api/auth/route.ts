import { sign } from "@/utils/jwt";

const admins = [
  {
    user: "admin-user",
    password: "XowwHGRu2PG&",
  },
];

export async function POST(req: Request) {
  const { user, password } = await req.json();

  for (let i = 0; i < admins.length; i++) {
    const admin = admins[i];

    if (admin.user === user && admin.password === password) {
      const token = sign({ user, id: i + 1 });
      return Response.json({ token });
    }
  }

  return Response.json({ error: "Invalid credentials" }, { status: 401 });
}
