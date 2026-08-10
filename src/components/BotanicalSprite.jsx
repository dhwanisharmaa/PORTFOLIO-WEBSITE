import React from 'react';

// Bounding box percentages calculated from the 1024x682 image dimension
const spriteRegions = {
  vine:   { x: 5,  y: 4,  w: 43, h: 41 }, // Top-left wobbly vine/branch
  lotus1: { x: 55, y: 5,  w: 40, h: 31 }, // Top-right lotus group on lily pads
  spray:  { x: 25, y: 35, w: 45, h: 31 }, // Center horizontal foliage spray
  wash:   { x: 2,  y: 55, w: 43, h: 40 }, // Bottom-left dark watercolor wash
  stem:   { x: 48, y: 64, w: 37, h: 30 }, // Bottom-center curved lotus stem
  bud:    { x: 68, y: 41, w: 30, h: 31 }, // Middle-right lotus bud on mossy patch
};

/**
 * BotanicalSprite — Crops a region from the master watercolor PNG and renders it
 * with organic watercolor edge dissolution. No hard rectangular masks.
 * 
 * Props:
 *   region   — key from spriteRegions (vine, lotus1, spray, wash, stem, bud)
 *   style    — additional inline styles for the outer wrapper
 *   className — additional class names for the outer wrapper
 *   opacity  — illustration opacity (default 0.10, range 0.08–0.12 for atmospheric)
 *   drift    — CSS animation class name for slow floating motion
 *   washColor — optional rgba color for a subtle watercolor wash layer beneath
 *   extend   — if true, removes overflow clipping so elements bleed beyond container
 */
const BotanicalSprite = ({ 
  region, 
  style = {}, 
  className = '', 
  opacity = 0.10,
  drift = '',
  washColor = null,
  extend = false
}) => {
  const reg = spriteRegions[region];
  if (!reg) return null;

  // Scale calculations to expand and position the crop area
  const scaleX = 100 / reg.w;
  const scaleY = 100 / reg.h;
  const left = -reg.x * scaleX;
  const top = -reg.y * scaleY;

  // Organic radial mask — elliptical fade from center outward, no hard edges
  const maskImage = 'radial-gradient(ellipse 48% 46% at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 75%, transparent 100%)';

  return (
    <div 
      className={`${className} ${drift}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        // No overflow:hidden — allow organic bleed when extend is true
        overflow: extend ? 'visible' : 'hidden',
        ...style
      }}
    >
      {/* Optional: Subtle watercolor wash beneath the illustration for depth */}
      {washColor && (
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            width: '140%',
            height: '140%',
            background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${washColor} 0%, transparent 70%)`,
            filter: 'url(#parchment-blend)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}

      {/* Illustration — organic dissolve filter + radial gradient mask */}
      <img
        src="/botanical_asset.png"
        alt={`Botanical watercolor wash: ${region}`}
        style={{
          position: 'absolute',
          left: `${left}%`,
          top: `${top}%`,
          width: `${scaleX * 100}%`,
          height: `${scaleY * 100}%`,
          objectFit: 'cover',
          mixBlendMode: 'multiply',
          opacity: opacity,
          filter: 'url(#watercolor-dissolve)',
          // Organic edge mask — dissolves into parchment
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </div>
  );
};

export default BotanicalSprite;
export { spriteRegions };
