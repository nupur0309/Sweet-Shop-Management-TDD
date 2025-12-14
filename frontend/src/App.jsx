import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import LoadingSpinner from './components/LoadingSpinner'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <LoadingSpinner />
    }

    return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
    const location = useLocation()
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && <Navigation />}

            <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Add more routes as needed */}
                </Routes>
            </main>

            {!isAuthPage && <Footer />}
        </div>
    )
}

export default App
