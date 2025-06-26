// "use client";
// import React, { useState } from "react";
// import { useSwipeable } from "react-swipeable";
// import { motion, AnimatePresence } from "framer-motion";
// import Lightbox from "react-image-lightbox"; // Import thư viện Lightbox
// import "react-image-lightbox/style.css"; // Import styles cho Lightbox

// interface CarouselProductDetailProps {
//   images: any;
// }

// const IMAGE_HEIGHT = 400;
// const THUMB_HEIGHT = IMAGE_HEIGHT / 3;
// const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

// const CarouselProductDetail: React.FC<CarouselProductDetailProps> = ({
//   images,
// }) => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [isOpen, setIsOpen] = useState(false); // State để kiểm tra Lightbox có mở hay không

//   const handleSelectImage = (index: number) => {
//     if (index !== selectedImage) {
//       setDirection(index > selectedImage ? 1 : -1);
//       setSelectedImage(index);
//     }
//   };

//   const handleSwipe = (dir: "LEFT" | "RIGHT") => {
//     if (dir === "LEFT") {
//       setDirection(1);
//       setSelectedImage((prev) => (prev + 1) % images.length);
//     } else if (dir === "RIGHT") {
//       setDirection(-1);
//       setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     }
//   };

//   const handlers = useSwipeable({
//     onSwipedLeft: () => handleSwipe("LEFT"),
//     onSwipedRight: () => handleSwipe("RIGHT"),
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   return (
//     <div className="flex max-w-4xl mx-auto">
//       {/* Thumbnails */}
//       <div
//         className="hidden mr-4 overflow-y-auto md:flex flex-col gap-2 scrollbar-hide"
//         style={{ height: `${IMAGE_HEIGHT}px`, width: "100px" }}
//       >
//         {images.map((img: any, index: any) => (
//           <div
//             key={index}
//             onClick={() => handleSelectImage(index)}
//             className={`relative rounded-lg cursor-pointer border-2 transition-all duration-200 ${
//               selectedImage === index ? "border-blue-500" : "border-transparent"
//             }`}
//             style={{
//               height: `${THUMB_HEIGHT}px`,
//               minHeight: `${THUMB_HEIGHT}px`,
//               maxHeight: `${THUMB_HEIGHT}px`,
//               flexShrink: 0,
//               width: "100%",
//             }}
//           >
//             <img
//               src={baseUrl + img?.attributes?.url}
//               alt={`Thumbnail ${index + 1}`}
//               loading="lazy"
//               className="object-cover rounded-md h-full"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Main image with swipe + animation */}
//       <div className="flex-1">
//         <div
//           {...handlers}
//           className="relative w-full rounded-xl overflow-hidden shadow-md"
//           style={{ height: `${IMAGE_HEIGHT}px` }}
//         >
//           <AnimatePresence initial={false} custom={direction}>
//             <motion.div
//               key={selectedImage}
//               custom={direction}
//               initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
//               transition={{ duration: 0.4, ease: "easeInOut" }}
//               className="absolute top-0 left-0 w-full h-full"
//             >
//               <img
//                 src={baseUrl + images[selectedImage]?.attributes?.url}
//                 alt={`Product ${selectedImage + 1}`}
//                 className="object-cover rounded-xl cursor-pointer"
//                 onClick={() => setIsOpen(true)}
//               />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Lightbox for zooming */}
//       {isOpen && images[0]?.attributes?.url && (
//         <Lightbox
//           mainSrc={baseUrl + images[selectedImage]?.attributes?.url} // Hình ảnh chính trong lightbox
//           nextSrc={
//             baseUrl +
//             images[(selectedImage + 1) % images.length]?.attributes?.url
//           } // Hình ảnh tiếp theo
//           prevSrc={
//             baseUrl +
//             images[(selectedImage + images.length - 1) % images.length]
//               ?.attributes?.url
//           } // Hình ảnh trước
//           onCloseRequest={() => setIsOpen(false)} // Đóng lightbox khi nhấn đóng
//           onMovePrevRequest={() =>
//             setSelectedImage((prev) =>
//               prev === 0 ? images.length - 1 : prev - 1
//             )
//           }
//           onMoveNextRequest={() =>
//             setSelectedImage((prev) => (prev + 1) % images.length)
//           }
//         />
//       )}

//       {/* Styles */}
//       <style jsx>{`
//         .scrollbar-hide {
//           scrollbar-width: none;
//         }

//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CarouselProductDetail;

"use client";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox"; // Import thư viện yet-another-react-lightbox
import "yet-another-react-lightbox/styles.css"; // Import styles cho Lightbox

interface CarouselProductDetailProps {
  images: any;
}

const IMAGE_HEIGHT = 400;
const THUMB_HEIGHT = IMAGE_HEIGHT / 3;
const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

const CarouselProductDetail: React.FC<CarouselProductDetailProps> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // State để kiểm tra Lightbox có mở hay không

  const handleSelectImage = (index: number) => {
    if (index !== selectedImage) {
      setDirection(index > selectedImage ? 1 : -1);
      setSelectedImage(index);
    }
  };

  const handleSwipe = (dir: "LEFT" | "RIGHT") => {
    if (dir === "LEFT") {
      setDirection(1);
      setSelectedImage((prev) => (prev + 1) % images.length);
    } else if (dir === "RIGHT") {
      setDirection(-1);
      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="flex max-w-4xl mx-auto">
      {/* Thumbnails */}
      <div
        className="hidden mr-4 overflow-y-auto md:flex flex-col gap-2 scrollbar-hide"
        style={{ height: `${IMAGE_HEIGHT}px`, width: "100px" }}
      >
        {images.map((img: any, index: any) => (
          <div
            key={index}
            onClick={() => handleSelectImage(index)}
            className={`relative rounded-lg cursor-pointer border-2 transition-all duration-200 ${
              selectedImage === index ? "border-blue-500" : "border-transparent"
            }`}
            style={{
              height: `${THUMB_HEIGHT}px`,
              minHeight: `${THUMB_HEIGHT}px`,
              maxHeight: `${THUMB_HEIGHT}px`,
              flexShrink: 0,
              width: "100%",
            }}
          >
            <img
              src={baseUrl + img?.attributes?.url}
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
              className="object-cover rounded-md h-full"
            />
          </div>
        ))}
      </div>

      {/* Main image with swipe + animation */}
      <div className="flex-1">
        <div
          {...handlers}
          className="relative w-full rounded-xl overflow-hidden shadow-md"
          style={{ height: `${IMAGE_HEIGHT}px` }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selectedImage}
              custom={direction}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <img
                src={baseUrl + images[selectedImage]?.attributes?.url}
                alt={`Product ${selectedImage + 1}`}
                className="object-cover rounded-xl cursor-pointer"
                onClick={() => setIsOpen(true)} // Mở Lightbox khi nhấn vào ảnh
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox for zooming */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)} // Đóng lightbox khi nhấn đóng
          slides={images.map((img: any) => ({
            src: baseUrl + img?.attributes?.url,
            alt: "Image",
          }))} // Truyền tất cả ảnh vào Lightbox
          index={selectedImage} // Chỉ định ảnh bắt đầu khi mở Lightbox
        />
      )}

      {/* Styles */}
      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CarouselProductDetail;
