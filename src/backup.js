import "./styles.css";

export default function Backup() {
  const itemName = "silai_details";

  function saveArrayAsJSON(array) {
    const data = JSON.stringify(array, null, 4);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    const currentDate = new Date();
    console.log(currentDate.toString());

    a.download = "Backup SilaiMeasurementsWebApp - " + currentDate;
    a.click();

    // Revoke the URL object to release memory
    URL.revokeObjectURL(url);
  }

  const handleBackup = () => {
    const data = JSON.parse(localStorage.getItem(itemName));
    saveArrayAsJSON(data);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      console.log(JSON.parse(fileContent));
      if (!window.confirm("This will replace existing data. Are you sure?")) {
        return;
      }
      const extraBackup = localStorage.getItem(itemName);
      localStorage.setItem(itemName + "_extra_backup", extraBackup);
      localStorage.setItem(itemName, JSON.stringify(JSON.parse(fileContent)));
      alert("Data is Restored.");
    };
    file && reader.readAsText(file);
  };

  return (
    <div className="settings">
      <p>Download backup file on your device:</p>
      <button className="btn btn-primary" onClick={handleBackup}>
        Backup
      </button>
      <br />
      <br />
      <p>Restore browser data by uploading a backup file:</p>
      <input type="file" id="restore" onChange={handleFileUpload} />
      <br />
      <br />
    </div>
  );
}
