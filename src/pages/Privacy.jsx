// src/pages/Privacy.jsx
import { Link } from "react-router-dom";

const BRAND = "إشتراكي — echtiraki";
const CONTACT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || "support@example.com";
const WHATSAPP_NUMBER =
  (import.meta.env.VITE_ADMIN_PHONE || "22249677414").toString().replace(/\D/g, "");
const ADDRESS = import.meta.env.VITE_ADDRESS || "نواكشوط، موريتانيا";

export default function Privacy() {
  const updatedAt = new Date().toLocaleDateString("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="policy-page" dir="rtl" aria-label="سياسة الخصوصية">
      <div className="wrap">
        <div className="card">
          {/* Header */}
          <header className="header">
            <div className="logo" aria-hidden="true" />
            <div className="title">
              <h1>سياسة الخصوصية</h1>
              <p className="muted">
                نوضح في هذه الصفحة كيف نجمع بياناتك ونستخدمها ونحميها عند استخدامك لخدمات {BRAND}.
              </p>
              <div className="meta">آخر تحديث: {updatedAt}</div>
              <div className="actions">
                <Link to="/" className="btn btn-primary">الرجوع للرئيسية</Link>
                <Link to="/contact" className="btn ghost">اتصل بنا</Link>
              </div>
            </div>
          </header>

          {/* TOC */}
          <nav className="panel toc" aria-label="فهرس">
            <a href="#scope">1) نطاق السياسة</a>
            <a href="#data">2) ما البيانات التي نجمعها</a>
            <a href="#use">3) كيف نستخدم البيانات</a>
            <a href="#legal">4) الأسس القانونية للمعالجة</a>
            <a href="#share">5) مشاركة البيانات</a>
            <a href="#payments">6) المدفوعات</a>
            <a href="#intl">7) النقل الدولي للبيانات</a>
            <a href="#security">8) الأمان والاحتفاظ</a>
            <a href="#rights">9) حقوقك</a>
            <a href="#cookies">10) الكوكيز والتحليلات</a>
            <a href="#children">11) خصوصية الأطفال</a>
            <a href="#changes">12) التغييرات</a>
            <a href="#contact">13) كيف تتواصل معنا</a>
          </nav>

          {/* Sections */}
          <section id="scope" className="panel">
            <h2>1) نطاق السياسة</h2>
            <p>
              تنطبق هذه السياسة على موقعنا وتطبيقنا وصفحاتنا وحسابات التواصل
              ووسائل الاتصال المرتبطة بهما (مثل واتساب والبريد الإلكتروني).
            </p>
          </section>

          <section id="data" className="panel">
            <h2>2) ما البيانات التي نجمعها</h2>
            <ul className="list">
              <li><b>بيانات الهوية والتواصل:</b> الاسم، رقم واتساب، البريد الإلكتروني، وأي تفاصيل تُرسلها لنا في الرسائل/النماذج.</li>
              <li><b>بيانات الاستخدام والأجهزة:</b> معلومات عامة عن التصفّح (مثل نوع الجهاز والمتصفّح)، لأغراض تحسين الأداء.</li>
              <li><b>محتوى الدعم:</b> الاستفسارات، الملاحظات، وسجلّ المحادثات ذات الصلة بطلبك.</li>
              <li><b>الكوكيز:</b> ملفات صغيرة لتحسين التجربة وقياس الأداء (انظر قسم الكوكيز).</li>
            </ul>
          </section>

          <section id="use" className="panel">
            <h2>3) كيف نستخدم البيانات</h2>
            <ul className="list">
              <li>تنفيذ طلباتك وتقديم المنتجات الرقمية وخدمة ما بعد البيع.</li>
              <li>التواصل معك عبر واتساب أو البريد بشأن الطلبات والدعم.</li>
              <li>تحسين الموقع، الحماية من الاحتيال، والامتثال للالتزامات القانونية.</li>
              <li>إرسال تحديثات مهمة عن الخدمة. (لن نرسل رسائل تسويقية إلا بموافقتك حيثما يلزم.)</li>
            </ul>
          </section>

          <section id="legal" className="panel">
            <h2>4) الأسس القانونية للمعالجة</h2>
            <p>قد نعتمد على واحد أو أكثر من الأسس التالية:</p>
            <ul className="list">
              <li>تنفيذ عقد/طلب بيننا وبينك.</li>
              <li>الموافقة (مثل عند تعبئة نموذج معيّن أو الاشتراك في التحديثات).</li>
              <li>المصلحة المشروعة (تحسين الخدمة، الحماية من الاحتيال).</li>
              <li>الالتزام القانوني.</li>
            </ul>
          </section>

          <section id="share" className="panel">
            <h2>5) مشاركة البيانات</h2>
            <ul className="list">
              <li><b>مزودو الخدمات:</b> نستعين بمزودين موثوقين لاستضافة الموقع، التحليلات، أو الدعم. يلتزمون بحماية بياناتك وعدم استخدامها إلا حسب تعليماتنا.</li>
              <li><b>الالتزامات القانونية:</b> قد نكشف عن بياناتك للسلطات المختصة إذا طُلب منّا قانونًا.</li>
              <li><b>نقل الأعمال:</b> في حال الاندماج/الاستحواذ قد تُنقل البيانات وفقًا للقانون واستمرارًا لنفس مستوى الحماية.</li>
            </ul>
          </section>

          <section id="payments" className="panel">
            <h2>6) المدفوعات</h2>
            <p>
              تتم عمليات الدفع عبر مزودي دفع محليين/خارجيين (مثل Banklily، Masrivi، BimBank، Gaza Pay).
              لا نخزّن بيانات بطاقتك/حسابك المالي لدينا. قد يطبق مزودو الدفع سياسات خصوصية منفصلة خاصّة بهم.
            </p>
          </section>

          <section id="intl" className="panel">
            <h2>7) النقل الدولي للبيانات</h2>
            <p>
              قد تُعالَج بياناتك على خوادم خارج بلدك. نتأكد من اتخاذ ضمانات مناسبة (مثل عقود قياسية)
              عند لزوم نقل البيانات عبر الحدود.
            </p>
          </section>

          <section id="security" className="panel">
            <h2>8) الأمان والاحتفاظ</h2>
            <ul className="list">
              <li>نطبّق ضوابط تقنية وإجرائية لحماية البيانات من الوصول غير المصرّح به.</li>
              <li>نحتفظ بالبيانات فقط للمدة اللازمة للأغراض المذكورة أو كما يقتضيه القانون.</li>
            </ul>
          </section>

          <section id="rights" className="panel">
            <h2>9) حقوقك</h2>
            <p>بحسب القوانين المطبّقة، قد تملك الحقوق التالية:</p>
            <ul className="list">
              <li>الاطلاع على بياناتك والحصول على نسخة منها.</li>
              <li>تصحيح البيانات غير الدقيقة أو استكمال البيانات الناقصة.</li>
              <li>طلب الحذف أو تقييد المعالجة في ظروف معينة.</li>
              <li>الاعتراض على بعض أنواع المعالجة.</li>
              <li>سحب الموافقة في أي وقت حيثما كان الأساس هو الموافقة.</li>
              <li>نقل البيانات إلى مزود آخر عند الإمكان.</li>
            </ul>
            <p className="muted small">
              لممارسة حقوقك، تواصل معنا حسب قسم “كيف تتواصل معنا”.
            </p>
          </section>

          <section id="cookies" className="panel">
            <h2>10) الكوكيز والتحليلات</h2>
            <p>
              نستخدم الكوكيز الأساسية لتحسين وظائف الموقع. قد نستخدم أدوات قياس/تحليلات
              لأغراض إحصائية. يمكنك التحكم بالكوكيز من إعدادات المتصفح. تعطيل بعض
              الكوكيز قد يؤثر على بعض الميزات.
            </p>
          </section>

          <section id="children" className="panel">
            <h2>11) خصوصية الأطفال</h2>
            <p>
              خدماتنا موجّهة للبالغين. لا نجمع عن قصد بيانات من الأطفال. إذا تبيّن لنا خلاف ذلك سنحذف
              البيانات المعنية بسرعة معقولة.
            </p>
          </section>

          <section id="changes" className="panel">
            <h2>12) التغييرات على هذه السياسة</h2>
            <p>
              قد نحدّث هذه السياسة من وقت لآخر. سنعرض نسخة محدثة مع تاريخ “آخر تحديث” أعلى الصفحة.
              استمرارك في استخدام الخدمات بعد التحديث يعني موافقتك على النسخة المعدّلة.
            </p>
          </section>

          <section id="contact" className="panel">
            <h2>13) كيف تتواصل معنا</h2>
            <ul className="list">
              <li><b>البريد:</b> {CONTACT_EMAIL}</li>
              <li><b>واتساب:</b> <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">+{WHATSAPP_NUMBER}</a></li>
              <li><b>العنوان:</b> {ADDRESS}</li>
            </ul>
            <p className="muted small">
              ملاحظة: عند مراسلتنا عبر واتساب، قد تقوم منصّة واتساب/ميتا بمعالجة بياناتك وفق سياساتها الخاصة.
            </p>
          </section>

          {/* Footer */}
          <footer className="policy-foot">
            <small>© {new Date().getFullYear()} {BRAND} — جميع الحقوق محفوظة</small>
            <div className="mini-links">
              <Link to="/">الرئيسية</Link>
              <Link to="/about">من نحن</Link>
              <Link to="/contact">اتصل بنا</Link>
            </div>
          </footer>
        </div>
      </div>

      {/* Scoped CSS (نفس روح الصفحات السابقة + مضغوط للهاتف) */}
      <style>{`
.policy-page{
  --bg:#0b1020; --panel:#111736; --text:#eef2ff; --muted:#a5b4fc;
  --primary:#5570F1; --ring:rgba(85,112,241,.3);
  --radius:16px; --shadow:0 10px 30px rgba(0,0,0,.25);
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:linear-gradient(160deg, #0b1020, #0e1540 60%, #0b1020);
  color:var(--text); padding:24px;
}
.policy-page *{ box-sizing: border-box; }
.policy-page .wrap{ width:100%; max-width:980px; }
.policy-page .card{
  background:rgba(17,23,54,.7);
  backdrop-filter:saturate(140%) blur(8px);
  border:1px solid rgba(255,255,255,.06);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  overflow:hidden;
  padding-bottom: 16px;
}
.policy-page .header{
  display:grid; grid-template-columns:1.1fr; gap:16px; align-items:center;
  padding:24px; border-bottom:1px solid rgba(255,255,255,.06);
}
.policy-page .logo{
  width:48px; height:48px; border-radius:14px; 
  background:conic-gradient(from 180deg at 50% 50%, var(--primary), #22c55e, #06b6d4, var(--primary));
  box-shadow:0 6px 20px rgba(85,112,241,.45);
}
.policy-page .title h1{ margin:0 0 6px; font-size: clamp(26px, 4.2vw, 38px); line-height:1.2; }
.policy-page .title .muted{ margin:0; color:var(--muted); }
.policy-page .meta{ margin-top:6px; color:#cbd5e1; font-size:.9rem; }
.policy-page .actions{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
.policy-page .btn{
  appearance:none; border:none; cursor:pointer; padding:10px 16px; border-radius:999px;
  background:var(--primary); color:white; font-weight:700; box-shadow:0 8px 18px rgba(85,112,241,.35);
  text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:transform .05s ease;
}
.policy-page .btn:active{ transform: translateY(1px); }
.policy-page .btn.ghost{
  background:transparent; border:1px solid rgba(255,255,255,.14); color:#e6ebff; box-shadow:none;
}
.policy-page .panel{
  background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08);
  border-radius:14px; padding:16px; margin:16px 16px 0;
}
.policy-page .panel h2{ margin:0 0 8px; font-size:20px; }
.policy-page .panel p{ margin:0; color:#dbe3ff; }
.policy-page .list{ margin:6px 0 0; padding:0 16px; }
.policy-page .list li{ margin:8px 0; }
.policy-page .toc{
  display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
  gap:8px; margin-top:16px;
}
.policy-page .toc a{
  color:#e6ebff; text-decoration:none; padding:10px 12px; border-radius:10px;
  background:rgba(255,255,255,.02); border:1px solid rgba(255,255,255,.08);
}
.policy-page .toc a:hover{ background:rgba(255,255,255,.05); }

.policy-page .policy-foot{
  margin: 18px 16px 0; padding-top: 12px; border-top:1px dashed rgba(255,255,255,.12);
  display:flex; gap:10px; flex-wrap:wrap; justify-content:space-between; align-items:center;
}
.policy-page .mini-links{ display:flex; gap:12px; flex-wrap:wrap; }
.policy-page .mini-links a{ color:#dbe3ff; text-decoration:none; }
.policy-page .mini-links a:hover{ text-decoration:underline; }

/* الهواتف الصغيرة */
@media (max-width: 520px){
  .policy-page{ padding:14px; }
  .policy-page .header{ padding:18px 16px; }
  .policy-page .title h1{ font-size: clamp(22px, 6vw, 28px); }
  .policy-page .panel{ margin:12px 12px 0; padding:12px; }
  .policy-page .panel h2{ font-size:18px; }
  .policy-page .btn{ padding:9px 14px; font-size:.92rem; }
  .policy-page .toc{ grid-template-columns:1fr 1fr; gap:6px; }
}
@media (max-width: 400px){
  .policy-page{ padding:10px; }
  .policy-page .panel{ margin:10px 10px 0; padding:10px; border-radius:12px; }
  .policy-page .btn{ padding:8px 12px; font-size:.88rem; }
  .policy-page .toc{ grid-template-columns:1fr; }
}
@media (max-width: 340px){
  .policy-page{ padding:8px; }
  .policy-page .panel{ margin:8px 8px 0; padding:8px; border-radius:10px; }
  .policy-page .btn{ padding:7px 10px; font-size:.84rem; }
}
      `}</style>
    </main>
  );
}
