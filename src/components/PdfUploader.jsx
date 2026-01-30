const PdfUploader = ({ setPdfUrl }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  return <input type="file" accept="application/pdf" onChange={handleUpload} />;
};

export default PdfUploader;