import axios from "axios";
import { useEffect, useState } from "react";

const useArticle = (page) => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const getAllArticles = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/article/getAllArticles", {
        params: {
          page: page,
        },
      });
      setTotalPages(data.totalPages);
      setArticles(data.articles);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllArticles();
  }, [page]);

  return [articles, isLoading, totalPages];
};

export default useArticle;
