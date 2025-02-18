import { useParams } from "react-router";
import { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function ProductDisplay() {

    const { productID } = useParams();
    const [productInfo,setProductInfo] = useState(null);
    const backend = import.meta.env.VITE_BACKEDN_SERVER;
    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
      )

    useEffect(() => {
        fetch(`http://${window.location.hostname}:${backend}` + '/api/products/' + productID).then(res => {
            if(!res.ok){
                console.error(res.error);
            }else{
                res.json().then(data => {
                    if(data.success){
                        setProductInfo(data.data);
                    }
                    
                })
            }
        });
    },[]);

    if(productInfo != null)
        return (
            <>
                <div className="grow flex flex-col items-center justify-center lg:flex-row p-10 gap-5">
                    <img className="h-full w-auto border border-black p-5" src={productInfo.image} alt={productInfo.name} />
                    <div className="max-w-xl flex flex-col gap-5 break-words">
                        <span className="text-xl font-bolder">{productInfo.name}</span>
                        <span className="text-3xl">{productInfo.price}</span>
                        <span className="text-lg text-slate-500">{productInfo.description}</span>
                        <Button className="w-fit">Add to cart</Button>
                        <ScrollArea className="lg:h-52">
                            {
                                Object.entries(productInfo.features).map(([index,feature]) => (
                                    <div  key={index}>
                                        <span className="block">{feature[0]} </span>
                                        <span className="text-slate-500">{feature[1]}</span>
                                        <br /> <br />
                                    </div>
                                ))
                            }
                        </ScrollArea>
                    </div>

                    <div className="hidden flex flex-col gap-5 p-10 max-w-5xl mx-auto">
                        {
                            // Object.entries(productInfo.features).map(([index,feature]) => (
                            //     <div className="" key={index}>
                            //         <span className="text-3xl font-bolder">{feature[0]}</span><br />
                            //         <span className="text-slate-600">{feature[1]}</span>
                            //     </div>
                            // ))
                        }
                    </div>
                </div>
            </>
        );
    else return (
        <span>Data not found</span>
    );
}

export default ProductDisplay;