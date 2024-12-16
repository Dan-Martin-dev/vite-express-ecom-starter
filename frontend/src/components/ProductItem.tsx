import { Link } from "react-router-dom";

const ProductItem = ({product}) => {
  return (
    <div className="max-w-full mt-4 min-h-max">
      <div
        className="relative overflow-hidden bg-white shadow-lg"
        /* 				onMouseEnter={() => {
            setHover(true);
        }}
        onMouseLeave={() => {
            setHover(false);
        }} */
      >
        {/* Red Tag */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-2 py-1 z-10">
          -25% OFF
        </div>

        {/* Product Image */}

        <Link to={`/products/${product.id}`}>
          <div className="w-full max-h-full h-[500px] sm:h-[900px] md:h-[300px] lg:h-[500px] overflow-hidden relative">
            <img
              alt={product.title}
      /*         className={`transform transition-transform duration-500 ease-in-out ${
                hover ? "scale-110" : "scale-100"
              } w-full h-full object-cover`} */
              src={product.image[0]}
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div key={product.id} className="mt-3">
        <h2 className="text-md font-semibold text-gray-600">{product.title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-md font-normal text-gray-500">
            ${product.price}
          </span>
          {product.beforePrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.beforePrice}
            </span>
          )}
        </div>
        <p className="text-xs text-red-500">{product.share}</p>

        {/* Link to product detail page */}
        <button
          className="mt-2 w-full text-gray-500 text-sm font-normal py-2 text-left underline"
 /*          onClick={() => {
            setIsPopupVisible(true);
            addToCart(product);
          }} */
        >
          Comprar
        </button>

        {/* Render ProductPopup when visible */}
{/*         {isPopupVisible && (
          <ProductPopup
            product={product}
            onClose={() => {
              setIsPopupVisible(false);
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export default ProductItem;
