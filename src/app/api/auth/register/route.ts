import { registerUser } from "@/app/actions/auth";

export async function POST(req: Request) {
  const data = await req.json();
  const result = await registerUser(data);
  if (result.error) {
    return Response.json({ error: result.error }, { status: 400 });
  }
  return Response.json({ user: result.user });
}
