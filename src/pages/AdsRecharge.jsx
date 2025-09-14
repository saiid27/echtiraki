import { useEffect, useMemo, useState } from "react";

// رقم مسؤول المتجر من env (يفضّل بصيغة دولية)، وإلا fallback
const RAW_PHONE = (import.meta.env.VITE_ADMIN_PHONE ?? "22234605765").toString();
const WHATSAPP_NUMBER = RAW_PHONE.replace(/\D/g, "") || "22234605765";

// بريد استقبال الطلبات
const MAIL_TO = import.meta.env.VITE_SUPPORT_EMAIL || "mohamedsaiidmohameden@gmail.com";

// أسعار قابلة للتعديل (MRU)
const PRICE_MONTH = Number(import.meta.env.VITE_SNAP_PRICE_MONTH ?? 680);
const PRICE_2MONTH = Number(import.meta.env.VITE_SNAP_PRICE_2MONTH ?? 2400);
const PRICE_YEAR  = Number(import.meta.env.VITE_SNAP_PRICE_YEAR  ?? 120);

export default function SnapRecharge() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    region: "",
    plan: "month", // month | year
    notes: "",
    email: "", // لاستخدام mailto إذا رغبت
  });
  const [agree, setAgree] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });

  // استرجاع/حفظ الموافقة محليًا كما في Contact.jsx
  useEffect(() => {
    setAgree(localStorage.getItem("agree_snap") === "yes");
  }, []);
  useEffect(() => {
    localStorage.setItem("agree_snap", agree ? "yes" : "no");
  }, [agree]);

  // إظهار Toast
  function showToast(msg) {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  }

  // أدوات
  const planPrice = (key) => (key === "year" ? PRICE_YEAR : PRICE_MONTH , PRICE_2MONTH);
  const planLabel = (key) => (key === "year" ? "أسبوع " : "أربع أيام" ,"اسبوعان");
  const fmtMRU = (v) => {
    try { return new Intl.NumberFormat("fr-MR", { style: "currency", currency: "MRU" }).format(v); }
    catch { return `${v} MRU`; }
  };

  // التحقق
  function validate() {
    const { username, phone, plan } = form;
    if (!username.trim() || !plan) {
      showToast("يرجى تعبئة اسم الصفحة واختيار الباقة *");
      return false;
    }
    if (!/^([a-zA-Z0-9._-]{2,30})$/.test(username.trim())) {
      showToast("اسم الصفحة غير صالح (حروف/أرقام ونقاط وشرطة)");
      return false;
    }
    if (!/^\+?\d[\d\s-]{6,}$/.test(phone.trim())) {
      showToast("رقم الهاتف غير صالح");
      return false;
    }
    if (!agree) {
      showToast("يرجى الموافقة قبل الإرسال");
      return false;
    }
    return true;
  }

  // نص الطلبات
  const waText = useMemo(() => {
    const {  username, phone, region, plan, notes, email } = form;
   
     return `🛒طلب إعلان ممول\n\nاسم الصفحة: ${username.trim()}\n  الواتساب : ${phone.trim()}\n   :المنصة ${region.trim()}\nالباقة: ${planLabel(plan)}\nالسعر: ${fmtMRU(planPrice(plan))}\nالبريد: ${email.trim() || "---"}\n\nالملاحظات:\n${(notes || "").trim()}`;
  }, [form]);
 
 

  const mailBody = useMemo(() => {
    const { username, phone, region, plan, notes, email } = form;
    return `طلب إعلان ممول\n\nاسم الصفحة: ${username.trim()}\n  الواتساب : ${phone.trim()}\n   :المنصة ${region.trim()}\nالباقة: ${planLabel(plan)}\nالسعر: ${fmtMRU(planPrice(plan))}\nالبريد: ${email.trim() || "---"}\n\nالملاحظات:\n${(notes || "").trim()}`;
  }, [form]);

  // إرسال
  function sendWhatsApp() {
    if (!validate()) return;
    const url = `https://wa.me/${encodeURIComponent(WHATSAPP_NUMBER)}?text=${encodeURIComponent(waText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    showToast("فتح واتساب لإتمام الطلب 📱");
  }

  function sendMail(e) {
    e.preventDefault();
    if (!validate()) return;
    const href = `mailto:${encodeURIComponent(MAIL_TO)}?subject=${encodeURIComponent("[شحن سناب] " + planLabel(form.plan))}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = href;
    showToast("سيتم فتح عميل البريد للإرسال ✉️");
  }

  return (
    <div className="snap-page" dir="rtl">
      <div className="wrap">
        <div className="card" role="region" aria-label="شحن سناب شات بلس">
          <div className="header">
            <div className="logo" aria-hidden="true">📢</div>
            <div className="title">
              <h1>الإعلانات الممولة 📢</h1>
              <p>إعلانات رسمية تديرها بنفسك يمكنك الإطلاع عليها في كل وقت لرؤية النتائج — الدفع عبر التطبيقات البنكية الموريتانية والوثيق علي الواتساب.</p>
            </div>
          </div>

          <div className="grid">
            {/* النموذج */}
            <form className="panel" onSubmit={sendMail} noValidate>
              <div className="row">
                <div>
                  <label htmlFor="username">اسم  الصفحة   <span className="req">*</span></label>
                  <input
                    id="username"
                    placeholder="مثال: med sidi"
                    value={form.username}
                    onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="plan">الباقة <span className="req">*</span></label>
                  <select
                    id="plan"
                    value={form.plan}
                    onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}
                    required
                  >
                    <option value="month">{`أربع أيام  — ${fmtMRU(PRICE_MONTH)}`}</option>
                    <option value="year">{`أسبوع  — ${fmtMRU(PRICE_YEAR)}`}</option>
                    <option value="2month">{`أسبوعان  — ${fmtMRU(PRICE_2MONTH)}`}</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div>
                  <label htmlFor="phone">رقم الواتساب <span className="req">*</span></label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="مثال: 2224xxxxxx"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="region">المنصة</label>
                  <input
                    id="region"
                    placeholder="مثال: فيسبوك , تيكتوك"
                    value={form.region}
                    onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
                  />
                </div>
              </div>

              <div className="row">
                <div>
                  <label htmlFor="email">بريد للتواصل (غير ضروري)</label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    placeholder="example@mail.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="notes">ملاحظات (اختياري)</label>
                  <input
                    id="notes"
                    placeholder="مثال: تفعيل فوري، اريده لغيري..."
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  />
                </div>
              </div>

              <label className="check">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span>أوافق على معالجة معلوماتي لغرض تنفيذ طلب الشحن والتواصل.</span>
              </label>

              <div className="actions">
                <button type="button" className="btn" onClick={sendWhatsApp}>إتمام الطلب عبر واتساب</button>
                <button type="submit" className="btn ghost">إرسال تفاصيل عبر البريد</button>
              </div>

              <div className="small" style={{ marginTop: 8 }}>
                الدفع البنكي متاح — سنرسل لك التفاصيل بعد استلام الطلب.
              </div>
            </form>

            {/* معلومات الباقات والثقة */}
            <aside className="panel">
              <div className="list">
                <div className="item">
                  <div className="ico">💳</div>
                  <div>
                    <div><strong>الأسعار:</strong></div>
                    <div className="small">{`أربع أيام: ${fmtMRU(PRICE_MONTH)} • أسبوع: ${fmtMRU(PRICE_YEAR)}`}</div>
                  </div>
                </div>
                <div className="item">
                  <div className="ico">⚡</div>
                  <div>
                    <div><strong>التفعيل:</strong> خلال 5–30 دقيقة بعد التأكيد.</div>
                    <div className="small">دعم فوري عبر واتساب.</div>
                  </div>
                </div>
                <div className="item">
                  <div className="ico">🔒</div>
                  <div>
                    <div><strong>الثقة:</strong> قنوات رسمية واشتراك مضمون.</div>
                    <div className="small">لا نطلب كلمة المرور نهائيًا.</div>
                  </div>
                </div>
                <div className="item">
                  <div className="ico">📞</div>
                  <div>
                    <div><strong>واتساب المتجر:</strong> +{WHATSAPP_NUMBER}</div>
                    <div className="small"> 24/24H</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${toast.show ? "show" : ""}`} aria-live="polite" aria-atomic="true">
        <div>{toast.msg || "تم تجهيز الطلب بنجاح ✅"}</div>
      </div>

      {/* CSS مضمّن، مطابق لستايل Contact.jsx قدر الإمكان */}
      <style>{`
