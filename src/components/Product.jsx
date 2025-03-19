import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import ModalProducto from './ModalProducto';
import axios from 'axios';
import Swal from 'sweetalert2';

const Product = ({ producto, onProductoActualizado }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = (producto) => {
        setProductoSeleccionado(producto); // Asigna el producto seleccionado
        setIsEditModalOpen(true); // Abre el modal de edición
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    const handleDelete = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://green-rook-742307.hostingersite.com/api/eliminar/productos/${id}`);

                    Swal.fire({
                        icon: 'success',
                        title: '¡Eliminado!',
                        text: 'El producto ha sido eliminado correctamente.',
                        timer: 2000
                    });
                    onProductoActualizado();
                    // Aquí puedes agregar una lógica adicional para actualizar la lista de productos
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al eliminar el producto.'
                    });

                    console.error('Error al eliminar el producto:', error);
                }
            }
        });
    };

    return (
        <>
            <div key={producto.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="h-56 w-full">
                    <a href="#" onClick={openModal}>
                        <img className="mx-auto h-full dark:hidden" src={"https://green-rook-742307.hostingersite.com/storage/app/public/" + producto.imagen} alt="" />
                    </a>
                </div>
                <div className="pt-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                            {producto.codigo}
                        </span>
                        <div className="flex items-center justify-end gap-1">
                            <button onClick={openModal} type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only"> Ver Producto </span>
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>

                            <button
                                onClick={() => openEditModal(producto)}
                                type="button"
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Editar Producto</span>
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                    />
                                </svg>
                            </button>


                            {/* Botón para Eliminar Producto */}
                            <button
                                onClick={() => handleDelete(producto.id)}
                                type="button"
                                data-tooltip-target="tooltip-delete"
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Eliminar Producto</span>
                                <svg
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                    />
                                </svg>
                            </button>

                        </div>
                    </div>
                    <a href="#" onClick={openModal} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                        {producto.nombre}
                    </a>
                    <div className="mt-2 flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{producto.creacion}</p>
                    </div>
                    <ul className="mt-2 flex items-center gap-4">
                        <li className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock ({producto.cantidad})</p>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <Modal producto={producto} onProductoActualizado={onProductoActualizado} onClose={closeModal} />
                )}
            </AnimatePresence>

            {/* Modal de Edición */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <ModalProducto
                        producto={productoSeleccionado}
                        onClose={closeEditModal}
                        isOpen={isEditModalOpen}
                        onProductoActualizado={onProductoActualizado}
                        onSave={(updatedProduct) => {
                            console.log('Producto actualizado:', updatedProduct);
                            onProductoActualizado();
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
const Modal = ({ producto, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-7xl dark:bg-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white"></h2>
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
                    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                                    <img className="w-full dark:hidden" src={"https://green-rook-742307.hostingersite.com/storage/app/public/" + producto.imagen} alt="" />

                                </div>

                                <div className="mt-6 sm:mt-8 lg:mt-0">
                                    <h1
                                        className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                                    >
                                        {producto.nombre}
                                    </h1>
                                    <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                        <p
                                            className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                        >
                                            {producto.codigo}
                                        </p>

                                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                            <a
                                                href="#"
                                                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                                            >
                                                {producto.creacion}
                                            </a>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Stock: {producto.cantidad}
                                            </p>


                                        </div>

                                    </div>
                                    <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                                        {producto.descripcion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
};
export default Product;