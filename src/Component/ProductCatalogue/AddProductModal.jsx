import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const AddProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  productData,
}) => {
  const fileInputRef = useRef(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    family: "",
    subFamily: "",
    image: null,
    width: "",
    height: "",
    length: "",
    material1: "",
    material2: "",
    material3: "",
    material4: "",
    colour1: "",
    colour2: "",
    colour3: "",
    price: "",
    discount: "",
    supplier: "",
    status: true,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const families = ["Furniture", "Electronics", "Apparel"];
  const subFamilies = {
    Furniture: ["Seating", "Tables", "Storage", "Beds"],
    Electronics: ["Computers", "Phones", "TVs", "Audio"],
    Apparel: ["Shirts", "Pants", "Accessories", "Shoes"],
  };

  const materials = ["Wood", "Metal", "Glass", "Plastic"];
  const colours = ["Red", "Blue", "Green", "Black", "White"];

  useEffect(() => {
    if (isEditing && productData) {
      setNewProduct({
        ...productData,
        status: productData.status ?? true,
      });
      if (productData.image) {
        setImagePreview(productData.image);
      }
    }
  }, [isEditing, productData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(newProduct);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  // Reusable InputField Component with Dark Theme
  const InputField = ({
    label,
    id,
    name,
    value,
    onChange,
    type = "text",
    required = false,
    placeholder = "",
  }) => (
    <div className="group w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2 group-hover:text-blue-400 transition-colors duration-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 
                     transition-all duration-300 ease-in-out
                     focus:bg-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                     hover:border-blue-400"
          required={required}
        />
      </div>
    </div>
  );

  // Reusable SelectField Component with Dark Theme
  const SelectField = ({
    label,
    id,
    name,
    value,
    onChange,
    options,
    required = false,
  }) => (
    <div className="group w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2 group-hover:text-blue-400 transition-colors duration-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white 
                     transition-all duration-300 ease-in-out
                     focus:bg-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                     hover:border-blue-400"
          required={required}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  // Reusable CheckboxField Component with Dark Theme
  const CheckboxField = ({ label, id, name, checked, onChange }) => (
    <div className="flex items-center group">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-500 bg-slate-700 border-slate-500 rounded focus:ring-blue-500/20"
      />
      <label
        htmlFor={id}
        className="ml-2 block text-sm text-slate-300 group-hover:text-blue-400 transition-colors duration-200"
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 custom-scrollbar">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-800 rounded-2xl w-full max-w-6xl mx-4 overflow-hidden shadow-2xl custom-scrollbar"
      >
        {/* Header */}
        <div className="bg-slate-900 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? "Update Product" : "Create Product"}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </motion.button>
          </div>
        </div>

        {/* Form Container */}
        <div className="overflow-y-auto max-h-[80vh] p-6 bg-slate-800 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  label="Product Name"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product name"
                />
                <InputField
                  label="SKU"
                  id="sku"
                  name="sku"
                  value={newProduct.sku}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter SKU"
                />
                <SelectField
                  label="Product Family"
                  id="family"
                  name="family"
                  value={newProduct.family}
                  onChange={handleInputChange}
                  options={families}
                  required
                />
                {newProduct.family && (
                  <SelectField
                    label="Sub Family"
                    id="subFamily"
                    name="subFamily"
                    value={newProduct.subFamily}
                    onChange={handleInputChange}
                    options={subFamilies[newProduct.family] || []}
                    required
                  />
                )}
              </div>
            </div>

            {/* Dimensions Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Dimensions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  label="Width (cm)"
                  id="width"
                  name="width"
                  value={newProduct.width}
                  onChange={handleInputChange}
                  type="number"
                  required
                  placeholder="Enter width"
                />
                <InputField
                  label="Height (cm)"
                  id="height"
                  name="height"
                  value={newProduct.height}
                  onChange={handleInputChange}
                  type="number"
                  required
                  placeholder="Enter height"
                />
                <InputField
                  label="Length (cm)"
                  id="length"
                  name="length"
                  value={newProduct.length}
                  onChange={handleInputChange}
                  type="number"
                  required
                  placeholder="Enter length"
                />
              </div>
            </div>

            {/* Materials Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Materials & Colors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <SelectField
                  label="Primary Material"
                  id="material1"
                  name="material1"
                  value={newProduct.material1}
                  onChange={handleInputChange}
                  options={materials}
                  required
                />

                <SelectField
                  label="Primary Color"
                  id="colour1"
                  name="colour1"
                  value={newProduct.colour1}
                  onChange={handleInputChange}
                  options={colours}
                  required
                />
              </div>
            </div>

            {/* Pricing Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Pricing Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  label="Price"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  type="number"
                  required
                  placeholder="Enter price"
                />
                <InputField
                  label="Discount (%)"
                  id="discount"
                  name="discount"
                  value={newProduct.discount}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Enter discount"
                />
                <InputField
                  label="Supplier"
                  id="supplier"
                  name="supplier"
                  value={newProduct.supplier}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter supplier"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Product Image
              </h3>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-32 h-32 bg-slate-700 rounded-xl overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      No image
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    Upload Image
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Status
              </h3>
              <div className="flex gap-6">
                <CheckboxField
                  label="Active"
                  id="status"
                  name="status"
                  checked={newProduct.status}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                type="button"
                className="px-6 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                {isEditing ? "Update Product" : "Add Product"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProductModal;
