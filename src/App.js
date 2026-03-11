import { useState, useEffect, useCallback } from "react";

const SPREADSHEET_ID = "1ldA2NBY4iR3DgrJSyY8dFRv2Vn0-uTFR4-ierDiMxOQ";

// --- Icon Components ---
const Icons = {
  globe: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  share: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  "map-pin": () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  "file-text": () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  clipboard: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  briefcase: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  calendar: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  truck: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  user: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  logout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  externalLink: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
};

const GetIcon = ({ name }) => {
  const IconComp = Icons[name] || Icons.globe;
  return <IconComp />;
};

// Category colors
const catColors = {
  Website: { bg: "#FFF3E0", border: "#FF9800", text: "#E65100", accent: "#FF9800" },
  Document: { bg: "#E8F5E9", border: "#4CAF50", text: "#1B5E20", accent: "#4CAF50" },
  Business: { bg: "#E3F2FD", border: "#2196F3", text: "#0D47A1", accent: "#2196F3" },
};

const getCatColor = (cat) => catColors[cat] || catColors.Website;

// --- API helper to fetch from Google Sheets via Anthropic ---
async async function fetchSheetData(sheetRange) {
  try {
    // This fetches your Google Sheet data as a CSV (Public access required)
    const sheetName = sheetRange.split('!')[0];
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
    
    const response = await fetch(url);
    const text = await response.text();
    
    // Google returns a weird prefix "/*O_o*/ google.visualization.Query.setResponse(...)"
    // We strip it to get the pure JSON
    const jsonData = JSON.parse(text.substring(47, text.length - 2));
    
    const rows = jsonData.table.rows.map(row => 
      row.c.map(cell => cell ? (cell.v || "") : "")
    );
    const headers = jsonData.table.cols.map(col => col.label);
    
    return { data: [headers, ...rows] };
  } catch (err) {
    console.error("Sheet fetch error:", err);
    return null;
  }
}

// --- Login Page ---
function LoginPage({ onLogin, error, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.loginWrapper}>
      <div style={styles.loginDecor1} />
      <div style={styles.loginDecor2} />
      <div style={styles.loginDecor3} />

      <div style={styles.loginCard}>
        {/* Brand Header */}
        <div style={styles.brandSection}>
          <div style={styles.logoCircle}>
            <span style={styles.logoText}>RS</span>
          </div>
          <h1 style={styles.brandName}>Raghuvir Sweets</h1>
          <p style={styles.brandSub}>& Bakers</p>
          <div style={styles.brandDivider}>
            <span style={styles.brandDividerDot} />
          </div>
        </div>

        {/* Form */}
        <div style={styles.formSection}>
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>
              <GetIcon name="user" />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && onLogin(username, password)}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>
              <GetIcon name="lock" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && onLogin(username, password)}
            />
          </div>

          {error && <div style={styles.errorMsg}>{error}</div>}

          <button
            onClick={() => onLogin(username, password)}
            disabled={loading}
            style={{
              ...styles.loginBtn,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <span style={styles.spinner} />
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        <p style={styles.footerNote}>Login credentials managed via Google Sheets</p>
      </div>
    </div>
  );
}

// --- Link Card ---
function LinkCard({ link, index }) {
  const colors = getCatColor(link.category);
  const delay = index * 60;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...styles.linkCard,
        borderLeft: `4px solid ${colors.border}`,
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px ${colors.border}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      <div style={{ ...styles.linkIconWrap, background: colors.bg, color: colors.accent }}>
        <GetIcon name={link.icon} />
      </div>
      <div style={styles.linkInfo}>
        <div style={styles.linkName}>{link.name}</div>
        <div style={styles.linkDesc}>{link.description}</div>
        <span style={{ ...styles.catBadge, background: colors.bg, color: colors.text }}>
          {link.category}
        </span>
      </div>
      <div style={styles.linkArrow}>
        <GetIcon name="externalLink" />
      </div>
    </a>
  );
}

