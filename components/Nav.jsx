'use client';
import Link from 'next/link';

export default function Nav(){
  return (
    <nav style={{
      display:'flex',
      gap:12,
      alignItems:'center',
      padding:12,
      background:'#fff',
      borderBottom:'1px solid #eee',
      position:'sticky',
      top:0
    }}>
      <b style={{color:'#0a7'}}>echtiraki</b>
      <Link href="/">الرئيسية</Link>
      <Link href="/products">المنتجات</Link>
      <Link href="/admin">لوحة الإدارة</Link>
    </nav>
  );
}
