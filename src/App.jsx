// src/App.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";

import Lookup from "./pages/Lookup.jsx";

import AdsRecharge from "./pages/AdsRecharge.jsx";

import "./styles.css";

/* =========================
   واجهة عربية أساسية + دالة ترجمة AR⇄FR (بدون كائن LOCALES)
========================= */
const UI_AR = {
  brand: "اشتراكي",
  subtitle: "اختر المنتج وأرسِل الطلب عبر واتساب.",
  search_placeholder: "ابحث عن منتج…",
  choose: "اختيار",
  details: "تفاصيل",
  how_to_sell: "كيفية البيع",
  video: "فيديو الشرح",
  resources: "روابط",
  close: "إغلاق",
  duration: "المدة",
  price_unit: "MRU",
  confirm_title: "تأكيد الطلب",
  fullName: "الاسم الكامل",
  whatsapp: "رقم الواتساب",
  email: "البريد الإلكتروني (اختياري)",
  notes: "ملاحظات",
  agree: "أوافق على الشروط وسياسة الخصوصية",
  back: "رجوع",
  send: "إرسال الطلب",
  hint: "سيتم فتح واتساب مع فاتورة جاهزة، اضغط إرسال",
  product_label: "المنتج",
  duration_label: "المدة",
  price_label: "السعر",
  no_results: "لا توجد نتائج مطابقة لبحثك.",
  contact_us_whatsapp: "تواصل معنا على واتساب",
};

// قاموس ثنائي الاتجاه بسيط (أضِف ما يلزم لاحقاً)
const AR_TO_FR = {
  "اشتراكي": "Echtiraki",
  "اختر المنتج وأرسِل الطلب عبر واتساب.": "Choisissez le produit et envoyez la commande via WhatsApp.",
  "ابحث عن منتج…": "Rechercher un produit…",
  "اختيار": "Choisir",
  "تفاصيل": "Détails",
  "كيفية البيع": "Comment vendre",
  "فيديو الشرح": "Vidéo",
  "روابط": "Ressources",
  "إغلاق": "Fermer",
  "المدة": "Durée",
  "MRU": "MRU",
  "تأكيد الطلب": "Confirmer la commande",
  "الاسم الكامل": "Nom complet",
  "رقم الواتساب": "Numéro WhatsApp",
  "البريد الإلكتروني (اختياري)": "Email (optionnel)",
  "ملاحظات": "Notes",
  "أوافق على الشروط وسياسة الخصوصية": "J'accepte les conditions et la politique de confidentialité",
  "رجوع": "Retour",
  "إرسال الطلب": "Envoyer",
  "سيتم فتح واتساب مع فاتورة جاهزة، اضغط إرسال": "WhatsApp s’ouvrira avec une facture prête, appuyez sur Envoyer",
  "المنتج": "Produit",
  "السعر": "Prix",
  "لا توجد نتائج مطابقة لبحثك.": "Aucun résultat ne correspond à votre recherche.",
  "تواصل معنا على واتساب": "Contactez‑nous sur WhatsApp",
};

// نبني العكس تلقائياً
const FR_TO_AR = Object.fromEntries(Object.entries(AR_TO_FR).map(([ar, fr]) => [fr, ar]));

function tr(str, lang) {
  if (!str) return str;
  if (lang === "ar") return FR_TO_AR[str] || str; // لو وصلتنا عبارة فرنسية نُرجِع العربية إن وُجدت
  if (lang === "fr") return AR_TO_FR[str] || str; // ترجمة من العربية إلى الفرنسية
  return str; // لغات أخرى غير مدعومة الآن
}

