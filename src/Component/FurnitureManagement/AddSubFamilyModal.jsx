import React, { useState, useEffect } from "react";
import { X, ChevronDown, FolderTree, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AddSubFamilyModal = ({ isOpen, onClose, onSubmit }) => {
  const [furnitureFamilyName, setFurnitureFamilyName] = useState("");
  const [subFamilyName, setSubFamilyName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Sample data for dropdowns
  const furnitureFamilies = ["Living Room", "Bedroom", "Dining Room"];
  const subFamilies = {
    "Living Room": ["Seating", "Tables", "Storage"],
    Bedroom: ["Beds", "Dressers", "Nightstands"],
    "Dining Room": ["Dining Tables", "Chairs", "Buffets"],
  };

  const [availableSubFamilies, setAvailableSubFamilies] = useState([]);

  useEffect(() => {
    if (furnitureFamilyName) {
      setAvailableSubFamilies(subFamilies[furnitureFamilyName]);
      setSubFamilyName("");
    } else {
      setAvailableSubFamilies([]);
      setSubFamilyName("");
    }
  }, [furnitureFamilyName]);

  useEffect(() => {
    if (!isOpen) {
      setFurnitureFamilyName("");
      setSubFamilyName("");
      setType("");
      setDescription("");
      setOpenDropdown(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newSubFamily = {
        furnitureFamilyName,
        subFamilyName,
        type,
        description,
      };
      await onSubmit(newSubFamily);
      toast.success("Sub Family added successfully!");
      setFurnitureFamilyName("");
      setSubFamilyName("");
      setType("");
      setDescription("");
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to add sub family.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('select')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  // Reusable InputField Component with Dark Theme
  const InputField = ({
    label,
    id,
    value,
    onChange,
    type = "text",
    required = false,
    as = "input",
    options = [],
    placeholder = "",
  }) => (
    <div className="group w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2 group-hover:text-blue-400 transition-colors duration-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {as === "textarea" ? (
          <textarea
            id={id}
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
          <div className="relative">
            <select
              id={id}
              value={value}
              onChange={onChange}
              onFocus={() => setOpenDropdown(id)}
              onBlur={() => setOpenDropdown(null)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white 
                       transition-all duration-300 ease-in-out
                       focus:bg-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                       hover:border-blue-400 appearance-none pr-10"
              required={required}
            >
              <option value="" className="bg-slate-700">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option} className="bg-slate-700">
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <motion.div
                animate={{ rotate: openDropdown === id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </motion.div>
            </div>
          </div>
        ) : (
          <input
            type={type}
            id={id}
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
                <h2 className="text-2xl font-bold text-white">Add Sub Family</h2>
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
                    <FolderTree className="mr-2 text-blue-400" size={24} />
                    Family Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField
                      label="Furniture Family Name"
                      id="furnitureFamilyName"
                      value={furnitureFamilyName}
                      onChange={(e) => setFurnitureFamilyName(e.target.value)}
                      as="select"
                      options={furnitureFamilies}
                      required
                    />
                    <InputField
                      label="Sub Family Name"
                      id="subFamilyName"
                      value={subFamilyName}
                      onChange={(e) => setSubFamilyName(e.target.value)}
                      placeholder="Enter Sub Family Name"
                      required
                    />
                    <InputField
                      label="Type"
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="Enter Type"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    as="textarea"
                    placeholder="Enter description..."
                    required
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
                    <span>{loading ? "Adding..." : "Add Sub Family"}</span>
                    <ChevronDown size={20} className="transform rotate-90" />
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

export default AddSubFamilyModal;