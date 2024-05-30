import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build";
import SunEditor, { buttonList } from "suneditor-react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const LessonSection = ({ data, output }) => {
  // const inputHandler = (event, editor) => {
  //   output(editor.getData());
  // };
  const handleContent = (content) => {
    output(content);
  };
  return (
    <div className="h-screen py-32 my-10 overflow-y-scroll">
      <div>
        <SunEditor
          setContents={data.content}
          className="fixed px-4 mt-10"
          onChange={handleContent}
          height="100%"
          setOptions={{
            stickyToolbar: false,
            height: "100%",
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
        {output}
      </div>
    </div>
  );
};

export default LessonSection;
