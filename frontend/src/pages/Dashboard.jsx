import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useAuth } from '../contexts/AuthContext'
import { sweetsAPI, inventoryAPI } from '../services/api'
import toast from 'react-hot-toast'
import {
    Candy,
    Search,
    Filter,
    Plus,
    ShoppingCart,
    Package,
    DollarSign,
    TrendingUp,
    AlertTriangle,
} from 'lucide-react'
import SweetCard from '../components/SweetCard'
import SearchFilter from '../components/SearchFilter'
import AddSweetModal from '../components/AddSweetModal'
import LoadingSpinner from '../components/LoadingSpinner'
import AdminSweetsTable from '../components/AdminSweetsTable'
import AddSweetForm from '../components/AddSweetForm'

const Dashboard = () => {
    const { isAdmin } = useAuth()
    const queryClient = useQueryClient()
    const [searchFilters, setSearchFilters] = useState({
        search: '',
        category: '',
        price_min: '',
        price_max: '',
    })
    const [showAddModal, setShowAddModal] = useState(false)

    // Fetch all sweets
    const {
        data: sweets = [],
        isLoading,
        error,
        refetch,
    } = useQuery('sweets', sweetsAPI.getAllSweets, {
        retry: 1,
    })

    // Search sweets with filters
    const {
        data: searchResults,
        isLoading: isSearching,
    } = useQuery(
        ['sweets', 'search', searchFilters],
        () => sweetsAPI.searchSweets(searchFilters),
        {
            enabled: Object.values(searchFilters).some(value => value !== ''),
            retry: 1,
        }
    )

    // Purchase mutation
    const purchaseMutation = useMutation(
        (sweetId) => inventoryAPI.purchaseSweet(sweetId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sweets')
                toast.success('Sweet purchased successfully!')
            },
            onError: (error) => {
                toast.error(error.response?.data?.msg || 'Purchase failed')
            },
        }
    )

    // Restock mutation
    const restockMutation = useMutation(
        (sweetId) => inventoryAPI.restockSweet(sweetId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sweets')
                toast.success('Sweet restocked successfully!')
            },
            onError: (error) => {
                toast.error(error.response?.data?.msg || 'Restock failed')
            },
        }
    )

    const displaySweets = searchResults || sweets
    const hasActiveFilters = Object.values(searchFilters).some(value => value !== '')

    // Calculate statistics
    const stats = {
        totalSweets: sweets.length,
        lowStock: sweets.filter(sweet => sweet.quantity <= 5 && sweet.quantity > 0).length,
        outOfStock: sweets.filter(sweet => sweet.quantity === 0).length,
        categories: [...new Set(sweets.map(sweet => sweet.category))].length,
    }

    const handlePurchase = (sweetId) => {
        purchaseMutation.mutate(sweetId)
    }

    const handleRestock = (sweetId) => {
        restockMutation.mutate(sweetId)
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Failed to load sweets
                </h3>
                <p className="text-gray-600 mb-4">
                    {error.response?.data?.msg || 'Something went wrong'}
                </p>
                <button
                    onClick={() => refetch()}
                    className="btn-primary"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="hero-section animate-glow !p-6">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="relative z-10">
                    <div className="animate-float mb-3">
                        <Candy className="w-12 h-12 mx-auto drop-shadow-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
                        Welcome to Sweet Shop
                    </h1>
                    <p className="text-lg opacity-95 font-medium">
                        Discover our delicious collection of handcrafted sweets ✨
                    </p>
                </div>
            </div>

            {/* Admin Stats */}
            {isAdmin && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="stat-card from-purple-500 to-purple-700 border-purple-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Total Sweets</p>
                                <p className="text-4xl font-bold text-white mt-2">{stats.totalSweets}</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                                <Candy className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card from-yellow-400 to-orange-500 border-yellow-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-yellow-100 text-sm font-medium">Low Stock</p>
                                <p className="text-4xl font-bold text-white mt-2">{stats.lowStock}</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                                <AlertTriangle className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card from-red-500 to-pink-600 border-red-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-100 text-sm font-medium">Out of Stock</p>
                                <p className="text-4xl font-bold text-white mt-2">{stats.outOfStock}</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                                <Package className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="stat-card from-cyan-500 to-blue-600 border-cyan-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-100 text-sm font-medium">Categories</p>
                                <p className="text-4xl font-bold text-white mt-2">{stats.categories}</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Filter Section - Users Only */}
            {!isAdmin && (
                <SearchFilter
                    filters={searchFilters}
                    onFiltersChange={setSearchFilters}
                    onClearFilters={() => setSearchFilters({
                        search: '',
                        category: '',
                        price_min: '',
                        price_max: '',
                    })}
                />
            )}

            {/* Admin Layout: Side-by-Side */}
            {isAdmin ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Left Side: Add Sweet Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <AddSweetForm />
                        </div>
                    </div>

                    {/* Right Side: Sweets Table */}
                    <div id="available-sweets" className="lg:col-span-3 space-y-6">
                        {/* Loading State */}
                        {isSearching && (
                            <div className="text-center py-8">
                                <LoadingSpinner />
                            </div>
                        )}

                        {/* Admin Table View */}
                        {!isSearching && displaySweets.length > 0 && (
                            <AdminSweetsTable
                                sweets={displaySweets}
                                onRestock={handleRestock}
                            />
                        )}

                        {/* Empty State */}
                        {!isSearching && displaySweets.length === 0 && (
                            <div className="text-center py-12 card">
                                <Candy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No sweets available</h3>
                                <p className="text-gray-600">Get started by adding a new sweet on the left.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* User Layout: Stacked */
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 id="available-sweets" className="text-3xl font-bold text-gradient">
                            Available Sweets
                            {hasActiveFilters && (
                                <span className="text-lg font-normal text-gray-600 ml-3">
                                    ({displaySweets.length} results)
                                </span>
                            )}
                        </h2>
                    </div>

                    {/* Loading State */}
                    {isSearching && (
                        <div className="text-center py-8">
                            <LoadingSpinner />
                        </div>
                    )}

                    {/* User Card Grid */}
                    {!isSearching && displaySweets.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displaySweets.map((sweet) => (
                                <SweetCard
                                    key={sweet.id}
                                    sweet={sweet}
                                    onPurchase={handlePurchase}
                                    onRestock={handleRestock}
                                    isAdmin={isAdmin}
                                />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isSearching && displaySweets.length === 0 && (
                        <div className="text-center py-12">
                            <Candy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {hasActiveFilters ? 'No sweets found' : 'No sweets available'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {hasActiveFilters
                                    ? 'Try adjusting your search criteria'
                                    : 'Check back later for new additions'
                                }
                            </p>
                            {hasActiveFilters && (
                                <button
                                    onClick={() => setSearchFilters({
                                        search: '',
                                        category: '',
                                        price_min: '',
                                        price_max: '',
                                    })}
                                    className="btn-outline"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Add Sweet Modal - for completeness, though mostly replaced by inline form for admin */}
            {showAddModal && (
                <AddSweetModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false)
                        queryClient.invalidateQueries('sweets')
                    }}
                />
            )}
        </div>
    )
}

export default Dashboard