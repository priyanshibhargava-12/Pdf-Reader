"use client";

import { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";

const ImagePreview = ({ imageUrl, formData }) => {
  const imgRef = useRef(null);
  const [words, setWords] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

  // OCR
  useEffect(() => {
    if (!imageUrl) return;

    Tesseract.recognize(imageUrl, "eng").then(({ data }) => {
      console.log(data.words);
      setWords(data.words || []);
    });
  }, [imageUrl]);

  // Image original size
  const handleImageLoad = () => {
    const img = imgRef.current;
    setImageSize({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  // Keywords from form
  const keywords = formData?.keywords
    ? formData.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0)
    : [];

  if (!imageUrl) {
    return <div className="preview-empty">🖼️ Upload an image to preview</div>;
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {imageUrl && (
        <img
          ref={imgRef}
          src={imageUrl}
          onLoad={handleImageLoad}
          alt="preview"
          style={{ width: "100%", display: "block" }}
        />
      )}

      {words.map((word, index) => {
        if (!word.text || !word.bbox) return null;

        const wordText = word.text.toLowerCase();

        const isMatch =
          keywords.length > 0 &&
          keywords.some((k) => wordText.includes(k.toLowerCase()));
        if (!isMatch) return null;
        //left
        const scaleX = imgRef.current.clientWidth / imageSize.width;
        //top
        const scaleY = imgRef.current.clientHeight / imageSize.height;

        const { x0, y0, x1, y1 } = word.bbox;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x0 * scaleX,
              top: y0 * scaleY,
              width: (x1 - x0) * scaleX,
              height: (y1 - y0) * scaleY,
              background: "rgba(255, 255, 0, 0.45)",
              borderRadius: "4px",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
};

export default ImagePreview;
