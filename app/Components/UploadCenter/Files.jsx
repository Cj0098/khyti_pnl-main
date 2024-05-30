"use client";
import { useEffect, useState, memo, useCallback } from "react";
import { Modal } from "flowbite-react";
import FetchFiles from "../../services/fetchFiles";
import { useTokenContext } from "../../Context/token";
import Loading from "../Loading";
import { useRef } from "react";
import fetchDeleteFile from "../../services/fetchDeleteFile";
import FetchDirectories from "../../services/fetchDirectories";
import { FaFolderMinus, FaFolderOpen, FaAngleLeft } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import FetchCreateDir from "../../services/fetchCreateDir";
import fetchSearchFile from "../../services/fetchSearchFile";

import ChunkedUploady, {
  useBatchFinishListener,
  useItemFinalizeListener,
  useItemFinishListener,
  useItemProgressListener,
  useItemAbortListener,
  useItemErrorListener,
  useAbortItem,
  useFileInput,
} from "@rpldy/chunked-uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import retryEnhancer, { useRetry } from "@rpldy/retry-hooks";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { toast } from "react-toastify";
import FetchDirFiles from "../../services/FetchDirFiles";
const STATES = {
  PROGRESS: "PROGRESS",
  DONE: "DONE",
  ABORTED: "ABORTED",
  ERROR: "ERROR",
};

const STATE_COLORS = {
  [STATES.PROGRESS]: "#f4e4a4",
  [STATES.DONE]: "#a5f7b3",
  [STATES.ABORTED]: "#f7cdcd",
  [STATES.ERROR]: "#ee4c4c",
};

