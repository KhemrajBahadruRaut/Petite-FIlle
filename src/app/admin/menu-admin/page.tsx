"use client";
import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Trash2, Plus, Utensils } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "warning";
}

interface MenuForm {
  name: string;
  price: string;
  description: string;
  image: File | null;
  category: string;
}

const categories = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "pastry", label: "Pastry" },
  { value: "coffee", label: "Coffee" },
  { value: "sides", label: "Sides" }
];

const ToastNotification = ({ 
  toast, 
  onClose 
}: { 
  toast: Toast; 
  onClose: () => void 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600" />,
  };

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border ${colors[toast.type]} shadow-sm mb-3 transition-all duration-300 ease-in-out`}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const InputField = ({ 
  label, 
  required, 
  children 
}: { 
  label: string; 
  required?: boolean; 
  children: React.ReactNode 
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<MenuForm>({
    name: "",
    price: "",
    description: "",
    image: null,
    category: "breakfast",
  });

  const addToast = (message: string, type: "success" | "error" | "warning") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost/petite-backend/menu/get_menu_items.php");
      if (!res.ok) throw new Error("Failed to fetch menu items");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
      addToast("Failed to fetch menu items", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      addToast("Item name is required", "warning");
      return false;
    }
    if (!form.price || isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0) {
      addToast("Valid price is required", "warning");
      return false;
    }
    return true;
  };

  const addItem = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/petite-backend/menu/add_item.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        addToast(`${form.name} added successfully`, "success");
        setForm({ 
          name: "", 
          price: "", 
          description: "", 
          image: null, 
          category: "breakfast" 
        });
        fetchItems();
      } else {
        throw new Error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      addToast("Error adding item. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: number, itemName: string) => {
    if (!confirm(`Are you sure you want to delete "${itemName}"?`)) return;

    try {
      const response = await fetch(
        `http://localhost/petite-backend/menu/delete_item.php?id=${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        addToast(`${itemName} deleted successfully`, "success");
        fetchItems();
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      addToast("Error deleting item. Please try again.", "error");
    }
  };

  const mainItems = items.filter((item) => item.category !== "sides");
  const sideItems = items.filter((item) => item.category === "sides");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Toast Container */}
      <div className="fixed top-6 right-6 z-50 w-96 max-w-full">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Utensils className="w-6 h-6 text-amber-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        </div>
        <p className="text-gray-600">Manage your restaurant menu items and categories</p>
      </div>

      {/* Add Item Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 text-gray-500">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Add New Menu Item</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <InputField label="Item Name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="Enter item name"
            />
          </InputField>

          <InputField label="Price" required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="0.00"
              />
            </div>
          </InputField>

          <InputField label="Category" required>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </InputField>

          {form.category !== "sides" && (
            <InputField label="Image">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
            </InputField>
          )}
        </div>

        {form.category !== "sides" && (
          <InputField label="Description">
            <textarea
              placeholder="Enter item description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
            />
          </InputField>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={addItem}
            disabled={isLoading}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            {isLoading ? "Adding..." : "Add Item"}
          </button>
        </div>
      </div>

      {/* Main Menu Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Main Menu Items</h2>
          <p className="text-sm text-gray-600 mt-1">Manage breakfast, lunch, pastry, and coffee items</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mainItems.length > 0 ? (
                mainItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={`http://localhost/petite-backend/menu/uploads/${item.image}`}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">ID: {item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 capitalize">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      ${parseFloat(item.price.toString()).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs">
                      {item.description || (
                        <span className="text-gray-400 italic">No description</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => deleteItem(item.id, item.name)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors duration-200 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {isLoading ? (
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
                      </div>
                    ) : (
                      "No menu items found"
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sides Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sides & Add-ons</h2>
          <p className="text-sm text-gray-600 mt-1">Manage side dishes and additional items</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sideItems.length > 0 ? (
                sideItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">ID: {item.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      ${parseFloat(item.price.toString()).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteItem(item.id, item.name)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors duration-200 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    {isLoading ? (
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
                      </div>
                    ) : (
                      "No sides found"
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}