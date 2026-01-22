import { useState } from "react";
import PdfUploader from "./components/PdfUploader";
import PdfPreview from "./components/PdfPreview";
import PdfForm from "./components/PdfForm";
import ImageUploader from "./components/ImageUploader";
import ImagePreview from "./components/ImagePreview";
import "./App.css";

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [activeViewer, setActiveViewer] = useState("pdf");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    designation: "",
    keywords: "",
  });

  return (
    <div className="app">
      <h1 className="heading">Document Viewer</h1>

      <div className="upload-section">
        <h3>Upload your file :</h3>

        <button
          className={activeViewer === "pdf" ? "active-btn" : ""}
          onClick={() => setActiveViewer("pdf")}
        >
          PDF
        </button>

        <button
          className={activeViewer === "image" ? "active-btn" : ""}
          onClick={() => setActiveViewer("image")}
        >
          Image
        </button>

        {activeViewer === "pdf" && <PdfUploader setPdfUrl={setPdfUrl} />}
        {activeViewer === "image" && (
          <ImageUploader setImageUrl={setImageUrl} />
        )}
      </div>

      <div className="content-section">
        <div className="pdf-container">
          {activeViewer === "pdf" && (
            <PdfPreview pdfUrl={pdfUrl} formData={formData} />
          )}

          {activeViewer === "image" && (
            <ImagePreview imageUrl={imageUrl} formData={formData} />
          )}
        </div>

        <PdfForm formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}

export default App;
