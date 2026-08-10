import React from 'react';

const SharedSvgFilters = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Painterly Displacement Filter (original — used for SVG paths/vine) */}
        <filter id="painterly" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* 
          Watercolor Dissolve Filter
          Multi-stage organic edge dissolution that replaces hard rectangular crops.
          Stage 1: Generate fractal noise at fine grain for irregular edge patterns.
          Stage 2: Use the noise as a displacement map to warp edges irregularly.
          Stage 3: Erode the alpha channel using noise to create dissolving, pigment-bloom edges.
          Stage 4: Gaussian blur to feather the eroded alpha for soft watercolor paper bleed.
          Stage 5: Composite the displaced source with the softened alpha mask.
        */}
        <filter id="watercolor-dissolve" x="-15%" y="-15%" width="130%" height="130%">
          {/* Fine-grained fractal noise for organic edge irregularity */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="4"
            seed="2"
            result="dissolveNoise"
          />
          {/* Warp the source edges with the noise — subtle displacement */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="dissolveNoise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Extract the alpha channel of the displaced source */}
          <feColorMatrix
            in="displaced"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="alphaOnly"
          />
          {/* Coarser noise for the dissolving edge pattern */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            seed="7"
            result="edgeNoise"
          />
          {/* Compositing: use the noise to erode/break up the alpha edges */}
          <feComposite
            in="alphaOnly"
            in2="edgeNoise"
            operator="in"
            result="erodedAlpha"
          />
          {/* Feather the broken-up alpha for a soft watercolor paper bleed */}
          <feGaussianBlur
            in="erodedAlpha"
            stdDeviation="3"
            result="blurredAlpha"
          />
          {/* Composite the displaced graphic using the softened irregular alpha */}
          <feComposite
            in="displaced"
            in2="blurredAlpha"
            operator="in"
            result="dissolvedResult"
          />
        </filter>

        {/* 
          Pigment Bloom Filter
          Simulates watercolor pigment blooming outward from wet areas.
          Creates a subtle warm glow around illustration edges.
        */}
        <filter id="pigment-bloom" x="-20%" y="-20%" width="140%" height="140%">
          {/* Slight displacement for organic feel */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="2"
            seed="5"
            result="bloomNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="bloomNoise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="bloomDisplaced"
          />
          {/* Dilate slightly to spread pigment */}
          <feMorphology
            in="bloomDisplaced"
            operator="dilate"
            radius="1.5"
            result="bloomSpread"
          />
          {/* Soft blur for the bloom effect */}
          <feGaussianBlur
            in="bloomSpread"
            stdDeviation="6"
            result="bloomBlurred"
          />
          {/* Desaturate and reduce the bloom layer */}
          <feColorMatrix
            in="bloomBlurred"
            type="matrix"
            values="0.6 0.2 0.2 0 0  0.2 0.6 0.2 0 0  0.2 0.2 0.6 0 0  0 0 0 0.3 0"
            result="bloomTinted"
          />
          {/* Layer bloom behind original */}
          <feMerge>
            <feMergeNode in="bloomTinted" />
            <feMergeNode in="bloomDisplaced" />
          </feMerge>
        </filter>

        {/* 
          Parchment Blend Filter
          For the wash layers beneath illustrations — applies noise-based alpha 
          erosion so color washes have irregular, paper-fiber edges.
        */}
        <filter id="parchment-blend" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="5"
            seed="11"
            result="paperNoise"
          />
          <feComposite
            in="SourceGraphic"
            in2="paperNoise"
            operator="in"
            result="paperBlended"
          />
          <feGaussianBlur
            in="paperBlended"
            stdDeviation="4"
            result="paperSoftened"
          />
        </filter>

        {/* Wobbly Clip Path 1 (Landscape Card Format) */}
        <clipPath id="wobbly-clip-1" clipPathUnits="objectBoundingBox">
          <path d="M 0.02,0.03 
                   C 0.25,0.01 0.75,0.04 0.98,0.02 
                   C 0.99,0.25 0.97,0.75 0.99,0.97 
                   C 0.75,0.99 0.25,0.96 0.01,0.98 
                   C -0.01,0.75 0.03,0.25 0.02,0.03 Z" />
        </clipPath>

        {/* Wobbly Clip Path 2 (Slightly alternate shape to vary visual layouts) */}
        <clipPath id="wobbly-clip-2" clipPathUnits="objectBoundingBox">
          <path d="M 0.01,0.02 
                   C 0.35,-0.02 0.65,0.03 0.99,0.01 
                   C 1.02,0.35 0.98,0.65 0.97,0.99 
                   C 0.65,1.02 0.35,0.98 0.02,0.97 
                   C -0.02,0.65 0.02,0.35 0.01,0.02 Z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SharedSvgFilters;
