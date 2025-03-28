"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-gray-100 text-gray-600 text-sm text-center py-3 fixed bottom-0 shadow-md flex items-center justify-between px-4 md:px-6 lg:px-8"
        >
          <p className="flex-1 text-left text-xs md:text-sm">
            <strong>Disclaimer:</strong> Talk to a Friend is an AI-based
            companion for emotional support. It is not a substitute for
            professional mental health services. If you&apos;re struggling,
            please seek help from a licensed professional.
          </p>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="ml-4 text-gray-600 border-gray-300 hover:bg-gray-200"
          >
            ✖
          </Button>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Footer;
