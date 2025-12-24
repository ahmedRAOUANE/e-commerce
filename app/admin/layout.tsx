import Aside from "@/components/admin/aside";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-background relative">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200/20 dark:bg-gray-800/80 h-18">
                <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-4">
                    <h1 className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="text-xl font-bold text-foreground hidden sm:block">
                            E-Commerce Admin
                        </span>
                    </h1>

                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-linear-to-r from-accent-green to-primary-blue rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">A</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex md:gap-8 p-4 md:p-6 lg:p-8 min-h-screen items-start">
                    <Aside />

                    <main className="px-4 flex-1 min-w-0">
                        {children}
                    </main>
                </div>
        </div>
    );
}

export default AdminLayout;