// src/pages/users/UserProductsPage.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetProductsByUserQuery } from "../../features/api/productApi";
import { IoMdArrowRoundBack } from "react-icons/io";

const ProductCard = ({ p }) => (
  <div className="p-4 transition bg-white border shadow-sm rounded-xl hover:shadow-md">
    <div className="aspect-[4/3] w-full bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
      {p?.images?.[0] ? (
        <img
          src={p.images[0]}
          alt={p?.name || "Product"}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      ) : (
        <span className="text-sm text-gray-400">No Image</span>
      )}
    </div>
    <h3 className="font-semibold text-[#101749] line-clamp-2">
      {p?.name || "Unnamed product"}
    </h3>
    <div className="mt-1 text-sm text-gray-600 space-y-0.5">
      {p?.brand && <div>Brand: {p.brand}</div>}
      {p?.category?.name && <div>Category: {p.category.name}</div>}
    </div>
    <div className="mt-2 font-semibold">
      {p?.price != null ? p.price : "Price N/A"}
    </div>
    {p?.isAvailable === false && (
      <div className="mt-1 inline-flex items-center px-2 py-0.5 text-xs rounded bg-red-50 text-red-700 border border-red-100">
        Unavailable
      </div>
    )}
  </div>
);

const UserProductsPage = () => {
  const { id: userId } = useParams(); // route: /users/:id/products
  const location = useLocation();
  const navigate = useNavigate();
  const userFromState = location.state?.user || null;

  const [searchTerm, setSearchTerm] = useState("");
  const [gender, setGender] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(24);

  const queryArgs = useMemo(() => {
    return {
      user: userId,
      searchTerm: searchTerm || undefined,
      gender: gender || undefined,
      isAvailable: isAvailable || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      page,
      limit,
    };
  }, [userId, searchTerm, gender, isAvailable, minPrice, maxPrice, page, limit]);

  const { data, isLoading, isFetching, error } = useGetProductsByUserQuery(
    queryArgs,
    { refetchOnMountOrArgChange: true }
  );

  const products = data?.data?.result || data?.result || data?.data || data || [];
  const total = data?.data?.total ?? data?.total ?? products?.length ?? 0;
  const totalPagesFromServer = data?.data?.totalPages ?? data?.totalPages;
  const serverHasPaging =
    Number.isFinite(total) && Number.isFinite(totalPagesFromServer);

  const clientTotalPages = Math.max(1, Math.ceil((products?.length || 0) / limit));
  const visible = useMemo(() => {
    if (serverHasPaging) return products;
    const start = (page - 1) * limit;
    return products.slice(start, start + limit);
  }, [products, page, limit, serverHasPaging]);

  const headerName = userFromState?.name || "User";
  const headerEmail = userFromState?.email || "";
  const headerPhone = userFromState?.phone || "";

  const totalPages = serverHasPaging ? totalPagesFromServer : clientTotalPages;

  return (
    <div className="px-4 py-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mt-20">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-[#101749] flex gap-x-2 items-center font-bold hover:underline"
          >
              <IoMdArrowRoundBack size={20} />
<span> Back</span>
          </button>
          <h1 className="mt-2 text-2xl font-semibold text-[#101749]">
            {headerName} — Products
          </h1>
          <div className="text-sm text-gray-600">
            {headerEmail && <span>{headerEmail}</span>}
            {headerEmail && headerPhone && <span className="mx-2">•</span>}
            {headerPhone && <span>{headerPhone}</span>}
            {!headerEmail && !headerPhone && <span>User ID: {userId}</span>}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {isFetching ? "Refreshing…" : Number.isFinite(total) ? `${total} item(s)` : ""}
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
        />
        <select
          value={gender}
          onChange={(e) => {
            setPage(1);
            setGender(e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Gender (any)</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
          <option value="Men">Men</option>
        </select>
        <select
          value={isAvailable}
          onChange={(e) => {
            setPage(1);
            setIsAvailable(e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Availability (any)</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => {
              setPage(1);
              setMinPrice(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            min="0"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => {
              setPage(1);
              setMaxPrice(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {(isLoading || (isFetching && !products?.length)) && (
          <div className="py-10 text-center text-gray-500">Loading products…</div>
        )}

        {error && !isLoading && (
          <div className="py-10 text-center text-red-600">
            Failed to load products.
          </div>
        )}

        {!isLoading && !error && visible?.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No products found for this user.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible?.map((p) => (
            <ProductCard key={p._id || p.id} p={p} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 py-6">
            <button
              onClick={() => setPage((x) => Math.max(1, x - 1))}
              className="px-3 py-1 rounded-full hover:bg-gray-100 disabled:opacity-40"
              disabled={page === 1}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`px-3 py-1 rounded-full border ${
                  page === pg
                    ? "text-white bg-[#101749] border-[#101749]"
                    : "bg-transparent text-black border-transparent hover:bg-gray-100"
                }`}
              >
                {pg}
              </button>
            ))}
            <button
              onClick={() => setPage((x) => Math.min(totalPages, x + 1))}
              className="px-3 py-1 rounded-full hover:bg-gray-100 disabled:opacity-40"
              disabled={page === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProductsPage;