const Files = ({ selectedFile }) => {
  const [currentRoute, setCurrentRoute] = useState([null, null]);
  const [fresh, setFresh] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [files, setFiles] = useState([]);
  const [percent, setPercent] = useState([]);
  const { token } = useTokenContext();

  const [page, setPage] = useState(0);
  const [recentFiles, setRecentFiles] = useState(true);
  const [clientPage, setClientPage] = useState(1);
  const [currentDir, setCurrentDir] = useState();
  const [perpage, setPerpage] = useState(10);
  const [openDir, setOpenDir] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [newDir, setNewDir] = useState();
  const [term, setTerm] = useState();
  console.log("setlecetd", selectedFile);
  function getFileExtension(filename) {
    const extension = filename.split(".").pop();
    return extension;
  }

  const AbortButton = ({ id, state }) => {
    const abortItem = useAbortItem();
    const onAbort = useCallback(() => abortItem(id), [id, abortItem]);

    return (
      <button
        disabled={state === STATES.ABORTED || state === STATES.DONE}
        onClick={onAbort}
      >
        🛑
      </button>
    );
  };

  const RetryButton = ({ id, state }) => {
    const retry = useRetry();
    const onRetry = useCallback(() => retry(id), [id, retry]);

    return (
      <button disabled={state !== STATES.ABORTED} onClick={onRetry}>
        🔃
      </button>
    );
  };

  const QueueItem = memo((props) => {
    console.log("=======>in dare run mishe ");
    const [progress, setProgress] = useState(0);
    const [itemState, setItemState] = useState(0);
    const [url, setUrl] = useState(null);
    useItemProgressListener((item) => {
      if (item.completed > progress) {
        setProgress(() => item.completed);
        setItemState(() =>
          item.completed === 100 ? STATES.DONE : STATES.PROGRESS
        );
      }
    }, props.id);

    useItemAbortListener((item) => {
      setItemState(STATES.ABORTED);
    }, props.id);

    useItemErrorListener((item) => {
      setItemState(STATES.ERROR);
    }, props.id);

    useItemFinishListener((item) => {
      console.log(item);
      if (item.uploadResponse.results !== undefined) {
        console.log(
          `item ${item.id} finished uploading, response was: `,
          item.uploadResponse
        );
        let newfile = item.uploadResponse.results.slice(-1)[0].data;
        setUrl(newfile.path);
        // setFiles((files) => [
        //   {
        //     id: "new",
        //     name: newfile.filename,
        //     url: newfile.path,
        //   },
        //   ...files,
        // ]);
      }
    }, props.id);

    useItemFinalizeListener((item) => {
      setProgress(100);
      setItemState(STATES.DONE);
    }, props.id);
    // useItemFinalizeListener((item, options) => {
    //   console.log(`item ${item.id} is done with state: ${item.state}`);
    // setFresh(fresh + 1);
    // setProgress(100);
    // setItemState(STATES.DONE);
    //   console.log(progress);
    //   console.log(itemState);
    // });
    // useBatchFinishListener((batch, options) => {
    //   console.log(`batch ${batch.id} finished uploading`);

    //   setFresh(fresh + 1);
    // });
    return (
      <div className={`bg-${itemState}  flex flex-col`}>
        <div className="grid items-center justify-end grid-cols-4 gap-2 my-2">
          <span className="text-[10px]">{props.name}</span>
          {itemState == "DONE" ? (
            <div
              className="px-2 mx-2 text-center bg-green-200 rounded"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("کپی شد");
              }}
            >
              دریافت لینک
            </div>
          ) : (
            ""
          )}

          <div>{Math.round(progress)}%</div>
          <div>
            <div>
              <button id={props.id} state={itemState}>
                {itemState}
              </button>
              <button id={props.id} state={itemState} />
            </div>
          </div>
        </div>
        <div
          className={`w-full grow h-2 rounded-full bg-${
            itemState == "DONE" ? "green-400" : "red-400"
          }`}
          style={{ width: progress + `%` }}
        ></div>
      </div>
    );
  }, []);

  QueueItem.displayName = "MyComponent";
  const ExampleForm = () => {
    const inputRef = useRef();
    useFileInput(inputRef);

    return (
      <form
        action={`https://lezatkhayati.com/api/v2/upload/new/` + currentRoute[1]}
        method="POST"
      >
        <input
          multiple
          type="file"
          name="file"
          style={{ display: "none" }}
          ref={inputRef}
        />
      </form>
    );
  };
  const handleOpenDir = (dir, isParent) => {
    setPage(1);
    setRecentFiles(false);
    setCurrentDir(dir.id);
    FetchDirFiles(token, dir.id, page).then((res) => {
      setFiles(res.data.data);
      let pgs = [];
      for (let index = 1; index <= res.data.last_page; index++) {
        pgs.push(index);
      }
      setTotalPages(pgs);
    });

    console.log(dir.files.length / 10, "chi migie");
    let pgs = [];
    for (let index = 1; index - 1 <= dir.files.length / 10; index++) {
      pgs.push(index);
    }
    setTotalPages(pgs);

    // setTotalPages(
    //   Math.ceil(dir.files.length >= 10 ? dir.files.length / 10 : 0)
    // );
    console.log("total", totalPages);
    setFiles(dir.files);
    if (isParent === undefined) {
      if (openDir.includes(dir.id)) {
        let dirs = openDir;
        let index = openDir.indexOf(dir.id);
        dirs.splice(index, 1);
        setOpenDir([...openDir]);
      } else {
        if (openDir.length > 2) setOpenDir([...openDir, dir.id]);
        else setOpenDir([...openDir, dir.id]);
      }
    } else {
      if (openDir.includes(dir.id)) {
        setOpenDir([]);
      } else {
        setOpenDir([dir.id]);
        console.log("inja");
      }
    }
    setCurrentRoute([dir.name, dir.id]);
    console.log(currentRoute[1]);
    // if (openDir.includes(dir.id) && isParent !== null && isParent.isInteger()) {
    // } else if (isParent) {
    // }
    // if (ParentRef.current[dir.id].classList.contains("hidden"))
    //   ParentRef.current[dir.id].classList.remove("hidden");
    // else {
    //   ParentRef.current[dir.id].classList.add("hidden");
    // }
    // e.classList.add("bg-red-400");
    // setFiles(dir.files);
    // console.log(dir.files);
  };

  const ParentRef = useRef([]);
  const Nested = (item) => {
    return (
      <div className="mx-2">
        {item.map((i) => (
          <div key={i.id}>
            <div
              className={`grid grid-cols-12 gap-2  items-center justify-between px-2 border-b border-dashed border-black my-1  rounded-lg ${
                currentDir == i.id ? "bg-green-300" : "bg-white"
              }`}
              onClick={() => handleOpenDir(i)}
              dir="rtl"
            >
              <FaFolderOpen className="col-span-1 mx-2" />
              <div className={`col-span-8 mx-2 cursor-pointer `}>
                {" "}
                {i.name}{" "}
                <span className="text-green-500 text-[10px]">
                  [{i.files.length}]
                </span>
              </div>

              <div className="col-span-1">
                {i.children.length > 0 && <FaAngleLeft />}
              </div>
            </div>
            <div
              className={openDir.includes(i.id) ? "" : "hidden"}
              ref={(element) => {
                ParentRef.current[i.id] = element;
              }}
            >
              {i.children !== undefined && i.children.length > 0
                ? Nested(i.children)
                : ""}
            </div>
          </div>
        ))}
      </div>
    );
  };
  useEffect(() => {
    setIsLoading(true);
    if (token) {
      if (recentFiles)
        FetchFiles(token, page == 0 ? 1 : page).then((res) => {
          setFiles(res.data.data);
          let pgs = [];
          for (let index = 1; index <= res.data.last_page; index++) {
            pgs.push(index);
          }
          setTotalPages(pgs);
          FetchDirectories(token).then((dir) => {
            setDirectories(dir.data);
          });
          setIsLoading(false);
        });
      else
        FetchDirFiles(token, currentDir, page).then((res) => {
          setFiles(res.data.data);
          let pgs = [];
          for (let index = 1; index <= res.data.last_page; index++) {
            pgs.push(index);
          }
          setTotalPages(pgs);
          FetchDirectories(token).then((dir) => {
            setDirectories(dir.data);
          });
          setIsLoading(false);
        });
    }
  }, [token, page, fresh]);

  const handleDeleteFile = (idd) => {
    fetchDeleteFile(token, idd).then((res) => {
      // files.filter((file) => file.id !== idd);
      setFiles((files) => files.filter((file) => file.id !== idd));
      // setFresh(fresh + 1);
      toast.success("حذف شد");
    });
  };
  const handleCreateDir = (e) => {
    e.preventDefault();
    console.log("ine" + currentRoute[1]);
    FetchCreateDir(token, currentRoute[1], newDir).then((res) => {
      toast.success("با موفقیت افزوده شد");
    });
  };
  const handleSearchFile = (e) => {
    e.preventDefault();
    setPage(null);
    fetchSearchFile(token, term).then((res) => {
      if (res.data.length > 0) setFiles(res.data);
      else toast.error("ایتمی یافت نشد");
    });
  };
  const customIsSuccess = (res) => {
    console.log(res);
    // setFresh(fresh + 1);
  };

  const UploadUi = () => {
    const previewMethodsRef = useRef();
    const onClearPreviews = useCallback(() => {
      previewMethodsRef.current?.clear();
      console.log("clear shod !");
    }, [previewMethodsRef]);

    return (
      <ChunkedUploady customInput enhancer={retryEnhancer} className="">
        <ExampleForm />

        <UploadDropZone
          onDragOverClassName="drag-over"
          grouped
          maxGroupSize={1}
          className="flex flex-col items-center justify-center h-40 my-2 border border-gray-800 border-dashed rounded"
        >
          <span>فایل ها را اینجا رها کنید</span>

          <div dir="rtl">
            {" "}
            {currentRoute[0] !== undefined ? (
              <div className="flex flex-col items-center justify-center">
                <UploadButton />
                <hr />
                <span>
                  فایل ها در پوشه{" "}
                  <span className="text-green-400"> {currentRoute[0]}</span>{" "}
                  اپلود خواهند شد
                </span>
              </div>
            ) : (
              <span> یک مسیر انتخاب کنید</span>
            )}
          </div>
          <button className="text-red-400" onClick={onClearPreviews}>
            پاکسازی لیست
          </button>
        </UploadDropZone>

        <div className="my-2">
          <UploadPreview
            previewMethodsRef={previewMethodsRef}
            rememberPreviousBatches
            PreviewComponent={QueueItem}
            previewComponentProps={{
              foo: null,
            }}
          />
        </div>
      </ChunkedUploady>
    );
  };
  return (
    <div>
      <div className="flex"></div>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-8">
          <div className="grow">
            {currentRoute[0] == undefined ? (
              <div className="flex flex-col items-center justify-center h-40 my-2 border border-gray-800 border-dashed rounded">
                برای اپلود یک مسیر انتخاب کنید
              </div>
            ) : (
              <UploadUi />
            )}
          </div>
          <div>
            {isLoading ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                <div className="grid grid-cols-6 gap-4 place-content-center">
                  {/* {files.slice(page * perpage, page * perpage + perpage)} */}
                  {files.map((f) => (
                    <div key={f.id}>
                      <div className="flex items-center justify-center bg-white border border-gray-500">
                        {["png", "jpg", "gif"].includes(
                          getFileExtension(f.url),
                          0
                        ) ? (
                          <img
                            src={f.url}
                            className="h-20"
                            onClick={() => {
                              navigator.clipboard.writeText(f.url);
                              if (selectedFile !== undefined) {
                                selectedFile(f.url);
                              }
                              toast.success("کبی شد");
                            }}
                          />
                        ) : ["mp4", "mkv"].includes(f.url) ? (
                          <img
                            src="/VP.png"
                            className="h-20"
                            onClick={() => {
                              navigator.clipboard.writeText(f.url);
                              if (selectedFile !== undefined) {
                                selectedFile(f.url);
                              }
                              toast.success("کبی شد");
                            }}
                          />
                        ) : (
                          <img
                            src="/VP.png"
                            className="h-20"
                            onClick={() => {
                              navigator.clipboard.writeText(f.url);
                              if (selectedFile !== undefined) {
                                selectedFile(f.url);
                              }
                              toast.success("کبی شد");
                            }}
                          />
                        )}
                        {/* <input type="text" value={f.name} /> */}
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-red-600">
                          <FaTrashCan
                            onClick={() => {
                              handleDeleteFile(f.id);
                            }}
                          />
                        </span>
                        <div
                          className="overflow-x-auto whitespace-nowrap"
                          onClick={() => {
                            navigator.clipboard.writeText(f.url);
                            if (selectedFile !== undefined) {
                              selectedFile(f.url);
                            }
                            toast.success("کبی شد");
                          }}
                        >
                          {f.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {page !== null && (
                  <div className="flex justify-between">
                    {page < totalPages.length ? (
                      <button onClick={() => setPage(page + 1)}>
                        صفحه بعدی{" "}
                      </button>
                    ) : (
                      "تموم شد حاجی"
                    )}

                    <select
                      value={page}
                      onChange={(e) => setPage(e.target.value)}
                    >
                      {totalPages.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    {page !== null && page > 1 ? (
                      <button onClick={() => setPage(page - 1)}>
                        صفحه قبلی{" "}
                      </button>
                    ) : (
                      "صفحه قبلی نداریم که "
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="col-span-4 py-5 mr-4 rounded-lg">
          <div className="h-40 ">
            <div dir="rtl">
              <form
                onSubmit={(e) => handleCreateDir(e)}
                className="flex items-center justify-center"
              >
                <input
                  type="text"
                  onChange={(e) => setNewDir(e.target.value)}
                  onBlur={(e) => {
                    setNewDir(e.target.value);
                    console.log(newDir);
                  }}
                  placeholder="نام پوشه را وارد کنید"
                  className="mx-2 text-center border border-gray-300 rounded-lg w-60"
                  required={true}
                />
                <button
                  type="submit"
                  className="px-1 mx-1 bg-gray-300 rounded-lg text-[10px] w-20"
                >
                  افزودن
                </button>
              </form>
              <span className="text-[10px] text-center mx-4">
                افزودن پوشه جدید به پوشه :
                <span className="text-green-600">
                  {currentRoute[0] ? currentRoute[0] : " اصلی"}
                </span>
              </span>
            </div>
            <form
              className="flex items-center justify-center mt-2"
              onSubmit={(e) => handleSearchFile(e)}
            >
              <button
                type="submit"
                className="px-1 mx-1 bg-gray-300 rounded-lg text-[10px] w-20"
              >
                برسی
              </button>
              <input
                type="text"
                placeholder="جست و جو"
                className="mx-2 text-center border border-gray-300 rounded-lg w-60"
                onChange={(e) => setTerm(e.target.value)}
                onBlur={(e) => setTerm(e.target.value)}
                required
              />
            </form>
          </div>
          <div className="overflow-y-auto h-[500px]">
            {directories.map((dir) => (
              <div key={dir.id} className={`text-right `}>
                <div
                  className={`grid grid-cols-12 gap-2  items-center justify-between px-2 border-b border-dashed border-black my-2 rounded-lg ${
                    currentDir == dir.id ? "bg-green-300" : "bg-white"
                  }`}
                  onClick={() => handleOpenDir(dir, dir.id)}
                  dir="rtl"
                >
                  <FaFolderOpen className="col-span-1 " />
                  <div className="col-span-8 cursor-pointer">
                    {" "}
                    {dir.name}{" "}
                    <span className="text-green-500 text-[10px]">
                      [{dir.files.length}]
                    </span>
                  </div>

                  <div className="col-span-1">
                    {dir.children.length > 0 && <FaAngleLeft />}
                  </div>
                </div>
                <div
                  className={openDir.includes(dir.id) ? "" : "hidden"}
                  ref={(element) => {
                    ParentRef.current[dir.id] = element;
                  }}
                >
                  {dir.children !== undefined && Nested(dir.children)}
                </div>
                {/* {dir.children.map((child) => (
                <div className="flex items-center justify-end" key={child.id}>
                  {child.name} <FaFolderMinus className="h-2" />
                </div>
              ))} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
