// client side component
"use client";

import { useRef, useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

const PdfPreview = ({ pdfUrl, formData }) => {
  // search plugin instance
  const searchPluginRef = useRef(
    searchPlugin({
      enableShortcuts: false,
    }),
  );

  const pageNavPluginRef = useRef(pageNavigationPlugin());

  const { highlight, clearHighlights } = searchPluginRef.current;
 

  const [isPdfLoaded, setIsPdfLoaded] = useState(false);

  useEffect(() => {
    if (!pdfUrl || !isPdfLoaded) return;

    const keywords = formData?.keywords
      ? formData.keywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k.length > 0)
      : [];


    clearHighlights();
    
    if (!keywords.length) return;
    // console.log(formData);
    const values = keywords.map((word) => ({
      keyword: word,
      matchCase: false,
      wholeWords: false,
    }));
    //  console.log(values);
    highlight(values);
  }, [formData, pdfUrl, isPdfLoaded]);

  const FileIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  );

  return (
    <div className={`pdf-wrapper ${pdfUrl ? 'has-content' : ''}`}>
      {!pdfUrl ? (
        <div className="preview-empty">
          <FileIcon />
          <span>Upload a PDF to preview</span>
        </div>
      ) : (
        <div className="pdf-container">
       

          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfUrl}
              plugins={[searchPluginRef.current, pageNavPluginRef.current]}
              onDocumentLoad={() => setIsPdfLoaded(true)}
            />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default PdfPreview;