"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ArticleListScreen = () => {
  const [articleList, setArticleList] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articleList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = articleList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("u_t"));
    setUserToken(token);
    axios
      .get(SERVER_URL + "/api/article/all", {
        headers: {
          "x-auth-token": token
        }
      })
      .then((res) => {
        setArticleList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [isDelete]);

  const onClickDeleteButton = (id) => {
    setIsDelete(false);
    Swal.fire({
      title: "Do you really want to delete it. This will not reversable?",
      showDenyButton: true,
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Yes Delete",
      confirmButtonColor: "#37F94E",
      denyButtonText: `Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete(SERVER_URL + `/api/article/${id}`, {
            headers: {
              "x-auth-token": userToken
            }
          })
          .then((res) => {
            if (res.data.success === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Article has been deleted successfully",
                showConfirmButton: false,
                timer: 1500
              });
              setIsDelete(true);
            }
          })
          .catch((err) =>
            Swal.fire({
              position: "center",
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
          );
      }
    });
  };

  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="">
          <div className="">
            <h2 className="text-[26px] font-medium mb-8 text-black dark:text-white">
              Articles List
            </h2>
            <Link href="/add-article">
              <button className="flex mb-5 justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black mt-4 xl:mt-6">
                Create Article
              </button>
            </Link>
            <div className="overflow-x-auto mw-9:w-[300px]">
              <table className="min-w-full bg-white dark:bg-bodyColor   rounded-lg shadow-md">
                <thead>
                  <tr className="bg-darkPrimary text-black">
                    <th className="py-2 border">Sr</th>
                    <th className="py-2 border">Title</th>
                    <th className="py-2  border">Category</th>
                    <th className="py-2 border">Image</th>
                    <th className="py-2 border">Written By</th>
                    <th className="py-2 border">Content</th>
                    <th className="py-2 border">Created At</th>
                    <th className="py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((article, index) => (
                    <tr key={index} className=" dark:text-white text-black">
                      <td className="py-2 px-4 border-b text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {article.title}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {article.category}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {article.image_url !== undefined && (
                          <Image
                            src={article.image_url}
                            height={100}
                            width={500}
                            className="h-[100px] w-[500px]"
                            alt="article"
                          />
                        )}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {article.written_by}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {article.content}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2   px-4 border-b text-center">
                        <span
                          className="px-3 cursor-pointer py-1 mr-[10px] bg-green-700 text-white text-[14px] rounded-md disabled:opacity-50"
                          // onClick={() => onClickDeleteButton()}
                        >
                          Update
                        </span>
                        <span
                          className="px-3 py-1 cursor-pointer bg-red-700 text-white text-[14px] rounded-md disabled:opacity-50"
                          onClick={() => onClickDeleteButton(article._id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end items-center mt-4 gap-2">
              <button
                className="px-3 py-1 bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span
                className="text-sm dark:text-white text-black
              "
              >
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListScreen;
