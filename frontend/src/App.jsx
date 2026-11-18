/*  ====================  Frontend – React app  ====================  */
import { useEffect, useState, useMemo } from "react";
import { api } from "./api";
import ElasticGallery from "./components/ui/ElasticGallery";
import { JobCarousel, JobCarouselCard } from "./components/ui/JobCarousel";
import { getCompanyLogo, getCompanyTheme } from "./companyLogos";

/* -----------------  Constants  ----------------- */
const STATUS = ["Applied", "Interview", "Review", "Offer", "Rejected"];
const COL = {
  Applied: "var(--s-applied)",
  Interview: "var(--s-interview)",
  Review: "var(--s-review)",
  Offer: "var(--s-offer)",
  Rejected: "var(--s-rejected)"
};
const NAV = [
  ["dashboard", "Dashboard", "home"],
  ["applications", "My Applications", "file"],
  ["tracker", "Application Tracker", "pin"],
  ["calendar", "Interview Calendar", "cal"],
  ["jobs", "Find Jobs", "search"],
  ["saved", "Saved Jobs", "bookmark"],
  ["analytics", "Analytics & Reports", "chart"],
  ["profile", "My Profile", "user"],
  ["docs", "Resume & Documents", "clip"],
  ["notifications", "Notifications", "bell"],
  ["settings", "Settings", "sliders"]
];
const ADMIN_NAV = [
  ["adash", "Dashboard", "home"],
  ["ajobs", "Manage Jobs", "brief"],
  ["aapps", "Applications", "file"],
  ["ausers", "Users", "users"],
  ["aprofile", "Admin Profile", "user"],
  ["settings", "Settings", "sliders"]
];
const TABS = { About: "about", Education: "edu", Skills: "skills", Experience: "exp" };

/* -----------------  Helper hooks  ----------------- */
const useLS = (k , d) => {
  const [v, set] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  });
  useEffect(() => localStorage.setItem(k, JSON.stringify(v)), [k, v]);
  return [v, set];
};

const fmt = (d) => {
  if (!d) {
   return "—";
  }
  try {
    return new Date(d + (d.includes("T") ? "" : "T00:00")).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  } catch {
    return d;
  }
};

const hue = (s) => [...(s || "?")].reduce((a, c) => a + c.charCodeAt(0), 0) % 45 + 10;

/* -----------------  SVG icon map  ----------------- */
const P = {
  home: "M3 11.5 12 4l9 7.5M5 10v10h5v-6h4v6h5V10",
  file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
  bookmark: "M6 3h12v18l-6-4-6 4z",
  chart: "M4 20h17M7 20v-7M12 20V6M17 20v-10",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  clip: "M21 12.5 12.7 21a5.5 5.5 0 0 1-7.8-7.8l8.5-8.5a3.7 3.7 0 0 1 5.2 5.2l-8.4 8.5a1.8 1.8 0 0 1-2.6-2.6l7.8-7.8",
  bell: "M6 16v-5a6 6 0 1 1 12 0v5l2 2H4zM10 21h4",
  sliders:"M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4",
  logout: "M9 21H5V3h4M16 17l5-5-5-5M21 12H9",
  brief: "M3 8h18v12H3zM9 8V5h6v3M3 13h18",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M17 4a4 4 0 0 1 0 7M22 21a7 7 0 0 0-4-6",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  calcheck: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M9 15l2 2 4-4",
  gift: "M3 9h18v4H3zM5 13v8h14v-8M12 9v12M12 9S10 4 8 5s0 4 4 4zM12 9s2-5 4-4 0 4-4 4",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  trophy:"M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8M10 18h4" ,
  shield: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6",
  eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  upload:"M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7zM12 17v-6M9 13l3-3 3 3",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01",
  target:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 6l12 12M18 6 6 18",
    check: "M20 6 9 17l-5-5",
  edit: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4"
};

const I = ({ n, s = 20, f }) => (
  <svg
    className="i"
    style={{ "--s" : s + "px" }}
    viewBox="0 0 24 24"
    width={s}
    height={s}
    fill={f ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true" >
    <path d={P[n]} />
  </svg>
);

/* -----------------  Avatar component  ----------------- */
const Av = ({ n = "?", company = false }) => {
  if (company) {
    const logo = getCompanyLogo(n);
    return (
      <i className="av company-avatar" style={{ "--h": hue(n) }}>
        <img
          src={logo}
          alt={`${n} logo`}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            if (e.currentTarget.nextElementSibling) {
              e.currentTarget.nextElementSibling.style.display = "inline";
            }
          }}
        />
        <span className="company-avatar-fallback" style={{ display: "none" }}>
          {n ? n[0].toUpperCase() : "?"}
        </span>
      </i>
    );
  }

  return (
    <i className="av user-avatar" style={{ "--h": hue(n) }}>
      {n ? n[0].toUpperCase() : "?"}
    </i>
  );
};

/* -----------------  Header wrapper  ----------------- */
const Head = ({ t, s, children }) => (
  <div className="head">
    <div>
      <h1>{t}</h1>
      <p className="mu">{s}</p>
    </div>
    {children}
  </div>
);

/* -----------------  Tag component  ----------------- */
const Tag = ({ s }) => (
  <span className="tag" style={{ "--c": COL[s] || "var(--ln)" }}>
    {s}
  </span>
);

/* -----------------  Stat card  ----------------- */
const Stat = ({ i, l, v }) => (
  <div className="card stat">
    <i className="ic">
      <I n={i} />
    </i>
    <span className="mu">{l}</span>
    <b>{v}</b>
  </div>
);

/* -----------------  Helper: count by status  ----------------- */
const count = (apps, s) => apps.filter((a) => a.s === s).length;

/* -----------------  Donut chart  ----------------- */
function Donut({ apps, children }) {
  let p = 0;
  const bg = STATUS.map((s) => {
    const a = p;
    const w = ( count(apps, s) / (apps.length || 1 )) * 100;
    p += w;
    return `${COL[s]} ${a}% ${p}%`;
  }).join(",");

  return (
    <div className="dn">
      <div
        className="donut"
        style={{ background: apps.length ? `conic-gradient(${bg})` : "var(--ln)" }}
      >
        <b>{children}</b>
      </div>
      <div>
        {STATUS.map((s) => (
          <p className="lg" key={s} style={{ "--c": COL[s] }}>
            {s} ({count(apps, s)})
          </p>

        )) }
      </div>
    </div>
  );
}

