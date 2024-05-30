import { useState } from "react";
import Files from "./Files";
import { FaCircleXmark } from "react-icons/fa6";
const Modal = ({ SetModal, SetFile }) => {
  //   const SetModal = SetModal;

  const selectFile = (arg) => {
    SetFile(arg);
  };

  return (
    <div className="container fixed z-50 w-auto h-auto py-4 mx-auto bg-gray-300 left-10 right-20 top-10">
      <div className="container relative mx-auto ">
        <FaCircleXmark
          className="mx-4 mb-2 rounded-lg"
          onClick={() => SetModal(0)}
        />
        <div className="h-auto mx-4 overflow-y-scroll">
          <Files selectedFile={selectFile} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
