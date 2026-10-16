import { describe, expect, it } from "vitest";
import {
  canReveal,
  emptyState,
  progress,
  questions,
  restoreState,
  selectAnswer,
} from "./quiz";
describe("approved-content quiz engine", () => {
  it("reserves 18 slots without inventing question copy", () => {
    expect(questions).toHaveLength(18);
    expect(
      questions.filter((q) => q.status === "approved").map((q) => q.id),
    ).toEqual(["Q07"]);
    expect(
      questions
        .filter((q) => q.status === "pending")
        .every((q) => q.options.length === 0),
    ).toBe(true);
  });
  it("preserves answers independently of navigation and calculates answered progress", () => {
    const state = selectAnswer(
      { ...emptyState(), index: 6 },
      questions[6],
      "C",
    );
    expect(
      restoreState(JSON.stringify({ ...state, index: 3 })).answers.Q07,
    ).toBe("C");
    expect(progress(state.answers)).toBeCloseTo(100 / 18);
    expect(canReveal(state.answers)).toBe(false);
  });
  it("rejects invalid or pending selections and corrupt storage", () => {
    expect(selectAnswer(emptyState(), questions[0], "A").answers).toEqual({});
    expect(restoreState("{bad")).toEqual(emptyState());
    expect(restoreState('{"index":99}')).toEqual(emptyState());
    expect(
      restoreState('{"index":6,"answers":{"Q07":"Z","Q01":"A"}}').answers,
    ).toEqual({});
  });
  it("requires complete approved data and approved scoring to unlock a future result", () => {
    const data = [questions[6]];
    expect(canReveal({ Q07: "C" }, data, true)).toBe(true);
    expect(canReveal({}, data, true)).toBe(false);
    expect(canReveal({ Q07: "C" }, data, false)).toBe(false);
    expect(progress({}, [])).toBe(0);
  });
  it("supports completion of all 18 slots when approved data is supplied", () => {
    const fixture = questions.map((q) => ({ ...questions[6], id: q.id }));
    const answers = Object.fromEntries(
      fixture.map((q) => [q.id, "A" as const]),
    );
    expect(progress(answers, fixture)).toBe(100);
    expect(canReveal(answers, fixture, true)).toBe(true);
    delete answers.Q18;
    expect(canReveal(answers, fixture, true)).toBe(false);
  });
});
