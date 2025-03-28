"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Talk to a Friend - Your AI Listener</title>
        <meta
          name="description"
          content="A caring AI friend who listens, understands, and supports you—whenever you need to talk."
        />
        <meta
          name="keywords"
          content="AI friend, talk to AI, emotional support, AI chat companion, feel heard"
        />
      </Head>

      <div className="min-h-svh overflow-hidden bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col justify-center items-center p-4 relative bg-[url('/dots.svg')] bg-cover">
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Animated Elements Near the Text */}
          <div className="relative flex justify-center items-center w-full">
            <motion.div className="w-10 h-10 md:w-16 md:h-16 bg-purple-700 rounded-full opacity-30 blur-xl animate-bounce absolute -top-6 left-10 md:left-20" />
            <motion.div className="w-16 h-16 md:w-24 md:h-24 bg-blue-800 rounded-full opacity-30 blur-xl animate-pulse absolute -bottom-12 right-10 md:right-10" />
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Feeling Overwhelmed? <br />
            <span className="text-purple-400">Talk to a Friend</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link href="/chat" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-3"
              >
                Start Talking <MessageCircle className="ml-2" size={24} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
