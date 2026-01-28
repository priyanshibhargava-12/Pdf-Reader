import { useEffect, useMemo, useRef } from "react";

const ExcelPreview = ({ excelData, formData }) => {
  const firstMatchRef = useRef(null);

  //  Prepare keywords like PDF
  const keywords = useMemo(() => {
    return formData.keywords
        ? formData.keywords.split(",").map((k) => k.trim())
        : [];
  }, [formData]);

  // Auto scroll to first highlight
  useEffect(() => {
    if (firstMatchRef.current) {
      firstMatchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [keywords]);

  if (!excelData || excelData.length === 0) {
    return <div className="preview-empty">📊 Upload an Excel file to preview</div>;
  }

  const isMatch = (cell) => {
    if (!cell) return false;
    return keywords.some((k) =>
      cell.toString().toLowerCase().includes(k.toLowerCase()),
    );
  };

  let firstFound = false;

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {Object.keys(excelData[0]).map((key) => (
              <th
                key={key}
                style={{
                  border: "1px solid #444",
                  padding: "8px",
                  background: "#14183a",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {excelData.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((cell, j) => {
                const match = isMatch(cell);
                const isFirst = match && !firstFound;

                if (isFirst) firstFound = true;

                return (
                  <td
                    key={j}
                    ref={isFirst ? firstMatchRef : null} 
                    style={{
                      border: "1px solid #333",
                      padding: "6px",
                      backgroundColor: match
                        ? "rgb(58, 230, 61)"
                        : "transparent",
                      color: match ? "#fff" : "#c7c8cc",
                      transition: "0.2s",
                    }}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelPreview;
