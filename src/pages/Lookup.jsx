// src/pages/Lookup.jsx
import { useState } from "react";

/** إعدادات الشيت (GViz) */
const SHEET_ID = "1MtmdaclwU_1qGC0ysyLv3RSg_15HuS5j8E0jeAsW3RI"; // ID الشيت
const SHEET_NAME = "orders"; // اسم الورقة (Sheet tab)

/** يبني رابط GViz مع استعلام tq */
function buildGvizUrl(code, name) {
  const isNumeric = /^\d+$/.test(code.trim());
  const codeExpr = isNumeric ? code.trim() : `'${escapeQuotes(code.trim())}'`;
  const nameExpr = `lower('${escapeQuotes(name.trim())}')`;

  const tq = `
    select A,B,C,D,E,F,G
    where A = ${codeExpr}
      and lower(B) = ${nameExpr}
    limit 1
  `.replace(/\s+/g, " ");

  const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`;
  const params = new URLSearchParams({
    tqx: "out:json",
    sheet: SHEET_NAME,
    tq: tq,
  });
  return `${base}?${params.toString()}`;
}

function escapeQuotes(s) {
  return s.replace(/'/g, "\\'");
}

/** GViz يرجّع نصًا ملفوفًا داخل دالة؛ نفكّه هنا */
function parseGvizResponseText(txt) {
  const start = txt.indexOf("(");
  const end = txt.lastIndexOf(")");
  if (start === -1 || end === -1) throw new Error("Bad GViz response");
  return JSON.parse(txt.slice(start + 1, end));
}

export default function Lookup() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!name.trim() || !code.trim()) {
      setError("يرجى إدخال الاسم والرقم السري.");
      return;
    }

    setLoading(true);
    try {
      const url = buildGvizUrl(code, name);
      const res = await fetch(url, { method: "GET" });
      const txt = await res.text();
      const json = parseGvizResponseText(txt);

      if (json.status !== "ok") throw new Error("GViz status not ok");

      const rows = json.table?.rows || [];
      if (!rows.length) {
        setError("لم يتم العثور على طلب بهذه البيانات.");
      } else {
        const c = rows[0].c;
        const val = (i) => (c[i] ? c[i].v : "");
        setResult({
          code: val(0),
          name: val(1),
          product: val(2),
          duration: val(3),
          price: val(4),
          status: val(5),
          notes: val(6),
        });
      }
    } catch (err) {
      setError("تعذر الاتصال بالشيت. تأكد من (Publish to the web) واسم الورقة.");
    } finally {
      setLoading(false);
    }
  }

  /** نسخ كل التفاصيل للحافظة */
  async function handleCopy() {
    if (!result) return;
    const text = [
      "تفاصيل الطلب:",
      `الاسم: ${result.name ?? "-"}`,
      `الكود: ${code}`,
      `المنتج: ${result.product ?? "-"}`,
      `المدة: ${result.duration ?? "-"}`,
      `السعر: ${result.price ?? "-"} MRU`,
      result.status ? `الحالة: ${result.status}` : "",
      result.notes ? `ملاحظات: ${result.notes}` : "",
      `تاريخ: ${new Date().toLocaleString()}`
    ].filter(Boolean).join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  /** إنشاء صفحة طباعة أنيقة يمكن حفظها كـ PDF */
  function handleDownloadPDF() {
    if (!result) return;

    const html = `
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>فاتورة الطلب</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    @page { size: A4; margin: 18mm; }
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; color: #111827; }
    .invoice{
      max-width: 720px; margin: 0 auto;
      border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;
    }
    .head{
      display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom: 12px;
      border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;
    }
    .brand{ font-weight:700; font-size: 18px; }
    .muted{ color:#6b7280; font-size: 12px; }
    .title{ font-size: 18px; font-weight: 700; margin: 10px 0 14px; }
    .grid{ display:grid; grid-template-columns: 120px 1fr; gap:10px 16px; }
    .label{ color:#6b7280; font-weight:600; text-align:right; }
    .val{ color:#111827; }
    .foot{ margin-top: 18px; border-top: 1px dashed #e5e7eb; padding-top: 10px; font-size: 12px; color:#6b7280; }
    @media print {
      .no-print{ display:none; }
    }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="head">
      <div class="brand">Echtiraki</div>
      <div class="muted">${new Date().toLocaleString()}</div>
    </div>

    <div class="title">فاتورة الطلب</div>

    <div class="grid">
      <div class="label">الاسم</div><div class="val">${safe(result.name)}</div>
      <div class="label">الكود</div><div class="val">${safe(code)}</div>
      <div class="label">المنتج</div><div class="val">${safe(result.product)}</div>
      <div class="label">المدة</div><div class="val">${safe(result.duration)}</div>
      <div class="label">السعر</div><div class="val">${safe(result.price)} MRU</div>
      ${ result.status ? `<div class="label">الحالة</div><div class="val">${safe(result.status)}</div>` : "" }
      ${ result.notes ? `<div class="label">ملاحظات</div><div class="val">${safe(result.notes)}</div>` : "" }
    </div>

    <div class="foot">تم إنشاء هذه الفاتورة بواسطة موقع Echtiraki — للاستخدام الشخصي.</div>
    <button class="no-print" onclick="window.print()" style="margin-top:12px;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb;background:#f9fafb;cursor:pointer">طباعة / حفظ PDF</button>
  </div>
</body>
</html>
    `.trim();

    const w = window.open("", "_blank");
    if (w) {
      w.document.open();
      w.document.write(html);
      w.document.close();
      // نؤخر الطباعة قليلًا لضمان تحميل الصفحة
      setTimeout(() => w.print(), 400);
    }
  }

  function safe(v) {
    return (v ?? "").toString().replace(/[&<>"']/g, s => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
    }[s]));
  }

  return (
    <article className="page">
      <h1> منتجك</h1>
      <p style={{ opacity: 0.8, marginTop: -6 }}>
        أدخل اسمك والرمز التعريفي  لعرض منتجك .
      </p>

      <form className="form" onSubmit={onSubmit} style={{ marginTop: 12 }}>
        <label>
          الإسم
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: saiid"
          />
        </label>
        <label>
          الرمز التعريفي 
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="مثال: 12345"
          />
        </label>

        <div className="row">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "جارٍ البحث…" : "بحث"}
          </button>
        </div>
      </form>

      {error && (
        <div className="empty" style={{ marginTop: 12, borderStyle: "solid" }}>
          {error}
        </div>
      )}

      {result && (
        <div className="result-card">
          <div className="result-title">تفاصيل الطلب</div>

          <div className="result-grid">
            <div className="result-label">اسم الزبون</div>
            <div className="result-value">{result.name || "-"}</div>

            <div className="result-label">الرمز التعريفي</div>
            <div className="result-value">{code}</div>

            <div className="result-label">الإيميل</div>
            <div className="result-value">{result.product || "-"}</div>

            <div className="result-label">الكود</div>
            <div className="result-value">{result.duration || "-"}</div>

            <div className="result-label">السعر</div>
            <div className="result-value">
              {result.price ? `${result.price} MRU` : "-"}
            </div>

            {result.status && (
              <>
                <div className="result-label">الحالة</div>
                <div className="result-value">
                  <span
                    className={`badge ${
                      String(result.status).toLowerCase() === "ok" ? "ok" : "warn"
                    }`}
                  >
                    {result.status}
                  </span>
                </div>
              </>
            )}

            {result.notes && (
              <>
                <div className="result-label"> معلومات الحساب</div>
                <div className="result-value">{result.notes}</div>
              </>
            )}
          </div>

          {/* أزرار العمليات */}
          <div className="result-actions">
            <button type="button" className="btn ghost" onClick={handleCopy}>
              {copied ? "تم النسخ ✓" : "نسخ التفاصيل"}
            </button>
            <button type="button" className="btn" onClick={handleDownloadPDF}>
              تنزيل PDF
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
