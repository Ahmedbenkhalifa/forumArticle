import axios from "axios";
import { useEffect, useState } from "react";

const useSearch = (page, query) => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const getAllArticles = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/article/getResultSearch", {
        params: {
          page: page,
          q: query,
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
    if (query) {
      getAllArticles();
    }
  }, [page, query]);

  return [articles, isLoading, totalPages];
};

export default useSearch;
