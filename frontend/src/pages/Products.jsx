import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { isEqual } from "lodash";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/Card";
import { Button } from "@/components/ui/button";
  

function Products() {

    const [products,setProducts] = useState([]);
    const backend = import.meta.env.VITE_BACKEDN_SERVER;
    const { category } = useParams();
    
    
    useEffect(() => {
        fetch(backend + '/api/products/category/' + category).then(res => {
            if(!res.ok){
                console.error(res.error);
            }else{
                res.json().then(data => {
                    if(data.success){
                        if(data.data == null)
                            setProducts([]);
                        else if(!isEqual(data.data,products))
                            setProducts(data.data);
                    }
                    
                })
            }
        });
    },[products]);

    return (
        <>
            <div className="text-center p-10 font-extrabold text-5xl">{category.slice(0,1).toUpperCase() + category.slice(1)}</div>
            <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mx-10 mb-10">
                {
                    products.map((value,index) => (
                            <Card className="border border-black rounded-none flex flex-col justify-between" key={index}>
                                <div>
                                    <CardContent>
                                        <img src={value.image} alt={value.name} className="mx-auto" />
                                    </CardContent>
                                    <CardHeader>
                                        <CardTitle>{value.name}</CardTitle>
                                        <CardDescription>{value.description}</CardDescription>
                                    </CardHeader>
                                </div>
                                <CardFooter>
                                    <Button>View Product</Button>
                                </CardFooter>
                            </Card>
                    ))
                }
            </div>
        </>
    );
}

export default Products;