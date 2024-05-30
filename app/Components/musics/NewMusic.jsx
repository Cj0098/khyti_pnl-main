"use client";
import { useState } from "react";
import FetchCreateMusic from "../../services/fetchCreateMusic";
import { toast } from "react-toastify";
import { useTokenContext } from "../../Context/token";
import Modal from "../../Components/UploadCenter/Modal";
const NewMusic = () => {
  const { token } = useTokenContext();
  const [fresh, setFresh] = useState(1);
  const [data, setData] = useState({ name: null, url: null });
  const [openModal, setOpenModal] = useState(0);

  const SetFile = (arg) => {
    setData({ ...data, url: arg });
  };
  const SetModal = (arg) => {
    setOpenModal(arg);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (data.url && data.name !== null)
      FetchCreateMusic(token, data).then((res) => {
        toast.success("با موفقیت انجام شد");
      });
    else toast.error("تمامی فیلد ها اجباری میباشند");
  };
  return (
    <div className="h-screen flex items-center justify-center text-right">
      <form onSubmit={(e) => handleForm(e)}>
        <h4 className="text-right tracking-widest my-2 ">
          بارگزاری موزیک جدید
        </h4>
        <input
          type="text"
          placeholder="نام موزیک"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="text-right"
          required
        />
        <div
          className="rounded px-2 bg-green-300 text-center my-2 cursor-pointer"
          onClick={() => setOpenModal(1)}
        >
          انتخاب موزیک
        </div>
        {data.url && "انتخاب شد"}
        <button className="rounded px-2 bg-violet-300 text-center w-full">
          بارگزاری
        </button>
        {openModal == 1 && <Modal SetModal={SetModal} SetFile={SetFile} />}
      </form>
    </div>
  );
};

export default NewMusic;
