import "./App.css";
import { useState } from "react";
import Papa from "papaparse";

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  //State to set top three pedelic models
  const [topThree, setTopThree] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);
        console.log(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);

        const mix = valuesArray;
        //console.table(mix);
        //console.log(mix[0][2]);
        var model = [];
        mix.forEach((mark) => {
          var data = mark[2];
          model.push(data);
          //console.log(mark[2]);
        });

        model = model.toLocaleString().toUpperCase().split(",");
        //console.log(model); //["this", "is an", "array"]

        const newArray = JSON.parse(JSON.stringify(model).replace(/-/g, " "));

        const count = {};

        newArray.forEach((element) => {
          count[element] = (count[element] || 0) + 1;
        });
        console.log(count);
        const keysSorted = Object.keys(count).sort(function (a, b) {
          return count[b] - count[a];
        });
        //console.log(keysSorted);
        setTopThree(keysSorted.slice(0, 3));
        console.log(keysSorted);
        console.log(topThree);
        //setTopThree(finalResult);
        //topThree.push(finalResult);
      },
    });
  };

  return (
    <div className="content">
      {/* File Uploader */}
      <h1 className="heading">BikEEE</h1>
      <h3 className="subheading">
        Choose a csv file to parse the data into table
      </h3>
      <div className="fileupload">
        <input type="file" onChange={changeHandler} accept=".csv" />
      </div>
      {/* Top three models */}
      <div>
        <h2>Top three pedelic models advertised on BikEEE</h2>

        <div>
          {console.log(topThree)}
          <ol>
            {topThree.map((item, index) => (
              <li className="topthree" key={index}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
      {/* Table */}
      <h3>List of advertised models on Bikee</h3>
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
