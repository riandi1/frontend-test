import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import Product from './components/Product';
import Buttons from './components/Buttons';
import Skeleton from './components/Skeleton';
import axios from 'axios';
import './App.css'

function App() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      const response = await axios.post('https://green-rook-742307.hostingersite.com/api/consulta-productos');
      setProductos(response.data);
      setProductosFiltrados(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const filtrarProductos = (filtros) => {
    const productosFiltrados = productos.filter((producto) => {
      return (
        (filtros.codigo ? String(producto.codigo).includes(filtros.codigo) : true) &&
        (filtros.nombre ? producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) : true) &&
        (filtros.cantidad ? producto.cantidad.toString() === filtros.cantidad : true) &&
        (filtros.creacion ? producto.creacion === filtros.creacion : true)
      );
    });

    setProductosFiltrados(productosFiltrados);
  };

  return (
    <>
      <section className=" py-8 antialiased md:py-12" style={{ "background": "#EDEFEF" }}>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <Navbar />
            <Buttons
              onProductoActualizado={fetchProductos}
              onFiltrarProductos={filtrarProductos}
            />
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            ) : (
              productosFiltrados.map((producto) => (
                <Product key={producto.id} onProductoActualizado={fetchProductos} producto={producto} />
              ))
            )}
          </div>

        </div>
      </section>
    </>
  )
}

export default App
