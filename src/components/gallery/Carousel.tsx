"use client";

import { useState } from "react";
import { Media, Flex, Button, Icon } from "@once-ui-system/core";
import styles from "./Carousel.module.css";

interface CarouselImage {
    src: string;
    alt: string;
    orientation?: "horizontal" | "vertical";
}

interface CarouselProps {
    images: CarouselImage[];
}

export default function Carousel({ images }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <Flex direction="column" gap="m" fillWidth>
            <div className={styles.carouselContainer}>
                <Media
                    enlarge
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                    radius="m"
                    aspectRatio={images[currentIndex].orientation === "horizontal" ? "16 / 9" : "3 / 4"}
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                />

                <button
                    className={`${styles.carouselButton} ${styles.prevButton}`}
                    onClick={goToPrevious}
                    aria-label="Image précédente"
                >
                    <Icon name="chevronLeft" size="l" />
                </button>

                <button
                    className={`${styles.carouselButton} ${styles.nextButton}`}
                    onClick={goToNext}
                    aria-label="Image suivante"
                >
                    <Icon name="chevronRight" size="l" />
                </button>
            </div>

            <Flex gap="s" wrap style={{ justifyContent: "center" }}>
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Aller à l'image ${index + 1}`}
                    />
                ))}
            </Flex>
        </Flex>
    );
}
