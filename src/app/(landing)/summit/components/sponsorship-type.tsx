"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DottedCard } from "./dotted-card";

export const SponsorshipType = ({ title, icon, index }: { title: string; icon: React.ReactNode; index: number }) => {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <Link href="/summit/sponsorship" className="block h-full">
        <motion.div
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          transition={{
            scale: {
              duration: 0.1,
              ease: "easeIn",
            },
          }}
        >
          <DottedCard
            className="p-4 w-full h-full hover:border-white/20 transition-colors duration-300"
            contentClassName="pt-12 flex flex-col items-start justify-end"
          >
            <ArrowUpRight className="w-4 h-4 absolute top-4 right-4" />
            {icon}
            <h3 className="mt-2 font-bold">{title}</h3>
          </DottedCard>
        </motion.div>
      </Link>
    </motion.div>
  );
};
