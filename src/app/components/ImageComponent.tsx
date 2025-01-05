'use client';
import Image from "next/image";
import {useState} from "react";

interface ImageProps {
    imageUrl: string;
    alt:string;
    height?:number;
    width?:number;
    className?: string;
    priority?: boolean;
    children?: React.ReactNode;
}
export const ImageComponent:React.FC<ImageProps> = ({imageUrl,alt,className,children,priority,width=600,height=400}) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false); // Image has loaded, so hide the placeholder
    };
    return (
        <>
            <div className="relative">
                {/* Placeholder shown while the image is loading */}
                {loading && (
                    <>
                        {!children?
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 rounded-lg">
                                <span className="text-sm text-neutral-500">Loading...</span>
                            </div>
                            : children
                        }
                    </>
                )}

                <Image

                    src={`${imageUrl}`}
                    alt={`${alt}`}
                    width={width} // You can define width and height to help Next.js optimize the image
                    height={height} // Adjust these dimensions based on your design
                    className={`object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity  ${className}`}
                    onLoad={handleImageLoad} // This event fires when the image has loaded
                    priority={priority} // If the image is critical for above-the-fold content, set priority to true
                />
            </div>
        </>
    );
};