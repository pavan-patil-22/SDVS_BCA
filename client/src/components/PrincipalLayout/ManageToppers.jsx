import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_API_URL } from "../../BaseAPI";

/* ============================================================
   SVG ICONS — zero emojis
============================================================ */
const IC = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const IconPlus       = ({ size }) => <IC size={size} d="M12 5v14M5 12h14" />;
const IconEdit       = ({ size }) => <IC size={size} d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />;
const IconTrash      = ({ size }) => <IC size={size} d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />;
const IconSearch     = ({ size }) => <IC size={size} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
const IconChevDown   = ({ size }) => <IC size={size} d="M6 9l6 6 6-6" />;
const IconChevUp     = ({ size }) => <IC size={size} d="M18 15l-6-6-6 6" />;
const IconTrophy     = ({ size }) => <IC size={size} d="M6 9H4a2 2 0 0 1-2-2V5h4M18 9h2a2 2 0 0 0 2-2V5h-4M6 9c0 4.97 2.686 9 6 9s6-4.03 6-9M9 21h6M12 18v3M8 21h8" />;
const IconGrad       = ({ size }) => <IC size={size} d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />;
const IconCrown      = ({ size }) => <IC size={size} d="M2 19h20M4 19l2-10 5 5 3-9 3 9 5-5 2 10" />;
const IconClose      = ({ size }) => <IC size={size} d="M18 6L6 18M6 6l12 12" />;
const IconUser       = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="28" r="17" fill="currentColor" opacity=".25" />
    <ellipse cx="40" cy="74" rx="28" ry="17" fill="currentColor" opacity=".18" />
  </svg>
);
const IconImg        = ({ size }) => <IC size={size} d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11M3 15l5-5 4 4 3-3 3 3" />;
const IconMedal      = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="15" r="5"/>
    <polyline points="8.56 2.9 7 7 12 10 17 7 15.44 2.9"/>
  </svg>
);
const IconCalendar   = ({ size }) => <IC size={size} d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />;
const IconPercent    = ({ size }) => <IC size={size} d="M19 5L5 19M6.5 6.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0M15.5 15.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />;
const IconFilter     = ({ size }) => <IC size={size} d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />;
const IconReset      = ({ size }) => <IC size={size} d="M3 12a9 9 0 1 0 2.636-6.364M3 3v5h5" />;
const IconSpinner    = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" style={{ animation: "mt-spin .8s linear infinite" }}>
    <path d="M12 2a10 10 0 0 1 0 20A10 10 0 0 1 12 2z" opacity=".2"/>
    <path d="M12 2a10 10 0 0 1 10 10"/>
  </svg>
);

/* ============================================================
   HELPERS
============================================================ */
const TYPES = {
  "Sem topper":                    { label: "Sem Topper",      color: "blue",   Icon: IconTrophy },
  "university topper":             { label: "University",       color: "amber",  Icon: IconGrad   },
  "best boy/girl of the college":  { label: "Best of College",  color: "rose",   Icon: IconCrown  },
};

const RANK_COLORS = { 1: "gold", 2: "silver", 3: "bronze" };

const rankLabel = (r) =>
  r == 1 ? "1st" : r == 2 ? "2nd" : r == 3 ? "3rd" : `#${r}`;

/* ── NEW: show CGPA if value < 10, else show % ── */
const formatScore = (value) => {
  if (value == null || value === "") return null;
  return Number(value) < 10 ? `${value} CGPA` : `${value}%`;
};

