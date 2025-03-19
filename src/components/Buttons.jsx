import React, { useState } from 'react';
import ModalProducto from './ModalProducto';
import ModalFiltros from './ModalFiltros';
import { motion, AnimatePresence } from 'framer-motion';

const Buttons = ({ onProductoActualizado, onFiltrarProductos }) => {
    const [showModal, setShowModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);
    const [filtros, setFiltros] = useState({
        cantidad: '',
        creacion: '',
        codigo: '',
        nombre: ''
    });
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const aplicarFiltros = () => {
        onFiltrarProductos(filtros);
        setShowFiltersModal(false); // Cerrar el modal después de aplicar los filtros
    };

    return (
        <div className="flex items-center space-x-4">
            {/* Botón de Filtros */}
            <button
                onClick={() => setShowFiltersModal(true)} // Abre el modal
                type="button"
                className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 sm:w-auto"
            >
                <span className="me-2">🔍</span>
                Filtros
            </button>
            <ModalFiltros
                isOpen={showFiltersModal}
                onClose={() => setShowFiltersModal(false)}
                filtros={filtros}
                onFiltroChange={handleFiltroChange}
                onAplicarFiltros={aplicarFiltros}
            />
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full bg-white p-4 rounded-lg shadow-md mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4"
                    >
                        <input
                            type="text"
                            placeholder="Código"
                            name="codigo"
                            value={filtros.codigo}
                            onChange={handleFiltroChange}
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={filtros.nombre}
                            onChange={handleFiltroChange}
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Cantidad"
                            name="cantidad"
                            value={filtros.cantidad}
                            onChange={handleFiltroChange}
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="date"
                            placeholder="Creación"
                            name="creacion"
                            value={filtros.creacion}
                            onChange={handleFiltroChange}
                            className="border p-2 rounded w-full"
                        />

                        <button
                            onClick={aplicarFiltros}
                            className="col-span-1 md:col-span-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Aplicar Filtros
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Botón de Crear Producto */}
            <button
                onClick={() => {
                    setProductoEditar(null);
                    setShowModal(true);
                }}
                className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-green-500 text-white px-3 py-2 text-sm font-medium hover:bg-green-600"
            >
                <span className="me-2">+</span>
                Crear Producto
            </button>

            {/* Modal de Producto (Crear o Editar) */}
            <AnimatePresence>
                <ModalProducto
                    isOpen={showModal}  // Se añade esta prop
                    onClose={() => setShowModal(false)}
                    producto={productoEditar}
                    onSave={(updatedProduct) => {
                        console.log('Producto actualizado:', updatedProduct);
                        onProductoActualizado(); // 🔄 Actualiza el listado de productos
                    }}
                />
            </AnimatePresence>
        </div>
    );
}
export default Buttons;