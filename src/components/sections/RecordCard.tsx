"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { RECORD_CARD } from "@/data/dnsJourney";

export function RecordCard() {
  const rows = [
    { label: "HOSTNAME", value: RECORD_CARD.hostname },
    { label: "TYPE", value: RECORD_CARD.type },
    { label: "DESTINATION", value: RECORD_CARD.destination },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="max-w-sm rounded-lg border border-border bg-surface p-6 font-body"
    >
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
          <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">{row.label}</span>
          <span className="text-sm font-medium text-text-primary">{row.value}</span>
        </div>
      ))}
      <div className="mt-4 flex items-center gap-2 text-accent">
        <CheckCircle2 size={16} />
        <span className="text-sm font-medium">{RECORD_CARD.status}</span>
      </div>
    </motion.div>
  );
}
