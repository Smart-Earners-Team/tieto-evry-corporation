import React, { useCallback, useMemo, useState } from "react";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { useTable, usePagination } from "react-table";
import { BigNumber } from "bignumber.js";
import { BsHddStack, BsStack } from "react-icons/bs";
import cls from "classnames";

interface RewardsTableModalProps {
  closeHandler: () => void;
  initialDeposit: BigNumber;
}
type Accessor = "day" | "total" | "roi";
const daysInAYear = 365;
const percentageReturn = 0.03; // 3%
const devFeePercentage = 0.03; // 3%

const formatBigNumber = (value: BigNumber) => {
  return `$${value.toFixed(2)}`;
};

type ViewState = "all" | "summary";
export default function RewardsTableModal({
  closeHandler,
  initialDeposit,
}: RewardsTableModalProps) {
  const [viewState, setState] = useState<ViewState>("all");

  const rewardsData = useMemo(() => {
    const rewardsObj = [];
    const devFee = initialDeposit.times(devFeePercentage);
    let lastTotal = initialDeposit.minus(devFee); // Minus dev fee

    for (let day = 1; day < daysInAYear + 1; day++) {
      // Return on investment
      const roi = lastTotal.times(percentageReturn);

      rewardsObj.push({
        day: day.toString(),
        total: formatBigNumber(lastTotal),
        roi: formatBigNumber(roi),
      });
      lastTotal = lastTotal.plus(roi);
    }

    // check for the viewState
    if (viewState === "all") {
      return rewardsObj;
    } else {
      const summaryObj = rewardsObj.filter(
        (obj) => Number.parseInt(obj.day) % 30 === 0
      );
      summaryObj.forEach((obj) => (obj.day = `In ${obj.day} days, you get`));
      return summaryObj;
    }
  }, [initialDeposit, viewState]);

  const onChange = (view: typeof viewState) => {
    setState(view);
  };

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
    <div
      className="bg-white w-full max-w-lg rounded-t-xl max-h-[calc(100vh-50px)] overflow-y-auto
      transition-all duration-200"
    >
      <ModalHeader closeHandler={closeHandler} />
      <div className="p-4">
        <div className="text-gray-400 text-sm mb-3 font-light">
          <p>
            Tip: You can view summary of rewards in 30 days interval by using
            the <b>view by</b> buttons.
          </p>
          <FilterChip changeHandler={onChange} view={viewState} />
          <p>
            Viewing{" "}
            {viewState === "all"
              ? "rewards for everyday"
              : "rewards in 30 days interval"}
          </p>
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
        <div className="mt-3 flex flex-col items-center">
          <div className="my-2">
            <ul className="flex p-1 list-none w-full">
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                  disabled:opacity-40 hover:bg-blue-100 underline"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  First
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                  disabled:opacity-40 hover:bg-blue-100 underline"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                disabled:opacity-40 hover:bg-blue-100 underline"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                disabled:opacity-40 hover:bg-blue-100 underline"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  Last
                </button>
              </ListItem>
            </ul>
          </div>
          <div className="text-xs text-gray-500">
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
                className="w-10 border-b outline-none border-gray-500 px-1 rounded-sm bg-blue-50"
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="w-20 border-b outline-none border-gray-500 bg-blue-50 rounded-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <ModalFooter />
    </div>
  );
}

const ListItem = (props: { children: React.ReactNode }) => (
  <li className="relative block bg-white text-blue-700 ml-1 !underline">
    {props.children}
  </li>
);

const FilterChip = (props: {
  changeHandler: (view: ViewState) => void;
  view: ViewState;
}) => {
  return (
    <div className="border rounded inline-flex items-stretch space-x-3 h-12 font-normal my-3">
      <span className="bg-gray-200 inline-flex items-center p-2">View By</span>
      <div className="flex items-center p-1 space-x-3">
        <button
          onClick={() => props.changeHandler("summary")}
          title="30 Days Interval"
          className={cls(
            "p-2 rounded-full inline-block bg-gray-50 transition-all duration-600 border-2",
            "border-transparent",
            {
              " border-blue-500 text-blue-500": props.view === "summary",
            }
          )}
        >
          <BsHddStack className="h-6 w-6" />
        </button>
        <button
          onClick={() => props.changeHandler("all")}
          title="1 Day Interval"
          className={cls(
            "p-2 rounded-full inline-block bg-gray-50 transition-all duration-600 border-2",
            "border-transparent",
            {
              " border-blue-500 text-blue-500": props.view === "all",
            }
          )}
        >
          <BsStack className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
