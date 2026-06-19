import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

const PASSWORD = "Holabeba";
const STORAGE_KEY = "gian-lucca-auth";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center px-4 sm:px-6"
      style={{
        background: "linear-gradient(180deg, #c5e0ec 0%, #e8f2f6 50%, #fbf7f0 100%)",
      }}
    >
      <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-elevated p-8 sm:p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-green/10 flex items-center justify-center">
          <Lock className="w-8 h-8 text-sage-green" />
        </div>
        <h1 className="font-fredoka text-2xl sm:text-3xl font-semibold text-dark-brown mb-2">
          Family Site
        </h1>
        <p className="font-quicksand text-soft-brown mb-6">
          Enter the password to continue
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border-2 border-sage-green/20 font-quicksand text-dark-brown placeholder:text-soft-brown/50 focus:outline-none focus:border-sage-green transition-colors"
          />
          {error && (
            <p className="font-quicksand text-sm text-red-400">
              Incorrect password. Try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full font-fredoka text-base px-6 py-3.5 rounded-button transition-all duration-200 hover:scale-[1.02] bg-sage-green text-white hover:bg-hover-green"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
