'use client';
import { useEffect, useState } from 'react';

const Report = () => {
  const [rep, setRep] = useState({
    users: [],
    products: [],
    sales: [],
  });

  useEffect(() => {
    const Data = () => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const storedSales = JSON.parse(localStorage.getItem('sales')) || [];

      setRep({
        users: storedUsers,
        products: storedProducts,
        sales: storedSales,
      });
    };

    Data();
  }, []);

  return (
    <div className="p-24 h-screen flex justify-items flex-col">
      <h1 className="text-2xl font-bold mb-4">Your Report Data :</h1>

      <h2 className="text-lg font-bold mt-4 uppercase">Total Users: {rep.users.length}</h2>
      <ul className="list-decimal p-5">
        {rep.users.length > 0 ? (
          rep.users.map((u, i) => (
            <li key={i}>{JSON.stringify(u.name)}</li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
      <h2 className="text-lg font-bold mt-4 uppercase">Total Products: {rep.products.length}</h2>

      <ul className="list-decimal p-5">
        {rep.products.length > 0 ? (
          rep.products.map((p, i) => (
            <li key={i}>{JSON.stringify(p.name)}</li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
      <h2 className="text-lg font-bold mt-4 uppercase">Total Sales: {rep.sales.length}</h2>

      <ul className="list-decimal p-5">
        {rep.sales.length > 0 ? (
          rep.sales.map((s, i) => (
            <li key={i}>{JSON.stringify(s.customer)}: {JSON.stringify(s.total)}</li>
          ))
        ) : (
          <li>No sales found</li>
        )}
      </ul>
    </div>
  );
};

export default Report;
