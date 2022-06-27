import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import TagsInput from "./TagsInput";
import EditorHtml from "./EditorHtml";
import MuiAlert from "@mui/material/Alert";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState();
  const getArticleById = async () => {
    try {
      const { data } = await axios.get(`/api/article/getArticleById/${id}`);
      setArticle(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticleById();
  }, []);
  return <>{article?.title && <EditForm article={article} />}</>;
};

const EditForm = ({ article }) => {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [value, setValue] = useState(article?.content);
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [chipData, setChipData] = useState(article?.tags);
  const levels = ["Debutant", "Moyen", "Avancé", "Expert"];
  const types = ["Code", "Astuce", "Nouveauté"];
  const impacts = ["Windev", "Webdev", "Windev Mobile"];
  const [open, setOpen] = React.useState(false);
  const handleFile = (event) => {
    setFile(event.currentTarget.files[0]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChangeFile = () => {
    setDisabled(!disabled);
  };
  const updateArticle = async (formData) => {
    try {
      const { data } = await axios.put(`/api/article/updateArticle/${article._id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data._id;
    } catch (error) {
      console.log(error);
    }
  };
  const addFileToPost = async (id, fileUpload) => {
    try {
      await axios.put(
        `/api/article/uploadFile/${id}`,
        { file: fileUpload },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: article?.title,
      summary: article?.summary,
      impact: article?.impact,
      type: article?.type,
      level: article?.level,
      note: article?.note,
      active: article?.active,
    },
    onSubmit: async (values, { resetForm }) => {
      const id = await updateArticle({ ...values, tags: chipData, content: value });
      if (file && !disabled) {
        await addFileToPost(id, file);
      }
      handleOpen();
    },
  });
  return (
    <Container maxWidth="lg">
      <TagsInput input={input} setInput={setInput} chipData={chipData} setChipData={setChipData} />
      <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
        <TextField
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
          autoComplete="off"
          name="title"
          variant="filled"
          fullWidth
          id="title"
          label="title"
          color="primary"
          margin="normal"
        />
        <TextField
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.summary}
          autoComplete="off"
          name="summary"
          variant="filled"
          fullWidth
          id="summary"
          label="summary"
          color="primary"
          margin="normal"
          multiline
          minRows={2}
        />
        <Box sx={{ mt: 2 }} data-color-mode="light">
          <EditorHtml value={value} setValue={setValue} htmlContent={article?.content} />
        </Box>
        <TextField
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.impact}
          id="impact"
          name="impact"
          select
          label="impact"
          fullWidth
          autoComplete="off"
          variant="filled"
          margin="normal"
          color="primary"
        >
          {impacts.map((option, key) => (
            <MenuItem key={key} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.type}
          id="type"
          name="type"
          select
          label="Type"
          fullWidth
          autoComplete="off"
          variant="filled"
          margin="normal"
          color="primary"
        >
          {types.map((option, key) => (
            <MenuItem key={key} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.level}
          id="level"
          name="level"
          select
          label="Niveau"
          fullWidth
          autoComplete="off"
          variant="filled"
          margin="normal"
          color="primary"
        >
          {levels.map((option, key) => (
            <MenuItem key={key} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.note}
          autoComplete="off"
          name="note"
          variant="filled"
          fullWidth
          id="note"
          label="Note"
          color="primary"
          margin="normal"
          multiline
          minRows={3}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="active"
              checked={formik.values.active}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label="Active"
        />
        <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
          {article?.file && (
            <Button
              variant="outlined"
              component={"a"}
              href={`http://localhost:8080/api/article/downloadPost/${article._id}`}
              download
              startIcon={<AttachFileIcon />}
            >
              telecharger fichier
            </Button>
          )}
          <Button variant="outlined" color="success" onClick={handleChangeFile}>
            Modifier fichier
          </Button>
          {!disabled && (
            <Input
              ref={ref}
              name="file"
              id="contained-button-file"
              type="file"
              onChange={(e) => handleFile(e)}
            />
          )}
        </Box>
        <Button type="submit" variant="outlined" color="primary" sx={{ my: 2 }}>
          Enregistrer la modification
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          l'article a été modifié avec succès.
        </Alert>
      </Snackbar>
    </Container>
  );
};
const Input = styled("input")(({ theme }) => ({
  marginTop: "10px",
  fontSize: "15px",
  background: "white",
  borderRadius: "50px",
  boxShadow: "5px 5px 10px black",
  width: "270px",
  outline: "none",
  "&::-webkit-file-upload-button": {
    color: "white",
    background: theme.palette.primary.main,
    padding: "10px",
    border: "none",
    borderRadius: "50px",
    outline: "none",
  },
}));
export default EditArticle;
