import React from "react";
import Typewriter from "typewriter-effect";

export default function TypingEffect() {
  return (
    <div
      className="flex items-center justify-center mx-4 mt-4 bg-white rounded-lg mb-3"
      dir="rtl"
    >
      <Typewriter
        options={{
          strings: [
            "به پنل مدیریت لذت خیاطی خوش آمدید",
            "در صورت بروز هرگونه مشکل ابتدا نیت کرده و مجددا اقدام کنید ",
          ],
          autoStart: true,
          loop: true,
        }}
      />
      {/* <Typewriter
        options={{
          strings: [
            "<span className='bg-red'> <?php public function Code Keshi () </span>",
          ],
          autoStart: true,
          loop: true,
        }}
      /> */}
    </div>
  );
}
