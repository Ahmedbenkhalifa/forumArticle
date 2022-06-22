import React from "react";
import { Box,Chip, Paper, TextField } from "@mui/material";

const TagsInput = ({ input, setInput, chipData, setChipData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      setChipData([...chipData, input]);
      setInput("");
    }
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };
  return (
    <Box
      id="form2"
      component={"form"}
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleSubmit}
        value={input}
        autoComplete="off"
        name="tags"
        variant="filled"
        fullWidth
        id="tags"
        label="Tags"
        color="primary"
        // margin="normal"
      />
      <Paper
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          p: 0.5,
          m: 0,
          backgroundColor: "#E8E8E8",
          flexWrap: "wrap",
        }}
        component="ul"
      >
        {chipData.map((data, key) => (
          <Chip
            sx={{ backgroundColor: "#fff", mr: 0.5 }}
            key={key}
            label={data}
            onDelete={handleDelete(data)}
          />
        ))}
      </Paper>
    </Box>
  );
};

export default TagsInput;
