//client side component
"use client";

import { useEffect, useRef, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";

const PdfPreview = ({ pdfUrl, formData }) => {
  //Prevents highlighting before PDF is ready
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);

  const highlightTimeoutRef = useRef(null);
  const searchPluginInstance = useRef(null);
  const scrollPositionRef = useRef({ x: 0, y: 0 });

  //search plugin instance
  const searchPluginInstanceVal = searchPlugin({
    enableShortcuts: false,
  });

  useEffect(() => {
    searchPluginInstance.current = searchPluginInstanceVal;
  }, [searchPluginInstanceVal]);

  useEffect(() => {
    //reset on pdf change
    setIsDocumentLoaded(false);

    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
  }, [pdfUrl]);
  //highlighting logic
  useEffect(() => {
    if (!pdfUrl || !isDocumentLoaded || !searchPluginInstance.current) return;

    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }

    highlightTimeoutRef.current = setTimeout(() => {
      try {
        const allKeywords = [
          formData.name,
          formData.age,
          formData.designation,
          ...(formData.keywords
            ? formData.keywords.split(",").map((k) => k.trim())
            : []),
        ].filter((k) => k && k.toString().trim() !== "");

        if (allKeywords.length === 0) {
          searchPluginInstance.current.clearHighlights();
          return;
        }

        const container = document.querySelector(".rpv-core__viewer");
        if (container) {
          scrollPositionRef.current = {
            x: container.scrollLeft,
            y: container.scrollTop,
          };
        }
        // for highlighting keywords
        allKeywords.forEach((keyword) => {
          const trimmedKeyword = keyword.toString().trim();
          if (trimmedKeyword) {
            searchPluginInstance.current.highlight(trimmedKeyword);
          }
        });

        if (container) {
          setTimeout(() => {
            container.scrollLeft = scrollPositionRef.current.x;
            container.scrollTop = scrollPositionRef.current.y;
          }, 0);
        }
      } catch (error) {
        console.error("Highlight error:", error);
      }
    }, 300);

    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [pdfUrl, formData, isDocumentLoaded]);

  return (
    <div className="pdf-container">
      {!pdfUrl ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#7aa2ff",
            fontSize: "1.2rem",
            fontWeight: "500",
          }}
        >
          📄 Upload a PDF to preview
        </div>
      ) : (
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            onDocumentLoad={() => setIsDocumentLoaded(true)}
            defaultScale={1.0}
            plugins={[searchPluginInstance.current]}
          />
        </Worker>
      )}
    </div>
  );
};

export default PdfPreview;