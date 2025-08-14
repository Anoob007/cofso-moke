"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const listStagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const portfolioItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PortfolioSection() {
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

  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState<number>(0);

  return (
    <>
      {/* Portfolio Grid */}
      <section className="mt-6">
        <h4 className="text-sm font-semibold text-zinc-900">Portfolio</h4>

        <motion.div
          className="mt-3 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={listStagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {portfolioImgs.map((src, i) => (
            <motion.button
              key={i}
              variants={portfolioItem}
              whileHover={{ y: -2 }}
              onClick={() => {
                setLbIndex(i);
                setLbOpen(true);
              }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 text-left"
            >
              {/* image with subtle zoom */}
              <motion.img
                src={src}
                alt={`Portfolio ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* glass gradient overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              </div>

              {/* caption + chips */}
              <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2">
               
                <span className="rounded-lg bg-black/50 px-2 py-1 text-xs text-white">
                  View
                </span>
              </div>

              {/* shine swipe */}
              <span
                aria-hidden
                className="absolute -inset-y-8 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:left-[120%] group-hover:opacity-100"
                style={{ transitionProperty: "left,opacity" }}
              />
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lbOpen && (
          <>
            {/* overlay */}
            <motion.div
              key="lb-ov"
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLbOpen(false)}
            />

            {/* dialog */}
            <motion.div
              key="lb-dlg"
              className="fixed inset-0 z-[80] grid place-items-center p-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setLbOpen(false);
                if (e.key === "ArrowRight")
                  setLbIndex((p) => (p + 1) % portfolioImgs.length);
                if (e.key === "ArrowLeft")
                  setLbIndex(
                    (p) => (p - 1 + portfolioImgs.length) % portfolioImgs.length
                  );
              }}
              tabIndex={-1}
            >
              <div className="relative w-full max-w-5xl">
                {/* image */}
                <div className="overflow-hidden rounded-2xl border border-white/20 bg-black">
                  <img
                    src={portfolioImgs[lbIndex]}
                    alt={`Preview ${lbIndex + 1}`}
                    className="max-h-[80vh] w-full"
                  />
                </div>

                {/* controls */}
                <button
                  onClick={() => setLbOpen(false)}
                  className="absolute -top-3 -right-3 rounded-full bg-white p-2 shadow"
                  aria-label="Close"
                >
                  ✕
                </button>
                <button
                  onClick={() =>
                    setLbIndex(
                      (p) =>
                        (p - 1 + portfolioImgs.length) % portfolioImgs.length
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setLbIndex((p) => (p + 1) % portfolioImgs.length)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                  aria-label="Next"
                >
                  ›
                </button>

                {/* counter */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  {lbIndex + 1} / {portfolioImgs.length}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
