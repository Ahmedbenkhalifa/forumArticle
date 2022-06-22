import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import TagsInput from "../components/TagsInput";
import EditorHtml from "../components/EditorHtml";

const AddArticle = () => {
  const ref = useRef();
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [chipData, setChipData] = useState([]);
  const levels = ["Debutant", "Moyen", "Avancé", "Expert"];
  const types = ["Code", "Astuce", "Nouveauté"];
  const impacts = ["Windev", "Webdev", "Windev Mobile"];
  const addPost = async (formData) => {
    try {
      const { data } = await axios.post("/api/article/addPost", formData, {
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
      const { data } = await axios.put(
        `/api/article/uploadFile/${id}`,
        { file: fileUpload },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFile = (event) => {
    setFile(event.currentTarget.files[0]);
  };
  const resetFile = () => {
    ref.current.value = "";
    setFile(null);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      impact: "",
      type: "",
      level: "",
      note: "",
      active: false,
    },
    onSubmit: async (values, { resetForm }) => {
      const id = await addPost({ ...values, tags: chipData, content: value });
      if (file) {
        await addFileToPost(id, file);
      }
      setValue("");
      resetForm();
      resetFile();
      setChipData([]);
      // console.log(values)
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
        />
        <Box sx={{ mt: 2 }} data-color-mode="light">
          <EditorHtml value={value} setValue={setValue} />
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
        <Box>
          <FormControlLabel
            sx={{ mr: 5 }}
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
          <Input
            ref={ref}
            // onChange={(event) => {
            //   formik.setFieldValue("file", event.currentTarget.files[0]);
            // }}
            // multiple
            name="file"
            id="contained-button-file"
            type="file"
            onChange={(e) => handleFile(e)}
          />
        </Box>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={{ my: 2 }}
          startIcon={<SendIcon />}
        >
          Enregistrer
        </Button>
      </form>
    </Container>
  );
};
const Input = styled("input")(({ theme }) => ({
  margin: "5px auto 0",
  display: "inline-block",
  fontSize: "16px",
  background: "white",
  borderRadius: "50px",
  boxShadow: "5px 5px 10px black",
  width: "320px",
  outline: "none",
  "&::-webkit-file-upload-button": {
    color: "white",
    background: theme.palette.primary.main,
    padding: "15px",
    border: "none",
    borderRadius: "50px",
    outline: "none",
  },
}));

export default AddArticle;
