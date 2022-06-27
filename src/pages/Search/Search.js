import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SearchList from "./components/SearchList";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let delayTimer = null;
  const handleChange = (e) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      setQueryText(e.target.value);
    }, 1000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryText) {
      console.log(queryText);
      navigate(`/search?query=${queryText}&page=1`);
    }
  };
  useEffect(() => {
    if (!queryText) {
      setSearchResults([]);
    } else {
      (async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get("/api/article/search", {
            params: {
              tags: queryText,
            },
          });
          setSearchResults(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      })();
    }
  }, [queryText]);
  return (
    <Box component="main">
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{
          mt: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: "500", mb: 1 }}>
          Hi! How can we help you?
        </Typography>
        <Paper
          elevation={10}
          sx={{
            width: "85%",
            borderRadius: "15px",
          }}
        >
          <Box
            component="form"
            sx={{
              borderRadius: "15px",
              display: "flex",
              overflow: "hidden",
            }}
            onSubmit={handleSubmit}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Effectuez une recherche"
              inputProps={{ "aria-label": "Effectuez une recherche" }}
              onKeyUp={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ p: "10px", color: "white" }}
              aria-label="search"
            >
              <SearchIcon />
            </Button>
          </Box>
          {queryText && searchResults.length > 0 && (
            <>
              <Divider sx={{ mr: 3 }} />
              <Box
                sx={{
                  // width: "85%",
                  maxHeight: "70vh",
                  pb: 2,
                  overflowY: "auto",

                  mt: -2,
                  pt: 4,
                }}
              >
                <SearchList searchResults={searchResults} />
              </Box>
            </>
          )}
          {isLoading && (
            <Box>
              <Divider sx={{ mr: 3 }} />
              <CircularProgress sx={{ display: "block", m: "10px auto", width: "70px" }} />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Search;
