import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassButton } from "../components/glass/GlassButton";
import { api } from "../lib/api";
import type { Table } from "../types";

export function ScanPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [selected, setSelected] = useState<string>("T1");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    api.get<Table[]>("/tables")
      .then((data) => {
        setTables(data);
        if (data[0]) setSelected(data[0].id);
      })
      .catch(() => setTables([]));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const menuUrl = useMemo(() => {
    const base = origin || "https://avantika-sigma.vercel.app";
    return `${base}/menu?table=${encodeURIComponent(selected)}`;
  }, [origin, selected]);

  const qrUrl = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=16&data=${encodeURIComponent(
        menuUrl
      )}`,
    [menuUrl]
  );

  return (
    <div className="section-wrap pt-32">
      <GlassCard
        title="Scan QR For Table Ordering"
        subtitle="Scan this code to open the menu with auto-selected table."
        className="mx-auto max-w-3xl"
      >
        <div className="flex flex-wrap items-center gap-3">
          {tables.map((t) => (
            <button
              key={t.id}
              className={`glass rounded-full px-4 py-2 text-sm ${
                selected === t.id ? "bg-white/20" : ""
              }`}
              onClick={() => setSelected(t.id)}
            >
              Table {t.id.replace("T", "")}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[320px_1fr]">
          <div className="glass flex h-[320px] w-[320px] items-center justify-center rounded-2xl p-3">
            <img
              src={qrUrl}
              alt={`QR for ${selected}`}
              className="h-full w-full rounded-xl bg-white object-contain p-2"
            />
          </div>
          <div className="space-y-4">
            <p className="text-white/70">
              QR target URL:
            </p>
            <div className="glass rounded-xl p-3 text-sm break-all text-white/90">
              {menuUrl}
            </div>
            <a href={menuUrl}>
              <GlassButton>Open Menu Link</GlassButton>
            </a>
            <p className="text-xs text-white/60">
              Customer can add items to cart without login, but checkout requires login.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

