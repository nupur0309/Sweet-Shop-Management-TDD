import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { Candy, Eye, EyeOff, User, Lock } from 'lucide-react'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const result = await login(data.username, data.password)
            if (result.success) {
                navigate('/')
            }
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-300/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-24 w-24 sweet-gradient rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-glow">
                        <Candy className="h-12 w-12 text-white animate-float" />
                    </div>
                    <h2 className="text-4xl font-bold text-gradient mb-3">
                        {location.state?.justRegistered && location.state?.username
                            ? `Welcome ${location.state.username}`
                            : 'Welcome'}
                    </h2>
                    <p className="text-gray-700 text-lg font-medium">
                        Sign in to your Sweet Shop account
                    </p>
                </div>

                {/* Login Form */}
                <div className="card p-10 animate-glow">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-bold text-gray-800 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-primary-500" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    {...register('username', {
                                        required: 'Username is required',
                                        minLength: {
                                            value: 3,
                                            message: 'Username must be at least 3 characters',
                                        },
                                    })}
                                    className="input-field pl-12 text-base"
                                    placeholder="Enter your username"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-2 text-sm text-red-600 font-medium">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-primary-500" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                    className="input-field pl-12 pr-12 text-base"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-500 hover:text-primary-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-500 hover:text-primary-600" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed text-base py-4"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <Candy className="w-6 h-6" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-700 font-medium">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="font-bold text-primary-600 hover:text-primary-700 transition-colors underline decoration-2 underline-offset-2"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
                        <h3 className="text-sm font-bold text-gray-800 mb-3">Demo Credentials</h3>
                        <div className="text-sm text-gray-700 space-y-2 font-medium">
                            <p><strong className="text-primary-600">Admin:</strong> admin / admin123</p>
                            <p><strong className="text-secondary-600">User:</strong> user / user123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login 