"use client";
import { useEffect, useState } from "react";
import FetchPostCats from "../../services/fetchPostCats";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";
import FetchCreateArticleCat from "../../services/fetchCreateArticleCat";
import { useTokenContext } from "../../Context/token";
const Cats = () => {
  const { token } = useTokenContext();
  const [cats, setCats] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [newCat, setNewCat] = useState({ name: null, parent_id: null });
  useEffect(() => {
    setIsloading(true);
    FetchPostCats().then((res) => {
      setCats(res.data);
      setIsloading(false);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    FetchCreateArticleCat(token, newCat).then((res) => {
      toast.success("افزوده شد");
    });
  };
  const Nested = (cat) => {
    return (
      <div>
        {cat.map((ct) => (
          <div>
            {ct.name}
            {ct.children.length > 0 && nested(ct.children)}
          </div>
        ))}
      </div>
    );
  };
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else
    return (
      <div className=" mx-4 grid grid-cols-12 gap-4">
        <div className="col-span-6 text-right">
          {cats.map((cat) => (
            <div>
              <div>{cat.name}</div>
              {cat.children.length > 0 && Nested(cat.children)}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="col-span-6  flex flex-col text-right"
        >
          <span>افزودن دسته بندی جدید</span>
          <input
            onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
            type="text"
            className="text-right"
            placeholder="نام دسته بندی را وارد کنید"
            required
          />
          دسته مادر را انتخاب کنید
          <select
            dir="rtl"
            className="text-right"
            onChange={(e) =>
              setNewCat({ ...newCat, parent_id: e.target.value })
            }
          >
            <option>سر دسته</option>
            {cats.map((cat) => (
              <option className="text-right" value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded bg-green-300 px-2">
            ثبت دسته
          </button>
        </form>
      </div>
    );
};

export default Cats;
