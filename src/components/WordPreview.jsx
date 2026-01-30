"use client";

import { useEffect, useState } from "react";
import mammoth from "mammoth";

const WordPreview = ({ wordFile, formData }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        const arrayBuffer = e.target.result;
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setHtmlContent(result.value);
        setLoading(false);
      } catch (err) {
        console.error("Error converting Word document:", err);
        setError("Failed to load Word document. Please try another file.");
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to read the file.");
      setLoading(false);
    };

    reader.readAsArrayBuffer(wordFile);
  }, [wordFile]);

  // Apply highlighting when keywords or content changes
  useEffect(() => {
    if (!htmlContent || !formData?.keywords) return;

    const keywords = formData.keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    if (keywords.length === 0) return;

    // Apply highlighting after DOM is ready
    const timer = setTimeout(() => {
      const docContainer = document.querySelector("#word-content");
      if (!docContainer) return;

      // Create a regex pattern for all keywords
      const pattern = keywords
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|");
      const regex = new RegExp(`(${pattern})`, "gi");

      // Function to highlight text nodes
      const highlightTextNodes = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          if (regex.test(text)) {
            const span = document.createElement("span");
            span.innerHTML = text.replace(
              regex,
              '<mark style="background-color: rgba(122, 162, 255, 0.35); color: inherit; padding: 2px 4px; border-radius: 3px;">$1</mark>',
            );
            node.parentNode.replaceChild(span, node);
          }
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName !== "MARK"
        ) {
          Array.from(node.childNodes).forEach(highlightTextNodes);
        }
      };

      // Clone the content to avoid modifying the original
      const content = docContainer.innerHTML;
      docContainer.innerHTML = content;
      highlightTextNodes(docContainer);
    }, 100);

    return () => clearTimeout(timer);
  }, [htmlContent, formData]);

  const DocumentIconComponent = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="12" y1="19" x2="12" y2="19"></line>
    </svg>
  );

  return (
    <div
      className={`pdf-wrapper ${htmlContent && !error && !loading ? "has-content" : ""}`}
    >
      {loading && (
        <div className="preview-empty">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="animate-spin"
          >
            <circle cx="12" cy="12" r="10" fill="none"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"></path>
          </svg>
          <span>Loading Word document...</span>
        </div>
      )}

      {error && (
        <div className="preview-empty">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <span style={{ color: "#EF4444" }}>{error}</span>
        </div>
      )}

      {!wordFile && !loading && !error && (
        <div className="preview-empty">
          <DocumentIconComponent />
          <span>Upload a Word document to preview</span>
        </div>
      )}

      {htmlContent && !loading && !error && (
        <div className="word-container">
          <div
            id="word-content"
            style={{
              padding: "40px",
              backgroundColor: "#FFFFFF",
              color: "#1F2937",
              minHeight: "100%",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
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