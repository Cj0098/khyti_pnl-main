"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubmitCode from "../services/submitcode";
import { react, useState, useRef, useEffect } from "react";
import { useTokenContext } from "../Context/token";
import subLogin from "../services/submitlogin";
import { useRouter } from "next/navigation";
import formatMobileNumber from "../utils/formatMobileNumber";
const LoginBox = () => {
  const router = useRouter();
  const { token, setToken } = useTokenContext();
  const [mobileNumber, setMobileNumber] = useState("");
  const [step, setStep] = useState(1);
  const [isLogin, setIsLogin] = useState();
  const [countDown, setCountDown] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [countDownLoading, setCountDownLoading] = useState(false);

  const deacreaseCountDown = () =>
    setCountDown((current) => {
      if (current > 0) {
        return current - 1;
      }
    });
  useEffect(() => {
    let countDownInterval = setInterval(deacreaseCountDown, 1000);
    if (countDown < 1) {
      clearInterval(countDownInterval);
    }
    return () => clearInterval(countDownInterval);
  }, [countDown, countDownLoading]);

  // ————— V E R I F I C A T I O N - C O D E —————
  const [verificationCode, setVerificationCode] = useState("");
  const verificationCodeError = useRef("");
  const isVerificationCodeValid = (vc) => /^(\d{6})$/.test(vc);
  const verificationCodeValid = isVerificationCodeValid(verificationCode);
  const handleVerificationCodeOnChange = (e) => {
    const enteredVerificationCode = e.target.value;
    console.log(enteredVerificationCode);

    const properVerificationCode = enteredVerificationCode
      .replace(/\D/g, "")
      .slice(0, 6);
    if (properVerificationCode) {
      if (isVerificationCodeValid(properVerificationCode)) {
        verificationCodeError.current = "";
      } else {
        verificationCodeError.current = "میبایست 6 رقم باشد";
      }
    } else {
      verificationCodeError.current = "";
    }
    setVerificationCode(properVerificationCode);
  };

  const mobileNumberError = useRef("");
  const isMobileNumberValid = (mn) => /^(09\d{9})$/.test(mn);
  const mobileNumberValid = isMobileNumberValid(mobileNumber);
  const handleMobileNumberOnChange = (e) => {
    const enteredMobileNumber = e.target.value;
    const properMobileNumber = enteredMobileNumber
      .replace(/\D/g, "")
      .slice(0, 11);
    if (properMobileNumber) {
      if (isMobileNumberValid(properMobileNumber)) {
        mobileNumberError.current = "";
      } else {
        mobileNumberError.current =
          "شماره همراه میبایست با 09 آغاز شود و 11 رقم باشد";
      }
    } else {
      mobileNumberError.current = "";
    }
    setMobileNumber(properMobileNumber);
  };
  const submitLogin = () => {
    setSubmitLoading(true);
    subLogin(mobileNumber).then((resp) => {
      if (resp.isDone) {
        setToken(resp.data.token);
        setCountDownLoading(true);
        setCountDown(300);
        toast.success("ارتباط موفقیت آمیز");
        setStep(2);
      } else {
        if (resp.data.message === "give it a try for a few more moments") {
          setCountDownLoading(true);
          setCountDown(parseInt(resp.data.timeleft));
          toast.error("کد ارسال شده را وارد کنید" + countDown);
          setStep(2);
          setSubmitLoading(false);
        } else {
          toast.error("خطایی رخ داد");
          setSubmitLoading(false);
        }
      }
      console.log(resp);
    });
  };

  const HandleSubmitCode = () => {
    SubmitCode(mobileNumber, verificationCode).then((resp) => {
      if (resp.isDone) {
        setToken(resp.data.token);
        router.push("/dash");
        toast.success("ارتباط موفقیت آمیز");
      } else {
        toast.error("مشکلی رخ داده است");
        console.log(resp);
      }
      setSubmitLoading(false);
    });
  };

  return (
    <div className="container mx-auto mt-10 text-black h-96">
      <div className="flex flex-row items-center text-right " dir="rtl">
        <img src="/logo.png" width="100" height="100" />
        <div className="my-2 mr-5">
          <span className="bg-[#D9D9D9] px-1 shadow-lg my-4">
            سلام کاربرگرامی به سامانه مدیریتی وبسایت لذت خیاطی خوش آمدید
          </span>
          <p className="bg-[#D9D9D9] px-1 shadow-lg">
            برای ورود به سامانه شماره تماس خود را وارد نمایید
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <div>
          {step === 2 && (
            <p className="my-4 text-sm font-bold text-center">
              کد تایید ارسال شده برای شماره{" "}
              <span dir="ltr">{formatMobileNumber(mobileNumber)}</span> را وارد
              کنید
            </p>
          )}

          {step === 2 && (
            <>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center justify-center space-x-2"
              >
                {/* <Verification Code | Step 2> */}

                <input
                  value={verificationCode}
                  onChange={handleVerificationCodeOnChange}
                  className={`block text-lg rounded p-2 w-full text-center mx-auto bg-[#D9D9D9] ${
                    verificationCode ? "tracking-[7px]" : ""
                  }`}
                  dir="ltr"
                  type="tel"
                  autoComplete="off"
                  placeholder="x x x x x x"
                />

                {/* </Verification Code | Step 2> */}

                {/* <Resend Code | Step 2> */}

                {/* <Submit - Login | Step 2> */}

                <button
                  onClick={HandleSubmitCode}
                  className="px-4 py-2 text-black bg-lime-400 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>ورود</span>
                </button>

                {/* </Submit - Login | Step 2> */}
              </form>
              <div className="text-xs">
                {countDown > 0 ? (
                  <span>درخواست مجدد کد تا {countDown} ثانیه دیگر</span>
                ) : (
                  <>
                    {countDownLoading ? (
                      "فرصت به اتمام رسید"
                    ) : (
                      <span className="cursor-pointer opacity-80 hover:opacity-100 hover:underline">
                        ارسال مجدد کد تایید
                      </span>
                    )}
                  </>
                )}

                {/* </Resend Code | Step 2> */}
              </div>
            </>
          )}

          {step === 1 && (
            <div className="flex items-center justify-center space-x-2">
              <input
                dir="ltr"
                type="tel"
                autoComplete="off"
                value={formatMobileNumber(mobileNumber)}
                placeholder="09—— ——— ————"
                className="block text-lg py-2 px-3 rounded-2xl bg-[#D9D9D9]"
                onChange={handleMobileNumberOnChange}
              />
              <button
                className="flex justify-center w-40 px-1 py-2 rounded-lg shadow-md bg-cyan-400"
                onClick={submitLogin}
              >
                {submitLoading ? (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "دریافت کد تایید"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
