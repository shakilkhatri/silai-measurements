import "./styles.css";

import React, { useState } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const Preview = () => {
  const [name, setName] = useState(
    localStorage.getItem("SelectedCustomerName")
  );
  const [data, setData] = useState(
    localStorage.getItem("silai_details") &&
      JSON.parse(localStorage.getItem("silai_details"))?.find(
        (item) => item.name === localStorage.getItem("SelectedCustomerName")
      )
  );

  const [kurtaMeasurements, setKurtaMeasurements] = useState({
    shoulder: null,
    chest: null,
    waist: null,
    seat: null,
    gher: null,
    neckWidth: null,
    neckLength: null,
    neckBack: null,
    armHole: null,
    sleeveLength: null,
    sleeveWidth: null,
    modhiyu: null,
    ...data?.kurta

    // ...JSON.parse(localStorage.getItem("silai_details")).filter(item=>item.name===localStorage.getItem("SelectedCustomerName")).kurta
  });

  const [salvarMeasurements, setSalvarMeasurements] = useState({
    length: null,
    width: null,
    seat: null,
    mori: null,
    beltWidth: null,
    beltLength: null,
    ...data?.salvar
  });

  const [salvarMargins, setSalvarMargins] = useState({
    length: 2,
    width: 0,
    seat: 1,
    mori: 1.5,
    beltWidth: 1,
    beltLength: 2
  });

  const [kurtaMargins, setKurtaMargins] = useState({
    shoulder: 1,
    chest: 3,
    waist: 3,
    seat: 2,
    gher: 2,
    neckWidth: 0,
    neckLength: 0,
    neckBack: 0.75,
    armHole: 0,
    sleeveLength: 1.5,
    sleeveWidth: 3,
    modhiyu: 3
  });

  const handleInputChangeKurta = (e) => {
    const { name, value } = e.target;
    setKurtaMeasurements({ ...kurtaMeasurements, [name]: parseFloat(value) });
  };

  const handleInputChangeSalvar = (e) => {
    const { name, value } = e.target;
    setSalvarMeasurements({ ...salvarMeasurements, [name]: parseFloat(value) });
  };

  const calculateWithMargin = (measurement, margin) => {
    return measurement + margin;
  };

  const calcFourfold = (measurement, margin) => {
    return (measurement + margin) / 2;
  };

  const handleSave = () => {
    if (localStorage.getItem("silai_details")) {
      const arr = JSON.parse(localStorage.getItem("silai_details"))?.map(
        (item) => {
          if (item.name === name) {
            return {
              name,
              kurta: kurtaMeasurements,
              salvar: salvarMeasurements
            };
          } else {
            return item;
          }
        }
      );
      localStorage.setItem("silai_details", JSON.stringify(arr));
    } else {
      const obj = {
        name,
        kurta: kurtaMeasurements,
        salvar: salvarMeasurements
      };
      localStorage.setItem("silai_details", JSON.stringify([obj]));
    }
  };

  return (
    <div className="preview">
      <h2>Name: {name}</h2>
      <br />
      <br />
      <h1>KURTA</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Measurement</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>With Margin</TableCell>
              <TableCell>FourFold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(kurtaMeasurements).map((measurement) => (
              <TableRow key={measurement}>
                <TableCell>{measurement}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    name={measurement}
                    value={kurtaMeasurements[measurement]}
                    onChange={handleInputChangeKurta}
                  />
                </TableCell>
                <TableCell>
                  {kurtaMeasurements[measurement] > 0
                    ? calculateWithMargin(
                        kurtaMeasurements[measurement],
                        kurtaMargins[measurement]
                      )
                    : ""}
                </TableCell>
                <TableCell>
                  {kurtaMeasurements[measurement] > 0
                    ? calcFourfold(
                        kurtaMeasurements[measurement],
                        kurtaMargins[measurement]
                      )
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <br />
      <br />

      <h1>SALVAR</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Measurement</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>With Margin</TableCell>
              <TableCell>FourFold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(salvarMeasurements).map((measurement) => (
              <TableRow key={measurement}>
                <TableCell>{measurement}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    name={measurement}
                    value={salvarMeasurements[measurement]}
                    onChange={handleInputChangeSalvar}
                  />
                </TableCell>
                <TableCell>
                  {salvarMeasurements[measurement] > 0
                    ? calculateWithMargin(
                        salvarMeasurements[measurement],
                        salvarMargins[measurement]
                      )
                    : ""}
                </TableCell>
                <TableCell>
                  {salvarMeasurements[measurement] > 0
                    ? calcFourfold(
                        salvarMeasurements[measurement],
                        salvarMargins[measurement]
                      )
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <button onClick={handleSave}>Save</button>
      <br />
      <br />
    </div>
  );
};

export default Preview;
