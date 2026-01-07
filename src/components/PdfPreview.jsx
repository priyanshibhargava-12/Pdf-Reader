//client side component
"use client";

import { useEffect, useRef } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";

const PdfPreview = ({ pdfUrl, formData }) => {

  
  const searchPluginRef = useRef(
    searchPlugin({
      enableShortcuts: false,
    })
  );

  // highlight logic
  useEffect(() => {
    if (!pdfUrl) return;
    
    const plugin = searchPluginRef.current;

    const keywords = [
      formData.name,
      formData.age,
      formData.designation,
      ...(formData.keywords
        ? formData.keywords.split(",").map(k => k.trim())
        : []),
    ].filter(Boolean);

   
    plugin.clearHighlights();

    if (keywords.length === 0) return;

    const escaped = keywords.map(k =>
      k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");

    plugin.highlight(regex);

  }, [formData, pdfUrl]);

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
            plugins={[searchPluginRef.current]}
          />
        </Worker>
      )}
    </div>
  );
};

export default PdfPreview;
