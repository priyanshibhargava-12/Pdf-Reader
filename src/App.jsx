import { useState } from "react";
import PdfUploader from "./components/PdfUploader";
import PdfPreview from "./components/PdfPreview";
import PdfForm from "./components/PdfForm";
import "./App.css";

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    designation: "",
    keywords: "",
  });

  return (
    <div className="app">
      <h1 className="heading">PDF Viewer</h1>
      <div className="upload-section">
        <h3>Upload your PDF here : </h3>
        <PdfUploader setPdfUrl={setPdfUrl} />
      </div>

      <div className="content-section">
        <PdfPreview pdfUrl={pdfUrl} formData={formData} />

        <PdfForm formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}

export default App;