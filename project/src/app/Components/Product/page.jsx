"use client";
import { useState, useEffect } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [edi, setEdi] = useState(null);
  const [name, setName] = useState("");
  const [desa, setDesa] = useState("");
  const [ret, setRet] = useState("");
  const [whole, setWhole] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const Submit = (e) => {
    e.preventDefault();
    const newProduct = { name, desa, ret, whole };
    const updatedProducts = edi
      ? products.map((p) => (p.name === edi.name ? newProduct : p))
      : [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    Reset();
  };

  const Reset = () => {
    setName("");
    setDesa("");
    setRet("");
    setWhole("");
    setEdi(null);
  };

  const Edit = (product) => {
    setName(product.name);
    setDesa(product.desa);
    setRet(product.ret);
    setWhole(product.whole);
    setEdi(product);
  };

  const Delete = (name) => {
    const updatedProducts = products.filter((p) => p.name !== name);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="p-6 flex justify-center flex-col items-center">
      <div className="rounded-xl shadow-2xl flex justify-center items-center h-[70vh] w-fit">
        <form
          onSubmit={Submit}
          className="bg-white form p-6 rounded-l flex flex-col gap-6 justify-center"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <textarea
            placeholder="Description"
            value={desa}
            onChange={(e) => setDesa(e.target.value)}
            required
            className="input"
          />
          <input
            type="number"
            placeholder="Retail Price"
            value={ret}
            onChange={(e) => setRet(e.target.value)}
            required
            className="input"
          />
          <input
            type="number"
            placeholder="Wholesale Price"
            value={whole}
            onChange={(e) => setWhole(e.target.value)}
            required
            className="input"
          />
          <button
            type="submit"
            className="btn bg-green-300 hover:bg-green-400"
          >
            Submit
          </button>
        </form>
        <div className="text-white hidden sm:flex text-4xl md:text-5xl lg:text-5xl gap-5 uppercase bg-green-400 rounded-xl w-72 h-full flex-col items-center justify-center p-4">
          Product <AiOutlineProduct />
        </div>
      </div>

      <ul className="my-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li
            key={product.name}
            className="flex flex-col justify-between items-center p-4"
          >
            <span>{product.name}</span>
            <div>
              <button
                onClick={() => Edit(product)}
                className="text-blue-500 hover:underline mr-2"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => Delete(product.name)}
                className="text-red-500 hover:underline"
              >
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
