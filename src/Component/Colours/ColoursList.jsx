import { useState, useEffect } from "react";
import { Search, Filter,  Edit, Trash2, Download, Plus } from "lucide-react";
import { motion } from "framer-motion";
import AddColourModal from "./AddColourModal";
import DeleteColourModal from "./DeleteColourModal";
import { toast } from "react-toastify";

const ColoursList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [colourToDelete, setColourToDelete] = useState(null);
  const [editingColour, setEditingColour] = useState(null);

  const initialColours = [
    {
      id: 1,
      name: "Red",
      code: "#FF0000",
      description: "Bright and bold red color.",
    },
    {
      id: 2,
      name: "Green",
      code: "#00FF00",
      description: "Vibrant green representing nature.",
    },
    {
      id: 3,
      name: "Blue",
      code: "#0000FF",
      description: "Calm and soothing blue hue.",
    },
    {
      id: 4,
      name: "Yellow",
      code: "#FFFF00",
      description: "Bright yellow for energy.",
    },
    {
      id: 5,
      name: "Purple",
      code: "#800080",
      description: "Royal purple for elegance.",
    },
    {
      id: 6,
      name: "Orange",
      code: "#FFA500",
      description: "Warm and inviting orange shade.",
    },
  ];

  const [colours, setColours] = useState(initialColours);
  const [pageNumber, setPageNumber] = useState(0);
  const [size] = useState(10);
  const [filteredColours, setFilteredColours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    filterColours();
  }, [colours, searchTerm, filterTerm]);

  const filterColours = () => {
    let filtered = colours;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (colour) =>
          colour.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          colour.code.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (filterTerm) {
      const lowerCaseFilterTerm = filterTerm.toLowerCase();
      filtered = filtered.filter(
        (colour) =>
          colour.description &&
          colour.description.toLowerCase().includes(lowerCaseFilterTerm)
      );
    }

    setFilteredColours(filtered);
  };

  const handleCreateOrUpdateColour = (colourData) => {
    if (editingColour) {
      setColours(
        colours.map((colour) =>
          colour.id === editingColour.id
            ? { ...colourData, id: colour.id }
            : colour
        )
      );
      toast.success("Colour updated successfully");
      setEditingColour(null);
      setIsAddModalOpen(false);
    } else {
      const newColour = {
        ...colourData,
        id: colours.length > 0 ? colours[colours.length - 1].id + 1 : 1,
      };
      setColours([...colours, newColour]);
      toast.success("Colour created successfully");
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteClick = (colour) => {
    setColourToDelete(colour);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (colourToDelete) {
      setColours(colours.filter((c) => c.id !== colourToDelete.id));
      setIsDeleteModalOpen(false);
      setColourToDelete(null);
      toast.success("Colour deleted successfully");
    }
  };

  const handleEditClick = (colourId) => {
    const colourData = colours.find((c) => c.id === colourId);
    if (colourData) {
      setEditingColour(colourData);
      setIsAddModalOpen(true);
    } else {
      toast.error("Colour not found");
    }
  };

  const handleExcelDownload = () => {
    const csvContent = [
      ["Name", "Code", "Description"],
      ...colours.map((colour) => [
        colour.name,
        colour.code,
        colour.description,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "colours.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedColours = filteredColours.slice(
    pageNumber * size,
    (pageNumber + 1) * size
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Colours List</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            {/* Search and Filter Section */}
            <div className="flex flex-1 gap-4">
              <motion.div 
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  placeholder="Search by name or code..."
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
                  setEditingColour(null);
                  setIsAddModalOpen(true);
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Colour
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
                <th className="p-4 text-left text-slate-300 font-semibold">Code</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Description</th>
                <th className="p-4 text-left text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedColours.map((colour) => (
                <tr 
                  key={colour.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{colour.name}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 rounded"
                        style={{ backgroundColor: colour.code }}
                      ></span>
                      <span className="text-white">{colour.code}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-400">{colour.description}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-400"
                        onClick={() => handleEditClick(colour.id)}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400"
                        onClick={() => handleDeleteClick(colour)}
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
          Showing {pageNumber * size + 1} to {Math.min((pageNumber + 1) * size, filteredColours.length)} of {filteredColours.length} entries
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
            disabled={(pageNumber + 1) * size >= filteredColours.length}
          >
            Next
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <AddColourModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingColour(null);
        }}
        onSubmit={handleCreateOrUpdateColour}
        isEditing={!!editingColour}
        colourData={editingColour}
      />
      <DeleteColourModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ColoursList;