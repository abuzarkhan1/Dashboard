import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const AddSupplierModal = ({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  supplierData,
}) => {
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    businessRegistrationNumber: "",
    primaryContactName: "",
    primaryContactPosition: "",
    secondaryContactNumber: "",
    websiteUrl: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    stateProvince: "",
    country: "",
    paymentTerms: "",
    assemblyServices: false,
    deliveryTimeWeeks: "",
    taxNumber: "",
    supplierDiscount: "",
    status: true,
  });

  useEffect(() => {
    if (isEditing && supplierData) {
      setNewSupplier({
        ...supplierData,
        assemblyServices: supplierData.assemblyServices || false,
        status: supplierData.status ?? true,
      });
    } else {
      setNewSupplier({
        name: "",
        email: "",
        phoneNumber: "",
        businessRegistrationNumber: "",
        primaryContactName: "",
        primaryContactPosition: "",
        secondaryContactNumber: "",
        websiteUrl: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        stateProvince: "",
        country: "",
        paymentTerms: "",
        assemblyServices: false,
        deliveryTimeWeeks: "",
        taxNumber: "",
        supplierDiscount: "",
        status: true,
      });
    }
  }, [isEditing, supplierData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSupplier((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(newSupplier);
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

  // Reusable TextAreaField Component with Dark Theme
  const TextAreaField = ({
    label,
    id,
    name,
    value,
    onChange,
    required = false,
    placeholder = "",
  }) => (
    <div className="group w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2 group-hover:text-blue-400 transition-colors duration-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
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
        ></textarea>
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
              {isEditing ? "Update Supplier" : "Create Supplier"}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-full transition-colors custom-scrollbar"
              aria-label="Close Modal"
            >
              <X size={24} />
            </motion.button>
          </div>
        </div>

        {/* Form Container */}
        <div className="overflow-y-auto max-h-[80vh] p-6 bg-slate-800  custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Supplier Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Supplier Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  label="Name"
                  id="name"
                  name="name"
                  value={newSupplier.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter supplier name"
                />
                <InputField
                  label="Business Registration Number"
                  id="businessRegistrationNumber"
                  name="businessRegistrationNumber"
                  value={newSupplier.businessRegistrationNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter registration number"
                />
                <InputField
                  label="Tax Number"
                  id="taxNumber"
                  name="taxNumber"
                  value={newSupplier.taxNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter tax number"
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  label="Email"
                  id="email"
                  name="email"
                  value={newSupplier.email}
                  onChange={handleInputChange}
                  type="email"
                  required
                  placeholder="Enter email address"
                />
                <InputField
                  label="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={newSupplier.phoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                />
                <InputField
                  label="Secondary Contact Number"
                  id="secondaryContactNumber"
                  name="secondaryContactNumber"
                  value={newSupplier.secondaryContactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter secondary contact"
                />
                <InputField
                  label="Primary Contact Name"
                  id="primaryContactName"
                  name="primaryContactName"
                  value={newSupplier.primaryContactName}
                  onChange={handleInputChange}
                  placeholder="Enter primary contact name"
                />
                <InputField
                  label="Primary Contact Position"
                  id="primaryContactPosition"
                  name="primaryContactPosition"
                  value={newSupplier.primaryContactPosition}
                  onChange={handleInputChange}
                  placeholder="Enter contact position"
                />
              </div>
            </div>

            {/* Address Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Address Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  label="Street Address 1"
                  id="streetAddress1"
                  name="streetAddress1"
                  value={newSupplier.streetAddress1}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter street address"
                />
                <InputField
                  label="Street Address 2"
                  id="streetAddress2"
                  name="streetAddress2"
                  value={newSupplier.streetAddress2}
                  onChange={handleInputChange}
                  placeholder="Enter additional address"
                />
                <InputField
                  label="City"
                  id="city"
                  name="city"
                  value={newSupplier.city}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter city"
                />
                <InputField
                  label="State/Province"
                  id="stateProvince"
                  name="stateProvince"
                  value={newSupplier.stateProvince}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter state/province"
                />
                <InputField
                  label="Country"
                  id="country"
                  name="country"
                  value={newSupplier.country}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter country"
                />
              </div>
            </div>

            {/* Payment Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Payment Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  label="Payment Terms"
                  id="paymentTerms"
                  name="paymentTerms"
                  value={newSupplier.paymentTerms}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter payment terms"
                />
                <InputField
                  label="Supplier Discount (%)"
                  id="supplierDiscount"
                  name="supplierDiscount"
                  value={newSupplier.supplierDiscount}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Enter discount percentage"
                />
                <InputField
                  label="Delivery Time (weeks)"
                  id="deliveryTimeWeeks"
                  name="deliveryTimeWeeks"
                  value={newSupplier.deliveryTimeWeeks}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Enter delivery time"
                />
              </div>
            </div>

            {/* Other Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                Other Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  label="Website URL"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={newSupplier.websiteUrl}
                  onChange={handleInputChange}
                  type="url"
                  placeholder="Enter website URL"
                />
                <div className="flex gap-6 items-center mt-8">
                  <CheckboxField
                    label="Assembly Service"
                    id="assemblyServices"
                    name="assemblyServices"
                    checked={newSupplier.assemblyServices}
                    onChange={handleInputChange}
                  />
                  <CheckboxField
                    label="Active"
                    id="status"
                    name="status"
                    checked={newSupplier.status}
                    onChange={handleInputChange}
                  />
                </div>
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
                {isEditing ? "Update Supplier" : "Add Supplier"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddSupplierModal;