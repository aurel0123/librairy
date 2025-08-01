import { cn } from '@/lib/utils';
import { Image } from '@imagekit/next';
import React from 'react'
import BookCoverSvg from './BookCoverSvg';
import config from '@/lib/config';

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles : Record <BookCoverVariant , string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};
interface Props {
    className?: string , 
    variant? : BookCoverVariant, 
    coverColor : string , 
    coverImage : string
}
const BookCover = ({
    className , 
    variant = "regular",
    coverColor = "#012B48",
    coverImage = "https://placehold.co/400x600.png",
} : Props) => {
  return (
    <div 
        className={cn("relative transition-all duration-300", 
            variantStyles[variant], 
            className
        )}
    >
        <BookCoverSvg coverColor = {coverColor}/>
        <div 
            className="absolute z-10"
            style={{ left: "12%", width: "87.5%", height: "88%" }}
        >
            <Image 
                urlEndpoint={config.env.imagekit.urlEndpoint}
                src={coverImage} 
                alt='cover url' 
                fill 
                className='rounded-sm objet-fill' 
                loading = "lazy"
            />
        </div>
    </div>
  )
}

export default BookCover