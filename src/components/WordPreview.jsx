"use client";

import { useEffect, useState, useRef } from "react";
import mammoth from "mammoth";
import Mark from "mark.js";

const WordPreview = ({ wordFile, formData }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // word to html conversion
  useEffect(() => {
    if (!wordFile) {
      setHtmlContent("");
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const result = await mammoth.convertToHtml({
          arrayBuffer: e.target.result,
        });
        setHtmlContent(result.value);
      } catch {
        setError("Failed to load Word document.");
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to read the file.");
      setLoading(false);
    };

    reader.readAsArrayBuffer(wordFile);
  }, [wordFile]);

 // highlighting
  useEffect(() => {
    if (!htmlContent || !formData?.keywords || !containerRef.current) return;

    const keywords = formData.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    if (!keywords.length) return;

    const marker = new Mark(containerRef.current);

    marker.unmark({
      done: () => {
        marker.mark(keywords, {
          element: "mark",
          className: "custom-highlight",
        });
      },
    });
  }, [htmlContent, formData]);

    const DocumentIconComponent = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );

  return (
    <div
      className={`pdf-wrapper ${htmlContent && !error && !loading ? "has-content" : ""}`}
    >
      {loading && (
        <div className="preview-empty">
          <span>Loading Word document...</span>
        </div>
      )}

      {error && (
        <div className="preview-empty">
          <span style={{ color: "#EF4444" }}>{error}</span>
        </div>
      )}

      {!wordFile && !loading && !error && (
        <div className="preview-empty">
          {DocumentIconComponent()}
          <span>Upload a Word document to preview</span>
        </div>
      )}

      {htmlContent && !loading && !error && (
        <div className="word-container">
          <div
            id="word-content"
            ref={containerRef}
            style={{
              padding: "40px",
              backgroundColor: "#FFFFFF",
              color: "#1F2937",
              minHeight: "100%",
              fontSize: "15px",
              lineHeight: "1.7",
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      )}
    </div>
  );
};

export default WordPreview;
