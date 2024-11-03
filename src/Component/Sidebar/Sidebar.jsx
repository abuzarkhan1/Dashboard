import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Palette,
  Box,
  Building2,
  LogOut,
  Aperture,
  BrickWall,
  Gem,
  ChevronRight,
  Home,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  const menuGroups = [
    {
      title: 'MAIN',
      items: [
        { name: 'Dashboard', icon: Home, to: '/dashboard' },
        { name: 'Suppliers', icon: Users, to: '/supplier' },
      ]
    },
    {
      title: 'PROPERTY',
      items: [
        { name: 'Apartments', icon: Building2, to: '/apartment' },
        { name: 'Colors', icon: Aperture, to: '/colours' },
        { name: 'Materials', icon: BrickWall, to: '/material' },
      ]
    },
    {
      title: 'FURNITURE',
      items: [
        { name: 'Furniture Families', icon: Palette, to: '/furniture-management' },
        { name: 'Sub Families', icon: Palette, to: '/furniture-sub-families' },
        { name: 'Product Catalogue', icon: Box, to: '/product-catalogue' },
      ]
    },
    {
      title: 'BUSINESS',
      items: [
        { name: 'Proposals', icon: Gem, to: '/proposal' },
      ]
    }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const sidebarVariants = {
    expanded: { width: '300px' },
    collapsed: { width: '80px' }
  };

  return (
    <motion.div
      initial="expanded"
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen relative flex flex-col overflow-hidden"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-blue-500 p-1.5 mr-3 rounded-full shadow-lg z-50"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </motion.div>
      </button>

      <div className="p-6 flex items-center justify-center">
        <motion.div
          animate={{ scale: isCollapsed ? 0.8 : 1 }}
          className="flex items-center"
        >
          {!isCollapsed && (
            <>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src="/src/images/Layer_1.png" className="w-10 h-10" />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3 font-bold text-xl"
              >
              </motion.span>
            </>
          )}
        </motion.div>
      </div>

      {/* Menu Groups */}
      <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            {!isCollapsed && (
              <div className="text-slate-400 text-base font-semibold mb-3 px-4">
                {group.title}
              </div>
            )}
            {group.items.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`relative flex items-center px-4 py-3.5 mb-1.5 rounded-xl transition-all duration-200
                  ${location.pathname === item.to 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700'}`}
                onMouseEnter={() => setActiveGroup(groupIndex)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className={`w-6 h-6 ${location.pathname === item.to ? 'text-white' : 'text-slate-400'}`} />
                </motion.div>
                {!isCollapsed && (
                  <motion.span
                    initial={false}
                    animate={{ opacity: 1 }}
                    className="ml-4 text-lg font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
                {isCollapsed && location.pathname === item.to && (
                  <motion.div
                    className="absolute left-14 bg-blue-500 text-white px-3 py-1.5 rounded-md text-lg whitespace-nowrap z-50"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {item.name}
                  </motion.div>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors duration-200"
        >
          <LogOut className="w-6 h-6" />
          {!isCollapsed && (
            <span className="ml-4 text-lg font-medium">Logout</span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;