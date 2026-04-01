export type DemoQuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";

export type DemoQuestion = {
  id: string;
  type: DemoQuestionType;
  prompt: string;
  answer: string;
  explanation: string;
  points: number;
  options?: string[];
  placeholder?: string;
};

export type DemoQuiz = {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  accent: string;
  modeLabel: string;
  timeLimitSec: number;
  questions: DemoQuestion[];
};

export const demoQuizzes: DemoQuiz[] = [
  {
    id: "code-rush",
    title: "Code Rush",
    category: "Programming",
    description: "A neon multiple-choice sprint focused on dev knowledge.",
    difficulty: "Medium",
    accent: "cyan",
    modeLabel: "Multiple Choice",
    timeLimitSec: 60,
    questions: [
      {
        id: "cr-1",
        type: "MULTIPLE_CHOICE",
        prompt: "Which hook is used to keep local state inside a React component?",
        answer: "useState",
        explanation: "`useState` stores and updates local component state in React.",
        points: 10,
        options: ["useMemo", "useState", "useEffect", "useContext"],
      },
      {
        id: "cr-2",
        type: "MULTIPLE_CHOICE",
        prompt: "Which HTTP method is typically used to create a new resource?",
        answer: "POST",
        explanation: "`POST` is the standard method for creating resources on the server.",
        points: 10,
        options: ["GET", "PATCH", "POST", "DELETE"],
      },
      {
        id: "cr-3",
        type: "MULTIPLE_CHOICE",
        prompt: "What does CSS primarily control on a webpage?",
        answer: "Styling and layout",
        explanation: "CSS handles presentation such as color, spacing, layout, and responsiveness.",
        points: 10,
        options: ["Database storage", "Styling and layout", "Authentication", "Routing only"],
      },
    ],
  },
  {
    id: "signal-check",
    title: "Signal Check",
    category: "Quick Fire",
    description: "Fast true-or-false reactions under pressure.",
    difficulty: "Easy",
    accent: "fuchsia",
    modeLabel: "True / False",
    timeLimitSec: 45,
    questions: [
      {
        id: "sc-1",
        type: "TRUE_FALSE",
        prompt: "JavaScript runs only on the server.",
        answer: "False",
        explanation: "JavaScript runs in browsers and on servers such as Node.js.",
        points: 8,
        options: ["True", "False"],
      },
      {
        id: "sc-2",
        type: "TRUE_FALSE",
        prompt: "A Prisma schema can define models and relationships.",
        answer: "True",
        explanation: "Prisma schemas define models, fields, relations, and datasource config.",
        points: 8,
        options: ["True", "False"],
      },
      {
        id: "sc-3",
        type: "TRUE_FALSE",
        prompt: "`git push` downloads changes from GitHub to your local machine.",
        answer: "False",
        explanation: "`git push` uploads your local commits to the remote repository.",
        points: 8,
        options: ["True", "False"],
      },
    ],
  },
  {
    id: "syntax-lab",
    title: "Syntax Lab",
    category: "Fill in the Blank",
    description: "Complete the missing terms to keep the system online.",
    difficulty: "Medium",
    accent: "emerald",
    modeLabel: "Fill in the Blank",
    timeLimitSec: 75,
    questions: [
      {
        id: "sl-1",
        type: "FILL_IN_BLANK",
        prompt: "In Next.js App Router, pages are usually created with a file named `____.tsx`.",
        answer: "page",
        explanation: "The App Router uses `page.tsx` for route UI files.",
        points: 12,
        placeholder: "Type the missing word",
      },
      {
        id: "sl-2",
        type: "FILL_IN_BLANK",
        prompt: "The SQL keyword used to read rows from a table is `____`.",
        answer: "SELECT",
        explanation: "`SELECT` is used to query records from database tables.",
        points: 12,
        placeholder: "Enter SQL keyword",
      },
      {
        id: "sl-3",
        type: "FILL_IN_BLANK",
        prompt: "The command to install dependencies in most Node.js apps is `npm ____`.",
        answer: "install",
        explanation: "`npm install` fetches and installs project dependencies.",
        points: 12,
        placeholder: "Complete the command",
      },
    ],
  },
  {
    id: "logic-grid",
    title: "Logic Grid",
    category: "Reasoning",
    description: "A more tactical set of quiz prompts for careful thinkers.",
    difficulty: "Hard",
    accent: "amber",
    modeLabel: "Speed Logic",
    timeLimitSec: 50,
    questions: [
      {
        id: "lg-1",
        type: "MULTIPLE_CHOICE",
        prompt: "If every quiz has questions and every question has points, what must every quiz have?",
        answer: "Questions with points",
        explanation: "By combining both statements, every quiz must contain questions that have points.",
        points: 14,
        options: ["Only a timer", "Questions with points", "A multiplayer room", "Only one answer"],
      },
      {
        id: "lg-2",
        type: "TRUE_FALSE",
        prompt: "If a room is marked COMPLETED, new players should still be able to join that same active match.",
        answer: "False",
        explanation: "A completed room should be closed to new active joins.",
        points: 14,
        options: ["True", "False"],
      },
      {
        id: "lg-3",
        type: "FILL_IN_BLANK",
        prompt: "A countdown that reaches zero means the round has ____.",
        answer: "ended",
        explanation: "When the timer reaches zero, the round is considered ended.",
        points: 14,
        placeholder: "Finish the sentence",
      },
    ],
  },
];

export function getDemoQuizById(id: string) {
  return demoQuizzes.find((quiz) => quiz.id === id) ?? demoQuizzes[0];
}