/* ====================  Dashboard (home)  ==================== */
function Dash({ apps, go, me }) {
  const iv = apps
    .filter((a) => a.s === "Interview" && a.iv)
    .sort((a, b) => a.iv.localeCompare(b.iv))[0];
  const dt = iv && new Date(iv.iv + (iv.iv.includes("T") ? "" : "T00:00"));
  const pct = Math.round(((count(apps, "Interview") + count(apps, "Offer")) / (apps.length || 1)) * 100);

  return (
    <>
      <div className="card hero">
        <div>
          <h1>
            Welcome back, <span className="cap">{(me?.name || "User").split(" ")[0]}</span>!
          </h1>
          <p className="mu">Keep going! Your dream job is closer than you think.</p>
        </div>
        <span className="big">
          <I n="target" s={44} />
        </span>
      </div>

      <div className="g4">
        <Stat i="send" l="Total Applications" v={apps.length} />
        <Stat i="calcheck" l="Interviews" v={count(apps, "Interview")} />
        <Stat i="gift" l="Offers" v={count(apps, "Offer")} />
        <Stat i="clock" l="Pending" v={count(apps, "Applied") + count(apps, "Review")} />
      </div>

      <div className="g2">
        <div className="card">
          <h3>Application Progress</h3>
          <Donut apps={apps}>{pct}%</Donut>
        </div>

        <div className="card">
          <h3>Upcoming Interview</h3>
          {iv && dt ? (
            <div className="up">
              <span className="date">
                <b>{dt.getDate()}</b>
                {dt.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
              </span>
              <p>
                {iv.c}
                <br />
                <span className="mu">{iv.p}</span>
              </p>
            </div>
          ) : (
            <p className="mu up">
              No interview scheduled yet. It appears here once the admin schedules one.
            </p>
          )}
          <button className="btn" onClick={() => go("calendar")}>
            View Calendar
          </button>
        </div>
      </div>
    </>
  );
}

/* ====================  Applications list  ==================== */
function Apps({ apps, go, me }) {
  const [f, setF] = useState("");
  const filtered = apps.filter((a) => !f || a.s === f);

  return (
     <>
      <Head t="My Applications" s="Track all your job applications in one place." />
      <select className="applications-filter-select" aria-label="Filter" value={f} onChange={(e) => setF(e.target.value)}>
        <option value="">Filter: All</option>
        {STATUS.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <div className="application-card-list">
        {filtered.map((a) => (
          <article
            className="application-wide-card"
            data-company={String(a.c || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            key={a.id}
            style={{
              "--company-accent": ({
                "google": "#4285F4",
                "amazon web services": "#FF9900",
                "amazon": "#FF9900",
                "zoho": "#E42527",
                "microsoft": "#737373",
                "infosys": "#007CC3",
                "tcs": "#0067B1",
                "wipro": "#341C53",
                "accenture": "#A100FF",
                "ibm": "#052FAD",
                "hcl": "#0070AD",
                "deloitte": "#86BC25"
              })[String(a.c || "").trim().toLowerCase()] || "#B87558"
            }}
          >
            <div className="application-wide-main">
              <div className="application-card-banner">
                <Av n={a.c} company />
              </div>
              <div className="application-wide-info">
                <b> {a.c} </b>

                <p> {a.p} </p>
              </div>
            </div>

            <div className="application-wide-meta">
              <div>
                <small>Applied On</small>
                <span>{fmt(a.d)}</span>
              </div>
              <div>
                <small>Current Status</small>
                <Tag s={a.s} />
              </div>
            </div>

            <button className="btn2 application-view-button" onClick={() => go("details", a.id)}>
              <I n="eye" />
              View Details
            </button>
          </article>
        ))}

        {!filtered.length && (
          <p className="empty">{apps.length ? "No applications match this filter." : "No applications yet. Apply to jobs in the Find Jobs section."}</p>
        )}
      </div>
    </>
  );
}

/* ====================  Tracker page  ==================== */
function Track({ apps, sel, go }) {
  const a = apps.find((x) => String(x.id) === String(sel)) || apps[0];
  if (!a) {
    return <p className="empty">No applications yet. Add one to start tracking.</p>;
  }

  const isRejected = a.s === "Rejected";
  let steps, at;

  if (isRejected) {
    if (a.iv) {
      steps = [
        ["Applied", fmt(a.d)],
        ["Under Review", ""],
        ["Interview", fmt(a.iv)],
        ["Rejected", "Not Selected"],
      ];
      at = 3;
    } else {
      steps = [
        ["Applied", fmt(a.d)],
        ["Under Review", ""],
        ["Rejected", "Not Selected"],
      ];
      at = 2;
    }
  } else {
    at = { Applied: 0, Review: 1, Interview: 2, Offer: 3 }[a.s] ?? 0;
    steps = [
      ["Applied", fmt(a.d)],
      ["Under Review", ""],
      ["Interview", a.iv ? fmt(a.iv) : ""],
      ["Offer", ""],
    ];
  }

  return (
    <>
      <Head t="Application Tracker" s="Follow the status of your applications." />
      <select className="tracker-app-select" aria-label="Choose application"
        value={a.id}
        onChange={(e) => go("tracker", e.target.value)}
      >
        {apps.map((x) => (
          <option key={x.id} value={x.id}>
            {x.c} | {x.p}
          </option>
        ))}
      </select>

      <div className="tracker-page">
        <section
          className="tracker-overview-card application-wide-card"
          data-company={String(a.c || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        >
          <div className="tracker-overview-heading">
            <span className="tracker-section-label">APPLICATION OVERVIEW</span>
            <Tag s={a.s} />
          </div>

          <div className="tracker-company-info">
            <div className="application-card-banner">
              <Av n={a.c} company />
            </div>
            <div>
              <h2>{a.c || a.company || "Company not available"}</h2>
              <p>{a.p || a.position || a.jobTitle || "Position not available"}</p>
            </div>
          </div>

          <div className="tracker-overview-bottom">
            <div>
              <small>Applied On</small>
              <b>{fmt(a.d)}</b>
            </div>
            <button className="btn2" onClick={() => go("details", a.id)}>
              <I n="eye" />
              View Details
            </button>
          </div>
        </section>

        <section className="tracker-progress-card">
          <div className="tracker-section-heading">
            <h3>Application Progress</h3>
            <p>Follow each stage of your application journey.</p>
          </div>

          <div
            className="card steps tracker-steps"
            style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
          >
            {steps.map(([t, d], i) => {
              const isPassed = i < at;
              const isCurrent = i === at;
              const isRejectedStep = isRejected && isCurrent;

              return (
                <div
                  key={t}
                  className={
                    "step" +
                    (isPassed ? " done" : "") +
                    (isCurrent ? " now" : "") +
                    (isRejectedStep ? " rejected" : "")
                  }
                >
                  <i>{isRejectedStep ? "✕" : i <= at ? "✓" : ""}</i>
                  <b>{t}</b>
                  <small className="mu">
                    {isRejectedStep ? "Not Selected" : i <= at && d ? d : "—"}
                  </small>
                </div>
              );
            })}
          </div>
        </section>

        <section className={"tracker-status-card" + (isRejected ? " tracker-status-rejected" : "")}>
          <div
            className="tracker-status-icon"
            style={
              isRejected
                ? {
                    background: "color-mix(in srgb, var(--s-rejected, #EF5145) 14%, transparent)",
                    color: "var(--s-rejected, #EF5145)",
                  }
                : undefined
            }
          >
            <I n={isRejected ? "x" : "info"} s={22} />
          </div>
          <div>
            <h3 style={isRejected ? { color: "var(--s-rejected, #EF5145)" } : undefined}>
              {isRejected ? "Application Not Selected" : "Status Update"}
            </h3>
            <p className="mu">
              {isRejected
                ? a.notes ||
                  "Your application was reviewed and the hiring team has decided not to move forward for this position."
                : a.s === "Interview" && a.iv
                ? `Your interview is scheduled for ${fmt(a.iv)}.`
                : `Your application is currently marked "${a.s}". The admin updates this status.`}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

/* ====================  Application Details  ==================== */
function ApplicationDetails({ apps, sel, go }) {
  const a = apps.find((x) => String(x.id) === String(sel));
  if (!a) {
    return (
      <div className="card">
        <p className="empty">Application not found.</p>
        <button className="btn2" onClick={() => go("applications")}>
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <>
      <Head t="Application Details" s="View complete information about your job application." />
      <button className="btn2" onClick={() => go("applications")}>
        {"← Back to Applications"}
      </button>

      <div
        className="card det application-wide-card"
        data-company={String(a.c || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      >
        <div className="application-card-banner">
          <Av n={a.c} company />
        </div>
        <div>
          <h2>{a.c}</h2>
          <p className="mu">{a.p}</p>
        </div>
        <Tag s={a.s} />
      </div>

      <div className="g2">
        <div className="card">
          <h3>Application Information</h3>
          <div className="item">
            <span>Company Name</span>
            <b>{a.c || "Not available"}</b>
          </div>

          <div className="item">
            <span>Job Position</span>
            <b>{a.p || "Not available"}</b>
          </div>

          <div className="item">
            <span>Application Date</span>
            <b>{a.d ? fmt(a.d) : "Not available"}</b>
          </div>

          <div className="item">
            <span>Application ID</span>
            <b>{a.id}</b>
          </div>
        </div>

        <div className="card">
          <h3>Application Status</h3>
          <p className="mu">Current status</p>
          <Tag s={a.s} />
          <p className="mu">
            {a.s === "Interview" && a.iv
              ? "Your interview has been scheduled."
              : a.s === "Offer"
              ? "Congratulations! Your application has reached the offer stage."
              : a.s === "Rejected"
              ? "This application has been marked as rejected."
              : "Your application status will be updated by the administrator."}
          </p>

          <div className="divider" />
          <h3>Interview Information</h3>
          <p>{a.iv ? `Interview Date: ${fmt(a.iv)}` : "No interview date has been scheduled yet."}</p>
        </div>

        <div className="card">
          <h3>Application Progress</h3>
          <p className="mu">Follow the progress of this application through its hiring stages.</p>
          <button className="btn" onClick={() => go("tracker", a.id)}>
            View Application Tracker
          </button>
        </div>
      </div>
    </>
  );
}

/* ====================  Calendar  ==================== */
function Cal({ apps }) {
  const [o, setO] = useState(0);
  const now = new Date();
  const m = new Date(now.getFullYear(), now.getMonth() + o, 1);
  const cells = [
    ...Array(m.getDay()).fill(0),
    ...Array.from({ length: new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate() }, (_, i) => i + 1),
  ];
  const ivs = apps.filter((a) => a.s === "Interview" && a.iv).sort((a, b) => a.iv.localeCompare(b.iv));
  const ym = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`;
  const mark = new Set(ivs.filter((a) => a.iv.startsWith(ym)).map((a) => +a.iv.slice(8, 10)));

  return (
    <>
      <Head t="Interview Calendar" s="Your upcoming interviews and scheduled dates.">
        <button className="btn2" onClick={() => setO(0)}>Today</button>
      </Head>

      <div className="calendar-page">
        <section className="calendar-panel">
          <div className="mn">
            <button aria-label="Previous month" onClick={() => setO(o - 1)}>{"‹"}</button>
            <b>{m.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</b>
            <button aria-label="Next month" onClick={() => setO(o + 1)}>{"›"}</button>
          </div>

          <div className="days">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <small key={d} className="mu">{d}</small>
            ))}
            {cells.map((d, i) => (
              <span
                key={i}
                className={d && o === 0 && d === now.getDate() ? "td" : mark.has(d) ? "iv" : ""}
              >
                {d || ""}
              </span>
            ))}
          </div>

          <div className="calendar-legend">
            <span><i className="calendar-legend-today" /> Today</span>
            <span><i className="calendar-legend-interview" /> Interview scheduled</span>
          </div>
        </section>

        <section className="scheduled-interviews-section">
          <div className="scheduled-interviews-heading">
            <div>
              <h3>Scheduled Interviews</h3>
              <p className="mu">Your interview schedule and application details</p>
            </div>
            <span className="interview-count">{ivs.length} Interviews</span>
          </div>

          <div className="interview-card-list">
            {ivs.map((a) => (
              <article className="interview-card" key={a.id}>
                <div className="interview-card-main">
                  <div className="application-card-banner">
                    <Av n={a.c} company />
                  </div>
                  <div className="interview-card-info">
                    <b>{a.c}</b>
                    <p>{a.p}</p>
                  </div>
                </div>

                <div className="interview-card-date">
                  <small>Interview Date</small>
                  <b>{fmt(a.iv)}</b>
                </div>

                <span className="interview-scheduled-label">Scheduled</span>
              </article>
            ))}

            {!ivs.length && (
              <div className="interview-empty">
                <I n="calendar" s={30} />
                <b>No interviews scheduled yet</b>
                <p>The admin schedules interviews when you reach the interview step.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

/* ====================  Job modal (details)  ==================== */
function JobDetailsModal({ job, onClose, onApply, applied, saved, onToggleSave }) {
  if (!job) return null;

  const company = job.c || job.company || "Company";
  const logo = getCompanyLogo(company) || job.companyLogoUrl;
  const theme = getCompanyTheme(company, job.tag);

  return (
    <div className="job-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="job-modal" role="dialog" aria-modal="true" aria-labelledby="job-modal-title">
        <button className="job-modal-close" onClick={onClose} aria-label="Close details">
          <I n="x" s={18} />
        </button>

        <div
          className="job-modal-banner"
          style={{
            "--company-accent": theme.accent,
            "--company-bg-photo": `url("${theme.photo}")`
          }}
        >
          <div className="job-modal-banner-top">
            <span className="job-modal-kicker">CAREER OPPORTUNITY</span>
            <span className="job-modal-verified-badge">
              <I n="check" s={12} />
              Verified Employer
            </span>
          </div>

          <div className="job-modal-header-hero">
            <div className="job-modal-logo-tile">
              <img
                src={logo}
                alt={`${company} official logo`}
                className="job-modal-logo-img"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = "grid";
                }}
              />
              <span className="job-modal-logo-fallback" style={{ display: "none" }}>
                {company.trim().charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="job-modal-header-text">
              <h2 id="job-modal-title">{job.t}</h2>
              <div className="job-modal-company-info">
                <span className="job-modal-company-name">{company}</span>
                {job.l && <span className="job-modal-company-dot">·</span>}
                {job.l && <span className="job-modal-company-loc">{job.l}</span>}
              </div>
            </div>
          </div>

          <div className="job-modal-tags">
            {job.tag && <span>{job.tag}</span>}
            {job.l && <span>{job.l}</span>}
            {job.salary && <span>{job.salary}</span>}
          </div>
        </div>

        <div className="job-modal-body">
          <section>
            <h3>Job Overview</h3>
            <p>{job.desc || "The employer has not added a job description yet."}</p>
          </section>

          <section>
            <h3>Role Details</h3>
            <div className="job-detail-grid">
              <div><small>Job Title</small><b>{job.t}</b></div>
              <div><small>Company</small><b>{company}</b></div>
              <div><small>Location</small><b>{job.l || "Not specified"}</b></div>
              <div><small>Salary</small><b>{job.salary || "Not specified"}</b></div>
              <div><small>Category</small><b>{job.tag || "Not specified"}</b></div>
            </div>
          </section>

          <section className="job-modal-company-section">
            <h3>About the Company</h3>
            <div className="job-modal-company-card">
              <div className="job-modal-company-card-top">
                <div className="job-modal-company-mini-logo">
                  <img src={logo} alt={`${company} logo`} />
                </div>
                <div>
                  <h4>{company}</h4>
                  <p className="mu">{theme.industry} · {job.l || "Multiple Locations"}</p>
                </div>
                <span className="job-modal-company-badge">Verified Employer</span>
              </div>
              <p className="job-modal-company-desc">{theme.description}</p>
            </div>
          </section>
        </div>

        <div className="job-modal-footer">
          <button className="btn2" onClick={onToggleSave}>
            {saved ? "♥ Saved" : "♡ Save Job"}
          </button>
          {applied ? <Tag s="Applied" /> : <button className="btn" onClick={onApply}>Apply Now →</button>}
        </div>
      </section>
    </div>
  );
}

/* ====================  Job card list  ==================== */
function JobCard({ j, apps, addApp, saved, setSaved }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const applied = (apps || []).some((a) => String(a.jobId) === String(j.id));

  const toggle = () => setSaved((s) => {
    const n = { ...s };
    if (n[j.id]) delete n[j.id];
    else n[j.id] = "today";
    return n;
  });

  const apply = async () => {
    if (!applied) {
      await addApp({
        jobId: j.id,
        c: j.c,
        p: j.t,
        d: new Date().toISOString().slice(0, 10),
        s: "Applied",
      });
    }
  };

  return (
    <>
      <JobCarouselCard
        job={j}
        badge={applied ? "Applied" : "Opportunity"}
        description={j.desc || "Explore this opportunity and its requirements."}
        topAction={
          <button
            type="button"
            className="eye job-card-save"
            aria-label={saved[j.id] ? "Unsave job" : "Save job"}
            onClick={toggle}
          >
            <I n="bookmark" f={!!saved[j.id]} />
          </button>
        }
        footer={
          <>
            <div className="job-carousel-job-salary">
              <small>Salary</small>
              <b>{j.salary || "Not specified"}</b>
            </div>
            <div className="job-carousel-job-actions">
              {applied ? (
                <Tag s="Applied" />
              ) : (
                <button className="btn2" onClick={apply}>Apply Now</button>
              )}
              <button
                type="button"
                className="job-view-details"
                onClick={() => setDetailsOpen(true)}
              >
                <I n="eye" /> Details →
              </button>
            </div>
          </>
        }
      />

      {detailsOpen && (
        <JobDetailsModal
          job={j}
          onClose={() => setDetailsOpen(false)}
          onApply={apply}
          applied={applied}
          saved={!!saved[j.id]}
          onToggleSave={toggle}
        />
      )}
    </>
  );
}
/* ====================  Jobs (search)  ==================== */
function Jobs({ jobs, apps, addApp, saved, setSaved, findJobsQuery }) {
  const q = findJobsQuery || "";
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryJobs, setCategoryJobs] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    if (!selectedCategory) {
      setCategoryJobs([]);
      setCategoryError("");
      setCategoryLoading(false);
      return;
    }

    let active = true;
    setCategoryLoading(true);
    setCategoryError("");

    api.getJobsByCareerCategory(selectedCategory)
      .then((data) => {
        if (active) {
          if (Array.isArray(data)) {
            setCategoryJobs(data);
          } else {
            setCategoryJobs([]);
            setCategoryError("The server returned an unexpected response.");
          }
        }
      })
      .catch((error) => {
        if (active) {
          setCategoryJobs([]);
          setCategoryError(error.message || "Could not load jobs. Please try again.");
        }
      })
      .finally(() => {
        if (active) setCategoryLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedCategory]);

  const sourceJobs = selectedCategory ? categoryJobs : (jobs || []);

  const list = sourceJobs.filter((j) => {
    const text = [j.t, j.c, j.l, j.desc, j.salary]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !q.trim() || text.includes(q.trim().toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <Head t="Find Jobs" s="Discover new opportunities." />

      <ElasticGallery
        onSelectCategory={(category) => {
          setSelectedCategory(category);
        }}
      />

      {selectedCategory && (
        <div className="category-results-heading">
          <div>
            <h2>{selectedCategory}</h2>
            <p className="mu">Opportunities in this career category</p>
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setSelectedCategory(null);
            }}
          >
            Show all jobs
          </button>
        </div>
      )}

      {categoryLoading && (
        <p className="empty">Loading opportunities...</p>
      )}

      {categoryError && (
        <div className="card">
          <p className="empty">{categoryError}</p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              const current = selectedCategory;
              setSelectedCategory(null);
              setTimeout(() => setSelectedCategory(current), 0);
            }}
          >
            Try again
          </button>
        </div>
      )}

      {!categoryLoading && !categoryError && (
        <JobCarousel className="jobs-list-carousel">
          {list.map((j) => (
            <JobCard
              key={j.id}
              j={j}
              apps={apps}
              addApp={addApp}
              saved={saved}
              setSaved={setSaved}
            />
          ))}

          {!list.length && (
            <p className="empty">
              No jobs match. Try another category.
            </p>
          )}
        </JobCarousel>
      )}
    </>
  );
}
/* ====================  Search results  ==================== */
function SearchResults({ jobs, apps, addApp, saved, setSaved, searchQuery }) {
  const q = (searchQuery || "").trim().toLowerCase();
  const list = (jobs || []).filter((j) => {
    const text = [j.t, j.c, j.l, j.desc, j.salary].filter(Boolean).join(" ").toLowerCase();
    return !q || text.includes(q);
  });

  return (
    <>
      <Head t="Search Results" s={q ? `Results for "${searchQuery}"` : "Explore available opportunities."} />
      <JobCarousel className="jobs-list-carousel">
        {list.map((j) => (
          <JobCard key={j.id} j={j} apps={apps} addApp={addApp} saved={saved} setSaved={setSaved} />
        ))}
        {!list.length && <p className="empty">No jobs found. Try a different keyword.</p>}
      </JobCarousel>
    </>
  );
}

/* ====================  Saved jobs  ==================== */
function Saved({ jobs, saved, setSaved }) {
  const list = jobs.filter((j) => saved[j.id]);

  return (
    <>
      <Head t="Saved Jobs" s="Your favourite job opportunities." />
      <div className="card list saved-jobs-list">
        {list.map((j) => (
          <article className="item job-card job-card-structured saved-job-card company-themed-card" data-company={String(j.c || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={j.id}>
            <div className="job-card-top">
              <div className="job-card-company">
                <Av n={j.c} company />
                <div className="job-card-heading">
                  <b className="job-card-title">{j.t}</b>
                  <p className="mu job-card-company-name">
                    {j.c} {j.l && <>{ "· "}{j.l}</>}
                  </p>
                </div>
              </div>

              <button
                className="eye job-card-save"
                aria-label="Remove saved job"
                title="Remove saved job"
                onClick={() => setSaved(({ [j.id]: _, ...r }) => r)}
              >
                <I n="trash" />
              </button>
            </div>

            {j.desc && <p className="mu job-card-description">{j.desc}</p>}

            <div className="job-card-tags">
              {j.tag && <span>{j.tag}</span>}
              {j.l && <span>{j.l}</span>}
              <span>Saved Job</span>
            </div>

            <div className="job-card-divider" />

            <div className="job-card-bottom">
              <div className="job-card-salary">
                <small>Salary</small>
                <b>{j.salary || "Not specified"}</b>
              </div>

              <div className="job-card-actions">
                <span className="mu">
                  {saved[j.id] === "today" ? "Saved today" : `Saved on ${saved[j.id]}`}
                </span>
              </div>
            </div>
          </article>
        ))}

        {!list.length && (
          <p className="empty">
            Nothing saved yet. Tap the bookmark on a job in Find Jobs.
          </p>
        )}
      </div>
    </>
  );
}

/* ====================  Analytics  ==================== */
function Analytics({ apps }) {
  const ms = Array.from({ length: 6 }, (_, i) => new Date(new Date().getFullYear(), new Date().getMonth() - 5 + i, 1));
  const cs = ms.map((m) =>
    apps.filter((a) => {
      if (!a.d) return false;
      const d = new Date(a.d + (a.d.includes("T") ? "" : "T00:00"));
      return d.getMonth() === m.getMonth() && d.getFullYear() === m.getFullYear();
    }).length
  );
  const maxC = Math.max(1, ...cs);
  const pts = cs.map((c, i) => `${i * 60},${90 - (c / maxC) * 80}`).join(" ");
  const r = (s) => Math.round((count(apps, s) / (apps.length || 1)) * 100) + "%";

  return (
    <>
      <Head t="Analytics & Reports" s="Track your job search performance." />
      <div className="g4">
        <Stat i="send" l="Total Applications" v={apps.length} />
        <Stat i="calcheck" l="Interview Rate" v={r("Interview")} />
        <Stat i="trophy" l="Offer Rate" v={r("Offer")} />
      </div>

      <div className="g2">
        <div className="card">
          <h3>Application Trend</h3>
          <svg className="chart" viewBox="0 0 300 100" role="img" aria-label="Applications per month">
            <polyline points={pts} fill="none" stroke="var(--teal2)" strokeWidth="3" strokeLinejoin="round" />
          </svg>
          <div className="mo">{ms.map((m) => <small key={+m} className="mu">{m.toLocaleDateString("en-US", { month: "short" })}</small>)}</div>
        </div>

        <div className="card">
          <h3>By Status</h3>
          <Donut apps={apps}>{apps.length}</Donut>
        </div>
      </div>
    </>
  );
}

/* ====================  Profile  ==================== */
function Profile({ me, setUsers, onUpdateProfile, onChangePassword }) {
  const [t, setT] = useState("About"),
    [edit, setEdit] = useState(false),
    [err, setErr] = useState(""),
    [saving, setSaving] = useState(false),
    [photoMenu, setPhotoMenu] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const save = async (patch) => {
    if (onUpdateProfile) await onUpdateProfile(patch);
    setUsers((us) => us.map((u) => (u.email === me?.email ? { ...u, ...patch } : u)));
  };
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      const formData = new FormData(e.currentTarget);
      await save(Object.fromEntries(formData));
      setEdit(false);
    } catch (error) {
      setErr(error.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };
  const photo = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 300000) return setErr("Choose a photo under 300 KB.");
    const r = new FileReader();
    r.onload = () => {
      save({ photo: r.result });
      setErr("");
      setPhotoMenu(false);
    };
    r.readAsDataURL(f);
  };
  const removePhoto = async () => {
    try {
      await save({ photo: "" });
      setPhotoMenu(false);
      setErr("");
    } catch (error) {
      setErr("Could not remove photo. Please try again.");
    }
  };
  const submitPassword = async (e) => {
    e.preventDefault();
    setShowPasswords(false);
    setPasswordError("");
    setPasswordSuccess("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const currentPassword = data.get("currentPassword");
    const newPassword = data.get("newPassword");
    const confirmPassword = data.get("confirmPassword");

    if (newPassword.length < 8 || newPassword.length > 72) {
      setPasswordError("New password must contain between 8 and 72 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    try {
      setPasswordBusy(true);
      await onChangePassword({ currentPassword, newPassword, confirmPassword });
      setPasswordSuccess("Password changed successfully.");
      form.reset();
      setShowPasswords(false);
    } catch (error) {
      setPasswordError(error.message || "Password update failed.");
    } finally {
      setPasswordBusy(false);
    }
  };
  const v = me ? me[TABS[t]] : "";

  return (
    <>
      <Head t="My Profile" s="Manage your personal information.">
        <button className="btn2" onClick={() => setEdit(!edit)}>
          <I n="edit" s={16} /> {edit ? "Cancel" : "Edit Profile"}
        </button>
      </Head>

      <div className="card prof">
        <div className="pic">
          <div className="photo-wrap">
            {me?.photo ? (
              <img className="av big2" src={me.photo} alt="Profile" />
            ) : (
              <i className="av big2">{(me?.name || "U")[0].toUpperCase()}</i>
            )}

            <button
              type="button"
              className="photo-camera"
              aria-label="Manage profile photo"
              title="Manage profile photo"
              onClick={() => setPhotoMenu((open) => !open)}
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4h-4L8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </button>

            {photoMenu && (
              <div className="photo-menu" role="menu">
                <label className="photo-menu-item" role="menuitem">
                  <span>Change Photo</span>
                  <input type="file" accept="image/*" hidden onChange={photo} />
                </label>
                {me?.photo && 
                  <button type="button" className="photo-menu-item danger" role="menuitem" onClick={removePhoto}>
                    Remove Photo
                  </button>
                }
                <button type="button" className="photo-menu-item" role="menuitem" onClick={() => setPhotoMenu(false)}>
                  Cancel
                </button>
              </div>
              )}
          </div>
        </div>
        {err && <small className="err">{err}</small>}

        <dl>
          {[
            ["Name", me?.name],
            ["Email", me?.email],
            ["Phone", me?.phone],
            ["Location", me?.loc],
          ].map(([k, x]) => (
            <div key={k}>
              <dt className="mu">{k}</dt>
              <dd>{x || "Not added"}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3>Security</h3>
            <p className="mu">Update your account password securely.</p>
          </div>

          <button
            type="button"
            className="btn2"
            onClick={() => {
              setPasswordOpen((open) => !open);
              setPasswordError("");
              setPasswordSuccess("");
            }}
          >
            {passwordOpen ? "Cancel" : "Change Password"}
          </button>
        </div>

        {passwordOpen && (
          <form className="form" onSubmit={submitPassword}>
            <label className="fld wide">
              Current Password
              <input
                type={showPasswords ? "text" : "password"}
                name="currentPassword"
                autoComplete="current-password"
                required
              />
            </label>

            <label className="fld">
              New Password
              <input
                type={showPasswords ? "text" : "password"}
                name="newPassword"
                minLength={8}
                maxLength={72}
                autoComplete="new-password"
                required
              />
            </label>

            <label className="fld">
              Confirm New Password
              <input
                type={showPasswords ? "text" : "password"}
                name="confirmPassword"
                minLength={8}
                maxLength={72}
                autoComplete="new-password"
                required
              />
            </label>

            <label className="wide" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={showPasswords} onChange={(e) => setShowPasswords(e.target.checked)} />
              Show passwords
            </label>

            {passwordError && <small className="err wide">{passwordError}</small>}

            {passwordSuccess && (
              <small className="wide" style={{ color: "var(--teal2)" }}>
                {passwordSuccess}
              </small>
            )}

            <button className="btn wide" type="submit" disabled={passwordBusy}>
              {passwordBusy ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>

      {edit && (
        <form className="card form" onSubmit={submit}>
          <label className = " fld "> Full name
            <input name="name" required defaultValue={me?.name} />
          </label>
          <label className="fld wide">Email address
            <input name="email" type="email" required maxLength={254} defaultValue={me?.email || ""} autoComplete="email" />
          </label>
          <label className="fld">Phone
            <input name="phone" defaultValue={me?.phone} placeholder="+91 ..." />
          </label>
          <label className="fld wide">Location
            <input name="loc" defaultValue={me?.loc} placeholder="City, State" />
          </label>
          <label className="fld wide">About you
            <textarea name="about" rows="3" defaultValue={me?.about} />
          </label>
          <label className="fld wide">Education
            <textarea name="edu" rows="2" defaultValue={me?.edu} />
          </label>
          <label className="fld wide">Skills (comma separated)
            <input name="skills" defaultValue={me?.skills} placeholder="Java, React, MongoDB" />
          </label>
          <label className="fld wide">Experience
            <textarea name="exp" rows="2" defaultValue={me?.exp} />
          </label>
          {err && <small className="err wide">{err}</small>}
          <button className="btn wide" type="submit" disabled={saving}>
            {saving ? "Saving changes..." : "Save changes"}
          </button>
        </form>
      )}

      <div className="chips">{Object.keys(TABS).map((k) => (
        <button key={k} aria-pressed={t === k} onClick={() => setT(k)}>{k}</button>
      ))}</div>

      <div className="card">
        {!v ? (
          <p className="mu">Nothing added yet. Use Edit Profile to add your {t.toLowerCase()}.</p>
        ) : t === "Skills" ? (
          <div className="tags">{v.split(",").map((x) => x.trim()).filter(Boolean).map((x) => <span key={x}>{x}</span>)}</div>
        ) : (
          <p className="pre">{v}</p>
        )}
      </div>
    </>
  );
}

/* ====================  Docs (resume & docs)  ==================== */
function Docs({ docs, addDoc, deleteDoc }) {
  const [docList, setDocList] = useState(docs || []);

  useEffect(() => {
    setDocList(docs || []);
  }, [docs]);

  const add = (e) => {
    const files = [...e.target.files];
    files.forEach((f) => {
      const s = Math.max(1, Math.round(f.size / 1024)) + " KB";
      if (addDoc) addDoc(f.name, s, f);
    });
    e.target.value = "";
  };

  return (
    <>
      <Head t="Resume & Documents" s="Manage your career documents with secure cloud storage." />

      <div className="document-page">
        <div className="card drop document-upload-panel">
          <span className="big"><I n="upload" s={40} /></span>
          <h3>Upload Your Documents</h3>
          <p>
            Upload your resume, portfolio or certificates
            <br />
            (PDF, images, documents up to 15MB)
          </p>
          <label className="btn document-upload-button">
            <I n="upload" /> Choose Files
            <input type="file" multiple hidden onChange={add} />
          </label>
        </div>

        <section className="document-section">
          <div className="document-section-heading">
            <div>
              <h3>My Documents</h3>
              <p className="mu">Your uploaded career documents</p>
            </div>
            <span className="document-count">{docList.length} Files</span>
          </div>

          <div className="document-card-list">
            {docList.map((doc, i) => {
              const name = doc.name || doc[0] || "Document";
              const size = doc.size || doc[1] || "";
              const id = doc.id;
              const extension = name.includes(".") ? name.split(".").pop().toUpperCase() : "FILE";

              return (
                <article className="document-card" key={id || i}>
                  <div className="document-card-main">
                    <div className="document-file-icon"><I n="file" s={23} /></div>
                    <div className="document-card-info">
                      <b>{name}</b>
                      <div className="document-card-meta">
                        <span>{extension}</span>
                        {size && <span>{size}</span>}
                      </div>
                    </div>
                  </div>

                  {id && (
                    <div className="document-card-actions">
                      <a
                        className="btn2"
                        href={api.getDocumentDownloadUrl(id)}
                        target="_blank"
                        rel="noreferrer"
                        title="Download"
                      >
                        <I n="download" /> Download
                      </a>

                      <button
                        className="eye"
                        type="button"
                        aria-label="Delete document"
                        onClick={() => deleteDoc && deleteDoc(id)}
                      >
                        <I n="trash" />
                      </button>
                    </div>
                  )}
                </article>
              );
            })}

            {!docList.length && (
              <div className="document-empty">
                <I n="file" s={30} />
                <b>No documents uploaded yet</b>
                <p>Upload your resume or certificates to store them securely.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

/* ====================  Notifications  ==================== */
function Notes({ apps, readIds, onMarkAllAsRead }) {
  const read = new Set((readIds || []).map(String));

  return (
    <>
      <Head t="Notifications" s="Stay updated with the latest alerts.">
        <button className="btn2" onClick={onMarkAllAsRead}>Mark all as read</button>
      </Head>

      <div className="card list notification-card-list">
        {apps.map((a) => {
          const isRead = read.has(String(a.id));
          const icon = a.s === "Offer" ? "gift" : a.s === "Interview" ? "cal" : "info";
          const message = a.s === "Interview" && a.iv
            ? `Interview at ${a.c} on ${fmt(a.iv)}.`
            : `Your application at ${a.c || "the company"} is ${a.s || "updated"}.`;

          return (
            <article className="item notification-card" key={a.id} data-read={isRead}>
              <div className="notification-card-main">
                <i className="ic notification-card-icon"><I n={icon} /></i>
                <div className="notification-card-content">
                  <div className="notification-card-heading">
                    <b>{a.s || "Application update"}</b>
                    {!isRead && <span className="notification-card-unread">Unread</span>}
                  </div>
                  <p>{message}</p>
                </div>
              </div>

              <div className="notification-card-bottom">
                <span className="notification-card-date">{fmt(a.d)}</span>
                <span className="notification-card-status">{isRead ? "Read" : "New notification"}</span>
              </div>
            </article>
          );
        })}

        {!apps.length && (
          <p className="empty">No alerts yet. Apply to a job to start getting updates.</p>
        )}
      </div>
    </>
  );
}

/* ====================  Settings  ==================== */
function Settings({ theme, setTheme }) {
  const [on, setOn] = useState({ Email: true, Interview: true, Jobs: false }), [ok, setOk] = useState(false);
  const labels = { Email: "Email Notifications", Interview: "Interview Reminders", Jobs: "Job Recommendations" };
  return (
    <>
      <Head t="Settings" s="Customise your experience." />
      <div className="card set">
        <h3>Appearance</h3>
        <div className="chips">{["Light", "Dark", "System"].map((t) => (
          <button key={t} aria-pressed={theme === t} onClick={() => setTheme(t)}>{t}</button>
        ))}</div>

        <h3>Notifications</h3>
        {Object.keys(on).map((k) => (
          <label className="sw" key={k}>{labels[k]}
            <input type="checkbox" checked={on[k]} onChange={() => setOn({ ...on, [k]: !on[k] })} />
          </label>
        ))}
        <button className="btn" onClick={() => { setOk(true); setTimeout(() => setOk(false), 1800); }}>
          {ok ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </>
  );
}

/* ====================  Login  ==================== */
function Login({ onAuth }) {
  const [role, setRole] = useState("USER"), [reg, setReg] = useState(false), [err, setErr] = useState(""), [showPassword, setShowPassword] = useState(false);
  const admin = role === "ADMIN";

  const submit = async (e) => {
    e.preventDefault();
    setShowPassword(false);
    const f = Object.fromEntries(new FormData(e.target));
    const email = f.email.trim().toLowerCase();
    setErr("");
    try {
      if (reg) {
        const user = await api.register(f.name.trim(), email, f.password, role, f.code);
        return onAuth(user);
      }
      const user = await api.login(email, f.password, role);
      return onAuth(user);
    } catch (apiErr) {
      setErr(apiErr.message || "Authentication failed. Please verify credentials.");
    }
  };

  return (
    <div className="auth">
      <aside>
        <div className="brand"><I n="brief" s={22} /> <span>Job<em>Tracker</em></span></div>
        <h1>Find the job. Track every step.</h1>
        <p>Job seekers apply and follow their status. Admins post jobs and move applicants through the hiring steps.</p>
      </aside>

      <form className="card" onSubmit={submit} autoComplete="on">
        <div className="seg" role="group" aria-label="Account type">
          {[
            ["USER", "Job Seeker", "user"],
            ["ADMIN", "Admin", "shield"],
          ].map(([k, l, ic]) => (
            <button type="button" key={k} aria-pressed={role === k} onClick={() => { setRole(k); setErr(""); }}>
              <I n={ic} s={17} />{l}
            </button>
          ))}
        </div>

        <h2>{reg ? `Sign up as ${admin ? "Admin" : "Job Seeker"}` : `Sign in as ${admin ? "Admin" : "Job Seeker"}`}</h2>
        {reg && (
          <label className="fld">Full name
            <input name="name" required />
          </label>
        )}

        <label className="fld">
          Email
          <input name="email" type="email" autoComplete="username" required />
        </label>

        <label className="fld">
          Password
          <div className="password-input-wrap">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={reg ? "new-password" : "current-password"}
              required
              minLength={6}
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                  <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9 7-.2 1.1-.9 2.3-2 3.4" />
                  <path d="M6.2 6.2C3.9 7.7 2.3 10 2 12c.5 2.5 4 7 10 7 1.2 0 2.3-.2 3.3-.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </label>

        {reg && admin && (
          <label className="fld">Admin access code
            <input name="code" required placeholder="Given by your organisation" />
          </label>
        )}

        {err && <p className="err" role="alert">{err}</p>}

        <button className="btn">{reg ? "Create account" : "Sign in"}</button>
        <button type="button" className="link" onClick={() => { setReg(!reg); setErr(""); }}>
          {reg ? "Already have an account? Sign in" : "New here? Sign up"}
        </button>
      </form>
    </div>
  );
}

/* ====================  Admin Dashboard  ==================== */
function AdminDash({ jobs, allApps, users }) {
  // Deduplicate recent applicants so each user appears only once (showing their newest application first)
  const uniqueRecentApps = [];
  const seenUsers = new Set();
  for (const a of allApps) {
    const userKey = a.userId || a.email || a.u || a.name || a.id;
    if (!seenUsers.has(userKey)) {
      seenUsers.add(userKey);
      uniqueRecentApps.push(a);
      if (uniqueRecentApps.length >= 4) break;
    }
  }

  return (
    <>
      <Head t="Admin Dashboard" s="Overview of jobs, applicants and hiring progress." />
      <div className="g4">
        <Stat i="brief" l="Jobs Posted" v={jobs.length} />
        <Stat i="send" l="Applications" v={allApps.length} />
        <Stat i="users" l="Job Seekers" v={users.filter((u) => u.role === "USER").length} />
        <Stat i="gift" l="Offers Made" v={count(allApps, "Offer")} />
      </div>

      <div className="g2">
        <div className="card">
          <h3>Applications by Status</h3>
          <Donut apps={allApps}>{allApps.length}</Donut>
        </div>

        <div className="card list">
          <h3>Recent Applicants</h3>
          {uniqueRecentApps.map((a) => (
            <div className="item" key={a.id}>
              <Av n={a.name} />
              <div>
                <b>{a.name}</b>
                <p className="mu">{a.p} · {a.c}</p>
              </div>
              <Tag s={a.s} />
            </div>
          ))}
          {!uniqueRecentApps.length && <p className="empty">No applications yet.</p>}
        </div>
      </div>

      <h3>Recent Jobs</h3>
      <div className="card list admin-jobs-list">
        {jobs.slice(0, 4).map((j) => {
          const applicantCount = allApps.filter((a) => String(a.jobId) === String(j.id)).length;
          return (
            <article className="item job-card job-card-structured company-themed-card" data-company={String(j.c || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={j.id}>
              <div className="job-card-top">
                <div className="job-card-company">
                  <Av n={j.c} company />
                  <div className="job-card-heading">
                    <b className="job-card-title">{j.t}</b>
                    <p className="mu job-card-company-name">
                      {j.c} {j.l && <>{ "· "}{j.l}</>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="job-card-tags">
                {j.tag && <span>{j.tag}</span>}
                {j.l && <span>{j.l}</span>}
              </div>

              <div className="job-card-divider" />

              <div className="job-card-bottom">
                <div className="job-card-salary">
                  <small>Salary</small>
                  <b>{j.salary || "Not specified"}</b>
                </div>
                <div className="job-card-actions">
                  <span className="mu">{applicantCount} applicants</span>
                </div>
              </div>
            </article>
          );
        })}
        {!jobs.length && <p className="empty">No jobs posted yet.</p>}
      </div>
    </>
  );
}

/* ====================  Admin Jobs management  ==================== */
function AdminJobs({ jobs, setJobs, allApps, addJob, deleteJob }) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [addingDemoJobs, setAddingDemoJobs] = useState(false);

  const addDemoJobs = async () => {
    const demoJobs = [
      { t: "Junior Frontend Developer", c: "NovaByte Labs", l: "Mumbai, India · Hybrid", tag: "Frontend", salary: "₹3.5–5 LPA", desc: "Demo listing: Build responsive interfaces using React." },
      { t: "Data Analyst Intern", c: "BrightPath Analytics", l: "Pune, India · Hybrid", tag: "Data Science", salary: "₹15,000–20,000/month", desc: "Demo listing: Explore datasets and prepare reports." },
      { t: "Java Developer Trainee", c: "CodeNest Digital", l: "Nashik, India · On-site", tag: "Backend", salary: "₹3–4 LPA", desc: "Demo listing: Learn Java, APIs and backend development." },
      { t: "UI Designer Intern", c: "PixelCraft Studio", l: "Remote, India", tag: "Frontend", salary: "₹12,000–18,000/month", desc: "Demo listing: Create clean and user-friendly designs." },
      { t: "Full Stack Developer", c: "MintLeaf Technologies", l: "Bengaluru, India · Hybrid", tag: "Full Stack", salary: "₹4–6 LPA", desc: "Demo listing: Work on frontend and backend features." },
      { t: "Backend Developer Intern", c: "CloudSpring Systems", l: "Remote, India", tag: "Backend", salary: "₹15,000/month", desc: "Demo listing: Assist with APIs and databases." }
    ];

    setAddingDemoJobs(true);
    try {
      for (const demo of demoJobs) {
        const exists = jobs.some(job =>
          String(job.t || job.title || "").trim().toLowerCase() === demo.t.toLowerCase() &&
          String(job.c || job.company || "").trim().toLowerCase() === demo.c.toLowerCase()
        );
        if (!exists && addJob) await addJob(demo);
      }
    } finally {
      setAddingDemoJobs(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setPasswordOpen(false); // close any password modal that may be open elsewhere
    const f = Object.fromEntries(new FormData(e.target));
    const jobData = { t: f.t, c: f.c, l: f.l, tag: f.tag, salary: f.salary, desc: f.desc, companyLogoUrl: f.companyLogoUrl };
    if (addJob) await addJob(jobData);
    setShow(false);
  };

  const remove = async (id, title) => {
    if (confirm(`Delete "${title}"?`)) {
      if (deleteJob) await deleteJob(id);
    }
  };

  const filteredJobs = jobs.filter((j) =>
    [j.t, j.c, j.l].some((value) => String(value || "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Head t="Manage Jobs" s="Post new openings and manage existing ones." />
      <div className="admin-demo-job-actions">
        <button className="btn" onClick={() => setShow(!show)}>
          {show ? "Close" : "+ Post Job"}
        </button>
        <button className="btn" type="button" disabled={addingDemoJobs} onClick={addDemoJobs}>
          {addingDemoJobs ? "Adding demo jobs..." : "+ Add 6 Demo Jobs"}
        </button>
      </div>

      {show && (
        <form className="card form" onSubmit={submit}>
          <label className="fld">Company *
            <input name="c" required />
          </label>
          <label className="fld wide">Company Logo URL
            <input name="companyLogoUrl" type="url" placeholder="https://example.com/company-logo.png" />
            <small>Paste a direct link to the company's logo image.</small>
          </label>
          <label className="fld">Job title *
            <input name="t" required />
          </label>
          <label className="fld">Location *
            <input name="l" required />
          </label>
          <label className="fld">Category
            <select name="tag">
              {["Full Stack", "Data Science", "Backend", "Frontend"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="fld wide">Salary
            <input name="salary" placeholder="e.g. 6 LPA" />
          </label>
          <label className="fld wide">Description *
            <textarea name="desc" rows="3" required />
          </label>
          <button className="btn wide">Publish Job</button>
        </form>
      )}

      <div className="find-search-row">
        <label className="find-searchbox">
          <I n="search" />
          <input
            type="search"
            placeholder="Search jobs by title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      <div className="card list admin-jobs-list">
        {filteredJobs.map((j) => {
          const applicantCount = allApps.filter((a) => String(a.jobId) === String(j.id)).length;
          return (
            <article className="item job-card job-card-structured company-themed-card" data-company={String(j.c || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={j.id}>
              <div className="job-card-top">
                <div className="job-card-company">
                  <Av n={j.c} company />
                  <div className="job-card-heading">
                    <b className="job-card-title">{j.t}</b>
                    <p className="mu job-card-company-name">
                      {j.c} {j.l && <>{ "· "}{j.l}</>}
                    </p>
                  </div>
                </div>

                <button
                  className="eye job-card-save"
                  aria-label={`Delete ${j.t}`}
                  title="Delete job"
                  onClick={() => remove(j.id, j.t)}
                >
                  <I n="trash" />
                </button>
              </div>

              <div className="job-card-tags">
                {j.tag && <span>{j.tag}</span>}
                {j.l && <span>{j.l}</span>}
              </div>

              <div className="job-card-divider" />

              <div className="job-card-bottom">
                <div className="job-card-salary">
                  <small>Applicants</small>
                  <b>{applicantCount}</b>
                </div>
                <div className="job-card-actions">
                  <span className="mu">Job listing</span>
                </div>
              </div>
            </article>
          );
        })}

        {!filteredJobs.length && (
          <p className="empty">
            {jobs.length ? "No jobs match your search." : "No jobs posted. Use Post Job to add your first listing."}
          </p>
        )}
      </div>
    </>
  );
}

/* ====================  Admin Applications  ==================== */
function AdminApps({ allApps, setApp }) {
  return (
    <>
      <Head t="Applications" s="Review applicants and update their status." />
      <div className="card tbl">
        <div className="r ad h"><span>Applicant</span><span>Company</span><span>Position</span><span>Applied On</span><span>Status</span></div>
        {allApps.map((a) => (
          <div className="r ad" key={a.id}>
            <span className="co"><Av n={a.name} />{a.name}</span>
            <span data-l="Company">{a.company || a.c || a.companyName || a.employerName || "Company not available"}</span>
            <span data-l="Position">{a.p}</span>
            <span data-l="Applied on">{fmt(a.d)}</span>
            <span className="st" data-l="Status">
              <select className="tag" style={{ "--c": COL[a.s] }} aria-label={`Status for ${a.name}`} value={a.s} onChange={(e) => setApp(a.id, { s: e.target.value })}>
                {STATUS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {a.s === "Interview" && <input type="date" aria-label="Interview date" value={a.iv || ""} onChange={(e) => setApp(a.id, { iv: e.target.value })} />}
            </span>
          </div>
        ))}
        {!allApps.length && <p className="empty">No one has applied yet.</p>}
      </div>
    </>
  );
}

/* ====================  Admin Users  ==================== */
function AdminUsers({ users, allApps }) {
  const list = users.filter((u) => u.role === "USER");
  return (
    <>
      <Head t="Users" s="Registered job seekers." />
      <div className="card list">
        {list.map((u) => (
          <div className="item" key={u.email || u.id}>
            <Av n={u.name} />
            <div>
              <b>{u.name}</b>
              <p className="mu">{u.email}</p>
            </div>
            <span className="mu">{allApps.filter((a) => a.u === u.email).length || u.applicationCount || 0} applications</span>
          </div>
        ))}
        {!list.length && <p className="empty">No job seekers have signed up yet.</p>}
      </div>
    </>
  );
}

/* ====================  Admin Profile  ==================== */
function AdminProfile({
  me,
  setUsers,
  onUpdateProfile,
  onChangePassword,
  allApps = [],
  jobs = [],
  users = [],
}) {
  const [tab, setTab] = useState("Overview");
  const [edit, setEdit] = useState(false);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [photoMenu, setPhotoMenu] = useState(false);

  // Security & Password states
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  // Admin Access Code display & copy states
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Recruiter Preferences
  const [notifyApply, setNotifyApply] = useLS("jt_adm_notify_apply", true);
  const [notifyInterview, setNotifyInterview] = useLS("jt_adm_notify_iv", true);
  const [notifyDigest, setNotifyDigest] = useLS("jt_adm_notify_digest", true);

  const save = async (patch) => {
    if (onUpdateProfile) await onUpdateProfile(patch);
    setUsers((us) => us.map((u) => (u.email === me?.email ? { ...u, ...patch } : u)));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      const formData = new FormData(e.currentTarget);
      await save(Object.fromEntries(formData));
      setEdit(false);
    } catch (error) {
      setErr(error.message || "Could not update admin profile.");
    } finally {
      setSaving(false);
    }
  };

  const photo = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 300000) return setErr("Choose a photo under 300 KB.");
    const r = new FileReader();
    r.onload = () => {
      save({ photo: r.result });
      setErr("");
      setPhotoMenu(false);
    };
    r.readAsDataURL(f);
  };

  const removePhoto = async () => {
    try {
      await save({ photo: "" });
      setPhotoMenu(false);
      setErr("");
    } catch (error) {
      setErr("Could not remove photo. Please try again.");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const currentPassword = data.get("currentPassword");
    const newPassword = data.get("newPassword");
    const confirmPassword = data.get("confirmPassword");

    if (newPassword.length < 8 || newPassword.length > 72) {
      setPasswordError("New password must contain between 8 and 72 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    try {
      setPasswordBusy(true);
      await onChangePassword({ currentPassword, newPassword, confirmPassword });
      setPasswordSuccess("Password changed successfully.");
      form.reset();
      setShowPasswords(false);
    } catch (error) {
      setPasswordError(error.message || "Password update failed.");
    } finally {
      setPasswordBusy(false);
    }
  };

  const copyCode = () => {
    try {
      navigator.clipboard.writeText("ADMIN2026");
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch (e) {
      alert("Admin Access Code: ADMIN2026");
    }
  };

  const adminUsers = useMemo(() => {
    const list = users.filter((u) => u.role === "ADMIN");
    if (!list.some((u) => u.email === me?.email) && me) {
      list.push(me);
    }
    return list;
  }, [users, me]);

  const candidateCount = useMemo(() => users.filter((u) => u.role === "USER").length, [users]);
  const offerCount = useMemo(() => allApps.filter((a) => a.s === "Offer").length, [allApps]);

  const ADMIN_TABS = ["Overview", "Access Code", "Security", "Preferences"];

  return (
    <>
      <Head t="Admin Profile" s="Manage administrative credentials, recruitment identity, and organization access.">
        <button className="btn2" onClick={() => setEdit(!edit)}>
          <I n="edit" s={16} /> {edit ? "Cancel" : "Edit Profile"}
        </button>
      </Head>

      <div className="card prof">
        <div className="pic">
          <div className="photo-wrap">
            {me?.photo ? (
              <img className="av big2" src={me.photo} alt="Admin Profile" />
            ) : (
              <i className="av big2">{(me?.name || "A")[0].toUpperCase()}</i>
            )}

            <button
              type="button"
              className="photo-camera"
              aria-label="Manage profile photo"
              title="Manage profile photo"
              onClick={() => setPhotoMenu((open) => !open)}
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4h-4L8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </button>

            {photoMenu && (
              <div className="photo-menu" role="menu">
                <label className="photo-menu-item" role="menuitem">
                  <span>Change Photo</span>
                  <input type="file" accept="image/*" hidden onChange={photo} />
                </label>
                {me?.photo && (
                  <button type="button" className="photo-menu-item danger" role="menuitem" onClick={removePhoto}>
                    Remove Photo
                  </button>
                )}
                <button type="button" className="photo-menu-item" role="menuitem" onClick={() => setPhotoMenu(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {err && <small className="err">{err}</small>}

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <h2 style={{ margin: 0 }}>{me?.name || "Admin"}</h2>
            <span className="admin-badge-strip">
              <I n="shield" s={13} /> Administrator
            </span>
          </div>

          <dl>
            {[
              ["Role Title", me?.skills || "Talent Acquisition Lead & ATS Administrator"],
              ["Department", me?.edu || "Human Resources & Talent Acquisition"],
              ["Work Email", me?.email],
              ["Direct Phone", me?.phone || "Not set"],
              ["Office Location", me?.loc || "HQ / Remote"],
              ["Experience", me?.exp || "Enterprise Recruitment"],
            ].map(([k, x]) => (
              <div key={k}>
                <dt className="mu">{k}</dt>
                <dd>{x}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="g4" style={{ marginTop: 16 }}>
        <Stat i="brief" l="Jobs Managed" v={jobs.length} />
        <Stat i="send" l="Applications Managed" v={allApps.length} />
        <Stat i="users" l="Total Candidates" v={candidateCount} />
        <Stat i="gift" l="Offers Extended" v={offerCount} />
      </div>

      {edit && (
        <form className="card form" onSubmit={submit} style={{ marginTop: 16 }}>
          <h3>Edit Administrative Information</h3>
          <p className="mu">Update your public recruiter profile and contact details.</p>

          <label className="fld wide">Full Name
            <input name="name" required defaultValue={me?.name} />
          </label>

          <label className="fld wide">Work Email Address
            <input name="email" type="email" required maxLength={254} defaultValue={me?.email || ""} autoComplete="email" />
          </label>

          <label className="fld">Designation / Role Title
            <input name="skills" defaultValue={me?.skills || "Talent Acquisition Lead"} placeholder="e.g. Lead Technical Recruiter" />
          </label>

          <label className="fld">Department
            <input name="edu" defaultValue={me?.edu || "Human Resources"} placeholder="e.g. People Operations & Recruitment" />
          </label>

          <label className="fld">Direct Phone
            <input name="phone" defaultValue={me?.phone} placeholder="+91 ..." />
          </label>

          <label className="fld">Office Location
            <input name="loc" defaultValue={me?.loc} placeholder="City, Campus / Remote" />
          </label>

          <label className="fld wide">Recruitment Experience
            <input name="exp" defaultValue={me?.exp} placeholder="e.g. 6+ years in Technical Recruitment & Campus Hiring" />
          </label>

          <label className="fld wide">Recruiter Bio & Focus
            <textarea name="about" rows="3" defaultValue={me?.about} placeholder="Overview of your hiring priorities and recruitment lifecycle." />
          </label>

          {err && <small className="err wide">{err}</small>}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }} className="wide">
            <button className="btn" type="submit" disabled={saving}>
              {saving ? "Saving changes..." : "Save changes"}
            </button>
            <button className="btn2" type="button" onClick={() => setEdit(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="chips" style={{ marginTop: 20 }}>
        {ADMIN_TABS.map((k) => (
          <button key={k} aria-pressed={tab === k} onClick={() => setTab(k)}>
            {k}
          </button>
        ))}
      </div>

      {/* TAB 1: Overview */}
      {tab === "Overview" && (
        <div className="card" style={{ display: "grid", gap: 20 }}>
          <div>
            <h3>Recruiter Bio & Professional Summary</h3>
            <p className="mu" style={{ fontSize: 14, lineHeight: 1.6, marginTop: 6 }}>
              {me?.about ||
                "Managing full lifecycle recruitment pipelines across technical, corporate, and design divisions. Responsible for applicant screening, interview alignment, and offer negotiations."}
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--ln)", paddingTop: 16 }}>
            <h4 style={{ margin: "0 0 10px 0" }}>System Administrator Privileges</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
              <div className="admin-faq-item">
                <h4><I n="brief" s={16} /> Job Management</h4>
                <p>Post new career openings, edit role specifications, and delete expired postings.</p>
              </div>
              <div className="admin-faq-item">
                <h4><I n="file" s={16} /> Application Review</h4>
                <p>Screen applicants, evaluate resumes, and update statuses (Applied, Interview, Review, Offer, Rejected).</p>
              </div>
              <div className="admin-faq-item">
                <h4><I n="cal" s={16} /> Interview Coordination</h4>
                <p>Schedule dates and interview times directly with candidates in the ATS.</p>
              </div>
              <div className="admin-faq-item">
                <h4><I n="users" s={16} /> Candidate Roster</h4>
                <p>Access registered job seekers, view applicant profiles, and inspect contact records.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Access Code */}
      {tab === "Access Code" && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h3>Organization Admin Access Code</h3>
              <p className="mu">This master security code authorizes new team members to create administrator accounts.</p>
            </div>
            <span className="tag" style={{ "--c": "var(--c-pri, #9e4a28)" }}>
              <I n="shield" s={14} /> Organization Key
            </span>
          </div>

          <div className="admin-code-container">
            <div>
              <small className="mu" style={{ textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>
                Master Access Code
              </small>
              <div className="admin-code-val">
                {showCode ? "ADMIN2026" : "••••••••"}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                type="button"
                className="btn2"
                onClick={() => setShowCode(!showCode)}
                aria-label={showCode ? "Hide access code" : "Reveal access code"}
              >
                <I n="eye" s={16} /> {showCode ? "Hide" : "Reveal Code"}
              </button>

              <button
                type="button"
                className="btn"
                onClick={copyCode}
                aria-label="Copy admin access code"
              >
                <I n={copiedCode ? "check" : "clip"} s={16} /> {copiedCode ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <div className="admin-faq-item">
              <h4>What is the Admin Access Code?</h4>
              <p>
                The access code (<code>ADMIN2026</code>) is a security safeguard. It ensures that public visitors cannot register as administrators without organizational authorization. When a new recruiter clicks <strong>Admin → Sign Up</strong>, the form asks for this code.
              </p>
            </div>

            <div className="admin-faq-item">
              <h4>Can there be multiple administrators?</h4>
              <p>
                <strong>Yes, absolutely!</strong> Multiple admins can sign up. Each administrator creates their own personal account with their unique email address and password. They all have equal authority to post jobs, review candidate submissions, and update applicant statuses.
              </p>
            </div>

            <div className="admin-faq-item">
              <h4>Is it a single unique code or multiple codes?</h4>
              <p>
                Currently, it is a <strong>single master organization code</strong> (configured via <code>app.admin.code</code> on the server). All authorized staff members use this same code to sign up their individual admin accounts.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 24, borderTop: "1px solid var(--ln)", paddingTop: 16 }}>
            <h4 style={{ margin: "0 0 12px 0" }}>Registered Administrators ({adminUsers.length})</h4>
            <div className="card list" style={{ background: "var(--in)", padding: 8 }}>
              {adminUsers.map((adm) => (
                <div className="item" key={adm.email || adm.id} style={{ padding: "8px 12px" }}>
                  <Av n={adm.name} />
                  <div>
                    <b>{adm.name}</b>
                    <p className="mu">{adm.email}</p>
                  </div>
                  {adm.email === me?.email ? (
                    <span className="tag" style={{ "--c": "var(--c-pri, #9e4a28)" }}>Active (You)</span>
                  ) : (
                    <span className="tag" style={{ "--c": "#64748b" }}>Admin</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Security & Password */}
      {tab === "Security" && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <div>
              <h3>Account Security & Credentials</h3>
              <p className="mu">Update your administrator password and manage account protection.</p>
            </div>

            <button
              type="button"
              className="btn2"
              onClick={() => {
                setPasswordOpen(!passwordOpen);
                setPasswordError("");
                setPasswordSuccess("");
              }}
            >
              {passwordOpen ? "Cancel" : "Change Password"}
            </button>
          </div>

          {passwordOpen && (
            <form className="form" onSubmit={submitPassword} style={{ background: "var(--in)", padding: 16, borderRadius: 12, marginBottom: 20 }}>
              <label className="fld wide">
                Current Password
                <input
                  type={showPasswords ? "text" : "password"}
                  name="currentPassword"
                  autoComplete="current-password"
                  required
                />
              </label>

              <label className="fld">
                New Password (8–72 characters)
                <input
                  type={showPasswords ? "text" : "password"}
                  name="newPassword"
                  minLength={8}
                  maxLength={72}
                  autoComplete="new-password"
                  required
                />
              </label>

              <label className="fld">
                Confirm New Password
                <input
                  type={showPasswords ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                />
              </label>

              <label className="wide" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={showPasswords}
                  onChange={(e) => setShowPasswords(e.target.checked)}
                />
                Show passwords
              </label>

              {passwordError && <small className="err wide">{passwordError}</small>}

              {passwordSuccess && (
                <small className="wide" style={{ color: "var(--teal2)", fontWeight: 600 }}>
                  ✓ {passwordSuccess}
                </small>
              )}

              <button className="btn wide" type="submit" disabled={passwordBusy}>
                {passwordBusy ? "Updating password..." : "Update Password"}
              </button>
            </form>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <div className="admin-faq-item">
              <h4>Role Permission</h4>
              <p><code>ROLE_ADMIN</code> with full read, write, and deletion access across all records.</p>
            </div>
            <div className="admin-faq-item">
              <h4>Password Encryption</h4>
              <p>Secured with BCrypt 10-round salted hash. Never stored in plain text.</p>
            </div>
            <div className="admin-faq-item">
              <h4>Session Authentication</h4>
              <p>Stateless JSON Web Token (JWT) with 24-hour expiration.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Preferences */}
      {tab === "Preferences" && (
        <div className="card">
          <h3>Hiring & ATS Preferences</h3>
          <p className="mu">Customize your administrative notifications and recruitment workflow.</p>

          <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "12px 16px", borderRadius: 10, background: "var(--in)", border: "1px solid var(--ln)", cursor: "pointer" }}>
              <div>
                <b>New Applicant Alerts</b>
                <p className="mu" style={{ margin: "2px 0 0 0", fontSize: 13 }}>Notify when a job seeker applies to any posted job.</p>
              </div>
              <input type="checkbox" checked={notifyApply} onChange={(e) => setNotifyApply(e.target.checked)} style={{ width: 20, height: 20 }} />
            </label>

            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "12px 16px", borderRadius: 10, background: "var(--in)", border: "1px solid var(--ln)", cursor: "pointer" }}>
              <div>
                <b>Interview Date Reminders</b>
                <p className="mu" style={{ margin: "2px 0 0 0", fontSize: 13 }}>Highlight candidates who have upcoming interviews scheduled.</p>
              </div>
              <input type="checkbox" checked={notifyInterview} onChange={(e) => setNotifyInterview(e.target.checked)} style={{ width: 20, height: 20 }} />
            </label>

            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "12px 16px", borderRadius: 10, background: "var(--in)", border: "1px solid var(--ln)", cursor: "pointer" }}>
              <div>
                <b>Weekly Pipeline Summary</b>
                <p className="mu" style={{ margin: "2px 0 0 0", fontSize: 13 }}>Display summary metrics of offers, reviews, and rejections on dashboard.</p>
              </div>
              <input type="checkbox" checked={notifyDigest} onChange={(e) => setNotifyDigest(e.target.checked)} style={{ width: 20, height: 20 }} />
            </label>
          </div>
        </div>
      )}
    </>
  );
}

/* ====================  Page map  ==================== */
const PAGES = {
  dashboard: Dash,
  applications: Apps,
  tracker: Track,
  details: ApplicationDetails,
  calendar: Cal,
  jobs: Jobs,
  search: SearchResults,
  saved: Saved,
  analytics: Analytics,
  profile: Profile,
  docs: Docs,
  notifications: Notes,
  settings: Settings,
  adash: AdminDash,
  ajobs: AdminJobs,
  aapps: AdminApps,
  ausers: AdminUsers,
  aprofile: AdminProfile,
};

/* ====================  Main App component  ==================== */
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [all, setAll] = useState([]);
  const [savedAll, setSavedAll] = useState({});
  const [docs, setDocs] = useState([]);
  const [theme, setTheme] = useLS("jt4-theme", "Light");
  const [email, setEmail] = useLS("jt3-me", null);
  const [readNotifications, setReadNotifications] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [findJobsQuery, setFindJobsQuery] = useState("");
  const [page, setPage] = useState(location.hash.slice(1));
  const [sel, setSel] = useState("");
  const [open, setOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useLS("jt_sidebar_collapsed", false);
  const [sidebarFlyoutOpen, setSidebarFlyoutOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, label: "" });
  const [loading, setLoading] = useState(true);

  /* ---------  Navigation & hash handling  --------- */
  useEffect(() => {
    const h = () => setPage(location.hash.slice(1));
    addEventListener("hashchange", h);
    return () => removeEventListener("hashchange", h);
  }, []);

  /* ---------  Theme handling  --------- */
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "Dark" || (theme === "System" && mq.matches);
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#100F0E" : "#F6EADD");
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  /* ---------  Global UI effects  --------- */
  useEffect(() => {
    document.body.classList.toggle("nolock", open);
    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSidebarFlyoutOpen(false);
      }
    };
    const size = () => innerWidth > 1000 && setOpen(false);
    addEventListener("keydown", key);
    addEventListener("resize", size);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("resize", size);
    };
  }, [open]);

  /* ---------  Session check  --------- */
  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api.getMe()
        .then((user) => {
          if (user && user.email) {
            setCurrentUser(user);
            setEmail(user.email);
          } else {
            api.logout();
            setCurrentUser(null);
            setEmail(null);
          }
        })
        .catch(() => {
          api.logout();
          setCurrentUser(null);
          setEmail(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  /* ---------  Data sync with backend  --------- */
  useEffect(() => {
    if (!email) return;

    api.getJobs().then((data) => Array.isArray(data) && setJobs(data)).catch((e) => console.warn("Jobs load error:", e));

    if (currentUser?.role === "ADMIN") {
      setReadNotifications([]);
    } else {
      api.getReadNotificationIds()
        .then((ids) => setReadNotifications(Array.isArray(ids) ? ids.map(String) : []))
        .catch((e) => console.warn("Notification read status load error:", e));
    }

    api.getApplications()
      .then((data) => Array.isArray(data) && setAll(data))
      .catch((e) => console.warn("Applications load error:", e));

    api.getSavedJobs()
      .then((data) => {
        if (data && typeof data === "object") setSavedAll((s) => ({ ...s, [email]: data }));
      })
      .catch((e) => console.warn("Saved jobs load error:", e));

    api.getDocuments()
      .then((data) => Array.isArray(data) && setDocs(data))
      .catch((e) => console.warn("Documents load error:", e));

    if (currentUser?.role === "ADMIN") {
      api.getAllUsers()
        .then((data) => Array.isArray(data) && setUsers(data))
        .catch((e) => console.warn("Users load error:", e));
    }
  }, [email, currentUser?.role]);

  /* ---------  Notification helpers  --------- */
  const markAllNotificationsRead = async () => {
    try {
      const ids = await api.markAllNotificationsAsRead();
      setReadNotifications(Array.isArray(ids) ? ids.map(String) : []);
    } catch (error) {
      console.warn("Mark notifications as read failed:", error);
      window.alert(error.message || "Could not save notification status.");
    }
  };

  const me = currentUser || (email ? { email, name: email.split("@")[0], role: "USER" } : null);

  const enter = (u) => {
    if (!u) {
      api.logout();
      setCurrentUser(null);
      setEmail(null);
      setJobs([]);
      setAll([]);
      setSavedAll({});
      setDocs([]);
      setReadNotifications([]);
    } else {
      setCurrentUser(u);
      setEmail(u.email);
    }
    setOpen(false);
    location.hash = "";
    setPage("");
  };

  /* ---------  UI loading states  --------- */
  const sortAppsDescending = (list) =>
    [...list].sort((a, b) => {
      const dateA = a.d || a.appliedDate || "";
      const dateB = b.d || b.appliedDate || "";
      const cmp = String(dateB).localeCompare(String(dateA));
      if (cmp !== 0) return cmp;
      return String(b.id || "").localeCompare(String(a.id || ""));
    });

  const allApps = useMemo(
    () => sortAppsDescending(all.map((a) => ({ ...a, name: a.name || a.userName || a.userEmail || a.u }))),
    [all]
  );
  const userApps = useMemo(
    () => sortAppsDescending(all.filter((a) => a.u === email || a.userEmail === email)),
    [all, email]
  );
  const readForUser = useMemo(() => new Set(readNotifications.map(String)), [readNotifications]);
  const notificationCount = useMemo(() => userApps.filter((a) => !readForUser.has(String(a.id))).length, [userApps, readForUser]);
  if (loading) {
    return (
      <div className="auth">
        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
          <h2>Connecting to JobTracker...</h2>
        </div>
      </div>
    );
  }

  if (!me) return <Login onAuth={enter} />;

  /* ---------  Computed data (memo)  --------- */
  const admin = me.role === "ADMIN", nav = admin ? ADMIN_NAV : NAV;
  const cur =
    page === "details" && !admin
      ? "details"
      : page === "search" && !admin
      ? "search"
      : page === "profile" && admin
      ? "aprofile"
      : nav.some((n) => n[0] === page)
      ? page
      : nav[0][0];
  const Page = PAGES[cur];
  const go = (p, id) => { if (id != null) setSel(id); setOpen(false); scrollTo(0, 0); location.hash = p; setPage(p); };

  const addApp = async (a) => {
    try {
      const created = await api.applyJob(a);
      if (created) setAll((x) => [created, ...x]);
    } catch (e) {
      alert(e.message || "Failed to submit application.");
    }
  };
  const setApp = async (id, patch) => {
    try {
      await api.updateApplicationStatus(id, patch);
      setAll((x) => x.map((a) => (a.id === id ? { ...a, ...patch } : a)));
    } catch (e) {
      alert("Failed to update status: " + e.message);
    }
  };
  const addJob = async (jobData) => {
    try {
      const created = await api.createJob(jobData);
      if (created) setJobs((j) => [created, ...j]);
    } catch (e) {
      alert("Failed to create job: " + e.message);
    }
  };
  const deleteJob = async (id) => {
    try {
      await api.deleteJob(id);
      setJobs((x) => x.filter((y) => y.id !== id));
    } catch (e) {
      alert("Failed to delete job: " + e.message);
    }
  };
  const onUpdateProfile = async (patch) => {
    const updated = await api.updateProfile(patch);
    if (updated) setCurrentUser(updated);
    return updated;
  };
  const onChangePassword = async (payload) => api.changePassword(payload);
  const addDoc = async (name, size, file) => {
    try {
      let created;
      if (file) {
        created = await api.uploadDocument(file);
      } else {
        created = await api.addDocument(name, size);
      }
      if (created) setDocs((prev) => [created, ...prev]);
    } catch (e) {
      alert("Document upload failed: " + e.message);
    }
  };
  const deleteDoc = async (id) => {
    try {
      await api.deleteDocument(id);
      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      alert("Document deletion failed: " + e.message);
    }
  };
  const saved = savedAll[email] || {};
  const setSaved = (fn) => setSavedAll((s) => {
    const nextSaved = fn(s[email] || {});
    const currentKeys = Object.keys(s[email] || {});
    const nextKeys = Object.keys(nextSaved);
    nextKeys.forEach((k) => {
      if (!currentKeys.includes(k)) api.saveJob(k, nextSaved[k]).catch(() => {});
    });
    currentKeys.forEach((k) => {
      if (!nextKeys.includes(k)) api.unsaveJob(k).catch(() => {});
    });
    return { ...s, [email]: nextSaved };
  });
return (
    <div
      className={
        "app" +
        (sidebarCollapsed ? " sidebar-collapsed" : "") +
        (sidebarFlyoutOpen ? " sidebar-flyout-open" : "")
      }
    >
      <aside
        className={
          "kinetic-menu" +
          (open ? " is-open" : "") +
          (sidebarCollapsed && !sidebarFlyoutOpen ? " is-collapsed" : "") +
          (sidebarFlyoutOpen ? " is-flyout-open" : "")
        }
        id="kinetic-menu"
        aria-label="Main navigation"
        onMouseEnter={() => {
          if (sidebarCollapsed && !sidebarFlyoutOpen) {
            setSidebarFlyoutOpen(true);
            setActiveTooltip(null);
          }
        }}
        onMouseLeave={() => {
          if (sidebarFlyoutOpen) {
            setSidebarFlyoutOpen(false);
            setActiveTooltip(null);
          }
        }}
      >
        <div className="kinetic-panel kinetic-panel-back" />
        <div className="kinetic-panel kinetic-panel-front" />

        <div className="kinetic-shapes" aria-hidden="true">
          <span className="kinetic-shape kinetic-shape-one" />
          <span className="kinetic-shape kinetic-shape-two" />
          <span className="kinetic-shape kinetic-shape-three" />
        </div>

        <div className="kinetic-menu-inner">
          <div className="kinetic-menu-header">
            <button
              type="button"
              className={"kinetic-brand" + (sidebarCollapsed ? " is-clickable-brand" : "")}
              title={sidebarCollapsed ? (sidebarFlyoutOpen ? "Close menu" : "Click to open menu (hover outside to close)") : undefined}
              aria-label={sidebarCollapsed ? "Open navigation menu" : "JobTracker brand"}
              onClick={() => {
                if (sidebarCollapsed) {
                  setSidebarFlyoutOpen((prev) => !prev);
                }
              }}
              onKeyDown={(e) => {
                if (sidebarCollapsed && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setSidebarFlyoutOpen((prev) => !prev);
                }
              }}
            >
              <I n="brief" s={25} />
              <span>Job<em>Tracker</em></span>
              <small>{admin ? "Admin Panel" : "Job Seeker Panel"}</small>
            </button>

            <button
              className="kinetic-close"
              type="button"
              aria-label="Close menu"
              onClick={() => {
                setOpen(false);
                setSidebarFlyoutOpen(false);
              }}
            >
              <I n="x" s={20} />
            </button>
          </div>

          <div className="kinetic-menu-body">
            <p className="kinetic-eyebrow">NAVIGATION / EXPLORE</p>

            <nav className="kinetic-links" aria-label="Main navigation">
              {nav.map(([k, l, i], index) => (
                <button
                  key={k}
                  type="button"
                  className={
                    "kinetic-link" +
                    (activeTooltip === k ? " tooltip-active" : "")
                  }
                  aria-current={cur === k}
                  aria-label={l}
                  title={sidebarCollapsed ? l : undefined}
                  onClick={(e) => {
                    if (sidebarCollapsed) {
                      setSidebarFlyoutOpen(true);
                    }
                    go(k);
                    if (window.innerWidth <= 1000) setOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    if (sidebarCollapsed) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPos({ top: rect.top + rect.height / 2, label: l });
                      setActiveTooltip(k);
                    }
                  }}
                  onMouseLeave={() => {
                    if (sidebarCollapsed) setActiveTooltip(null);
                  }}
                  onFocus={(e) => {
                    if (sidebarCollapsed) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPos({ top: rect.top + rect.height / 2, label: l });
                      setActiveTooltip(k);
                    }
                  }}
                  onBlur={() => {
                    if (sidebarCollapsed) setActiveTooltip(null);
                  }}
                  onTouchStart={(e) => {
                    if (sidebarCollapsed) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPos({ top: rect.top + rect.height / 2, label: l });
                      setActiveTooltip(k);
                    }
                  }}
                >
                  <span className="kinetic-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <I n={i} s={21} />
                  <span className="kinetic-link-label">{l}</span>
                  <span className="kinetic-arrow">↗</span>
                </button>
              ))}

              <button
                type="button"
                className={
                  "kinetic-link kinetic-logout" +
                  (activeTooltip === "logout" ? " tooltip-active" : "")
                }
                aria-label="Log out"
                title={sidebarCollapsed ? "Log out" : undefined}
                onClick={(e) => {
                  if (sidebarCollapsed) {
                    setSidebarFlyoutOpen(true);
                  }
                  enter(null);
                }}
                onMouseEnter={(e) => {
                  if (sidebarCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPos({ top: rect.top + rect.height / 2, label: "Log out" });
                    setActiveTooltip("logout");
                  }
                }}
                onMouseLeave={() => {
                  if (sidebarCollapsed) setActiveTooltip(null);
                }}
                onFocus={(e) => {
                  if (sidebarCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPos({ top: rect.top + rect.height / 2, label: "Log out" });
                    setActiveTooltip("logout");
                  }
                }}
                onBlur={() => {
                  if (sidebarCollapsed) setActiveTooltip(null);
                }}
                onTouchStart={(e) => {
                  if (sidebarCollapsed) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPos({ top: rect.top + rect.height / 2, label: "Log out" });
                    setActiveTooltip("logout");
                  }
                }}
              >
                <span className="kinetic-index">—</span>
                <I n="logout" s={21} />
                <span className="kinetic-link-label">Log out</span>
                <span className="kinetic-arrow">↗</span>
              </button>
            </nav>
          </div>

          <div className="kinetic-menu-footer">
            <span>JOBTRACKER</span>
            <span>YOUR CAREER JOURNEY</span>
          </div>
        </div>
      </aside>

      {sidebarCollapsed && !sidebarFlyoutOpen && activeTooltip && (
        <div
          className="sidebar-floating-tooltip"
          style={{ top: `${tooltipPos.top}px` }}
          role="tooltip"
          aria-live="polite"
        >
          {tooltipPos.label}
        </div>
      )}

      {open && <div className="scrim" onClick={() => setOpen(false)} />}

      <div
        className="main"
        onMouseDown={() => { if (sidebarFlyoutOpen) setSidebarFlyoutOpen(false); }}
        onMouseEnter={() => { if (sidebarFlyoutOpen) setSidebarFlyoutOpen(false); }}
      >
        <header className="top">
          <button
            className={"menu sidebar-toggle-btn" + (sidebarCollapsed ? " is-collapsed" : "") + (open ? " is-open" : "")}
            type="button"
            aria-label={
              window.innerWidth > 1000
                ? (sidebarCollapsed ? "Expand sidebar menu" : "Collapse sidebar menu")
                : (open ? "Close menu" : "Open menu")
            }
            title={
              sidebarCollapsed
                ? (sidebarFlyoutOpen ? "Close menu" : "Click to open menu (hover outside to close)")
                : "Collapse sidebar (icons only)"
            }
            aria-expanded={!sidebarCollapsed || sidebarFlyoutOpen}
            aria-controls="kinetic-menu"
            onClick={() => {
              if (window.innerWidth > 1000) {
                if (sidebarCollapsed) {
                  setSidebarFlyoutOpen((v) => !v);
                } else {
                  setSidebarCollapsed(true);
                }
              } else {
                setOpen((v) => !v);
              }
            }}
          >
            <svg
              className="toggle-svg-icon"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          

          <input type="search" placeholder="Search jobs..." aria-label="Search jobs" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !admin) go("search"); }} />

          {!admin && (
            <div className="notification-wrap">
              <button className="eye bell-button" type="button" aria-label={`Notifications, ${notificationCount} unread`} aria-expanded={notificationOpen} aria-controls="notification-dropdown" onClick={() => setNotificationOpen((v) => !v)}>
                <I n="bell" />
                              {notificationCount > 0 && (
                  <span className="notification-badge">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div
                  className="notification-dropdown"
                  id="notification-dropdown"
                >
                  <div className="notification-dropdown-header">
                    <b>Notifications</b>
                    <button
                      type="button"
                      onClick={markAllNotificationsRead}
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="notification-dropdown-list">
                    {userApps.slice(0, 5).map((a) => {
                      const isRead = readForUser.has(String(a.id));

                      return (
                        <button
                          type="button"
                          className="notification-dropdown-item"
                          key={a.id}
                          onClick={() => {
                            setNotificationOpen(false);
                            go("details", a.id);
                          }}
                        >
                          <span>
                            <b>{a.s || "Application update"}</b>
                            <small>
                              {a.company || a.c || a.companyName || a.employerName || "Company not available"} · {a.p}
                            </small>
                            <small>{fmt(a.d)}</small>
                          </span>

                          {!isRead && (
                            <i className="notification-unread-dot" />
                          )}
                        </button>
                      );
                    })}

                    {!userApps.length && (
                      <p className="empty">
                        No notifications yet.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="notification-dropdown-footer"
                    onClick={() => {
                      setNotificationOpen(false);
                      go("notifications");
                    }}
                  >
                    View all notifications →
                  </button>
                </div>
              )}
            </div>
          )}

          <button type="button" className="top-user" onClick={() => go(admin ? "aprofile" : "profile")} aria-label="Open My Profile" title="Open My Profile">
            {me.photo ? <img className="av top-user-photo" src={me.photo} alt="Profile" /> : <Av n={me.name} />}
            <div>
              <b>{me.name}</b>
              <small>{admin ? "Administrator" : "Job Seeker"}</small>
            </div>
          </button>
        </header>

        <main className="content">
          <Page
            apps={userApps}
            jobs={jobs}
            allApps={allApps}
            users={users}
            me={me}
            go={go}
            sel={sel}
            saved={saved}
            setSaved={setSaved}
            addApp={addApp}
            setApp={setApp}
            setJobs={setJobs}
            addJob={addJob}
            deleteJob={deleteJob}
            setUsers={setUsers}
            onUpdateProfile={onUpdateProfile}
            onChangePassword={onChangePassword}
            docs={docs}
            addDoc={addDoc}
            deleteDoc={deleteDoc}
            readIds={readNotifications}
            onMarkAllAsRead={markAllNotificationsRead}
            theme={theme}
            setTheme={setTheme}
            searchQuery={searchQuery}
            findJobsQuery={searchQuery}
          />
        </main>
      </div>
    </div>
  );
}
































