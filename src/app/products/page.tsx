"use client";
import Nav from "../../components/Nav";
import Link from "next/link";
import { useEffect, useState } from "react";

type Prod = { slug:string; name:string; short:string; cover:string; price_cents:number; period_text:string; sold:number; category:string; stock:number };

const CATS = [
  {key:"all", label:"All"},
  {key:"ai", label:"AI"},
  {key:"media", label:"Audio & Video"},
  {key:"tools", label:"Tools"},
];

export default function Products(){
  const [cat,setCat] = useState("all");
  const [items,setItems] = useState<Prod[]>([]);

useEffect(() => {
  (async () => {
    try {
      const res = await fetch(`/api/products?cat=${cat}`);
      if (!res.ok) {
        // اطبع نص الردّ لمعرفة الخطأ الحقيقي
        const txt = await res.text();
        throw new Error(`API ${res.status}: ${txt}`);
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setItems([]); // عشان ما يكسر الصفحة
    }
  })();
}, [cat]);


  return (
    <>
      <Nav />
      <div className="heroX">
        <div className="container">
          <h2 style={{margin:0}}>Pay Less When Share More</h2>
          <div className="sub">Enjoy Familyplan Price through echtiraki</div>
          <div className="tabs">
            {CATS.map(c=>
              <button key={c.key} className={`tab ${cat===c.key?'active':''}`} onClick={()=>setCat(c.key)}>{c.label}</button>
            )}
          </div>
        </div>
      </div>

      <div className="container grid">
        {items.map(p=>(
          <div key={p.slug} className="card">
            <div className="top">
              <img className="logo" src={p.cover} alt={p.name}/>
              <div>
                <div style={{fontWeight:700}}>{p.name}</div>
                <div className="sub">{p.short}</div>
              </div>
            </div>
            <div className="price">${(p.price_cents/100).toFixed(2)} <span style={{fontSize:14}}>{p.period_text}</span></div>
            <div className="meta">Sold: {p.sold} · Stock: {p.stock}</div>
            <Link href={`/products/${p.slug}`} className="btn" aria-disabled={p.stock<=0} onClick={e=>{ if(p.stock<=0){ e.preventDefault(); }}}>
              {p.stock>0 ? "Join in" : "Out of stock"}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
