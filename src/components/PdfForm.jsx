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
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name to search"
        />
      </div>

      <div>
        <label>Age</label>
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age to search"
        />
      </div>

      <div>
        <label>Designation</label>
        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Enter designation to search"
        />
      </div>

      <div>
        <label>Keywords </label>
        <textarea
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          placeholder="Enter keywords to search"
          rows="4"
        />
      </div>
    </div>
  );
};

export default PdfForm;