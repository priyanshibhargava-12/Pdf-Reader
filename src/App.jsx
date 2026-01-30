import { useState } from "react";
import PdfUploader from "./components/PdfUploader";
import PdfPreview from "./components/PdfPreview";
import PdfForm from "./components/PdfForm";
import ImageUploader from "./components/ImageUploader";
import ImagePreview from "./components/ImagePreview";
import ExcelUploader from "./components/ExcelUploader";
import ExcelPreview from "./components/ExcelPreview";
import WordUploader from "./components/WordUploader";
import WordPreview from "./components/WordPreview";
import "./App.css";

// Icon components
const FileIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
    <polyline points="13 2 13 9 20 9"></polyline>
  </svg>
);

const ImageIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const DocumentIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="12" y1="19" x2="12" y2="19"></line>
  </svg>
);

const TableIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9h18v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9z"></path>
    <path d="M3 9V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v2"></path>
    <line x1="3" y1="13" x2="21" y2="13"></line>
    <line x1="3" y1="17" x2="21" y2="17"></line>
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const HamburgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [wordFile, setWordFile] = useState(null);
  const [activeViewer, setActiveViewer] = useState("pdf");
  const [formData, setFormData] = useState({ keywords: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
      {/* HEADER */}
      <div className="app-header">
        <div className="header-content">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
          <h1 className="app-title">Document Viewer</h1>
        </div>
      </div>

      {/* SIDEBAR OVERLAY FOR MOBILE */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="app-body">
        {/* SIDEBAR */}
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="document-types">
            <button
              className={
                activeViewer === "pdf" ? "doc-type-btn active" : "doc-type-btn"
              }
              onClick={() => setActiveViewer("pdf")}
            >
              <FileIcon />
              PDF
            </button>

            <button
              className={
                activeViewer === "image"
                  ? "doc-type-btn active"
                  : "doc-type-btn"
              }
              onClick={() => setActiveViewer("image")}
            >
              <ImageIcon />
              Image
            </button>

            <button
              className={
                activeViewer === "word" ? "doc-type-btn active" : "doc-type-btn"
              }
              onClick={() => setActiveViewer("word")}
            >
              <DocumentIcon />
              Word
            </button>

            <button
              className={
                activeViewer === "excel"
                  ? "doc-type-btn active"
                  : "doc-type-btn"
              }
              onClick={() => setActiveViewer("excel")}
            >
              <TableIcon />
              Excel
            </button>
          </div>

          {/* UPLOADER ALWAYS VISIBLE */}
          <div className="upload-area">
            <h3>Upload Document</h3>

            {activeViewer === "pdf" && <PdfUploader setPdfUrl={setPdfUrl} />}
            {activeViewer === "image" && (
              <ImageUploader setImageUrl={setImageUrl} />
            )}
            {activeViewer === "word" && (
              <WordUploader setWordFile={setWordFile} />
            )}
            {activeViewer === "excel" && (
              <ExcelUploader setExcelData={setExcelData} />
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          {/* SEARCH BAR */}
          <div className="search-panel">
            <PdfForm formData={formData} setFormData={setFormData} />
          </div>

          {/* PREVIEW */}
          <div className="preview-container">
            {activeViewer === "pdf" && (
              <PdfPreview pdfUrl={pdfUrl} formData={formData} />
            )}
            {activeViewer === "image" && (
              <ImagePreview imageUrl={imageUrl} formData={formData} />
            )}
            {activeViewer === "word" && (
              <WordPreview wordFile={wordFile} formData={formData} />
            )}
            {activeViewer === "excel" && (
              <ExcelPreview excelData={excelData} formData={formData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;