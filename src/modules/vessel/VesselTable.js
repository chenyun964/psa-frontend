import React, { Fragment } from 'react';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import FavrouiteModel from './../favourite/FavouriteModel';
import { toast } from 'react-toastify';
import LoginModel from './../authentication/LoginModel';

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

function StatusDesign(cell) {
    switch (cell.cell.value) {
        case "BERTHING":
            return (
                <span className="badge badge-pill badge-info">{cell.cell.render('Cell')}</span>
            )
        case "ALONGSIDE":
            return (
                <span className="badge badge-pill badge-warning">{cell.cell.render('Cell')}</span>
            )
        case "UNBERTHED":
            return (
                <span className="badge badge-pill badge-success">{cell.cell.render('Cell')}</span>
            )
        default:
            return (
                <span className="badge badge-pill badge-danger">{cell.cell.render('Cell')}</span>
            )
    }
}

function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )
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
        state,
        state: { pageIndex },
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            pageIndex: 0,
            pageSize: 10,
            filterTypes,
            initialState: {
                pageSize: 10,
                sortBy: [
                    {
                        id: 'bthgDt',
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
                                <Fragment>
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <i className="la la-sort-amount-desc"></i>
                                                    : <i className="la la-sort-amount-asc"></i>
                                                : ''}
                                        </span>
                                        <div>{column.canFilter && column.Header == "Status" ? column.render('Filter') : null}</div>
                                    </th>
                                </Fragment>
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
                                            <i className={cell.value == null ? "la la-heart-o vs-favourite-icon" : "la la-heart vs-favourite-icon"} onClick={(e) => {
                                                e.stopPropagation();
                                                if(cell.value == null){
                                                    let username = LoginModel.getUserName();
                                                    let data = {
                                                        username: username,
                                                        vsId: row.original.id
                                                    }
                                                    FavrouiteModel.add(data).then((res) => {
                                                        cell.value = res.data;
                                                        e.target.className = "la la-heart vs-favourite-icon";
                                                    }).catch((error) => {
                                                    toast('Fail to favourite vessel.', { type: toast.TYPE.ERROR });
                                                    })
                                                } else{
                                                    FavrouiteModel.remove(cell.value).then((res) => {
                                                        cell.value = null;
                                                        e.target.className = "la la-heart-o vs-favourite-icon";
                                                    }).catch((error) => {
                                                        toast('Fail to remove favourite.', { type: toast.TYPE.ERROR });
                                                    })
                                                }
                                            }}></i>
                                        }
                                        {cell.column.Header == "Status" &&
                                            <StatusDesign cell={cell} />
                                        }
                                        {cell.column.Header != "Status" && cell.column.Header != "#" &&
                                            <span>{!cell.value ? '-' : cell.render('Cell')}</span>
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
    const columns = [
        {
            Header: '#',
            headerClassName: 'text-center',
            accessor: 'favouriteId', // accessor is the "key" in the data
        },
        {
            Header: 'Full Name',
            accessor: 'fullVslM', // accessor is the "key" in the data
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
            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'includes',
        },
    ]

    return (
        <Table columns={columns} data={data.data} />
    )
}

export default CreateTable;