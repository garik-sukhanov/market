export default function ProductsListPage() {
  return (
    <section id="center">
      <h1>Товары</h1>
      <form id="search-form">
        <input type="text" placeholder="Введите поисковый запрос" />
      </form>
      <div>
        <h2>Все позиции</h2>
        <ul id="product-list">
          <li>
            <img src="https://via.placeholder.com/150" alt="Товар 1" />
            <h3>Товар 1</h3>
            <p>Описание товара 1</p>
            <span>Цена: 1000 руб.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
