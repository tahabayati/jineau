"use client"

import { useState } from "react"
import Image from "next/image"

export default function ProductGallery({ images = [], productName = "Product" }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // If no images provided, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-brand-mint/30 to-brand-mist/40 rounded-3xl flex items-center justify-center shadow-lg">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-brand-mint to-brand-mist flex items-center justify-center shadow-xl">
          <span className="text-8xl">🌱</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Main Image Display */}
      <div className="space-y-4">
        <div 
          className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-brand-mint/20 hover:border-brand-mint/40 transition-all duration-300 cursor-pointer group"
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={images[selectedImage]}
            alt={`${productName} - Image ${selectedImage + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/10 via-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Fullscreen indicator */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  selectedImage === index
                    ? "border-brand-primary shadow-lg ring-2 ring-brand-primary/30"
                    : "border-gray-200 hover:border-brand-mint/60"
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Main fullscreen image */}
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedImage]}
              alt={`${productName} - Full view ${selectedImage + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Image counter in fullscreen */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