/* =========================
   بيانات المنتجات (نبقي العربية فقط ونترجم وقت العرض)
========================= */
const PRODUCTS = [
  {
    id: "_uhd",
    name_ar: "Netflix 4K (حساب مشترك )",
    duration: "1 mois",
    price: 270,
    img: "/ntflx.jpg",
    keywords: ["نتفلكس", "Netflix", "UHD", "4K"],
    desc_ar: "حساب  جاهز سيتم تسليم المنتج بعد الدفع مباشرة",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "netflix_uhd",
    name_ar: "Netflix 4K (حساب مشترك )",
    duration: "3 mois",
    price: 500,
    img: "/ntflx.jpg",
    keywords: ["نتفلكس", "Netflix", "UHD", "4K"],
    desc_ar: "حساب نتفليكس جاهز سيتم تسليم المنتج بعد الدفع مباشرة",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "chatgpt_plus_1",
    name_ar: "chat-gpt plus(حساب مشترك )",
    duration: " 1 mois",
    price: 280,
    img: "/gpt.jpg",
    keywords: ["شات جي بي تي", "chat-gpt", "الذكاء الاصطناعي", "gpt"],
    desc_ar: "حساب شات جي بي تي جاهز — التسليم بعد الدفع مباشرة",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "chatgpt_plus_3",
    name_ar: "chat-gpt plus (حساب مشترك )",
    duration: "3 mois",
    price: 800,
    img: "/gpt.jpg",
    keywords: ["شات جي بي تي", "chat-gpt", "الذكاء الاصطناعي", "gpt"],
    desc_ar: "حساب شات جي بي تي جاهز — التسليم بعد الدفع مباشرة",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "chatgpt_plus_private",
    name_ar: "chat-gpt plus (حساب خاص )",
    duration: "1 mois",
    price: 880,
    img: "/gpt.jpg",
    keywords: ["شات جي بي تي", "chat-gpt", "الذكاء الاصطناعي", "gpt"],
    desc_ar: "حساب شات جي بي تي جاهز — التسليم بعد الدفع مباشرة",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "snap_plus_3",
    name_ar: "snap chat- plus",
    duration: "3 mois",
    price: 270,
    img: "/snapchat.jpg",
    keywords: ["سناب شات", "snap", "snap plus", "سناب"],
    desc_ar: "التسليم بعد الدفع مباشرة",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "snap_plus_6",
    name_ar: "snap chat- plus",
    duration: "6 mois",
    price: 500,
    img: "/snapchat.jpg",
    keywords: ["سناب شات", "snap", "snap plus", "سناب"],
    desc_ar: "التسليم بعد الدفع مباشرة",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "canva_pro",
    name_ar: "canva pro (حساب خاص )",
    duration: "infinie-مدى الحياة",
    price: 200,
    img: "/canva.jpg",
    keywords: ["كانفا", "كانفا برو", "canva", "canva pro"],
    desc_ar: "كانفا برو مدى الحياة — يشحن على حسابك مباشرة بعد الدفع",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "capcut_pro",
    name_ar: " capcut pro (حساب خاص )",
    duration: "1 mois ",
    price: 800,
    img: "/capcut.jpg",
    keywords: ["كابكات", "كابكات برو", "capcut", "capcut pro"],
    desc_ar: "نشحن على حسابك مباشرة — التسليم فوري",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "meta_verified",
    name_ar: "meta verified-توثيق صفحة فيسبوك ",
    duration: "1 mois",
    price: 800,
    img: "/meta.jpg",
    keywords: ["فيسبوك", "توثيق", "facebook", "meta"],
    desc_ar: "التسليم بعد الدفع مباشرة",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
  {
    id: "adobe_suite",
    name_ar: "adobe برامج فوتوشوب ",
    duration: "infinie-مدى الحياة",
    price: 1000,
    img: "/adobe.jpg",
    keywords: ["adobe", "photoshop", "illustrator"],
    desc_ar: "برامج جاهزة — التسليم فوري بعد الدفع",
    how_ar: ["اطلب المنتج من الموقع.", "سيتم توجيهك إلى الواتساب.", "اضغط إرسال.", "فريق الدعم يتابع معك."],
    videoUrl: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview",
    links: [{ label_ar: "المنتج", url: "https://drive.google.com/file/d/1AduxJBugx12FQlpZKEgDj-8llrqEkI6L/preview" }],
  },
];

function tLabel(key, lang) {
  const base = UI_AR[key];
  return tr(base, lang);
}

/* =========================
   Slider صور بسيط بدل الفيديوهات
========================= */
function ImageSlider({ images = [], intervalMs = 3500, alt = "" }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [images.length, intervalMs]);

  if (!images.length) return null;

  const go = (dir) => {
    setIdx((i) => (i + dir + images.length) % images.length);
    // إعادة تشغيل المؤقت بعد تفاعل المستخدم
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, intervalMs);
  };

  return (
    <div className="slider">
      <img src={images[idx]} alt={alt} className="slider-img" />
      <button className="slider-btn prev" onClick={() => go(-1)} aria-label="Prev">‹</button>
      <button className="slider-btn next" onClick={() => go(1)} aria-label="Next">›</button>
      <div className="slider-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === idx ? "active" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================
   Helpers
========================= */
function getDisplayName(item /*, lang */) {
  return item.name_ar;
}

function pickDesc(item, lang) {
  return lang === "fr" ? tr(item.desc_ar, "fr") : item.desc_ar;
}
function pickHow(item, lang) {
  const arr = item.how_ar || [];
  return lang === "fr" ? arr.map((s) => tr(s, "fr")) : arr;
}

function getYouTubeId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/");
    const i = parts.indexOf("embed");
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
  } catch (e) {
    return null;
  }
  return null;
}

