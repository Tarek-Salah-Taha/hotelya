"use client";
import { motion } from "framer-motion";

function Copyright({ text }: { text: string }) {
  return (
    <motion.div className="border-t border-primary/20 mt-12 pt-8 text-center">
      <p className="text-sm text-background/70">
        © {new Date().getFullYear()} Hotelya, Inc. {text}
      </p>
    </motion.div>
  );
}

export default Copyright;
