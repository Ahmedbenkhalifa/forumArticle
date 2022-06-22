import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  InputBase,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import useArticle from "../../../hooks/useArticle";
import useSearch from "../../../hooks/useSearch";
const ListArticles = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("page");
  const [page, setPage] = useState(searchTerm || 1);
  const searchTermQuery = searchParams.get("query");
  const [query, setQuery] = useState(searchTermQuery);
  const [articles, isLoading, totalPages] = useArticle(page);
  const [articlesSearch, isLoadingSearch, totalPagesSearch] = useSearch(page, query);
  
  const handleChange = (event, value) => {
    setPage(value);
    query ? setSearchParams({ page: value, query: query }) : setSearchParams({ page: value });
  };
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "... " : str;
  };
  const handleClick = (id) => {
    navigate(`/dashboard/EditArticle/${id}`);
  };

  let delayTimer = null;
  const doSearch = (e) => {
    e.preventDefault();
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      setSearchParams({ page: page, query: e.target.value });
      setQuery(e.target.value);
    }, 1000);
  };
  const filtrePost = (articles, articlesSearch) => {
    if (query) {
      return articlesSearch;
    }
    return articles;
  };
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", position: "fixed" }}>
        <Typography variant="h4" sx={{ mr: 4 }}>
          Liste des Publications
        </Typography>
        <Paper
          elevation={10}
          component="form"
          sx={{ width: "500px", borderRadius: "15px", display: "flex", overflow: "hidden" }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Effectuez une recherche"
            inputProps={{ "aria-label": "Effectuez une recherche" }}
            onKeyUp={doSearch}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ p: "10px", color: "white" }}
            aria-label="search"
          >
            <SearchIcon />
          </Button>
        </Paper>
      </Box>
      <Box sx={{ mt: 6 }}></Box>
      {isLoading && (
        <Box sx={{ margin: "30px auto", width: "80px", height: "80px" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!isLoading && (
        <Box sx={{ p: 2, maxWidth: "752px", overflow: "auto" }}>
          {filtrePost(articles, articlesSearch)?.map((post, key) => (
            <Box key={key}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
              >
                <Typography
                  variant="h6"
                  component={Box}
                  onClick={()=> navigate(`/article?id=${post._id}`)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "#76A6F1",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {post?.title}
                </Typography>
                <Button variant="outlined" onClick={() => handleClick(post?._id)}>
                  Modifier
                </Button>
              </Box>
              <Typography>
                {moment(post.createdAt).format("YYYY-MM-DD")} — {truncate(post?.summary, 140)}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))}
          <Pagination
            count={query ? totalPagesSearch : totalPages}
            page={parseInt(page)}
            onChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default ListArticles;
