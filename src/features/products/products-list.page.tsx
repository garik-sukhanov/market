import { useProductsQuery } from "@/shared/hooks/products";

function ProductsListPage() {
  const { data } = useProductsQuery();
  const { products } = data || {};

  if (!products) {
    return null;
  }

  return (
    <section id="center">
      <h1>Товары</h1>
      <form id="search-form">
        <input type="text" placeholder="Введите поисковый запрос" />
      </form>
      <div>
        <h2>Все позиции</h2>
        <ul id="product-list">
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <span>Цена: {product.price} руб.</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const Component = ProductsListPage;
