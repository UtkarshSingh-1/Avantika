import Link from "next/link";
import { useRouter } from "next/router";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { useUserStore } from "../store/useUserStore";
import { useOrderStore } from "../store/useOrderStore";

export function OrderPage() {
  const router = useRouter();
  const { phone, otpVerified, setPhone, setOtpVerified, login } = useUserStore();
  const { lastOrder } = useOrderStore();
  const canSendOtp = phone.trim().length >= 10;

  const sendGuestOtp = () => {
    if (!canSendOtp) return;
    setOtpVerified(true);
    login();
    router.push("/cart");
  };

  return (
    <div className="section-wrap pt-32">
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard title="Guest Order">
          <p className="text-white/70">
            Enter your phone to receive a demo OTP (1234). Fastest way to place
            a table order.
          </p>
          <input
            className="glass glass-hover mt-4 w-full rounded-full px-4 py-2 text-white"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="mt-4 flex gap-3">
            <GlassButton disabled={!canSendOtp} onClick={sendGuestOtp}>
              Send OTP
            </GlassButton>
            <Link href="/otp">
              <GlassButton variant="secondary">Go to OTP</GlassButton>
            </Link>
          </div>
        </GlassCard>

        <GlassCard title="Account Login">
          <p className="text-white/70">
            Login to track all orders and get priority reservations.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/login">
              <GlassButton>Login</GlassButton>
            </Link>
            <Link href="/signup">
              <GlassButton variant="secondary">Create Account</GlassButton>
            </Link>
          </div>
          <div className="mt-6 text-sm text-white/60">
            OTP verified: {otpVerified ? "Yes" : "No"}
          </div>
        </GlassCard>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <GlassCard title="Order Status">
          {lastOrder ? (
            <>
              <div className="text-lg font-semibold">
                Order #{lastOrder.id}
              </div>
              <div className="text-white/70 mt-2">
                Status: {lastOrder.status}
              </div>
            </>
          ) : (
            <p className="text-white/70">No orders yet. Place one from the cart.</p>
          )}
        </GlassCard>
        <GlassCard title="Scan & Order">
          <p className="text-white/70">
            Use QR code restaurant ordering for your table. The system will auto
            assign table number.
          </p>
          <GlassButton className="mt-4" onClick={() => router.push("/scan")}>
            Scan QR
          </GlassButton>
        </GlassCard>
        <GlassCard title="Reserve Table">
          <p className="text-white/70">
            Plan ahead with table reservation restaurant options and custom menu
            packages.
          </p>
          <GlassButton
            variant="secondary"
            className="mt-4"
            onClick={() => router.push("/reservation")}
          >
            Reserve Table
          </GlassButton>
        </GlassCard>
      </div>
    </div>
  );
}
