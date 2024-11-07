import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdsenseInFeedAd: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove previous ads from the container to avoid multiple ads in one element
    if (adRef.current) {
      adRef.current.innerHTML = ""; // Clear previous ad content
    }

    // Add a fresh ad ins element
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', 'ca-pub-9234128498820316');
    ins.setAttribute('data-ad-slot', '2033719744');
    ins.setAttribute('data-ad-format', 'fluid');
    ins.setAttribute('data-ad-layout-key', '-h3-12-37-88+10q');
    ins.setAttribute('data-full-width-responsive', 'true');

    if (adRef.current) {
      adRef.current.appendChild(ins);
    }

    // Push a new ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []); // Only run once on mount

  return <div ref={adRef}></div>;
};

export default AdsenseInFeedAd;