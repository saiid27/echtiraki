// src/components/ProductCard.jsx
export default function ProductCard({ item, onSelect }) {
  return (
    <div className="card">
      <div className="card-title">{item.name}</div>
      <div className="card-sub">{item.duration}</div>
      <div className="card-price">{item.price.toFixed(2)} MRU</div>
      <button onClick={() => onSelect(item)} className="btn">اختيار</button>
    </div>
  );
}
