// components/forms/ProductDetail.tsx
import { MdArrowRightAlt } from "react-icons/md";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const ProductDetail = () => {
/* 	const { id } = useParams({ strict: false });
	const { product, loading } = useFetchProduct(id);
	const { selectedSize, handleClick } = useSelectedSize();
	const [quantity, increaseQuantity, decreaseQuantity] = useQuantity(); 

	if (loading) {
		return <div>Loading...</div>;
	}
	if (!product) {	
		return <div>Product not found</div>;
	}

	const imageUrl = product.images?.[0] || "/logo.webp";
*/
	return (
		/* Product detail component */
		<div className="w-full min-h-max flex flex-col sm:flex-row sm:space-x-4">
			{/* image section */}
			<div className="w-full sm:w-1/2">
				{/* counter/arrows */}
				<div className="flex justify-between mx-4 text-lg text-gray-500">
					<p>1/4</p>

					<div className="flex ">
						<MdArrowRightAlt
							className="transform rotate-180 text-gray-400"
							size={27}
						/>
						<MdArrowRightAlt className="text-gray-400 mx-2" size={27} />
					</div>
				</div>

				{/* carousel */}
				<div className="relative m-4">
					{/* Red Tag */}
					<div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-2 py-1 z-0">
						-25% OFF
					</div>
					{/* image */}
					<img alt="img" src={imageUrl} />
				</div>
			</div>

			{/* description section */}
			<div className="w-full sm:w-1/2 mx-3">
				{/* links */}
				<div className="flex items-center space-x-2 text-xs text-gray-500 mt-2 mx-4">
					{/* Link 1 */}
					<a className="hover:text-gray-600" href="#">
						Inicio
					</a>

					{/* Divider */}
					<span className="text-gray-400">|</span>

					{/* Link 2 */}
					<a className="hover:text-gray-600" href="#">
						NEW COLLECTION
					</a>

					{/* Divider */}
					<span className="text-gray-400">|</span>

					{/* Link 3 */}
					<a className="hover:text-gray-600" href="#">
						Signature Summer Shirt
					</a>
				</div>

				{/* product information */}
				<div className="">
					{/* title */}
					<h1 className="text-center text-4xl text-gray-500 mt-5 mb-5 ">
						{product.title}
					</h1>

					{/* prices */}
					<div className="flex items-center space-x-2 mt-2">
						<span className="text-xl font-normal text-gray-500  ">
							${product.price}
						</span>
						{product.beforePrice && (
							<span className="text-md  font-normal text-gray-400 line-through">
								${product.beforePrice}
							</span>
						)}
					</div>

					{/* share */}
					<p className="text-xs text-red-600">{product.share}</p>

					{/* discount */}
					<div className="flex my-2">
						<p className="text-xs text-red-600">25% de descuento</p>
						<p className="text-xs text-gray-500 ml-2">pagando en efectivo</p>
					</div>

					{/* details */}
					<p className="text-md text-gray-500 my-2 underline">
						Ver mas detalles
					</p>

					{/* size */}
					<div className="flex mt-4">
						<p className="text-sm text-gray-500  ">Talle:</p>
						<p className="text-sm text-gray-600 ml-2">talle 4</p>
					</div>

					{/* size boxes */}
					<div className="flex space-x-4 my-4">
						{["talle 1", "talle 2", "talle 3", "talle 4"].map((size, index) => (
							<div
								key={index}
								className={`flex items-center text-slate-600 text-center justify-center align-middle text-xs w-14 h-8 border border-gray-500 hover:border-gray-400 focus-within:border-gray-500 transition-all ${
									selectedSize === size ? "bg-slate-300" : "bg-transparent"
								}`}
								onClick={() => {
									handleClick(size);
								}}
							>
								{size}
							</div>
						))}
					</div>

					{/* cart button */}
					<div className="flex justify-around mt-7">
						
						{/* plus minus button */}
						<div className="justify-start">
							<button
								className="px-4 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
								onClick={decreaseQuantity}
							>
								-
							</button>
							<input
								readOnly
								className="w-12 h-12 text-center border border-gray-300 rounded"
								type="text"
								value={quantity}
							/>
							<button
								className="px-4 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
								onClick={increaseQuantity}
							>
								+
							</button>
						</div>

						<div className="">
							<button className="mr-4 py-3 px-16 sm:px-10 lg:px-32 bg-black text-white  hover:bg-gray-800">
								Add to Cart
							</button>
						</div>
					</div>
				</div>	
			</div>
		</div>
	);
};

export default ProductDetail;
