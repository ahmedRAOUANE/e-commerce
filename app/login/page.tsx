import Header from "@/components/home-page/header";
import Link from "next/link";
import LoginForm from "@/components/login/login-form";
import { handleSetup } from "@/actions/setup";

export default async function LoginPage() {
    const sm = await handleSetup();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero + Form Section - using grid for two-column layout */}
                <section className="relative py-12 md:py-16 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                    {/* Animated background decorations */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Grid: left side (welcome text) + right side (form) */}
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Left column: Welcome text */}
                            <div>
                                <nav className="flex items-center gap-2 text-sm mb-4 text-white/80">
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                    <span>/</span>
                                    <span className="text-white">Login</span>
                                </nav>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Welcome Back
                                </h1>
                                <p className="text-lg md:text-xl text-white/90">
                                    Sign in to your account and continue shopping
                                </p>
                            </div>

                            {/* Right column: Login Form Card */}
                            <div>
                                {/* Card wrapper - white/dark background with shadow */}
                                <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}