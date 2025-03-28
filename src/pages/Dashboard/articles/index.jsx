"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";


const CustomEditor = dynamic(() => import("./_component/custom-editor"), {
  ssr: false
});

const ArticleScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [writtenBy, setWrittenBy] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("<p>Hello World! 🌎️</p>");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let token = JSON.parse(localStorage.getItem("u_t"));

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("written_by", writtenBy);
    formData.append("content", content);

    axios
      .post(SERVER_URL + "/api/article/", formData,{
        headers: {
          "x-auth-token": token
        }
      }) // Remove the headers and data wrapper
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Article has been added",
          showConfirmButton: false,
          timer: 1500
        });
        setTitle("");
        setCategory("");
        setImage(null);
        setContent("");
        setWrittenBy("");
        setIsLoading(false);
        router.push('/articles-list')
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
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
              className="h-[50px] border border-gray-600 rounded-[12px] pl-3 text-black dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[49%]">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Category
            </label>
            <select
              defaultValue={"stock"}
              onChange={(e) => setCategory(e.target.value)}
              className="h-[50px] border dark:text-white text-black border-gray-600 rounded-[12px] pl-3"
            >
              <option value="stock">Stock</option>
              <option value="crypto">Crypto</option>
              <option value="forex">Forex</option>
            </select>
          </div>
          <div className="flex flex-col w-[49%] mt-10">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Written By
            </label>
            <input
              type="text"
              placeholder="Author name"
              className="h-[50px] border border-gray-600 rounded-[12px] pl-3 text-black dark:text-white"
              value={writtenBy}
              onChange={(e) => setWrittenBy(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[49%] mt-10">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Article Image
            </label>
            <input
              type="file"
              className="h-[50px] rounded-[12px] pl-3 dark:text-white"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col w-[100%] mt-10">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Article Content
            </label>
            <CustomEditor initialContent={content} content={setContent} />
          </div>
          <div>
            <button
              onClick={(e) => onSubmitData(e)}
              className="flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black mt-4 xl:mt-6"
            >
              {isLoading? 'Please wait...' : "Create Article" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleScreen;
