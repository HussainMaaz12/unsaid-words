// This is a placeholder depth map.
// To make this look perfect, you would generate a greyscale depth map of the image
// (where white is closer to the camera, black is further away).
// For now, this component will use a gentle radial gradient as a fallback depth map
// to give a generic "bulge" 3D effect.

export const createFallbackDepthMap = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Create radial gradient (white center, black edges)
  const gradient = ctx.createRadialGradient(256, 256, 50, 256, 256, 256);
  gradient.addColorStop(0, 'white');
  gradient.addColorStop(1, 'black');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  
  return canvas.toDataURL();
};
