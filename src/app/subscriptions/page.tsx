"use client";

import { useEffect, useState } from "react";
import Nav from "../../components/Nav";

type Order = {
  id: string;
  productId: string;
  name: string;
  price: number;        // بالسنتات
  createdAt: string;    // ISO
  status: string;       // pending/paid/active...
};

export default function Subscriptions() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    const p = localStorage.getItem("phone");
    setPhone(p);
    if (!p) return;
    const key = `orders:${p}`;
    try {
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
    }
  }, []);

  if (!phone) {
    return (
      <>
        <Nav />
        <main style={{ maxWidth: 800, margin: "32px auto", padding: 16 }}>
          <h1>اشتراكاتي</h1>
          <p>من فضلك سجّل الدخول برقم واتساب أولًا.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main style={{ maxWidth: 900, margin: "32px auto", padding: 16 }}>
        <h1>اشتراكاتي</h1>
        {orders.length === 0 ? (
          <p>لا توجد اشتراكات بعد.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {orders.map((o) => (
              <div key={o.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
                <b>{o.name}</b>
                <div>السعر: ${(o.price / 100).toFixed(2)} / شهر</div>
                <div>الحالة: {o.status}</div>
                <div style={{ color: "#666" }}>التاريخ: {new Date(o.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
