import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputBase,
  Pagination,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import useSearch from "../../hooks/useSearch";

const ResultSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/article?id=${id}`);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermPage = searchParams.get("page");
  const searchTermQuery = searchParams.get("query");
  const [page, setPage] = useState(searchTermPage || 1);
  const [query, setQuery] = useState(searchTermQuery || "");
  const [articles, isLoading, totalPages] = useSearch(page, query);
  const handleChange = (event, value) => {
    setPage(value);
    setSearchParams({ query: query, page: value });
  };
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "... " : str;
  };
  let delayTimer = null;
  const doSearch = (e) => {
    e.preventDefault();
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      setSearchParams({ query: e.target.value });
      setQuery(e.target.value);
    }, 1000);
  };
  useEffect(() => {
    if (searchTermPage) {
      setPage(searchTermPage);
    }
  }, [searchTermPage]);
  return (
    <Box
      sx={{
        mt: 9,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ display: "flex",  flexDirection: isMobile ? "column" : "row" }}
      >
        <Typography variant="h4" sx={{ mr: 4 }}>
          Liste des Publications
        </Typography>
        <Paper
          elevation={10}
          component="form"
          onSubmit={doSearch}
          sx={{ maxWidth: "500px", borderRadius: "15px", display: "flex", overflow: "hidden" }}
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
      {isLoading && (
        <Box sx={{ margin: "30px auto", width: "80px", height: "80px" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!isLoading &&
        articles?.map((post, key) => (
          <Box key={key} sx={{ p: 2 }}>
            <Typography
              variant="h6"
              component={Box}
              onClick={() => handleClick(post._id)}
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
            <Box sx={{ display: "flex", maxWidth: "752px" }}>
              <Typography>
                {moment(post.createdAt).format("YYYY-MM-DD")} — {truncate(post?.summary, 140)}
              </Typography>
            </Box>
          </Box>
        ))}
      {!isLoading && articles.length > 0 && (
        <Pagination count={totalPages} page={parseInt(page)} onChange={handleChange} />
      )}
      {!isLoading && articles.length === 0 && <EmptyArray />}
    </Box>
  );
};

const EmptyArray = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="body1">
        Aucun document ne correspond aux termes de recherche spécifiés
        <br />
        Suggestions :
      </Typography>
      <Box component={"ul"}>
        <Typography component="li" variant="body1">
          Vérifiez l’orthographe des termes de recherche.
        </Typography>
        <Typography component="li" variant="body1">
          Essayez d'autres mots.
        </Typography>
        <Typography component="li" variant="body1">
          Spécifiez un moins grand nombre de mots.
        </Typography>
      </Box>
    </Box>
  );
};
export default ResultSearch;
