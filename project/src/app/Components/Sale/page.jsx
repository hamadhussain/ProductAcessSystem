"use client";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";

const Sales = () => {
  const [sales, setSales] = useState(() => {
    const storedSales = Object.keys(localStorage)
      .filter(key => key.startsWith('sale_'))
      .map(key => JSON.parse(localStorage.getItem(key)));
    return storedSales;
  });
  
  const [ref, setRef] = useState("");
  const [cus, setCus] = useState("");
  const [sel, setSel] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setProducts(storedProducts);
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    const calculatedTotal = sel.reduce(
      (acc, product) => acc + product.retailPrice * quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [sel, quantity]);

  const Add = (product) => {
    if (product) {
      setSel((prev) => [...prev, product]);
    }
  };

  const Delete = (reference) => {
    localStorage.removeItem(`sale_${reference}`);
    setSales((prevSales) => prevSales.filter((sale) => sale.reference !== reference));
  };

  const Submit = (e) => {
    e.preventDefault();
    const newSale = {
      reference: ref,
      customer: cus,
      products: sel,
      quantity,
      total,
    };
    localStorage.setItem(`sale_${ref}`, JSON.stringify(newSale));
    setSales((prevSales) => [...prevSales, newSale]);
    Reset();
  };

  const Reset = () => {
    setRef("");
    setCus("");
    setSel([]);
    setQuantity(1);
    setTotal(0);
  };

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <div className="rounded-xl shadow-2xl flex justify-center items-center h-[70vh] w-fit">
        <form
          onSubmit={Submit}
          className="bg-white form p-6 rounded-l flex flex-col gap-6 justify-center"
        >
          <input
            type="text"
            placeholder="Reference"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            required
            className="input mb-4"
          />
          <select
            value={cus}
            onChange={(e) => setCus(e.target.value)}
            required
            className="input mb-4"
          >
            <option value="" disabled>
              Select Customer
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) =>
              Add(products.find((p) => p.name === e.target.value))
            }
            required
            className="input mb-4"
          >
            <option value="" disabled>
              Select Product
            </option>
            {products.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            required
            className="input mb-4"
          />
          <button
            type="submit"
            className="btn bg-purple-300 hover:bg-purple-400"
          >
            Create
          </button>
        </form>
        <div className="text-white hidden sm:flex text-7xl gap-5 uppercase bg-purple-300 rounded-xl w-72 h-full flex-col items-center justify-center">
          Sales <FcSalesPerformance />
        </div>
      </div>

      <ul className="my-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sales.map((sale, i) => (
          <li
            key={i}
            className="flex justify-between items-center p-4 rounded shadow"
          >
            <span>
              {sale.customer} - Total: $
              {sale.total.toFixed(2)}
            </span>
            <button
              onClick={() => Delete(sale.reference)}
              className="text-red-500 hover:underline"
            >
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sales;
