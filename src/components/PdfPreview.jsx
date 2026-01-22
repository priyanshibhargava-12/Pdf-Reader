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
    })
  );


  const pageNavPluginRef = useRef(pageNavigationPlugin());

  const { highlight, clearHighlights } = searchPluginRef.current;
  const { CurrentPageLabel } = pageNavPluginRef.current;

  const [isPdfLoaded, setIsPdfLoaded] = useState(false);


  useEffect(() => {
    if (!pdfUrl || !isPdfLoaded) return;

    const keywords = [
      formData?.name,
      formData?.age,
      formData?.designation,
      ...(formData?.keywords
        ? formData.keywords.split(",").map((k) => k.trim())
        : []),
    ].filter((k) => typeof k === "string" && k.length > 0);

    clearHighlights();
    if (!keywords.length) return;
    console.log(formData);
  const values = keywords.map((word) => ({
        keyword: word,
        matchCase: false,
        wholeWords: true, 
      }))
       console.log(values);
    highlight(
      values
    );
  }, [formData, pdfUrl, isPdfLoaded]);

  return (
    <div className="pdf-container" style={{ height: "100%" }}>
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
        <>
    
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "6px 12px",
              fontSize: "14px",
              color: "#c7c8cc",
            }}
          >
            <CurrentPageLabel>
              {(props) => (
                <>
                   {props.currentPage + 1} / {props.numberOfPages}
                </>
              )}
            </CurrentPageLabel>
          </div>

          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfUrl}
              plugins={[
                searchPluginRef.current,
                pageNavPluginRef.current,
              ]}
              onDocumentLoad={() => setIsPdfLoaded(true)}
            />
          </Worker>
        </>
      )}
    </div>
  );
};

export default PdfPreview;
