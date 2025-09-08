// src/App.jsx
import { useMemo, useState } from "react";
import "./styles.css";

// --- إعداد اللغات البسيط (بدون مكتبات خارجية)
const LOCALES = {
  ar: {
    brand: "اشتراكي",
    subtitle: "اختر المنتج وأرسِل الطلب عبر واتساب.",
    search_placeholder: "ابحث عن منتج…",
    choose: "اختيار",
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

// بيانات المنتجات (أضفنا كلمات مفتاحية للبحث المتعدد اللغات)
const PRODUCTS = [
  {
    id: "netflix_uhd",
    name: "Netflix 4K",
    duration: "1 mois",
    price: 270,
    img: "/netflix.jpg", // ضع صورة في مجلد public
    keywords: ["نتفلكس", "Netflix", "UHD", "4K"],
  },
  {
    id: "netflix_uhd",
    name: "Netflix 4K",
    duration: "3 mois",
    price: 500,
    img: "/netflix.jpg", // ضع صورة في مجلد public
    keywords: ["نتفلكس", "Netflix", "UHD", "4K"],
  },
  {
    id: "chat-gpt plus",
    name: "chat-gpt plus",
    duration: " 1 mois",
    price: 350,
    img: "/chatgpt.jpg",
    keywords: ["شات جي بي تي", "chat-gpt", "الذكاء الاصطناعي", "gpt"],
  },
  {
    id: "chat-gpt plus",
    name: "chat-gpt plus",
    duration: "3 mois",
    price: 800,
    img: "/chatgpt.jpg",
    keywords: ["شات جي بي تي", "chat-gpt", "الذكاء الاصطناعي", "gpt"],
  },

 {
    id: "snap chat- plus",
    name: "snap chat- plus",
    duration: "3 mois",
    price: 270,
    img: "/snapchat.jpg",
    keywords: ["سناب شات", "snap", "snap plus", "سناب"],
  },

   {
    id: "snap chat- plus",
    name: "snap chat- plus",
    duration: "6 mois",
    price: 500,
    img: "/snapchat.jpg",
    keywords: ["سناب شات", "snap", "snap plus", "سناب"],
  },


];

// ترجمة نص المنتج حسب اللغة (إن رغبت لاحقًا، يمكن وضع أسماء محلية لكل منتج)
function getDisplayName(item, ) {
  // إذا أردت أسماء محلية، وسّع هنا:
  // مثال: if (lang === 'fr' && item.id === 'netflix_uhd') return 'Netflix UHD';
  return item.name;
}

// البطاقة
function ProductCard({ item, onSelect, t,  }) {
  return (
    <div className="card">
      {item.img && <img src={item.img} alt={item.name} className="card-img" />}
      <div className="card-body">
        <div className="card-title">{item.name}</div>
        <div className="card-sub">{item.duration}</div>
        <div className="card-price">
          {Number(item.price).toFixed(0)} {t.price_unit}
        </div>
        <button onClick={() => onSelect(item)} className="btn">
          {t.choose}
        </button>
      </div>
    </div>
  );
}


const ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE || "+22234605765";

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
          onChange={(e) =>
            setForm((f) => ({ ...f, fullName: e.target.value }))
          }
          required
        />
      </label>

      <label>
        {t.whatsapp}
        <input
          value={form.whatsapp}
          onChange={(e) =>
            setForm((f) => ({ ...f, whatsapp: e.target.value }))
          }
          required
        />
      </label>

      <label>
        {t.email}
        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((f) => ({ ...f, email: e.target.value }))
          }
        />
      </label>

      <label>
        {t.notes}
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) =>
            setForm((f) => ({ ...f, notes: e.target.value }))
          }
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

export default function App() {
  const [lang, setLang] = useState("ar"); // ar | fr | en
  const t = LOCALES[lang];

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // فلترة المنتجات حسب البحث (الاسم المترجم + الكلمات المفتاحية)
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
      {/* الهيدر الجديد */}
      <header className="topbar">
        <div className="brand">
          <img
            src="/Sourt echtiraki.jpg"
            alt="logo"
            className="brand-logo"
            onError={(e) => {
              // في حال لا يوجد صورة، نخفي الوسم
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="brand-text">
            <h1 className="brand-title">{t.brand}</h1>
            <p className="brand-sub">{t.subtitle}</p>
          </div>
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
              key={p.id}
              item={p}
              onSelect={setSelected}
              t={t}
              lang={lang}
            />
          ))}
          {filtered.length === 0 && (
            <div className="empty">لا توجد نتائج مطابقة لبحثك.</div>
          )}
        </div>
      ) : (
        <CheckoutForm
          selected={selected}
          onBack={() => setSelected(null)}
          t={t}
          lang={lang}
        />
        
      ) }
<WhatsAppButton />

      <footer className="foot">
      
        <h3>
        echtiraki © {new Date().getFullYear()} | dev. med said
        mohameden moctar ellahi
        </h3>
        <p>     </p>
        <h2> 
           payement:
           طرق الدفع
           
           </h2>
          <img src="/bank.jpg" className="pay" width="300px"  height="100%"/>
      </footer>
      
    </div>
    
  );
  
function WhatsAppButton() {
  const url = `https://wa.me/${ADMIN_PHONE}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
       <span className="whatsapp-tooltip">تواصل معنا على واتساب</span>
      💬
    </a>
    
  );
}


}
