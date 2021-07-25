import React, { useState, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import CancelledServiceApi from "../services/CancelledServiceApi";
import { useTable } from "react-table";

const CancelledServiceList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const tutorialsRef = useRef();
  const history= useHistory();
  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    CancelledServiceApi.getAll()
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

// Here it need to be dropdown
  const openTutorial = (rowIndex, data) => {
    // const id = tutorialsRef.current[rowIndex].id;
    // history.push(`/zone/update/${id }`, data);
  };

// Here it need to be dropdown
const decisionRequest = (rowIndex, data) => {
    // const id = tutorialsRef.current[rowIndex].id;
    // history.push(`/zone/update/${id }`, data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Service",
        accessor: "service",
      },
      {
        Header: "Add On",
        id: "add_ons",
        accessor: (data) =>
        data.add_ons.map((list) => (
          <div style={{ padding: "5px" }}>
            <span style={{ margin: "5px" }}>{list.name}</span>
          </div>
        )),
      },
      {
        Header: "Service Provider",
        accessor: "service_provider",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
     
      {
        Header: "Requested Date",
        accessor: "requested_date",
      },
     
      {
        Header: "Requested Time",
        accessor: "requested_time",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
            
              <span style={{marginRight:"0.5rem"}} onClick={() => openTutorial(rowIdx)}>
                {/* <i className="far fa-edit action mr-2"></i> */}
                Preview Data
              </span>

              <span onSubmit={() => decisionRequest(rowIdx)}>
                {/* <i className="fas fa-trash action"></i> */}
                Make A decision
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
    </div>
  );
};

export default CancelledServiceList;
