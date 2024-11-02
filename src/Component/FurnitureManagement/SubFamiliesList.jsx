import React, { useState } from "react";
import { ChevronDown, Eye, Edit, Trash2, Plus, FolderTree } from "lucide-react";
import { motion } from "framer-motion";
import AddSubFamilyModal from "./AddSubFamilyModal";

const FurnitureSubFamilyList = () => {
  const [isSubFamilyModalOpen, setIsSubFamilyModalOpen] = useState(false);
  const [subFamilyList, setSubFamilyList] = useState([
    {
      familyName: "Living Room",
      subFamilyName: "Seating",
      type: "Sofa",
      description: "Comfortable and stylish seating",
    },
    {
      familyName: "Bedroom",
      subFamilyName: "Storage",
      type: "Wardrobe",
      description: "Spacious wardrobe with sliding doors",
    },
  ]);

  const handleCreateSubFamily = (newSubFamily) => {
    setSubFamilyList([...subFamilyList, newSubFamily]);
    setIsSubFamilyModalOpen(false);
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <FolderTree className="mr-2 text-blue-400" size={24} />
            Furniture Sub-Family
          </h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 
                     transition-colors duration-300 shadow-md flex items-center space-x-2"
            onClick={() => setIsSubFamilyModalOpen(true)}
          >
            <Plus size={20} />
            <span>Add Sub Family</span>
          </motion.button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50 text-left">
                <th className="p-4 font-semibold text-slate-300">
                  <div className="flex items-center space-x-1 hover:text-blue-400 transition-colors cursor-pointer">
                    <span>Family Name</span>
                    <ChevronDown size={16} />
                  </div>
                </th>
                <th className="p-4 font-semibold text-slate-300">
                  <div className="flex items-center space-x-1 hover:text-blue-400 transition-colors cursor-pointer">
                    <span>Sub Family Name</span>
                    <ChevronDown size={16} />
                  </div>
                </th>
                <th className="p-4 font-semibold text-slate-300">
                  <div className="flex items-center space-x-1 hover:text-blue-400 transition-colors cursor-pointer">
                    <span>Type</span>
                    <ChevronDown size={16} />
                  </div>
                </th>
                <th className="p-4 font-semibold text-slate-300">Description</th>
                <th className="p-4 font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {subFamilyList.map((subFamily, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-700 hover:bg-slate-700/30 transition-colors duration-150"
                >
                  <td className="p-4 text-slate-300">{subFamily.familyName}</td>
                  <td className="p-4 text-slate-300">{subFamily.subFamilyName}</td>
                  <td className="p-4 text-slate-300">{subFamily.type}</td>
                  <td className="p-4 text-slate-300">{subFamily.description}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400 hover:text-red-300 transition-colors"
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

        {/* Empty State */}
        {subFamilyList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No sub-families found. Add one to get started.</p>
          </div>
        )}
      </div>

      <AddSubFamilyModal
        isOpen={isSubFamilyModalOpen}
        onClose={() => setIsSubFamilyModalOpen(false)}
        onSubmit={handleCreateSubFamily}
      />
    </div>
  );
};

export default FurnitureSubFamilyList;