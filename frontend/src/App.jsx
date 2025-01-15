import { Routes, Route } from 'react-router-dom';
import ProductDisplay from './pages/product-display/AppProductDisplay';
import ProductSpecification from './pages/product-specification/AppProductSpecification';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<ProductDisplay/>} />
                <Route path='/product' element={<ProductSpecification/>} />
            </Routes>
        </>
    )
}

export default App;