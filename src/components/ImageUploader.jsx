const ImageUploader = ({ setImageUrl }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return <input type="file" accept="image/*" onChange={handleUpload} />;
};

export default ImageUploader;
