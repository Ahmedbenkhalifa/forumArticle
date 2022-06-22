import React from "react";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchList = ({ searchResults }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/article?id=${id}`);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {searchResults.map((post, key) => (
        <Box
          key={key}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            mb: 2,
            p: 0.5,
            cursor: "pointer",
            "&:hover": {
              color: "#76A6F1",
              textDecoration: "underline",
            },
          }}
        >
          <SearchIcon fontSize="small" sx={{ m: "2px 10px 0 13px" }} />
          <Typography
            component={Box}
            onClick={() => handleClick(post._id)}
            sx={{
              fontSize: "15px",
            }}
            variant="body2"
          >
            {post.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SearchList;
