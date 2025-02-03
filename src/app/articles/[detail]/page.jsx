
"use client"
import ArticleDetailScreen from "@/pages/article-detail-page";
import { useParams } from "next/navigation";

const ArticleDetailPage = () => {
  const params = useParams();
  const articleId = params.detail; // Get the dynamic ID
   console.log(articleId, "id is here====")
  return (
    <div>
     <ArticleDetailScreen id={articleId}/>
         </div>
  );
};

export default ArticleDetailPage;
