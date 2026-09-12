import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      // Simpan token ke localStorage browser
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white min-vh-100 d-flex flex-column justify-content-between" style={{ backgroundColor: "#0f172a" }}>
      <Navbar />

      <main className="container-xl py-5 flex-grow-1 d-flex align-items-center justify-content-center" style={{ marginTop: "80px" }}>
        <div className="p-4 p-sm-5 rounded-3 border border-white border-opacity-10 w-100 shadow" style={{ maxWidth: "420px", backgroundColor: "#161b26" }}>
          
          <div className="text-center mb-4">
            <span className="small text-uppercase fw-semibold" style={{ color: "#2f74ff" }}>Portal Staff</span>
            <h1 className="h4 fw-bold text-white mt-1">Admin Login</h1>
          </div>

          {error && (
            <div className="p-2.5 mb-3 rounded border border-danger border-opacity-25 bg-danger bg-opacity-10 text-danger small text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            <div>
              <label className="small text-white-50 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control text-white border-white border-opacity-10 rounded-2"
                style={{ backgroundColor: "#0f172a" }}
                placeholder="admin@minegens.id"
              />
            </div>

            <div>
              <label className="small text-white-50 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control text-white border-white border-opacity-10 rounded-2"
                style={{ backgroundColor: "#0f172a" }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary mt-2 py-2 fw-semibold rounded-2"
              style={{ backgroundColor: "#2f74ff", border: "none" }}
            >
              {loading ? "Memproses..." : "Masuk ke Dashboard"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}