import { useState, useEffect } from 'react';
import recipeService from '@/services/api';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RecipeCard from '@/components/RecipeCard';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

/**
 * Home page - displays all recipes
 */
const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, recipe: null });
    const [deleting, setDeleting] = useState(false);

    // Fetch recipes on mount
    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await recipeService.getAllRecipes();
            setRecipes(response.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (recipe) => {
        setDeleteModal({ isOpen: true, recipe });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.recipe) return;

        try {
            setDeleting(true);
            await recipeService.deleteRecipe(deleteModal.recipe._id);

            // Remove from local state
            setRecipes(recipes.filter(r => r._id !== deleteModal.recipe._id));

            // Close modal
            setDeleteModal({ isOpen: false, recipe: null });
        } catch (err) {
            alert(`Failed to delete recipe: ${err.message}`);
        } finally {
            setDeleting(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, recipe: null });
    };

    if (loading) {
        return (
            <>
                <Header />
                <Loader message="Loading recipes..." />
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
                        <h3 className="text-xl font-semibold">Error Loading Recipes</h3>
                        <p className="text-gray-600">{error}</p>
                        <Button onClick={fetchRecipes} className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                            Try Again
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    if (recipes.length === 0) {
        return (
            <>
                <Header />
                <Hero />
                <div className="container py-12">
                    <EmptyState />
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <Hero />
            <div className="container py-12">
                <div className="mb-8 animate-fade-in">
                    <h2 className="text-3xl font-bold font-display mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        All Recipes
                    </h2>
                    <p className="text-gray-600">
                        Discover and manage your collection of {recipes.length} delicious {recipes.length === 1 ? 'recipe' : 'recipes'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe, index) => (
                        <div
                            key={recipe._id}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <RecipeCard
                                recipe={recipe}
                                onDelete={handleDeleteClick}
                            />
                        </div>
                    ))}
                </div>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={deleteModal.isOpen}
                    onClose={handleDeleteCancel}
                    title="Delete Recipe"
                    footer={
                        <>
                            <Button variant="outline" onClick={handleDeleteCancel} disabled={deleting}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                disabled={deleting}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </>
                    }
                >
                    <p>
                        Are you sure you want to delete <strong>{deleteModal.recipe?.title}</strong>?
                        This action cannot be undone.
                    </p>
                </Modal>
            </div>
        </>
    );
};

export default Home;
