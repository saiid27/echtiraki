// src/App.jsx
import { useMemo, useState } from "react";
import "./styles.css";


const LOCALES = {
  ar: {
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
  },
  fr: {
    brand: "Echtiraki",
    subtitle: "Choisissez le produit et envoyez la commande via WhatsApp.",
    search_placeholder: "Rechercher un produit…",
    choose: "Choisir",
    details: "Détails",
    how_to_sell: "Comment vendre",
    video: "Vidéo",
    resources: "Ressources",
    close: "Fermer",
    duration: "Durée",
    price_unit: "MRU",
    confirm_title: "Confirmer la commande",
    fullName: "Nom complet",
    whatsapp: "Numéro WhatsApp",
    email: "Email (optionnel)",
    notes: "Notes",
    agree: "J'accepte les conditions et la politique de confidentialité",
    back: "Retour",
    send: "Envoyer",
    hint: "WhatsApp s’ouvrira avec une facture prête, appuyez sur Envoyer",
    product_label: "Produit",
    duration_label: "Durée",
    price_label: "Prix",
  },
  en: {
    brand: "Echtiraki",
    subtitle: "Pick a product and send your order via WhatsApp.",
    search_placeholder: "Search products…",
    choose: "Choose",
    details: "Details",
    how_to_sell: "How to sell",
    video: "Video",
    resources: "Resources",
    close: "Close",
    duration: "Duration",
    price_unit: "MRU",
    confirm_title: "Confirm Order",
    fullName: "Full name",
    whatsapp: "WhatsApp number",
    email: "Email (optional)",
    notes: "Notes",
    agree: "I agree to the Terms & Privacy Policy",
    back: "Back",
    send: "Send Order",
    hint: "WhatsApp will open with a ready invoice, press Send",
    product_label: "Product",
    duration_label: "Duration",
    price_label: "Price",
  },
};

