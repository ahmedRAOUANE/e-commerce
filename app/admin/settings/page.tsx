// app/admin/settings/page.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import {
    Save,
    Store,
    CreditCard,
    Truck,
    Bell,
    Shield,
    Palette,
    Upload,
    CheckCircle,
} from "lucide-react";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // General Settings
    const [generalSettings, setGeneralSettings] = useState({
        storeName: 'E-Commerce Store',
        storeEmail: 'support@example.com',
        storePhone: '+1 (555) 123-4567',
        storeAddress: '123 Main St, New York, NY 10001',
        currency: 'USD',
        timezone: 'America/New_York',
        language: 'en'
    });

    // Payment Settings
    const [paymentSettings, setPaymentSettings] = useState({
        stripeEnabled: true,
        stripePublicKey: 'pk_test_xxxxxxxx',
        stripeSecretKey: 'sk_test_xxxxxxxx',
        paypalEnabled: true,
        paypalClientId: 'xxxxxxxx',
        paypalSecret: 'xxxxxxxx',
        cashOnDelivery: true
    });

    // Shipping Settings
    const [shippingSettings, setShippingSettings] = useState({
        freeShippingEnabled: true,
        freeShippingThreshold: 50,
        flatRate: 5.99,
        shippingZones: [
            { name: 'United States', countries: ['US'], rate: 5.99 },
            { name: 'Canada', countries: ['CA'], rate: 9.99 },
            { name: 'International', countries: ['*'], rate: 14.99 }
        ]
    });

    // Notification Settings
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        orderConfirmation: true,
        shippingUpdates: true,
        promotionalEmails: false,
        lowStockAlerts: true,
        newUserRegistration: true
    });

    const handleInputChange = (section: string, field: string, value: unknown) => {
        setHasUnsavedChanges(true);

        switch (section) {
            case 'general':
                setGeneralSettings(prev => ({ ...prev, [field]: value }));
                break;
            case 'payment':
                setPaymentSettings(prev => ({ ...prev, [field]: value }));
                break;
            case 'shipping':
                setShippingSettings(prev => ({ ...prev, [field]: value }));
                break;
            case 'notifications':
                setNotificationSettings(prev => ({ ...prev, [field]: value }));
                break;
        }
    };

    const handleSave = () => {
        // In a real app, you would save to your backend
        console.log('Saving settings:', {
            generalSettings,
            paymentSettings,
            shippingSettings,
            notificationSettings
        });
        setHasUnsavedChanges(false);
        // Show success message
    };

    const tabs = [
        { id: 'general', name: 'General', icon: Store },
        { id: 'payment', name: 'Payment', icon: CreditCard },
        { id: 'shipping', name: 'Shipping', icon: Truck },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'appearance', name: 'Appearance', icon: Palette }
    ];

    const currencies = [
        { value: 'USD', label: 'US Dollar ($)' },
        { value: 'EUR', label: 'Euro (€)' },
        { value: 'GBP', label: 'British Pound (£)' },
        { value: 'CAD', label: 'Canadian Dollar (C$)' }
    ];

    const timezones = [
        { value: 'America/New_York', label: 'Eastern Time (ET)' },
        { value: 'America/Chicago', label: 'Central Time (CT)' },
        { value: 'America/Denver', label: 'Mountain Time (MT)' },
        { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-12 md:py-16 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden rounded-2xl mb-8">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm mb-4 text-white/80">
                            <Link href="/admin" className="hover:text-white transition-colors">
                                Admin
                            </Link>
                            <span>/</span>
                            <span className="text-white">Settings</span>
                        </nav>

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-top">
                                    Store Settings
                                </h1>
                                <p className="text-lg md:text-xl text-white/90 animate-slide-in-top animate-delay-100">
                                    Manage your store configuration and preferences
                                </p>
                            </div>

                            {hasUnsavedChanges && (
                                <button
                                    onClick={handleSave}
                                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-lg rounded-xl hover:bg-white/30 transition-all duration-200 animate-slide-in-right"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Save Changes</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-64 shrink-0">
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-left">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === tab.id
                                                    ? 'bg-linear-to-r from-primary-blue to-primary-purple text-white shadow-lg'
                                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{tab.name}</span>
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Quick Stats */}
                            <div className="mt-8 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    Store Status
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Store Live</span>
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">SSL Enabled</span>
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Backup</span>
                                        <span className="text-green-500 text-sm">24h ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Settings Content */}
                    <div className="flex-1">
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-right">
                            {/* General Settings */}
                            {activeTab === 'general' && (
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-linear-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center">
                                            <Store className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">General Settings</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Store Name *
                                            </label>
                                            <input
                                                title="store name"
                                                type="text"
                                                value={generalSettings.storeName}
                                                onChange={(e) => handleInputChange('general', 'storeName', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Store Email *
                                            </label>
                                            <input
                                                title="store email"
                                                type="email"
                                                value={generalSettings.storeEmail}
                                                onChange={(e) => handleInputChange('general', 'storeEmail', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Store Phone
                                            </label>
                                            <input
                                                title="store phone"
                                                type="text"
                                                value={generalSettings.storePhone}
                                                onChange={(e) => handleInputChange('general', 'storePhone', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Currency
                                            </label>
                                            <select
                                                title="currency"
                                                value={generalSettings.currency}
                                                onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            >
                                                {currencies.map(currency => (
                                                    <option key={currency.value} value={currency.value}>
                                                        {currency.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Timezone
                                            </label>
                                            <select
                                                title="timezone"
                                                value={generalSettings.timezone}
                                                onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            >
                                                {timezones.map(timezone => (
                                                    <option key={timezone.value} value={timezone.value}>
                                                        {timezone.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Language
                                            </label>
                                            <select
                                                title="language"
                                                value={generalSettings.language}
                                                onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="fr">French</option>
                                                <option value="de">German</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Store Address
                                        </label>
                                        <textarea
                                            title="stire address"
                                            value={generalSettings.storeAddress}
                                            onChange={(e) => handleInputChange('general', 'storeAddress', e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Payment Settings */}
                            {activeTab === 'payment' && (
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-linear-to-r from-primary-purple to-primary-pink rounded-xl flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Settings</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Stripe Settings */}
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                                        <CreditCard className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">Stripe</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Credit card payments</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        title="payment"
                                                        type="checkbox"
                                                        checked={paymentSettings.stripeEnabled}
                                                        onChange={(e) => handleInputChange('payment', 'stripeEnabled', e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
                                                </label>
                                            </div>

                                            {paymentSettings.stripeEnabled && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Public Key
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                title="public key"
                                                                type="text"
                                                                value={paymentSettings.stripePublicKey}
                                                                onChange={(e) => handleInputChange('payment', 'stripePublicKey', e.target.value)}
                                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Secret Key
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                title="title"
                                                                type="password"
                                                                value={paymentSettings.stripeSecretKey}
                                                                onChange={(e) => handleInputChange('payment', 'stripeSecretKey', e.target.value)}
                                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* PayPal Settings */}
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                                                        <CreditCard className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">PayPal</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">PayPal payments</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        title="title"
                                                        type="checkbox"
                                                        checked={paymentSettings.paypalEnabled}
                                                        onChange={(e) => handleInputChange('payment', 'paypalEnabled', e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.2 after:left-0.2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
                                                </label>
                                            </div>

                                            {paymentSettings.paypalEnabled && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Client ID
                                                        </label>
                                                        <input
                                                            title="title"
                                                            type="text"
                                                            value={paymentSettings.paypalClientId}
                                                            onChange={(e) => handleInputChange('payment', 'paypalClientId', e.target.value)}
                                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Secret Key
                                                        </label>
                                                        <input
                                                            title="title"
                                                            type="password"
                                                            value={paymentSettings.paypalSecret}
                                                            onChange={(e) => handleInputChange('payment', 'paypalSecret', e.target.value)}
                                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Cash on Delivery */}
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                                        <CreditCard className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">Cash on Delivery</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Pay when you receive</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        title="title"
                                                        type="checkbox"
                                                        checked={paymentSettings.cashOnDelivery}
                                                        onChange={(e) => handleInputChange('payment', 'cashOnDelivery', e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.2 after:left-0.2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Shipping Settings */}
                            {activeTab === 'shipping' && (
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-linear-to-r from-accent-green to-primary-blue rounded-xl flex items-center justify-center">
                                            <Truck className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Shipping Settings</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Free Shipping */}
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                                        <Truck className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">Free Shipping</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Offer free shipping on orders above threshold</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        title="title"
                                                        type="checkbox"
                                                        checked={shippingSettings.freeShippingEnabled}
                                                        onChange={(e) => handleInputChange('shipping', 'freeShippingEnabled', e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.2 after:left-0.2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
                                                </label>
                                            </div>

                                            {shippingSettings.freeShippingEnabled && (
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Free Shipping Threshold ($)
                                                    </label>
                                                    <input
                                                        title="title"
                                                        type="number"
                                                        value={shippingSettings.freeShippingThreshold}
                                                        onChange={(e) => handleInputChange('shipping', 'freeShippingThreshold', parseFloat(e.target.value))}
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Flat Rate Shipping */}
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Flat Rate Shipping</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Standard Rate ($)
                                                        </label>
                                                        <input
                                                            title="title"
                                                            type="number"
                                                            step="0.01"
                                                            value={shippingSettings.flatRate}
                                                            onChange={(e) => handleInputChange('shipping', 'flatRate', parseFloat(e.target.value))}
                                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping Zones */}
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Shipping Zones</h3>
                                            <div className="space-y-4">
                                                {shippingSettings.shippingZones.map((zone, index) => (
                                                    <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900 dark:text-white">{zone.name}</h4>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {zone.countries[0] === '*' ? 'All countries' : zone.countries.join(', ')}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-gray-900 dark:text-white">${zone.rate}</p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Shipping rate</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notification Settings */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-linear-to-r from-accent-yellow to-primary-pink rounded-xl flex items-center justify-center">
                                            <Bell className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Settings</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">Email Notifications</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your email notification preferences</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        title="title"
                                                        type="checkbox"
                                                        checked={notificationSettings.emailNotifications}
                                                        onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.2 after:left-0.2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
                                                </label>
                                            </div>

                                            {notificationSettings.emailNotifications && (
                                                <div className="space-y-4">
                                                    {[
                                                        { key: 'orderConfirmation', label: 'Order Confirmation', description: 'Send confirmation emails when orders are placed' },
                                                        { key: 'shippingUpdates', label: 'Shipping Updates', description: 'Notify customers about shipping status changes' },
                                                        { key: 'promotionalEmails', label: 'Promotional Emails', description: 'Send marketing and promotional emails' },
                                                        { key: 'lowStockAlerts', label: 'Low Stock Alerts', description: 'Get notified when products are running low' },
                                                        { key: 'newUserRegistration', label: 'New User Registration', description: 'Notify when new customers register' }
                                                    ].map((item) => (
                                                        <div key={item.key} className="flex items-center justify-between">
                                                            <div>
                                                                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    title="title"
                                                                    type="checkbox"
                                                                    checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                                                                    onChange={(e) => handleInputChange('notifications', item.key, e.target.checked)}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.2 after:left-0.2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Settings */}
                            {activeTab === 'security' && (
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-linear-to-r from-primary-blue to-accent-green rounded-xl flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                                                </div>
                                                <button className="px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity">
                                                    Enable 2FA
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Session Management</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">Current Session</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Active now</p>
                                                    </div>
                                                    <button className="px-3 py-1 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Data & Privacy</h3>
                                            <div className="space-y-3">
                                                <button className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                    <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Download all your store data</p>
                                                </button>
                                                <button className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                    <p className="font-medium text-red-600 dark:text-red-400">Delete Account</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your store account</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Appearance Settings */}
                            {activeTab === 'appearance' && (
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-linear-to-r from-primary-purple to-accent-pink rounded-xl flex items-center justify-center">
                                            <Palette className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance Settings</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Theme</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    { name: 'Light', value: 'light', active: true },
                                                    { name: 'Dark', value: 'dark', active: false },
                                                    { name: 'Auto', value: 'auto', active: false }
                                                ].map((theme) => (
                                                    <button
                                                        key={theme.value}
                                                        className={`p-4 rounded-xl border-2 text-left transition-all ${theme.active
                                                                ? 'border-primary-purple bg-primary-purple/10'
                                                                : 'border-gray-200 dark:border-gray-700 hover:border-primary-purple/50'
                                                            }`}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`w-3 h-3 rounded-full ${theme.active ? 'bg-primary-purple' : 'bg-gray-300 dark:bg-gray-600'
                                                                }`} />
                                                            <span className="font-medium text-gray-900 dark:text-white">{theme.name}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Customization</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Primary Color
                                                    </label>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-primary-purple rounded-lg border border-gray-200"></div>
                                                        <input
                                                            title="title"
                                                            type="text"
                                                            value="#9333ea"
                                                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Logo
                                                    </label>
                                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center">
                                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Click to upload or drag and drop
                                                        </p>
                                                        <input type="file" className="hidden" id="logo-upload" />
                                                        <label
                                                            htmlFor="logo-upload"
                                                            className="inline-block mt-2 px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                                                        >
                                                            Upload Logo
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            {hasUnsavedChanges && (
                                <div className="flex justify-end pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save Changes</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;