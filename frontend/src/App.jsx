import { Routes, Route } from 'react-router-dom';
import ProductDisplay from './pages/ProdcutList';
import ProductSpecification from './pages/ProductDisplay';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<ProductDisplay/>} />
                <Route path='/product/:productId' element={<ProductSpecification/>} />
            </Routes>
        </>
    )
}

export default App;