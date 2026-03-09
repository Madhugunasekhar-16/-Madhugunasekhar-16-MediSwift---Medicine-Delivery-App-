import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user || user.role === "admin") {
        setCartCount(0);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok && data.items) {
          const totalItems = data.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          setCartCount(totalItems);
        }
      } catch (error) {
        console.error("Error fetching cart count", error);
      }
    };
    fetchCartCount();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#EEF4FF",
        borderBottom: "1px solid #C7D9F8",
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        padding: "14px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* LOGO — "MediSwift" with colored Medi, no box */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: "1.5rem",
          fontWeight: "800",
          letterSpacing: "-0.5px",
        }}
      >
        <span style={{ color: "#2563EB" }}>Medi</span>
        <span style={{ color: "#1e293b" }}>Swift</span>
      </Link>

      {/* RIGHT SIDE NAV */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>

        {/* Always-visible links */}
        <Link
          to="/"
          style={{
            color: "#2563EB",
            fontWeight: "600",
            textDecoration: "none",
            fontSize: "0.95rem",
            borderBottom: "2px solid #2563EB",
            paddingBottom: "2px",
          }}
        >
          Home
        </Link>

        <Link
          to="/medicines"
          style={{
            color: "#374151",
            fontWeight: "500",
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          Medicines
        </Link>

        {user ? (
          <>
            {user.role === "admin" ? (
              <Link
                to="/admin-dashboard"
                style={{
                  color: "#2563EB",
                  fontWeight: "700",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.95rem",
                }}
              >
                <FaChartLine /> Admin Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/cart"
                  style={{
                    color: "#374151",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    position: "relative",
                    fontWeight: "500",
                    fontSize: "0.95rem",
                  }}
                >
                  <FaShoppingCart /> Cart
                  {cartCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-12px",
                        backgroundColor: "#EF4444",
                        color: "white",
                        fontSize: "10px",
                        width: "16px",
                        height: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        border: "1px solid white",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/my-orders"
                  style={{
                    color: "#374151",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "0.95rem",
                  }}
                >
                  My Orders
                </Link>
              </>
            )}

            <div
              style={{
                height: "24px",
                width: "1px",
                backgroundColor: "#CBD5E1",
              }}
            />

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#ffffff",
                color: "#1d4ed8",
                border: "1px solid #BFDBFE",
                padding: "5px 14px",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              <FaUser style={{ fontSize: "11px" }} />
              {user.name} {user.role === "admin" && "(Admin)"}
            </span>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#EF4444",
                color: "#ffffff",
                padding: "7px 18px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          /* GUEST STATE — matches reference exactly */
          <>
            <Link
              to="/login"
              style={{
                border: "1.5px solid #2563EB",
                color: "#2563EB",
                padding: "7px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "600",
                backgroundColor: "transparent",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                backgroundColor: "#2563EB",
                color: "#ffffff",
                padding: "7px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;