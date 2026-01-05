import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeService from '@/services/api';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Edit, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';

/**
 * Recipe details page - displays full recipe information
 */
const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await recipeService.getRecipeById(id);
            setRecipe(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await recipeService.deleteRecipe(id);
            navigate('/', { replace: true });
        } catch (err) {
            alert(`Failed to delete recipe: ${err.message}`);
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <Loader message="Loading recipe details..." />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="container py-12">
                    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 animate-fade-in">
                        <AlertCircle className="h-12 w-12 text-red-600" />
                        <h3 className="text-xl font-semibold">Error Loading Recipe</h3>
                        <p className="text-gray-600">{error}</p>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => navigate('/')}>
                                Go Home
                            </Button>
                            <Button onClick={fetchRecipe} className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!recipe) {
        return null;
    }

    return (
        <>
            <Header />
            <div className="container py-12 max-w-4xl animate-fade-in">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-6 gap-2 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Recipes
                </Button>

                {/* Recipe Image */}
                {recipe.image && (
                    <div className="mb-8">
                        <div className="w-full h-96 rounded-lg overflow-hidden bg-muted">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.parentElement.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Recipe Header */}
                <div className="mb-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h1 className="text-4xl font-bold">{recipe.title}</h1>
                        {recipe.cookingTime && (
                            <Badge variant="secondary" className="gap-2 text-base px-4 py-2">
                                <Clock className="h-4 w-4" />
                                {recipe.cookingTime} minutes
                            </Badge>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => navigate(`/edit/${recipe._id}`)}
                        >
                            <Edit className="h-4 w-4" />
                            Edit Recipe
                        </Button>
                        <Button
                            variant="destructive"
                            className="gap-2"
                            onClick={() => setDeleteModal(true)}
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete Recipe
                        </Button>
                    </div>
                </div>

                {/* Ingredients */}
                <div>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Ingredients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Instructions */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Instructions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap leading-relaxed">{recipe.instructions}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={deleteModal}
                    onClose={() => setDeleteModal(false)}
                    title="Delete Recipe"
                    footer={
                        <>
                            <Button variant="outline" onClick={() => setDeleteModal(false)} disabled={deleting}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                                {deleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </>
                    }
                >
                    <p>
                        Are you sure you want to delete <strong>{recipe.title}</strong>?
                        This action cannot be undone.
                    </p>
                </Modal>
            </div>
        </>
    );
};

export default RecipeDetails;
