import Link from "next/link";
import { CONTAINER } from "../utils/ui";
import Image from 'next/image'


export default function ProfileBannerAligned() {
  return (
    <section className={CONTAINER}>
      {/* Banner */}
      <div className="relative overflow-hidden rounded-[28px] h-48 md:h-56 mt-7">
  <img
    src="https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg"
    alt="Banner"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>

      {/* Card that overlaps banner */}
      <div className="-mt-10 md:-mt-14 relative z-10 rounded-[22px] border border-zinc-200/70 bg-white p-5 md:p-6 shadow-[0_30px_80px_-30px_rgba(2,6,23,0.25)]">
        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr_auto] md:items-start">
          {/* Left */}
          <div className="flex gap-4">
            <div className="h-30 w-30 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-amber-100 shadow">
              <div className="flex h-full w-full items-center justify-center text-4xl">
                <img
                    src="https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    />

              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Jenny Wilson</h2>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-zinc-600">
                Developer <span className="text-zinc-400">@</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path fill="#EA4335" d="M12 10.2v3.8h5.4c-.24 1.26-.97 2.33-2.07 3.04l3.35 2.6C20.37 18.3 21.2 16.3 21.2 14c0-.78-.07-1.34-.2-1.8H12Z"/>
                  <path fill="#34A853" d="M6.65 14.32a6.97 6.97 0 0 0 0-4.64L3.3 7.08a11.5 11.5 0 0 0 0 9.84l3.35-2.6Z"/>
                  <path fill="#4A90E2" d="M12 22c2.97 0 5.46-.98 7.28-2.66l-3.35-2.6c-.93.6-2.12.96-3.93.96-3.01 0-5.57-2.03-6.45-4.78l-3.5 2.7C3.9 19.67 7.62 22 12 22Z"/>
                  <path fill="#FBBC05" d="M12 2C7.62 2 3.9 4.33 1.95 7.38l3.5 2.7C6.33 7.33 8.99 5.3 12 5.3c1.64 0 3.12.56 4.28 1.64l3.2-3.2C17.46 2.66 14.97 2 12 2Z"/>
                </svg>
                Google
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 4.28 7 13 7 13s7-8.72 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>
                India, Bangalore
              </div>
            </div>
          </div>

          {/* Middle */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white/60 p-4">
              <h4 className="text-sm font-semibold text-rose-600">Work</h4>
              <p className="mt-1 text-sm text-zinc-700">Osinski, Kohler and</p>
              <p className="text-sm text-zinc-700">Bashirian 7A-1025955</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white/60 p-4">
              <h4 className="text-sm font-semibold text-sky-600">Education</h4>
              <p className="mt-1 text-sm text-zinc-700">Harvard University</p>
              <p className="text-sm text-zinc-700">Cambridge</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex md:justify-end">
            <Link href="#" className="inline-flex h-10 items-center justify-center rounded-xl bg-rose-500 px-6 text-sm font-medium text-white shadow-sm ring-1 ring-rose-500/30 hover:bg-rose-600">
              Hire Me
            </Link>
          </div>
        </div>

        {/* Socials row */}
        {/* <div className="mt-4 pl-5">
       <h6>About Me</h6>
         <p>Ut sodales arcu sagittis metus molestie molestie. Nulla maximus volutpat dui. Etiam luctus lobortis massa in pulvinar. Maecenas nunc odio, faucibus in malesuada a, dignissim at odio. Aenean eleifend urna.</p>
        </div> */}
      </div>
    </section>
  );
}
