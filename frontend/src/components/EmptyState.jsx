import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 animate-fade-in">
            <div className="p-6 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full shadow-lg">
                <ChefHat className="h-16 w-16 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold font-display bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                No Recipes Yet
            </h3>
            <p className="text-gray-600 text-center max-w-md">
                Start building your recipe collection by adding your first recipe!
            </p>
        </div>
    );
};

export default EmptyState;
