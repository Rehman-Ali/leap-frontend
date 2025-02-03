"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const ArticleListScreen = () => {


  const [articleList, setArticleList] = useState([]);

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articleList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = articleList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        const response = await axios.get(SERVER_URL + "/api/article/all", {
          signal: controller.signal
        });
        if (response.data?.data) {
          setArticleList(response.data.data);
        }
        // ... rest of the code
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error:", error);
        }
      }
    };
  
    fetchData();
  
    return () => controller.abort(); // Cleanup on unmount
  }, []);

  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="">
          <div className="">
            <h2 className="text-[26px] font-medium mb-8 text-white dark:text-black" >Subscriptions List</h2>
            <Link href="/add-article">
            <button
              className="flex mb-5 justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black mt-4 xl:mt-6"
            >
              Create Article
            </button>
            </Link>
            <div className="overflow-x-auto mw-9:w-[300px]">
            <table className="min-w-full bg-white dark:bg-bodyColor   rounded-lg shadow-md">
              <thead>
                <tr className="bg-darkPrimary">
                  <th className="py-2 border">Sr</th>
                  <th className="py-2 border">Title</th>
                  <th className="py-2  border">Category</th>
                  <th className="py-2 border">Image</th>
                  <th className="py-2 border">Written By</th>
                  <th className="py-2 border">Content</th>
                  <th className="py-2 border">Created At</th>
                
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((article , index) => (
                  <tr key={index} className=" dark:text-white text-black">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{article.title}</td>
                    <td className="py-2 px-4 border-b">{article.category}</td>
                    <td className="py-2 px-4 border-b">
                     {article.image_url !== undefined && 
                     <Image
                     src={article.image_url}
                     height={100}
                     width={500}
                     className="h-[100px] w-[500px]"
                     />
                     } 

                    </td>
                    <td className="py-2 px-4 border-b">{article.written_by}</td>
                    <td className="py-2 px-4 border-b">{article.content}</td>
                    <td className="py-2 px-4 border-b"> {new Date(article.createdAt).toLocaleString()}</td>
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
              <span className="text-sm dark:text-white text-black
              ">
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
