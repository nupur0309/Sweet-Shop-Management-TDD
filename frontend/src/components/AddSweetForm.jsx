import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { sweetsAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'

const AddSweetForm = () => {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: ''
    })

    const addMutation = useMutation(
        (data) => sweetsAPI.addSweet(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sweets')
                toast.success('Sweet added successfully!')
                setFormData({ name: '', category: '', price: '', quantity: '' })
            },
            onError: (error) => {
                toast.error(error.response?.data?.msg || 'Failed to add sweet')
            },
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.name || !formData.category || !formData.price || !formData.quantity) {
            toast.error('Please fill all fields')
            return
        }

        addMutation.mutate({
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity)
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="card p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
                <Plus className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-bold text-gray-900">Add New Sweet</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Sweet name"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={addMutation.isLoading}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        {addMutation.isLoading ? 'Adding Sweet...' : 'Add New Sweet'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddSweetForm
