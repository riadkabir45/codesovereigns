import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postToCart } from "@/features/cart/cartSlice";

function ProductDisplay() {
  const { productID } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL;
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios(`${backend}/products/${productID}`).then((res) => {
      if (res.status !== 200) {
        console.error(res.error);
      } else {
        const data = res.data;
        if (data.success) {
          setProductInfo(data.data);
        }
      }
    });
  }, []);

  if (productInfo != null)
    return (
      <>
        <div className="grow flex flex-col items-center justify-center lg:flex-row p-10 gap-5">
          <img
            className="h-full w-auto border border-black p-5"
            src={productInfo.image}
            alt={productInfo.name}
          />
          <div className="max-w-xl flex flex-col gap-5 break-words">
            <span className="text-xl font-bolder">{productInfo.name}</span>
            <span className="text-3xl">{productInfo.price}</span>
            <span className="text-lg text-slate-500">
              {productInfo.description}
            </span>
            {user?.id && (
              <Button className="w-fit">
                <button
                  onClick={() =>
                    dispatch(
                      postToCart({
                        userId: user?.id,
                        productId: productInfo.id,
                        productPrice: productInfo.price,
                      })
                    )
                  }
                >
                  Add to cart
                </button>
              </Button>
            )}
            <ScrollArea className="lg:h-52">
              {Object.entries(productInfo.features).map(([index, feature]) => (
                <div key={index}>
                  <span className="block">{feature[0]} </span>
                  <span className="text-slate-500">{feature[1]}</span>
                  <br /> <br />
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* <div className="flex flex-col gap-5 p-10 max-w-5xl mx-auto">
            {
              Object.entries(productInfo.features).map(([index,feature]) => (
                  <div className="" key={index}>
                      <span className="text-3xl font-bolder">{feature[0]}</span><br />
                      <span className="text-slate-600">{feature[1]}</span>
                  </div>
              ))
            }
          </div> */}
        </div>
      </>
    );
  else return <span>Data not found</span>;
}

export default ProductDisplay;
