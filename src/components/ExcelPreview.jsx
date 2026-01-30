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

  const TableIconComponent = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 9h18v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9z"></path>
      <path d="M3 9V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v2"></path>
      <line x1="3" y1="13" x2="21" y2="13"></line>
      <line x1="3" y1="17" x2="21" y2="17"></line>
    </svg>
  );

  if (!excelData || excelData.length === 0) {
    return (
      <div className="preview-empty">
        <TableIconComponent />
        <span>Upload an Excel file to preview</span>
      </div>
    );
  }

  const isMatch = (cell) => {
    if (!cell) return false;
    return keywords.some((k) =>
      cell.toString().toLowerCase().includes(k.toLowerCase()),
    );
  };

  let firstFound = false;

  return (
    <div
      style={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: "auto",
          width: "100%",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              {Object.keys(excelData[0]).map((key) => (
                <th
                  key={key}
                  style={{
                    border: "1px solid #374151",
                    padding: "12px",
                    background: "#1F2937",
                    color: "#D1D5DB",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    fontWeight: 600,
                    fontSize: "13px",
                    textAlign: "left",
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
                        border: "1px solid #374151",
                        padding: "10px 12px",
                        backgroundColor: match
                          ? "rgba(16, 185, 129, 0.2)"
                          : "transparent",
                        color: match ? "#10B981" : "#D1D5DB",
                        transition: "background-color 0.2s ease",
                        fontSize: "14px",
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
    </div>
  );
};

export default ExcelPreview;