import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

type ProductImageGalleryProps = {
  images: string[];
};

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Main Image */}
      <div 
        className="relative overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-96 object-contain transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full">
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </div>
        
        {/* Zoom overlay */}
        {isZoomed && (
          <div 
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button 
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                }}
              >
                <X className="h-8 w-8" />
              </button>
              <div className="relative h-[70vh] w-auto">
                <img
                  src={selectedImage}
                  alt="Product Zoom"
                  className="w-full h-full object-contain"
                  style={{
                    transform: `scale(2)`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`rounded-md overflow-hidden border-2 ${
                selectedImage === image ? 'border-[#002B50]' : 'border-gray-200'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-20 object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;