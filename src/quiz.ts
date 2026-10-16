export type Answer = "A" | "B" | "C" | "D";
export type Question = {
  id: string;
  status: "approved" | "pending";
  prompt: string;
  options: { id: Answer; text: string }[];
};
export const totalQuestions = 18;
export const questions: Question[] = Array.from(
  { length: totalQuestions },
  (_, i) => ({
    id: `Q${String(i + 1).padStart(2, "0")}`,
    status: i === 6 ? "approved" : "pending",
    prompt:
      i === 6
        ? "Your employer asks you to dispose of evidence involving a minor incident with the Valiant Guard. You:"
        : `Question ${i + 1} — awaiting approved content`,
    options:
      i === 6
        ? [
            {
              id: "A",
              text: "Provide a detailed spreadsheet of all evidence before burning it twice.",
            },
            {
              id: "B",
              text: "Accidentally set it on fire while making a fresh pot of tea. Efficiency.",
            },
            {
              id: "C",
              text: "Bribe the guards with high-quality baked goods and a threatening look.",
            },
            {
              id: "D",
              text: "Hide it in the basement. The dragon needs a new hobby.",
            },
          ]
        : [],
  }),
);
export type QuizState = { index: number; answers: Record<string, Answer> };
export const emptyState = (): QuizState => ({ index: 0, answers: {} });
export function selectAnswer(
  state: QuizState,
  question: Question,
  answer: Answer,
): QuizState {
  if (!question.options.some((option) => option.id === answer)) return state;
  return { ...state, answers: { ...state.answers, [question.id]: answer } };
}
export function progress(answers: QuizState["answers"], data = questions) {
  const count = data.filter((q) =>
    q.options.some((o) => o.id === answers[q.id]),
  ).length;
  return data.length ? (count / data.length) * 100 : 0;
}
export function canReveal(
  answers: QuizState["answers"],
  data = questions,
  scoringApproved = false,
) {
  return (
    scoringApproved &&
    data.every((q) => q.status === "approved") &&
    progress(answers, data) === 100
  );
}
export function restoreState(raw: string | null): QuizState {
  try {
    const parsed = JSON.parse(raw ?? "null");
    if (
      !parsed ||
      !Number.isInteger(parsed.index) ||
      parsed.index < 0 ||
      parsed.index >= totalQuestions
    )
      return emptyState();
    const answers: QuizState["answers"] = {};
    questions.forEach((q) => {
      if (q.options.some((o) => o.id === parsed.answers?.[q.id]))
        answers[q.id] = parsed.answers[q.id];
    });
    return { index: parsed.index, answers };
  } catch {
    return emptyState();
  }
}
