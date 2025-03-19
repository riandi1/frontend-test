import React from 'react';
import { motion } from 'framer-motion';

const ModalFiltros = ({ isOpen, onClose, filtros, onFiltroChange, onAplicarFiltros }) => {
    if (!isOpen) return null;

    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md grid gap-4 mb-4 sm:grid-cols-1"
            >
                <h2 className="text-xl font-bold mb-4">Filtros</h2>

                <input
                    type="text"
                    placeholder="Código"
                    name="codigo"
                    value={filtros.codigo}
                    onChange={onFiltroChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={filtros.nombre}
                    onChange={onFiltroChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    name="cantidad"
                    value={filtros.cantidad}
                    onChange={onFiltroChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                <input
                    type="date"
                    placeholder="Creación"
                    name="creacion"
                    value={filtros.creacion}
                    onChange={onFiltroChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={onAplicarFiltros}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ModalFiltros;
