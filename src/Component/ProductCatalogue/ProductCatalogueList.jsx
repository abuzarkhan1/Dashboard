import React, { useState } from "react";
import { Search, Filter, ChevronDown, Eye, Edit, Trash2, Download, Package, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddProductModal from "./AddProductModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";

const ProductCatalogueList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: 1,
      date: "11/11/2022",
      name: "Modern Sofa",
      sku: "SOF-001",
      family: "Living Room",
      subFamily: "Seating",
      price: 999.99,
      supplier: "FurnitureCo",
      status: "In Stock",
    },
    {
      id: 2,
      date: "11/12/2022",
      name: "Classic Armchair",
      sku: "CHA-002",
      family: "Living Room",
      subFamily: "Seating",
      price: 499.99,
      supplier: "FurnitureCo",
      status: "Low Stock",
    },
    {
      id: 3,
      date: "11/13/2022",
      name: "Wooden Dining Table",
      sku: "TAB-003",
      family: "Dining Room",
      subFamily: "Tables",
      price: 799.99,
      supplier: "HomeDecors",
      status: "Out Of Stock",
    },
  ]);

  const handleCreateOrUpdateProduct = (productData) => {
    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? { ...productData, id: product.id, date: product.date }
            : product
        )
      );
      setEditingProduct(null);
    } else {
      setProducts([
        ...products,
        {
          ...productData,
          id: products.length + 1,
          date: new Date().toLocaleDateString(),
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleViewClick = (product) => {
    navigate("/product-details", { state: product });
  };

  const handleExcelDownload = () => {
    setIsDownloadDropdownOpen(false);
    alert("Excel download functionality not implemented.");
  };

  const handleCSVDownload = () => {
    setIsDownloadDropdownOpen(false);
    const csvContent = [
      ["Date", "Name", "SKU", "Family", "Sub Family", "Price", "Supplier", "Status"],
      ...products.map((product) => [
        product.date,
        product.name,
        product.sku,
        product.family,
        product.subFamily,
        product.price,
        product.supplier,
        product.status,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Package className="mr-2 text-blue-400" size={24} />
            Product List
          </h1>
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name"
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white 
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                         focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            </div>

            {/* Filter Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by family"
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white 
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                         focus:border-blue-500"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            </div>

            {/* Download Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
                className="flex items-center bg-slate-700 text-white px-4 py-2 rounded-xl 
                         hover:bg-slate-600 transition-colors duration-300 space-x-2"
              >
                <Download size={20} />
                <span>Download</span>
                <ChevronDown size={16} />
              </motion.button>

              <AnimatePresence>
                {isDownloadDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-slate-800 
                             ring-1 ring-slate-700 z-50"
                  >
                    <div className="py-1">
                      <button
                        onClick={handleExcelDownload}
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 
                                 w-full text-left transition-colors duration-150"
                      >
                        Download Excel
                      </button>
                      <button
                        onClick={handleCSVDownload}
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 
                                 w-full text-left transition-colors duration-150"
                      >
                        Download CSV
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Add Product Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 
                       transition-colors duration-300 flex items-center space-x-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={20} />
              <span>Add New Product</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50 text-left">
                <th className="p-4 font-semibold text-slate-300">
                  <div className="flex items-center space-x-1 hover:text-blue-400 transition-colors cursor-pointer">
                    <span>Product Name</span>
                    <ChevronDown size={16} />
                  </div>
                </th>
                <th className="p-4 font-semibold text-slate-300">SKU</th>
                <th className="p-4 font-semibold text-slate-300">Family</th>
                <th className="p-4 font-semibold text-slate-300">Sub Family</th>
                <th className="p-4 font-semibold text-slate-300">Price</th>
                <th className="p-4 font-semibold text-slate-300">Status</th>
                <th className="p-4 font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-slate-700 hover:bg-slate-700/30 transition-colors duration-150"
                >
                  <td className="p-4 text-slate-300">{product.name}</td>
                  <td className="p-4 text-slate-300">{product.sku}</td>
                  <td className="p-4 text-slate-300">{product.family}</td>
                  <td className="p-4 text-slate-300">{product.subFamily}</td>
                  <td className="p-4 text-slate-300">AED {product.price.toFixed(2)}</td>
                  <td className="p-4 text-slate-300">{product.status}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={() => handleViewClick(product)}
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        onClick={() => handleEditClick(product)}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-slate-400 text-sm">Showing 1-6 of 100</span>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg"
          >
            1
          </motion.button>
          {[2, 3, 4, 5].map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 
                       transition-colors duration-150"
            >
              {page}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleCreateOrUpdateProduct}
        isEditing={!!editingProduct}
        productData={editingProduct}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductCatalogueList;