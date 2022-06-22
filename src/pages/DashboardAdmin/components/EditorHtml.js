import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, EditorState } from "draft-js";
import { Container } from "@mui/material";
import { convertToRaw } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const EditorHtml = ({ htmlContent, value, setValue }) => {
  const contentBlock = htmlToDraft(htmlContent ? htmlContent : "");
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const [editorState, setEditorState] = useState(
    htmlContent ? EditorState.createWithContent(contentState) : EditorState.createEmpty()
  );

  return (
    <Container maxWidth="lg" sx={{ borderRadius: "4px", border: "2px solid #E8E8E8" }}>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder="commencer à ecrire...."
        onEditorStateChange={setEditorState}
        blockStyleFn={myBlockStyleFn}
        onBlur={(event, editorState) => {
          setValue(draftjsToHtml(convertToRaw(editorState.getCurrentContent())));
        }}
      />
    </Container>
  );
};

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'superFancyBlockquote';
  }
}

export default EditorHtml;
