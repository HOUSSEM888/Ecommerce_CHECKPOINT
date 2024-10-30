import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true); 

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/userProducts');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message); 
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center" style={{ fontWeight: 'bold', color: '#333' }}>Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Afficher le message d'erreur s'il existe */}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <div className="my-3">
                <label htmlFor="floatingInput" className="display-4" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#495057' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'email
                  required
                  style={{
                    border: '2px solid #ced4da',
                    padding: '10px',
                    borderRadius: '0.375rem',
                    fontSize: '1.1rem',
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>

              <div className="my-3">
                <label htmlFor="floatingPassword" className="display-4" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#495057' }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Mise à jour du mot de passe
                  required
                  style={{
                    border: '2px solid #ced4da',
                    padding: '10px',
                    borderRadius: '0.375rem',
                    fontSize: '1.1rem',
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>

              <div className="my-3">
                <p style={{ fontSize: '1rem', color: '#007bff' }}>
                  New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link>
                </p>
              </div>

              <div className="my-3">
                <Link to="/forgot-password" className="text-decoration-underline text-info" style={{ fontSize: '1rem' }}>
                  Forgot Password?
                </Link>
              </div>

              <div className="text-center">
                <button
                  className="my-2 mx-auto btn btn-dark"
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '10px 20px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    backgroundColor: '#343a40',
                    borderColor: '#343a40',
                    color: '#fff',
                    borderRadius: '0.375rem',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {isLoading ? 'Connexion...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
