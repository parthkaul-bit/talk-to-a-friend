"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center bg-black/60 px-6"
        >
          <div className="relative bg-white text-gray-800 rounded-lg shadow-xl p-6 sm:p-8 max-w-lg w-full">
            {/* Modal Content */}
            <h2 className="text-xl font-semibold text-center">Important Notice</h2>

            <p className="mt-4 text-sm leading-relaxed text-center">
              <strong>Talk to a Friend</strong> is an AI-based companion designed to provide 
              emotional support. However, it is <span className="font-semibold">not</span> a 
              replacement for professional mental health services.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-center">
              If you are experiencing distress or need professional guidance, please reach out 
              to a licensed therapist or counselor.
            </p>

            <div className="mt-5 flex justify-center">
              <button
                onClick={() => setIsVisible(false)}
                className="px-5 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900 transition"
              >
                I Understand
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
