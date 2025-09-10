// src/pages/Lookup.jsx
import { useState } from "react";

// رابط Google Apps Script (Web App URL)
const GAS_URL = "https://script.google.com/macros/s/AKfycbwddV7ORaTmljCeHOcbsPUPj335TRcI_Iyek5c5_p0F9XBg3IitRX__c2WfxEym1KY_/exec";

export default function Lookup() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code }),
      });
      const json = await res.json();
      if (!json.ok) {
        const msg =
          json.error === "not_found"
            ? "❌ لم يتم العثور على طلب بهذه البيانات."
            : json.error === "missing_params"
            ? "⚠️ بيانات ناقصة."
            : "⚠️ حدث خطأ أثناء الاستعلام.";
        setError(msg);
      } else {
        setResult(json.order);
      }
    } catch (err) {
      setError("تعذر الاتصال بالخدمة. تحقق من الشبكة أو الرابط.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="page">
      <h1>تحقّق من طلبك</h1>
      <p style={{ opacity: 0.8, marginTop: -6 }}>
        أدخل اسمك والرقم السري الذي وصلك للتحقق من المنتج.
      </p>

      <form className="form" onSubmit={onSubmit} style={{ marginTop: 12 }}>
        <label>
          الاسم
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: Mohamed"
          />
        </label>
        <label>
          الرقم السري
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="مثال: NX-4K-AB12"
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
        <div className="form" style={{ marginTop: 12 }}>
          <h3 style={{ marginTop: 0 }}>تفاصيل الطلب</h3>
          <p>
            <strong>الاسم:</strong> {result.name}
          </p>
          <p>
            <strong>المنتج:</strong> {result.product}
          </p>
          <p>
            <strong>المدة:</strong> {result.duration}
          </p>
          <p>
            <strong>السعر:</strong> {result.price} MRU
          </p>
          {result.status && (
            <p>
              <strong>الحالة:</strong> {result.status}
            </p>
          )}
          {result.notes && (
            <p>
              <strong>ملاحظات:</strong> {result.notes}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
