import React from "react";
import { RiCloseLine } from "react-icons/ri";

export default function ModalHeader(props: { closeHandler: () => void }) {
  return (
    <div className="relative text-xl font-medium text-center pt-2 pr-2 flex justify-end items-center">
      <button
        onClick={props.closeHandler}
        className="p-1 bg-gray-50 inline-block rounded-full hover:bg-gray-100 cursor-pointer border"
      >
        <RiCloseLine className="h-8 w-8" />
      </button>
    </div>
  );
}
