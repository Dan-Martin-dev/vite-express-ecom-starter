import { useEffect } from "react";

const SmartCart = () => {
	const {
		cartItems,
		isCarritoOpen,
		toggleCarrito,
		isMounted,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		subtotal,
	} = useCart();

	useEffect(() => {
		if (isMounted) {
			document.body.style.overflow = isCarritoOpen ? "hidden" : "auto";
			localStorage.setItem("cartItems", JSON.stringify(cartItems));

		}
	}, [isCarritoOpen, isMounted, cartItems]);

	if (!isMounted) {
		return null;
	}


	return (
		<div className="">
			<div className="w-full h-full">
				<div
					className={`fixed top-0 right-0 bg-white shadow-lg transform ${
						isMounted && isCarritoOpen ? "translate-x-0" : "translate-x-full"
					} transition-transform duration-500 ease-in-out z-10 w-full md:w-1/2 lg:w-1/3 h-full overflow-y-auto`}
				>
					<div className="p-3 w-full min-h-screen flex flex-col">
						<div className="flex justify-between items-center">
							<h2 className="text-center text-sm font-normal text-gray-600 w-full">
								Carrito de compras
							</h2>
							<button
								className="text-2xl font-medium text-gray-600"
								onClick={toggleCarrito}
							>
								<svg
									className="w-6 h-6 text-gray-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 18L18 6M6 6l12 12"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									/>
								</svg>
							</button>
						</div>

						<hr className="w-full font-thin border-gray-500 mt-2" />

						{/* Conditional rendering for "No products" or Cart Items */}
						{cartItems.length === 0 ? (
							<div className="flex justify-center items-center flex-grow"
							>
								<p className="text-gray-500 text-lg">There's no product</p>
							</div>
						) : (
							<>
								{/* Products */}
								{cartItems.map((item) => (
									<div
										key={`${item.id}-${item.size}`} 
										className="flex items-center space-x-4 mb-4 p-2"
									>
										<img
											alt={item.title}
											className="object-cover rounded border border-gray-300"
											height={80}
											src={item.images[0]}
											width={80}
										/>
										<div className="flex-1 text-gray-600">
											<div className="flex justify-between items-center mb-2">
												<h3 className="text-sm font-normal">{item.title}</h3>
												<button
													className="text-xs font-normal text-gray-600 underline"
													onClick={() => {
														removeFromCart(Number(item.id));
													}}
												>
													Borrar
												</button>
											</div>
											<p className="text-sm text-gray-500">
												(talle {item.size})
											</p>
											<div className="flex justify-between items-center mt-2">
												<p className="text-sm font-bold text-gray-700">
													${Number(item.price).toFixed(2)}
												</p>
												<div className="flex items-center space-x-2">
													<div className="flex border border-gray-300 rounded">
														<button
															className="text-gray-500 border-r border-gray-300 px-3 py-1"
															onClick={() => { decreaseQuantity(); }}

														>
															-
														</button>
														<span className="text-gray-500 px-3 py-1">
															{item.quantity}
														</span>
														<button
															className="text-gray-500 border-l border-gray-300 px-3 py-1"
															// eslint-disable-next-line @typescript-eslint/no-unsafe-call
															onClick={() => { increaseQuantity(); }}

														>
															+
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}

								{/* Subtotal */}
								<div className="mt-4">
									<p className="text-gray-600">
										Subtotal (sin envío):{" "}
										<span className="font-bold text-gray-800">
											${subtotal.toFixed(2)}
										</span>
									</p>
								</div>

								{/* Delivery Information */}
								<div className="mt-4">
									<p className="text-gray-600">
										Entregas para el CP:{" "}
										<span className="text-blue-500 cursor-pointer">
											Cambiar CP
										</span>
									</p>
									<p className="text-blue-500 cursor-pointer">
										No sé mi código postal
									</p>
								</div>

								{/* Shipping Methods */}
								<div className="mt-4">
									<h4 className="font-semibold text-gray-700">
										Medios de envío
									</h4>
									<button className="mt-2 text-blue-500">Calcular</button>
									<div className="mt-2 text-gray-600">
										<p>Nuestro local</p>
										<p>Punto de retiro Recoleta - Marcelo T de Alvear 1261</p>
										<p>Horario y Día de entrega a coordinar</p>
										<p className="font-bold text-gray-800">Gratis</p>
									</div>
								</div>

								{/* Total */}
								<div className="mt-6 flex justify-between items-center">
									<p className="text-lg font-normal text-gray-600">Total:</p>
									<div className="text-right">
										<p className="text-lg font-normal text-gray-600">
											${subtotal.toFixed(2)}
										</p>
										<p className="text-sm text-gray-600">
											O hasta 6 x $24.833,33 sin interés
										</p>
									</div>
								</div>

								{/* Checkout Buttons */}
								<button className="w-full bg-black text-sm text-white py-3 mt-4">
									Iniciar compra
								</button>

								<button className="w-full text-gray-700 mt-4">
									Ver más productos
								</button>
							</>
						)}
					</div>
				</div>

				{/* Overlay when cart is open */}
				{isCarritoOpen && (
					<div
						className="fixed inset-0 bg-black opacity-50 z-5"
						onClick={toggleCarrito}
					></div>
				)}
			</div>
		</div>
	);
};

export default SmartCart;
