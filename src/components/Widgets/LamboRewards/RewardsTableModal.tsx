import React, { useCallback, useMemo, useState } from "react";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { useTable, usePagination } from "react-table";
import { BigNumber } from "bignumber.js";
import { AiOutlineFilter } from "react-icons/ai";
import { BsStack } from "react-icons/bs";

interface RewardsTableModalProps {
  closeHandler: () => void;
  initialDeposite: BigNumber;
}
type Accessor = "day" | "total" | "roi";
const daysInAYear = 365;
const percentageReturn = 0.03; // 3%
const devFeePercentage = 0.03; // 3%

const formatBigNumber = (value: BigNumber) => {
  return `$${value.toFixed(2)}`;
};

export default function RewardsTableModal({
  closeHandler,
  initialDeposite,
}: RewardsTableModalProps) {

  const rewardsData = useMemo(() => {
    const rewardsObj = [];
    const devFee = initialDeposite.times(devFeePercentage);
    let lastTotal = initialDeposite.minus(devFee); // Minus dev fee

    for (let day = 0; day < daysInAYear; day++) {
      // Return on investment
      const roi = lastTotal.times(percentageReturn);

      rewardsObj.push({
        day: day + 1,
        total: formatBigNumber(lastTotal),
        roi: formatBigNumber(roi),
      });
      lastTotal = lastTotal.plus(roi);
    }

    return rewardsObj;
  }, [initialDeposite]);

  interface ColumnProps {
    Header: Omit<React.ReactNode, "null">;
    accessor: Accessor;
  }

  const columns: ColumnProps[] = useMemo(
    () => [
      {
        Header: "Days",
        accessor: "day",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "ROI",
        accessor: "roi",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: rewardsData,
      initialState: { pageIndex: 0 },
      autoResetPage: false,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <div className="bg-white w-full max-w-lg rounded-xl">
      <ModalHeader closeHandler={closeHandler} />
      <div className="p-4">
        <div className="text-gray-400 text-sm mb-3 font-light">
          Tip: You can view summary of rewards in 30 days interval by using the
          view by buttons.
        </div>
        <table
          className="min-w-full divide-y divide-gray-200 table-auto"
          {...getTableProps()}
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    {...column.getHeaderProps()}
                    className="py-3 px-2 text-xs min-w-min whitespace-nowrap font-medium tracking-wider
                        text-left text-gray-700 uppercase"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200 w-full"
          >
            {page.length > 0 &&
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-100">
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="p-2 text-sm text-gray-900 whitespace-nowrap"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="mt-3 flex flex-col md:flex-row-reverse md:justify-end md:gap-3 items-center">
          <div className="text-sm text-gray-500 mt-3 md:mt-0">
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                className="w-20 border-b-2 outline-none border-gray-500 px-1 rounded-sm bg-transparent"
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="w-20 border-b-2 outline-none border-gray-500 bg-transparent rounded-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4">
            <ul className="flex pl-0 list-none">
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                  disabled:opacity-40"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  First
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                  disabled:opacity-40"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                disabled:opacity-40"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                disabled:opacity-40"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  Last
                </button>
              </ListItem>
            </ul>
          </div>
        </div>
      </div>
      <ModalFooter />
    </div>
  );
}

const ListItem = (props: { children: React.ReactNode }) => (
  <li className="relative block leading-tight bg-white border border-gray-300 text-blue-700 ml-1">
    {props.children}
  </li>
);

const FilterChip = () => {
  const [state, setState] = useState<"all" | "summary">("all");

  const onChange = (view: typeof state) => {
    setState(view);
    return view;
  };

  return (
    <div>
      <div>View By</div>
      <button onClick={() => onChange("summary")}>
        <AiOutlineFilter />
      </button>
      <button onClick={() => onChange("all")}>
        <BsStack />
      </button>
    </div>
  );
};
