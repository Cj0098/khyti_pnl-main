"use client";
import { useEffect, useState } from "react";
import FetchTopSlider from "../../services/fetchTopSlider";
import { useTokenContext } from "../../Context/token";
import Modal from "../UploadCenter/Modal";
import Loading from "../Loading";
import FetchNewSlide from "../../services/fetchNewSlide";
import { toast } from "react-toastify";
import FetchDeleteSlide from "../../services/fetchDeleteSilde";
const Setting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useTokenContext();
  const [openModal, setOpenModal] = useState(0);
  const [slider, setSlider] = useState();
  const [fresh, setFresh] = useState(1);
  const [newSlide, setNewSlide] = useState({
    name: null,
    img: null,
    url: null,
  });
  const SetModal = (arg) => {
    setOpenModal(arg);
  };

  const SetFile = (arg) => {
    setNewSlide({ ...newSlide, img: arg.substr(42) });
  };
  const handleSubmitSlide = (e) => {
    e.preventDefault();
    FetchNewSlide(token, newSlide).then((res) => {
      toast.success("انجام شد خانم حسینی");
      setFresh(fresh + 1);
    });
  };
  const handleDeleteSlide = (id) => {
    FetchDeleteSlide(token, id).then((res) => {
      toast.success("حذف شد خانم حسینی");
      setFresh(fresh + 1);
    });
  };
  useEffect(() => {
    if (token)
      FetchTopSlider(token).then((res) => {
        setSlider(res.data);
        setIsLoading(false);
      });
  }, [token, fresh]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else
    return (
      <div className="grid grid-cols-12">
        {openModal == 1 && <Modal SetModal={SetModal} SetFile={SetFile} />}
        <div className="col-span-6 grid grid-cols-2 gap-4">
          {slider.map((slide) => (
            <div className="mx-2">
              <img src={slide.img} className="h-20 w-full" />
              <button
                className="bg-red-500 rounded-b px-2 text-white text-center w-full"
                onClick={() => handleDeleteSlide(slide.id)}
              >
                حذف
              </button>
            </div>
          ))}
        </div>
        <div className="text-right col-span-6">
          <h1>افزودن تصویر جدید</h1>

          <form
            onSubmit={(e) => handleSubmitSlide(e)}
            className=" flex flex-col"
          >
            <input
              type="text"
              placeholder="نام تصویر"
              className="text-right"
              onChange={(e) =>
                setNewSlide({ ...newSlide, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="انتخاب لینک"
              className="text-right"
              onChange={(e) =>
                setNewSlide({ ...newSlide, url: e.target.value })
              }
            />
            <div
              className="rounded bg-violet-300 px-2 cursor-pointer"
              onClick={() => setOpenModal(1)}
            >
              انتخاب تصویر
            </div>
            {newSlide.img !== null && (
              <img
                src={`https://dl.lezatkhayati.com/lezatekhayati/${newSlide.img}`}
                className="w-full h-40"
              />
            )}
            <button className="rounded bg-green-300 px-2">بارگزاری</button>
          </form>
        </div>
      </div>
    );
};

export default Setting;
