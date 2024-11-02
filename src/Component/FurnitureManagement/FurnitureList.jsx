import React, { useState, useEffect } from "react";
import { Search, Filter, Eye, Edit, Trash2, Download, Plus } from "lucide-react";
import { motion } from "framer-motion";
import AddFurnitureModal from "./AddFurnitureModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import AddSubFamilyModal from "./AddSubFamilyModal";

const FurnitureList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [furnitureToDelete, setFurnitureToDelete] = useState(null);
  const [isSubFamilyModalOpen, setIsSubFamilyModalOpen] = useState(false);
  const [subFamilyList, setSubFamilyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [size] = useState(10);

  const [furnitureList, setFurnitureList] = useState([
    {
      id: 1,
      date: "11/11/2022",
      name: "Leather Sofa",
      category: "Living Room",
      subFamily: "Seating",
      description: "Comfortable 3-seater leather sofa",
    },
    {
      id: 2,
      date: "15/12/2022",
      name: "Dining Table Set",
      category: "Dining Room",
      subFamily: "Tables",
      description: "Wooden dining table with six matching chairs",
    },
    {
      id: 3,
      date: "05/01/2023",
      name: "Ergonomic Office Chair",
      category: "Office",
      subFamily: "Seating",
      description: "Adjustable ergonomic chair with lumbar support",
    },
    {
      id: 4,
      date: "20/02/2023",
      name: "Queen Size Bed Frame",
      category: "Bedroom",
      subFamily: "Beds",
      description: "Modern queen-sized bed frame with storage drawers",
    },
    {
      id: 5,
      date: "10/03/2023",
      name: "Bookshelf Unit",
      category: "Office",
      subFamily: "Storage",
      description: "5-tier wooden bookshelf for office or home use",
    },
  ]);

  const [filteredFurniture, setFilteredFurniture] = useState(furnitureList);

  useEffect(() => {
    const filtered = furnitureList.filter(furniture => {
      const searchMatch = searchTerm.toLowerCase().split(' ').every(term =>
        furniture.name.toLowerCase().includes(term) ||
        furniture.category.toLowerCase().includes(term)
      );
      
      const filterMatch = !filterTerm || filterTerm.toLowerCase().split(' ').every(term =>
        furniture.subFamily.toLowerCase().includes(term) ||
        furniture.description.toLowerCase().includes(term)
      );

      return searchMatch && filterMatch;
    });
    
    setFilteredFurniture(filtered);
  }, [furnitureList, searchTerm, filterTerm]);

  const handleCreateFurniture = (newFurniture) => {
    const newId = furnitureList.length > 0
      ? Math.max(...furnitureList.map((f) => f.id)) + 1
      : 1;
    const updatedList = [
      ...furnitureList,
      {
        ...newFurniture,
        id: newId,
        date: new Date().toLocaleDateString(),
      },
    ];
    setFurnitureList(updatedList);
    setIsModalOpen(false);
  };

  const handleDeleteClick = (furniture) => {
    setFurnitureToDelete(furniture);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (furnitureToDelete) {
      setFurnitureList(furnitureList.filter((f) => f.id !== furnitureToDelete.id));
      setIsDeleteModalOpen(false);
      setFurnitureToDelete(null);
    }
  };

  const handleCreateSubFamily = (newSubFamily) => {
    setSubFamilyList([...subFamilyList, newSubFamily]);
    setIsSubFamilyModalOpen(false);
  };

  const handleExcelDownload = () => {
    // Excel download logic here
    console.log("Downloading excel...");
  };

  const paginatedFurniture = filteredFurniture.slice(
    pageNumber * size,
    (pageNumber + 1) * size
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Furniture List</h1>
          
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
                  placeholder="Filter by sub family..."
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
                className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors"
                onClick={() => setIsSubFamilyModalOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Sub Family
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Furniture
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
                <th className="p-4 text-left text-slate-300 font-semibold">Name</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Category</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Sub Family</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Description</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFurniture.map((furniture) => (
                <tr 
                  key={furniture.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{furniture.name}</div>
                    <div className="text-slate-400 text-sm">{furniture.date}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{furniture.category}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{furniture.subFamily}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-400">{furniture.description}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500"
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-400"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400"
                        onClick={() => handleDeleteClick(furniture)}
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
          Showing {pageNumber * size + 1} to {Math.min((pageNumber + 1) * size, filteredFurniture.length)} of {filteredFurniture.length} entries
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
            disabled={(pageNumber + 1) * size >= filteredFurniture.length}
          >
            Next
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <AddFurnitureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateFurniture}
      />
      <AddSubFamilyModal
        isOpen={isSubFamilyModalOpen}
        onClose={() => setIsSubFamilyModalOpen(false)}
        onSubmit={handleCreateSubFamily}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        furnitureToDelete={furnitureToDelete}
      />
    </div>
  );
};

export default FurnitureList;