/* =========================
   بيانات المنتجات
   - أضفنا حقول اختيارية:
     descByLang / howToByLang / videoUrl / links
========================= */
const PRODUCTS = [
  {
    id: "netflix_uhd",
    name: "Netflix 4K",
    duration: "1 mois",
    price: 270,
    img: "/ntflx.jpg",
    keywords: ["نتفلكس", "Netflix", "UHD", "4K"],
    descByLang: {
      ar: "اشتراك نتفلكس 4K UHD. التسليم سريع بعد التأكيد.",
      fr: "Abonnement Netflix 4K UHD. Livraison rapide après confirmation.",
      en: "Netflix 4K UHD plan. Fast delivery after confirmation.",
    },
    howToByLang: {
      ar: [
        "تحقق من التوافر.",
        "اطلب البريد/الحساب المرتبط من العميل.",
        "أرسل العرض النهائي (السعر + المدة).",
        "بعد الدفع فعّل الاشتراك وأرسل التأكيد.",
      ],
      fr: [
        "Vérifier la disponibilité.",
        "Demander l'email/compte associé du client.",
        "Envoyer l'offre (prix + durée).",
        "Après paiement, activer et confirmer.",
      ],
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    links: [{ label: "FAQ", url: "https://echtiraki.blogspot.com/p/faq.html" }],
  },
  {
    id: "netflix_uhd",
    name: "Netflix 4K",
    duration: "3 mois",
    price: 500,
    img: "/ntflx.jpg",
    keywords: ["نتفلكس", "Netflix", "UHD", "4K"],
   descByLang: {
      ar: "اشتراك نتفلكس 4K UHD. التسليم سريع بعد التأكيد.",
      fr: "Abonnement Netflix 4K UHD. Livraison rapide après confirmation.",
      en: "Netflix 4K UHD plan. Fast delivery after confirmation.",
    },
    howToByLang: {
      ar: [
        "تحقق من التوافر.",
        "اطلب البريد/الحساب المرتبط من العميل.",
        "أرسل العرض النهائي (السعر + المدة).",
        "بعد الدفع فعّل الاشتراك وأرسل التأكيد.",
      ],
      fr: [
        "Vérifier la disponibilité.",
        "Demander l'email/compte associé du client.",
        "Envoyer l'offre (prix + durée).",
        "Après paiement, activer et confirmer.",
      ],
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    links: [{ label: "FAQ", url: "https://echtiraki.blogspot.com/p/faq.html" }],
  },
  {
    id: "chat-gpt plus",
    name: "chat-gpt plus",
    duration: " 1 mois",
    price: 350,
    img: "/gpt.jpg",
    keywords: ["شات جي بي تي", "chat-gpt", "الذكاء الاصطناعي", "gpt"],
    descByLang: {
      ar: "ChatGPT Plus مع أولوية الوصول وسرعات أعلى.",
      fr: "ChatGPT Plus avec priorité d'accès et vitesses accrues.",
      en: "ChatGPT Plus with priority access and faster speeds.",
    },
    howToByLang: {
      ar: [
        "تحقق من بلد حساب العميل (قد تختلف طريقة التفعيل).",
        "أرسل الشروط والمدة والسعر النهائي.",
        "بعد الدفع، فعّل الاشتراك أو أرسل خطوات التفعيل.",
      ],
    },
    videoUrl: "https://youtu.be/VIDEO_ID_HERE",
  },
  {
    id: "chat-gpt plus",
    name: "chat-gpt plus",
    duration: "3 mois",
    price: 800,
    img: "/gpt.jpg",
    keywords: ["شات جي بي تي", "chat-gpt", "الذكاء الاصطناعي", "gpt"],
   descByLang: {
      ar: "اشتراك نتفلكس 4K UHD. التسليم سريع بعد التأكيد.",
      fr: "Abonnement Netflix 4K UHD. Livraison rapide après confirmation.",
      en: "Netflix 4K UHD plan. Fast delivery after confirmation.",
    },
    howToByLang: {
      ar: [
        "تحقق من التوافر.",
        "اطلب البريد/الحساب المرتبط من العميل.",
        "أرسل العرض النهائي (السعر + المدة).",
        "بعد الدفع فعّل الاشتراك وأرسل التأكيد.",
      ],
      fr: [
        "Vérifier la disponibilité.",
        "Demander l'email/compte associé du client.",
        "Envoyer l'offre (prix + durée).",
        "Après paiement, activer et confirmer.",
      ],
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    links: [{ label: "FAQ", url: "https://echtiraki.blogspot.com/p/faq.html" }],
  },
  {
    id: "snap chat- plus",
    name: "snap chat- plus",
    duration: "3 mois",
    price: 270,
    img: "/snapchat.jpg",
    keywords: ["سناب شات", "snap", "snap plus", "سناب"],
  descByLang: {
      ar: "اشتراك نتفلكس 4K UHD. التسليم سريع بعد التأكيد.",
      fr: "Abonnement Netflix 4K UHD. Livraison rapide après confirmation.",
      en: "Netflix 4K UHD plan. Fast delivery after confirmation.",
    },
    howToByLang: {
      ar: [
        "تحقق من التوافر.",
        "اطلب البريد/الحساب المرتبط من العميل.",
        "أرسل العرض النهائي (السعر + المدة).",
        "بعد الدفع فعّل الاشتراك وأرسل التأكيد.",
      ],
      fr: [
        "Vérifier la disponibilité.",
        "Demander l'email/compte associé du client.",
        "Envoyer l'offre (prix + durée).",
        "Après paiement, activer et confirmer.",
      ],
    },
    videoUrl: "",
    links: [{ label: "FAQ", url: "https://echtiraki.blogspot.com/p/faq.html" }],
  },
  {
    id: "snap chat- plus",
    name: "snap chat- plus",
    duration: "6 mois",
    price: 500,
    img: "/snapchat.jpg",
    keywords: ["سناب شات", "snap", "snap plus", "سناب"],
  },
  {
    id: "canva-pro",
    name: "canva pro",
    duration: "infinie-مدى الحياة",
    price: 200,
    img: "/canva.jpg",
    keywords: [" كانفا", "كانفا برو", "canva ", "canva pro"],
  },
  {
    id: "capcut pro",
    name: " capcut pro",
    duration: "1 mois ",
    price: 520,
    img: "/capcut.jpg",
    keywords: [" كابكات", "كابكات برو", "capcut ", "capcut pro"],
  },
  {
    id: "meta verified",
    name: "meta verified-توثيق حساب فيسبوك ",
    duration: "1 mois",
    price: 800,
    img: "/meta.jpg",
    keywords: [" فيسبوك", "توثيق", " facebook", "meta"],
  },
  {
    id: "adobe",
    name: "adobe برامج فوتوشوب ",
    duration: "infinie-مدى الحياة",
    price: 1000,
    img: "/adobe.jpg",
    keywords: [" فيسبوك", "توثيق", " facebook", "meta"],
  },
];

/* =========================
   Helpers
========================= */
// إرجاع اسم العرض (يمكن لاحقًا تخصيصه لكل لغة)
function getDisplayName(item, ) {
  return item.name;
}

// يسقط إلى لغة بديلة إذا النص غير متوفر
function pickLocalized(obj, lang, fallbacks = ["ar", "fr", "en"]) {
  if (!obj) return null;
  if (obj[lang]) return obj[lang];
  for (const fb of fallbacks) {
    if (obj[fb]) return obj[fb];
  }
  const any = Object.values(obj)[0];
  return any || null;
}

// استخراج YouTube ID من روابط متعددة الأشكال
function getYouTubeId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/");
    const i = parts.indexOf("embed");
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
  } catch {}
  return null;
}


function ProductCard({ item, onSelect, onDetails, t }) {
  return (
    <div className="card">
      {item.img && <img src={item.img} alt={item.name} className="card-img" />}
      <div className="card-body">
        <div className="card-title">{item.name}</div>
        <div className="card-sub">{item.duration}</div>
        <div className="card-price">
          {Number(item.price).toFixed(0)} {t.price_unit}
        </div>
        <div className="row">
          <button onClick={() => onSelect(item)} className="btn">
            {t.choose}
          </button>
          <button onClick={() => onDetails(item)} className="btn ghost">
            {t.details}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   نافذة التفاصيل (Tabs)
========================= */
function ProductDetailsModal({ item, t, lang, onClose, onSelect }) {
  const [tab, setTab] = useState("details"); // details | how | video
  if (!item) return null;

  const desc = pickLocalized(item.descByLang, lang);
  const how = pickLocalized(item.howToByLang, lang);
  const ytId = getYouTubeId(item.videoUrl);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t.close}>×</button>

        {item.img && <img src={item.img} alt={item.name} className="modal-img" />}

        <h3 className="modal-title">{item.name}</h3>
        <div className="modal-meta">
          <div><strong>{t.duration_label}:</strong> {item.duration}</div>
          <div><strong>{t.price_label}:</strong> {Number(item.price).toFixed(0)} {t.price_unit}</div>
        </div>

        <div className="tabs">
          <button className={`tab-btn ${tab === "details" ? "active" : ""}`} onClick={() => setTab("details")}>
            {t.details}
          </button>
          {how && Array.isArray(how) && how.length > 0 && (
            <button className={`tab-btn ${tab === "how" ? "active" : ""}`} onClick={() => setTab("how")}>
              {t.how_to_sell}
            </button>
          )}
          {(ytId || item.videoUrl) && (
            <button className={`tab-btn ${tab === "video" ? "active" : ""}`} onClick={() => setTab("video")}>
              {t.video}
            </button>
          )}
        </div>

        {tab === "details" && (
          <div className="tab-panel">
            {desc ? <p className="modal-desc">{desc}</p> : <p className="modal-desc">—</p>}
            {item.links?.length ? (
              <>
                <h4 style={{ marginTop: 10 }}>{t.resources}</h4>
                <ul className="modal-links">
                  {item.links.map((l, i) => (
                    <li key={i}>
                      <a href={l.url} target="_blank" rel="noreferrer">
                        {l.label || l.url}
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
                  فتح فيديو الشرح
                </a>
              </p>
            ) : (
              <p>—</p>
            )}
          </div>
        )}

        <div className="row">
          <button className="btn ghost" onClick={onClose}>{t.back}</button>
          <button
            className="btn"
            onClick={() => {
              onSelect(item);
              onClose();
            }}
          >
            {t.choose}
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
   Models أخرى
========================= */
function WhatsAppButton() {
  const url = `https://wa.me/${ADMIN_PHONE}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
      <span className="whatsapp-tooltip">تواصل معنا على واتساب</span>
      💬
    </a>
  );
}

function BottomBar() {
  return (
    <nav className="bottombar">
      <a href="https://echtiraki.blogspot.com/p/about.html">من نحن</a>
      <a href="#privacy">سياسة الخصوصية</a>
      <a href="#terms">كيفية الشراء</a>
      <a href="https://echtiraki.blogspot.com/p/div-transformtranslatey0-opacity1.html">اتصل بنا</a>
    </nav>
  );
}

/* =========================
   نموذج الدفع/الإرسال على واتساب
========================= */
function CheckoutForm({ selected, onBack, t, lang }) {
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
      "🛒 *فاتورة طلب اشتراك*",
      `• ${t.product_label}: ${productName}`,
      `• ${t.duration_label}: ${selected.duration}`,
      `• ${t.price_label}: ${Number(selected.price).toFixed(0)} ${t.price_unit}`,
      "— — —",
      `• ${t.fullName}: ${form.fullName || "-"}`,
      `• ${t.whatsapp}: ${form.whatsapp || "-"}`,
      `• ${t.email}: ${form.email || "-"}`,
      `• ${t.notes}: ${form.notes || "-"}`,
      `• وقت الإرسال: ${new Date().toLocaleString()}`,
    ].join("\n");
  }, [selected, form, t, lang]);

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
      return alert("رجاءً أدخل الاسم ورقم واتساب.");
    if (!agree) return alert("رجاءً وافق على الشروط.");
    openWhatsApp();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>
        {t.confirm_title}: {getDisplayName(selected, lang)}
      </h3>

      <label>
        {t.fullName}
        <input
          value={form.fullName}
          onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          required
        />
      </label>

      <label>
        {t.whatsapp}
        <input
          value={form.whatsapp}
          onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
          required
        />
      </label>

      <label>
        {t.email}
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </label>

      <label>
        {t.notes}
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
        {t.agree}
      </label>

      <div className="row">
        <button type="button" className="btn ghost" onClick={onBack}>
          {t.back}
        </button>
        <button type="submit" className="btn">
          {t.send}
        </button>
      </div>

      <p className="hint">{t.hint}</p>
    </form>
  );
}

/* =========================
   التطبيق الرئيسي
========================= */
export default function App() {
  const [lang, setLang] = useState("ar"); // ar | fr | en
  const t = LOCALES[lang];

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [preview, setPreview] = useState(null); // نافذة التفاصيل

  // فلترة المنتجات حسب البحث (الاسم + الكلمات المفتاحية)
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
          <img
            src="/LOG.jpg"
            alt="logo"
            className="brand-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="topbar-actions">
          <input
            className="search-input"
            placeholder={t.search_placeholder}
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
            <option value="en">English</option>
          </select>
        </div>
      </header>

      {/* المحتوى */}
      {!selected ? (
        <div className="grid">
          {filtered.map((p) => (
            <ProductCard
              key={`${p.id}-${p.duration}-${p.price}`} // لتفادي تكرار id
              item={p}
              onSelect={setSelected}
              onDetails={setPreview}
              t={t}
            />
          ))}
          {filtered.length === 0 && (
            <div className="empty">لا توجد نتائج مطابقة لبحثك.</div>
          )}
        </div>
      ) : (
        <CheckoutForm selected={selected} onBack={() => setSelected(null)} t={t} lang={lang} />
      )}

      {/* نافذة تفاصيل المنتج */}
      <ProductDetailsModal
        item={preview}
        t={t}
        lang={lang}
        onClose={() => setPreview(null)}
        onSelect={setSelected}
      />

      <BottomBar />
      <WhatsAppButton />

      <footer className="foot">
        <h3>
          echtiraki © {new Date().getFullYear()} | dev. med said mohameden moctar ellahi
        </h3>
        <h4>Modes de paiement: طرق الدفع</h4>
        <img src="/bank.jpg" className="pay" width="200px" height="50%" />
      </footer>
    </div>
  );
}
