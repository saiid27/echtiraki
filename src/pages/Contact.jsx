// src/pages/Contact.jsx
import { useEffect, useMemo, useState } from "react";

// استخدم رقمك من env إن وُجد، وإلا fallback
const RAW_PHONE =
  (import.meta.env.VITE_ADMIN_PHONE ?? "22234605765").toString();
// WhatsApp يفضّل أرقامًا فقط (بدون + ومسافات)
const WHATSAPP_NUMBER = RAW_PHONE.replace(/\D/g, "") || "22234605765";

// عدّل بريد الاستقبال هنا أو عبر env
const MAIL_TO = import.meta.env.VITE_SUPPORT_EMAIL || "mohamedsaiidmohameden@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  });
  const [agree, setAgree] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });

  // استرجاع/حفظ الموافقة محليًا
  useEffect(() => {
    setAgree(localStorage.getItem("agree") === "yes");
  }, []);
  useEffect(() => {
    localStorage.setItem("agree", agree ? "yes" : "no");
  }, [agree]);

  // إظهار Toast
  function showToast(msg) {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  }

  // التحقق
  function validate() {
    const { name, subject, email, message } = form;
    if (!name.trim() || !subject.trim() || !email.trim() || !message.trim()) {
      showToast("يرجى تعبئة الحقول المطلوبة *");
      return false;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      showToast("صيغة البريد غير صحيحة");
      return false;
    }
    if (!agree) {
      showToast("يرجى الموافقة قبل الإرسال");
      return false;
    }
    return true;
  }

  // نصّ الرسائل الجاهز
  const mailBody = useMemo(() => {
    const { name, email, phone, message } = form;
    return `الاسم: ${name.trim()}
البريد: ${email.trim()}
الهاتف: ${phone.trim() || "---"}

الرسالة:
${message.trim()}`;
  }, [form]);

  const waText = useMemo(() => {
    const { name, email, phone, subject, message } = form;
    return `[تواصل جديد]
الاسم: ${name.trim()}
البريد: ${email.trim()}
الهاتف: ${phone.trim() || "---"}
الموضوع: ${subject.trim()}

${message.trim()}`;
  }, [form]);

  // إرسال
  function sendMail(e) {
    e.preventDefault();
    if (!validate()) return;
    const href = `mailto:${encodeURIComponent(MAIL_TO)}?subject=${encodeURIComponent(
      "[نموذج التواصل] " + form.subject.trim()
    )}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = href;
    showToast("سيتم فتح عميل البريد لديك لإرسال الرسالة ✉️");
  }

  function sendWhatsApp() {
    if (!validate()) return;
    const url = `https://wa.me/${encodeURIComponent(
      WHATSAPP_NUMBER
    )}?text=${encodeURIComponent(waText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    showToast("فتح واتساب لإرسال الرسالة 📱");
  }

  return (
    <div className="contact-page" dir="rtl">
      <div className="wrap">
        <div className="card" role="region" aria-label="نموذج التواصل">
          <div className="header">
            <div className="logo" aria-hidden="true" />
            <div className="title">
              <h1>تواصل معنا</h1>
              <p>
                يسعدنا استقبال استفساراتك وملاحظاتك. املأ الحقول التالية وسنرد
                عليك قريبًا.
              </p>
            </div>
          </div>

          <div className="grid">
            {/* النموذج */}
            <form className="panel" onSubmit={sendMail} noValidate>
              <div className="row">
                <div>
                  <label htmlFor="name">
                    الاسم الكامل <span className="req">*</span>
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    placeholder="اكتب اسمك"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject">
                    الموضوع <span className="req">*</span>
                  </label>
                  <input
                    id="subject"
                    placeholder="موضوع الرسالة"
                    value={form.subject}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subject: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div>
                  <label htmlFor="email">
                    البريد الإلكتروني <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    placeholder="example@mail.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">رقم الواتساب (اختياري)</label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="مثال: 2224xxxxxx"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message">
                  نص الرسالة <span className="req">*</span>
                </label>
                <textarea
                  id="message"
                  placeholder="اكتب رسالتك هنا..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  required
                />
                <div className="hint">
                  سنستخدم بياناتك للرد على رسالتك فقط.
                </div>
              </div>

              <label className="check">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>أوافق على معالجة معلوماتي لغرض الرد على رسالتي.</span>
              </label>

              <div className="actions">
                <button type="submit" className="btn">
                  إرسال
                </button>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={sendWhatsApp}
                >
                  إرسال عبر واتساب
                </button>
              </div>
              <div className="small" style={{ marginTop: 8 }}>
                * الحقول المعلّمة مطلوبة
              </div>
            </form>

            {/* معلومات الاتصال */}
            <aside className="panel">
              <div className="list">
                <div className="item">
                  <div className="ico">📧</div>
                  <div>
                    <div>
                      <strong>البريد:</strong> {MAIL_TO}
                    </div>
                    <div className="small">نرد عادة خلال 2–8 دقيقة عمل.</div>
                  </div>
                </div>
                <div className="item">
                  <div className="ico">📞</div>
                  <div>
                    <div>
                      <strong>الهاتف:</strong> +{WHATSAPP_NUMBER}
                    </div>
                    <div className="small">
                      الأحد – الخميس، 9 صباحًا حتى 5 مساءً.
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="ico">📍</div>
                  <div>
                    <div>
                      <strong>العنوان:</strong> نواكشوط، موريتانيا
                    </div>
                    
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`toast ${toast.show ? "show" : ""}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div>{toast.msg || "تم إرسال رسالتك بنجاح ✅"}</div>
      </div>

      {/* CSS محلي (مُقنّن داخل .contact-page) */}
      <style>{`
.contact-page {
  --bg:#0b1020; --panel:#111736; --text:#eef2ff; --muted:#a5b4fc;
  --primary:#5570F1; --ring:rgba(85,112,241,.3);
  --radius:16px; --shadow:0 10px 30px rgba(0,0,0,.25);
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:linear-gradient(160deg, #0b1020, #0e1540 60%, #0b1020);
  color:var(--text); padding:24px;
}
.contact-page * { box-sizing: border-box; }
.contact-page .wrap{width:100%; max-width:980px}
.contact-page .card{
  background:rgba(17,23,54,.7);
  backdrop-filter:saturate(140%) blur(8px);
  border:1px solid rgba(255,255,255,.06);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  overflow:hidden;
}
.contact-page .header{
  padding:28px 24px; border-bottom:1px solid rgba(255,255,255,.06);
  display:flex; gap:16px; align-items:center; flex-wrap:wrap;
}
.contact-page .logo{
  width:48px; height:48px; border-radius:14px; 
  background:conic-gradient(from 180deg at 50% 50%, var(--primary), #22c55e, #06b6d4, var(--primary));
  box-shadow:0 6px 20px rgba(85,112,241,.45);
}
.contact-page .title h1{margin:0; font-size:1.4rem}
.contact-page .title p{margin:4px 0 0; color:var(--muted); font-size:.95rem}
.contact-page .grid{
  display:grid; grid-template-columns:1.1fr .9fr; gap:22px; padding:24px;
}
@media (max-width:900px){ .contact-page .grid{grid-template-columns:1fr} }
.contact-page .panel{
  background:rgba(255,255,255,.02);
  border:1px solid rgba(255,255,255,.06);
  border-radius:12px; padding:16px;
}
.contact-page label{display:block; font-weight:600; margin:8px 2px 6px}
.contact-page input, .contact-page textarea, .contact-page select{
  width:100%; padding:12px 14px; border-radius:12px; border:1px solid rgba(255,255,255,.12);
  background:#0e1430; color:var(--text); outline:none; transition:.2s border, .2s box-shadow;
}
.contact-page input:focus, .contact-page textarea:focus, .contact-page select:focus{
  border-color:var(--primary); box-shadow:0 0 0 4px var(--ring)
}
.contact-page textarea{min-height:140px; resize:vertical}
.contact-page .row{display:grid; grid-template-columns:1fr 1fr; gap:12px}
@media (max-width:560px){ .contact-page .row{grid-template-columns:1fr} }
.contact-page .hint{color:var(--muted); font-size:.9rem; margin-top:6px}
.contact-page .actions{display:flex; gap:10px; flex-wrap:wrap; margin-top:14px}
.contact-page .btn{
  appearance:none; border:none; cursor:pointer; padding:12px 16px; border-radius:12px;
  background:var(--primary); color:white; font-weight:700; box-shadow:0 8px 18px rgba(85,112,241,.35);
  transition:transform .05s ease, filter .2s;
}
.contact-page .btn:active{ transform:translateY(1px) }
.contact-page .btn.ghost{
  background:transparent; border:1px solid rgba(255,255,255,.14); color:var(--text); box-shadow:none;
}
.contact-page .list{display:grid; gap:12px}
.contact-page .item{display:flex; gap:12px; align-items:flex-start; padding:12px; border-radius:12px; background:rgba(255,255,255,.03); border:1px dashed rgba(255,255,255,.08)}
.contact-page .ico{
  width:36px; height:36px; border-radius:10px; display:grid; place-items:center;
  background:rgba(85,112,241,.15); color:var(--text); font-weight:900;
}
.contact-page .small{font-size:.92rem; color:var(--muted)}
.contact-page .check{
  display:flex; gap:10px; align-items:flex-start; margin-top:8px; font-size:.95rem; color:#dbe3ff;
}
.contact-page .check input{width:18px; height:18px; margin-top:2px}
.contact-page .toast{
  position:fixed; inset-inline:0; top:14px; display:flex; justify-content:center; pointer-events:none;
  z-index:10000;
}
.contact-page .toast > div{
  background:#0b132b; border:1px solid rgba(255,255,255,.12); padding:12px 14px; border-radius:12px; 
  color:#c8ffd9; font-weight:600; box-shadow:var(--shadow); transform:translateY(-20px); opacity:0; 
  transition:.25s ease; pointer-events:auto;
}
.contact-page .toast.show > div{ transform:translateY(0); opacity:1 }
.contact-page .req{color:#ff8080}
      `}</style>
    </div>
  );
}
