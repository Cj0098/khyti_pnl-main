"use client";
import React, { useEffect, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import { DatePicker } from "zaman";
import {
  blockquote,
  align,
  font,
  fontSize,
  fontColor,
  hiliteColor,
  horizontalRule,
  list,
  table,
  formatBlock,
  lineHeight,
  template,
  paragraphStyle,
  textStyle,
  link,
  image,
  video,
  audio,
  math,
} from "suneditor/src/plugins";
import imageGallery from "../../Components/imageGallery/imageGallery";

import dynamic from "next/dynamic";
import Files from "../../Components/UploadCenter/Files";
import Modal from "../../Components/UploadCenter/Modal";
import { FaCaretLeft, FaSourcetree } from "react-icons/fa";
// import { Button, Modal } from "flowbite-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { toast } from "react-toastify";
import { useRef } from "react";
import Loading from "../../Components/Loading";
import FetchCategories from "../../services/fetchCategories";
import SubmitArticle from "../../services/submitArticle";
import { useTokenContext } from "../../Context/token";
import Link from "next/link";
import { redirect } from "next/navigation";
const MyComponent = (props) => {
  const [openModal, setOpenModal] = useState(0);
  const [tagsArray, setTagsArray] = useState([]);
  const [publishDate, SetPublishDate] = useState(0);

  const [tag, setTag] = useState();
  const ref = useRef(null);
  const catRef = useRef([]);
  const { token } = useTokenContext();

  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cat, setCat] = useState();
  const [title, setTitle] = useState("");
  const [bodyContent, setBodyContent] = useState();
  const [isPublished, setIsPublished] = useState([false]);
  const [submitted, setSubmitted] = useState(false);
  const [thumbnail, setThumbnail] = useState();
  const [gallery, setGallery] = useState([]);
  const SetModal = (arg) => {
    setOpenModal(arg);
  };
  const SetFile = (arg) => {
    setThumbnail(arg);
  };
  const AddTOGallery = (arg) => {
    setGallery([...gallery, arg]);
    console.log(gallery);
  };
  const handleDeleteGal = async (gal) => {
    let all = gallery;
    let item = all.indexOf(gal);
    all.splice(item, 1);
    setGallery([...gallery]);
  };
  const handleTags = (event) => {
    event.preventDefault();
    let isExists = tagsArray.find((item) => item === tag);
    if (!isExists) {
      setTagsArray([tag, ...tagsArray]);
      setTag(null);
      ref.current.value = "";
    } else toast.error("برچسب تکراری نمیتوانید اضافه کنید");
  };
  const handleDeleteTag = async (tg) => {
    let all = tagsArray;
    let item = all.indexOf(tg);
    all.splice(item, 1);
    setTagsArray([...tagsArray]);
  };
  const handleSelectCat = (e) => {
    setCat(e);
    console.log(e);
    // catRef.current[e].className = "bg-red-400";
  };

  const handleContent = (content) => {
    setBodyContent(content);
  };
  const HandleSubmitArticle = (e) => {
    e.preventDefault();
    if (bodyContent !== null && title !== null && thumbnail !== null) {
      setSubmitted(true);
      const newGal = [];
      gallery.map((g) => {
        newGal.push(g.substr(42));
      });
      console.log(newGal);

      const gal = JSON.stringify(newGal);
      const tagged = JSON.stringify(tagsArray);
      let img = thumbnail.substr(42);
      console.log(img);
      SubmitArticle(
        token,
        title,
        bodyContent,
        img,
        cat,
        tagged,
        isPublished[0] ? isPublished[1] : null,
        gal,
        publishDate
      ).then((res) => {
        setIsPublished([true, res.data.id]);
        console.log(isPublished[0]);
        toast.success("با موفقیت منتشر شد");
      });
    } else {
      toast.error(
        "مقادیر عنوان یا محتوا یا دسته بندی یا تصویر شاخص نمیتوانند خالی ارسال شوند"
      );
    }
  };
  useEffect(() => {
    setIsLoading(true);
    FetchCategories().then((res) => {
      setCategories(res.data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="container p-10 mx-auto">
      <form
        onSubmit={(e) => HandleSubmitArticle(e)}
        className="flex "
        dir="rtl"
      >
        <input
          type="text"
          className="px-2 py-1 my-4 text-right bg-white rounded basis-4/5"
          placeholder="عنوان مقاله"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => setTitle(e.target.value)}
          required
        />

        {isPublished[0] ? (
          <button
            type="submit"
            className="mr-4 basis-1/4 w-full text-gray-600 bg-cyan-400 text-[25px] text-center py-1 cursor-pointer rounded-lg"
          >
            ویرایش
          </button>
        ) : (
          <button
            type="submit"
            className="mr-4 basis-1/4 text-gray-600 bg-green-400 text-[25px] text-center py-1 cursor-pointer rounded-lg"
            disabled={submitted}
          >
            انتشار
          </button>
        )}
      </form>
      <div className="grid grid-cols-12">
        <div className="col-span-4 text-right ">
          {isPublished[0] ? (
            <div className="px-2 mx-1 my-4 text-gray-600 bg-green-300 rounded-lg">
              <a
                href={`https://lezatekhayati.com/article/${isPublished[1]}`}
                target="_blank"
              >
                مشاهده مقاله
              </a>
            </div>
          ) : (
            ""
          )}
          <div className="mx-1 my-4 text-gray-600">
            <span className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
               تاریخ انتشار
              <FaSourcetree />
            </span>
            <DatePicker onChange={(e) => SetPublishDate(e.value)} />
          </div>
          <div className="mx-1 my-4 text-gray-600">
            <span className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
              تصویر شاخص
              <FaSourcetree />
            </span>
            <img
              src={thumbnail ?? "/missing.png"}
              onClick={() => setOpenModal(1)}
              alt=""
              className="cursor-pointer h-26"
            />

            {openModal == 1 && <Modal SetModal={SetModal} SetFile={SetFile} />}
            {openModal == 2 && (
              <Modal SetModal={SetModal} SetFile={AddTOGallery} />
            )}
          </div>

          <div className="mx-1 my-4 text-gray-600">
            <span className="flex items-center justify-end px-2 mb-2 text-left bg-white rounded-lg">
              دسته بندی ها <FaSourcetree />
            </span>
            {Categories.map((c) => (
              <div
                key={c.id}
                data-value={c.id}
                onClick={(e) =>
                  handleSelectCat(e.target.getAttribute("data-value"))
                }
                ref={(element) => {
                  catRef.current[c.id] = element;
                }}
                className={
                  "py-1 px-4 rounded cursor-pointer flex text-right justify-between items-center " +
                  (c.id == cat ? "bg-green-400" : "bg-transparent")
                }
                dir="rtl"
              >
                {c.name} <FaCaretLeft />
              </div>
            ))}
          </div>
          <div className="mx-1 my-4 text-gray-600">
            <span className="flex items-center justify-end px-2 mb-2 text-left bg-white rounded-lg">
              دسته بندی ها <FaSourcetree />
            </span>
          </div>
          <form
            onSubmit={handleTags}
            className="flex items-center justify-center w-full"
          >
            <button className="px-2 py-1 text-black bg-gray-400">+</button>
            <input
              required
              type="text"
              className="w-full px-1 mx-2 text-right bg-white rounded"
              placeholder="افزودن برچسب جدید"
              onChange={(e) => setTag(e.target.value)}
              onBlur={(e) => setTag(e.target.value)}
              onFocus={(e) => setTag(e.target.value)}
              ref={ref}
            />
          </form>
          {tagsArray.map((t, i) => (
            <span
              onClick={(e) =>
                handleDeleteTag(e.target.getAttribute("data-value"))
              }
              key={i}
              className="flex-row items-center justify-between mx-4 bg-white rounded cursor-pointer"
              data-value={t}
              disabled
            >
              {t} x
            </span>
          ))}
        </div>
        <div className="col-span-8">
          <SunEditor
            className="px-4 "
            onChange={handleContent}
            setOptions={{
              height: 380,
              requestHeaders: {
                "X-Sample": "sample",
              },
              plugins: [
                blockquote,
                align,
                font,
                fontSize,
                fontColor,
                hiliteColor,
                horizontalRule,
                list,
                table,
                formatBlock,
                lineHeight,
                template,
                paragraphStyle,
                textStyle,
                link,
                image,
                video,
                audio,
                math,
                imageGallery,
              ],
              imageGalleryLoadURL:
                "https://lezatkhayati.com/api/upload/files/editor",
              buttonList: [
                // default
                ["undo", "redo"],
                [
                  ":p-More Paragraph-default.more_paragraph",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                ],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor", "textStyle"],
                ["removeFormat"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                [
                  "-right",
                  ":i-More Misc-default.more_vertical",
                  "fullScreen",
                  "showBlocks",
                  "codeView",
                  "preview",
                  "print",
                  "save",
                  "template",
                ],
                [
                  "-right",
                  ":r-More Rich-default.more_plus",
                  "table",

                  "imageGallery",
                ],
                ["-right", "image", "video", "audio", "link"],
                // (min-width: 992)
                [
                  "%992",
                  [
                    ["undo", "redo"],
                    [
                      ":p-More Paragraph-default.more_paragraph",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                    ],
                    ["bold", "underline", "italic", "strike"],
                    [
                      ":t-More Text-default.more_text",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                    ],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["align", "horizontalRule", "list", "lineHeight"],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "fullScreen",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      "template",
                    ],
                    [
                      "-right",
                      ":r-More Rich-default.more_plus",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio",

                      "imageGallery",
                    ],
                  ],
                ],
                // (min-width: 767)
                [
                  "%767",
                  [
                    ["undo", "redo"],
                    [
                      ":p-More Paragraph-default.more_paragraph",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                    ],
                    [
                      ":t-More Text-default.more_text",
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                    ],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    [
                      ":e-More Line-default.more_horizontal",
                      "align",
                      "horizontalRule",
                      "list",
                      "lineHeight",
                    ],
                    [
                      ":r-More Rich-default.more_plus",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio",

                      "imageGallery",
                    ],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "fullScreen",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      "template",
                    ],
                  ],
                ],
                // (min-width: 480)
                [
                  "%480",
                  [
                    ["undo", "redo"],
                    [
                      ":p-More Paragraph-default.more_paragraph",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                    ],
                    [
                      ":t-More Text-default.more_text",
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                      "removeFormat",
                    ],
                    [
                      ":e-More Line-default.more_horizontal",
                      "outdent",
                      "indent",
                      "align",
                      "horizontalRule",
                      "list",
                      "lineHeight",
                    ],
                    [
                      ":r-More Rich-default.more_plus",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio",

                      "imageGallery",
                    ],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "fullScreen",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      "template",
                    ],
                  ],
                ],
              ],
            }}
          />
          <div className="mx-1 my-4 text-gray-600">
            <span className="flex items-center justify-end px-2 mb-2 text-left bg-white rounded-lg">
              <span className="mx-4" onClick={() => setOpenModal(2)}>
                افزودن تصویر جدید +
              </span>{" "}
              | گالری تصاویر <FaSourcetree />
            </span>

            <div className="grid grid-cols-4 gap-2">
              {gallery.length > 0 ? (
                gallery.map((gal) => (
                  <div key={gal}>
                    <img src={gal} onClick={() => handleDeleteGal(gal)} />
                  </div>
                ))
              ) : (
                <div className="text-center" onClick={() => setOpenModal(2)}>
                  <img src="/missing.png" />
                  <span>افزودن تصویر جدید</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyComponent;
