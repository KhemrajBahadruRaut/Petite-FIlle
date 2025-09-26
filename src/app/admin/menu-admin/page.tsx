"use client";
import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", price: "", description: "", image: "" });

  // Fetch items
  const fetchItems = async () => {
    const res = await fetch("http://localhost/php-backend/menu_api.php");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add item
  const addItem = async () => {
    await fetch("http://localhost/php-backend/menu_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", price: "", description: "", image: "" });
    fetchItems();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">🍽 Admin Panel – Manage Menu</h1>

      {/* Add Item Form */}
      <div className="mb-10 border p-4 rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mr-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          className="border p-2 mr-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 mr-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mr-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Items List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">
                <img src={item.image} alt={item.title} width={60} />
              </td>
              <td className="border px-4 py-2">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
