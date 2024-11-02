import React, { useState, useEffect, useRef } from "react";
import { X, ChevronRight, Sofa, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AddFurnitureModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subFamily: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        category: "",
        subFamily: "",
        description: "",
      });
    } else {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
      toast.success("Furniture added successfully!");
      setFormData({
        name: "",
        category: "",
        subFamily: "",
        description: "",
      });
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to add furniture.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

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
    as = "input",
    options = [],
    placeholder = "",
    inputRef = null,
  }) => (
    <div className="group w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2 group-hover:text-blue-400 transition-colors duration-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {as === "textarea" ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows="4"
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 
                     transition-all duration-300 ease-in-out
                     focus:bg-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                     hover:border-blue-400 resize-none"
            required={required}
          />
        ) : as === "select" ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white 
                     transition-all duration-300 ease-in-out
                     focus:bg-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                     hover:border-blue-400 appearance-none"
            required={required}
          >
            <option value="" className="bg-slate-700">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option} className="bg-slate-700">
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            ref={inputRef}
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
        )}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
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
                <h2 className="text-2xl font-bold text-white">Add Furniture</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-slate-400 hover:text-white p-2 rounded-full transition-colors"
                  aria-label="Close Modal"
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
                    <Sofa className="mr-2 text-blue-400" size={24} />
                    Furniture Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField
                      label="Furniture Name"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Leather Sofa"
                      inputRef={firstInputRef}
                    />
                    <InputField
                      label="Furniture Category"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      as="select"
                      options={["Living Room", "Bedroom", "Dining Room", "Office"]}
                      required
                    />
                    <InputField
                      label="Sub Family"
                      id="subFamily"
                      name="subFamily"
                      value={formData.subFamily}
                      onChange={handleChange}
                      as="select"
                      options={["Seating", "Tables", "Storage", "Beds"]}
                      required
                      className="sm:col-span-2"
                    />
                  </div>
                </div>

                {/* Description Section */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <FileText className="mr-2 text-blue-400" size={24} />
                    Description
                  </h3>
                  <InputField
                    label="Description"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    as="textarea"
                    placeholder="Enter furniture description..."
                  />
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
                    className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2"
                    disabled={loading}
                  >
                    <span>{loading ? "Adding..." : "Add Furniture"}</span>
                    <ChevronRight size={20} />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddFurnitureModal;