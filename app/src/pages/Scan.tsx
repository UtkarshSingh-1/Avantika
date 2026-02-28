import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassButton } from "../components/glass/GlassButton";
import { api } from "../lib/api";
import type { Table } from "../types";

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function sortTables(a: Table, b: Table) {
  const an = Number(a.id.replace("T", ""));
  const bn = Number(b.id.replace("T", ""));
  return an - bn;
}

export function ScanPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [selected, setSelected] = useState<string>("T1");
  const [origin, setOrigin] = useState("");
  const [busySingle, setBusySingle] = useState(false);
  const [busySheet, setBusySheet] = useState(false);

  useEffect(() => {
    api
      .get<Table[]>("/tables")
      .then((data) => {
        const sorted = [...data].sort(sortTables);
        setTables(sorted);
        if (sorted[0]) setSelected(sorted[0].id);
      })
      .catch(() => setTables([]));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const baseOrigin = origin || "https://avantika-sigma.vercel.app";

  const menuUrl = useMemo(() => {
    return `${baseOrigin}/menu?table=${encodeURIComponent(selected)}`;
  }, [baseOrigin, selected]);

  const qrPreviewUrl = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=16&data=${encodeURIComponent(
        menuUrl
      )}`,
    [menuUrl]
  );

  const handleDownloadSingle = async () => {
    try {
      setBusySingle(true);
      const dataUrl = await QRCode.toDataURL(menuUrl, {
        width: 1024,
        margin: 2,
        color: {
          dark: "#111111",
          light: "#ffffff",
        },
      });
      downloadDataUrl(dataUrl, `avantika-${selected.toLowerCase()}-qr.png`);
    } finally {
      setBusySingle(false);
    }
  };

  const generateSheetDataUrl = async () => {
    if (tables.length === 0) return;
    const sorted = [...tables].sort(sortTables);
    const cols = 3;
    const rows = Math.ceil(sorted.length / cols);

    const canvasWidth = 2480;
    const minHeight = 3508;
    const marginX = 120;
    const marginTop = 220;
    const marginBottom = 120;
    const gapX = 50;
    const gapY = 80;
    const cellWidth = Math.floor((canvasWidth - marginX * 2 - gapX * (cols - 1)) / cols);
    const qrSize = cellWidth - 70;
    const cellHeight = qrSize + 90;
    const neededHeight = marginTop + rows * cellHeight + Math.max(0, rows - 1) * gapY + marginBottom;
    const canvasHeight = Math.max(minHeight, neededHeight);

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#111111";
    ctx.font = "bold 64px Arial";
    ctx.fillText("Avantika Food Mall - Table QR Sheet", marginX, 100);

    ctx.fillStyle = "#444444";
    ctx.font = "32px Arial";
    ctx.fillText("Scan to open menu with table auto-selected", marginX, 150);

    const qrDataUrls = await Promise.all(
      sorted.map((table) => {
        const url = `${baseOrigin}/menu?table=${encodeURIComponent(table.id)}`;
        return QRCode.toDataURL(url, {
          width: qrSize,
          margin: 1,
          color: { dark: "#111111", light: "#ffffff" },
        });
      })
    );

    for (let i = 0; i < sorted.length; i += 1) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = marginX + col * (cellWidth + gapX);
      const y = marginTop + row * (cellHeight + gapY);

      const img = await loadImage(qrDataUrls[i]);

      ctx.fillStyle = "#f7f7f7";
      ctx.fillRect(x, y, cellWidth, cellHeight);

      const qrX = x + Math.floor((cellWidth - qrSize) / 2);
      const qrY = y + 20;
      ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

      ctx.fillStyle = "#111111";
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Table ${sorted[i].id.replace("T", "")}`, x + Math.floor(cellWidth / 2), y + qrSize + 68);
      ctx.textAlign = "start";
    }

    return canvas.toDataURL("image/png");
  };

  const handleDownloadSheet = async () => {
    try {
      setBusySheet(true);
      const sheetDataUrl = await generateSheetDataUrl();
      if (!sheetDataUrl) return;
      downloadDataUrl(sheetDataUrl, "avantika-all-tables-qr-sheet.png");
    } finally {
      setBusySheet(false);
    }
  };

  const handlePrintSheet = async () => {
    if (tables.length === 0) return;
    try {
      setBusySheet(true);
      const sheetDataUrl = await generateSheetDataUrl();
      if (!sheetDataUrl) return;
      const win = window.open("", "_blank", "noopener,noreferrer");
      if (!win) return;
      win.document.write(
        `<html><head><title>Avantika QR Sheet</title><style>body{margin:0;padding:20px;background:#fff}img{max-width:100%;height:auto;display:block;margin:0 auto}</style></head><body><img src="${sheetDataUrl}" alt="QR Sheet" /></body></html>`
      );
      win.document.close();
      win.focus();
      win.print();
    } finally {
      setBusySheet(false);
    }
  };

  return (
    <div className="section-wrap pt-32">
      <GlassCard
        title="Scan QR For Table Ordering"
        subtitle="Scan this code to open the menu with auto-selected table."
        className="mx-auto max-w-4xl"
      >
        <div className="flex flex-wrap items-center gap-3">
          {tables.map((t) => (
            <button
              key={t.id}
              className={`glass rounded-full px-4 py-2 text-sm ${selected === t.id ? "bg-white/20" : ""}`}
              onClick={() => setSelected(t.id)}
            >
              Table {t.id.replace("T", "")}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[320px_1fr]">
          <div className="glass flex h-[320px] w-[320px] items-center justify-center rounded-2xl p-3">
            <img
              src={qrPreviewUrl}
              alt={`QR for ${selected}`}
              className="h-full w-full rounded-xl bg-white object-contain p-2"
            />
          </div>
          <div className="space-y-4">
            <p className="text-white/70">QR target URL:</p>
            <div className="glass break-all rounded-xl p-3 text-sm text-white/90">{menuUrl}</div>
            <div className="flex flex-wrap gap-3">
              <a href={menuUrl}>
                <GlassButton>Open Menu Link</GlassButton>
              </a>
              <GlassButton variant="secondary" onClick={handleDownloadSingle} disabled={busySingle}>
                {busySingle ? "Preparing..." : "Download QR PNG"}
              </GlassButton>
              <GlassButton variant="secondary" onClick={handleDownloadSheet} disabled={busySheet}>
                {busySheet ? "Generating..." : "Download Printable Sheet"}
              </GlassButton>
              <GlassButton variant="ghost" onClick={handlePrintSheet} disabled={busySheet}>
                Print Sheet
              </GlassButton>
            </div>
            <p className="text-xs text-white/60">
              Customer can add items to cart without login, but checkout requires login.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
