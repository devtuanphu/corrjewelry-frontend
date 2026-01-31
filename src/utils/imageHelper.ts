/**
 * Helper to get optimized Strapi image URL
 * Uses small format (~500px) for faster loading, falls back to original
 */
export const getOptimizedImageUrl = (imageData: any): string => {
  if (!imageData) return "";
  
  // Direct attributes structure: imageData.attributes.formats.small.url
  if (imageData?.attributes?.formats?.small?.url) {
    return imageData.attributes.formats.small.url;
  }
  
  // Nested data structure: imageData.data.attributes.formats.small.url
  if (imageData?.data?.attributes?.formats?.small?.url) {
    return imageData.data.attributes.formats.small.url;
  }
  
  // Fallback to medium if no small
  if (imageData?.attributes?.formats?.medium?.url) {
    return imageData.attributes.formats.medium.url;
  }
  if (imageData?.data?.attributes?.formats?.medium?.url) {
    return imageData.data.attributes.formats.medium.url;
  }
  
  // Fallback to original
  if (imageData?.attributes?.url) {
    return imageData.attributes.url;
  }
  if (imageData?.data?.attributes?.url) {
    return imageData.data.attributes.url;
  }
  
  // Direct url
  if (imageData?.url) {
    return imageData.url;
  }
  
  return "";
};

/**
 * Get large format for product detail pages
 */
export const getLargeImageUrl = (imageData: any): string => {
  if (!imageData) return "";
  
  // Use medium for product detail (750px is enough for detail view)
  if (imageData?.attributes?.formats?.medium?.url) {
    return imageData.attributes.formats.medium.url;
  }
  if (imageData?.data?.attributes?.formats?.medium?.url) {
    return imageData.data.attributes.formats.medium.url;
  }
  
  // Fallback to original for full quality
  if (imageData?.attributes?.url) {
    return imageData.attributes.url;
  }
  if (imageData?.data?.attributes?.url) {
    return imageData.data.attributes.url;
  }
  
  return "";
};
