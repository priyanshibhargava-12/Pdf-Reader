const WordUploader = ({ setWordFile }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
                 file.type === "application/msword")) {
      setWordFile(file);
    } else {
      alert("Please upload a valid Word document (.doc or .docx)");
    }
  };

  return (
    <input 
      type="file" 
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
      onChange={handleUpload} 
    />
  );
};

export default WordUploader;