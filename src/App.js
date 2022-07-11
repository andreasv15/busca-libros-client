import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Libros from './pages/Libros';
import Error from './pages/Error';
import Perfil from './pages/Perfil';
import Localizaciones from './pages/Localizaciones';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AddLibro from './pages/AddLibro';
import AddLocalizacion from './pages/AddLocalizacion';
import DetalleLibro from './pages/DetalleLibro';
import EditarLibro from './pages/EditarLibro';
import DetalleLocalizacion from './pages/DetalleLocalizacion';
import EditarLocalizacion from './pages/EditarLocalizacion';

function App() {
  return (
    <div className="App">

    <Navbar />

    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/login' element={ <Login />} />
      <Route path='/signup' element={ <Signup />} />

      <Route path="/libros" element={ <Libros /> } />
      <Route path='/libros/add-libro' element={<AddLibro />} />
      <Route path="/libros/:id/edit" element={<EditarLibro />} />
      <Route path="/libros/:id/details" element={<DetalleLibro />} />


      <Route path="/localizaciones" element={ <Localizaciones /> } />
      <Route path='/localizaciones/add-localizacion' element={<AddLocalizacion />} />
      <Route path="/localizaciones/:id/edit" element={<EditarLocalizacion />} />
      <Route path="/localizaciones/:id/details" element={<DetalleLocalizacion />} />
      <Route path="/perfil" element={ <Perfil /> } />


      <Route path="/error" element={ <Error /> } />
      <Route path="*" element={<NotFound />} />

    </Routes>

    </div>
  );
}

export default App;
