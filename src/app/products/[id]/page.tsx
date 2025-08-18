"use client";
import Nav from "../../../components/Nav";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail(){
  const { id } = useParams<{id:string}>();
  const router = useRouter();
  const [p,setP] = useState<any>(null);

  useEffect(()=>{ fetch(`/api/products/${id}`).then(r=>r.json()).then(setP); },[id]);
  if(!p) return null;

  const join = async()=>{
    const phone = localStorage.getItem("phone");
    if(!phone){ router.push("/login"); return; }
    const r = await fetch("/api/orders",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ phone, productSlug:p.slug })});
    if(r.ok){ router.push("/subscriptions"); } else { alert("لا يمكن إنشاء الطلب (قد يكون المخزون صفر)."); }
  };

  return (
    <>
      <Nav />
      <div className="container" style={{padding:16}}>
        <div className="card">
          <div className="top">
            <img className="logo" src={p.cover} alt={p.name}/>
            <div>
              <h2 style={{margin:"0 0 6px"}}>{p.name}</h2>
              <div className="sub">{p.short}</div>
            </div>
          </div>
          <p style={{marginTop:12}}>{p.description}</p>
          <div className="price">${(p.price_cents/100).toFixed(2)} <span style={{fontSize:14}}>{p.period_text}</span></div>
          <div className="meta">Sold: {p.sold} · Stock: {p.stock}</div>
          <button className="btn" disabled={p.stock<=0} onClick={join}>{p.stock>0? "Join in":"Out of stock"}</button>
        </div>
      </div>
    </>
  );
}
