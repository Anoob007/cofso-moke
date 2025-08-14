"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CONTAINER } from "../utils/ui";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import PortfolioSection from "./PortfolioSection";
import { Star, Bookmark, CheckCheck } from "lucide-react";
/**
 * Responsive hardening notes:
 * - Give the top banner a base height on XS to avoid negative margin overlap.
 * - Use minmax(0, ...) in CSS grid to prevent intrinsic size overflow.
 * - Ensure every potentially truncating child has min-w-0 on the flex/grid parent.
 * - Disable hover tilt on touch devices to avoid jank (pointer: coarse)
 * - Keep scrollable social-strip within padding using -mx-* & px-* safely.
 * - Add text wrapping safeguards (break-words) where user data may be long.
 */

type TabKey = "about" | "experience" | "education" | "feedback";

export default function ProfileBannerAligned() {
  const [tab, setTab] = useState<TabKey>("about");
  const cardRef = useRef<HTMLDivElement>(null);

  // palette (solid only) — your custom colors
  const blue = "#124C98";
  const green = "#059669";
  const accent = blue;

  const skills = [
    "Brand Design",
    "UI Design",
    "Figma",
    "Adobe After Effects",
    "Sketch",
    "Pen & Paper",
  ];

  const portfolioLinks = [
    { label: "Dribbble", abbr: "Dr", href: "#" },
    { label: "Behance", abbr: "Be", href: "#" },
    { label: "Upwork", abbr: "Up", href: "#" },
    { label: "LinkedIn", abbr: "in", href: "#" },
  ];

  const verifications = [
    { label: "Facebook Connected", ok: true },
    { label: "LinkedIn Connected", ok: true },
    { label: "Twitter Connected", ok: true },
    { label: "Phone Verified", ok: false, action: "Get Verified" },
    { label: "Email Verified", ok: true },
    { label: "Identity Verified", ok: true },
  ];

  const proficiency = [
    { label: "Design", pct: 90 },
    { label: "Brand Design", pct: 80 },
    { label: "UI Design", pct: 95 },
    { label: "Adobe After Effects", pct: 50 },
    { label: "Figma", pct: 50 },
    { label: "Pen & paper", pct: 30 },
  ];

  const feedback = [
    {
      from: "Priya Menon · PM, Google",
      rating: 5,
      date: "2024-11-12",
      text:
        "Jenny owns outcomes. The onboarding overhaul hit metrics in week 2 and the docs were spotless.",
    },
    {
      from: "Arun S · Eng Manager, Apple",
      rating: 4,
      date: "2023-08-03",
      text:
        "Great partner to engineering; specs are pragmatic. Would love even earlier involvement in discovery.",
    },
    {
      from: "Maya K · Design Director",
      rating: 5,
      date: "2022-02-19",
      text:
        "Strong systems thinking; turned a messy component library into a scalable kit.",
    },
  ];

  const education = [
    {
      school: "Harvard University",
      degree: "M.Des — Interaction Design",
      location: "Cambridge, MA",
      period: "2015 – 2017",
      details: [
        "Thesis: Designing calm onboarding flows for fintech",
        "GPA 3.8/4.0, Teaching Assistant (Design Systems)",
      ],
    },
    {
      school: "NIT Calicut",
      degree: "B.Tech — Computer Science",
      location: "Kozhikode, India",
      period: "2011 – 2015",
      details: [
        "Design Club Lead",
        "Winner — UX India Student Challenge",
      ],
    },
  ];

  // anim helpers
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };
  const listStagger = {
    animate: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };
  const item = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  // animated number for "Jobs Done"
  const jobsMv = useMotionValue(0);
  const [jobs] = useState(247);
  const [jobsDisplay, setJobsDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(jobsMv, jobs, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setJobsDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [jobs, jobsMv]);

  // Disable hover tilt on touch/coarse pointers
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const m = window.matchMedia("(hover: hover) and (pointer: fine)");
      const update = () => setCanHover(m.matches);
      update();
      m.addEventListener?.("change", update);
      return () => m.removeEventListener?.("change", update);
    }
  }, []);

  return (
    <section className={CONTAINER}>
      {/* neutral banner space — ensure base height on XS */}
      <div className="relative overflow-hidden rounded-[28px] h-16 sm:h-20 md:h-24" />

      {/* profile card */}
      <motion.div
        ref={cardRef}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        whileHover={canHover ? { rotateX: 0.25, rotateY: -0.25 } : undefined}
        className="relative z-10 -mt-8 sm:-mt-10 md:-mt-14 rounded-[22px] border border-zinc-200 bg-white p-4 sm:p-5 md:p-6 shadow-[0_20px_60px_-28px_rgba(2,6,23,0.25)]"
      >
        <div className="grid gap-5 sm:gap-6 md:[grid-template-columns:minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] md:items-start min-w-0">
          {/* left identity */}
          <motion.div
            className="flex gap-3 sm:gap-4 min-w-0"
            variants={listStagger}
            animate="animate"
          >
            <motion.div
              className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-zinc-100 shadow"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/assets/images/profile.webp"
                alt="Profile photo"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span
                className="pointer-events-none absolute -inset-[3px] rounded-2xl ring-2"
                style={{ boxShadow: "inset 0 0 0 0 rgba(0,0,0,0)", borderColor: `${green}66` }}
              />
            </motion.div>

            <motion.div variants={item} className="min-w-0 max-w-full">
              <h2 className="truncate text-base sm:text-lg md:text-xl font-semibold text-zinc-900 break-words">
                David Smith
              </h2>
              <p className="mt-0.5 flex flex-wrap items-center gap-1 text-xs sm:text-sm text-zinc-600 truncate">
                Developer <span className="text-zinc-400">@</span>
                <GoogleGlyph />
                Google
              </p>

              {/* skills row */}
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[12px] text-zinc-700 break-words"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs sm:text-sm text-zinc-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M12 2a7 7 0 0 0-7 7c0 4.28 7 13 7 13s7-8.72 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
                  />
                </svg>
                <span className="truncate">India, Bangalore</span>
              </div>
            </motion.div>
          </motion.div>

          {/* right ctas */}
       <motion.div
  className="hidden md:flex md:flex-col md:items-end md:gap-2 min-w-0"
  variants={listStagger}
  animate="animate"
>
  <motion.div variants={item} className="w-[230px]">
    <PrimaryCTA href="#" color={blue}>
      Send Job Invitation
    </PrimaryCTA>
  </motion.div>

  <motion.div variants={item} className="w-[230px]">
    <SecondaryCTA href="#" color={green}>
      Contact Me
    </SecondaryCTA>
  </motion.div>
</motion.div>

        </div>

        {/* socials + summary — scrollable, hidden scrollbar, snap */}
        <div className="mt-4 pl-0 sm:pl-5">
          <p className="mb-2 text-xs font-semibold text-zinc-600">Social Profiles</p>

          <motion.div
            variants={listStagger}
            animate="animate"
            aria-label="Social profiles and summary"
            className="strip flex items-center gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden py-1 snap-x snap-mandatory -mx-1 px-1 w-full whitespace-nowrap scroll-p-3 sm:scroll-p-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {[
              { name: "X", color: "#000000", svg: XIcon() },
              { name: "LinkedIn", color: "#0A66C2", svg: LinkedInIcon() },
              { name: "Dribbble", color: "#EA4C89", svg: DribbbleIcon() },
              { name: "GitHub", color: "#181717", svg: GitHubIcon() },
            ].map((s) => (
              <motion.span
                key={s.name}
                whileHover={canHover ? { y: -2, rotate: -1 } : undefined}
                className="group relative inline-flex h-10 w-10 shrink-0 snap-start items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm"
                title={s.name}
              >
                <span className="h-5 w-5" style={{ color: s.color }} aria-hidden>
                  {s.svg}
                </span>
                {/* tooltip hidden on xs to avoid layout jump */}
                <span className="hidden sm:block pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-700 opacity-0 shadow group-hover:opacity-100 transition">
                  {s.name}
                </span>
              </motion.span>
            ))}

            {/* divider */}
            <span className="h-10 w-px bg-zinc-200 shrink-0 snap-start" />

            {/* Rating */}
            <div className="flex items-center gap-2 shrink-0 snap-start">
             <IconBubble gradientFrom={green} gradientTo="#22c55e" icon={<Star size={16} className="text-white" />} />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-zinc-500">Rating</span>
                <span className="flex items-center gap-1">
                  <BouncyStars value={5} />
                  <span className="text-[13px] font-semibold text-zinc-800">4.9</span>
                </span>
              </div>
            </div>

            <span className="h-10 w-px bg-zinc-200 shrink-0 snap-start" />

            {/* Bookmarks */}
            <div className="flex items-center gap-2 shrink-0 snap-start">
            <IconBubble gradientFrom={blue} gradientTo="#60a5fa" icon={<Bookmark size={16} className="text-white" />} />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-zinc-500">Bookmarks</span>
                <span className="text-[13px] font-semibold text-zinc-800 whitespace-nowrap">18</span>
              </div>
            </div>

            <span className="h-10 w-px bg-zinc-200 shrink-0 snap-start" />

            {/* Jobs Done */}
            <div className="flex items-center gap-2 shrink-0 snap-start pr-2">
              <IconBubble gradientFrom={green} gradientTo="#22c55e" icon={<CheckCheck size={16} className="text-white" />} />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-zinc-500">Jobs</span>
                <span className="flex items-center gap-1">
                  <span className="text-[13px] font-semibold text-zinc-800 tabular-nums whitespace-nowrap">{jobsDisplay}</span>
                  <Sparkline data={[10, 14, 13, 15, 18, 22, 20, 25]} stroke={blue} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* mobile ctas */}
        <div className="mt-4 md:hidden space-y-3">
          <PrimaryCTA href="#" color={blue}>
            Send Job Invitation
          </PrimaryCTA>
          <SecondaryCTA href="#" color={green}>Contact Me</SecondaryCTA>
        </div>
      </motion.div>

      {/* ===== grid ===== */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* sidebar */}
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-24 self-start min-w-0">
          <motion.div
  variants={fadeUp}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true }}
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.3 }}
  className="relative overflow-hidden rounded-[22px] border border-zinc-200 bg-white p-5 shadow-sm"
