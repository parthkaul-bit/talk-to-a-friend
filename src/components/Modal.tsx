"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Modal = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="relative bg-gray-100 text-gray-700 text-sm rounded-lg shadow-lg p-6 max-w-md w-full">
            {/* Close Button in Top Right */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 hover:scale-110 text-lg transition-all duration-300 ease-in-out"
            >
              <X />
            </button>

            <h2 className="text-lg font-semibold text-center">
              Disclaimer
            </h2>
            <p className="mt-2 text-xs md:text-sm text-center">
              <strong>Talk to a Friend</strong> is an AI-based companion for emotional support. It is not a substitute for professional mental health services. If you're struggling, please seek help from a licensed professional.
            </p>
            <p className="mt-2 text-xs md:text-sm text-center font-medium">
              Your chats are private and anonymous. 🛡️
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