.snap-page {
  --bg:#0b1020; --panel:#111736; --text:#eef2ff; --muted:#a5b4fc;
  --primary:#5570F1; --ring:rgba(85,112,241,.3);
  --radius:16px; --shadow:0 10px 30px rgba(0,0,0,.25);
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:linear-gradient(160deg, #0b1020, #0e1540 60%, #0b1020);
  color:var(--text); padding:24px;
}
.snap-page * { box-sizing: border-box; }
.snap-page .wrap{width:100%; max-width:980px}
.snap-page .card{
  background:rgba(17,23,54,.7);
  backdrop-filter:saturate(140%) blur(8px);
  border:1px solid rgba(255,255,255,.06);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  overflow:hidden;
}
.snap-page .header{
  padding:28px 24px; border-bottom:1px solid rgba(255,255,255,.06);
  display:flex; gap:16px; align-items:center; flex-wrap:wrap;
}
.snap-page .logo{
  width:48px; height:48px; border-radius:14px; display:grid; place-items:center; font-size:24px;
  background:conic-gradient(from 180deg at 50% 50%, var(--primary), #f7d21b, #06b6d4, var(--primary));
  box-shadow:0 6px 20px rgba(247,210,27,.35);
}
.snap-page .title h1{margin:0; font-size:1.4rem}
.snap-page .title p{margin:4px 0 0; color:var(--muted); font-size:.95rem}
.snap-page .grid{ display:grid; grid-template-columns:1.1fr .9fr; gap:22px; padding:24px; }
@media (max-width:900px){ .snap-page .grid{grid-template-columns:1fr} }
.snap-page .panel{ background:rgba(255,255,255,.02); border:1px solid rgba(255,255,255,.06); border-radius:12px; padding:16px; }
.snap-page label{display:block; font-weight:600; margin:8px 2px 6px}
.snap-page input, .snap-page textarea, .snap-page select{
  width:100%; padding:12px 14px; border-radius:12px; border:1px solid rgba(255,255,255,.12);
  background:#0e1430; color:var(--text); outline:none; transition:.2s border, .2s box-shadow;
}
.snap-page input:focus, .snap-page textarea:focus, .snap-page select:focus{ border-color:var(--primary); box-shadow:0 0 0 4px var(--ring) }
.snap-page textarea{min-height:140px; resize:vertical}
.snap-page .row{display:grid; grid-template-columns:1fr 1fr; gap:12px}
@media (max-width:560px){ .snap-page .row{grid-template-columns:1fr} }
.snap-page .hint{color:var(--muted); font-size:.9rem; margin-top:6px}
.snap-page .actions{display:flex; gap:10px; flex-wrap:wrap; margin-top:14px}
.snap-page .btn{ appearance:none; border:none; cursor:pointer; padding:12px 16px; border-radius:12px; background:var(--primary); color:white; font-weight:700; box-shadow:0 8px 18px rgba(85,112,241,.35); transition:transform .05s ease, filter .2s; }
.snap-page .btn:active{ transform:translateY(1px) }
.snap-page .btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.14); color:var(--text); box-shadow:none; }
.snap-page .list{display:grid; gap:12px}
.snap-page .item{display:flex; gap:12px; align-items:flex-start; padding:12px; border-radius:12px; background:rgba(255,255,255,.03); border:1px dashed rgba(255,255,255,.08)}
.snap-page .ico{ width:36px; height:36px; border-radius:10px; display:grid; place-items:center; background:rgba(85,112,241,.15); color:var(--text); font-weight:900; }
.snap-page .small{font-size:.92rem; color:var(--muted)}
.snap-page .check{ display:flex; gap:10px; align-items:flex-start; margin-top:8px; font-size:.95rem; color:#dbe3ff; }
.snap-page .check input{width:18px; height:18px; margin-top:2px}
.snap-page .toast{ position:fixed; inset-inline:0; top:14px; display:flex; justify-content:center; pointer-events:none; z-index:10000; }
.snap-page .toast > div{ background:#0b132b; border:1px solid rgba(255,255,255,.12); padding:12px 14px; border-radius:12px; color:#c8ffd9; font-weight:600; box-shadow:var(--shadow); transform:translateY(-20px); opacity:0; transition:.25s ease; pointer-events:auto; }
.snap-page .toast.show > div{ transform:translateY(0); opacity:1 }
.snap-page .req{color:#ff8080}

/* === وضع مضغوط للهواتف === */
@media (max-width: 520px) {
  .snap-page { padding: 14px; }
  .snap-page .grid { padding: 14px; gap: 14px; }
  .snap-page .header { padding: 18px 16px; }
  .snap-page .title h1 { font-size: 1.15rem; }
  .snap-page .title p { font-size: .88rem; }
  .snap-page .panel { padding: 12px; border-radius: 10px; }
  .snap-page .row { gap: 10px; }
  .snap-page label { margin: 6px 2px 4px; font-size: .92rem; }
  .snap-page input, .snap-page textarea, .snap-page select { padding: 10px 12px; border-radius: 10px; font-size: .92rem; }
  .snap-page textarea { min-height: 120px; }
  .snap-page .btn { padding: 10px 12px; border-radius: 10px; font-size: .92rem; }
  .snap-page .ico { width: 30px; height: 30px; border-radius: 8px; font-size: .95rem; }
  .snap-page .item { padding: 10px; border-radius: 10px; }
  .snap-page .small { font-size: .86rem; }
}
@media (max-width: 420px) {
  .snap-page { padding: 10px; }
  .snap-page .wrap { max-width: 100%; }
  .snap-page .grid { padding: 10px; gap: 10px; }
  .snap-page .header { padding: 14px 12px; gap: 10px; }
  .snap-page .title h1 { font-size: 1rem; }
  .snap-page .title p { font-size: .8rem; }
  .snap-page .panel { padding: 10px; border-radius: 9px; }
  .snap-page .row { grid-template-columns: 1fr; gap: 8px; }
  .snap-page label { margin: 4px 2px 3px; font-size: .88rem; }
  .snap-page input, .snap-page textarea, .snap-page select { padding: 8px 10px; border-radius: 8px; font-size: .88rem; }
  .snap-page textarea { min-height: 105px; }
  .snap-page .actions { gap: 8px; }
  .snap-page .btn { padding: 8px 10px; border-radius: 8px; font-size: .88rem; }
  .snap-page .ico { width: 26px; height: 26px; border-radius: 6px; font-size: .85rem; }
  .snap-page .item { padding: 8px; border-radius: 8px; }
}
@media (max-width: 340px) {
  .snap-page { padding: 8px; }
  .snap-page .grid { padding: 8px; gap: 8px; }
  .snap-page .header { padding: 12px 10px; }
  .snap-page .title h1 { font-size: .95rem; }
  .snap-page .title p { font-size: .76rem; }
  .snap-page .panel { padding: 8px; border-radius: 8px; }
  .snap-page label { font-size: .84rem; }
  .snap-page input, .snap-page textarea, .snap-page select { padding: 7px 9px; border-radius: 7px; font-size: .84rem; }
  .snap-page textarea { min-height: 96px; }
  .snap-page .btn { padding: 7px 9px; border-radius: 7px; font-size: .84rem; }
  .snap-page .ico { width: 24px; height: 24px; border-radius: 6px; font-size: .8rem; }
  .snap-page .item { padding: 7px; border-radius: 7px; }
}
      `}</style>
    </div>
  );
}
