import React, { useState } from "react";
import { Lock, LogIn, User } from "lucide-react";
import { motion } from "framer-motion";
import loginImg from "../../images/login.png";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={loginImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-700/90 backdrop-blur-sm">
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Shape Your Dream Home!
            </h1>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
              <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-700/50 rounded-xl w-full max-w-lg p-8 relative shadow-2xl z-10"
      >
        <div className="absolute inset-0 bg-slate-900/40 rounded-xl backdrop-blur-sm -z-10" />

        {/* Logo/Icon Section */}
        <div className="flex justify-center mb-8 relative">
          <div className="bg-orange-900/20 p-4 rounded-full relative">
            <div className="absolute opacity-25" />
            <LogIn size={48} className="text-orange-500 animate-pulse" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            Welcome Back
          </h3>
          <p className="text-slate-400 text-lg">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className=" p-6 rounded-xl space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 text-slate-200 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={18}
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 text-slate-200 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={18}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors duration-200"
            >
              Forgot Password?
            </a>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg
                       hover:from-orange-700 hover:to-orange-600 transition-all duration-200 font-medium
                       shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Sign In
            </motion.button>
          </div>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?{" "}
          <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
            Create Account
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;