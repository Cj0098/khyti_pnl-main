"use client";
import { useTokenContext } from "../../Context/token";
import FetchSingleUser from "../../services/fetchSingleUser";
import FetchSingleUserCourses from "../../services/fetchSingleUserCourses";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import FetchAllCourses from "../../services/fetchAllCourses";
import ActiveCourse from "../../services/activeCourse";
import { toast } from "react-toastify";
import FetchDegrees from "../../services/fetchdegrees";
import SubmitEditUser from "../../services/submitEditUser";
import SubmitDeleteUser from "../../services/submitDeleteUser";
import Modal from "../../Components/UploadCenter/Modal";
import CreateDegree from "../../services/createDegree";
import { redirect } from "next/navigation";
import DeleteDegree from "../../services/deleteDegree";
const SingleUser = ({ params }) => {
  const [openModal, setOpenModal] = useState(0);
  const { token } = useTokenContext();
  const [user, setUser] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [addCourse, setAddCourse] = useState(false);
  const [AllCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fresh, setFresh] = useState(1);
  const [addDegree, setAddDegree] = useState(false);
  const [degrees, setDegrees] = useState([]);
  const [degData, setDegData] = useState({});
  const [userInfo, setUserInfo] = useState({
    name: null,
    phone: null,
    address: null,
  });

  const submitCreateDegree = (e) => {
    console.log(degData.name);
    e.preventDefault();
    if (
      degData.name !== undefined &&
      degData.degree_id !== undefined &&
      degData.url !== undefined
    )
      CreateDegree(token, params.id, degData).then((res) => {
        toast.success("با موفقیت اعطا شد");
        setFresh(fresh + 1);
        setAddDegree(false);
        setDegData({});
      });
    else {
      toast.error("تمامی فیلد ها اجباری هستند");
    }
  };
  const SetFile = (arg) => {
    setDegData({ ...degData, url: arg });
  };
  const SetModal = (arg) => {
    setOpenModal(arg);
  };
  const handleEditUser = () => {
    SubmitEditUser(token, userInfo, params.id).then((res) => {
      toast.success("ارتباط موفقیت آمیز");
    });
  };

  const HandleDeleteUser = () => {
    SubmitDeleteUser(token, params.id).then((res) => {
      toast.success("کاربر با موفقیت حذف شد");
    });
  };
  const HandleAddCourse = () => {
    FetchAllCourses(token).then((res) => {
      setAddCourse(true);

      setAllCourses(res.data);
    });
  };
  const HandleAddDegree = () => {
    setAddDegree(true);
  };
  const HandleActiveCourse = (cid) => {
    ActiveCourse(token, params.id, cid).then((res) => {
      toast.success("موفقیت آمیز بود");
      setFresh(fresh + 1);
      setAddCourse(false);
    });
  };

  const handleDeleteDegree = (id) => {
    DeleteDegree(token, id).then((res) => {
      toast.success("حذف شد");
      setFresh(fresh + 1);
    });
  };
  useEffect(() => {
    setIsLoading(true);
    if (token) {
      FetchSingleUser(token, params.id).then((res) => {
        setUser(res.data);
        setUserInfo({
          name: res.data.name,
          phone: res.data.phone,
          address: res.data.address,
        });

        FetchSingleUserCourses(token, params.id).then((result) => {
          setUserCourses(result.data.courses);
        });
        FetchDegrees(token, params.id).then((res) => setDegrees(res.data));
        setIsLoading(false);
      });
    }
  }, [token, params, fresh]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else
    return (
      <div className="flex h-screen">
        {[1, 3].includes(openModal) && (
          <Modal SetModal={SetModal} SetFile={SetFile} />
        )}
        <div className="m-auto text-right" dir="rtl">
          <img
            src={user.avatar ?? "/usr.png"}
            alt=""
            className="w-40 h-40 mx-auto rounded-full"
          />
          <h3>
            <span>نام :</span>
            <input
              type="text"
              className="h-5 mx-3 rounded"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ name: e.target.value })}
            />
          </h3>
          <h3>
            <span>شماره دانشجویی :</span>
            <span className="mx-2 rounded-lg bg-cyan-200"> {user.id}</span>
          </h3>
          <h3>
            <span>شماره تماس :</span>
            <input
              type="text"
              className="h-5 mx-3 rounded"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ phone: e.target.value })}
            />
          </h3>
          <h3>
            <span>آدرس : </span>
            <input
              type="text"
              className="h-5 mx-3 rounded"
              value={user.address}
              onChange={(e) => setUserInfo({ address: e.target.value })}
            />
          </h3>
          <h3>
            <span>طریقه آشنایی : </span> {user.refer}
          </h3>
          <h3>
            <span>جنیست : </span>
            {user.gender}
          </h3>
          <h3>
            <span>شهر سکونت :</span>
            {user.city}
          </h3>
          <div
            className="px-2 py-1 my-2 text-white rounded-lg shadow-lg cursor-pointer bg-cyan-600"
            onClick={handleEditUser}
          >
            ویرایش کاربر
          </div>
          <div
            className="px-2 py-1 my-2 text-white bg-red-600 rounded-lg shadow-lg cursor-pointer"
            onClick={HandleDeleteUser}
          >
            حذف کاربر
          </div>
        </div>

        <div className="flex-row m-auto space-y-4 text-right">
          {!addCourse ? (
            <div>
              <h1 className="font-bold text-[18px]" dir="rtl">
                دوره های ثبت نای کاربر :{" "}
              </h1>
              {userCourses.length &&
                userCourses.map((c) => (
                  <div key={c.id}>
                    {c.name} <span className="bg-green-400">فعال </span> /{" "}
                    <span
                      className="text-white bg-red-600"
                      onClick={() => HandleActiveCourse(c.id)}
                    >
                      غیرفعال سازی{" "}
                    </span>
                  </div>
                ))}
              <div
                className="font-bold text-green-800"
                dir="rtl"
                onClick={HandleAddCourse}
              >
                + اعطای دوره به کاربر
              </div>
            </div>
          ) : (
            <div className="m-auto ">
              <h1 className="font-bold text-[18px] mt-10">
                <button
                  className="px-2 mx-4 text-white bg-red-400 rounded-lg text-[12px] "
                  onClick={() => {
                    setAddCourse(false);
                  }}
                >
                  انصراف X
                </button>
                اعطای دسترسی دوره
              </h1>
              <div className="grid grid-cols-1 gap-4">
                {AllCourses.length &&
                  AllCourses.map((c) => (
                    <div key={c.id}>
                      {c.name} /{" "}
                      <span
                        className="bg-green-400"
                        onClick={() => HandleActiveCourse(c.id)}
                      >
                        فعالسازی
                      </span>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="m-auto space-y-4 text-right">
          {addDegree ? (
            <form
              onSubmit={(e) => submitCreateDegree(e)}
              className="grid grid-cols-1"
            >
              <input
                className="h-5 px-2 mx-3 my-1 text-right rounded"
                type="text"
                placeholder="عنوان"
                onChange={(e) =>
                  setDegData({ ...degData, name: e.target.value })
                }
              />
              <input
                className="h-5 px-2 mx-3 my-1 text-right rounded"
                type="text"
                placeholder="شماره"
                onChange={(e) =>
                  setDegData({ ...degData, degree_id: e.target.value })
                }
              />
              <div
                onClick={(e) => {
                  setOpenModal(1);
                }}
                className="text-center rounded bg-violet-400"
              >
                انتخاب فایل
              </div>
              <button type="submit" className="my-2 bg-green-400 rounded">
                اعطای گواهینامه
              </button>
            </form>
          ) : (
            <div>
              <h1 className="font-bold text-[18px]" dir="rtl">
                گواهینامه های کاربر
              </h1>
              {degrees.length > 0 &&
                degrees.map((deg) => (
                  <div key={deg.id}>
                    <span
                      className="bg-red-200 cursor-pointer"
                      onClick={(e) => handleDeleteDegree(deg.id)}
                    >
                      حذف
                    </span>{" "}
                    /{deg.name} / {deg.degree_id}
                  </div>
                ))}
              <div
                className="font-bold text-green-800"
                dir="rtl"
                onClick={HandleAddDegree}
              >
                + اعطای گواهینامه به کاربر
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default SingleUser;