/* بطاقة الفيديو (محتفظ بها عند الحاجة داخل نافذة التفاصيل فقط) */
function toDrivePreview(urlOrId = "") {
  if (!urlOrId) return null;
  if (!urlOrId.startsWith("http")) {
    return `https://drive.google.com/file/d/${urlOrId}/preview`;
  }
  try {
    const u = new URL(urlOrId);
    let id = "";
    const parts = u.pathname.split("/");
    const i = parts.indexOf("d");
    if (i >= 0 && parts[i + 1]) id = parts[i + 1];
    else id = u.searchParams.get("id") || "";
    return id ? `https://drive.google.com/file/d/${id}/preview` : urlOrId;
  } catch {
    return urlOrId;
  }
}

function VideoCard({ title, driveUrlOrId }) {
  const src = toDrivePreview(driveUrlOrId);
  return (
    <div className="video-card">
      <div className="video-card__media">
        <iframe src={src} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen />
      </div>
      {title && <div className="video-card__title">{title}</div>}
    </div>
  );
}

/* =========================
   بطاقة المنتج
========================= */
function ProductCard({ item, onSelect, onDetails, lang }) {
  return (
    <div className="card">
      {item.img && <img src={item.img} alt={item.name_ar} className="card-img" />}
      <div className="card-body">
        <div className="card-title">{getDisplayName(item, lang)}</div>
        <div className="card-sub">{item.duration}</div>
        <div className="card-price">
          {Number(item.price).toFixed(0)} {tLabel("price_unit", lang)}
        </div>
        <div className="row">
          <button onClick={() => onSelect(item)} className="btn">
            {tLabel("choose", lang)}
          </button>
          <button onClick={() => onDetails(item)} className="btn ghost">
            {tLabel("details", lang)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   نافذة التفاصيل (Tabs)
========================= */
function ProductDetailsModal({ item, lang, onClose, onSelect }) {
  const [tab, setTab] = useState("details"); // details | how | video
  if (!item) return null;

  const desc = pickDesc(item, lang);
  const how = pickHow(item, lang);
  const ytId = getYouTubeId(item.videoUrl);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={tLabel("close", lang)}>×</button>

        {item.img && <img src={item.img} alt={item.name_ar} className="modal-img" />}

        <h3 className="modal-title">{item.name_ar}</h3>
        <div className="modal-meta">
          <div><strong>{tLabel("duration_label", lang)}:</strong> {item.duration}</div>
          <div><strong>{tLabel("price_label", lang)}:</strong> {Number(item.price).toFixed(0)} {tLabel("price_unit", lang)}</div>
        </div>

        <div className="tabs">
          <button className={`tab-btn ${tab === "details" ? "active" : ""}`} onClick={() => setTab("details")}>
            {tLabel("details", lang)}
          </button>
          {how && how.length > 0 && (
            <button className={`tab-btn ${tab === "how" ? "active" : ""}`} onClick={() => setTab("how")}>
              {tLabel("how_to_sell", lang)}
            </button>
          )}
          {(ytId || item.videoUrl) && (
            <button className={`tab-btn ${tab === "video" ? "active" : ""}`} onClick={() => setTab("video")}>
              {tLabel("video", lang)}
            </button>
          )}
        </div>

        {tab === "details" && (
          <div className="tab-panel">
            {desc ? <p className="modal-desc">{desc}</p> : <p className="modal-desc">—</p>}
            {item.links?.length ? (
              <>
                <h4 style={{ marginTop: 10 }}>{tLabel("resources", lang)}</h4>
                <ul className="modal-links">
                  {item.links.map((l, i) => (
                    <li key={i}>
                      <a href={l.url} target="_blank" rel="noreferrer">
                        {lang === "fr" ? tr(l.label_ar, "fr") : l.label_ar}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        )}

        {tab === "how" && how && (
          <div className="tab-panel">
            <ol className="howto-list">
              {how.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {tab === "video" && (
          <div className="tab-panel">
            {ytId ? (
              <div className="video-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title="شرح المنتج"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : item.videoUrl ? (
              <p>
                <a href={item.videoUrl} target="_blank" rel="noreferrer">
                  {tLabel("video", lang)}
                </a>
              </p>
            ) : (
              <p>—</p>
            )}
          </div>
        )}

        <div className="row">
          <button className="btn ghost" onClick={onClose}>{tLabel("back", lang)}</button>
          <button
            className="btn"
            onClick={() => {
              onSelect(item);
              onClose();
            }}
          >
            {tLabel("choose", lang)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   إعدادات عامة
========================= */
const ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE || "+22234605765";

/* =========================
   مكوّنات إضافية
========================= */
function WhatsAppButton({ lang }) {
  const url = `https://wa.me/${ADMIN_PHONE}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label={tLabel("contact_us_whatsapp", lang)}
    >
      <svg
        className="wa-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.672.149-.198.297-.768.966-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.672-1.611-.921-2.206-.242-.579-.487-.5-.672-.51-.173-.009-.372-.011-.571-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.571-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.237-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.642 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.003 5.45-4.437 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.3-1.654a11.88 11.88 0 005.684 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.473-8.413z"/>
      </svg>

      <span className="whatsapp-tooltip">{tLabel("contact_us_whatsapp", lang)}</span>
    </a>
  );
}

function BottomBar({ lang }) {
  return (
    <nav className="bottombar">
      <Link to="/about">{lang === "fr" ? "À propos" : "من نحن"}</Link>
      <Link to="/privacy">{lang === "fr" ? "Politique de confidentialité" : "سياسة الخصوصية"}</Link>
      <Link to="/contact">{lang === "fr" ? "Contactez‑nous" : "اتصل بنا "}</Link>
      <Link to="/lookup">{lang === "fr" ? "Suivre la commande" : "تحقّق من طلبك"}</Link>
    </nav>
  );
}

/* =========================
   نموذج الدفع/الإرسال على واتساب
========================= */
function CheckoutForm({ selected, onBack, lang }) {
  const [form, setForm] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    notes: "",
  });
  const [agree, setAgree] = useState(true);

  const msg = useMemo(() => {
    if (!selected) return "";
    const productName = getDisplayName(selected, lang);
    return [
      "🛒 *" + tLabel("confirm_title", lang) + "*",
      `• ${tLabel("product_label", lang)}: ${productName}`,
      `• ${tLabel("duration_label", lang)}: ${selected.duration}`,
      `• ${tLabel("price_label", lang)}: ${Number(selected.price).toFixed(0)} ${tLabel("price_unit", lang)}`,
      "— — —",
      `• ${tLabel("fullName", lang)}: ${form.fullName || "-"}`,
      `• ${tLabel("whatsapp", lang)}: ${form.whatsapp || "-"}`,
      `• ${tLabel("email", lang)}: ${form.email || "-"}`,
      `• ${tLabel("notes", lang)}: ${form.notes || "-"}`,
      `• ${new Date().toLocaleString()}`,
    ].join("\n");
  }, [selected, form, lang]);

  function openWhatsApp() {
    const enc = encodeURIComponent(msg);
    const appUrl = `whatsapp://send?phone=${ADMIN_PHONE}&text=${enc}`;
    const webUrl = `https://wa.me/${ADMIN_PHONE}?text=${enc}`;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = appUrl;
    document.body.appendChild(iframe);
    setTimeout(() => {
      window.location.href = webUrl;
      document.body.removeChild(iframe);
    }, 700);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selected) return;
    if (!form.fullName || !form.whatsapp)
      return alert(lang === "fr" ? "Veuillez saisir le nom et WhatsApp." : "رجاءً أدخل الاسم ورقم واتساب.");
    if (!agree) return alert(lang === "fr" ? "Veuillez accepter les conditions." : "رجاءً وافق على الشروط.");
    openWhatsApp();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>
        {tLabel("confirm_title", lang)}: {getDisplayName(selected, lang)}
      </h3>

      <label>
        {tLabel("fullName", lang)}
        <input
          value={form.fullName}
          onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          required
        />
      </label>

      <label>
        {tLabel("whatsapp", lang)}
        <input
          value={form.whatsapp}
          onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
          required
        />
      </label>

      <label>
        {tLabel("email", lang)}
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </label>

      <label>
        {tLabel("notes", lang)}
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
      </label>

      <label className="agree">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        {tLabel("agree", lang)}
      </label>

      <div className="row">
        <button type="button" className="btn ghost" onClick={onBack}>
          {tLabel("back", lang)}
        </button>
        <button type="submit" className="btn">
          {tLabel("send", lang)}
        </button>
      </div>

      <p className="hint">{tLabel("hint", lang)}</p>
    </form>
  );
}

/* =========================
   تعليقات الزبناء (Testimonials)
========================= */
const TESTIMONIALS = [
  { id: 1, name: "محمد سالم", avatar: "/avatar.jpg", text: "خدمة ممتازة والتسليم فوري. أنصح الجميع بالتعامل معهم.", rating: 5 },
  { id: 2, name: "Fatou Diop", avatar: "/avatars/fatou.jpg", text: "جودة رائعة وسرعة في الرد على الاستفسارات. تجربة موفقة!", rating: 5 },
  { id: 3, name: "Ahmed El H.", avatar: "/avatar.jpg", text: "سعر مناسب والخدمة محترفة، سأكرر الطلب إن شاء الله.", rating: 4 },
  { id: 4, name: "Aminetou bibih.", avatar: "/mra2.jpg", text: "واجهتني مشكلة في معرفة كيفية وضع القفل علي نافذتي تواصلت معهم وتعلمت حل المشكلة", rating: 4 },
  { id: 5, name: "sidi cheikh.", avatar: "/avatar.jpg", text: "فريق دعم رائع .", rating: 4 },
  { id: 6, name: "jemal mohamed.", avatar: "/rajel1.jpg", text: "اشتركت في اسناب شات حقا رائع وامن", rating: 4 },
  { id: 7, name: "elghalya moctar.", avatar: "/mra1.jpg", text: "حسابات مشتركة امنة جربت نتفليكس وchat-gpt.", rating: 4 },
  { id: 8, name: "Tourad cheikh ahmed.", avatar: "/avatar.jpg", text: "لم أثق بهاذ الموقع في البداية ولكنني جربت حساب canva proحقا اكثرمن رائع.", rating: 4 },
];

function StarRating({ value = 5 }) {
  const stars = Array.from({ length: 5 }, (_, i) => (i < value ? "★" : "☆"));
  return <span className="t-stars" aria-label={`Rating: ${value} of 5`}>{stars.join(" ")}</span>;
}

function Testimonials({ lang = "ar" }) {
  const title = lang === "fr" ? "Avis des clients" : "تعليقات الزبناء";
  const subtitle = lang === "fr"
    ? "Des avis réels de clients ayant acheté sur notre plateforme"
    : "آراء حقيقية من زبناء اشتروا من منصتنا";

  return (
    <section className="testimonials">
      <div className="t-header">
        <h2 className="t-title">{title}</h2>
        <p className="t-sub">{subtitle}</p>
      </div>

      <div className="t-grid">
        {TESTIMONIALS.map((t) => (
          <article key={t.id} className="t-card" itemScope itemType="https://schema.org/Review">
            <div className="t-top">
              <img src={t.avatar} alt={t.name} className="t-avatar" loading="lazy" width="56" height="56" />
              <div className="t-meta">
                <div className="t-name" itemProp="author">{t.name}</div>
                <StarRating value={t.rating} />
              </div>
            </div>
            <p className="t-text" itemProp="reviewBody">{t.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================
   التطبيق الرئيسي
========================= */
export default function App() {
  const [lang, setLang] = useState("ar"); // ar | fr

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [preview, setPreview] = useState(null); // نافذة التفاصيل

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      const name = getDisplayName(p, lang).toLowerCase();
      const keys = (p.keywords || []).join(" ").toLowerCase();
      return name.includes(q) || keys.includes(q);
    });
  }, [search, lang]);

  return (
    <div className="container">
      {/* الهيدر */}
      <header className="topbar">
        <div className="brand">
          <Link to="/" style={{ display: "inline-flex", alignItems: "center" }}>
            <img src="/LOG.jpg" alt="logo" className="brand-logo" onError={(e) => (e.currentTarget.style.display = "none")} />
          </Link>
          <div className="brand-texts">
            <h1 className="brand-name">{tLabel("brand", lang)}</h1>
            <p className="brand-sub">{tLabel("subtitle", lang)}</p>
          </div>
        </div>

        <div className="topbar-actions">
          <input
            className="search-input"
            placeholder={tLabel("search_placeholder", lang)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
            title="Language"
          >
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </header>

      {/* زر القسم الإعلاني */}
      <div className="top-cta">
        <Link to="/ads-recharge" className="nav-pill">
          {lang === "fr" ? "Publicités sponsorisées 📢 Facebook, TikTok" : "الإعلانات الممولة📢 Ads fb,Tiktok"}
        </Link>
      </div>

      {/* بدل الفيديوهات: سلايدر صور */}
      <div className="hero-slider">
        <ImageSlider
          images={["/pay12.png", "/pay2.jpg", "/chat-snap.jpg"]}
          intervalMs={3500}
          alt={lang === "fr" ? "Promos" : "عروض"}
        />
      </div>

      {/* المحتوى داخل Routes */}
      <Routes>
        <Route
          path="/"
          element={
            !selected ? (
              <div className="grid">
                {filtered.map((p) => (
                  <ProductCard
                    key={`${p.id}-${p.duration}-${p.price}`}
                    item={p}
                    onSelect={setSelected}
                    onDetails={setPreview}
                    lang={lang}
                  />
                ))}
                {filtered.length === 0 && (
                  <div className="empty">{tLabel("no_results", lang)}</div>
                )}
              </div>
            ) : (
              <CheckoutForm selected={selected} onBack={() => setSelected(null)} lang={lang} />
            )
          }
        />
        <Route path="/ads-recharge" element={<AdsRecharge />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/lookup" element={<Lookup />} />
      </Routes>

      {/* نافذة تفاصيل المنتج */}
      <ProductDetailsModal
        item={preview}
        lang={lang}
        onClose={() => setPreview(null)}
        onSelect={setSelected}
      />

      {/* الشريط السفلي + زر واتساب + الفوتر */}
      <BottomBar lang={lang} />
      <WhatsAppButton lang={lang} />

      <footer className="foot">
        <h3>echtiraki © {new Date().getFullYear()} | dev. med said mohameden moctar ellahi</h3>
        <h4>{lang === "fr" ? "Modes de paiement :" : "طرق الدفع:"}</h4>
        <img src="/bank.jpg" className="pay" width="200" height="50%" />
      </footer>

      <Testimonials lang={lang} />
    </div>
  );
}
