"use client";
import UpdateArticleScreen from "@/pages/Dashboard/articles/update-article";
import { useSearchParams } from 'next/navigation';

export const metadata = {
  title: "Leap",
  description: "",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU",
  },
};



const ArticleUpdatePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  
  return (
    <div>
      <UpdateArticleScreen id={search} />
    </div>
  );
};

export default ArticleUpdatePage;
