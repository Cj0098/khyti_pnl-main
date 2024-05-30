"use client";
import FetchSubCourses from "../../../services/fetchSubCourses";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const Courses = () => {
  const [isLoading, setIsLoading] = useState();

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    FetchSubCourses(1).then((res) => {
      setCourses(res.data.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="container">
      <div className="grid grid-cols-1" dir="rtl">
        {!isLoading &&
          courses.map((course, index) => (
            <div
              key={index}
              className="grid items-center justify-between grid-cols-2 px-2 py-1 my-2 bg-white border-b border-gray-400 border-dashed rounded-full"
            >
              <div>{course.name}</div>
              <Link
                href={`/dash/sub/courses/edit/${course.id}`}
                className="w-32 px-2 py-1 bg-green-200 rounded-lg"
              >
                ویرایش
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Courses;
