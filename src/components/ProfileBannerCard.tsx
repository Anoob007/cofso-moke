"use client";

import Link from "next/link";
import { useState, useMemo, useRef } from "react";
import { CONTAINER } from "../utils/ui";
import { motion, AnimatePresence } from "framer-motion";

import PortfolioSection from "./PortfolioSection";

type TabKey = "background" | "recommendations" | "following";

export default function ProfileBannerAligned() {
  const [tab, setTab] = useState<TabKey>("background");
  const cardRef = useRef<HTMLDivElement>(null);

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

  const portfolioImgs = [
    "/assets/images/portfolio-1.jpg",
    "/assets/images/portfolio-2.jpg",
    "/assets/images/portfolio-3.jpg",
    "/assets/images/portfolio-4.jpg",
    "/assets/images/portfolio-5.jpg",
    "/assets/images/portfolio-6.jpg",
    "/assets/images/portfolio-7.webp",
    "/assets/images/portfolio-8.webp",
    "/assets/images/portfolio-9.png",
    "/assets/images/portfolio-10.png",
    "/assets/images/portfolio-11.webp",
    "/assets/images/portfolio-12.webp",
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
      details: ["Design Club Lead", "Winner — UX India Student Challenge"],
    },
  ];

  // Variants
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

  const portfolioItem = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const activeColor = "#e61d88ff"; // brand accent

  return (
    <section className={CONTAINER}>
      {/* Banner with gentle parallax & scale */}
      <motion.div
        className="group relative mt-6 overflow-hidden rounded-[28px] h-25 sm:h-38 md:h-36 lg:h-35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.img
          src="/assets/images/bg.png"
          alt="Banner"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
        />
        {/* light gradient overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </motion.div>

      {/* Profile card */}
      <motion.div
        ref={cardRef}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="relative z-10 -mt-8 sm:-mt-10 md:-mt-14 rounded-[22px] border border-zinc-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-[0_30px_80px_-30px_rgba(2,6,23,0.25)]"
      >
        <div className="grid gap-5 sm:gap-6 md:grid-cols-[auto_1fr_auto] md:items-start">
          {/* Left */}
          <motion.div className="flex gap-3 sm:gap-4" variants={listStagger} animate="animate">
            <motion.div
              className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-amber-100 shadow"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/assets/images/profile.webp"
                alt="Profile photo"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div variants={item}>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-900">David Smith</h2>
              <p className="mt-0.5 flex flex-wrap items-center gap-1 text-xs sm:text-sm text-zinc-600">
                Developer <span className="text-zinc-400">@</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path fill="#EA4335" d="M12 10.2v3.8h5.4c-.24 1.26-.97 2.33-2.07 3.04l3.35 2.6C20.37 18.3 21.2 16.3 21.2 14c0-.78-.07-1.34-.2-1.8H12Z"/>
                  <path fill="#34A853" d="M6.65 14.32a6.97 6.97 0 0 0 0-4.64L3.3 7.08a11.5 11.5 0 0 0 0 9.84l3.35-2.6Z"/>
                  <path fill="#4A90E2" d="M12 22c2.97 0 5.46-.98 7.28-2.66l-3.35-2.6c-.93.6-2.12.96-3.93.96-3.01 0-5.57-2.03-6.45-4.78l-3.5 2.7C3.9 19.67 7.62 22 12 22Z"/>
                  <path fill="#FBBC05" d="M12 2C7.62 2 3.9 4.33 1.95 7.38l3.5 2.7C6.33 7.33 8.99 5.3 12 5.3c1.64 0 3.12.56 4.28 1.64l3.2-3.2C17.46 2.66 14.97 2 12 2Z"/>
                </svg>
                Google
              </p>
              <div className="mt-2 sm:mt-3 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 4.28 7 13 7 13s7-8.72 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>
                India, Bangalore
              </div>
            </motion.div>
          </motion.div>

          {/* Middle quick cards */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={listStagger} animate="animate">
            <motion.div className="rounded-xl border border-zinc-200 bg-white/60 p-3 sm:p-4" variants={item}>
              <h4 className="text-xs sm:text-sm font-semibold" style={{ color: activeColor }}>Work</h4>
              <p className="mt-1 text-sm text-zinc-700">Google inc</p>
              <p className="text-sm text-zinc-700">Bangalore, India</p>
            </motion.div>
            <motion.div className="rounded-xl border border-zinc-200 bg-white/60 p-3 sm:p-4" variants={item}>
              <h4 className="text-xs sm:text-sm font-semibold" style={{ color: "#8029F3" }}>Education</h4>
              <p className="mt-1 text-sm text-zinc-700">Harvard University</p>
              <p className="text-sm text-zinc-700">Bangalore, India</p>
            </motion.div>
          </motion.div>

          {/* Right CTA (desktop) */}
          <motion.div className="hidden md:flex md:flex-col md:items-end md:gap-2" variants={listStagger} animate="animate">
            <motion.div variants={item}>
              <PrimaryCTA href="#">Send Job Invitation</PrimaryCTA>
            </motion.div>
            <motion.div variants={item}>
              <SecondaryCTA href="#">Contact Me</SecondaryCTA>
            </motion.div>
          </motion.div>
        </div>

        {/* Socials row */}
        <motion.div className="mt-4 flex gap-3 sm:gap-4 pl-0 sm:pl-5" variants={listStagger} animate="animate">
          {[
            { name: "X", color: "#000000", svg: XIcon() },
            { name: "LinkedIn", color: "#0A66C2", svg: LinkedInIcon() },
            { name: "Dribbble", color: "#EA4C89", svg: DribbbleIcon() },
            { name: "GitHub", color: "#181717", svg: GitHubIcon() },
          ].map((s) => (
            <motion.span
              key={s.name}
              whileHover={{ y: -2 }}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm"
            >
              <span className="h-5 w-5" style={{ color: s.color }}>{s.svg}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* Mobile CTAs */}
        <div className="mt-4 md:hidden space-y-3">
          <PrimaryCTA href="#">Send Job Invitation</PrimaryCTA>
          <SecondaryCTA href="#">Contact Me</SecondaryCTA>
        </div>
      </motion.div>

      {/* ===== Main responsive grid ===== */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-24 self-start">
          {/* Rate */}
        {/* Rate – Flip Card */}
<motion.div
  variants={fadeUp}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true }}
  className="group [perspective:1200px]"
>
  <div className="relative h-[110px] w-full rounded-[22px]">
    <div className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      {/* front */}
      <div className="absolute inset-0 rounded-[22px] border border-rose-200 bg-gradient-to-br from-rose-50 to-fuchsia-50 p-5 shadow-sm">
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-500">Estimated Monthly</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">~ $14k</p>
          <p className="mt-1 text-[12px] text-rose-500/80">based on 40h/week</p>
        </div>
      </div>
      {/* back */}
      <div className="absolute inset-0 rounded-[22px] border border-rose-200 bg-gradient-to-br from-rose-50 to-fuchsia-50 p-5 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-500">Estimated Monthly</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">~ $14k</p>
          <p className="mt-1 text-[12px] text-rose-500/80">based on 40h/week</p>
        </div>
      </div>
    </div>
  </div>
</motion.div>


          {/* Skills */}
          <motion.div className="rounded-[22px] border border-zinc-200 bg-white p-5" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h3 className="text-sm font-semibold text-zinc-900">Skills</h3>
            <motion.div className="mt-3 flex flex-wrap gap-2" variants={listStagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
              {skills.map((s) => (
                <motion.span key={s} variants={item} className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[13px] text-zinc-700">
                  {s}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Portfolio Links */}
          <motion.div className="rounded-[22px] border border-zinc-200 bg-white p-5" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h3 className="text-sm font-semibold text-zinc-900">Portfolio Links</h3>
            <div className="mt-4 flex items-center gap-3 sm:gap-4">
              {portfolioLinks.map((p) => (
                <Link key={p.label} href={p.href} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm text-sm font-semibold hover:-translate-y-0.5 transition" aria-label={p.label} title={p.label}>
                  {p.abbr}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Verifications */}
          <motion.div className="rounded-[22px] border border-zinc-200 bg-white p-5" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h3 className="text-sm font-semibold text-zinc-900">Verifications</h3>
            <ul className="mt-3 space-y-3">
              {verifications.map((v) => (
                <li key={v.label} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700">{v.label}</span>
                  <span className="inline-flex items-center gap-2">
                    {v.action ? (
                      <Link href="#" className="text-xs font-medium text-zinc-700 rounded-lg border border-zinc-200 px-2.5 py-1 hover:bg-zinc-50">
                        {v.action}
                      </Link>
                    ) : null}
                    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${v.ok ? "text-emerald-600" : "text-zinc-300"}`} aria-hidden>
                      <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Proficiency with animated bars */}
          <motion.div className="rounded-[22px] border border-zinc-200 bg-white p-5" variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
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
                      style={{ background: "linear-gradient(90deg,#111827,#e61d88)" }}
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

        {/* Main */}
        <main className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Tabs */}
          <div className="rounded-[22px] border border-zinc-200 bg-white">
            <div role="tablist" aria-label="Profile tabs" className="relative flex gap-4 sm:gap-6 border-b border-zinc-200 px-3 sm:px-4 md:px-5">
              {/* Animated pill underline */}
              <AnimatePresence initial={false}>
                {(["background","recommendations","following"] as TabKey[]).map((key) => (
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
                    {key === "background" && "Background"}
                    {key === "recommendations" && "Education"}
                    {key === "following" && "Work Feedback"}
                    {tab === key && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute left-0 right-0 -bottom-px h-0.5"
                        style={{ background: `linear-gradient(90deg, ${activeColor}, #8029F3)` }}
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </button>
                ))}
              </AnimatePresence>
            </div>

            {/* Panels */}
            <AnimatePresence mode="wait">
              {tab === "background" && (
                <motion.div
                  key="panel-background"
                  id="panel-background"
                  role="tabpanel"
                  className="p-4 sm:p-5 md:p-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* About */}
                  <section>
                    <h4 className="text-sm font-semibold text-zinc-900">About Me</h4>
                    <p className="mt-1 text-sm text-zinc-700">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                      <li>Strong command of Photoshop, Illustrator and Web design.</li>
                      <li>Provide services aligned to client needs.</li>
                      <li>Work independently and as a team member.</li>
                      <li>Perform well under pressure.</li>
                      <li>Dependable, highly‑organized, self‑motivated and responsible.</li>
                    </ul>
                  </section>

                  {/* Experience */}
                  <section className="mt-6">
                    <h4 className="text-sm font-semibold text-zinc-900">Experience</h4>
                    <motion.div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4" variants={listStagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
                      <ExperienceItem role="Freelance Art Director" company="Google" when="April 2017 – Present (7 Months)" logo="G" />
                      <ExperienceItem role="Design Lead" company="Apple Corporation" when="April 2017 – Present (7 Months)" logo="🧩" />
                      <ExperienceItem role="UX Designer" company="Apple Corporation" when="April 2017 – Present (7 Months)" logo="🦊" />
                      <ExperienceItem role="Design Ops" company="Urbana" when="2016 – 2017" logo="🔷" />
                    </motion.div>
                  </section>

                  {/* Portfolio */}
                  <PortfolioSection/>
                  {/* <section className="mt-6">
                    <h4 className="text-sm font-semibold text-zinc-900">Portfolio</h4>
                    <motion.div className="mt-3 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4" variants={listStagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
                      {portfolioImgs.map((src, i) => (
                        <motion.div key={i} variants={portfolioItem} whileHover={{ y: -2 }} className="aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                          <img src={src} alt={`Portfolio ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section> */}
                </motion.div>
              )}

              {tab === "recommendations" && (
                <motion.div
                  key="panel-edu"
                  id="panel-recommendations"
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

              {tab === "following" && (
                <motion.div
                  key="panel-follow"
                  id="panel-following"
                  role="tabpanel"
                  className="p-4 sm:p-5 md:p-6 space-y-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Feedback */}
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
    </section>
  );
}

/* Sub-components */
function ExperienceItem({ role, company, when, logo }: { role: string; company: string; when: string; logo: string }) {
  return (
    <motion.div variants={{ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }} initial="initial" whileInView="animate" viewport={{ once: true }} className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-lg">
          {logo === "G" ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path fill="#EA4335" d="M12 10.2v3.8h5.4c-.24 1.26-.97 2.33-2.07 3.04l3.35 2.6C20.37 18.3 21.2 16.3 21.2 14c0-.78-.07-1.34-.2-1.8H12Z"/>
              <path fill="#34A853" d="M6.65 14.32a6.97 6.97 0 0 0 0-4.64L3.3 7.08a11.5 11.5 0 0 0 0 9.84l3.35-2.6Z"/>
              <path fill="#4A90E2" d="M12 22c2.97 0 5.46-.98 7.28-2.66l-3.35-2.6c-.93.6-2.12.96-3.93.96-3.01 0-5.57-2.03-6.45-4.78l-3.5 2.7C3.9 19.67 7.62 22 12 22Z"/>
              <path fill="#FBBC05" d="M12 2C7.62 2 3.9 4.33 1.95 7.38l3.5 2.7C6.33 7.33 8.99 5.3 12 5.3c1.64 0 3.12.56 4.28 1.64l3.2-3.2C17.46 2.66 14.97 2 12 2Z"/>
            </svg>
          ) : (
            <p>{logo}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">{role}</p>
          <p className="text-sm text-zinc-700">{company}</p>
          <p className="text-xs text-zinc-500">{when}</p>
        </div>
      </div>
    </motion.div>
  );
}

function EducationItem({ school, degree, location, period, details }: { school: string; degree: string; location: string; period: string; details: string[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">{school}</p>
          <p className="text-sm text-zinc-700">{degree}</p>
          <p className="text-xs text-zinc-500">{location}</p>
        </div>
        <span className="text-xs text-zinc-500">{period}</span>
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

function FeedbackItem({ from, rating, date, text }: { from: string; rating: number; date: string; text: string }) {
  return (
    <li className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-zinc-900">{from}</p>
        <div className="flex items-center gap-2">
          <StarRating value={rating} />
          <span className="text-xs text-zinc-500">{date}</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-zinc-700">{text}</p>
    </li>
  );
}

function StarRating({ value = 0 }: { value: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-4 w-4 ${i <= value ? "text-amber-500" : "text-zinc-300"}`}>
          <path fill="currentColor" d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}

/* CTA buttons */
function PrimaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex w-full h-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#F54BA5] via-[#F54BA5] to-[#A16CD8] px-6 text-sm font-bold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F54BA5]/60"
    >
      {children}
    </Link>
  );
}

function SecondaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex w-full h-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#8029F3] to-[#F54BA5] px-6 text-sm font-bold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8029F3]/60"
    >
      {children}
    </Link>
  );
}

/* Simple icon creators so we can color them via parent */
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
    <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.5 17V10.5H6V17H8.5M7.25 9.28A1.28 1.28 0 1 0 7.25 6.72A1.28 1.28 0 0 0 7.25 9.28M18 17V13.21C18 11.24 16.43 10.5 15.03 10.5C14.14 10.5 13.36 10.96 13 11.58H12.96V10.5H10.5V17H13V13.5C13 12.84 13.5 12.5 14.1 12.5C14.68 12.5 15 12.88 15 13.5V17H18Z"/>
  </svg>
  );
}
function DribbbleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17.89,6.26C19.18,7.65 20,9.71 20,12C20,12.17 20,12.34 19.97,12.5C18.84,12.23 17.23,12 15.5,12C14.9,12 14.3,12.03 13.72,12.09C13.57,11.75 13.41,11.41 13.24,11.07C14.96,10.35 16.54,8.89 17.89,6.26M12,4C13.54,4 15,4.5 16.24,5.34C15.09,7.57 13.61,9.14 11.93,9.84C11.17,8.44 10.33,7.08 9.37,5.78C10.16,4.66 11.05,4 12,4M7.5,5.78C8.43,7.03 9.3,8.39 10.1,9.84C7.93,10.42 5.85,11.5 4.26,13.18C3.47,12.13 3,10.83 3,9.41C3,8.05 3.5,6.79 4.26,5.78M4.08,14.31C5.59,12.63 7.77,11.44 10.21,10.94C10.41,11.31 10.6,11.69 10.78,12.07C9.29,12.55 7.81,13.3 6.45,14.5C5.38,15.41 4.49,16.4 3.93,17.5C3.45,16.47 3.18,15.42 3.18,14.31M6.71,18.47C7.24,17.28 8.05,16.27 9.1,15.58C10.31,16.66 11.7,17.88 13.23,19.09C12.53,19.34 11.78,19.5 11,19.5C9.39,19.5 7.89,19.12 6.71,18.47M14.88,18.75C13.42,17.61 12.15,16.55 11.05,15.56C11.74,15.11 12.5,14.73 13.31,14.43C13.5,14.91 13.69,15.4 13.88,15.89C14.05,16.47 14.33,17.1 14.58,17.71C14.68,17.74 14.78,17.75 14.88,17.75M16.59,17.09C16.28,16.18 15.93,15.26 15.54,14.35C16.92,14.43 18.21,14.68 19.8,15C19.38,15.93 18.05,16.64 16.59,17.09Z"/>
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21V19.07C6.73,19.68 6.14,17.92 6.14,17.92C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.4 8.97,17.96 9.54,17.73C9.63,17.08 9.89,16.65 10.17,16.42C7.95,16.19 5.62,15.27 5.62,11.44C5.62,10.39 6,9.55 6.66,8.85C6.55,8.62 6.17,7.39 6.75,5.76C6.75,5.76 7.67,5.5 9.5,6.85C10.37,6.61 11.3,6.5 12.22,6.5C13.14,6.5 14.07,6.61 14.94,6.85C16.77,5.5 17.69,5.76 17.69,5.76C18.27,7.39 17.89,8.62 17.78,8.85C18.44,9.55 18.82,10.39 18.82,11.44C18.82,15.28 16.5,16.19 14.27,16.41C14.64,16.73 15,17.39 15,18.42V21C15,21.27 15.16,21.59 15.67,21.5C19.63,20.17 22.5,16.42 22.5,12A10,10 0 0,0 12,2Z"/>
    </svg>
  );
}
