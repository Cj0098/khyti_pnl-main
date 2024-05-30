"use client";
import React, { useEffect, useState } from "react";
import FetchSubCourse from "../../services/fetchSubCourses";
import FetchSubHandleAccess from "../../services/fetchSubHandleAccess";
import { useTokenContext } from "../../Context/token";
const GrantCourse = ({ data }) => {
  const [courses, setCourses] = useState([]);
  // const HandleGetCourses = () => {
  //   FetchSubCourse(1, data.id).then((res) => {
  //     setCourses(res.data.data);
  //   });
  // };
  const { token } = useTokenContext();
  const [refetch, setRefetch] = useState(0);
  useEffect(() => {
    FetchSubCourse(1, data.id).then((res) => {
      setCourses(res.data.data);
    });
  }, [refetch]);
  const HandleAccess = (id) => {
    var output = {
      user_id: data.id,
      product_id: id,
    };
    FetchSubHandleAccess(token, output).then((res) => {
      setRefetch(refetch + 1);
    });
  };
  return (
    <div className="p-5">
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <div>شماره تماس :‌ </div>
          {data.phone}
        </div>
        <div className="">دوره ها </div>
        <div className="">
          {/* {data.courses.length > 0
            ? data.courses.map((course, index) => (
                <div key={index} className="">
                  {course.product.name}
                </div>
              ))
            : "هنوز دوره ای ندارد"} */}
        </div>
      </div>
      {/* <button
        className="px-2 py-1 border-2 border-gray-300 rounded-lg"
        onClick={HandleGetCourses}
      >
        اعطای دوره جدید
      </button> */}
      <div className="flex flex-col gap-2">
        {courses.map((item, index) => (
          <div key={index} className="flex justify-between gap-2">
            <div
              className={`${
                item.isAllowed ? "bg-green-200" : "bg-red-200"
              } rounded-lg px-2 py-1`}
            >
              {item.name}
            </div>
            <div
              onClick={() => HandleAccess(item.id)}
              className={`${
                item.isAllowed ? "bg-red-200" : "bg-green-200"
              } rounded-lg px-2 py-1 w-24`}
            >
              {item.isAllowed ? "حذف مجوز" : "اعطای مجوز"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrantCourse;
