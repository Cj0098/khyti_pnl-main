"use client";

import Link from "next/link";
import { FaAngleLeft, FaRegCircle, FaRegSquare } from "react-icons/fa";
import { useEffect, useState } from "react";
import GetDate from "../services/getddate";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import toPersianNumber from "../utils/toPersianNumber";
import { useRouter } from "next/navigation";
import TypeWriter from "../Components/typewrite";
export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [submenu, setSubmenu] = useState();
  const [now, setNow] = useState();
  const [activeSub, setActiveSub] = useState();
  const router = useRouter();
  const handleSubMenu = (id) => {
    console.log(id);
    if (id == submenu) setSubmenu(null);
    else setSubmenu(id);
  };
  const menu = [
    {
      id: 1,
      name: "داشبورد",
      url: "/dash",
      sub: [
        {
          id: 1,
          name: "مشاهده",
          url: "/dash",
        },
      ],
    },
    {
      id: 2,
      name: "کاربران",
      url: "/",
      sub: [
        {
          id: 2,
          name: "کاربران",
          url: "/dash/users",
        },
        {
          id: 3,
          name: "ثبت نام",
          url: "/dash/users/register",
        },
      ],
    },
    {
      id: 3,
      name: "مقالات",
      url: "/",
      sub: [
        {
          id: 4,
          name: "لیست مقالات",
          url: "/dash/articles",
        },
        {
          id: 5,
          name: "افزودن مقاله",
          url: "/dash/new",
        },
        {
          id: 7,
          name: "دسته بندی ها",
          url: "/dash/articles/cats",
        },
        {
          id: 6,
          name: "نظرات",
          url: "/dash/articles/comments",
        },
      ],
    },
    {
      id: 4,
      name: "دوره ها",
      url: "/",
      sub: [
        {
          id: 5,
          name: "دوره ها",
          url: "/dash/courses",
        },
        {
          id: 6,
          name: "افزودن دوره",
          url: "/dash/courses/new",
        },
      ],
    },
    {
      id: 5,
      name: "چت روم",
      url: "/",
      sub: [
        {
          id: 12,
          name: "مدیریت",
          url: "/dash/chats",
        },
      ],
    },
    {
      id: 6,
      name: "آبلود سنتر",
      url: "/up",
      sub: [
        {
          id: 6,
          name: "ابلود فایل",
          url: "/dash/up",
        },
      ],
    },
    {
      id: 16,
      name: "بک آپ گیری",
      url: "/up",
      sub: [
        {
          id: 6,
          name: "مدیریت",
          url: "/dash/backups",
        },
      ],
    },
    {
      id: 7,
      name: "اسلایدر",
      url: "",
      sub: [
        {
          id: 8,
          name: "ویرایش",
          url: "/dash/setting",
        },
      ],
    },
    {
      id: 85,
      name: "موسیقی",
      url: "",
      sub: [
        {
          id: 8,
          name: "موسیقی ها",
          url: "/dash/musics",
        },
        {
          id: 9,
          name: "افزودن",
          url: "/dash/musics/new",
        },
      ],
    },
    {
      id: 86,
      name: "مینی دوره",
      url: "",
      sub: [
        {
          id: 8,
          name: "کاربران",
          url: "/dash/sub/users",
        },
        {
          id: 9,
          name: "دوره ها",
          url: "/dash/sub/courses",
        },
        {
          id: 10,
          name: "افزودن دوره",
          url: "/dash/sub/courses/new",
        },
      ],
    },
  ];

  useEffect(() => {
    GetDate().then((resp) => {
      setNow(resp.data);
    });
  }, []);

  return (
    <section className=" mx-6 bg-[#e5e7eb] leading-8 text-gray-600">
      <div
        className="flex items-center justify-center mt-2 space-x-8 text-gray-700 border-b border-dashed rounded-lg bg-zinc-200 border-slate-400"
        dir="rtl"
      ></div>
      <div className="grid grid-cols-12 ">
        <div className="col-span-10">
          <ProgressBar
            height="4px"
            color="#008000"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <TypeWriter />
          {children}
        </div>
        <div className="h-screen col-span-2 px-2 px-4 py-4 my-4 text-right border-l border-dashed rounded-lg bg-zinc-200 border-slate-400">
          <div className="flex justify-between ">
            <div className="col-span-1 text-center text-red-600">خروج</div>
            <div className="col-span-2 bg-gray-200 rounded-lg">
              <a href="https://lezatekhayati.com" target="_blank">
                صفحه اصلی وبسایت
              </a>
            </div>
          </div>
          <div className="">
            <span className=""> امروز &nbsp;</span>

            {now}
          </div>

          <div className="col-span-5"> </div>

          <img src="/logo.png" className="mx-auto" />
          {menu.map((i) => (
            <div key={i.id}>
              <div
                className={
                  `` + submenu == i.id
                    ? "cursor-pointer flex justify-between items-center w-full px-2 py-2 my-2   border-b border-dashed rounded-lg bg-green-300 border-slate-400 "
                    : "cursor-pointer flex justify-between items-center w-full px-2 py-2 my-2   border-b border-dashed rounded-lg bg-white border-slate-400 "
                }
                onClick={() => handleSubMenu(i.id)}
              >
                <FaAngleLeft />
                <div
                  href="/"
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="mr-2"> {i.name}</span>
                  <FaRegSquare />
                </div>
              </div>
              <div className={submenu == i.id ? "" : "hidden"}>
                {i.sub.length > 0
                  ? i.sub.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setActiveSub(s.id);

                          console.log(pathname);
                        }}
                      >
                        <Link
                          href={s.url}
                          className={` ${
                            pathname == s.url ? "bg-cyan-200" : "bg-white"
                          } flex items-center justify-end px-1 py-2 my-1 mr-6  border-b border-dashed rounded-lg cursor-pointer border-slate-400`}
                          key={s.id}
                        >
                          {s.name}
                          <FaRegCircle className="ml-3 mr-1" />
                        </Link>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          ))}
          <div
            className={
              " flex justify-between items-center w-full px-2 py-2 my-2   border-b border-dashed rounded-lg bg-red-200 border-slate-400 "
            }
            onClick={() => router.back()}
          >
            <FaAngleLeft />
            <div className="flex items-center justify-between ">
              <span className="mx-2"> برگشت</span>
              <FaRegSquare />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
