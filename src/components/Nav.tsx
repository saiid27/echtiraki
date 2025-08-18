"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [phone, setPhone] = useState<string | null>(null);
  useEffect(() => {
    // نخزن رقم الهاتف أيضًا في localStorage لعرضه في الواجهة
    const p = localStorage.getItem("phone");
    setPhone(p);
  }, []);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("phone");
    window.location.href = "/login";
  };

  return (
    <nav style={{display:"flex",gap:12,alignItems:"center",padding:12,background:"#fff",borderBottom:"1px solid #eee",position:"sticky",top:0}}>
      <b style={{color:"#0a7"}}>echtiraki</b>
      <Link href="/">الرئيسية</Link>
      <Link href="/products">المنتجات</Link>
      <Link href="/subscriptions">اشتراكاتي</Link>
      <div style={{marginInlineStart:"auto"}}>
        {phone ? (
          <span>واتساب: {phone} | <button onClick={logout} style={{border:"none",background:"transparent",textDecoration:"underline",cursor:"pointer"}}>خروج</button></span>
        ) : (
          <Link href="/login">دخول</Link>
        )}
      </div>
    </nav>
  );
}