/* ============================================================
   MAIN COMPONENT
============================================================ */
const ManageToppers = () => {
  const [toppers,       setToppers]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [formLoading,   setFormLoading]   = useState(false);
  const [showModal,     setShowModal]     = useState(false);
  const [editMode,      setEditMode]      = useState(false);
  const [selectedId,    setSelectedId]    = useState(null);
  const [formData,      setFormData]      = useState(emptyForm());
  const [topperPhoto,   setTopperPhoto]   = useState(null);
  const [previewImage,  setPreviewImage]  = useState(null);
  const [activeTab,     setActiveTab]     = useState("all");
  const [searchTerm,    setSearchTerm]    = useState("");
  const [filterYear,    setFilterYear]    = useState("");
  const [expanded,      setExpanded]      = useState({});
  const [deleteId,      setDeleteId]      = useState(null);

  function emptyForm() {
    return { studentName: "", semester: "", year: "", percentage: "", rank: "", topperType: "", gender: "" };
  }

  /* ── fetch ── */
  const fetchToppers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_API_URL}/topper`);
      setToppers(res.data?.data || res.data || []);
    } catch {
      toast.error("Failed to load toppers");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchToppers(); }, []);

  /* ── filter ── */
  const filtered = toppers.filter(t => {
    if (activeTab !== "all" && t.topperType !== activeTab) return false;
    if (searchTerm && !t.studentName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterYear && t.year !== filterYear) return false;
    return true;
  });

  const years = [...new Set(toppers.map(t => t.year).filter(Boolean))].sort((a, b) => b.localeCompare(a));

  /* ── group helpers ── */
  const groupBy = (key, type, sortFn) => {
    const groups = {};
    filtered.filter(t => t.topperType === type).sort(sortFn).forEach(t => {
      const k = t[key] || "Unknown";
      groups[k] ??= [];
      groups[k].push(t);
    });
    return Object.entries(groups);
  };

  const semGroups  = groupBy("semester", "Sem topper", (a, b) =>
    (+a.semester - +b.semester) || (+a.rank - +b.rank));
  const uniGroups  = groupBy("year", "university topper", (a, b) =>
    b.year.localeCompare(a.year) || (+a.rank - +b.rank));
  const bestGroups = groupBy("year", "best boy/girl of the college", (a, b) =>
    b.year.localeCompare(a.year));

  /* ── CRUD ── */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "topperPhoto" && files?.[0]) {
      setTopperPhoto(files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined) data.append(k, v);
    });
    if (topperPhoto) data.append("topperPhoto", topperPhoto);

    try {
      setFormLoading(true);
      if (editMode && selectedId) {
        await axios.put(`${BASE_API_URL}/topper/${selectedId}`, data);
        toast.success("Topper updated.");
      } else {
        await axios.post(`${BASE_API_URL}/topper`, data);
        toast.success("Topper added.");
      }
      fetchToppers();
      closeModal();
    } catch {
      toast.error("Failed to save topper.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (t) => {
    setEditMode(true);
    setSelectedId(t._id);
    setFormData({ studentName: t.studentName, semester: t.semester ?? "", year: t.year, percentage: t.percentage ?? "", rank: t.rank ?? "", topperType: t.topperType, gender: t.gender ?? "" });
    setTopperPhoto(null);
    setPreviewImage(t.photo || null);
    setShowModal(true);
  };

  const confirmDelete = (id) => setDeleteId(id);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setLoading(true);
      await axios.delete(`${BASE_API_URL}/topper/${deleteId}`);
      toast.success("Topper deleted.");
      fetchToppers();
    } catch {
      toast.error("Failed to delete topper.");
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedId(null);
    setFormData(emptyForm());
    setTopperPhoto(null);
    setPreviewImage(null);
  };

  const toggleSection = (key) =>
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const resetFilters = () => { setSearchTerm(""); setFilterYear(""); setActiveTab("all"); };

  /* ── counts per tab ── */
  const counts = {
    all:                              filtered.length,
    "Sem topper":                     filtered.filter(t => t.topperType === "Sem topper").length,
    "university topper":              filtered.filter(t => t.topperType === "university topper").length,
    "best boy/girl of the college":   filtered.filter(t => t.topperType === "best boy/girl of the college").length,
  };

  /* ── tab definitions ── */
  const TABS = [
    { key: "all",                           label: "All",           Icon: IconFilter  },
    { key: "Sem topper",                    label: "Sem Toppers",   Icon: IconTrophy  },
    { key: "university topper",             label: "University",    Icon: IconGrad    },
    { key: "best boy/girl of the college",  label: "Best of College", Icon: IconCrown },
  ];

  return (
    <div className="mt-root">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* ── PAGE HEADER ── */}
      <header className="mt-header">
        <div className="mt-header-inner">
          <div className="mt-header-text">
            <div className="mt-header-eyebrow">
              <IconTrophy size={13} />
              <span>Academic Records</span>
            </div>
            <h1 className="mt-header-title">Toppers Management</h1>
            <p className="mt-header-sub">Add, edit and organise academic achievers across semesters and years.</p>
          </div>
          <button className="mt-btn-add" onClick={() => { closeModal(); setShowModal(true); }}>
            <IconPlus size={15} />
            Add Topper
          </button>
        </div>
      </header>

      <div className="mt-body">

        {/* ── FILTER BAR ── */}
        <div className="mt-filter-bar">
          <div className="mt-search-wrap">
            <span className="mt-search-icon"><IconSearch size={14} /></span>
            <input
              className="mt-search-input"
              type="text"
              placeholder="Search by student name…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="mt-select" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="">All years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          {(searchTerm || filterYear) && (
            <button className="mt-btn-ghost" onClick={resetFilters}>
              <IconReset size={14} />
              Clear
            </button>
          )}
        </div>

        {/* ── TAB BAR ── */}
        <nav className="mt-tabs">
          {TABS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`mt-tab${activeTab === key ? " mt-tab--active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={14} />
              {label}
              <span className="mt-tab-count">{counts[key]}</span>
            </button>
          ))}
        </nav>

        {/* ── CONTENT ── */}
        {loading ? (
          <div className="mt-loading">
            <IconSpinner size={32} />
            <span>Loading records…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-empty">
            <div className="mt-empty-icon"><IconTrophy size={36} /></div>
            <h3>No records found</h3>
            <p>{searchTerm || filterYear ? "Try adjusting your search or year filter." : "Start by adding academic achievers."}</p>
            <div className="mt-empty-actions">
              <button className="mt-btn-add" onClick={() => { closeModal(); setShowModal(true); }}>
                <IconPlus size={14} /> Add Topper
              </button>
              {(searchTerm || filterYear) && (
                <button className="mt-btn-ghost" onClick={resetFilters}>
                  <IconReset size={14} /> Clear filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-sections">
            {/* Semester toppers */}
            {(activeTab === "all" || activeTab === "Sem topper") && semGroups.length > 0 && (
              <SectionBlock
                icon={<IconTrophy size={15} />}
                title="Semester Toppers"
                color="blue"
                groups={semGroups}
                groupLabelFn={sem => `Semester ${sem}`}
                prefix="sem"
                expanded={expanded}
                toggleSection={toggleSection}
                handleEdit={handleEdit}
                confirmDelete={confirmDelete}
                autoExpand={activeTab === "Sem topper"}
              />
            )}
            {/* University toppers */}
            {(activeTab === "all" || activeTab === "university topper") && uniGroups.length > 0 && (
              <SectionBlock
                icon={<IconGrad size={15} />}
                title="University Rank Holders"
                color="amber"
                groups={uniGroups}
                groupLabelFn={y => `Academic Year ${y}`}
                prefix="uni"
                expanded={expanded}
                toggleSection={toggleSection}
                handleEdit={handleEdit}
                confirmDelete={confirmDelete}
                autoExpand={activeTab === "university topper"}
              />
            )}
            {/* Best boy/girl */}
            {(activeTab === "all" || activeTab === "best boy/girl of the college") && bestGroups.length > 0 && (
              <SectionBlock
                icon={<IconCrown size={15} />}
                title="Best of the College"
                color="rose"
                groups={bestGroups}
                groupLabelFn={y => `Academic Year ${y}`}
                prefix="best"
                expanded={expanded}
                toggleSection={toggleSection}
                handleEdit={handleEdit}
                confirmDelete={confirmDelete}
                autoExpand={activeTab === "best boy/girl of the college"}
              />
            )}
          </div>
        )}
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      {showModal && (
        <ModalOverlay onClose={closeModal}>
          <div className="mt-modal">
            <div className="mt-modal-head">
              <h2 className="mt-modal-title">
                {editMode ? "Edit Topper" : "Add New Topper"}
              </h2>
              <button className="mt-modal-close" onClick={closeModal}>
                <IconClose size={18} />
              </button>
            </div>

            <form className="mt-modal-body" onSubmit={handleSubmit}>
              <div className="mt-form-grid">
                {/* Name */}
                <FormField label="Student Name" required span={2}>
                  <input className="mt-input" type="text" name="studentName"
                    value={formData.studentName} onChange={handleChange}
                    placeholder="Full name" required />
                </FormField>

                {/* Topper type */}
                <FormField label="Topper Type" required>
                  <select className="mt-input" name="topperType"
                    value={formData.topperType} onChange={handleChange} required>
                    <option value="">Select type…</option>
                    <option value="Sem topper">Sem Topper</option>
                    <option value="university topper">University Topper</option>
                    <option value="best boy/girl of the college">Best of the College</option>
                  </select>
                </FormField>

                {/* Gender */}
                <FormField label="Gender">
                  <select className="mt-input" name="gender"
                    value={formData.gender} onChange={handleChange}>
                    <option value="">Select…</option>
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                  </select>
                </FormField>

                {/* Year */}
                <FormField label="Academic Year" required>
                  <input className="mt-input" type="text" name="year"
                    value={formData.year} onChange={handleChange}
                    placeholder="e.g. 2023" required />
                </FormField>

                {/* Semester — only for sem topper */}
                {formData.topperType === "Sem topper" && (
                  <FormField label="Semester">
                    <input className="mt-input" type="number" name="semester" min="1"
                      value={formData.semester} onChange={handleChange}
                      placeholder="e.g. 4" />
                  </FormField>
                )}

                {/* Percentage */}
                <FormField label="Percentage / CGPA">
                  <input className="mt-input" type="number" step="0.01" name="percentage"
                    value={formData.percentage} onChange={handleChange}
                    placeholder="e.g. 94.5 or 8.7" />
                </FormField>

                {/* Rank */}
                <FormField label="Rank">
                  <input className="mt-input" type="number" name="rank" min="1"
                    value={formData.rank} onChange={handleChange}
                    placeholder="e.g. 1" />
                </FormField>

                {/* Photo */}
                <FormField label="Student Photo" span={2}>
                  <PhotoPicker
                    previewImage={previewImage}
                    editMode={editMode}
                    onChange={e => {
                      const f = e.target.files?.[0];
                      if (f) { setTopperPhoto(f); setPreviewImage(URL.createObjectURL(f)); }
                    }}
                    onClear={() => { setTopperPhoto(null); setPreviewImage(null); }}
                  />
                </FormField>
              </div>

              <div className="mt-modal-foot">
                <button type="button" className="mt-btn-ghost" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="mt-btn-add" disabled={formLoading}>
                  {formLoading ? <IconSpinner size={14} /> : null}
                  {editMode ? "Update Topper" : "Add Topper"}
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteId && (
        <ModalOverlay onClose={() => setDeleteId(null)}>
          <div className="mt-confirm">
            <div className="mt-confirm-icon">
              <IconTrash size={28} />
            </div>
            <h3>Delete this topper?</h3>
            <p>This action cannot be undone. The student record will be permanently removed.</p>
            <div className="mt-confirm-actions">
              <button className="mt-btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="mt-btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      <Styles />
    </div>
  );
};

/* ============================================================
   SECTION BLOCK — collapses per sub-group
============================================================ */
const SectionBlock = ({
  icon, title, color, groups, groupLabelFn,
  prefix, expanded, toggleSection, handleEdit, confirmDelete, autoExpand
}) => (
  <div className={`mt-section mt-section--${color}`}>
    <div className="mt-section-head">
      <span className={`mt-section-icon mt-section-icon--${color}`}>{icon}</span>
      <h2 className="mt-section-title">{title}</h2>
      <span className="mt-section-rule" />
    </div>

    {groups.map(([groupKey, items]) => {
      const key = `${prefix}-${groupKey}`;
      const isOpen = autoExpand || expanded[key];
      return (
        <div key={key} className="mt-group">
          <button className="mt-group-head" onClick={() => toggleSection(key)}>
            <span className="mt-group-label">
              {icon}
              {groupLabelFn(groupKey)}
            </span>
            <span className="mt-group-meta">
              <span className={`mt-badge mt-badge--${color}`}>{items.length} student{items.length !== 1 ? "s" : ""}</span>
              {isOpen ? <IconChevUp size={14} /> : <IconChevDown size={14} />}
            </span>
          </button>
          {isOpen && (
            <div className="mt-group-body">
              <div className="mt-card-grid">
                {items.map((t, i) => (
                  <TopperCard
                    key={t._id} topper={t} delay={i * 0.06}
                    handleEdit={handleEdit} confirmDelete={confirmDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
);

/* ============================================================
   TOPPER CARD
============================================================ */
const TopperCard = ({ topper: t, delay, handleEdit, confirmDelete }) => {
  const meta = TYPES[t.topperType] || TYPES["Sem topper"];
  const rankColor = RANK_COLORS[t.rank] || "plain";
  const score = formatScore(t.percentage); // ← CHANGED

  return (
    <div className="mt-card" style={{ animationDelay: `${delay}s` }}>
      {/* image / avatar */}
      <div className="mt-card-img">
        {t.photo
          ? <img src={t.photo} alt={t.studentName} onError={e => { e.currentTarget.style.display = "none"; }} />
          : <div className="mt-card-avatar"><IconUser size={44} /></div>
        }
        {t.rank && (
          <span className={`mt-rank-chip mt-rank-chip--${rankColor}`}>
            <IconMedal size={10} />
            {rankLabel(t.rank)}
          </span>
        )}
        {/* action buttons — appear on hover */}
        <div className="mt-card-actions">
          <button className="mt-card-action mt-card-action--edit" title="Edit" onClick={() => handleEdit(t)}>
            <IconEdit size={13} />
          </button>
          <button className="mt-card-action mt-card-action--del" title="Delete" onClick={() => confirmDelete(t._id)}>
            <IconTrash size={13} />
          </button>
        </div>
      </div>

      {/* info */}
      <div className="mt-card-info">
        <div className="mt-card-name">{t.studentName}</div>
        <div className="mt-card-pills">
          <span className={`mt-pill mt-pill--${meta.color}`}>
            <meta.Icon size={10} />
            {meta.label}
            {t.gender ? ` · ${t.gender}` : ""}
          </span>
        </div>
        <div className="mt-card-details">
          {t.semester && (
            <span className="mt-card-detail">
              <IconTrophy size={11} /> Sem {t.semester}
            </span>
          )}
          <span className="mt-card-detail">
            <IconCalendar size={11} /> {t.year}
          </span>
          {/* ── CHANGED: show CGPA if value < 10, else show % ── */}
          {score && (
            <span className="mt-card-detail">
              <IconPercent size={11} /> {score}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   FORM FIELD
============================================================ */
const FormField = ({ label, required, span = 1, children }) => (
  <div className="mt-form-field" style={{ gridColumn: `span ${span}` }}>
    <label className="mt-form-label">
      {label}{required && <span className="mt-req">*</span>}
    </label>
    {children}
  </div>
);

/* ============================================================
   PHOTO PICKER
============================================================ */
const PhotoPicker = ({ previewImage, editMode, onChange, onClear }) => {
  const ref = useRef(null);
  return (
    <div className="mt-photo-picker">
      {previewImage ? (
        <div className="mt-photo-preview-wrap">
          <img className="mt-photo-preview" src={previewImage} alt="Preview" />
          <button type="button" className="mt-photo-clear" onClick={onClear}>
            <IconClose size={12} />
          </button>
        </div>
      ) : (
        <div className="mt-photo-drop" onClick={() => ref.current?.click()}>
          <IconImg size={22} />
          <span>{editMode ? "Upload new photo (optional)" : "Upload student photo"}</span>
          <span className="mt-photo-hint">Click to browse · JPG, PNG</span>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }}
        onChange={onChange} required={!editMode && !previewImage} />
    </div>
  );
};

/* ============================================================
   MODAL OVERLAY
============================================================ */
const ModalOverlay = ({ children, onClose }) => (
  <div className="mt-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    {children}
  </div>
);

/* ============================================================
   STYLES — all scoped under .mt-root
============================================================ */
const Styles = () => (
  <style>{`

    /* ── TOKENS ── */
    .mt-root {
      --white:    #ffffff;
      --off:      #faf9f7;
      --off2:     #f2efea;
      --border:   #e8e3da;
      --border2:  #d6d0c5;
      --text:     #18160f;
      --muted:    #6e6a60;

      /* blues */
      --blue-lt:  #e8f0fb;
      --blue:     #3b82f6;
      --blue-dk:  #1e40af;

      /* amber */
      --amber-lt: #fef3c7;
      --amber:    #f59e0b;
      --amber-dk: #92400e;

      /* rose */
      --rose-lt:  #fce7f3;
      --rose:     #ec4899;
      --rose-dk:  #831843;

      /* gold / silver / bronze */
      --gold:     #c9a84c;
      --gold-bg:  rgba(201,168,76,.9);
      --gold-txt: #3a2800;
      --silver:   #a0a0a0;
      --sil-bg:   rgba(175,175,175,.9);
      --bronze:   #a8722a;
      --bron-bg:  rgba(168,114,42,.9);

      --sh-sm:    0 2px 12px rgba(0,0,0,.06);
      --sh-md:    0 8px 28px rgba(0,0,0,.11);
      --r:        14px;
      --r-sm:     8px;
      --r-xs:     5px;

      font-family: 'DM Sans', sans-serif;
      background: var(--off);
      color: var(--text);
      min-height: 100vh;
    }

    /* ── HEADER ── */
    .mt-header {
      background: var(--white);
      border-bottom: 1px solid var(--border);
    }
    .mt-header-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 28px 28px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }
    .mt-header-eyebrow {
      display: inline-flex; align-items: center; gap: 7px;
      font-size: 11px; font-weight: 600; letter-spacing: .1em;
      text-transform: uppercase; color: var(--muted);
      margin-bottom: 10px;
    }
    .mt-header-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(26px, 4vw, 40px);
      font-weight: 700; color: var(--text);
      margin: 0 0 6px; line-height: 1.1;
    }
    .mt-header-sub {
      font-size: 13.5px; color: var(--muted);
      font-weight: 300; margin: 0;
    }

    /* ── BODY ── */
    .mt-body {
      max-width: 1200px;
      margin: 0 auto;
      padding: 28px 28px 80px;
    }

    /* ── FILTER BAR ── */
    .mt-filter-bar {
      display: flex; flex-wrap: wrap; align-items: center;
      gap: 10px; margin-bottom: 20px;
    }
    .mt-search-wrap {
      position: relative; flex: 1; min-width: 200px;
    }
    .mt-search-icon {
      position: absolute; left: 12px; top: 50%;
      transform: translateY(-50%);
      color: var(--muted); pointer-events: none;
      display: flex; align-items: center;
    }
    .mt-search-input {
      width: 100%; padding: 9px 14px 9px 36px;
      border: 1.5px solid var(--border2);
      border-radius: var(--r-sm);
      background: var(--white);
      font-family: inherit; font-size: 13.5px;
      color: var(--text);
      outline: none;
      transition: border-color .2s, box-shadow .2s;
    }
    .mt-search-input::placeholder { color: var(--muted); }
    .mt-search-input:focus {
      border-color: var(--text);
      box-shadow: 0 0 0 3px rgba(24,22,15,.07);
    }
    .mt-select {
      padding: 9px 14px;
      border: 1.5px solid var(--border2);
      border-radius: var(--r-sm);
      background: var(--white);
      font-family: inherit; font-size: 13.5px;
      color: var(--text); outline: none;
      min-width: 140px; cursor: pointer;
      transition: border-color .2s;
    }
    .mt-select:focus { border-color: var(--text); }

    /* ── BUTTONS ── */
    .mt-btn-add {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 9px 20px;
      background: var(--text); color: #fff;
      border: none; border-radius: var(--r-sm);
      font-family: inherit; font-size: 13.5px; font-weight: 600;
      cursor: pointer; white-space: nowrap;
      transition: opacity .18s, transform .18s;
    }
    .mt-btn-add:hover { opacity: .88; transform: translateY(-1px); }
    .mt-btn-add:disabled { opacity: .55; cursor: not-allowed; transform: none; }

    .mt-btn-ghost {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 16px;
      background: transparent; color: var(--muted);
      border: 1.5px solid var(--border2); border-radius: var(--r-sm);
      font-family: inherit; font-size: 13.5px; font-weight: 500;
      cursor: pointer; transition: all .18s;
    }
    .mt-btn-ghost:hover { border-color: var(--text); color: var(--text); }

    .mt-btn-danger {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 20px;
      background: #dc2626; color: #fff;
      border: none; border-radius: var(--r-sm);
      font-family: inherit; font-size: 13.5px; font-weight: 600;
      cursor: pointer; transition: opacity .18s;
    }
    .mt-btn-danger:hover { opacity: .88; }

    /* ── TABS ── */
    .mt-tabs {
      display: flex; flex-wrap: wrap; gap: 4px;
      padding: 4px;
      background: var(--off2);
      border-radius: var(--r-sm);
      border: 1px solid var(--border);
      margin-bottom: 28px;
    }
    .mt-tab {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 16px; border-radius: 6px;
      border: none; background: transparent;
      color: var(--muted);
      font-family: inherit; font-size: 13px; font-weight: 500;
      cursor: pointer; transition: all .2s;
      white-space: nowrap;
    }
    .mt-tab:hover { color: var(--text); background: rgba(24,22,15,.05); }
    .mt-tab--active {
      background: var(--white); color: var(--text);
      box-shadow: var(--sh-sm);
    }
    .mt-tab-count {
      font-size: 11px; font-weight: 700;
      background: var(--off2);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 1px 7px;
      color: var(--muted);
    }
    .mt-tab--active .mt-tab-count {
      background: var(--text); color: #fff;
      border-color: transparent;
    }

    /* ── SECTIONS ── */
    .mt-sections { display: flex; flex-direction: column; gap: 32px; }

    .mt-section {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--r);
      overflow: hidden;
    }
    .mt-section-head {
      display: flex; align-items: center; gap: 12px;
      padding: 20px 22px;
      border-bottom: 1px solid var(--border);
    }
    .mt-section-icon {
      width: 34px; height: 34px; border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .mt-section-icon--blue  { background: var(--blue-lt);  color: var(--blue-dk); }
    .mt-section-icon--amber { background: var(--amber-lt); color: var(--amber-dk); }
    .mt-section-icon--rose  { background: var(--rose-lt);  color: var(--rose-dk); }
    .mt-section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; font-weight: 700; color: var(--text); margin: 0;
    }
    .mt-section-rule { flex: 1; height: 1px; background: linear-gradient(90deg, var(--border), transparent); }

    /* ── GROUPS ── */
    .mt-group { border-bottom: 1px solid var(--border); }
    .mt-group:last-child { border-bottom: none; }

    .mt-group-head {
      width: 100%;
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 22px;
      background: var(--off);
      border: none; cursor: pointer;
      font-family: inherit;
      transition: background .15s;
      text-align: left;
    }
    .mt-group-head:hover { background: var(--off2); }

    .mt-group-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 13.5px; font-weight: 600; color: var(--text);
    }
    .mt-group-meta {
      display: inline-flex; align-items: center; gap: 10px;
      color: var(--muted);
    }

    /* ── BADGES ── */
    .mt-badge {
      font-size: 11px; font-weight: 700;
      padding: 2px 9px; border-radius: 999px;
      text-transform: uppercase; letter-spacing: .06em;
    }
    .mt-badge--blue  { background: var(--blue-lt);  color: var(--blue-dk); }
    .mt-badge--amber { background: var(--amber-lt); color: var(--amber-dk); }
    .mt-badge--rose  { background: var(--rose-lt);  color: var(--rose-dk); }

    /* ── CARD GRID ── */
    .mt-group-body { padding: 20px 22px; }

    .mt-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 18px;
    }

    /* ── TOPPER CARD ── */
    .mt-card {
      border: 1px solid var(--border);
      border-radius: var(--r);
      overflow: hidden;
      background: var(--white);
      box-shadow: var(--sh-sm);
      animation: mt-fadeUp .5s ease both;
      transition: box-shadow .3s ease, transform .3s ease;
    }
    .mt-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--sh-md);
    }

    .mt-card-img {
      position: relative;
      height: 200px;
      background: var(--off2);
      overflow: hidden;
    }
    .mt-card-img img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: top center;
      transition: transform .45s ease;
    }
    .mt-card:hover .mt-card-img img { transform: scale(1.06); }
    .mt-card-avatar {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      color: var(--muted);
      background: linear-gradient(160deg, var(--off2), var(--border));
    }

    /* rank chip */
    .mt-rank-chip {
      position: absolute; bottom: 9px; left: 9px;
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 9px; border-radius: 999px;
      font-size: 10.5px; font-weight: 700;
      backdrop-filter: blur(8px);
    }
    .mt-rank-chip--gold   { background: var(--gold-bg);  color: var(--gold-txt); }
    .mt-rank-chip--silver { background: var(--sil-bg);   color: #111; }
    .mt-rank-chip--bronze { background: var(--bron-bg);  color: #fff; }
    .mt-rank-chip--plain  { background: rgba(240,237,232,.92); color: #555; }

    /* action buttons */
    .mt-card-actions {
      position: absolute; top: 9px; right: 9px;
      display: flex; gap: 5px;
      opacity: 0; transition: opacity .2s ease;
    }
    .mt-card:hover .mt-card-actions { opacity: 1; }
    .mt-card-action {
      width: 30px; height: 30px;
      display: flex; align-items: center; justify-content: center;
      border: none; border-radius: 50%; cursor: pointer;
      font-size: 12px;
      backdrop-filter: blur(8px);
      transition: transform .15s;
    }
    .mt-card-action:hover { transform: scale(1.15); }
    .mt-card-action--edit { background: rgba(255,255,255,.92); color: var(--text); }
    .mt-card-action--del  { background: rgba(220,38,38,.88);   color: #fff; }

    /* card info */
    .mt-card-info { padding: 13px 14px 16px; border-top: 1px solid var(--border); }
    .mt-card-name {
      font-size: 13.5px; font-weight: 600;
      color: var(--text); margin-bottom: 8px; line-height: 1.3;
    }
    .mt-card-pills { margin-bottom: 8px; display: flex; flex-wrap: wrap; gap: 4px; }
    .mt-pill {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 10.5px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .05em;
      padding: 2px 8px; border-radius: 4px;
    }
    .mt-pill--blue  { background: var(--blue-lt);  color: var(--blue-dk); }
    .mt-pill--amber { background: var(--amber-lt); color: var(--amber-dk); }
    .mt-pill--rose  { background: var(--rose-lt);  color: var(--rose-dk); }

    .mt-card-details { display: flex; flex-direction: column; gap: 4px; }
    .mt-card-detail {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 11.5px; color: var(--muted);
    }

    /* ── LOADING / EMPTY ── */
    .mt-loading {
      display: flex; align-items: center; justify-content: center;
      gap: 14px; padding: 80px 20px;
      color: var(--muted); font-size: 14px;
    }
    .mt-empty {
      text-align: center; padding: 80px 20px;
      background: var(--white); border: 1px solid var(--border);
      border-radius: var(--r);
    }
    .mt-empty-icon {
      width: 64px; height: 64px; border-radius: 18px;
      background: var(--off2); margin: 0 auto 20px;
      display: flex; align-items: center; justify-content: center;
      color: var(--muted);
    }
    .mt-empty h3 { font-size: 18px; font-weight: 600; margin: 0 0 8px; }
    .mt-empty p  { color: var(--muted); font-size: 13.5px; margin: 0 0 24px; }
    .mt-empty-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

    /* ── OVERLAY ── */
    .mt-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.45);
      backdrop-filter: blur(3px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      z-index: 9999;
      animation: mt-fadeIn .2s ease;
    }

    /* ── MODAL ── */
    .mt-modal {
      background: var(--white);
      border-radius: var(--r);
      width: 100%; max-width: 640px;
      max-height: 90vh; overflow-y: auto;
      animation: mt-scaleIn .25s cubic-bezier(.22,1,.36,1);
      box-shadow: 0 24px 80px rgba(0,0,0,.22);
    }
    .mt-modal-head {
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 24px 18px;
      border-bottom: 1px solid var(--border);
      position: sticky; top: 0; background: var(--white); z-index: 1;
    }
    .mt-modal-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px; font-weight: 700; margin: 0;
    }
    .mt-modal-close {
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      border: none; background: var(--off2); border-radius: var(--r-xs);
      cursor: pointer; color: var(--muted);
      transition: background .15s, color .15s;
    }
    .mt-modal-close:hover { background: var(--border); color: var(--text); }

    .mt-modal-body { padding: 24px; }
    .mt-modal-foot {
      display: flex; align-items: center; justify-content: flex-end;
      gap: 10px; padding: 16px 24px;
      border-top: 1px solid var(--border);
      position: sticky; bottom: 0; background: var(--white);
    }

    /* ── FORM ── */
    .mt-form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .mt-form-field { display: flex; flex-direction: column; gap: 6px; }
    .mt-form-label {
      font-size: 12.5px; font-weight: 600;
      color: var(--muted); text-transform: uppercase; letter-spacing: .07em;
    }
    .mt-req { color: #dc2626; margin-left: 3px; }
    .mt-input {
      padding: 9px 12px;
      border: 1.5px solid var(--border2);
      border-radius: var(--r-sm);
      background: var(--white);
      font-family: inherit; font-size: 13.5px; color: var(--text);
      outline: none; width: 100%;
      transition: border-color .2s, box-shadow .2s;
    }
    .mt-input:focus {
      border-color: var(--text);
      box-shadow: 0 0 0 3px rgba(24,22,15,.07);
    }

    /* ── PHOTO PICKER ── */
    .mt-photo-picker { display: flex; align-items: flex-start; gap: 12px; }
    .mt-photo-drop {
      flex: 1; min-height: 90px;
      border: 1.5px dashed var(--border2);
      border-radius: var(--r-sm);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 6px; cursor: pointer; color: var(--muted);
      font-size: 13px;
      transition: border-color .2s, background .2s;
    }
    .mt-photo-drop:hover { border-color: var(--text); background: var(--off); }
    .mt-photo-hint { font-size: 11px; color: var(--border2); }
    .mt-photo-preview-wrap { position: relative; }
    .mt-photo-preview {
      width: 90px; height: 90px;
      object-fit: cover; border-radius: var(--r-sm);
      border: 1.5px solid var(--border);
    }
    .mt-photo-clear {
      position: absolute; top: -8px; right: -8px;
      width: 22px; height: 22px;
      background: #dc2626; color: #fff;
      border: none; border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── CONFIRM DIALOG ── */
    .mt-confirm {
      background: var(--white);
      border-radius: var(--r);
      width: 100%; max-width: 380px;
      padding: 32px 28px;
      text-align: center;
      animation: mt-scaleIn .22s cubic-bezier(.22,1,.36,1);
      box-shadow: 0 24px 80px rgba(0,0,0,.22);
    }
    .mt-confirm-icon {
      width: 60px; height: 60px;
      background: #fee2e2; color: #dc2626;
      border-radius: 18px; margin: 0 auto 20px;
      display: flex; align-items: center; justify-content: center;
    }
    .mt-confirm h3 { font-size: 18px; font-weight: 700; margin: 0 0 10px; }
    .mt-confirm p  { font-size: 13.5px; color: var(--muted); margin: 0 0 24px; line-height: 1.6; }
    .mt-confirm-actions { display: flex; gap: 10px; justify-content: center; }

    /* ── KEYFRAMES ── */
    @keyframes mt-fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes mt-fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes mt-scaleIn {
      from { opacity: 0; transform: scale(.94) translateY(10px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes mt-spin { to { transform: rotate(360deg); } }

    /* ── RESPONSIVE ── */
    @media (max-width: 640px) {
      .mt-header-inner { padding: 22px 16px 20px; }
      .mt-body { padding: 18px 14px 60px; }
      .mt-form-grid { grid-template-columns: 1fr; }
      .mt-form-field[style*="span 2"] { grid-column: span 1; }
      .mt-card-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .mt-card-img { height: 160px; }
      .mt-card-actions { opacity: 1; }
      .mt-tabs { gap: 2px; }
      .mt-tab { font-size: 12px; padding: 6px 10px; gap: 4px; }
      .mt-group-body { padding: 14px 14px; }
      .mt-section-head { padding: 16px 14px; }
      .mt-group-head { padding: 12px 14px; }
    }
    @media (max-width: 380px) {
      .mt-card-grid { grid-template-columns: 1fr 1fr; }
      .mt-card-img { height: 140px; }
    }
  `}</style>
);

export default ManageToppers;