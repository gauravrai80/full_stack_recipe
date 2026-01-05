import { ChefHat, Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative overflow-hidden py-16 px-4">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 opacity-50" />

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center animate-fade-in">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl animate-scale-in">
                        <ChefHat className="h-10 w-10 text-white" />
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent animate-slide-up">
                        Discover Delicious Recipes
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Create, share, and explore amazing recipes from around the world
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-orange-200">
                            <Sparkles className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium text-gray-700">Easy to Use</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-orange-200">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium text-gray-700">Beautiful Design</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-orange-200">
                            <Sparkles className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium text-gray-700">Free Forever</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
