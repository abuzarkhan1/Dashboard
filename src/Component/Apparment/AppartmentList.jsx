import React, { useState } from "react";
import { Search, Filter, Eye, Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AddApartmentModal from "./AddAppartmentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const AppartmentList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [apartmentToEdit, setApartmentToEdit] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [size] = useState(10);

  const [apartments, setApartments] = useState([
    {
      id: 101,
      date: "01/15/2023",
      name: "Ocean Breeze",
      type: "Apartment",
      category: "Premium",
      bedrooms: 3,
      floorAreaMin: 1200,
      floorAreaMax: 1500,
    },
    {
      id: 102,
      date: "02/20/2023",
      name: "Mountain Retreat",
      type: "Condo",
      category: "Luxury",
      bedrooms: 2,
      floorAreaMin: 900,
      floorAreaMax: 1100,
    },
    {
      id: 103,
      date: "03/10/2023",
      name: "City Lights",
      type: "Loft",
      category: "Modern",
      bedrooms: 1,
      floorAreaMin: 600,
      floorAreaMax: 800,
    },
    {
      id: 104,
      date: "04/05/2023",
      name: "Green Meadows",
      type: "PentHouse",
      category: "Family",
      bedrooms: 4,
      floorAreaMin: 1800,
      floorAreaMax: 2200,
    },
  ]);

  const handleCreateApartment = (newApartment) => {
    if (isEditMode && apartmentToEdit) {
      setApartments(
        apartments.map((a) =>
          a.id === apartmentToEdit.id
            ? { ...apartmentToEdit, ...newApartment }
            : a
        )
      );
    } else {
      setApartments([
        ...apartments,
        {
          ...newApartment,
          id: apartments.length + 1,
          date: new Date().toLocaleDateString(),
        },
      ]);
    }
    setIsModalOpen(false);
    setIsEditMode(false);
    setApartmentToEdit(null);
  };

  const handleDeleteClick = (apartment) => {
    setApartmentToDelete(apartment);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (apartmentToDelete) {
      setApartments(apartments.filter((a) => a.id !== apartmentToDelete.id));
      setIsDeleteModalOpen(false);
      setApartmentToDelete(null);
    }
  };

  const handleEditClick = (apartment) => {
    setApartmentToEdit(apartment);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewClick = () => {
    navigate("/apartment-details");
  };

  const paginatedApartments = apartments.slice(
    pageNumber * size,
    (pageNumber + 1) * size
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Apartment Types</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            {/* Search and Filter Section */}
            <div className="flex flex-1 gap-4">
              <motion.div 
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  placeholder="Search by name..."
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
                  placeholder="Filter by type..."
                  value={filterTerm}
                  onChange={(e) => setFilterTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              </motion.div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Apartment
            </motion.button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700">
                <th className="p-4 text-left text-slate-300 font-semibold">Apartment Type Name</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Category</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Bedrooms</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Floor Area (sqft)</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedApartments.map((apartment) => (
                <tr 
                  key={apartment.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{apartment.name}</div>
                    <div className="text-slate-400 text-sm">{apartment.type}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{apartment.category}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{apartment.bedrooms}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {apartment.floorAreaMin} - {apartment.floorAreaMax}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500"
                        onClick={handleViewClick}
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-400"
                        onClick={() => handleEditClick(apartment)}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400"
                        onClick={() => handleDeleteClick(apartment)}
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
          Showing {pageNumber * size + 1} to {Math.min((pageNumber + 1) * size, apartments.length)} of {apartments.length} entries
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
            disabled={(pageNumber + 1) * size >= apartments.length}
          >
            Next
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <AddApartmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setApartmentToEdit(null);
        }}
        onSubmit={handleCreateApartment}
        isEditMode={isEditMode}
        apartment={apartmentToEdit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AppartmentList;