import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import NumberInput from "@mui/base/Unstable_NumberInput";

const itemName = "silai_details";

export default function Search() {
  const [newName, setNewName] = useState(null);
  const [selectedName, setSelectedName] = useState(
    localStorage.getItem("SelectedCustomerName")
  );
  const [customerNames, setCustomerNames] = useState(
    JSON.parse(localStorage.getItem(itemName))?.map((item) => item.name)
  );
  // const [selectedValue, setSelectedValue] = useState(null);

  // const data = JSON.parse(localStorage.getItem(itemName));
  // const customerNames = data?.map((item) => item.name);

  const handleAddNew = () => {
    const obj = { name: newName, kurta: {}, salvar: {} };
    if (localStorage.getItem(itemName)) {
      localStorage.setItem(
        itemName,
        JSON.stringify([...JSON.parse(localStorage.getItem(itemName)), obj])
      );
    } else {
      localStorage.setItem(itemName, JSON.stringify([obj]));
    }
    setCustomerNames(
      JSON.parse(localStorage.getItem(itemName))?.map((item) => item.name)
    );
  };

  const handleSelectedNameChange = (e) => {
    setSelectedName(e.target.innerText);
    console.log(e.target.innerText);

    localStorage.setItem("SelectedCustomerName", e.target.innerText);
    // console.log(e.target.textContent);
    setTimeout(() => {
      document.getElementById("View").click();
    }, 0);
  };

  return (
    <div className="search">
      {customerNames && (
        <div className="selectCustomer">
          <h2>Select customer:</h2>
          <Autocomplete
            options={customerNames}
            onChange={handleSelectedNameChange}
            renderInput={(params) => <TextField {...params} label="" />}
          />
        </div>
      )}
      <br />

      <h2>Add new customer:</h2>
      <div class="form-outline">
        <TextField
          type="text"
          name={newName}
          value={newName}
          placeholder="Name"
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleAddNew}>
        Add
      </button>
    </div>
  );
}
