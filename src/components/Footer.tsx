// components/Footer.tsx
import Link from "next/link";
import { CONTAINER } from "../utils/ui";

export default function Footer() {
  // Brand palette
  const blue = "#124C98";   // primary
  const green = "#059669";  // accent

  return (
    <footer className="relative">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-7xl py-10">
          {/* Outer glass card */}
          <div
            className="
              relative overflow-hidden rounded-[2.25rem]
              border border-white/40 bg-white/60 backdrop-blur-xl
              shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]
              h-auto md:h-[500px] pb-28 md:pb-0
            "
          >
            {/* Top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-40 bg-gradient-to-b from-white/70 via-white/40 to-transparent" />

            {/* Inner white card */}
            <div className="relative z-10 m-2 rounded-3xl border border-white/60 bg-white/80 backdrop-blur p-8 shadow-[0_28px_60px_-25px_rgba(0,0,0,0.35)]">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                {/* Brand */}
                <div className="md:col-span-5 lg:col-span-6">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold tracking-tight" style={{ color: blue }}>
                      SKILLNODE.
                    </span>
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600">
                    Skillnode — Contrary to popular belief, Lorem Ipsum is not simply. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                  </p>

                  {/* Socials */}
                  <div className="mt-5 flex items-center gap-4 text-zinc-500">
                    <SocialLink href="#" label="X (Twitter)">
                      <XIcon />
                    </SocialLink>
                    <SocialLink href="#" label="LinkedIn">
                      <LinkedInIcon />
                    </SocialLink>
                    <SocialLink href="#" label="GitHub">
                      <GitHubIcon />
                    </SocialLink>
                  </div>
                </div>

                {/* Columns */}
                <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3">
                  <FooterCol
                    title="For Candidates"
                    items={[
                      { label: "Browse Jobs", href: "#" },
                      { label: "Browse Categories", href: "#" },
                      { label: "Candidate Dashboard", href: "#" },
                      { label: "Job Alerts", href: "#" },
                    ]}
                    blue={blue}
                  />
                  <FooterCol
                    title="Resources"
                    items={[
                      { label: "Documentation", href: "#" },
                      { label: "Tutorials", href: "#" },
                      { label: "Blog", href: "#" },
                      { label: "Support", href: "#" },
                    ]}
                    blue={blue}
                  />
                  <FooterCol
                    title="Company"
                    items={[
                      { label: "About", href: "#" },
                      { label: "Careers", href: "#" },
                      { label: "Contact", href: "#" },
                      { label: "Partners", href: "#" },
                    ]}
                    blue={blue}
                  />
                </div>
              </div>

              {/* Divider */}
              <div
                className="my-8 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${blue}22, transparent)`,
                }}
              />

              {/* Bottom row */}
              <div className="flex flex-col items-start justify-between gap-4 text-sm text-zinc-500 md:flex-row md:items-center">
                <p>© {new Date().getFullYear()} SKILLNODE. All rights reserved.</p>
                <nav className="flex flex-wrap items-center gap-6">
                  <FooterLink href="#">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms of Service</FooterLink>
                  <FooterLink href="#">Cookies Settings</FooterLink>
                </nav>
              </div>
            </div>

            {/* Animated watermark */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[-1.25rem] md:bottom-[-2.5rem] z-0 flex select-none justify-center">
              <span
                className="block font-extrabold tracking-tighter bg-clip-text text-transparent animate-gradient"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${blue}1A, ${green}1A, ${blue}1A)`,
                  fontSize: "clamp(1rem, 18vw, 14.5rem)",
                  lineHeight: 1.03,
                  whiteSpace: "nowrap",
                }}
              >
                SKILLNODE
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Helpers */
function FooterCol({ title, items, blue }: { title: string; items: { label: string; href: string }[]; blue: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-900 relative pb-1 mb-2">
        {title}
        {/* brand underline */}
        <span className="absolute left-0 bottom-0 h-0.5 w-6" style={{ backgroundColor: blue }} />
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it.label}>
            <FooterLink href={it.href}>{it.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-zinc-600 transition-all hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded hover:text-[#124C98]"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-sm text-zinc-600 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:border-[#124C98] hover:bg-[#124C98]/10 hover:text-[#124C98]"
      style={{
        borderColor: "rgba(255,255,255,0.5)",
        background: "rgba(255,255,255,0.5)",
      }}
    >
      {children}
    </Link>
  );
}

/* Icon components */
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 3H21l-7.5 8.57L22.5 21h-6.744l-5.28-6.3L4.5 21H2l8.28-9.45L2.25 3h6.744l4.92 5.88L18.244 3Zm-1.182 16h2.019L7.02 5H5.001L17.062 19Z"
      />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M4.983 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 4.983 3.5ZM3 9h4v12H3zm7 0h3.8v1.7h.1A4.2 4.2 0 0 1 21 14.5V21h-4v-5.2c0-1.2-.02-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V21h-4V9Z"
      />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.32 3.53 1.01.11-.78.42-1.32.77-1.62-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.25-3.22-.13-.31-.54-1.56.12-3.26 0 0 1.02-.33 3.34 1.23a11.6 11.6 0 0 1 6.08 0c2.32-1.56 3.34-1.23 3.34-1.23.66 1.7.25 2.95.12 3.26.78.84 1.25 1.91 1.25 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}