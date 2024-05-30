import SunEditor, { buttonList } from "suneditor-react";
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

const MyEditor = () => {
  return (
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
        imageGalleryLoadURL: "https://lezatkhayati.com/api/upload/files/editor",
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
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
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
          ["-right", ":r-More Rich-default.more_plus", "table", "imageGallery"],
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
  );
};

export default MyEditor;