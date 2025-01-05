import useApi from "../hook/useApi";
import { useState } from "react";
import useDebounce from "../hook/useDebounce";

export default function FechApi() {
  const { products } = useApi();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000)


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Product List
        </h2>
        <input
          type="text"
          placeholder="Search for a product..."
          className="mt-4 block w-full rounded-md border border-gray-300 p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <img
                src={product.image}
                alt={product.title}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
