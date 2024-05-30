"use client";
import { useTokenContext } from "../../../Context/token";
import SubmitRegister from "../../../services/submitRegister";
import { useState } from "react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const Register = () => {
  const { token } = useTokenContext();
  if (token == null) redirect("/login");
  const [userInfo, setUserInfo] = useState([
    {
      name: null,
      phone: null,
      address: null,
      city: null,
      birthday: null,
      gender: "male",
    },
  ]);
  const handleRegister = (e) => {
    e.preventDefault();
    SubmitRegister(token, userInfo).then((res) => {
      if (res.isDone) {
        toast.success("موفقیت آمیز بود");
      } else {
        if (res.message == "duplicated user") {
          toast.error("کاربر تکراری است");
        } else {
          toast.error("خطای پیش بینی نشده");
        }
      }
    });
  };
  return (
    <div className="flex h-screen">
      <form
        className="grid grid-cols-1 gap-4 m-auto text-right"
        dir="rtl"
        onSubmit={(e) => handleRegister(e)}
      >
        <h1 className="font-bold text-center">ثبت نام هنرجو </h1>
        <input
          type="text"
          value={userInfo.name}
          className="px-2 py-1 text-right rounded-lg"
          placeholder="نام و نام خانوادگی"
          onChange={(e) => (userInfo.name = e.target.value)}
          onBlur={(e) => (userInfo.name = e.target.value)}
          required
        />
        <input
          type="text"
          value={userInfo.phone}
          className="px-2 py-1 text-right rounded-lg"
          placeholder="شماره تماس"
          onChange={(e) => (userInfo.phone = e.target.value)}
          onBlur={(e) => (userInfo.phone = e.target.value)}
          required
        />
        <input
          type="text"
          value={userInfo.address}
          className="px-2 py-1 text-right rounded-lg"
          placeholder="آدرس"
          onChange={(e) => (userInfo.address = e.target.value)}
          onBlur={(e) => (userInfo.address = e.target.value)}
          required
        />
        <input
          type="text"
          value={userInfo.city}
          className="px-2 py-1 text-right rounded-lg"
          placeholder="شهر محل سکونت"
          onChange={(e) => (userInfo.city = e.target.value)}
          onBlur={(e) => (userInfo.city = e.target.value)}
          required
        />
        <input
          type="text"
          value={userInfo.birthday}
          className="px-2 py-1 text-right rounded-lg"
          placeholder="تاریخ تولد"
          onChange={(e) => (userInfo.birthday = e.target.value)}
          onBlur={(e) => (userInfo.birthday = e.target.value)}
          required
        />
        جنسیت :‌
        <select
          defaultValue="male"
          className="px-2 py-1 bg-white"
          onChange={(e) => (userInfo.gender = e.target.value)}
          onBlur={(e) => (userInfo.gender = e.target.value)}
          required
        >
          <option value="male">آقا</option>
          <option value="female">خانم</option>
        </select>
        <button className="px-2 py-1 my-2 bg-green-600 rounded-lg cursor-pointer">
          ثبت نام
        </button>
      </form>
    </div>
  );
};

export default Register;
