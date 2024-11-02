import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Lock,
  Unlock,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AddSupplierModal from "./AddSupplierModal";
import DeleteModal from "./DeleteModal";

const ShowSupplierRecord = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [size] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // Sample data
  const initialSuppliers = [
    {
      id: 1,
      name: "Hussan Raza",
      primaryContactName: "Hassan",
      phoneNumber: "203-975-9424",
      email: "hassan@gmail.com",
      websiteUrl: "https://www.abcsupplies.com",
      city: "Abu Dhabi",
      country: "UAE",
      state: "NY",
      status: true,
      taxNumber: "10010101",
      businessRegistrationNumber: "0001000110",
      paymentTerms: "Bank",
      deliveryTimeWeeks: "2",
      createdBy: 1
    },
    {
      id: 2,
      name: "Global Tech Solutions",
      primaryContactName: "Sara Ali",
      phoneNumber: "555-123-4567",
      email: "sara@globaltech.com",
      websiteUrl: "https://www.globaltech.com",
      city: "Dubai",
      country: "UAE",
      state: "Dubai",
      status: true,
      taxNumber: "20020202",
      businessRegistrationNumber: "0002000220",
      paymentTerms: "Credit Card",
      deliveryTimeWeeks: "3",
      createdBy: 1
    }
  ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  useEffect(() => {
    const filtered = suppliers.filter(supplier => {
      const searchMatch = searchTerm.toLowerCase().split(' ').every(term =>
        supplier.name.toLowerCase().includes(term) ||
        supplier.primaryContactName.toLowerCase().includes(term)
      );
      
      const filterMatch = !filterTerm || filterTerm.toLowerCase().split(' ').every(term =>
        supplier.city.toLowerCase().includes(term) ||
        supplier.country.toLowerCase().includes(term) ||
        supplier.state.toLowerCase().includes(term)
      );

      return searchMatch && filterMatch;
    });
    
    setFilteredSuppliers(filtered);
  }, [suppliers, searchTerm, filterTerm]);

  const handleAddSupplier = () => {
    setIsEditing(false);
    setSelectedSupplier(null);
    setIsModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setIsEditing(true);
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (supplierToDelete) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierToDelete.id));
      setIsDeleteModalOpen(false);
      setSupplierToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSupplierToDelete(null);
  };

  const handleViewSupplier = (supplier) => {
    navigate('/supplier-details', { state: { supplier } });
  };

  const handleSubmit = async (supplierData) => {
    try {
      if (isEditing) {
        setSuppliers(suppliers.map(supplier =>
          supplier.id === selectedSupplier.id
            ? { ...supplierData, id: supplier.id }
            : supplier
        ));
      } else {
        const newSupplier = {
          ...supplierData,
          id: suppliers.length + 1,
        };
        setSuppliers([...suppliers, newSupplier]);
      }
      setIsModalOpen(false);
      setSelectedSupplier(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting supplier:', error);
    }
  };

  const handleStatusToggle = (id) => {
    setSuppliers(suppliers.map(supplier =>
      supplier.id === id ? { ...supplier, status: !supplier.status } : supplier
    ));
  };

  const handleExcelDownload = () => {
    console.log("Downloading excel...");
  };

  const paginatedSuppliers = filteredSuppliers.slice(
    pageNumber * size,
    (pageNumber + 1) * size
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Suppliers Management</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            {/* Search and Filter Section */}
            <div className="flex flex-1 gap-4">
              <motion.div 
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              </motion.div>

              <motion.div 
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={filterTerm}
                  onChange={(e) => setFilterTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors"
                onClick={handleExcelDownload}
              >
                <Download className="w-5 h-5 mr-2" />
                Export
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                onClick={handleAddSupplier}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Supplier
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700">
                <th className="p-4 text-left text-slate-300 font-semibold">Supplier</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Contact</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Location</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Status</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSuppliers.map((supplier) => (
                <tr 
                  key={supplier.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{supplier.name}</div>
                    <div className="text-slate-400 text-sm">{supplier.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{supplier.primaryContactName}</div>
                    <div className="text-slate-400 text-sm">{supplier.phoneNumber}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{supplier.city}</div>
                    <div className="text-slate-400 text-sm">{`${supplier.state}, ${supplier.country}`}</div>
                  </td>
                  <td className="p-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleStatusToggle(supplier.id)}
                      className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                        supplier.status 
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-600/20 text-slate-400'
                      }`}
                    >
                      {supplier.status ? (
                        <>
                          <Unlock size={14} />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <Lock size={14} />
                          <span>Inactive</span>
                        </>
                      )}
                    </motion.button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500"
                        onClick={() => handleViewSupplier(supplier)}
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-400"
                        onClick={() => handleEditSupplier(supplier)}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400"
                        onClick={() => handleDeleteClick(supplier)}
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
      <div className="mt-6 flex justify-between items-center text-slate-400">
        <div>
          Showing {pageNumber * size + 1} to {Math.min((pageNumber + 1) * size, filteredSuppliers.length)} of {filteredSuppliers.length} entries
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
            onClick={() => setPageNumber(Math.max(0, pageNumber - 1))}
            disabled={pageNumber === 0}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={(pageNumber + 1) * size >= filteredSuppliers.length}
          >
            Next
          </motion.button>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      {/* Add/Edit Supplier Modal */}
      <AddSupplierModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSupplier(null);
          setIsEditing(false);
        }}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        supplierData={selectedSupplier}
      />
    </div>
  );
};

export default ShowSupplierRecord;