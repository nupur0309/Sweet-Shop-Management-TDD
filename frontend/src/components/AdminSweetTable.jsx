import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { sweetsAPI, inventoryAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Trash2, ShoppingCart, Plus, IndianRupee } from 'lucide-react'

const AdminSweetsTable = ({ sweets, onPurchase, onRestock }) => {
    const queryClient = useQueryClient()
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    // Delete mutation
    const deleteMutation = useMutation(
        (sweetId) => sweetsAPI.deleteSweet(sweetId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sweets')
                toast.success('Sweet deleted successfully')
                setDeleteConfirm(null)
            },
            onError: (error) => {
                toast.error(error.response?.data?.msg || 'Failed to delete sweet')
            },
        }
    )

    const handleDelete = (sweetId) => {
        deleteMutation.mutate(sweetId)
    }

    return (
        <div className="card overflow-hidden shadow-lg border-0 rounded-3xl">
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-purple-50 text-left">
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase tracking-wider">Restock</th>
                            <th className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase tracking-wider">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {sweets.map((sweet) => (
                            <tr
                                key={sweet.id}
                                className="hover:bg-purple-50/30 transition-colors duration-200"
                            >
                                <td className="px-6 py-3 text-sm text-gray-500">{sweet.id}</td>
                                <td className="px-6 py-3">
                                    <span className="text-sm font-bold text-gray-900">{sweet.name}</span>
                                </td>
                                <td className="px-6 py-3">
                                    <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-semibold">
                                        {sweet.category}
                                    </span>
                                </td>
                                <td className="px-6 py-3">
                                    <div className="flex items-center space-x-1 font-bold text-purple-600">
                                        <IndianRupee className="w-3 h-3" />
                                        <span>{sweet.price.toFixed(2)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${sweet.quantity === 0 ? 'bg-red-100 text-red-800' :
                                        sweet.quantity <= 5 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                        {sweet.quantity}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-center">
                                    <button
                                        onClick={() => onRestock(sweet.id)}
                                        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Qty
                                    </button>
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {deleteConfirm === sweet.id ? (
                                        <div className="flex items-center justify-center space-x-2 animate-fadeIn">
                                            <button
                                                onClick={() => handleDelete(sweet.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(null)}
                                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirm(sweet.id)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow hover:shadow-md transform hover:-translate-y-0.5"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {sweets.length === 0 && (
                <div className="text-center py-16">
                    <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No sweets found</h3>
                    <p className="text-gray-500 text-sm mt-1">Get started by adding a new sweet above.</p>
                </div>
            )}
        </div>
    )
}

export default AdminSweetsTable
