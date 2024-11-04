import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdsenseAd: React.FC = () => {
  useEffect(() => {
    // Dynamically load the AdSense script only once
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9234128498820316";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // Push the ad to AdSense
    script.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-9234128498820316"
      data-ad-slot="7508846628"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdsenseAd;



