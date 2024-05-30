"use client";

import { useEffect, useState } from "react";
import FetchUsage from "../services/fetchUsage";
import { useTokenContext } from "../Context/token";
import Loading from "../Components/Loading";
import toPersianNumber from "../utils/toPersianNumber";
import Typewriter from "typewriter-effect";
const DashBoard = () => {
  const { token } = useTokenContext();
  const [usage, setUsage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    setInterval(() => {}, 1000);
    if (token)
      FetchUsage(token).then((res) => {
        setUsage(res);
        setIsLoading(false);
      });
  }, [token]);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else
    return (
      <div className="grid grid-cols-12 gap-2 mx-2 my-5">
        <div className="col-span-6 p-4 bg-white rounded-lg ">
          <div className="flex items-center justify-between ">
            <span>{toPersianNumber(usage.ramUsageinPercent)}%</span>
            <span dir="rtl">میزان مصرف RAM</span>
            <span>{toPersianNumber(100)}%</span>
          </div>
          <div className="w-full h-2 mb-5 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-400 rounded-full animate-pulse"
              style={{ width: usage.ramUsageinPercent + "%" }}
            >
              <div className="w-full h-full transform translate-x-full bg-gray-200"></div>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <span>{toPersianNumber(Math.round(usage.cpuUsage))}%</span>
            <span dir="rtl">میزان مصرف CPU</span>
            <span>{toPersianNumber(100)}%</span>
          </div>
          <div className="w-full h-2 mb-5 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-400 rounded-full animate-pulse"
              style={{ width: Math.round(usage.cpuUsage) + "%" }}
            >
              <div className="w-full h-full transform translate-x-full bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-4 text-right bg-white rounded-lg gird">
          <h1>آمار سیستم</h1>
          <div className="grid grid-cols-2 place-content-end">
            <div className="flex justify-start" dir="rtl">
              <span className="mx-2">کل هنرجویان : </span>{" "}
              {toPersianNumber(usage.totalUsers)}
            </div>
            <div className="flex justify-start" dir="rtl">
              <span className="mx-2">هنرجویان ویژه : </span>{" "}
              {toPersianNumber(400)}
            </div>
            <div className="flex justify-start" dir="rtl">
              <span className="mx-2">تعداد کل مقالات : </span>{" "}
              {toPersianNumber(usage.articles)}
            </div>
            <div className="flex justify-start" dir="rtl">
              <span className="mx-2">تعداد دوره های رایگان : </span>{" "}
              {toPersianNumber(usage.freeCourses)}
            </div>
            <div className="flex justify-start" dir="rtl">
              <span className="mx-2">تعداد دوره های ویژه : </span>{" "}
              {toPersianNumber(usage.pricyCourses)}
            </div>
            <div className="flex justify-start" dir="rtl">
              <span className="mx-2">تعداد کل کتاب ها : </span>{" "}
              {toPersianNumber(usage.books)}
            </div>
          </div>
        </div>

        <div className="bg-white px-2 py-1 col-span-6 rounded-lg">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("{")
                .typeString(
                  '<br />server status : <span style="color: #27ae60;">Online </span>;'
                )
                .pauseFor(500)

                .typeString(
                  "<br />everything  works <span style='color: #FF0000;'>perfectly </span>  ;)"
                )
                // .typeString(
                //   '<strong>$<span style="color: #27ae60;">5kb</span> Gzipped!</strong>'
                // )
                .typeString("<br />}")
                .pauseFor(1000)
                .start();
            }}
          />
        </div>
        <div
          className="col-span-6 p-4 text-right bg-white rounded-lg gird"
          dir="rtl"
        >
          {usage.hasUser ? (
            <div className="bg-green-300 rounded-lg mx-2 px-2 my-1">
              امروز {toPersianNumber(usage.hasUser)} عضو جدید داریم
            </div>
          ) : (
            <div className="bg-cyan-300 rounded-lg mx-2 px-2 my-1">
              امروز عضو جدیدی نداشتیم !
            </div>
          )}
          {usage.hasPost ? (
            <div className="bg-green-300 rounded-lg mx-2 px-2 my-1">
              امروز {toPersianNumber(usage.hasPost)} مقاله جدید داریم
            </div>
          ) : (
            <div className="bg-red-300 rounded-lg mx-2 px-2 my-1">
              اخطار :‌ امروز مقاله جدیدی نذاشتیم{" "}
            </div>
          )}
        </div>
      </div>
    );
};

export default DashBoard;
