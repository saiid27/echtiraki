"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import { normalizePhone, isValidPhone } from "../../lib/phone";

export default function Login() {
  const [raw, setRaw] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  useEffect(() => {
    const existing = localStorage.getItem("phone");
    if (existing) router.replace("/products");
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = normalizePhone(raw);
    if (!isValidPhone(phone)) {
      setErr("اكتب رقم واتساب بصيغة دولية مثل: +2126xxxxxxxx");
      return;
    }
    // خزّنه في الكوكي (جلسة) + localStorage للواجهة
    await fetch("/api/login", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ phone }) });
    localStorage.setItem("phone", phone);
    router.push("/products");
  };

  return (
    <>
      <Nav />
      <main style={{maxWidth:480, margin:"40px auto", padding:16}}>
        <h1>تسجيل الدخول برقم واتساب</h1>
        <form onSubmit={submit} style={{display:"grid", gap:12}}>
          <input value={raw} onChange={e=>setRaw(e.target.value)} placeholder="+2126xxxxxxx"
                 style={{padding:10, border:"1px solid #ddd", borderRadius:8}} />
          {err && <div style={{color:"#c00"}}>{err}</div>}
          <button type="submit" style={{padding:"10px 16px", border:"1px solid #0a7", borderRadius:8, cursor:"pointer"}}>دخول</button>
          <small style={{color:"#666"}}>MVP بدون OTP. لاحقًا نضيف كود تحقق عبر واتساب.</small>
        </form>
      </main>
    </>
  );
}
