"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, MoveRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const roleTitles = [
  "Senior Data Engineer",
  "CTO at Foxbeep Technology",
  "Python & SQL Engineer",
  "Data Pipeline Architect",
  "Full-Stack Developer",
];

const springConfig = { stiffness: 110, damping: 20, mass: 0.8 };
const slowSpringConfig = { stiffness: 70, damping: 24, mass: 1 };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const HeroSection = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const tiltRotateX = useSpring(
    useTransform(pointerY, [-1, 1], [8, -8]),
    springConfig
  );
  const tiltRotateY = useSpring(
    useTransform(pointerX, [-1, 1], [-10, 10]),
    springConfig
  );

  const glowLayerX = useSpring(
    useTransform(pointerX, [-1, 1], [-30, 30]),
    slowSpringConfig
  );
  const glowLayerY = useSpring(
    useTransform(pointerY, [-1, 1], [-30, 30]),
    slowSpringConfig
  );
  const inverseGlowLayerX = useSpring(
    useTransform(pointerX, [-1, 1], [24, -24]),
    slowSpringConfig
  );
  const inverseGlowLayerY = useSpring(
    useTransform(pointerY, [-1, 1], [24, -24]),
    slowSpringConfig
  );

  const imageLayerX = useSpring(
    useTransform(pointerX, [-1, 1], [-22, 22]),
    springConfig
  );
  const imageLayerY = useSpring(
    useTransform(pointerY, [-1, 1], [-18, 18]),
    springConfig
  );

  const cardOneX = useSpring(
    useTransform(pointerX, [-1, 1], [-32, 28]),
    slowSpringConfig
  );
  const cardOneY = useSpring(
    useTransform(pointerY, [-1, 1], [-22, 20]),
    slowSpringConfig
  );

  const cardTwoX = useSpring(
    useTransform(pointerX, [-1, 1], [26, -26]),
    slowSpringConfig
  );
  const cardTwoY = useSpring(
    useTransform(pointerY, [-1, 1], [-16, 18]),
    slowSpringConfig
  );

  const cardThreeX = useSpring(
    useTransform(pointerX, [-1, 1], [-20, 24]),
    slowSpringConfig
  );
  const cardThreeY = useSpring(
    useTransform(pointerY, [-1, 1], [20, -20]),
    slowSpringConfig
  );

  useEffect(() => {
    const currentTitle = roleTitles[currentTitleIndex];
    const shouldPause =
      !isDeleting && displayText.length === currentTitle.length;
    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
          return;
        }
        if (!isDeleting && displayText.length === currentTitle.length) {
          setIsDeleting(true);
          return;
        }
        if (isDeleting && displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          return;
        }
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % roleTitles.length);
      },
      shouldPause ? 1600 : isDeleting ? 45 : 90
    );
    return () => window.clearTimeout(timeout);
  }, [currentTitleIndex, displayText, isDeleting]);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(clamp(normalizedX, -1, 1));
    pointerY.set(clamp(normalizedY, -1, 1));
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Announcement banner */}
      <div className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-700 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 text-center text-sm sm:text-base">
          <span className="font-semibold">Now Available:</span>
          <a
            href="https://www.npmjs.com/package/@srijanpokhrel/image-shrink"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 transition-opacity hover:opacity-90"
          >
            @srijanpokhrel/image-shrink — live on npm
          </a>
        </div>
      </div>

      {/* Ambient glow blobs */}
      <motion.div
        className="absolute -right-24 top-16 -z-10 h-80 w-80 rounded-full blur-3xl"
        style={shouldReduceMotion ? undefined : { x: glowLayerX, y: glowLayerY }}
      />
      <motion.div
        className="absolute -left-20 bottom-10 -z-10 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl"
        style={
          shouldReduceMotion
            ? undefined
            : { x: inverseGlowLayerX, y: inverseGlowLayerY }
        }
      />

      <div
        className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── Text column ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 space-y-7 lg:order-1"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl">
                Srijan Pokhrel
              </h1>
              <p className="max-w-xl text-base text-slate-600 sm:text-lg">
                Data-focused Full-Stack Engineer with 3+ years building scalable
                systems, data pipelines, and REST APIs. Currently CTO at Foxbeep
                Technology, turning raw data into reliable, high-performance
                infrastructure that drives product decisions.
              </p>
            </div>

            <p className="h-8 text-lg text-fuchsia-500 sm:h-9 sm:text-xl">
              {displayText}
              <span className="ml-1 animate-pulse">|</span>
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-black/45 bg-white/15 px-6 py-3 text-sm font-semibold text-black/85 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/25"
              >
                Explore Projects
                <MoveRight className="h-4 w-4" />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/45 bg-white/15 px-6 py-3 text-sm font-semibold text-black/85 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/25"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>
          </motion.div>

          {/* ── Photo / card column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <motion.div
              className="relative mx-auto w-full max-w-[530px] [perspective:1400px]"
              style={
                shouldReduceMotion
                  ? undefined
                  : { rotateX: tiltRotateX, rotateY: tiltRotateY }
              }
            >
              {/*
               * Responsive height: taller on desktop where the floating cards
               * need vertical room; more compact on mobile so nothing clips.
               * px-10 on mobile creates horizontal breathing room for cards.
               */}
              <div className="relative mx-auto h-[340px] px-10 sm:h-[400px] sm:px-8 lg:h-[460px] lg:px-0">

                {/* Photo frame */}
                <motion.div
                  className="absolute inset-x-10 inset-y-0 overflow-hidden rounded-[1.6rem] border border-white/15 bg-white-900/40 backdrop-blur-xl sm:inset-x-8 lg:inset-x-4"
                  style={
                    shouldReduceMotion
                      ? undefined
                      : { x: imageLayerX, y: imageLayerY }
                  }
                >
                  <Image
                    src="/images/sideimg_sri.png"
                    alt="Srijan Pokhrel software QA engineer and React Next.js developer"
                    fill
                    priority
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 520px"
                    className="object-contain object-bottom"
                  />
                </motion.div>

                {/* Card 1 – Core Stack */}
                <motion.div
                  className="absolute left-0 top-4 z-10 max-w-[160px] rounded-2xl border border-fuchsia-200/35 bg-slate-900/85 px-3 py-2 backdrop-blur sm:max-w-[180px] sm:px-4 sm:py-3 lg:-left-6 lg:top-8 lg:max-w-[220px]"
                  style={
                    shouldReduceMotion ? undefined : { x: cardOneX, y: cardOneY }
                  }
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-fuchsia-200 sm:text-xs">
                    Core Stack
                  </p>
                  <p className="mt-1 text-xs text-slate-100 sm:text-sm">
                    Python, SQL, Node.js, React, TypeScript & ETL pipelines
                  </p>
                </motion.div>

                {/* Card 2 – Academic Study */}
                <motion.div
                  className="absolute right-0 top-1/2 z-10 max-w-[155px] -translate-y-1/2 rounded-2xl border border-indigo-200/35 bg-slate-900/85 px-3 py-2 backdrop-blur sm:max-w-[175px] sm:px-4 sm:py-3 lg:-right-6 lg:max-w-[210px]"
                  style={
                    shouldReduceMotion ? undefined : { x: cardTwoX, y: cardTwoY }
                  }
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-indigo-200 sm:text-xs">
                    Academic Study
                  </p>
                  <p className="mt-1 text-xs text-slate-100 sm:text-sm">
                    MSc in Informatics & Intelligent System Engineering
                  </p>
                </motion.div>

                {/* Card 3 – Work Experience */}
                <motion.div
                  className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-emerald-200/35 bg-slate-900/85 px-3 py-2 backdrop-blur sm:px-4 sm:py-3 lg:bottom-0 lg:left-10 lg:-translate-x-0 lg:whitespace-normal"
                  style={
                    shouldReduceMotion
                      ? undefined
                      : { x: cardThreeX, y: cardThreeY }
                  }
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200 sm:text-xs">
                    Current Role
                  </p>
                  <p className="mt-1 text-xs text-slate-100 sm:text-sm">
                    CTO at Foxbeep Technology, Kathmandu
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;