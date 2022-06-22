import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import wm from "../../assets/images/wm.gif";
import wb from "../../assets/images/wb.gif";
import wd from "../../assets/images/wd.gif";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";

const Article = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("id");
  const [article, setArticle] = useState();
  const getArticleById = async () => {
    try {
      const { data } = await axios.get(`/api/article/getArticleById/${searchTerm}`);
      setArticle(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticleById();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "500" }}>
          {article?.title}
        </Typography>
        <Options impact={article?.impact} attachmentFile={article?.file} />
        <div dangerouslySetInnerHTML={{ __html: article?.content }} />
        {article?.file && (
          <Box
            component="a"
            sx={{
              border: "1px solid",
              padding: "7px",
              borderRadius: "12px",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              width: "150px",
              color: "white",
              background: "black",
            }}
            href={`http://localhost:8080/api/article/downloadPost/${article._id}`}
            download
          >
            <DownloadIcon />
            telecharger
          </Box>
        )}
      </Paper>
    </Container>
  );
};

const Options = ({ impact, attachmentFile }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <img
          alt="windev"
          src={wd}
          width="40px"
          style={{ filter: impact === "Windev" ? "" : "grayscale(100%)" }}
        />
        <img
          alt="windevMobile"
          src={wm}
          width="40px"
          style={{ filter: impact === "Webdev" ? "" : "grayscale(100%)" }}
        />
        <img
          alt="webdev"
          src={wb}
          width="40px"
          style={{ filter: impact === "Windev Mobile" ? "" : "grayscale(100%)" }}
        />
      </Box>
      {attachmentFile && <AttachFileIcon fontSize="large" />}
    </Box>
  );
};
export default Article;
