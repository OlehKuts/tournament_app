import { useState } from "react";
import { Link } from "react-router-dom";
export const ImportPage = ({
  exportData,
  importInitialData,
  setShowImport,
  showImport,
}) => {
  const [importedData, setImportedData] = useState("");

  return (
    <>
      <button onClick={exportData}>Експортувати дані</button>
      <button onClick={() => setShowImport(true)}>Імпортувати дані</button>
      <hr />
      {showImport ? (
        <div className="importBlock">
          <textarea
            placeholder="Вставте сюди дані для імпорту..."
            value={importedData}
            onChange={(e) => setImportedData(e.target.value)}
            cols="125"
            rows="25"
          />
          <div className="submitBtnLine">
            <button onClick={() => importInitialData(importedData)}>
              <Link to={"/"}>Підтвердити імпорт</Link>
            </button>
            <button onClick={() => setShowImport(false)}>Відмінити</button>
          </div>
          <hr />
        </div>
      ) : null}
    </>
  );
};
