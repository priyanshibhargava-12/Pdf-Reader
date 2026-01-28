import * as XLSX from "xlsx";

const ExcelUploader = ({ setExcelData }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(sheet);
      setExcelData(json);
    };

    reader.readAsBinaryString(file);
  };

  return <input type="file" accept=".xlsx,.xls" onChange={handleUpload} />;
};

export default ExcelUploader;
