import Nav from "../../components/Nav";
import { products } from "../../data/products";
import Link from "next/link";

export default function Products() {
  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: 1000,
          margin: "32px auto",
          padding: 16,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <img
              src={p.cover}
              alt={p.name}
              style={{
                width: "100%",
                height: 150,
                objectFit: "contain",
                background: "#f6f6f6",
              }}
            />
            <div style={{ padding: 12 }}>
              <b>{p.name}</b>
              <div style={{ color: "#666", margin: "6px 0" }}>{p.short}</div>
              <div style={{ margin: "8px 0" }}>
                <b>${(p.priceCents / 100).toFixed(2)}</b> / شهر
              </div>
              <Link
                href={`/products/${p.id}`}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  display: "inline-block",
                }}
              >
                تفاصيل
              </Link>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