// --- Dashboard ---
function Dashboard({ user, links, onLogout, onRefresh, loading }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(links.map((l) => l.category))];
  const filtered = filter === "All" ? links : links.filter((l) => l.category === filter);

  return (
    <div style={styles.dashWrapper}>
      {/* Top Bar */}
      <header style={styles.topBar}>
        <div style={styles.topBarInner}>
          <div style={styles.topBarLeft}>
            <div style={styles.topBarLogo}>RS</div>
            <div>
              <h1 style={styles.topBarTitle}>Raghuvir Sweets & Bakers</h1>
              <p style={styles.topBarSub}>Link Dashboard</p>
            </div>
          </div>
          <div style={styles.topBarRight}>
            <span style={styles.userBadge}>
              <GetIcon name="user" />
              <span style={{ marginLeft: 6 }}>{user.fullName}</span>
            </span>
            <button onClick={onRefresh} style={styles.refreshBtn} title="Refresh links">
              <GetIcon name="refresh" />
            </button>
            <button onClick={onLogout} style={styles.logoutBtn}>
              <GetIcon name="logout" />
              <span style={{ marginLeft: 6 }}>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Filter Pills */}
        <div style={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                ...styles.filterPill,
                ...(filter === cat ? styles.filterPillActive : {}),
              }}
            >
              {cat}
              {cat !== "All" && (
                <span style={styles.filterCount}>
                  {links.filter((l) => l.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Links Grid */}
        {loading ? (
          <div style={styles.loadingState}>
            <div style={styles.loadingSpinnerLg} />
            <p style={{ marginTop: 16, color: "#888" }}>Loading links from Google Sheets...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={{ fontSize: 18, color: "#999" }}>No links found in this category.</p>
          </div>
        ) : (
          <div style={styles.linksGrid}>
            {filtered.map((link, i) => (
              <LinkCard key={link.name + i} link={link} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Powered by Google Sheets &bull; {links.length} links available</p>
      </footer>

      {/* Animation keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes floatDecor {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -20px) rotate(120deg); }
          66% { transform: translate(-20px, 15px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
}

// --- Main App ---
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [linksLoading, setLinksLoading] = useState(false);

  const loadLinks = useCallback(async () => {
    setLinksLoading(true);
    const result = await fetchSheetData("Links!A1:E100");
    if (result && result.data && result.data.length > 1) {
      const headers = result.data[0];
      const rows = result.data.slice(1);
      const parsed = rows
        .filter((r) => r[0] && r[1])
        .map((r) => ({
          name: r[0] || "",
          url: r[1] || "",
          category: r[2] || "Website",
          icon: r[3] || "globe",
          description: r[4] || "",
        }));
      setLinks(parsed);
    }
    setLinksLoading(false);
  }, []);

  const handleLogin = async (username, password) => {
    if (!username || !password) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    // Fetch users from sheet
    const result = await fetchSheetData("Users!A1:D100");
    if (result && result.data && result.data.length > 1) {
      const rows = result.data.slice(1); // skip headers
      const match = rows.find(
        (r) => r[0]?.toLowerCase() === username.toLowerCase() && r[1] === password
      );

      if (match) {
        const user = {
          username: match[0],
          role: match[2] || "staff",
          fullName: match[3] || match[0],
        };
        setCurrentUser(user);
        setUsers(rows);
        await loadLinks();
      } else {
        setLoginError("Invalid username or password. Check your Google Sheet.");
      }
    } else {
      setLoginError("Could not connect to Google Sheets. Please try again.");
    }

    setLoginLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLinks([]);
    setLoginError("");
  };

  if (!currentUser) {
    return (
      <LoginPage
        onLogin={handleLogin}
        error={loginError}
        loading={loginLoading}
      />
    );
  }

  return (
    <Dashboard
      user={currentUser}
      links={links}
      onLogout={handleLogout}
      onRefresh={loadLinks}
      loading={linksLoading}
    />
  );
}

// --- Styles ---
const styles = {
  // Login
  loginWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(145deg, #1a0a02 0%, #3e1a08 30%, #6d2b0a 60%, #8B4513 100%)",
    fontFamily: "'DM Sans', sans-serif",
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  loginDecor1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,152,0,0.15) 0%, transparent 70%)",
    top: "-5%",
    right: "-5%",
    animation: "floatDecor 20s ease-in-out infinite",
  },
  loginDecor2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,193,7,0.1) 0%, transparent 70%)",
    bottom: "10%",
    left: "-3%",
    animation: "floatDecor 15s ease-in-out infinite reverse",
  },
  loginDecor3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,87,34,0.1) 0%, transparent 70%)",
    top: "40%",
    left: "60%",
    animation: "floatDecor 18s ease-in-out infinite",
  },
  loginCard: {
    background: "rgba(255,255,255,0.97)",
    borderRadius: 24,
    padding: "48px 40px 36px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
    position: "relative",
    zIndex: 2,
    animation: "fadeSlideUp 0.6s ease-out",
  },
  brandSection: {
    textAlign: "center",
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    boxShadow: "0 8px 24px rgba(139,69,19,0.3)",
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 30,
    fontWeight: 800,
    color: "#FFF",
    letterSpacing: 2,
  },
  brandName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 26,
    fontWeight: 700,
    color: "#3e1a08",
    margin: 0,
    letterSpacing: 0.5,
  },
  brandSub: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16,
    color: "#8B4513",
    margin: "2px 0 0",
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  brandDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  brandDividerDot: {
    width: 40,
    height: 3,
    borderRadius: 2,
    background: "linear-gradient(90deg, transparent, #CD853F, transparent)",
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    color: "#8B4513",
    opacity: 0.5,
    display: "flex",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "16px 16px 16px 50px",
    border: "2px solid #e8ddd4",
    borderRadius: 14,
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "all 0.2s ease",
    background: "#faf7f4",
    color: "#3e1a08",
    boxSizing: "border-box",
  },
  errorMsg: {
    background: "#FFF3E0",
    color: "#E65100",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    border: "1px solid #FFCC80",
    textAlign: "center",
  },
  loginBtn: {
    padding: "16px",
    background: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 16px rgba(139,69,19,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  spinner: {
    width: 20,
    height: 20,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
  footerNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#bbb",
    marginTop: 20,
    marginBottom: 0,
  },

  // Dashboard
  dashWrapper: {
    minHeight: "100vh",
    background: "#f7f3ef",
    fontFamily: "'DM Sans', sans-serif",
  },
  topBar: {
    background: "linear-gradient(135deg, #3e1a08 0%, #6d2b0a 50%, #8B4513 100%)",
    padding: "0 24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  topBarInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 0",
    flexWrap: "wrap",
    gap: 12,
  },
  topBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  topBarLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 800,
    color: "#FFD89B",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    fontFamily: "'Playfair Display', serif",
  },
  topBarSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    margin: 0,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  userBadge: {
    display: "flex",
    alignItems: "center",
    padding: "6px 14px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: 500,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  refreshBtn: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "8px 10px",
    color: "rgba(255,255,255,0.8)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
    background: "rgba(255,82,82,0.15)",
    border: "1px solid rgba(255,82,82,0.2)",
    borderRadius: 10,
    color: "#FF8A80",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  mainContent: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "28px 24px",
  },
  filterRow: {
    display: "flex",
    gap: 10,
    marginBottom: 28,
    flexWrap: "wrap",
  },
  filterPill: {
    padding: "8px 20px",
    borderRadius: 100,
    border: "2px solid #e0d5ca",
    background: "#fff",
    color: "#8B7355",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  filterPillActive: {
    background: "linear-gradient(135deg, #8B4513, #A0522D)",
    color: "#fff",
    borderColor: "#8B4513",
    boxShadow: "0 3px 12px rgba(139,69,19,0.25)",
  },
  filterCount: {
    fontSize: 11,
    fontWeight: 700,
    background: "rgba(0,0,0,0.08)",
    borderRadius: 100,
    padding: "1px 7px",
  },
  linksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 16,
  },
  linkCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "20px",
    background: "#fff",
    borderRadius: 16,
    textDecoration: "none",
    color: "inherit",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    transition: "all 0.25s ease",
    animation: "fadeSlideUp 0.4s ease-out both",
    cursor: "pointer",
  },
  linkIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  linkInfo: {
    flex: 1,
    minWidth: 0,
  },
  linkName: {
    fontSize: 15,
    fontWeight: 600,
    color: "#2d1810",
    marginBottom: 3,
  },
  linkDesc: {
    fontSize: 13,
    color: "#999",
    marginBottom: 6,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  catBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 100,
    display: "inline-block",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  linkArrow: {
    color: "#ccc",
    flexShrink: 0,
  },
  loadingState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  loadingSpinnerLg: {
    width: 40,
    height: 40,
    border: "3px solid #e8ddd4",
    borderTopColor: "#8B4513",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    margin: "0 auto",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    color: "#bbb",
    fontSize: 13,
    borderTop: "1px solid #e8ddd4",
    marginTop: 40,
  },
};
