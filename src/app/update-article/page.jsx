"use client";
import UpdateArticleScreen from "@/pages/Dashboard/articles/update-article";
import { useSearchParams } from 'next/navigation';

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
