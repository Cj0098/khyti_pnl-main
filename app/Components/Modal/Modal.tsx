import React from "react";
import GrantCourse from "../../Components/Sub/GrantCourse";
import LessonSection from "../courses/LessonSection";
type Props = {};

const Modal = (props: any) => {
  return (
    <div
      className="bg-[rgba(0,0,0,0.5)] h-full z-50   fixed right-0 top-0 w-full flex items-center justify-center"
      onClick={props.show}
    >
      <div
        className=" h-auto  w-[80%] rounded-md my-10   bg-white z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {props.method == "grantCourse" && <GrantCourse data={props.data} />}
        {props.method == "lessonSection" && (
          <LessonSection
            data={props.data}
            output={(value: any) => props.output(value)}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
