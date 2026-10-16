import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import {
  canReveal,
  emptyState,
  progress,
  questions,
  restoreState,
  selectAnswer,
  type QuizState,
} from "./quiz";
import "./styles.css";

const asset = (name: string) => `/assets/${name}.png`;
const quizTitle = "Would you be hired by the Villain?";
function Footer() {
  return (
    <footer>
      <div>
        <Link to="/home">Assistant to the Villain</Link>
        <p>THE VILLAIN’S ARCHIVE © 2026</p>
      </div>
      <div>
        <p>FAN PROJECT　 •　 BASED ON HANNAH NICOLE MAEHRER’S SERIES</p>
        <p>
          This is an unofficial fan project, not affiliated with or endorsed by
          the author or publisher.
        </p>
        <Link to="/credits">Design & asset credits</Link>
      </div>
    </footer>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  return (
    <header>
      <Link className="brand" to="/home">
        Assistant to the Villain
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        Menu <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <nav
        id="navigation"
        className={open ? "open" : ""}
        aria-label="Main navigation"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        <NavLink to="/history">The History</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        <NavLink to="/quizzes">Quizzes</NavLink>
        <Link to="/history#author">The Author</Link>
      </nav>
    </header>
  );
}
function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    document.title = `${location.pathname === "/" ? "Welcome to Massacre Manor" : location.pathname.includes("hiring") ? quizTitle : location.pathname.split("/").filter(Boolean).join(" · ")} — Assistant to the Villain`;
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    else {
      window.scrollTo(0, 0);
      document
        .querySelector<HTMLElement>("main")
        ?.focus({ preventScroll: true });
    }
  }, [location.pathname, location.hash]);
  return null;
}
function Magic() {
  const [spark, setSpark] = useState<{
    x: number;
    y: number;
    key: number;
  } | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const click = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest("a,button,label") ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      setSpark({ x: event.clientX, y: event.clientY, key: Date.now() });
      clearTimeout(timer);
      timer = setTimeout(() => setSpark(null), 650);
    };
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
      clearTimeout(timer);
    };
  }, []);
  return (
    spark && (
      <span
        key={spark.key}
        className="spark"
        style={{ left: spark.x, top: spark.y }}
        aria-hidden="true"
      >
        ✦
      </span>
    )
  );
}
function Welcome() {
  return (
    <main tabIndex={-1} className="welcome" id="main">
      <div className="stars" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 47 + 5) % 100}%`,
              top: `${(i * 31 + 2) % 92}%`,
              animationDelay: `${i % 7}s`,
            }}
          />
        ))}
      </div>
      <div className="welcome-copy">
        <p className="welcome-heading">
          Welcome
          <br />
          <span>to</span>
          <br />
          Massacre
          <br />
          Manor
        </p>
        <h1>ASSISTANT WANTED</h1>
        <p className="benefits">Discretion is essential. Excellent benefits.</p>
        <p className="job-copy">
          Notorious high-ranking Villain seeks loyal,
          <br />
          <span>level-headed assistant for unspecified office duties,</span>
          <br />
          <span>supporting staff for random mayhem, terror,</span>
          <br />
          <span>and other Dark things in General.</span>
        </p>
        <p className="eyebrow">RENNEDAWN · KINGDOM OF CHAOS AND DARK THINGS</p>
        <Link className="enter button" to="/home">
          Enter the realm
        </Link>
      </div>
      <div className="spires" aria-hidden="true" />
      <p className="entry-disclaimer">
        Unofficial fan project · Design by Trícia Linewberg
      </p>
    </main>
  );
}
const homeCards = [
  ["BOOKS", "The History", "/history", "stained-glass-trimmed", "gold"],
  [
    "WHO ARE THEY?",
    "Characters",
    "/characters",
    "ceiling-decor-trimmed",
    "purple",
  ],
  ["GAMES", "Quizzes", "/quizzes", "poison-potion-trimmed", "green"],
  [
    "HANNAH NICOLE MAEHRER",
    "The Author",
    "/history#author",
    "hr-clipboard-trimmed",
    "pale",
  ],
];
function Home() {
  return (
    <main tabIndex={-1} id="main" className="home stone">
      <section className="home-hero">
        <p className="eyebrow">MASSACRE MANOR — RENNEDAWN</p>
        <h1>You’re hired.</h1>
        <h2>Try not to die.</h2>
        <p>
          Welcome to the most chaotic workplace in the kingdom. Whether you’re
          here to sharpen your daggers, organize the dungeon scrolls, or simply
          avoid being the Master’s next “test subject,” you’ve arrived at the
          heart of the lair.
        </p>
      </section>
      <section className="home-grid" aria-label="Explore the manor">
        {homeCards.map(([label, title, url, img, color]) => (
          <Link className={`route-card ${color}`} key={title} to={url}>
            <span className="eyebrow">{label}</span>
            <h2>{title}</h2>
            <img src={asset(img)} alt="" />
          </Link>
        ))}
      </section>
      <blockquote className="evie-quote">
        <p>
          I’ve cut the boss’s destructive
          <br className="desktop-break" /> tirades down to two a week.
        </p>
        <cite>— EVIE SAGE</cite>
      </blockquote>
      <section className="hiring-callout">
        <div>
          <h2>Would you survive the hiring process?</h2>
          <p>
            The Villain is looking for fresh talent. Do you have what it takes
            to organize the chaos of Massacre Manor, or will you end up in the
            pits?
          </p>
          <Link className="button green-button" to="/quizzes/hiring">
            APPLY FOR THE POSITION　→
          </Link>
        </div>
        <div className="mini-file">
          <span>Quiz I</span>
          <h3>
            The Loyalty
            <br />
            Assessment
          </h3>
          <div />
          <small>CONTENT PREVIEW · 18 QUESTIONS PLANNED</small>
        </div>
      </section>
    </main>
  );
}
const books = [
  {
    title: "Assistant to the Villain",
    subtitle: "THE INSTANT #1 NEW YORK TIMES BESTSELLER",
    copy: "Once Upon a Time meets The Office in Hannah Maehrer’s laugh-out-loud viral TikTok series turned novel, about the sunshine assistant to an Evil Villain… and their unexpected romance.",
    color: "crimson",
  },
  {
    title: "Apprentice to the Villain",
    subtitle: "An Amazon Best Science Fiction & Fantasy Book of 2024",
    copy: "Evie Sage has never been happier to be the assistant to The Villain. Who would have thought that working for an outrageously handsome (shhh, bad for his brand) evil overlord could be so rewarding?",
    color: "purple",
  },
  {
    title: "Accomplice to the Villain",
    subtitle: "THE INSTANT #1 NEW YORK TIMES BESTSELLING SERIES",
    copy: "Evie Sage didn’t mean to become the right-hand woman to the kingdom’s most terrifying villain. One minute, she was applying for an entry-level position that promised “light paperwork and occasional beheadings,” and the next, she was knee-deep in magical mayhem.",
    color: "green",
  },
  {
    title: "Adversary to the Villain",
    subtitle: "THE INSTANT #1 NEW YORK TIMES BESTSELLING SERIES",
    copy: "Once Upon a Time meets The Office in the follow-up to the New York Times bestselling sensations Assistant to the Villain, Apprentice to the Villain, and Accomplice to the Villain by laugh-out-loud TikTok darling Hannah Nicole Maehrer.",
    color: "pink",
  },
];
function History() {
  return (
    <main tabIndex={-1} id="main" className="history">
      <section className="page-title">
        <h1>Get to know the story</h1>
        <p className="serif italic">
          One chaotic kingdom. Zero work-life balance.
        </p>
        <div className="divider" aria-hidden="true">
          ◆
        </div>
      </section>
      <section className="books" aria-label="The books">
        {books.map((book, i) => (
          <article className={`book-card ${book.color}`} key={book.title}>
            <div className="cover">
              <img src={asset(`book-${i + 1}`)} alt={`${book.title} cover`} />
            </div>
            <div className="book-info">
              <span className="book-label">
                BOOK {["I", "II", "III", "IV"][i]}
              </span>
              <h2>{book.title}</h2>
              <p className="book-subtitle">{book.subtitle}</p>
              <p>{book.copy}</p>
              <div className="book-bottom">
                <span>● SERIES LIBRARY</span>
                <a
                  href="https://www.hannahnicolemaehrer.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Author’s website　→
                </a>
              </div>
            </div>
          </article>
        ))}
        <article className="book-card crimson">
          <div className="unrevealed">
            <small>COVER TO BE REVEALED</small>
            <span>Book #5</span>
            <p>Coming soon</p>
          </div>
          <div className="book-info">
            <span className="book-label">BOOK V</span>
            <h2>Book #5</h2>
            <p className="book-subtitle">Coming soon</p>
            <p>
              More from Rennedawn. Cover, title, release date, and further
              details await confirmation.
            </p>
            <div className="book-bottom">
              <span>DETAILS TO COME</span>
            </div>
          </div>
        </article>
      </section>
      <section className="author" id="author">
        <img src={asset("author")} alt="Hannah Nicole Maehrer" />
        <div>
          <p className="eyebrow">THE AUTHOR</p>
          <h2>Hannah Nicole Maehrer</h2>
          <p>
            Hannah Nicole Maehrer—or as TikTok knows her, @hannahnicolemae—is a
            fantasy romance author and BookToker with a propensity for villains.
            When she’s not creating bookish comedy skits about Villains and
            Assistants, she’s writing to Taylor Swift songs. Her biggest
            passions in life include romance, magic, laughter, and finding ways
            to include them all in everything she creates.
          </p>
          <a
            className="button outline"
            href="https://www.hannahnicolemaehrer.com/"
            target="_blank"
            rel="noreferrer"
          >
            LEARN MORE　→
          </a>
        </div>
      </section>
    </main>
  );
}
const staff = [
  {
    name: "Evie Sage",
    role: "Executive Assistant",
    copy: "Optimistic, capable, and surprisingly efficient at managing chaos and…",
    badge: "ACTIVE EMPLOYEE",
    image: "evie-sage-complete",
  },
  {
    name: "Trystan Maverine",
    role: "The Villain · CEO of Chaos",
    copy: "Brooding, powerful, and deeply misunderstood. Not as evil as he…",
    badge: "IN CHARGE",
    image: "trystan-maverine-complete",
  },
  {
    name: "Becky Erring",
    role: "Head of HR",
    copy: "Knows all the secrets. Your termination will be literal if you miss…",
    badge: "WATCHING YOU",
    image: "becky-erring-complete",
  },
  {
    name: "Kingsley",
    role: "A very dignified frog",
    copy: "Personnel file awaiting approved copy.",
    badge: "FROG SIGHTED",
    image: "kingsley-1",
  },
];
function Characters() {
  const [active, setActive] = useState(0);
  const [mobile, setMobile] = useState(
    matchMedia("(max-width: 700px)").matches,
  );
  const start = useRef<number | null>(null);
  useEffect(() => {
    const media = matchMedia("(max-width: 700px)");
    const change = () => setMobile(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  const move = (delta: number) =>
    setActive((a) => (a + delta + staff.length) % staff.length);
  const visible = Array.from(
    { length: mobile ? 1 : 3 },
    (_, i) => staff[(active + i) % staff.length],
  );
  return (
    <main tabIndex={-1} id="main" className="characters">
      <section className="page-title">
        <p className="eyebrow">PERSONNEL FILES — MASSACRE MANOR</p>
        <h1>Meet the Staff</h1>
        <p className="serif italic">
          Villain’s Manor employees, allies, and one very dignified frog.
        </p>
        <p className="classified">
          All files classified by order of The Villain. Unauthorized access will
          be… addressed.
        </p>
      </section>
      <section
        className="carousel"
        aria-roledescription="carousel"
        aria-label="Staff personnel files"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onTouchStart={(e) => (start.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (start.current !== null) {
            const d = e.changedTouches[0].clientX - start.current;
            if (Math.abs(d) > 45) move(d < 0 ? 1 : -1);
            start.current = null;
          }
        }}
      >
        <div className="staff-grid">
          {visible.map((person) => (
            <article className="staff-card" key={person.name}>
              <img
                src={asset(person.image)}
                alt={`Portrait of ${person.name}`}
              />
              <h2>{person.name}</h2>
              <p className="role">{person.role}</p>
              <p>{person.copy}</p>
              <span className="badge">{person.badge}</span>
            </article>
          ))}
        </div>
        <div className="carousel-controls">
          <button aria-label="Previous character" onClick={() => move(-1)}>
            ←
          </button>
          <div className="dots">
            {staff.map((person, i) => (
              <button
                key={person.name}
                aria-label={`Show ${person.name}`}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button aria-label="Next character" onClick={() => move(1)}>
            →
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.map((p) => p.name).join(", ")}
        </p>
      </section>
      <div className="staff-note">
        <span aria-hidden="true">♧</span>
        <p>
          The Manor isn’t just a place of employment. It’s a sanctuary for the
          misunderstood, the
          <br className="desktop-break" /> cursed, and those who simply look
          better in black.
        </p>
      </div>
    </main>
  );
}
const invitations = [
  {
    title: quizTitle,
    copy: "A rigorous 50-point inspection of your survival instincts and coffee-making skills.",
    slug: "hiring",
  },
  {
    title: "Who would you be in Rennedawn?",
    copy: "Hero, sidekick, or the one who gets eaten in the first chapter?",
    slug: "rennedawn",
  },
  {
    title: "What power would you have?",
    copy: "Invisibility? Pyrokinesis? Or the ability to summon sentient paperwork?",
    slug: "power",
  },
  {
    title: "Are you more Evie or the Villain?",
    copy: "Do you solve problems with sunshine and logic, or brooding and ominous threats?",
    slug: "evie-or-villain",
  },
];
function Quizzes() {
  return (
    <main tabIndex={-1} id="main" className="quizzes stone">
      <section className="page-title">
        <h1>Discover Your Fate</h1>
        <p>
          Since the Villain is busy ‘planning’ (pacing and throwing things),
          Kingsley has volunteered to evaluate your worth. He wasn’t asked, but
          he’s already made the signs.
        </p>
      </section>
      <section className="invitations" aria-label="Choose a quiz">
        {invitations.map((q, i) => (
          <Link
            className={`invitation paper-${i + 1}`}
            to={`/quizzes/${q.slug}`}
            key={q.slug}
          >
            <img src={asset(`kingsley-${i + 1}`)} alt="" />
            <h2>{q.title}</h2>
            <p>{q.copy}</p>
            <span className="paper-link">
              {i === 0 ? "TAKE THE TEST" : "COMING SOON"}　→
            </span>
          </Link>
        ))}
      </section>
      <aside className="kingsley-note">
        “I hope you’re happy. My crown is slipping and I haven’t had a fly in
        twenty minutes. If you get ‘The Sidekick’ result, don’t come crying to
        me. – K”
      </aside>
    </main>
  );
}
function HiringIntro() {
  return (
    <main tabIndex={-1} id="main" className="hiring-intro forest">
      <section className="intro-card">
        <aside className="sticky">
          I was not consulted about the questions. – K 👑
        </aside>
        <small>18 questions · ~3 min</small>
        <h1>{quizTitle}</h1>
        <div className="divider" aria-hidden="true">
          ◆
        </div>
        <p className="serif italic intro-description">
          Massacre Manor is accepting applications… determine whether you are
          qualified, tolerable, or destined for the dungeons.
        </p>
        <div className="quiz-facts">
          <span>♧　18 QUESTIONS</span>
          <span>✓　NO WRONG ANSWERS*</span>
          <span>⚒　RESULTS ARE FINAL</span>
        </div>
        <p className="footnote">
          *THERE ARE WRONG ANSWERS. THE VILLAIN DISAGREES WITH SEVERAL.
        </p>
        <Link className="button crimson-button" to="/quizzes/hiring/assessment">
          I’m ready. Probably.
        </Link>
        <p className="content-notice">
          Work in progress: only Q07 is approved. The other questions and final
          scoring await review.
        </p>
        <Link className="text-link" to="/quizzes/hiring/assessment?question=7">
          Preview approved Q07 →
        </Link>
      </section>
    </main>
  );
}
function useQuiz() {
  const [state, setState] = useState<QuizState>(() => {
    try {
      return restoreState(sessionStorage.getItem("manor-quiz-v1"));
    } catch {
      return emptyState();
    }
  });
  useEffect(() => {
    try {
      sessionStorage.setItem("manor-quiz-v1", JSON.stringify(state));
    } catch {
      /* Storage may be unavailable; the session still works in memory. */
    }
  }, [state]);
  return [state, setState] as const;
}
function Assessment() {
  const [state, setState] = useQuiz();
  const location = useLocation();
  const navigate = useNavigate();
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (new URLSearchParams(location.search).get("question") === "7")
      setState((s) => ({ ...s, index: 6 }));
  }, [location.search, setState]);
  const q = questions[state.index];
  const value = state.answers[q.id];
  const percent = progress(state.answers);
  const change = (index: number) => {
    setState((s) => ({ ...s, index }));
    requestAnimationFrame(() => heading.current?.focus());
  };
  return (
    <main tabIndex={-1} id="main" className="assessment">
      <section className="assessment-progress">
        <h1>{quizTitle}</h1>
        <div>
          <p className="eyebrow">
            QUESTION {state.index + 1} OF 18 • ASSESSMENT PROTOCOL
          </p>
          <span>{percent.toFixed(1)}% answered</span>
        </div>
        <progress aria-label="Questions answered" max={100} value={percent} />
      </section>
      <p className="review-banner">
        CONTENT PREVIEW · Q07 approved · remaining questions and scoring
        awaiting review
      </p>
      <section className="question-card">
        <div className="question-heading">
          <strong>{q.id}</strong>
          <span>ASSESSMENT IN PROGRESS</span>
          <small>{value ? "Answer recorded" : "Evaluating…"}</small>
        </div>
        <div className="question-body">
          <h2 ref={heading} tabIndex={-1}>
            {q.prompt}
          </h2>
          {q.status === "approved" ? (
            <fieldset>
              <legend className="sr-only">Choose one answer</legend>
              {q.options.map((option) => (
                <label
                  key={option.id}
                  className={`answer ${value === option.id ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={option.id}
                    checked={value === option.id}
                    onChange={() =>
                      setState((s) => selectAnswer(s, q, option.id))
                    }
                  />
                  <span className="answer-letter">{option.id}</span>
                  <span>{option.text}</span>
                  <span className="answer-check" aria-hidden="true">
                    {value === option.id ? "●" : ""}
                  </span>
                </label>
              ))}
            </fieldset>
          ) : (
            <div className="pending-content">
              <p>
                This question and its four answers have not been supplied for
                approval.
              </p>
              <p>
                You can browse the 18-question structure. Unapproved questions
                cannot be answered or counted toward completion.
              </p>
              <button className="button outline" onClick={() => change(6)}>
                View approved question Q07 →
              </button>
            </div>
          )}
        </div>
        <div className="question-actions">
          <button
            className="previous"
            disabled={state.index === 0}
            onClick={() => change(state.index - 1)}
          >
            ← PREVIOUS
          </button>
          <span className="serif italic" aria-live="polite">
            {value ? "“Interesting choice. – K”" : ""}
          </span>
          <button
            className="button gold-button"
            disabled={q.status === "approved" && !value}
            onClick={() =>
              state.index === 17
                ? navigate("/quizzes/hiring/review")
                : change(state.index + 1)
            }
          >
            {state.index === 17
              ? "REVIEW FILE"
              : q.status === "pending"
                ? "NEXT FILE"
                : "NEXT QUESTION"}
            　→
          </button>
        </div>
      </section>
      <aside className="locked-result">
        <span aria-hidden="true">♙</span>
        <div>
          <h2>Your result is forming…</h2>
          <p>
            {canReveal(state.answers)
              ? "Your file is ready."
              : "Result locked. All 18 approved questions and final scoring are required."}
          </p>
        </div>
      </aside>
      <Link className="text-link review-link" to="/quizzes/hiring/review">
        Review saved answers
      </Link>
    </main>
  );
}
function Review() {
  const [state, setState] = useQuiz();
  const navigate = useNavigate();
  return (
    <main tabIndex={-1} id="main" className="review-page">
      <section className="intro-card">
        <p className="eyebrow">PERSONNEL FILE · CONTENT REVIEW</p>
        <h1>Assessment incomplete</h1>
        <p>
          No hiring outcome or score has been assigned. Seventeen questions and
          the final scoring rules await approval.
        </p>
        <p>{Object.keys(state.answers).length} of 18 questions answered.</p>
        <h2>Saved answers</h2>
        {state.answers.Q07 ? (
          <p>
            Q07 · {state.answers.Q07} —{" "}
            {questions[6].options.find((o) => o.id === state.answers.Q07)?.text}
          </p>
        ) : (
          <p>No answers recorded yet.</p>
        )}
        <button className="button gold-button" disabled>
          REVEAL MY FATE · LOCKED
        </button>
        <Link className="button outline" to="/quizzes/hiring/assessment">
          Return to assessment
        </Link>
        <button
          className="button crimson-button"
          onClick={() => {
            setState(emptyState());
            try {
              sessionStorage.removeItem("manor-quiz-v1");
            } catch {}
            navigate("/quizzes/hiring/assessment");
          }}
        >
          Restart assessment
        </button>
      </section>
    </main>
  );
}
function ComingSoon() {
  const { pathname } = useLocation();
  const q = invitations.find((x) => pathname.endsWith(x.slug));
  return (
    <main tabIndex={-1} id="main" className="review-page">
      <section className="intro-card">
        <p className="eyebrow">SEALED FILE · COMING SOON</p>
        <h1>{q?.title ?? "You’ve wandered into the wrong dungeon."}</h1>
        <p>
          {q
            ? "The invitation is ready. Questions, answers, and results are still awaiting approval."
            : "This file could not be found in the archive."}
        </p>
        <Link className="button" to="/quizzes">
          ← Return to quizzes
        </Link>
      </section>
    </main>
  );
}
function Credits() {
  return (
    <main tabIndex={-1} id="main" className="credits">
      <h1>Design & asset credits</h1>
      <p>Original UI design and concept: Trícia Linewberg.</p>
      <p>
        Unofficial fan project inspired by Hannah Nicole Maehrer’s Assistant to
        the Villain series. Not affiliated with or endorsed by the author,
        publisher, or rights holders.
      </p>
      <p>
        Illustrations and textures were supplied in the design repository.
        Kingsley illustrations, book covers, and the author portrait are
        provisional crops of the supplied references. Their original creators,
        permissions, and production exports still require confirmation. No
        replacement artwork has been generated.
      </p>
      <p>
        Cinzel and Inter are bundled through Fontsource under the SIL Open Font
        License. Book descriptions use short excerpts of the supplied design
        copy; release and purchase availability are not asserted.
      </p>
      <Link to="/home">← Return to the manor</Link>
    </main>
  );
}
function App() {
  const location = useLocation();
  const entry = location.pathname === "/";
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <RouteEffects />
      <Magic />
      {!entry && <Header />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/hiring" element={<HiringIntro />} />
        <Route path="/quizzes/hiring/assessment" element={<Assessment />} />
        <Route path="/quizzes/hiring/review" element={<Review />} />
        <Route path="/quizzes/:slug" element={<ComingSoon />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
      {!entry && <Footer />}
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
