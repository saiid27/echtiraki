import Link from 'next/link';
import Nav from '../components/Nav';

export default function Home(){
  return (
    <>
      <Nav />
      <main style={{maxWidth:900, margin:'32px auto', padding:16}}>
        <h1>مرحبًا في <span style={{color:'#0a7'}}>echtiraki</span></h1>
        <p>اشترك في خطط عائلية مشتركة بسعر أوفر.</p>
        <Link href="/products" style={{
          display:'inline-block',
          padding:'10px 16px',
          border:'1px solid #ddd',
          borderRadius:8,
          marginTop:16
        }}>تصفّح المنتجات →</Link>
      </main>
    </>
  );
}
