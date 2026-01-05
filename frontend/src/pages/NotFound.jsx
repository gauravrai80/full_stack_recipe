import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Home, ChefHat } from 'lucide-react';

/**
 * 404 Not Found page
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 animate-fade-in">
                <div className="text-center space-y-6 max-w-md">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full shadow-lg">
                        <ChefHat className="h-12 w-12 text-orange-600" />
                    </div>

                    {/* 404 Text */}
                    <h1 className="text-8xl font-bold font-display bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        404
                    </h1>

                    {/* Message */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
                        <p className="text-gray-600">
                            Oops! The recipe you're looking for doesn't exist.
                        </p>
                    </div>

                    {/* Button */}
                    <Button
                        onClick={() => navigate('/')}
                        className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg transition-all duration-300"
                        size="lg"
                    >
                        <Home className="h-5 w-5" />
                        Back to Home
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NotFound;
