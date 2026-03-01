import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { GlassCard } from "../../components/glass/GlassCard";
import { GlassButton } from "../../components/glass/GlassButton";
import { GlassModal } from "../../components/glass/GlassModal";
import { api } from "../../lib/api";
import type { Table } from "../../types";

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function AdminTables() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedQrTable, setSelectedQrTable] = useState<Table | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrLoading, setQrLoading] = useState(false);

  const origin = useMemo(() => (typeof window !== "undefined" ? window.location.origin : "https://avantika-sigma.vercel.app"), []);

  const loadTables = async () => {
    const data = await api.get<Table[]>("/tables");
    setTables(data);
  };

  useEffect(() => {
    loadTables().catch(() => setTables([]));
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!selectedQrTable) {
        setQrDataUrl("");
        return;
      }
      setQrLoading(true);
      try {
        const target = `${origin}/menu?table=${encodeURIComponent(selectedQrTable.id)}`;
        const png = await QRCode.toDataURL(target, {
          width: 720,
          margin: 2,
          color: { dark: "#111111", light: "#ffffff" },
        });
        setQrDataUrl(png);
      } finally {
        setQrLoading(false);
      }
    };
    run();
  }, [origin, selectedQrTable]);

  const toggle = async (id: string, occupied: boolean) => {
    try {
      const updated = await api.patch<Table>(`/tables/${id}`, { occupied: !occupied });
      setTables((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      // ignore for demo
    }
  };

  const addTable = async () => {
    setLoading(true);
    try {
      const created = await api.post<Table>("/tables", {});
      setTables((prev) => [...prev, created]);
    } finally {
      setLoading(false);
    }
  };

  const deleteTable = async (id: string) => {
    try {
      await api.delete<Table>(`/tables/${id}`);
      setTables((prev) => prev.filter((t) => t.id !== id));
    } catch {
      // ignore for demo
    }
  };

  const downloadQr = () => {
    if (!selectedQrTable || !qrDataUrl) return;
    downloadDataUrl(qrDataUrl, `table-${selectedQrTable.id.toLowerCase()}-qr.png`);
  };

  const printQr = () => {
    if (!selectedQrTable || !qrDataUrl) return;
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) return;
    win.document.write(
      `<html><head><title>Table ${selectedQrTable.id} QR</title><style>body{font-family:Arial;padding:24px;text-align:center}img{max-width:100%;height:auto}h1{font-size:28px}</style></head><body><h1>Table ${selectedQrTable.id.replace("T", "")}</h1><img src="${qrDataUrl}" alt="QR" /></body></html>`
    );
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <>
      <GlassModal
        open={Boolean(selectedQrTable)}
        onClose={() => setSelectedQrTable(null)}
        title={selectedQrTable ? `Table ${selectedQrTable.id.replace("T", "")} QR` : "Table QR"}
      >
        {qrLoading ? (
          <p className="text-white/70">Generating QR...</p>
        ) : (
          <>
            {qrDataUrl && <img src={qrDataUrl} alt="Table QR" className="mx-auto w-full max-w-[320px] rounded-xl bg-white p-3" />}
            <div className="mt-4 flex gap-2">
              <GlassButton onClick={downloadQr}>Download PNG</GlassButton>
              <GlassButton variant="secondary" onClick={printQr}>Print</GlassButton>
            </div>
          </>
        )}
      </GlassModal>

      <GlassCard title="Tables" subtitle="Assign, add, remove, and get printable QR per table.">
        <div className="mb-4 flex gap-2">
          <GlassButton onClick={addTable} disabled={loading}>
            {loading ? "Adding..." : "Add Table"}
          </GlassButton>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => {
            const isOccupied = table.occupied;
            return (
              <div key={table.id} className="rounded-2xl border border-white/10 p-3">
                <div className="mb-3">
                  <div className="font-semibold">Table {table.id.replace("T", "")}</div>
                  <div className="text-sm text-white/60">{isOccupied ? "Occupied" : "Free"}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <GlassButton variant={isOccupied ? "primary" : "secondary"} onClick={() => toggle(table.id, isOccupied)}>
                    {isOccupied ? "Release" : "Assign"}
                  </GlassButton>
                  <GlassButton variant="secondary" onClick={() => setSelectedQrTable(table)}>
                    Get QR
                  </GlassButton>
                  <GlassButton variant="ghost" onClick={() => deleteTable(table.id)}>
                    Delete
                  </GlassButton>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </>
  );
}
