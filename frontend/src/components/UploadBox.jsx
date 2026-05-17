import { useState } from "react";

function UploadBox({ onFileSelect }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile]         = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") {
      setFile(dropped);
      onFileSelect(dropped);
    }
  };

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) { setFile(selected); onFileSelect(selected); }
  };

  return (
    <div
      data-cy="upload-box"
      className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200
        ${dragOver
          ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById("uploadBoxInput").click()}
    >
      <input
        type="file"
        id="uploadBoxInput"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />
      <div className="text-4xl mb-3">📄</div>
      {file ? (
        <>
          <p className="text-green-600 font-semibold text-sm">{file.name}</p>
          <p className="text-gray-400 text-xs mt-1">
            {(file.size / 1024).toFixed(1)} KB · Click to change
          </p>
        </>
      ) : (
        <>
          <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm mb-1">
            Drop your resume here
          </p>
          <p className="text-gray-400 text-xs">PDF format · Click to browse</p>
        </>
      )}
    </div>
  );
}

export default UploadBox;
