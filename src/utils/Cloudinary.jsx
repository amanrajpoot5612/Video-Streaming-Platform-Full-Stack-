// utils/cloudinaryUtils.js

export const optimizeCloudinaryUrl = (url, width = 300, height = 200) => {
  if (!url.includes('cloudinary.com')) return url;

  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`
  );
};
