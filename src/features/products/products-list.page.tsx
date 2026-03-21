import { type ChangeEvent, useState } from "react";

import { Input, Pagination, Table } from "@/shared/components";
import { useProductsSearchQuery } from "@/shared/hooks/products";

const LIMIT = 10;

function ProductsListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useProductsSearchQuery({
    limit: LIMIT,
    skip: (currentPage - 1) * LIMIT,
    q: searchQuery,
  });

  const onChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const { products } = data || {};

  return (
    <section id="center">
      <h1>Товары</h1>
      <form id="search-form">
        <Input
          type="text"
          placeholder="Введите поисковый запрос"
          value={searchQuery}
          onChange={onChangeSearchQuery}
        />
      </form>
      <div>
        <h2>Все позиции</h2>
        <Table
          loading={isLoading}
          columns={[
            {
              title: "Наименование",
              dataIndex: "title",
              key: "title",
            },
            {
              title: "Вендор",
              dataIndex: "brand",
              key: "brand",
            },
            {
              title: "Артикул",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Оценка",
              dataIndex: "rating",
              key: "rating",
            },
            {
              title: "Цена",
              dataIndex: "price",
              key: "price",
            },
          ]}
          dataSource={products}
          rowKey={(record) => record.id}
        />
        <Pagination
          current={currentPage}
          pageSize={LIMIT}
          total={data?.total || 0}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
}

export const Component = ProductsListPage;
