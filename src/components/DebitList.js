import React, { useState, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import DebitListApi from "../services/DebitListApi";
import { useTable } from "react-table";

const DebitList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const tutorialsRef = useRef();
  const history= useHistory();
  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    DebitListApi.getAll()
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

  const deleteTutorial = async (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;
    console.log(id);
   await DebitListApi.remove(id)
      .then((response) => {

       let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);

        setTutorials(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTutorial = (rowIndex, data) => {
    const id = tutorialsRef.current[rowIndex].id;
    history.push(`/zone/update/${id}`, data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Created By",
        accessor: "created_by",
      },
      {
        Header: "Payment Choice",
        accessor: "payment_choice",
      },
      {
        Header: "Payment Gateway",
        accessor: "payment_gateway",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    //   {
    //     Header: "Actions",
    //     accessor: "actions",
    //     Cell: (props) => {
    //       const rowIdx = props.row.id;
    //       return (
    //         <div>
            
    //         <span style={{marginRight:"1.5rem"}} onClick={() => openTutorial(rowIdx)}>
    //             <i className="far fa-edit action mr-2"></i>
    //           </span>

    //           <span onClick={() => deleteTutorial(rowIdx)}>
    //             <i className="fas fa-trash action"></i>
    //           </span>
            
    //         </div>
    //       );
    //     },
    //   },
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

export default DebitList;
