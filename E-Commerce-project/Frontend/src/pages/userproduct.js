import React from 'react';
import { Navbar, Footer, Product } from '../components';
import { useNavigate } from 'react-router-dom';

const UserProducts = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Supprimer l'utilisateur du localStorage
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">User Products</h1>
        <hr />
        <Product />
        <div className="text-center my-4">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProducts;
