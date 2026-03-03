import { useState } from "react";

const SECRET = "adminTester";
const STORAGE_KEY = "aqn_access_granted";

interface Props {
  children: React.ReactNode;
}

const SecretKeyGate = ({ children }: Props) => {
  const [granted, setGranted] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === SECRET) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setGranted(true);
    } else {
      setError("Invalid secret key. Try again.");
      setInput("");
    }
  };

  if (granted) return <>{children}</>;

  return (
    <>
      {/* Blurred background */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-card border border-border rounded-2xl shadow-2xl p-8 w-full max-w-sm space-y-6">

          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Access Restricted</h2>
            <p className="text-sm text-muted-foreground">
              Enter the secret key to access AquaNex.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Secret Key</label>
              <input
                type="password"
                autoFocus
                placeholder="Enter access key"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Unlock
            </button>
          </form>

        </div>
      </div>
    </>
  );
};

export default SecretKeyGate;
