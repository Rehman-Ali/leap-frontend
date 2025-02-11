"use client";
import { useInView } from "@/hooks/useInView";
import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ArticleScreen = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("all");
  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/article/all`)
      .then((res) => {
        setArticleList(res.data.data);
        setFilterData(res.data.data);
      })
      .catch((err) => console.log(err, "err is here==="));
  }, []);

  const onFilterData = (type) => {
    if (type === "all") {
      setFilterData(articleList);
      setSelectedTitle("all");
    } else if (type === "crypto") {
      setFilterData(articleList.filter((item) => item.category === "crypto"));
      setSelectedTitle("crypto");
    } else if (type === "stock") {
      setSelectedTitle("stock");
      setFilterData(articleList.filter((item) => item.category === "stock"));
    } else {
      setSelectedTitle("forex");
      setFilterData(articleList.filter((item) => item.category === "forex"));
    }
  };

  return (
    <div
      ref={sectionRef}
      className="bg-bodycolor max-w-[1200px] mx-auto mt-[50px] min-h-[500px]  mw-11:p-[20px]"
    >
      <div className="flex flex-row items-center justify-center">
        <h1
          className={`text-darkPrimary
          ${animationTriggered ? "animate-slideIn" : ""}
          text-4xl sm:text-5xl lg:text-6xl font-bold`}
        >
          Articles
        </h1>
      </div>
      <div className="mt-10 flex flex-row items-center justify-between">
        <div className="flex flex-row items-start gap-x-5">
          <div
            className={`${
              selectedTitle === "all"
                ? "border-b-darkPrimary border-b-[2px]"
                : ""
            }`}
          >
            <p
              onClick={() => onFilterData("all")}
              className={`${
                selectedTitle === "all" ? "text-darkPrimary" : "text-white"
              }  cursor-pointer font-inter font-semibold text-[24px]`}
            >
              All
            </p>
          </div>
          <div
            className={`${
              selectedTitle === "crypto"
                ? "border-b-darkPrimary border-b-[2px]"
                : ""
            }`}
          >
            <p
              onClick={() => onFilterData("crypto")}
              className={`${
                selectedTitle === "crypto" ? "text-darkPrimary" : "text-white"
              }  font-inter cursor-pointer font-semibold text-[24px]`}
            >
              Crypto
            </p>
          </div>
          <div
            className={`${
              selectedTitle === "forex"
                ? "border-b-darkPrimary border-b-[2px]"
                : ""
            }`}
          >
            <p
              onClick={() => onFilterData("forex")}
              className={`${
                selectedTitle === "forex" ? "text-darkPrimary" : "text-white"
              } font-inter font-semibold cursor-pointer text-[24px]`}
            >
              Forex
            </p>
          </div>
          <div
            className={`${
              selectedTitle === "stock"
                ? "border-b-darkPrimary border-b-[2px]"
                : ""
            }`}
          >
            <p
              onClick={() => onFilterData("stock")}
              className={`${
                selectedTitle === "stock" ? "text-darkPrimary" : "text-white"
              } font-inter font-semibold text-[24px] cursor-pointer`}
            >
              Stock
            </p>
          </div>
        </div>
        {/* <div className="flex flex-row items-center gap-x-3">
          <input
            className="border border-gray-400 h-[50px] w-[300px] rounded-[8px] pl-[10px]"
            type="text"
            placeholder="search..."
          />
          <FaSearch size={30} color={"#37F94E"} />
        </div> */}
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-[40px] ">
        {filterData.length > 0 ? (
          filterData.map((item, index) => (
            <Link
              href={`/articles/${item._id}`}
              className="bg-gray-500 h-auto mw-6:w-[100%] mw-10:w-[48%] mw-11:w-[48%] mw-12:w-[32%] w-[24%] rounded-[8px]"
              key={index}
            >
              {/* <Image
                src={item.image_url}
                height={157}
                width={300}
                className="h-[157px] w-[100%] rounded-t-[8px]"
                alt="article"
              /> */}
              <Image
                src={item.image_url}
                height={157}
                width={300}
                className="h-auto min-h-[157px] w-full rounded-t-[8px]"
                alt="article"
              />

              <div className="p-[10px] h-[143px] bg-white flex flex-col justify-between rounded-b-[8px]">
                <div className="flex flex-col gap-y-2">
                  <p className="text-red-700 font-inter text-[16px] font-medium capitalize">
                    {item.category}
                  </p>
                  <p className="text-black font-inter font-medium text-[16px]">
                    {item.title}
                  </p>
                </div>
                <p className="text-black font-inter font-normal text-[12px]">
                  By&nbsp;
                  <span className="text-black font-semibold text-[14px]">
                    &nbsp;
                    {item.written_by}
                  </span>
                  &nbsp; | {item.createdAt.split("T")[0]}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-row items-center justify-center">
            <p className="text-white font-inter font-medium text-[18px] text-center">
              No Article Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleScreen;
