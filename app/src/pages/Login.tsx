import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlassCard } from "../components/glass/GlassCard";
import { useUserStore } from "../store/useUserStore";
import { useAdminStore } from "../store/useAdminStore";
import { useAuthStore } from "../store/useAuthStore";

export function LoginPage() {
  const router = useRouter();
  const { setEmail } = useUserStore();
  const { login: adminLogin } = useAdminStore();
  const { user, loadSession } = useAuthStore();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUserLogin = async () => {
    setError("");
    if (!emailInput.trim() || !passwordInput.trim()) {
      setError("Enter email and password to continue.");
      return;
    }
    setEmail(emailInput.trim());
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput.trim(),
        password: passwordInput.trim(),
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed.");
      return;
    }
    const data = await res.json();
    if (data.role === "admin") {
      adminLogin();
      router.push("/admin");
      return;
    }
    router.push("/");
  };

  const handleLogin = async () => {
    await handleUserLogin();
  };

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        adminLogin();
        router.push("/admin");
        return;
      }
      router.push("/");
    }
  }, [user, adminLogin, router]);

  return (
    <div className="section-wrap pt-32 flex justify-center">
      <GlassCard className="max-w-lg w-full">
        <form className="auth-form">
          <div className="flex flex-col">
            <label className="auth-label">Email</label>
          </div>
          <div className="auth-inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
            <input
              className="auth-input"
              placeholder="Enter your Email"
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="auth-label">Password</label>
          </div>
          <div className="auth-inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-64 0 512 512">
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
            </svg>
            <input
              className="auth-input"
              placeholder="Enter your Password"
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button
              type="button"
              className="text-xs text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="auth-row">
            <span />
            <span className="auth-span" onClick={() => router.push("/forgot-password")}>
              Forgot password?
            </span>
          </div>

          <button type="button" className="auth-submit" onClick={handleLogin}>
            Sign In
          </button>

          <p className="auth-p">
            Don't have an account?{" "}
            <Link href="/signup" className="auth-span">
              Sign Up
            </Link>
          </p>
          <p className="auth-p">Or With</p>

          <div className="auth-row">
            <button
              type="button"
              className="auth-btn"
              onClick={() => (window.location.href = "/api/auth/google")}
            >
              <svg
                viewBox="0 0 512 512"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                C103.821,274.792,107.225,292.797,113.47,309.408z"
                  fill="#FBBB00"
                />
                <path
                  d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                  fill="#518EF8"
                />
                <path
                  d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                  fill="#28B446"
                />
                <path
                  d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                C318.115,0,375.068,22.126,419.404,58.936z"
                  fill="#F14336"
                />
              </svg>
              Google
            </button>
          </div>

          {user && (
            <div className="auth-p">
              Logged in as {user.name} ({user.email})
            </div>
          )}
          {error && <p className="mt-4 text-sm text-red-200">{error}</p>}
          <div className="mt-4 text-sm text-white/80">
            OTP is required for first-time signup only.
          </div>
          <div className="mt-2 text-xs text-white/70">
            Demo admin: <span className="text-white">admin@avantika.com</span> /{" "}
            <span className="text-white">admin123</span>
          </div>
          <div className="mt-1 text-xs text-white/70">
            Demo user: <span className="text-white">user@avantika.com</span> /{" "}
            <span className="text-white">user123</span>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