>
  {/* Decorative background circle */}
  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-blue-100 opacity-20" />

  {/* Content */}
  <p
    className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1"
    style={{ color: blue }}
  >
     Estimated Monthly
  </p>

  <p
    className="mt-1 text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"
  >
    ~ $14k
  </p>

  <p className="mt-1 text-[12px]" style={{ color: `${blue}CC` }}>
    based on 40h/week
  </p>
</motion.div>


          <motion.div
            className="rounded-[22px] border border-zinc-200 bg-white p-5"
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-zinc-900">Portfolio Links</h3>
            <div className="mt-4 flex items-center gap-3 sm:gap-4">
              {portfolioLinks.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm text-sm font-semibold hover:-translate-y-0.5 transition"
                  aria-label={p.label}
                  title={p.label}
                >
                  {p.abbr}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-[22px] border border-zinc-200 bg-white p-5"
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-zinc-900">Verifications</h3>
            <ul className="mt-3 space-y-3">
              {verifications.map((v) => (
                <li key={v.label} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700 break-words">{v.label}</span>
                  <span className="inline-flex items-center gap-2">
                    {v.action ? (
                      <Link
                        href="#"
                        className="text-xs font-medium text-zinc-700 rounded-lg border border-zinc-200 px-2.5 py-1 hover:bg-zinc-50"
                      >
                        {v.action}
                      </Link>
                    ) : null}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 ${v.ok ? "text-emerald-600" : "text-zinc-300"}`}
                      aria-hidden
                    >
                      <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-[22px] border border-zinc-200 bg-white p-5"
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-zinc-900">Proficiency</h3>
            <div className="mt-4 space-y-4">
              {proficiency.map((p) => (
                <div key={p.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-zinc-700">{p.label}</span>
                    <span className="text-xs text-zinc-500">{p.pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ background: green }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </aside>

        {/* main */}
        <main className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6 min-w-0">
          <div className="rounded-[22px] border border-zinc-200 bg-white">
            <div
              role="tablist"
              aria-label="Profile tabs"
              className="relative flex gap-4 sm:gap-6 border-b border-zinc-200 px-3 sm:px-4 md:px-5 overflow-x-auto md:overflow-x-visible whitespace-nowrap scroll-p-3 sm:scroll-p-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <AnimatePresence initial={false}>
                {(["about", "experience", "education", "feedback"] as TabKey[]).map((key) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={tab === key}
                    aria-controls={`panel-${key}`}
                    onClick={() => setTab(key)}
                    className={`relative -mb-px whitespace-nowrap px-1.5 sm:px-2 py-3 text-sm ${
                      tab === key ? "font-semibold text-zinc-900" : "text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    {key === "about" && "About Me"}
                    {key === "experience" && "Work Experience"}
                    {key === "education" && "Education"}
                    {key === "feedback" && "Feedback"}
                    {tab === key && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute left-0 right-0 -bottom-px h-0.5"
                        style={{ background: accent }}
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </button>
                ))}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {tab === "about" && (
                <motion.div
                  key="panel-about"
                  id="panel-about"
                  role="tabpanel"
                  className="p-4 sm:p-5 md:p-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <section>
                    <h4 className="text-sm font-semibold text-zinc-900">About Me</h4>
                    <p className="mt-1 text-sm text-zinc-700">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                      <li>Strong command of Photoshop, Illustrator and Web design.</li>
                      <li>Provide services aligned to client needs.</li>
                      <li>Work independently and as a team member.</li>
                      <li>Perform well under pressure.</li>
                      <li>Dependable, highly‑organized, self‑motivated and responsible.</li>
                    </ul>
                  </section>

                  <motion.div
                    className="mt-4 rounded-[22px] border border-emerald-200 bg-white p-5"
                    variants={fadeUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[12px]">
                        ✦
                      </span>
                      <h3 className="text-sm font-semibold" style={{ color: green }}>
                        AI Review Highlights
                      </h3>
                    </div>
                    <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700 space-y-1">
                      <li>Consistently high UX handoff quality.</li>
                      <li>Onboarding flows improve activation by 12–18%.</li>
                      <li>Strong collaborator with engineering.</li>
                    </ul>
                  </motion.div>

                  <PortfolioSection />
                </motion.div>
              )}

              {tab === "experience" && (
                <motion.div
                  key="panel-experience"
                  id="panel-experience"
                  role="tabpanel"
                  className="p-4 sm:p-5 md:p-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <h4 className="text-sm font-semibold text-zinc-900">Work Experience</h4>
                  <p className="mt-1 text-sm text-zinc-600">A timeline of roles with scope, impact, and key outcomes.</p>
                  <motion.div
                    className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={listStagger}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <ExperienceItem role="Freelance Art Director" company="Google" when="April 2017 – Present (7 Months)" logo="G" />
                    <ExperienceItem role="Design Lead" company="Apple Corporation" when="April 2017 – Present (7 Months)" logo="🧩" />
                    <ExperienceItem role="UX Designer" company="Apple Corporation" when="April 2017 – Present (7 Months)" logo="🦊" />
                    <ExperienceItem role="Design Ops" company="Urbana" when="2016 – 2017" logo="🔷" />
                  </motion.div>
                </motion.div>
              )}

              {tab === "education" && (
                <motion.div
                  key="panel-education"
                  id="panel-education"
                  role="tabpanel"
                  className="p-4 sm:p-5 md:p-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <h4 className="text-sm font-semibold text-zinc-900">Education</h4>
                  <div className="mt-3 space-y-4">
                    {education.map((e, i) => (
                      <EducationItem key={i} {...e} />
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === "feedback" && (
                <motion.div
                  key="panel-feedback"
                  id="panel-feedback"
                  role="tabpanel"
                  className="p-4 sm:p-5 md:p-6 space-y-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <section>
                    <h4 className="text-sm font-semibold text-zinc-900">Feedback</h4>
                    <ul className="mt-3 space-y-3">
                      {feedback.map((f, i) => (
                        <FeedbackItem key={i} {...f} />
                      ))}
                    </ul>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Hide scrollbar for the socials strip only */}
      <style jsx>{`
        .strip { -ms-overflow-style: none; scrollbar-width: none; }
        .strip::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </section>
  );
}

/* ---------- Small UI atoms ---------- */

function IconBubble({
  gradientFrom,
  gradientTo,
  icon,
}: {
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.span
      className="relative flex h-7 w-7 items-center justify-center rounded-full text-white shadow-sm"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
      whileHover={{ rotate: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      {/* inner shine */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(80% 80% at 30% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)",
        }}
      />
      <span className="relative z-10">{icon}</span>
    </motion.span>
  );
}


function BouncyStars({ value = 0 }: { value: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i <= value ? "text-emerald-500" : "text-zinc-300"}`}
          whileHover={{ scale: 1.15 }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z"
          />
        </motion.svg>
      ))}
    </div>
  );
}

function Sparkline({ data, stroke = "#124C98" }: { data: number[]; stroke?: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const norm = (v: number) => 20 - ((v - min) / Math.max(1, max - min)) * 18 - 1;
  const step = 60 / Math.max(1, data.length - 1);
  const d = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${norm(v)}`)
    .join(" ");
  return (
    <svg viewBox="0 0 60 20" width="40" height="14" className="opacity-80" aria-hidden>
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="60" cy={norm(data[data.length - 1])} r="2" fill={stroke} />
    </svg>
  );
}



/* ---------- Existing sub-components (kept) ---------- */

function ExperienceItem({
  role,
  company,
  when,
  logo,
}: {
  role: string;
  company: string;
  when: string;
  logo: string;
}) {
  return (
    <motion.div
      variants={{ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="rounded-xl border border-zinc-200 bg-white p-4"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-lg shrink-0">
          {logo === "G" ? <GoogleGlyph /> : <p>{logo}</p>}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900 truncate">{role}</p>
          <p className="text-sm text-zinc-700 truncate">{company}</p>
          <p className="text-xs text-zinc-500">{when}</p>
        </div>
      </div>
    </motion.div>
  );
}

function EducationItem({
  school,
  degree,
  location,
  period,
  details,
}: {
  school: string;
  degree: string;
  location: string;
  period: string;
  details: string[];
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900 truncate">{school}</p>
          <p className="text-sm text-zinc-700 truncate">{degree}</p>
          <p className="text-xs text-zinc-500 truncate">{location}</p>
        </div>
        <span className="text-xs text-zinc-500 shrink-0">{period}</span>
      </div>
      {details?.length ? (
        <ul className="mt-3 list-disc pl-4 text-sm text-zinc-700 space-y-1">
          {details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FeedbackItem({
  from,
  rating,
  date,
  text,
}: {
  from: string;
  rating: number;
  date: string;
  text: string;
}) {
  return (
    <li className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-zinc-900 break-words">{from}</p>
        <div className="flex items-center gap-2">
          <BouncyStars value={rating} />
          <span className="text-xs text-zinc-500">{date}</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-zinc-700">{text}</p>
    </li>
  );
}

/* CTAs — solid */
function PrimaryCTA({
  href,
  children,
  color,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex w-full h-10 items-center justify-center rounded-xl px-6
                  text-sm font-bold text-white shadow-sm transition hover:opacity-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </Link>
  );
}

function SecondaryCTA({
  href,
  children,
  color,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex w-full h-10 items-center justify-center rounded-xl px-6
                  text-sm font-bold text-white shadow-sm transition hover:opacity-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </Link>
  );
}


/* Icons */
function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.8h5.4c-.24 1.26-.97 2.33-2.07 3.04l3.35 2.6C20.37 18.3 21.2 16.3 21.2 14c0-.78-.07-1.34-.2-1.8H12Z" />
      <path fill="#34A853" d="M6.65 14.32a6.97 6.97 0 0 0 0-4.64L3.3 7.08a11.5 11.5 0 0 0 0 9.84l3.35-2.6Z" />
      <path fill="#4A90E2" d="M12 22c2.97 0 5.46-.98 7.28-2.66l-3.35-2.6c-.93.6-2.12.96-3.93.96-3.01 0-5.57-2.03-6.45-4.78l-3.5 2.7C3.9 19.67 7.62 22 12 22Z" />
      <path fill="#FBBC05" d="M12 2C7.62 2 3.9 4.33 1.95 7.38l3.5 2.7C6.33 7.33 8.99 5.3 12 5.3c1.64 0 3.12.56 4.28 1.64l3.2-3.2C17.46 2.66 14.97 2 12 2Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M17.21 3H20.21L14.42 9.93L21.35 21H15.93L11.56 14.57L6.56 21H3.56L9.73 13.57L3.1 3H8.65L12.64 8.82L17.21 3ZM16.45 19H17.93L7.57 5H6.01L16.45 19Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.5 17V10.5H6V17H8.5M7.25 9.28A1.28 1.28 0 1 0 7.25 6.72A1.28 1.28 0 0 0 7.25 9.28M18 17V13.21C18 11.24 16.43 10.5 15.03 10.5C14.14 10.5 13.36 10.96 13 11.58H12.96V10.5H10.5V17H13V13.5C13 12.84 13.5 12.5 14.1 12.5C14.68 12.5 15 12.88 15 13.5V17H18Z" />
    </svg>
  );
}
function DribbbleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17.89,6.26C19.18,7.65 20,9.71 20,12C20,12.17 20,12.34 19.97,12.5C18.84,12.23 17.23,12 15.5,12C14.9,12 14.3,12.03 13.72,12.09C13.57,11.75 13.41,11.41 13.24,11.07C14.96,10.35 16.54,8.89 17.89,6.26M12,4C13.54,4 15,4.5 16.24,5.34C15.09,7.57 13.61,9.14 11.93,9.84C11.17,8.44 10.33,7.08 9.37,5.78C10.16,4.66 11.05,4 12,4M7.5,5.78C8.43,7.03 9.3,8.39 10.1,9.84C7.93,10.42 5.85,11.5 4.26,13.18C3.47,12.13 3,10.83 3,9.41C3,8.05 3.5,6.79 4.26,5.78M4.08,14.31C5.59,12.63 7.77,11.44 10.21,10.94C10.41,11.31 10.6,11.69 10.78,12.07C9.29,12.55 7.81,13.3 6.45,14.5C5.38,15.41 4.49,16.4 3.93,17.5C3.45,16.47 3.18,15.42 3.18,14.31M6.71,18.47C7.24,17.28 8.05,16.27 9.1,15.58C10.31,16.66 11.7,17.88 13.23,19.09C12.53,19.34 11.78,19.5 11,19.5C9.39,19.5 7.89,19.12 6.71,18.47M14.88,18.75C13.42,17.61 12.15,16.55 11.05,15.56C11.74,15.11 12.5,14.73 13.31,14.43C13.5,14.91 13.69,15.4 13.88,15.89C14.05,16.47 14.33,17.1 14.58,17.71C14.68,17.74 14.78,17.75 14.88,17.75M16.59,17.09C16.28,16.18 15.93,15.26 15.54,14.35C16.92,14.43 18.21,14.68 19.8,15C19.38,15.93 18.05,16.64 16.59,17.09Z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21V19.07C6.73,19.68 6.14,17.92 6.14,17.92C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.4 8.97,17.96 9.54,17.73C9.63,17.08 9.89,16.65 10.17,16.42C7.95,16.19 5.62,15.27 5.62,11.44C5.62,10.39 6,9.55 6.66,8.85C6.55,8.62 6.17,7.39 6.75,5.76C6.75,5.76 7.67,5.5 9.5,6.85C10.37,6.61 11.3,6.5 12.22,6.5C13.14,6.5 14.07,6.61 14.94,6.85C16.77,5.5 17.69,5.76 17.69,5.76C18.27,7.39 17.89,8.62 17.78,8.85C18.44,9.55 18.82,10.39 18.82,11.44C18.82,15.28 16.5,16.19 14.27,16.41C14.64,16.73 15,17.39 15,18.42V21C15,21.27 15.16,21.59 15.67,21.5C19.63,20.17 22.5,16.42 22.5,12A10,10 0 0,0 12,2Z" />
    </svg>
  );
}
