import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

const  ModalProducto = ({ isOpen, onClose, onSave, producto }) => {
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: '',
        creacion: '',
        imagen: ''
    });

    useEffect(() => {
        if (producto) {
            setFormData({
                codigo: producto.codigo || '',
                nombre: producto.nombre || '',
                descripcion: producto.descripcion || '',
                cantidad: producto.cantidad || '',
                creacion: producto.creacion || '',
                imagen: '' // Se deja vacío porque `producto.imagen` es una URL, no un archivo
            });
        } else {
            setFormData({
                codigo: '',
                nombre: '',
                descripcion: '',
                cantidad: '',
                creacion: '',
                imagen: ''
            });
        }
    }, [producto]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'imagen' && files) {
            setFormData({ ...formData, imagen: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
    
        // ⚠️ Agregar esto para que Laravel reconozca el método como PUT
        if (producto) {
            data.append('_method', 'PUT');
        }
    
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
    
        try {
            const url = producto 
                ? `https://green-rook-742307.hostingersite.com/api/editar/productos/${producto.id}`
                : 'https://green-rook-742307.hostingersite.com/api/crear/productos';
    
            const method = producto ? 'post' : 'post'; // 🔄 Cambiado a POST para ambas acciones
    
            const response = await axios({
                method,
                url,
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: producto 
                    ? 'El producto fue actualizado correctamente.'
                    : 'El producto fue creado correctamente.'
            });
    
            onSave(response.data);
            onClose();
            setFormData({
                codigo: '',
                nombre: '',
                descripcion: '',
                cantidad: '',
                creacion: '',
                imagen: ''
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar el producto.'
            });
            console.error('Error al enviar el producto:', error);
        }
    };
    
    
    

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-7xl dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {producto ? 'Editar Producto' : 'Crear Producto'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                                    <input type="number" name="codigo" onChange={handleChange} value={formData.codigo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de creación</label>
                                    <input type="date" name="creacion" value={formData.creacion} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                                    <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen</label>
                                    <input type="file" name="imagen" accept="image/*" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-pointer" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                    <textarea name="descripcion" value={formData.descripcion} onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                        dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea>
                                </div>

                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                {producto ? 'Editar Producto' : 'Crear Producto'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalProducto;
