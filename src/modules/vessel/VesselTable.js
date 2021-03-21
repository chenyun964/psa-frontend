import React from 'react';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    )
}

function StatusDesign(cell){
    switch(cell.cell.value){
        case "BERTHING":
            return (
                <span class="badge badge-pill badge-info">{cell.cell.render('Cell')}</span>
            )
        case "ALONGSIDE":
            return (
                <span class="badge badge-pill badge-warning">{cell.cell.render('Cell')}</span>
            )
        case "UNBERTHED":
            return (
                <span class="badge badge-pill badge-sucess">{cell.cell.render('Cell')}</span>
            )
        default:
            return (
                <span class="badge badge-pill badge-danger">{cell.cell.render('Cell')}</span>
            )
    }
    
}


function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        pageIndex,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            pageIndex: 0,
            pageSize: 20,
            initialState:{
                sortBy:[
                    {
                        id:'fullVslM',
                        desc: false
                    }
                ]
            }
        },

        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy,
        usePagination
    )

    // Render the UI for your table
    return (
        <div>
            <table className="table table-responsive-xl table-striped table-bordered dataTable" role="grid" {...getTableProps()}>
                <tr>
                    <th colSpan={visibleColumns.length}>
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </th>
                </tr>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <i className="la la-sort-amount-desc"></i>
                                                : <i className="la la-sort-amount-asc"></i>
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={() => window.location.replace('/vessel/' + row.original.id)}>
                                {row.cells.map(cell => {
                                    return <td key={i} role="row" className="odd" {...cell.getCellProps()}>
                                        {cell.column.Header == "#" &&
                                            <i class="la la-star"></i>
                                        }
                                        {cell.column.Header == "Status" &&
                                                <StatusDesign cell={cell} />
                                        }
                                        {cell.column.Header != "Status" &&
                                            <span>{!cell.value ? '-' :  cell.render('Cell')}</span>
                                        }
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button className="btn btn-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button className="btn btn-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        min="1"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
            </div>
        </div>
    )
}

function CreateTable(data) {
    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Full Name',
                accessor: 'fullVslM', // accessor is the "key" in the data
                filter: 'fuzzyText',
            },
            {
                Header: 'Incoming Voyage',
                accessor: 'inVoyN',
            },
            {
                Header: 'Outgoing Voyage',
                accessor: 'outVoyN',
            },
            {
                Header: 'Berth Time Required',
                accessor: 'bthgDt',
            },
            {
                Header: 'Berth Number',
                accessor: 'berthN',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
        ],
        []
    )

    return (
        <Table columns={columns} data={data.data}/>
    )
}

export default CreateTable;