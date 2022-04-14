import React, { useMemo, useState } from "react";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { useTable, usePagination } from "react-table";
import { BigNumber } from "bignumber.js";
import { BsHddStack, BsStack } from "react-icons/bs";
import cls from "classnames";
import { AiOutlineRise } from "react-icons/ai";
import { useTokenPrices } from "../../../hooks/useTokenPrices";
import { BIG_ZERO } from "../../../utils/bigNumber";

interface RewardsTableModalProps {
  closeHandler: () => void;
  initialDeposit: BigNumber;
}
type Accessor = "day" | "total" | "roi";
const daysInAYear = 365;
const percentageReturn = 0.03; // 3%
const devFeePercentage = 0.03; // 3%
const futureLamboPrice = 0.00005;

interface TableData {
  day: string;
  total: BigNumber;
  roi: BigNumber;
}
interface SerializedTableData {
  day: string;
  total: string;
  roi: string;
}
const formatTableData = (data: TableData[]): SerializedTableData[] => {
  return data.map((obj) => ({
    ...obj,
    roi: `$${obj.roi.toFixed(2)}`,
    total: `$${obj.total.toFixed(2)}`,
  }));
};

type ViewState = "all" | "summary" | "future";
export default function RewardsTableModal({
  closeHandler,
  initialDeposit,
}: RewardsTableModalProps) {
  const [viewState, setState] = useState<ViewState>("all");
  const { lambo: lamboPrice } = useTokenPrices();

  const rewardsData = useMemo(() => {
    const rewardsObj = [];
    const devFee = initialDeposit.times(devFeePercentage);
    let lastTotal = initialDeposit.minus(devFee); // Minus dev fee
    const withMultiplier = (operand: BigNumber) => {
      // for the future price filter
      const multiplier = new BigNumber(futureLamboPrice).div(lamboPrice);
      if (multiplier.isFinite() && !operand.isNaN() && operand.isFinite()) {
        return operand.times(multiplier);
      } else {
        return BIG_ZERO;
      }
    };

    for (let day = 1; day < daysInAYear + 1; day++) {
      // Return on investment
      const roi = lastTotal.times(percentageReturn);

      rewardsObj.push({
        day: day.toString(),
        total: lastTotal,
        roi: roi,
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
      // check for the future price filter and mutate the summaryObj
      if (viewState === "future") {
        summaryObj.forEach((obj) => {
          obj.roi = withMultiplier(obj.roi);
          obj.total = withMultiplier(obj.total);
        });
      }
      return summaryObj;
    }
  }, [initialDeposit, viewState, lamboPrice]);

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
        Header: "Daily ROI",
        accessor: "roi",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: formatTableData(rewardsData),
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

  const onChange = (view: typeof viewState) => {
    setState(view);
    gotoPage(0); // reset the page
  };

  return (
    <div
      className="bg-white w-11/12 max-w-lg max-h-[calc(100vh-50px)] overflow-y-auto transition-all
        duration-200 rounded-xl"
    >
      <ModalHeader closeHandler={closeHandler} />
      <div className="px-4 md:px-8">
        <div className="text-gray-500 text-xs mb-3 font-light">
          <p>
            Tip: You may see a summary of rewards over a 30-day period by using
            the filters.
          </p>
          <FilterChip changeHandler={onChange} view={viewState} />
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
                  disabled:opacity-40 hover:bg-yellow-100 underline"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  First
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                  disabled:opacity-40 hover:bg-yellow-100 underline"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                disabled:opacity-40 hover:bg-yellow-100 underline"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
              </ListItem>
              <ListItem>
                <button
                  className="py-1 px-2 text-sm rounded-md disabled:cursor-not-allowed
                disabled:opacity-40 hover:bg-yellow-100 underline"
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
  <li className="relative block bg-white text-yellow-700 ml-1 !underline">
    {props.children}
  </li>
);

const FilterChip = (props: {
  changeHandler: (view: ViewState) => void;
  view: ViewState;
}) => {
  return (
    <div
      className="border border-yellow-200/80 rounded flex flex-col items-stretch space-y-3 font-normal
      my-3"
    >
      <div className="flex items-center p-1 space-x-3">
        <button
          onClick={() => props.changeHandler("summary")}
          title="30 Days Interval"
          className={cls(
            "p-2 rounded-full inline-block bg-gray-50 transition-all duration-600 border-2",
            "border-transparent",
            {
              " border-yellow-700 text-yellow-700 bg-yellow-50/80":
                props.view === "summary",
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
              " border-yellow-700 text-yellow-700 bg-yellow-50/80":
                props.view === "all",
            }
          )}
        >
          <BsStack className="h-6 w-6" />
        </button>
        <button
          onClick={() => props.changeHandler("future")}
          title="30 Days Interval"
          className={cls(
            "p-2 rounded-full inline-block bg-gray-50 transition-all duration-600 border-2",
            "border-transparent",
            {
              " border-yellow-700 text-yellow-700 bg-yellow-50/80":
                props.view === "future",
            }
          )}
        >
          <AiOutlineRise className="h-6 w-6" />
        </button>
      </div>
      <div className="bg-yellow-50/80 inline-flex items-center p-2 text-yellow-700">
        <p>
          {props.view === "all"
            ? "Everyday benefits for playing"
            : props.view === "future"
            ? "Rewards are viewed over a 30-day period with an extimated future price of LAMBO"
            : "Rewards are viewed over a 30-day period."}
        </p>
      </div>
    </div>
  );
};
