import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ─── tiny helpers ─────────────────────────────────────────── */
const badge = (label, color) => (
  <span
    style={{
      background: color + "18",
      color,
      border: `1px solid ${color}30`,
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 6,
      padding: "2px 8px",
      letterSpacing: ".04em",
      textTransform: "uppercase",
    }}
  >
    {label}
  </span>
);

const DURATIONS = ["monthly", "quarterly", "yearly", "lifetime"];
const BADGE_OPTIONS = ["", "Popular", "Best Value", "New", "Limited"];

const EMPTY_FORM = {
  name: "",
  price: "",
  duration: "monthly",
  badge: "",
  badgeColor: "#6366f1",
  ctaText: "Get Started",
  features: [""],
  isActive: true,
};

/* ─── FeatureList sub-component ────────────────────────────── */
function FeatureList({ features, onChange }) {
  const add = () => onChange([...features, ""]);
  const remove = (i) => onChange(features.filter((_, idx) => idx !== i));
  const update = (i, val) =>
    onChange(features.map((f, idx) => (idx === i ? val : f)));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {features.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "var(--accent)", fontSize: 16, lineHeight: 1 }}>
            ✓
          </span>
          <input
            value={f}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Feature ${i + 1}`}
            style={inputStyle}
          />
          {features.length > 1 && (
            <button
              type="button"
              onClick={() => remove(i)}
              style={{
                background: "var(--danger-soft)",
                color: "var(--danger-text)",
                border: "1px solid var(--danger-border)",
                borderRadius: 6,
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        style={{
          marginTop: 2,
          background: "var(--accent-soft)",
          color: "var(--accent-text)",
          border: "1px solid var(--accent-border)",
          borderRadius: 7,
          padding: "6px 14px",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          alignSelf: "flex-start",
        }}
      >
        + Add Feature
      </button>
    </div>
  );
}

/* ─── shared inline styles (theme-aware via CSS vars) ─────── */
const inputStyle = {
  flex: 1,
  background: "var(--bg-base)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "8px 12px",
  color: "var(--text-primary)",
  fontSize: 14,
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s",
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: "var(--text-muted)",
  letterSpacing: ".06em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 6,
};

/* ─── Modal ─────────────────────────────────────────────────── */
function PlanModal({ plan, onClose, onSave, loading }) {
  const [form, setForm] = useState(
    plan
      ? {
          ...plan,
          features: plan.features?.length ? plan.features : [""],
        }
      : EMPTY_FORM,
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price: parseFloat(form.price),
      features: form.features.filter((f) => f.trim()),
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 540,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "var(--shadow)",
          padding: "2rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            {plan ? "Edit Plan" : "New Plan"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          {/* Name + Price row */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            <div>
              <label style={labelStyle}>Plan Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Pro"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Price (₹)</label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="999"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label style={labelStyle}>Duration</label>
            <select
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Badge + color */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 14,
              alignItems: "end",
            }}
          >
            <div>
              <label style={labelStyle}>Badge / Tag</label>
              <select
                value={form.badge}
                onChange={(e) => set("badge", e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {BADGE_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b || "— None —"}
                  </option>
                ))}
              </select>
            </div>
            {form.badge && (
              <div style={{ paddingBottom: 2 }}>
                <label style={labelStyle}>Badge Color</label>
                <input
                  type="color"
                  value={form.badgeColor}
                  onChange={(e) => set("badgeColor", e.target.value)}
                  style={{
                    width: 44,
                    height: 38,
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: 3,
                    cursor: "pointer",
                    background: "var(--bg-base)",
                  }}
                />
              </div>
            )}
          </div>

          {/* CTA Text */}
          <div>
            <label style={labelStyle}>CTA Button Text</label>
            <input
              value={form.ctaText}
              onChange={(e) => set("ctaText", e.target.value)}
              placeholder="Get Started"
              style={inputStyle}
            />
          </div>

          {/* Features */}
          <div>
            <label style={labelStyle}>Features</label>
            <FeatureList
              features={form.features}
              onChange={(v) => set("features", v)}
            />
          </div>

          {/* Active toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label style={{ ...labelStyle, margin: 0 }}>
              Active on Website
            </label>
            <button
              type="button"
              onClick={() => set("isActive", !form.isActive)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 99,
                border: "none",
                background: form.isActive ? "var(--accent)" : "var(--border)",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 3,
                  left: form.isActive ? 22 : 3,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.2s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              />
            </button>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 4,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "var(--bg-hover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "9px 20px",
                color: "var(--text-sec)",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "var(--accent)",
                border: "none",
                borderRadius: 8,
                padding: "9px 24px",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 700,
                fontSize: 14,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving…" : plan ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── PlanCard ──────────────────────────────────────────────── */
function PlanCard({ plan, onEdit, onDelete, onToggle }) {
  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: `1px solid ${plan.isActive ? "var(--accent-border)" : "var(--border)"}`,
        borderRadius: 14,
        padding: "1.25rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: plan.isActive ? 1 : 0.6,
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent top bar */}
      {plan.isActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "var(--accent)",
            borderRadius: "14px 14px 0 0",
          }}
        />
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: plan.isActive ? 8 : 0,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {plan.name}
            </span>
            {plan.badge && badge(plan.badge, plan.badgeColor || "#6366f1")}
            {!plan.isActive && badge("Inactive", "#94a3b8")}
          </div>
          <div
            style={{
              marginTop: 4,
              display: "flex",
              alignItems: "baseline",
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "var(--accent-text)",
              }}
            >
              ₹{Number(plan.price).toLocaleString()}
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              / {plan.duration}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => onToggle(plan)}
            title={plan.isActive ? "Deactivate" : "Activate"}
            style={{
              background: plan.isActive
                ? "var(--danger-soft)"
                : "var(--accent-soft)",
              border: `1px solid ${plan.isActive ? "var(--danger-border)" : "var(--accent-border)"}`,
              color: plan.isActive
                ? "var(--danger-text)"
                : "var(--accent-text)",
              borderRadius: 7,
              padding: "5px 10px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {plan.isActive ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => onEdit(plan)}
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border)",
              color: "var(--text-sec)",
              borderRadius: 7,
              padding: "5px 10px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(plan)}
            style={{
              background: "var(--danger-soft)",
              border: "1px solid var(--danger-border)",
              color: "var(--danger-text)",
              borderRadius: 7,
              padding: "5px 10px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* CTA text */}
      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
        CTA:{" "}
        <span style={{ color: "var(--text-sec)", fontWeight: 600 }}>
          {plan.ctaText || "Get Started"}
        </span>
      </div>

      {/* Features */}
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {(plan.features || []).slice(0, 4).map((f, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              fontSize: 13,
              color: "var(--text-sec)",
            }}
          >
            <span style={{ color: "var(--accent)", fontSize: 12 }}>✓</span>
            {f}
          </li>
        ))}
        {plan.features?.length > 4 && (
          <li
            style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 20 }}
          >
            +{plan.features.length - 4} more features
          </li>
        )}
      </ul>
    </div>
  );
}

/* ─── Delete confirm ────────────────────────────────────────── */
function DeleteConfirm({ plan, onClose, onConfirm, loading }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--danger-border)",
          borderRadius: 14,
          padding: "2rem",
          maxWidth: 400,
          width: "100%",
          boxShadow: "var(--shadow)",
        }}
      >
        <h3
          style={{
            margin: "0 0 8px",
            color: "var(--danger-text)",
            fontWeight: 800,
          }}
        >
          Delete "{plan.name}"?
        </h3>
        <p
          style={{ margin: "0 0 20px", fontSize: 14, color: "var(--text-sec)" }}
        >
          This will permanently remove the plan. This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "8px 18px",
              color: "var(--text-sec)",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              background: "#ef4444",
              border: "none",
              borderRadius: 8,
              padding: "8px 18px",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 700,
              fontSize: 14,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Toast ─────────────────────────────────────────────────── */
function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 100,
        background: type === "error" ? "#ef4444" : "#22c55e",
        color: "#fff",
        borderRadius: 10,
        padding: "12px 20px",
        fontWeight: 700,
        fontSize: 14,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        animation: "slideUp 0.3s ease",
      }}
    >
      {msg}
    </div>
  );
}

/* ─── Main Plan page ─────────────────────────────────────────── */
export default function Plan() {
  const { theme } = useTheme();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modal, setModal] = useState(null); // null | "create" | plan_obj
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all"); // all | active | inactive
  const [search, setSearch] = useState("");

  /* Fetch */
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/plans`);
      const data = await res.json();
      setPlans(data);
    } catch {
      showToast("Failed to load plans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  /* CRUD */
  const handleSave = async (form) => {
    setSaving(true);
    try {
      const isEdit = modal && modal._id;
      const url = isEdit ? `${API}/plans/${modal._id}` : `${API}/plans`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      await fetchPlans();
      setModal(null);
      showToast(isEdit ? "Plan updated!" : "Plan created!");
    } catch {
      showToast("Failed to save plan", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API}/plans/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await fetchPlans();
      setDeleteTarget(null);
      showToast("Plan deleted");
    } catch {
      showToast("Failed to delete plan", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleToggle = async (plan) => {
    try {
      const res = await fetch(`${API}/plans/${plan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...plan, isActive: !plan.isActive }),
      });
      if (!res.ok) throw new Error();
      await fetchPlans();
      showToast(`Plan ${!plan.isActive ? "activated" : "hidden"}`);
    } catch {
      showToast("Failed to update plan", "error");
    }
  };

  /* Filtered plans */
  const displayed = plans.filter((p) => {
    if (filter === "active" && !p.isActive) return false;
    if (filter === "inactive" && p.isActive) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  /* Stats */
  const activeCount = plans.filter((p) => p.isActive).length;

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input:focus, select:focus { border-color: var(--accent) !important; }
      `}</style>

      {/* ── Page header ─────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 900,
              color: "var(--text-primary)",
            }}
          >
            Plans
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 14,
              color: "var(--text-muted)",
            }}
          >
            Manage pricing plans shown on the website
          </p>
        </div>
        <button
          onClick={() => setModal("create")}
          style={{
            background: "var(--accent)",
            border: "none",
            borderRadius: 9,
            padding: "10px 20px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Plan
        </button>
      </div>

      {/* ── Stats row ────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Total Plans",
            value: plans.length,
            color: "var(--accent-text)",
          },
          { label: "Active", value: activeCount, color: "#22c55e" },
          {
            label: "Inactive",
            value: plans.length - activeCount,
            color: "var(--text-muted)",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "14px 18px",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>
              {s.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters + search ─────────────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {["all", "active", "inactive"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background:
                filter === f ? "var(--accent-soft)" : "var(--bg-elevated)",
              border: `1px solid ${filter === f ? "var(--accent-border)" : "var(--border)"}`,
              color: filter === f ? "var(--accent-text)" : "var(--text-sec)",
              borderRadius: 7,
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plans…"
          style={{ ...inputStyle, maxWidth: 220 }}
        />
      </div>

      {/* ── Grid ─────────────────────────────────────────── */}
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 0",
            color: "var(--text-muted)",
          }}
        >
          Loading plans…
        </div>
      ) : displayed.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 0",
            color: "var(--text-muted)",
            border: "1px dashed var(--border)",
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>📋</div>
          <div style={{ fontWeight: 600 }}>No plans found</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            {search
              ? "Try a different search"
              : 'Click "+ New Plan" to create one'}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {displayed.map((p) => (
            <PlanCard
              key={p._id}
              plan={p}
              onEdit={(plan) => setModal(plan)}
              onDelete={(plan) => setDeleteTarget(plan)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {/* ── Modals ───────────────────────────────────────── */}
      {modal && (
        <PlanModal
          plan={modal === "create" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
          loading={saving}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          plan={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}
