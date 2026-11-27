import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "../../assets/images/logo.svg";
import LoginMain from "../../assets/images/login-main.png";
import { isAuthenticated, setAuth } from "../../utils/auth";

export default function DashboardLoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const login = formData.get("login");
    const password = formData.get("password");

    try {
      setLoading(true);
      const response = await fetch(
        "https://blogify-oquvchi.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const token = typeof data === "string" ? data : data.token;
      setAuth({ token });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-2 bg-white">
      <div className="flex flex-col justify-between px-20 py-10">
        <div className="my-auto">
          <div className="mx-auto w-full max-w-[400px]">
            <Link to="/" className="inline-flex w-fit rounded-md">
              <img src={Logo} alt="Blogify logo" className="h-7 w-auto" />
            </Link>
          </div>
          <div className="mx-auto mt-2 w-full max-w-[400px]">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] transition hover:text-[#0F1729]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8">
              <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
                Welcome Back
              </h1>
              <p className="mt-1 text-sm text-[#6B7280]">
                Enter your credentials to access your account
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="login"
                    className="block text-sm font-medium text-[#0F1729]"
                  >
                    Email
                  </label>
                  <input
                    id="login"
                    name="login"
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#0F1729] outline-none transition focus:border-[#4346EF]"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#0F1729]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#0F1729] outline-none transition focus:border-[#4346EF]"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-lg bg-[#4346EF] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3538d4] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-[#6B7280]">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#4346EF] hover:underline pointer-events-none"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>

      <div className="flex flex-col items-center justify-center bg-[#F3F0FF] px-8 py-12 text-center">
        <img
          src={LoginMain}
          alt="Start writing your stories"
          width={576}
          height={576}
          className="h-[576px] w-[576px] max-w-full rounded-[16px] object-cover"
        />

        <h2 className="text-lg font-bold text-[#0F1729]">
          Start writing your stories
        </h2>
        <p className="mt-1 text-sm text-[#6B7280]">
          Join thousands of creators sharing their stories on Blogify
        </p>
      </div>
    </div>
  );
}
