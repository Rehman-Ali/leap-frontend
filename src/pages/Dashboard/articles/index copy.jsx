"use client";

import React from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

const ArticleScreen = () => {
  const cloud = useCKEditorCloud({
    version: "44.1.0",
    premium: true,
  });

  if (cloud.status === "error") {
    return <div>Error!</div>;
  }

  if (cloud.status === "loading") {
    return <div>Loading...</div>;
  }

  const { ClassicEditor, Essentials, Paragraph, Bold, Italic } = cloud.CKEditor;

  const { FormatPainter } = cloud.CKEditorPremiumFeatures;

  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="">
          <div className="">
            <h2 className="text-[26px] font-medium mb-8 dark:text-white text-black">
              Add New Articles
            </h2>
            <div className="flex flex-row flex-wrap justify-between">
              <div className="flex flex-col w-[49%]">
                <label className="dark:text-white text-black font-inter font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Article title"
                  className="h-[50px] border border-gray-600 rounded-[12px] pl-3"
                />
              </div>
              <div className="flex flex-col w-[49%]">
                <label className="dark:text-white text-black font-inter font-medium mb-2">
                  Category
                </label>
                <select className="h-[50px] border dark:text-white text-black border-gray-600 rounded-[12px] pl-3">
                  <option>Stock</option>
                  <option>Crypto</option>
                  <option>Forex</option>
                </select>
              </div>
              <div className="flex flex-col w-[49%] mt-10">
                <label className="dark:text-white text-black font-inter font-medium mb-2">
                  Written By
                </label>
                <input
                  type="text"
                  placeholder="Article title"
                  className="h-[50px] border border-gray-600 rounded-[12px] pl-3"
                />
              </div>
              <div className="flex flex-col w-[49%] mt-10">
                <label className="dark:text-white text-black font-inter font-medium mb-2">
                  Article Image
                </label>
                <input
                  type="file"
                  placeholder="Article title"
                  className="h-[50px]   rounded-[12px] pl-3"
                />
              </div>
              <div className="flex flex-col w-[100%] mt-10 ">
                <CKEditor
                  editor={ClassicEditor}
                  data={"<p>Hello world!</p>"}
                  config={{
                    licenseKey: "<YOUR_LICENSE_KEY>",
                    plugins: [
                      Essentials,
                      Paragraph,
                      Bold,
                      Italic,
                      FormatPainter,
                    ],
                    toolbar: [
                      "undo",
                      "redo",
                      "|",
                      "bold",
                      "italic",
                      "|",
                      "formatPainter",
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleScreen;
