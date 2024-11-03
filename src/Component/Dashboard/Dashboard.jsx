import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Building2, 
  Box, 
  Gem, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 4500, orders: 45 },
  { month: 'Feb', revenue: 5200, orders: 58 },
  { month: 'Mar', revenue: 4800, orders: 52 },
  { month: 'Apr', revenue: 6300, orders: 65 },
  { month: 'May', revenue: 5900, orders: 59 },
  { month: 'Jun', revenue: 7500, orders: 78 },
];

const categoryData = [
  { category: 'Living Room', value: 35 },
  { category: 'Bedroom', value: 45 },
  { category: 'Office', value: 28 },
  { category: 'Dining', value: 32 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-2">Track your furniture business metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Total Revenue</p>
              <h3 className="text-2xl font-bold text-white mt-2">$45,231</h3>
              <div className="flex items-center mt-2 text-green-400">
                <ArrowUpRight size={16} className="mr-1" />
                <span className="text-sm">+12.5%</span>
              </div>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Active Orders</p>
              <h3 className="text-2xl font-bold text-white mt-2">124</h3>
              <div className="flex items-center mt-2 text-red-400">
                <ArrowDownRight size={16} className="mr-1" />
                <span className="text-sm">-4.3%</span>
              </div>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-xl">
              <Package className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Total Products</p>
              <h3 className="text-2xl font-bold text-white mt-2">1,433</h3>
              <div className="flex items-center mt-2 text-green-400">
                <ArrowUpRight size={16} className="mr-1" />
                <span className="text-sm">+8.1%</span>
              </div>
            </div>
            <div className="bg-green-500/10 p-3 rounded-xl">
              <Box className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Pending Proposals</p>
              <h3 className="text-2xl font-bold text-white mt-2">32</h3>
              <div className="flex items-center mt-2 text-amber-400">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">12 urgent</span>
              </div>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-xl">
              <Gem className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Revenue Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '0.75rem'
                  }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Category Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '0.75rem'
                  }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-slate-800 rounded-xl border border-slate-700"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                className="flex items-center p-4 bg-slate-700/50 rounded-xl"
              >
                <div className="bg-blue-500/10 p-2 rounded-lg mr-4">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">New Order Placed</p>
                  <p className="text-sm text-slate-400">Client ordered 5 items from the Living Room collection</p>
                </div>
                <p className="text-sm text-slate-400">2h ago</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}