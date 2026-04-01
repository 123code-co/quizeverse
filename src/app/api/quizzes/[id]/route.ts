import { demoQuizzes } from "@/lib/sample-quizzes";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const quiz = demoQuizzes.find((item) => item.id === id);

  if (!quiz) {
    return Response.json({ error: "Quiz not found" }, { status: 404 });
  }

  return Response.json({ quiz });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));

  return Response.json({
    message: `Quiz ${id} update payload received`,
    received: body,
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return Response.json({
    message: `Quiz ${id} delete request received`,
  });
}