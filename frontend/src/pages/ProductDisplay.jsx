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
      <section className="flex flex-col gap-5 w-full justify-center items-center p-10">
        <div className="grow flex flex-col items-center justify-center lg:flex-row gap-5">
          <img
            className="border rounded-lg shadow-lg w-72 h-72  sm:w-96 sm:h-96 object-cover p-1 sm:p-3 md:p-5"
            src={productInfo.image}
            alt={productInfo.name}
          />
          <div className="max-w-xl flex flex-col gap-5 break-words">
            <span className="text-3xl font-extrabold capitalize">{productInfo.name}</span>
            <div className="flex gap-5 flex-wrap">
              <span className="bg-gray-300 rounded p-2">
                {productInfo.price}
              </span>
              <span className="bg-gray-300 rounded p-2">
                {productInfo.category}
              </span>
            </div>
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
          </div>
        </div>
        <div className="flex flex-col bg-slate-100 w-auto rounded-lg p-5 gap-5 max-w-4xl">
          <h2 className="text-xl my-5 font-bold">Features</h2>
          <div className="">
            {Object.entries(productInfo.features).map(([index, feature]) => (
              <div key={index}>
                <span className="">{feature[0]} </span>
                <span className="text-slate-500">{feature[1]}</span>
                <br /> <br />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  else return <span>Data not found</span>;
}

export default ProductDisplay;
