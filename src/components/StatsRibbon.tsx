"use client";
import React from "react";
import { Star, Bookmark, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Creative, animated take on your Rating / Bookmarks / Jobs row.
 * - Subtle glassmorphism cards
 * - Gradient icon bubbles with animated glow
 * - Micro-interactions on hover
 * - Lightweight inline Sparkline (no deps)
 *
 * Usage:
 * <StatsRibbon rating={4.9} bookmarks={18} jobs={1234} trend={[10,14,13,15,18,22,20,25]} />
 */
export default function StatsRibbon({
  rating = 4.9,
  ratingMax = 5,
  bookmarks = 18,
  jobs = 1250,
  trend = [10, 14, 13, 15, 18, 22, 20, 25],
  blue = "#2563eb", // Tailwind blue-600
  green = "#16a34a", // Tailwind green-600
}) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto snap-x">
      {/* Rating */}
      <MetricCard>
        <IconBubble gradientFrom={green} gradientTo="#22c55e" icon={<Star size={16} className="text-white" />} />
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-zinc-500">Rating</span>
          <span className="flex items-center gap-1">
            <BouncyStars value={ratingMax} filled={rating} />
            <span className="text-[13px] font-semibold text-zinc-800 tabular-nums">{rating.toFixed(1)}</span>
          </span>
        </div>
      </MetricCard>

      <Separator />

      {/* Bookmarks */}
      <MetricCard>
        <IconBubble gradientFrom={blue} gradientTo="#60a5fa" icon={<Bookmark size={16} className="text-white" />} />
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-zinc-500">Bookmarks</span>
          <span className="text-[13px] font-semibold text-zinc-800 whitespace-nowrap">{bookmarks}</span>
        </div>
      </MetricCard>

      <Separator />

      {/* Jobs */}
      <MetricCard className="pr-2">
        <IconBubble gradientFrom={green} gradientTo="#22c55e" icon={<CheckCheck size={16} className="text-white" />} />
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-zinc-500">Jobs</span>
          <span className="flex items-center gap-1">
            <span className="text-[13px] font-semibold text-zinc-800 tabular-nums whitespace-nowrap">{formatNumber(jobs)}</span>
            <Sparkline data={trend} stroke={blue} />
          </span>
        </div>
      </MetricCard>
    </div>
  );
}

/*** Building blocks ***/
type MetricCardProps = {
  children: React.ReactNode;
  className?: string;
};

function MetricCard({ children, className = "" }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -1.5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={
        "group relative flex items-center gap-2 shrink-0 snap-start rounded-2xl bg-white/70 " +
        "border border-zinc-200/70 backdrop-blur px-2.5 py-2 shadow-sm hover:shadow-md " +
        "ring-0 hover:ring-1 hover:ring-zinc-200 " +
        className
      }
    >
      {/* Soft animated glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.35 }}
        style={{
          background:
            "radial-gradient(60% 60% at 10% 10%, rgba(99,102,241,0.06), transparent)," +
            "radial-gradient(60% 60% at 100% 0%, rgba(34,197,94,0.05), transparent)",
        }}
      />
      {children}
    </motion.div>
  );
}

function Separator() {
  return (
    <motion.span
      className="h-10 w-px shrink-0 snap-start bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-200 rounded-full"
      aria-hidden
      initial={{ opacity: 0.7 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}

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

/** Lightweight sparkline using SVG */
function Sparkline({
  data = [],
  width = 64,
  height = 18,
  stroke = "#2563eb",
}: {
  data?: number[];
  width?: number;
  height?: number;
  stroke?: string;
}) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const step = width / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="overflow-visible"
      aria-label="trend"
    >
      {/* shadow */}
      <polyline points={points} fill="none" stroke="#000000" strokeOpacity="0.08" strokeWidth="2.5" />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/** Simple animated stars without external deps
 *  - value: how many total stars to display
 *  - filled: rating value to fill (supports fractions)
 */
function BouncyStars({ value = 5, filled = 4.9 }) {
  const full = Math.floor(filled);
  const frac = Math.max(0, Math.min(1, filled - full));
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: value }).map((_, i) => (
        <motion.span
          key={i}
          className="relative inline-block h-3.5 w-3.5"
          whileHover={{ y: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          aria-hidden
        >
          <StarFill progress={i < full ? 1 : i === full ? frac : 0} />
        </motion.span>
      ))}
    </div>
  );
}

function StarFill({ progress = 1 }) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" className="drop-shadow-[0_1px_0_rgba(0,0,0,0.05)]">
      <defs>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <clipPath id="starClip">
          <rect x="0" y="0" width={`${progress * 24}`} height="24" />
        </clipPath>
      </defs>
      <path
        d="M12 3.4l2.47 5.01 5.53.8-4 3.9.94 5.5L12 16.9l-4.94 2.7.94-5.5-4-3.9 5.53-.8L12 3.4z"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.2"
      />
      <g clipPath="url(#starClip)">
        <path
          d="M12 3.4l2.47 5.01 5.53.8-4 3.9.94 5.5L12 16.9l-4.94 2.7.94-5.5-4-3.9 5.53-.8L12 3.4z"
          fill="url(#starGrad)"
        />
      </g>
    </svg>
  );
}

function formatNumber(n = 0) {
  if (n < 1000) return `${n}`;
  if (n < 10000) return `${(n / 1000).toFixed(1)}k`;
  return new Intl.NumberFormat(undefined).format(n);
}
