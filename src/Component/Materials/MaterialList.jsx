import  { useState, useEffect } from "react";
import { Search, Filter, Edit, Trash2, Download, Plus } from "lucide-react";
import { motion } from "framer-motion";
import AddEditMaterialModal from "./AddMaterialModal";
import DeleteMaterialModal from "./DeleteMaterialModal";
import { toast } from "react-toastify";

const MaterialsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const initialMaterials = [
    {
      id: 1,
      name: "Sofa",
      type: "Furniture",
      description: "Comfortable three-seater sofa.",
    },
    {
      id: 2,
      name: "Wallpaper",
      type: "Wall Covering",
      description: "Floral patterned wallpaper.",
    },
    {
      id: 3,
      name: "Curtain",
      type: "Window Treatment",
      description: "Blackout curtains for bedrooms.",
    },
    {
      id: 4,
      name: "Carpet",
      type: "Flooring",
      description: "Soft woolen carpet.",
    },
    {
      id: 5,
      name: "Lighting Fixture",
      type: "Lighting",
      description: "Modern chandelier.",
    },
  ];

  const [materials, setMaterials] = useState(initialMaterials);
  const [pageNumber, setPageNumber] = useState(0);
  const [size] = useState(10);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    let filtered = materials;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (material) =>
          material.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          material.type.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (filterTerm) {
      const lowerCaseFilterTerm = filterTerm.toLowerCase();
      filtered = filtered.filter(
        (material) =>
          material.description &&
          material.description.toLowerCase().includes(lowerCaseFilterTerm)
      );
    }

    setFilteredMaterials(filtered);
  }, [materials, searchTerm, filterTerm]);

  const handleCreateOrUpdateMaterial = (materialData) => {
    if (editingMaterial) {
      setMaterials(
        materials.map((material) =>
          material.id === editingMaterial.id
            ? { ...materialData, id: material.id }
            : material
        )
      );
      toast.success("Material updated successfully");
      setEditingMaterial(null);
      setIsModalOpen(false);
    } else {
      const newMaterial = {
        ...materialData,
        id: materials.length > 0 ? materials[materials.length - 1].id + 1 : 1,
      };
      setMaterials([...materials, newMaterial]);
      toast.success("Material created successfully");
      setIsModalOpen(false);
    }
  };

  const handleDeleteClick = (material) => {
    setMaterialToDelete(material);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (materialToDelete) {
      setMaterials(materials.filter((m) => m.id !== materialToDelete.id));
      setIsDeleteModalOpen(false);
      setMaterialToDelete(null);
      toast.success("Material deleted successfully");
    }
  };

  const handleEditClick = (materialId) => {
    const materialData = materials.find((m) => m.id === materialId);
    if (materialData) {
      setEditingMaterial(materialData);
      setIsModalOpen(true);
    } else {
      toast.error("Material not found");
    }
  };

  const handleExcelDownload = () => {
    const csvContent = [
      ["Name", "Type", "Description"],
      ...materials.map((material) => [
        material.name,
        material.type,
        material.description,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "materials.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedMaterials = filteredMaterials.slice(
    pageNumber * size,
    (pageNumber + 1) * size
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Materials List</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            {/* Search and Filter Section */}
            <div className="flex flex-1 gap-4">
              <motion.div 
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  placeholder="Search by name or type..."
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
                  placeholder="Filter by description..."
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
                onClick={() => {
                  setEditingMaterial(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Material
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
                <th className="p-4 text-left text-slate-300 font-semibold">Type</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Description</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMaterials.map((material) => (
                <tr 
                  key={material.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{material.name}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{material.type}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-400">{material.description}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-400"
                        onClick={() => handleEditClick(material.id)}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400"
                        onClick={() => handleDeleteClick(material)}
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
          Showing {pageNumber * size + 1} to {Math.min((pageNumber + 1) * size, filteredMaterials.length)} of {filteredMaterials.length} entries
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
            disabled={(pageNumber + 1) * size >= filteredMaterials.length}
          >
            Next
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <AddEditMaterialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMaterial(null);
        }}
        onSubmit={handleCreateOrUpdateMaterial}
        isEditing={!!editingMaterial}
        materialData={editingMaterial}
      />
      <DeleteMaterialModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        materialToDelete={materialToDelete}
      />
    </div>
  );
};

export default MaterialsList;