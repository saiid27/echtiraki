// src/App.jsx
import { useMemo, useState } from "react";
import "./styles.css"; // أو بدّلها للاسم الصحيح عندك





// بيانات المنتجات
const PRODUCTS = [
  { id: "netflix_uhd", name: "Netflix UHD", duration: "30 يوم", price: 6.99 },
  { id: "spotify_premium", name: "Spotify Premium", duration: "30 يوم", price: 3.49 },
  { id: "iptv_m3u", name: "IPTV M3U", duration: "30 يوم", price: 4.99 },
];

// (بدل ProductCard.jsx)
function ProductCard({ item, onSelect }) {
  return (
    <div className="card">
      <div className="card-title">{item.name}</div>
      <div className="card-sub">{item.duration}</div>
      <div className="card-price">{item.price.toFixed(2)} $</div>
      <button onClick={() => onSelect(item)} className="btn">اختيار</button>
    </div>
  );
}

// (بدل CheckoutForm.jsx)
const ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE || "+22234605765";
function CheckoutForm({ selected, onBack }) {
  const [form, setForm] = useState({ fullName: "", whatsapp: "", email: "", notes: "" });
  const [agree, setAgree] = useState(true);

  const msg = useMemo(() => {
    if (!selected) return "";
    return [
      "🛒 *طلب اشتراك جديد*",
      `• المنتج: ${selected.name}`,
      `• المدة: ${selected.duration}`,
      `• السعر: ${selected.price.toFixed(2)} $`,
      "— — —",
      `• الاسم: ${form.fullName || "-"}`,
      `• واتساب العميل: ${form.whatsapp || "-"}`,
      `• البريد: ${form.email || "-"}`,
      `• ملاحظات: ${form.notes || "-"}`,
      `• وقت الإرسال: ${new Date().toLocaleString()}`,
    ].join("\n");
  }, [selected, form]);

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
    if (!form.fullName || !form.whatsapp) return alert("رجاءً أدخل الاسم ورقم واتساب.");
    if (!agree) return alert("رجاءً وافق على الشروط.");
    openWhatsApp();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>تأكيد الطلب: {selected?.name}</h3>

      <label>الاسم الكامل
        <input value={form.fullName} onChange={e=>setForm(f=>({...f, fullName:e.target.value}))} required/>
      </label>

      <label>رقم واتساب (مع كود الدولة)
        <input value={form.whatsapp} onChange={e=>setForm(f=>({...f, whatsapp:e.target.value}))} required/>
      </label>

      <label>البريد الإلكتروني (اختياري)
        <input type="email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))}/>
      </label>

      <label>ملاحظات
        <textarea rows={3} value={form.notes} onChange={e=>setForm(f=>({...f, notes:e.target.value}))}/>
      </label>

      <label className="agree">
        <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} />
        أوافق على الشروط وسياسة الخصوصية
      </label>

      <div className="row">
        <button type="button" className="btn ghost" onClick={onBack}>رجوع</button>
        <button type="submit" className="btn">إرسال عبر واتساب</button>
      </div>

      <p className="hint">سيتم فتح واتساب مع رسالة جاهزة — اضغط “إرسال”.</p>
    </form>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="container">
      <header className="head">
        <h1>اشتراكات رقمية</h1>
        <p>اختر المنتج وارسِل الطلب عبر واتساب.</p>
      </header>

      {!selected ? (
        <div className="grid">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} item={p} onSelect={setSelected} />
          ))}
        </div>
      ) : (
        <CheckoutForm selected={selected} onBack={() => setSelected(null)} />
      )}

      <footer className="foot">© {new Date().getFullYear()} متجرك</footer>
    </div>
  );
}
