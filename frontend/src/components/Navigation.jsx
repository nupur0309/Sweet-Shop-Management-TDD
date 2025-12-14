import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Cookie, Menu, X, User, LogOut, ShoppingCart, Heart } from 'lucide-react'

const Navigation = () => {
    const { user, isAuthenticated, logout, isAdmin } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="relative z-50 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 pb-12">
            <div className="container mx-auto px-6 pt-4">
                <div className="flex items-center justify-between h-20 relative z-10 w-full">

                    {/* Left Side: Dashboard (Auth Only) */}
                    <div className="hidden md:flex items-center flex-1 justify-start">
                        {isAuthenticated && (
                            <Link
                                to="/#available-sweets"
                                onClick={(e) => {
                                    if (window.location.pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('available-sweets')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="text-gray-800 hover:text-pink-600 font-bold text-xs tracking-[0.2em] uppercase transition-colors"
                            >
                                DASHBOARD
                            </Link>
                        )}
                    </div>

                    {/* Center: Logo (No Hearts) */}
                    <div className="flex-shrink-0 flex items-center justify-center px-4 relative">
                        <Link to="/" className="text-5xl text-gray-900 px-4 whitespace-nowrap" style={{ fontFamily: "'Great Vibes', cursive" }}>
                            Sweet Shop
                        </Link>
                    </div>

                    {/* Right Side: Auth Links / User Actions */}
                    <div className="hidden md:flex items-center flex-1 justify-end space-x-8">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-6">
                                {isAdmin && (
                                    <span className="bg-pink-100 text-pink-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-pink-200">
                                        Admin
                                    </span>
                                )}
                                <div className="flex items-center space-x-2 text-gray-800">
                                    <User className="w-4 h-4" />
                                    <span className="text-xs font-bold tracking-widest uppercase">{user?.username}</span>
                                </div>
                                <button onClick={handleLogout} className="text-gray-800 hover:text-red-500 transition-colors" title="Logout">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-8">
                                <Link to="/login" className="text-gray-800 hover:text-pink-600 font-bold text-xs tracking-[0.2em] uppercase transition-colors">
                                    LOGIN
                                </Link>
                                <Link to="/register" className="text-gray-800 hover:text-pink-600 font-bold text-xs tracking-[0.2em] uppercase transition-colors">
                                    REGISTER
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center absolute right-0">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-800"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Curved Bottom matching the gradient */}
            <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[200%] bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-[100%] z-[-1] shadow-sm"></div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 z-40 border-t border-white/20 py-4 px-6 shadow-lg">
                    <div className="flex flex-col space-y-4 text-center">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/#available-sweets"
                                    onClick={(e) => {
                                        if (window.location.pathname === '/') {
                                            e.preventDefault();
                                            document.getElementById('available-sweets')?.scrollIntoView({ behavior: 'smooth' });
                                            setIsMenuOpen(false);
                                        }
                                    }}
                                    className="text-gray-800 font-bold uppercase tracking-widest text-xs py-2"
                                >
                                    DASHBOARD
                                </Link>
                                <div className="text-gray-600 text-xs font-medium py-1">Signed in as {user?.username}</div>
                                <button onClick={handleLogout} className="text-red-500 font-bold uppercase tracking-widest text-xs py-2">LOGOUT</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-800 font-bold uppercase tracking-widest text-xs py-2">LOGIN</Link>
                                <Link to="/register" className="text-gray-800 font-bold uppercase tracking-widest text-xs py-2">REGISTER</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation