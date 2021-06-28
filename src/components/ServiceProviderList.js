import React, { useState, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import ServiceProviderApi from "../services/ServiceProviderApi";
import { useTable } from "react-table";

const ServiceProviderList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const tutorialsRef = useRef();
  const history= useHistory();
  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    ServiceProviderApi.getAll()
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

  // const openTutorial = (rowIndex, data) => {
  //   const id = tutorialsRef.current[rowIndex].id;
  //   history.push(`/add-on/update/${id }`, data);
  // };

  // const deleteTutorial = async (rowIndex) => {
  //   const id = tutorialsRef.current[rowIndex].id;
  //   console.log(id);
    
  //   await ServiceProviderApi.remove(id)
  //     .then((response) => {
  //       let newTutorials = [...tutorialsRef.current];
  //       newTutorials.splice(rowIndex, 1);
  
  //       setTutorials(newTutorials);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Image",
        accessor: "profile_pic",
        maxWidth: 40,
        minWidth: 20,
        maxHeight:40,
        minHeight:20,
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            width={60}
          />
        )
      },
      {
        Header: "Address",
        accessor: "address",
      },

      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phone_no",
      },      
      {
        Header: "Office Name",
        accessor: "office_name",
      },
      
      {
        Header: "Office Name",
        accessor: "office_address",
      },
      {
        Header: "PAN",
        accessor: "pan",
      },
      {
        Header: "Citizenship",
        accessor: "citizenship",
        maxWidth: 40,
        minWidth: 20,
        maxHeight:40,
        minHeight:20,
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            width={60}
          />
        )
      },
      {
        Header: "Document",
        accessor: "document",
        maxWidth: 40,
        minWidth: 20,
        maxHeight:40,
        minHeight:20,
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            width={60}
          />
        )
      },
      // {
      //   Header: "Verified OTP",
      //   accessor: "document",
      // },
      // {
      //   Header: "Status",
      //   accessor: "published",
      //   Cell: (props) => {
      //     return props.value ? "Published" : "Pending";
      //   },
      // },
      // {
      //   Header: "Actions",
      //   accessor: "actions",
      //   Cell: (props) => {
      //     const rowIdx = props.row.id;
      //     return (
      //       <div>
            
      //         <span style={{marginRight:"0.5rem"}} onClick={() => openTutorial(rowIdx)}>
      //           <i className="far fa-edit action mr-2"></i>
      //         </span>

      //         <span onClick={() => deleteTutorial(rowIdx)}>
      //           <i className="fas fa-trash action"></i>
      //         </span>
             
      //       </div>
      //     );
      //   },
      // },
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

export default ServiceProviderList;
