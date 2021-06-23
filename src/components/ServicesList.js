import React, { useState, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import ServiceApi from "../services/ServicesApi";
import { useTable } from "react-table";

const ServicesList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const tutorialsRef = useRef();
  const history= useHistory();

  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    ServiceApi.getAll()
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



  const openTutorial = (rowIndex, data) => {
    const id = tutorialsRef.current[rowIndex].id;
    history.push(`/services/update/${id }`, data);
  };


  const deleteTutorial = async (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;
    console.log(id);
    
  
    await ServiceApi.remove(id)
      .then((response) => {
  
        let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);
  
        setTutorials(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Services",
        accessor: "category",
      },
      {
        Header: "Zone",
        accessor: "zone[0].name",
      },

      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Image",
        accessor: "image",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Rate",
        accessor: "rate",
      },
      {
        Header: "Discount",
        accessor: "discount",
      },
      {
        Header: "Payment Choice",
        accessor: "payment_choice",
      },
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

export default ServicesList;
