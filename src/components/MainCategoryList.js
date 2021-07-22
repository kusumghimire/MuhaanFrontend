import React, { useState, useEffect, useMemo, useRef } from "react";
import { useExpanded, useTable } from 'react-table';
import styled from 'styled-components';
import TutorialDataService from "../services/TutorialService";

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    width:800px;
    tr {
      :last-child {
        td {
         border-right: 1px solid transparent;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      // border-right: 1px solid black;
      :last-child {
        // border-right: 1px solid transparent;
      }
    }
  }
`;

// This could be inlined into SubRowAsync, this this lets you reuse it across tables
function SubRows({ row, rowProps, visibleColumns, data, loading }) {
  if (loading) {
    return (
      <tr>
        <td/>
        <td colSpan={visibleColumns.length - 1}>
          Loading...
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map((x, i) => {
        return (
          <tr
            {...rowProps}
            key={`${rowProps.key}-expanded-${i}`}
          >
            {row.cells.map((cell) => {
              return (
                <td
                  {...cell.getCellProps()}
                >
                  {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                    value:
                      cell.column.accessor &&
                      cell.column.accessor(x, i),
                    row: { ...row, original: x }
                  })}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}

function SubRowAsync({ row,rowProps, visibleColumns}) {
  
  const [loading, setLoading] = React.useState(true);
  const [subCat, setSubData] = React.useState([]);

  const retrieveTutorialsSubCat = (id) => {
    TutorialDataService.getSubCategory(id)
      .then((response) => {
        // if(id){
        //   const sub= response.data.filter((each)=>each.id===id)
        // }
        setSubData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => { 
      retrieveTutorialsSubCat(row.id);
      setLoading(false);
    return () => {
      // clearTimeout(timer);
    };
  }, []);

  return (
    <SubRows
      row={row}
      rowProps={rowProps}
      visibleColumns={visibleColumns}
      data={subCat}
      loading={loading}
    
    />
  );
}

// option we are creating for ourselves in our table renderer
function Table({ columns: userColumns, renderRowSubComponent }) {
  const [mainCat, setMainCategory] = useState([]);

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setMainCategory(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveTutorials();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded }
  } = useTable(
    {
      columns: userColumns,
      data: mainCat,
    },
    useExpanded // We can useExpanded to track the expanded state
    // for sub components too!
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} >
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          const rowProps = row.getRowProps();
          return (
            // Use a React.Fragment here so the table markup is still valid
            <React.Fragment key={rowProps.key}>
              <tr {...rowProps}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
              {row.isExpanded &&
                renderRowSubComponent({ row, rowProps, visibleColumns })}
            </React.Fragment>
          );
        })}
        </tbody>
      </table>
      <br/>
    </>
  );
}

function MainCategoryList() {
  const [id, setId]= useState(null);
  const columns = React.useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? (
              <i  className="fas fa-chevron-up" />
            ) : (
              <i onClick={()=>setId(row.id)} className="fas fa-chevron-down" />
            )}
            {/* {row.isExpanded ? '👇' : '👉'} */}
          </span>
        ),
        SubCell: () => null // No expander on an expanded row
      },
      {
        Header: 'Maincategory',
        accessor: (d) => d.title,
        SubCell: (cellProps) => (
          <>{cellProps.value}</>
        )
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span
                style={{ marginRight: "1.5rem" }}
                // onClick={() => openTutorial(rowIdx)}
              >
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span 
              // onClick={() => deleteTutorial(rowIdx)}
              >
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
      row={row}
      rowProps={rowProps}
      visibleColumns={visibleColumns}
      />
    ),
    []
  );

  return (
    <Styles>
      <Table
        columns={columns}
        // data={mainCat}
        renderRowSubComponent={renderRowSubComponent}
      />
      </Styles>
  );
}

export default MainCategoryList;