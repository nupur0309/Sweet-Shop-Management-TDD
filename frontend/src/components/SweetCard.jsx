import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { sweetsAPI } from '../services/api'
import toast from 'react-hot-toast'

import {
    ShoppingCart,
    Package,
    Edit,
    Trash2,
    Plus,
    IndianRupee,
    AlertTriangle,
} from 'lucide-react'
import EditSweetModal from './EditSweetModal'

const SweetCard = ({ sweet, onPurchase, onRestock, isAdmin }) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const queryClient = useQueryClient()

    // Delete mutation
    const deleteMutation = useMutation(
        () => sweetsAPI.deleteSweet(sweet.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sweets')
                toast.success('Sweet deleted successfully')
                setShowDeleteConfirm(false)
            },
            onError: (error) => {
                toast.error(error.response?.data?.msg || 'Failed to delete sweet')
            },
        }
    )

    // Function to get emoji based on sweet name or category
    const getSweetEmoji = () => {
        const name = sweet.name.toLowerCase()
        const category = sweet.category.toLowerCase()

        // Check by name first
        if (name.includes('chocolate')) return '🍫'
        if (name.includes('candy') || name.includes('candies')) return '🍬'
        if (name.includes('lollipop') || name.includes('sucker')) return '🍭'
        if (name.includes('gummy') || name.includes('jelly')) return '🍯'
        if (name.includes('cookie') || name.includes('biscuit')) return '🍪'
        if (name.includes('cake') || name.includes('cupcake')) return '🧁'
        if (name.includes('donut') || name.includes('doughnut')) return '🍩'
        if (name.includes('ice cream') || name.includes('icecream')) return '🍦'
        if (name.includes('pie')) return '🥧'
        if (name.includes('candy cane')) return '🎄'
        if (name.includes('marshmallow')) return '☁️'
        if (name.includes('caramel') || name.includes('toffee')) return '🟤'
        if (name.includes('mint')) return '🌿'
        if (name.includes('berry') || name.includes('fruit')) return '🍓'
        if (name.includes('honey')) return '🍯'
        if (name.includes('pretzel')) return '🥨'
        if (name.includes('popcorn')) return '🍿'

        // Check by category if no name match
        if (category.includes('mithai')) return '🍬'
        if (category.includes('halwa')) return '🍯'
        if (category.includes('barfi')) return '♦️'
        if (category.includes('ladoo')) return '🌕'
        if (category.includes('peda')) return '🫓'
        if (category.includes('kheer')) return '🥛'
        if (category.includes('chaat sweets')) return '🍲'
        if (category.includes('dry fruit sweets')) return '🥜'
        if (category.includes('regional specials')) return '✨'
        if (category.includes('cake')) return '🎂'
        if (category.includes('cookie')) return '🍪'
        if (category.includes('donut')) return '🍩'
        if (category.includes('seasonal') || category.includes('holiday')) return '🎄'
        if (category.includes('mint') || category.includes('fresh')) return '🌿'
        if (category.includes('fruit') || category.includes('berry')) return '🍓'
        if (category.includes('honey') || category.includes('natural')) return '🍯'
        if (category.includes('salty') || category.includes('pretzel')) return '🥨'
        if (category.includes('popcorn') || category.includes('corn')) return '🍿'
        if (category.includes('nuts') || category.includes('nut')) return '🥜'
        if (category.includes('coconut')) return '🥥'
        if (category.includes('banana')) return '🍌'
        if (category.includes('apple')) return '🍎'
        if (category.includes('orange') || category.includes('citrus')) return '🍊'
        if (category.includes('grape')) return '🍇'
        if (category.includes('cherry')) return '🍒'
        if (category.includes('peach')) return '🍑'
        if (category.includes('pineapple')) return '🍍'
        if (category.includes('watermelon')) return '🍉'
        if (category.includes('mango')) return '🥭'
        if (category.includes('kiwi')) return '🥝'
        if (category.includes('strawberry')) return '🍓'
        if (category.includes('blueberry')) return '🫐'
        if (category.includes('raspberry')) return '🍇'

        // Default emojis for different categories
        const emojiOptions = ['🍬', '🍯', '🍪', '🎂', '🍩', '🥧', '🍦', '🍫', '🍭', '🍰', '🍮', '🥛', '🍲', '🥜', '✨']

        // Use sweet ID to consistently pick the same emoji for the same sweet
        const index = sweet.id % emojiOptions.length
        return emojiOptions[index]
    }

    const getStockStatus = () => {
        if (sweet.quantity === 0) {
            return { label: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' }
        }
        if (sweet.quantity <= 5) {
            return { label: 'Low Stock', color: 'text-yellow-600', bg: 'bg-yellow-100' }
        }
        return { label: 'In Stock', color: 'text-green-600', bg: 'bg-green-100' }
    }

    const stockStatus = getStockStatus()

    const handleDelete = () => {
        deleteMutation.mutate()
    }

    return (
        <>
            <div className="card group relative">
                {/* Sweet Image/Icon with Gradient Background */}
                <div className="h-56 bg-gradient-candy flex items-center justify-center relative overflow-hidden">
                    {/* Animated background circles */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-float"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
                    </div>

                    {/* Dynamic Sweet Emoji */}
                    <div className="relative z-10 text-8xl group-hover:scale-125 transition-transform duration-500 sweet-card-hover drop-shadow-2xl">
                        {getSweetEmoji()}
                    </div>

                    {/* Stock Status Badge */}
                    <div className="absolute top-4 right-4 z-20">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm ${stockStatus.bg} ${stockStatus.color} border-2 border-white/50`}>
                            {stockStatus.label}
                        </span>
                    </div>

                    {/* Admin Actions */}
                    {isAdmin && (
                        <div className="absolute top-4 left-4 flex space-x-2 z-20">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="p-3 bg-white/95 hover:bg-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-110"
                                title="Edit Sweet"
                            >
                                <Edit className="w-5 h-5 text-primary-600" />
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="p-3 bg-white/95 hover:bg-red-50 rounded-2xl shadow-lg transition-all duration-300 hover:scale-110"
                                title="Delete Sweet"
                            >
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Sweet Details */}
                <div className="p-6 bg-white/90 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {sweet.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 capitalize font-medium">
                        {sweet.category}
                    </p>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-5 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                            <IndianRupee className="w-5 h-5 text-primary-600" />
                            <span className="text-2xl font-bold text-primary-700">
                                {sweet.price.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/80 px-3 py-1 rounded-full">
                            <Package className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700 font-semibold">
                                {sweet.quantity} left
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        <button
                            onClick={() => onPurchase(sweet.id)}
                            disabled={sweet.quantity === 0}
                            className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="font-bold">{sweet.quantity === 0 ? 'Out of Stock' : 'Buy Now'}</span>
                        </button>

                        {isAdmin && (
                            <button
                                onClick={() => onRestock(sweet.id)}
                                className="btn-secondary flex items-center justify-center px-4"
                                title="Restock"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Low Stock Warning */}
                    {sweet.quantity <= 5 && sweet.quantity > 0 && (
                        <div className="mt-4 flex items-center space-x-2 bg-yellow-50 text-yellow-700 text-sm px-4 py-2 rounded-xl border border-yellow-200">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-semibold">Low stock alert!</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <EditSweetModal
                    sweet={sweet}
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSuccess={() => {
                        setShowEditModal(false)
                        queryClient.invalidateQueries('sweets')
                    }}
                />
            )}

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Delete Sweet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{sweet.name}"? This action cannot be undone.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 btn-outline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteMutation.isLoading}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SweetCard