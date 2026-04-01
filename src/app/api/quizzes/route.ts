import { demoQuizzes } from "@/lib/sample-quizzes";

export async function GET() {
  return Response.json({
    quizzes: demoQuizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      category: quiz.category,
      description: quiz.description,
      difficulty: quiz.difficulty,
      modeLabel: quiz.modeLabel,
      questionCount: quiz.questions.length,
    })),
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return Response.json({
    message: "Quiz draft received",
    received: body,
  });
}