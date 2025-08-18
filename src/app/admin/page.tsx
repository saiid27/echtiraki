"use client";
import { useEffect, useState } from "react";

export default function AdminLogin(){
  const [pass,setPass]=useState(""); const [ok,setOk]=useState(false);
  useEffect(()=>{ /* لا شيء */ },[]);
  const login=async()=>{
    const r=await fetch("/api/admin/login",{method:"POST",headers:{ "Content-Type":"application/json" },body:JSON.stringify({pass})});
    if(r.ok) setOk(true); else alert("كلمة المرور غير صحيحة");
  };
  if(!ok){
    return (
      <main style={{maxWidth:420, margin:"40px auto", padding:16}}>
        <h1>لوحة الأدمِن</h1>
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="ADMIN_PASS" style={{width:"100%",padding:10,border:"1px solid #ddd",borderRadius:8}}/>
        <button onClick={login} className="btn" style={{marginTop:10}}>دخول</button>
      </main>
    );
  }
  return <AdminProducts/>;
}

function AdminProducts(){
  const [items,setItems]=useState<any[]>([]);
  const load=()=>fetch("/api/products").then(r=>r.json()).then(setItems);
  useEffect(()=>{ load(); },[]);
  const update=async(slug:string, patch:any)=>{
    await fetch("/api/admin/products",{method:"PATCH",headers:{ "Content-Type":"application/json" }, body: JSON.stringify({slug, ...patch})});
    load();
  };
  return (
    <main className="container" style={{padding:16}}>
      <h2>المنتجات</h2>
      <div className="grid">
        {items.map(p=>(
          <div key={p.slug} className="card">
            <div className="top">
              <img className="logo" src={p.cover} alt={p.name}/>
              <div><b>{p.name}</b><div className="sub">{p.slug}</div></div>
            </div>
            <div className="sub">Stock: {p.stock} · Price: ${(p.price_cents/100).toFixed(2)} {p.period_text}</div>
            <div style={{display:"flex", gap:8, marginTop:8, flexWrap:"wrap"}}>
              <button className="btn" onClick={()=>update(p.slug,{stock:p.stock+1})}>+1 Stock</button>
              <button className="btn" onClick={()=>update(p.slug,{stock:Math.max(p.stock-1,0)})}>-1 Stock</button>
              <button className="btn" onClick={()=>update(p.slug,{active:!p.active})}>{p.active?"Deactivate":"Activate"}</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
