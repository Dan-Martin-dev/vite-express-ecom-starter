'use client'

import { useEffect, useState, useCallback } from "react";

const useCarousel = (imagesArray: Array<string>, interval: number) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentIndex(( previousIndex ) => (previousIndex + 1) % imagesArray.length);
		}, interval);

		return () => { clearInterval(intervalId); };
	}, [imagesArray, interval]);

	const handleNext = useCallback(() => {
		setCurrentIndex(( previousIndex)  => (previousIndex + 1) % imagesArray.length);
	}, [imagesArray]);

	const handlePrevious = useCallback(() => {
		setCurrentIndex(
			( previousIndex ) => (previousIndex - 1 + imagesArray.length) % imagesArray.length
		);
	}, [imagesArray]);

	return { currentIndex, handleNext, handlePrevious };
};

export default useCarousel;
