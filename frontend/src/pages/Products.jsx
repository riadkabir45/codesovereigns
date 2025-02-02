
import { useParams } from "react-router";

function Products() {
    const { category } = useParams();
    return (
        <div className="text-center p-10 font-extrabold text-5xl">{category.slice(0,1).toUpperCase() + category.slice(1)}</div>
    );
}

export default Products;