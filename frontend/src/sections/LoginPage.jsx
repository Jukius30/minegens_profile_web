import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        // Berhasil login, sesi otomatis tersimpan di browser
        navigate("/admin");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d1117",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#161b22",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <span
            style={{
              color: "#38bdf8",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Restricted Area
          </span>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "22px",
              marginTop: "8px",
              fontWeight: 700,
            }}
          >
            Admin Panel Login
          </h2>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#f87171",
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                color: "#8b949e",
                fontSize: "13px",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "#0d1117",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "6px",
                color: "#ffffff",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                color: "#8b949e",
                fontSize: "13px",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "#0d1117",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "6px",
                color: "#ffffff",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              padding: "12px",
              backgroundColor: loading ? "#0284c7" : "#38bdf8",
              color: "#0f172a",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Memverifikasi..." : "Masuk ke Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}