
"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";
import {
    ShoppingCart,
    Users,
    Package,
    BarChart3,
    Settings,
    Home
} from "lucide-react";

const Aside = () => {
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: Home, current: pathname === '/admin' },
        { name: 'Products', href: '/admin/products', icon: Package, current: pathname === '/admin/products' },
        { name: 'Categories', href: '/admin/categories', icon: BarChart3, current: pathname === '/admin/categories' },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, current: pathname === '/admin/orders' },
        { name: 'Customers', href: '/admin/customers', icon: Users, current: pathname === '/admin/customers' },
        { name: 'Settings', href: '/admin/settings', icon: Settings, current: pathname === '/admin/settings' },
    ];
    return (
        <aside className="flex flex-col gap-2 md:w-64 sticky top-25">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center md:space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${item.current
                        ? 'bg-linear-to-r from-primary-blue to-primary-purple text-white shadow-lg'
                        : 'text-foreground hover:bg-primary-blue/20 hover:border hover:border-primary-blue/30'
                        }`}
                >
                    <item.icon className={`w-5 h-5 ${item.current ? 'text-white' : 'text-primary-purple group-hover:text-primary-blue'
                        }`} />
                    <span className="font-medium hidden md:block">{item.name}</span>
                </Link>
            ))}
        </aside>
    )
}

export default Aside