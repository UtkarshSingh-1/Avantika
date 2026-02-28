import Link from "next/link";
import { GlassButton } from "../glass/GlassButton";

export function FooterSection() {
  return (
    <footer className="section-wrap pt-8">
      <div className="glass p-8 grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-display">Avantika Food Mall</h3>
          <p className="text-white/70 mt-3 max-w-md">
            Restaurant in Sultanpur serving authentic Indian cuisine with QR code
            restaurant ordering and elegant glass-inspired ambience.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/order">
              <GlassButton>Order Now</GlassButton>
            </Link>
            <Link href="/reservation">
              <GlassButton variant="secondary">Reserve Table</GlassButton>
            </Link>
          </div>
        </div>
        <div className="space-y-2 text-white/70 text-sm">
          <h4 className="text-white font-semibold">Quick Links</h4>
          <Link href="/menu" className="block hover:text-white">
            Menu
          </Link>
          <Link href="/order" className="block hover:text-white">
            Order
          </Link>
          <Link href="/reservation" className="block hover:text-white">
            Reservations
          </Link>
          <Link href="/login" className="block hover:text-white">
            Login
          </Link>
        </div>
        <div className="space-y-2 text-white/70 text-sm">
          <h4 className="text-white font-semibold">Visit Us</h4>
          <p>Awadh Road, Sultanpur, Uttar Pradesh</p>
          <p>Mon–Sun: 11:00 AM – 11:30 PM</p>
          <p>+91 90000 00000</p>
          <div className="flex gap-3 pt-2">
            <span className="glass px-3 py-1 rounded-full">Instagram</span>
            <span className="glass px-3 py-1 rounded-full">WhatsApp</span>
            <span className="glass px-3 py-1 rounded-full">Maps</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between text-sm text-white/50">
        <span>© 2026 Avantika Food Mall. All rights reserved.</span>
        <span>Online food order Sultanpur • best food near me</span>
      </div>
    </footer>
  );
}
