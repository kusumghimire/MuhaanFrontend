import React, { useState, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
// import TutorialDataService from "../services/TutorialService";
import TutorialDataService from "../services/TutorialService";
import { useTable } from "react-table";

const TutorialsList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();
const history= useHistory();
  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
  };

  // const removeAllTutorials = () => {
  //   TutorialDataService.removeAll()
  //     .then((response) => {
  //       console.log(response.data);
  //       refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const findByTitle = () => {
  //   TutorialDataService.findByTitle(searchTitle)
  //     .then((response) => {
  //       setTutorials(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };


  const token= JSON.parse(localStorage.getItem('token'));
  console.log(token);
async function deleteTutorial(credentials) {
  console.log(credentials)
  return fetch(`https://muhaan.enterprisesgravity.com/dashboard/category/delete/${credentials}`, {
    method: "OPTIONS",
    headers: {

          "Authorization":`Token ${token}`,    
          "Content-type": "application/json",
          "Accept": "application/json",    
      "Access-Control-Allow-Origin": "*",
    },
    // body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

  const openTutorial = (rowIndex, data) => {
    const id = tutorialsRef.current[rowIndex].id;
    history.push(`/category/update/${id }`, data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Main Category",
        accessor: "cat",
      },
      // {
      //   Header: "Description",
      //   accessor: "description",
      // },
      // {
      //   Header: "Status",
      //   accessor: "published",
      //   Cell: (props) => {
      //     return props.value ? "Published" : "Pending";
      //   },
      // },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
            
              <span style={{marginRight:"0.5rem"}} onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>
              
              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
             
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tutorials,
  });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllTutorials}>
          Remove All
        </button>
      </div> */}
    </div>
  );
};

export default TutorialsList;
