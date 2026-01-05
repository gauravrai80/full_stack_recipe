import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Trash2, ChefHat } from 'lucide-react';

const RecipeCard = ({ recipe, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe._id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(recipe);
    };

    return (
        <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-orange-100 hover:-translate-y-2 animate-slide-up">
            {/* Recipe Image */}
            {recipe.image ? (
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-amber-200';
                            fallback.innerHTML = '<svg class="h-16 w-16 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>';
                            e.target.parentElement.appendChild(fallback);
                        }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Delete Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="relative h-48 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
                    <ChefHat className="h-16 w-16 text-orange-400" />
                    {/* Delete Button for no-image cards */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <CardHeader onClick={handleClick}>
                <CardTitle className="text-xl group-hover:text-orange-600 transition-colors duration-300">
                    {recipe.title}
                </CardTitle>
            </CardHeader>

            <CardContent onClick={handleClick}>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-200">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-700">{recipe.cookingTime} mins</span>
                    </div>
                </div>

                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200 hover:from-orange-200 hover:to-amber-200 transition-all duration-300"
                            >
                                {ingredient}
                            </Badge>
                        ))}
                        {recipe.ingredients.length > 3 && (
                            <Badge
                                variant="outline"
                                className="border-orange-300 text-orange-600 hover:bg-orange-50 transition-all duration-300"
                            >
                                +{recipe.ingredients.length - 3} more
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RecipeCard;
