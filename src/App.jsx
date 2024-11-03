// App.jsx
import React, { useState } from "react";
import "./App.css";
import ShowSupplierRecord from "./Component/Supplier/ShowSupplierRecord";
import SupplierDetails from "./Component/Supplier/SupplierDetails";
import Sidebar from "./Component/Sidebar/Sidebar";
import Navbar from "./Component/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import AppartmentList from "./Component/Apparment/AppartmentList";
import FurnitureList from "./Component/FurnitureManagement/FurnitureList";
import ProductCatalogueList from "./Component/ProductCatalogue/ProductCatalogueList";
import ProductDetails from "./Component/ProductCatalogue/ProductDetails";
import Login from "./Component/Auth/Login";
import ColoursList from "./Component/Colours/ColoursList";
import MaterialsList from "./Component/Materials/MaterialList";
import ProposalList from "./Component/Proposal/ProposalList";
import ProposalDetails from "./Component/Proposal/ProposalDetails";
import ApartmentDetailsPage from "./Component/Apparment/ApartmentDetailsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubFamiliesList from "./Component/FurnitureManagement/SubFamiliesList";
import Dashboard from "./Component/Dashboard/Dashboard";

function App() {
  return <AppContent />;
}

function AppContent() {
  // Manage authentication state locally
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log("User authenticated");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log("User logged out");
  };

  const AuthenticatedLayout = ({ children }) => (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <span className="overflow-auto">{children}</span>
      </div>
    </div>
  );

  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/supplier" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route
            path="/*"
            element={
              <AuthenticatedLayout>
                <Routes>
                  <Route path="/supplier" element={<ShowSupplierRecord />} />
                  <Route
                    path="/supplier-details"
                    element={<SupplierDetails />}
                  />
                  <Route path="/apartment" element={<AppartmentList />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  <Route
                    path="/apartment-details"
                    element={<ApartmentDetailsPage />}
                  />
                  <Route
                    path="/furniture-management"
                    element={<FurnitureList />}
                  />
                  <Route
                    path="/furniture-sub-families"
                    element={<SubFamiliesList />}
                  />
                  <Route
                    path="/product-catalogue"
                    element={<ProductCatalogueList />}
                  />
                  <Route path="/product-details" element={<ProductDetails />} />
                  <Route path="/colours" element={<ColoursList />} />
                  <Route path="/material" element={<MaterialsList />} />
                  <Route path="/proposal" element={<ProposalList />} />
                  <Route
                    path="/proposal-details/:id"
                    element={<ProposalDetails />}
                  />
                  {/* Redirect any unknown routes to /supplier */}
                  <Route
                    path="*"
                    element={<Navigate to="/supplier" replace />}
                  />
                </Routes>
              </AuthenticatedLayout>
            }
          />
        ) : (
          // Redirect all other routes to Login if not authenticated
          <Route path="/*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
