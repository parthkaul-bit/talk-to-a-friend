"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { jost } from "@/lib/fonts";


export default function Home() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center px-6 pt-24 sm:pt-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <Image
            src="/hero-illustration2.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
            quality={100}
            priority
          />
          {/* Overlay for better readability while keeping original theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/20 to-white/10"></div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="max-w-2xl px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={`${jost.className} text-4xl sm:text-5xl font-extrabold text-[#07383C]`}>
          GENTLE AS SUNLIGHT,
          <br />
          DEEP AS ROOTS
        </h1>
        <p className="mt-4 text-lg sm:text-2xl font-medium text-[#07383C]">
          Unload, breathe, and find peace with an AI friend <br />
          who listens without judgment.
        </p>

        {/* Animated Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link href="/chat">
            <motion.button
              className="rounded-2xl py-3 sm:py-4 px-6 sm:px-8 bg-[#226468] text-white text-lg font-bold transition"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              LET&apos;S CHAT!
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
