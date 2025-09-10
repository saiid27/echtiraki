// src/pages/About.jsx
import { Link } from "react-router-dom";

const FACEBOOK_URL =
  import.meta.env.VITE_FACEBOOK_URL ||
  "https://www.facebook.com/profile.php?id=61577083032030";
const WHATSAPP_NUMBER =
  (import.meta.env.VITE_ADMIN_PHONE || "22249677414").toString().replace(/\D/g, "");
const HOMEPAGE_URL = import.meta.env.VITE_HOMEPAGE_URL || "https://echtiraki.site";

export default function About() {
  const year = new Date().getFullYear();

  return (
    <main className="about-page" dir="rtl" aria-label="من نحن">
      <div className="wrap">
        <div className="card">
          {/* Header / Hero */}
          <section className="header">
            <div className="logo" aria-hidden="true" />
            <div className="title">
              <h1>إشتراكي — echtiraki</h1>
              <p>
                موقع متخصص في توفير الاشتراكات الرقمية، نساعد الأفراد على إيجاد منتجاتهم الرقمية
                بتكلفة أقل وأمان أكثر.
              </p>

              <div className="badges" aria-label="مزايا سريعة">
                <span className="pill">خبرة في المجال</span>
                <span className="pill">دعم فني سريع</span>
                <span className="pill">أسعار مرنة</span>
              </div>

              <div className="actions">
                <a
                  className="btn btn-primary"
                  href={HOMEPAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  رجوع إلى الصفحة الرئيسية
                </a>
                <Link className="btn ghost" to="/">
                  قائمة المنتجات
                </Link>
              </div>
            </div>

            <div className="mock" aria-hidden="true">
              <div className="mock-dot" />
              <div className="mock-dot" />
              <div className="mock-dot" />
            </div>
          </section>

          {/* Features */}
          <section className="grid cards" aria-label="قيم ورسالة">
            <article className="card-item">
              <h3>منتجاتنا</h3>
              <p>نوفر حسابات جماعية لتقليل التكلفة مع ضمان الجودة.</p>
            </article>
            <article className="card-item">
              <h3>طرق الدفع</h3>
              <p>Banklily، Masrivi، BimBank، Gaza Pay.</p>
            </article>
            <article className="card-item">
              <h3>مميزاتنا</h3>
              <p>الشفافية، الجودة، السرعة في التنفيذ، والتركيز على تجربة العميل.</p>
            </article>
          </section>

          {/* Team */}
          <section className="team" aria-label="فريق العمل">
            <h2>فريق العمل</h2>
            <p className="muted">نخبة من الأفراد</p>

            <div className="team-grid">
              <div className="member">
                <div className="avatar">م</div>
                <b>محمد الشيخ</b>
                <div className="role">مدير المالية</div>
              </div>

              <div className="member">
                <div className="avatar">ع</div>
                <b>علي ولد عبد</b>
                <div className="role">مسؤول التوصيل</div>
              </div>

              <div className="member">
                <div className="avatar">س</div>
                <b>محمد سعيد محمدن</b>
                <div className="role">مطوّر الموقع</div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="stats" aria-label="أرقام وحقائق">
            <div className="stat">
              <b>120+</b>
              <span>عميل سعيد</span>
            </div>
            <div className="stat">
              <b>120</b>
              <span>اشتراك مكتمل</span>
            </div>
            <div className="stat">
              <b>24/24</b>
              <span>دعم متواصل</span>
            </div>
            <div className="stat">
              <b>1</b>
              <span>سنة خبرة</span>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="panel cta" aria-label="تواصل معنا">
            <h3>تواصل معنا</h3>
            <p className="muted">راسلنا عبر فيسبوك أو واتساب وسنردّ عليك سريعاً.</p>
            <div className="actions">
              <a
                className="btn btn-primary"
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="صفحتنا على فيسبوك"
              >
                Facebook
              </a>
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل عبر واتساب"
              >
                واتساب
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="about-foot" aria-label="تذييل">
            <small>© {year} إشتراكي — جميع الحقوق محفوظة</small>
            <div className="mini-links">
              <Link to="/">الرئيسية</Link>
              <Link to="/contact">اتصل بنا</Link>
            </div>
          </footer>
        </div>
      </div>

      {/* Scoped CSS */}
      <style>{`
.about-page{
  --bg:#0b1020; --panel:#111736; --text:#eef2ff; --muted:#a5b4fc;
  --primary:#5570F1; --ring:rgba(85,112,241,.3);
  --radius:16px; --shadow:0 10px 30px rgba(0,0,0,.25);
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:linear-gradient(160deg, #0b1020, #0e1540 60%, #0b1020);
  color:var(--text); padding:24px;
}
.about-page *{ box-sizing:border-box; }
.about-page .wrap{ width:100%; max-width:1100px; }
.about-page .card{
  background:rgba(17,23,54,.7);
  backdrop-filter:saturate(140%) blur(8px);
  border:1px solid rgba(255,255,255,.06);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  overflow:hidden;
  padding: 0 0 18px 0;
}

/* Header / Hero */
.about-page .header{
  display:grid; grid-template-columns:1.1fr .9fr; gap:24px; align-items:center;
  padding:24px; border-bottom:1px solid rgba(255,255,255,.06);
}
.about-page .logo{
  width:48px; height:48px; border-radius:14px; 
  background:conic-gradient(from 180deg at 50% 50%, var(--primary), #22c55e, #06b6d4, var(--primary));
  box-shadow:0 6px 20px rgba(85,112,241,.45);
}
.about-page .title h1{ margin:0 0 8px; font-size: clamp(26px, 4.2vw, 40px); line-height:1.2; }
.about-page .title p{ margin:0; color:var(--muted); font-size: .98rem; }
.about-page .badges{ display:flex; gap:10px; flex-wrap:wrap; margin:14px 0; }
.about-page .pill{
  font-size: 13.5px; border:1px solid rgba(255,255,255,.14);
  padding:7px 12px; border-radius:999px; color:#e6ebff; background:rgba(255,255,255,.04);
}
.about-page .actions{ display:flex; gap:10px; flex-wrap:wrap; margin-top:14px; }
.about-page .btn{
  appearance:none; border:none; cursor:pointer; padding:11px 16px; border-radius:999px;
  background:var(--primary); color:white; font-weight:700; box-shadow:0 8px 18px rgba(85,112,241,.35);
  text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:transform .05s ease;
}
.about-page .btn:active{ transform: translateY(1px); }
.about-page .btn.ghost{
  background:transparent; border:1px solid rgba(255,255,255,.14); color:#e6ebff; box-shadow:none;
}
.about-page .mock{
  position:relative; aspect-ratio:16/10; border-radius:22px; overflow:hidden;
  background:radial-gradient(1200px 400px at 70% -20%,rgba(85,112,241,.35),transparent),
             linear-gradient(180deg,#10173a,#0f1531);
  border:1px solid rgba(255,255,255,.08);
}
.about-page .mock::after{
  content:""; position:absolute; inset:0;
  background:repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 2px,transparent 2px 6px);
}
.about-page .mock-dot{
  position:absolute; width:10px; height:10px; border-radius:50%; background:#93c5fd; opacity:.9;
  top:12px; right:12px; box-shadow:0 0 16px #93c5fd;
}

/* Cards */
.about-page .grid.cards{
  display:grid; grid-template-columns:repeat(3,1fr); gap:16px; padding:18px 24px 0;
}
.about-page .card-item{
  background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08);
  border-radius:14px; padding:16px; box-shadow: var(--shadow);
}
.about-page .card-item h3{ margin:0 0 8px; font-size: 20px; }
.about-page .card-item p{ margin:0; color:#d9e1ff; }

/* Team */
.about-page .team{ padding: 18px 24px 0; }
.about-page .team h2{ margin:0 0 8px; font-size: 22px; }
.about-page .team .muted{ margin:0 0 12px; color:var(--muted); }
.about-page .team-grid{
  display:grid; grid-template-columns:repeat(3,1fr); gap:14px;
}
.about-page .member{
  background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08);
  border-radius:14px; padding:14px; text-align:center;
}
.about-page .avatar{
  width:84px; height:84px; margin:6px auto 10px; border-radius:50%;
  background:#1c2963; border:1px solid rgba(255,255,255,.1); display:grid; place-items:center;
  font-weight:800; color:#fff; font-size: 24px;
}
.about-page .role{ color:#cbd5e1; font-size: 14px; margin-top: 4px; }

/* Stats */
.about-page .stats{
  padding: 18px 24px 0; display:grid; grid-template-columns:repeat(4,1fr); gap:14px;
}
.about-page .stat{
  background:#0f1531; border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:16px; text-align:center;
}
.about-page .stat b{ display:block; font-size: 26px; margin-bottom: 6px; color: #fff; }
.about-page .stat span{ color:#dbe3ff; }

/* CTA Panel */
.about-page .panel.cta{
  margin: 18px 24px 0; padding: 16px;
  background:rgba(255,255,255,.02); border:1px solid rgba(255,255,255,.06);
  border-radius: 14px;
}
.about-page .panel.cta h3{ margin:0 0 6px; font-size: 20px; }
.about-page .panel.cta .muted{ margin:0 0 12px; color:var(--muted); }

/* Footer */
.about-page .about-foot{
  margin: 22px 24px 0; padding-top: 14px; border-top:1px dashed rgba(255,255,255,.12);
  display:flex; gap:10px; flex-wrap:wrap; justify-content:space-between; align-items:center;
}
.about-page .mini-links{ display:flex; gap:12px; flex-wrap:wrap; }
.about-page .mini-links a{ color:#dbe3ff; text-decoration:none; }
.about-page .mini-links a:hover{ text-decoration:underline; }

/* ===== الهواتف: تضييق دقيق (نفس روح Contact.jsx) ===== */
@media (max-width: 900px){
  .about-page .header{ grid-template-columns:1fr; }
  .about-page .grid.cards{ grid-template-columns:1fr 1fr; }
  .about-page .team-grid{ grid-template-columns:1fr 1fr; }
  .about-page .stats{ grid-template-columns:1fr 1fr; }
}
@media (max-width: 520px){
  .about-page{ padding:14px; }
  .about-page .header{ padding:18px 16px; gap:14px; }
  .about-page .title h1{ font-size: clamp(22px, 6vw, 28px); }
  .about-page .title p{ font-size:.9rem; }
  .about-page .badges .pill{ padding:6px 10px; font-size:.86rem; }
  .about-page .btn{ padding:9px 14px; font-size:.92rem; }
  .about-page .grid.cards{ grid-template-columns:1fr; gap:12px; padding:14px 16px 0; }
  .about-page .team-grid{ grid-template-columns:1fr; }
  .about-page .stats{ grid-template-columns:1fr 1fr; gap:10px; padding:14px 16px 0; }
  .about-page .panel.cta{ margin:14px 16px 0; padding:12px; }
  .about-page .about-foot{ margin:18px 16px 0; }
}
@media (max-width: 420px){
  .about-page{ padding:10px; }
  .about-page .btn{ padding:8px 12px; border-radius: 999px; font-size:.88rem; }
  .about-page .stats{ grid-template-columns:1fr; }
}
@media (max-width: 340px){
  .about-page{ padding:8px; }
  .about-page .title h1{ font-size: 1.05rem; }
  .about-page .btn{ padding:7px 10px; font-size:.84rem; }
}
      `}</style>
    </main>
  );
}
