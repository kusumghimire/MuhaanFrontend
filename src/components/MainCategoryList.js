import React from 'react';
import { useExpanded, useTable } from 'react-table';

import makeData from './makeData';

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

function SubRowAsync({ row, rowProps, visibleColumns }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData(makeData(3));
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SubRows
      row={row}
      rowProps={rowProps}
      visibleColumns={visibleColumns}
      data={data}
      loading={loading}
    />
  );
}

// option we are creating for ourselves in our table renderer
function Table({ columns: userColumns, data, renderRowSubComponent }) {
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
      data
    },
    useExpanded // We can useExpanded to track the expanded state
    // for sub components too!
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
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

function App() {
  const columns = React.useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
        SubCell: () => null // No expander on an expanded row
      },
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: (d) => d.firstName,
            SubCell: (cellProps) => (
              <> {cellProps.value}</>
            )
          },
          {
            Header: 'Last Name',
            accessor: (d) => d.lastName
          }
        ]
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: (d) => d.age
          },
          {
            Header: 'Visits',
            accessor: (d) => d.visits
          },
          {
            Header: 'Status',
            accessor: (d) => d.status
          },
          {
            Header: 'Profile Progress',
            accessor: (d) => d.progress
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(() => makeData(10), []);

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
      <Table
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
  );
}

export default App;
