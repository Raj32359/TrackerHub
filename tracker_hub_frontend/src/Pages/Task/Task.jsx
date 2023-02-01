import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import "./Task.css";

import { Editor } from "@tinymce/tinymce-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Task = () => {
  const initialValues = {
    courseName: "",
    courseDuration: "",
    professorName: "",
    uploadFile: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [description, setDescription] = useState();

  var real = "";
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("description : ", editorRef.current.getContent());
      real = editorRef.current.getContent();
      setDescription(editorRef.current.getContent());
    }
  };

  const notify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const badNotify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    console.log("real : ", real);
  };

  const APIURL = "http://192.168.1.7:9092/course/";

  const addCourse = (e) => {
    e.preventDefault();
    const data = {
      courseName: formValues.courseName,
      courseDuration: formValues.courseDuration,
      professorName: formValues.professorName,
      courseContent: real,
    };

    const APIURL = "http://192.168.1.7:9092/assignment/";
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      console.log(formValues);
    };

    axios
      .post(APIURL, data)
      .then((response) => {
        if (response.status === 201) {
          notify("Added Succussefully");
          setFormValues({
            courseName: "",
            courseDuration: "",
            professorName: "",
            description: "",
            uploadFile: "",
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
        setFormValues({ email: "", password: "", username: "", role: "" });
      });
  };

  return (
    <div>
      <Typography variant="h3" align="center">
        Task
      </Typography>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sm={12}
            justifyContent="center"
            alignItems="center"
            className="courseFormInput"
          >
            <label for="courseName" className="courseLabels">
              {" "}
              Assingment ID{" "}
            </label>
            <TextField
              id="courseName"
              placeholder="Assignment ID"
              variant="outlined"
              name="courseName"
              value={formValues.courseName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sm={12} alignItems="center">
            <label for="description" className="courseLabels">
              {" "}
              Description{" "}
            </label>
            <Editor
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <div className="course_submit_button">
              <Button
                onClick={(e) => {
                  log();
                  // handleSubmit(e);
                  addCourse(e);
                }}
                className="follow_btn "
              >
                save Task
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Task;
