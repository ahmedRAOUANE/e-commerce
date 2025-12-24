// app/admin/page.tsx
import Link from "next/link";
import {
    ShoppingCart,
    Users,
    Package,
    BarChart3,
    DollarSign,
    TrendingUp,
    Eye,
    MoreHorizontal,
    ArrowUp,
    ArrowDown
} from "lucide-react";

// Mock data
const statsData = [
    {
        label: 'Total Revenue',
        value: '$24,580',
        change: '+12%',
        changeType: 'increase' as const,
        icon: DollarSign,
        color: 'from-blue-600 to-purple-600'
    },
    {
        label: 'Orders',
        value: '1,248',
        change: '+8%',
        changeType: 'increase' as const,
        icon: ShoppingCart,
        color: 'from-purple-600 to-pink-600'
    },
    {
        label: 'Customers',
        value: '892',
        change: '+15%',
        changeType: 'increase' as const,
        icon: Users,
        color: 'from-pink-600 to-blue-600'
    },
    {
        label: 'Products',
        value: '156',
        change: '+3%',
        changeType: 'increase' as const,
        icon: Package,
        color: 'from-green-400 to-blue-500'
    }
];

const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2024-01-15', amount: '$129.99', status: 'completed' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2024-01-15', amount: '$89.99', status: 'processing' },
    { id: '#ORD-003', customer: 'Mike Johnson', date: '2024-01-14', amount: '$249.99', status: 'completed' },
    { id: '#ORD-004', customer: 'Sarah Wilson', date: '2024-01-14', amount: '$59.99', status: 'pending' }
];

const popularProducts = [
    { name: 'Wireless Headphones', sales: 124, revenue: '$15,480', stock: 45 },
    { name: 'Smart Watch', sales: 89, revenue: '$13,350', stock: 12 },
    { name: 'Laptop Backpack', sales: 156, revenue: '$7,800', stock: 78 },
    { name: 'Phone Case', sales: 203, revenue: '$4,060', stock: 231 }
];

const AdminHomePage = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-12 md:py-16 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden rounded-2xl">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm mb-4 text-white/80">
                            <Link href="/" className="hover:text-white transition-colors">
                                Admin
                            </Link>
                            <span>/</span>
                            <span className="text-white">Dashboard</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-top">
                            Welcome To Your Admin Page
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 animate-slide-in-top animate-delay-100">
                            Here you can manage your products and categories
                        </p>
                    </div>
                </div>
            </section>

            {/* Dashboard Content */}
            <section className="py-8 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statsData.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 dark:border-gray-700/20 animate-slide-in-top"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color}`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
                                </div>

                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    {stat.label}
                                </h3>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.value}
                                </p>

                                <div className="flex items-center">
                                    <span className={`inline-flex items-center text-sm font-medium ${stat.changeType === 'increase'
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {stat.changeType === 'increase' ? (
                                            <ArrowUp className="w-4 h-4 mr-1" />
                                        ) : (
                                            <ArrowDown className="w-4 h-4 mr-1" />
                                        )}
                                        {stat.change}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                        from last week
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Orders */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 dark:border-gray-700/20 animate-slide-in-left">
                            <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Recent Orders
                                    </h2>
                                    <Link
                                        href="/admin/orders"
                                        className="text-primary-purple hover:text-primary-blue transition-colors text-sm font-medium"
                                    >
                                        View All
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentOrders.map((order, index) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 animate-slide-in-left"
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {order.id}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {order.customer} • {order.date}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    {order.amount}
                                                </p>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'completed'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                            : order.status === 'processing'
                                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Popular Products */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 dark:border-gray-700/20 animate-slide-in-right">
                            <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Popular Products
                                    </h2>
                                    <Link
                                        href="/admin/products"
                                        className="text-primary-purple hover:text-primary-blue transition-colors text-sm font-medium"
                                    >
                                        View All
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-6">
                                    {popularProducts.map((product, index) => (
                                        <div
                                            key={product.name}
                                            className="flex items-center justify-between animate-slide-in-right"
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-linear-to-r from-accent-pink to-primary-purple rounded-xl flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {product.sales} sales • {product.stock} in stock
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    {product.revenue}
                                                </p>

                                                <div className="flex items-center space-x-2 mt-1">
                                                    <button 
                                                        title={`${product.sales} people baught this product`} 
                                                        type="button"
                                                        className="p-1 text-gray-400 hover:text-primary-blue transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats & Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        {/* Performance Chart Placeholder */}
                        <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 dark:border-gray-700/20 p-6 animate-slide-in-bottom">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Performance Overview
                                </h2>
                                <TrendingUp className="w-6 h-6 text-primary-purple" />
                            </div>

                            {/* Simple chart placeholder */}
                            <div className="h-64 flex items-end justify-between space-x-2">
                                {[65, 45, 75, 35, 85, 55, 95].map((height, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full bg-linear-to-t from-primary-blue to-primary-purple rounded-t-lg transition-all duration-300 hover:opacity-80"
                                            style={{ height: `${height}%` }}
                                        />
                                        <span className="text-xs text-gray-500 mt-2">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-linear-to-br from-primary-blue via-primary-purple to-primary-pink rounded-2xl p-6 text-white animate-zoom-in">
                            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

                            <div className="space-y-3">
                                <Link
                                    href="/admin/products/new"
                                    className="flex items-center space-x-3 p-3 bg-white/20 backdrop-blur-lg rounded-xl hover:bg-white/30 transition-all duration-200"
                                >
                                    <Package className="w-5 h-5" />
                                    <span>Add New Product</span>
                                </Link>

                                <Link
                                    href="/admin/categories/new"
                                    className="flex items-center space-x-3 p-3 bg-white/20 backdrop-blur-lg rounded-xl hover:bg-white/30 transition-all duration-200"
                                >
                                    <BarChart3 className="w-5 h-5" />
                                    <span>Manage Categories</span>
                                </Link>

                                <Link
                                    href="/admin/settings"
                                    className="flex items-center space-x-3 p-3 bg-white/20 backdrop-blur-lg rounded-xl hover:bg-white/30 transition-all duration-200"
                                >
                                    <Users className="w-5 h-5" />
                                    <span>Store Settings</span>
                                </Link>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/20">
                                <p className="text-sm text-white/80 mb-3">Need help?</p>
                                <button type="button" className="cursor-pointer w-full bg-white text-primary-purple py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminHomePage;