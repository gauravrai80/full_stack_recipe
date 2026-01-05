import { useNavigate, useLocation } from 'react-router-dom';
import { ChefHat, Home, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-orange-200/50 bg-white/80 backdrop-blur-lg shadow-sm animate-slide-down">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <ChefHat className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-display font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        FlavorHub
                    </span>
                </div>

                {/* Navigation Buttons */}
                <nav className="flex items-center gap-3">
                    <Button
                        variant={isActive('/') ? 'default' : 'ghost'}
                        className={`gap-2 transition-all duration-300 ${isActive('/')
                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg hover:scale-105'
                                : 'hover:bg-orange-50 hover:text-orange-600'
                            }`}
                        onClick={() => navigate('/')}
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Button>

                    <Button
                        variant={isActive('/add') ? 'default' : 'outline'}
                        className={`gap-2 transition-all duration-300 ${isActive('/add')
                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-md hover:shadow-lg hover:scale-105'
                                : 'border-orange-300 text-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:border-0 hover:shadow-md hover:scale-105'
                            }`}
                        onClick={() => navigate('/add')}
                    >
                        <Plus className="h-4 w-4" />
                        Add Recipe
                    </Button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
