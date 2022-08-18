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
import Footer from './components/Footer';
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <div className="App">

    <Navbar />

    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/login' element={ <Login />} />
      <Route path='/signup' element={ <Signup />} />

      <Route path="/libros" element={ <IsPrivate> <Libros /> </IsPrivate> } />
      <Route path='/libros/add-libro' element={<IsPrivate><AddLibro /></IsPrivate>} />
      <Route path="/libros/:id/edit" element={<IsPrivate><EditarLibro /></IsPrivate>} />
      <Route path="/libros/:id/details" element={<IsPrivate> <DetalleLibro /> </IsPrivate>} />


      <Route path="/localizaciones" element={ <IsPrivate><Localizaciones /></IsPrivate> } />
      <Route path='/localizaciones/add-localizacion' element={<IsPrivate><AddLocalizacion /></IsPrivate>} />
      <Route path="/localizaciones/:id/edit" element={<IsPrivate><EditarLocalizacion /></IsPrivate>} />
      <Route path="/localizaciones/:id/details" element={<IsPrivate><DetalleLocalizacion /></IsPrivate>} />
      <Route path="/perfil" element={<IsPrivate> <Perfil /> </IsPrivate> } />


      <Route path="/error" element={ <Error /> } />
      <Route path="*" element={<NotFound />} />

    </Routes>

    <Footer />

    </div>
  );
}

export default App;
