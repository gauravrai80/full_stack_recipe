import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import AddRecipe from './pages/AddRecipe'
import NotFound from './pages/NotFound'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddRecipe />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
