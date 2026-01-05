import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 animate-fade-in">
            <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
            <p className="text-gray-600 font-medium">{message}</p>
        </div>
    );
};

export default Loader;
