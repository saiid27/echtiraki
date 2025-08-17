"use client";
import Nav from "../../../components/Nav";
import { products } from "../../../data/products";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }: { params: { id: string } }) {
  const p = products.find(x => x.id === params.id);
  const router = useRouter();
  if (!p) return <main style={{ padding: 24 }}>المنتج غير موجود.</main>;

  return (
    <>
      <Nav />
      <main style={{ maxWidth: 800, margin: "32px auto", padding: 16 }}>
        <h1>{p.name}</h1>
        <img src={p.cover} alt={p.name} style={{ width: 140, height: 140, objectFit: "contain", background: "#f6f6f6", borderRadius: 8 }} />
        <p style={{ marginTop: 12 }}>{p.description}</p>
        <div style={{ marginTop: 12 }}><b>${(p.priceCents / 100).toFixed(2)}</b> / شهر</div>
        <button onClick={() => router.push("/contact")}
                style={{ marginTop: 12, padding: "10px 16px", border: "1px solid #0a7", borderRadius: 8, cursor: "pointer" }}>
          اطلب الآن (تجريبي)
        </button>
      </main>
    </>
  );
}
