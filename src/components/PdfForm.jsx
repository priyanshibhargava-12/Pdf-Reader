const PdfForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-section">
      <h2>Search & Highlight</h2>
       <div>
        <label>Keywords</label>
        <textarea
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          placeholder="Enter keywords (comma separated)"
          rows="4"
        />
      </div>
    </div>
  );
};

export default PdfForm;