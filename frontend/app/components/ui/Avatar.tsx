import Image from "next/image";
import "./styles.css";
export function Avatar({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) {
    return (
        <Image 
            src={src}
            alt={alt}
            className={`rounded-full border-2 border-electric-blue shadow-md`}
            width={width}
            height={height}
        />
    );
}