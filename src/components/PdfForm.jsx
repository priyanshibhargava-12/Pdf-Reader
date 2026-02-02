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

const PdfForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      // ...formData,
      keywords: e.target.value,
    });
  };

  return (
    <div className="form-section">
      <SearchIcon />
      <h2>Search & Highlight</h2>

      <textarea
        name="keywords"
        value={formData.keywords}
        onChange={handleChange}
        placeholder="Enter keywords (comma separated)"
      />
    </div>
  );
};

export default PdfForm;