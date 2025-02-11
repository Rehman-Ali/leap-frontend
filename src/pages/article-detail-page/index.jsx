"use client";
import FullPageLoader from "@/app/_components/loader";
import { useInView } from "@/hooks/useInView";
import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ArticleDetailScreen = ({ id }) => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [articleData, setArticleData] = useState(null);
  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("u_t"));
    axios
      .get(`${SERVER_URL}/api/article/${id}`, {
        headers: {
          "x-auth-token": token
        }
      })
      .then((res) => setArticleData(res.data.data))
      .catch((err) => console.log(err, "err is here==="));
  }, []);

  const htmlString = `<h1 class="text-2xl font-bold">Hello, World!</h1><p class="text-gray-600">This is a sample HTML content.</p>`;

  return articleData === null ? (
    <FullPageLoader />
  ) : (
    <div
      ref={sectionRef}
      className="bg-bodycolor max-w-[1200px] mx-auto mt-[50px] mw-11:p-[20px]"
    >
      <div className="flex flex-row items-center justify-between mw-10:flex-col mw-10:gap-5">
        <div>
          <p className="text-white font-inter font-bold text-[28px]">
            {articleData !== null ? articleData.title : ""}
          </p>
          <p className="text-red-700 font-inter font-bold text-[16px]">
            {new Date(articleData.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-800 p-[20px] rounded-[8px] flex flex-row mw-10:flex-col items-start justify-start max-w-[500px] gap-5">
          <Image
            src={"/assets/articles/arran.jpg"}
            height={100}
            width={100}
            className="h-[100px] w-[100px] rounded-full"
            alt="arran image"
          />
          <div>
            <p className="text-darkPrimary font-inter font-semibold text-[18px]">
              Arran Brough
            </p>
            <p className="text-white font-inter text-[16px]">
              Arran has been a professional trader for over 4 years. He manages
              a portfolio of over $6 million and he focuses on achieving small
              consistent gains over time. Throughout this time he has built a
              community of like minded traders where he helps them to make it in
              trading. He Loves surfing and travelling and this is what made him
              learn trading so that he could travel the world and earn money
              anywhere.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start mt-[50px]">
        {/* <Image
          src={
            articleData !== null
              ? articleData.image_url
              : "/assets/articles/pic1.jpg"
          }
          height={515}
          width={985}
          className="h-[515px] w-[100%]"
          alt="article image"
        /> */}
        {articleData.image_url !== null &&
          (articleData.image_url !== "") &&
          (
            <Image
              src={
                articleData !== null
                  ? articleData.image_url
                  : "/assets/articles/pic1.jpg"
              }
              height={515}
              width={985}
              className="h-auto min-h-[157px] w-full "
              alt="article"
            />
          )}

        <div className=" mt-[50px]">
          <div
            className="prose max-w-none text-white"
            dangerouslySetInnerHTML={{
              __html: articleData !== null ? articleData.content : htmlString
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailScreen;
