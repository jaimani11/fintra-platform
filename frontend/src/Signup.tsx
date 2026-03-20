import { useState } from "react";
import { motion } from "framer-motion";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      // After successful signup
      window.location.href = "/app";
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10"
      >
        <h1 className="text-2xl font-bold mb-2">
          Create your workspace
        </h1>

        <p className="text-slate-600 text-sm mb-8">
          Start your Decision Operating System.
        </p>

        <input
          type="email"
          className="border border-slate-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Start Free Trial"}
        </button>

        <p className="text-xs text-slate-400 mt-6 text-center">
          No credit card required.
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
