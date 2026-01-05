import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import recipeService from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, ArrowLeft, Loader2 } from 'lucide-react';

/**
 * Add Recipe page - form to create a new recipe
 */
const AddRecipe = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: [''],
        instructions: '',
        cookingTime: '',
        image: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData(prev => ({
            ...prev,
            ingredients: newIngredients
        }));
    };

    const addIngredient = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, '']
        }));
    };

    const removeIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            const newIngredients = formData.ingredients.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                ingredients: newIngredients
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.title.trim()) {
            setError('Please enter a recipe title');
            return;
        }
        if (!formData.description.trim()) {
            setError('Please enter a description');
            return;
        }
        if (!formData.instructions.trim()) {
            setError('Please enter cooking instructions');
            return;
        }
        if (!formData.cookingTime || formData.cookingTime <= 0) {
            setError('Please enter a valid cooking time');
            return;
        }

        // Filter out empty ingredients
        const ingredients = formData.ingredients.filter(ing => ing.trim() !== '');
        if (ingredients.length === 0) {
            setError('Please add at least one ingredient');
            return;
        }

        try {
            setLoading(true);
            const recipeData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                ingredients,
                instructions: formData.instructions.trim(),
                cookingTime: parseInt(formData.cookingTime),
                image: formData.image.trim() || undefined
            };

            await recipeService.createRecipe(recipeData);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to create recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container py-12 max-w-3xl animate-fade-in">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-6 gap-2 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Recipes
                </Button>

                <Card className="border-orange-100 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                        <CardTitle className="text-3xl font-display bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            Add New Recipe
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 animate-slide-down">
                                    {error}
                                </div>
                            )}

                            {/* Title */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                    Recipe Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Chocolate Chip Cookies"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Brief description of your recipe..."
                                    required
                                />
                            </div>

                            {/* Ingredients */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Ingredients *
                                </label>
                                <div className="space-y-2">
                                    {formData.ingredients.map((ingredient, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={ingredient}
                                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                                className="flex-1 px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                placeholder={`Ingredient ${index + 1}`}
                                            />
                                            {formData.ingredients.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => removeIngredient(index)}
                                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addIngredient}
                                        className="w-full gap-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Ingredient
                                    </Button>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="space-y-2">
                                <label htmlFor="instructions" className="block text-sm font-semibold text-gray-700">
                                    Cooking Instructions *
                                </label>
                                <textarea
                                    id="instructions"
                                    name="instructions"
                                    value={formData.instructions}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Step-by-step cooking instructions..."
                                    required
                                />
                            </div>

                            {/* Cooking Time */}
                            <div className="space-y-2">
                                <label htmlFor="cookingTime" className="block text-sm font-semibold text-gray-700">
                                    Cooking Time (minutes) *
                                </label>
                                <input
                                    type="number"
                                    id="cookingTime"
                                    name="cookingTime"
                                    value={formData.cookingTime}
                                    onChange={handleInputChange}
                                    min="1"
                                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="e.g., 30"
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
                                    Image URL (optional)
                                </label>
                                <input
                                    type="url"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/')}
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-4 w-4" />
                                            Create Recipe
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default AddRecipe;
