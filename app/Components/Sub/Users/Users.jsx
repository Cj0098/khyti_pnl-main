"use client";
import React, { useEffect, useState } from "react";
import FetchSubUsers from "../../../services/fetchSubUsers";
import Modal from "../../../Components/Modal/Modal";
import FetchSubPanelInfo from "../../../services/FetchSubPanelInfo";
const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState([]);

  const [currentUser, setCurrentUser] = useState(false);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    FetchSubUsers(page).then((res) => {
      setUsers(res.data.data);
      let pgs = [];
      for (let index = 1; index <= res.data.last_page; index++) {
        pgs.push(index);
      }
      setTotalPages(pgs);
    });
    FetchSubPanelInfo().then((res) => setInfo(res.data));
  }, [page]);

  return (
    <div className="container flex flex-col w-9/12 gap-1 mx-auto" dir="rtl">
      <div className="grid grid-cols-6 gap-2 text-[12px]">
        {info.map((data, index) => (
          <div
            className="flex justify-between gap-2 px-2 py-2 bg-white rounded"
            key={index}
          >
            <div>{data.name}</div>{" "}
            <div className="">
              {" "}
              <span className="px-3 py-1 bg-green-200 rounded-full">
                {data.qty}
              </span>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          method={"grantCourse"}
          show={() => setShowModal(false)}
          data={currentUser}
        />
      )}
      {users.length > 0 &&
        users.map((user, index) => (
          <div
            key={index}
            className="grid items-center grid-cols-12 px-2 py-1 my-2 bg-white border-b border-gray-400 border-dashed rounded-full"
          >
            <div className="col-span-1">{user.id}</div>
            <div className="col-span-7">{user.phone}</div>
            <div className="flex flex-row-reverse col-span-4">
              <button
                className="px-2 py-1 bg-green-200 rounded-lg"
                onClick={() => {
                  setShowModal(true);
                  setCurrentUser(user);
                }}
              >
                جزءیات
              </button>
              {/* Other content goes here */}
            </div>
          </div>
        ))}

      <div className="flex justify-between">
        {page < totalPages.length ? (
          <button onClick={handleNextPage}>صفحه بعدی </button>
        ) : (
          "تموم شد حاجی"
        )}

        <select
          value={page}
          onChange={(e) => setPage(parseInt(e.target.value))}
        >
          {totalPages.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        {page > 1 ? (
          <button onClick={() => setPage(page - 1)}>صفحه قبلی </button>
        ) : (
          "صفحه قبلی نداریم که "
        )}
      </div>
    </div>
  );
};

export default Users;
