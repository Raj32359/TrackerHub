import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Assignments = () => {
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

  const initialValues = {
    courseId: "",
    daysCount: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [description, setDescription] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    console.log("real : ", real);
  };

  const APIURL = "http://localhost:9092/course/CourseCollections";

  const GetCourseDetails = () => {
    axios.get(APIURL)
     .then((response) => {
        if (response.status === 200) {
          setCourseDetails(response.data)
          console.log(response.data)

        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
        setFormValues({ courseId: "", daysCount:"", description: "" });
      });      
  };

  useEffect(() => {
    GetCourseDetails();
  }, [])
  return (
    <div>
      <Typography variant="h3" align="center">
        Create Assignment
      </Typography>
      <Grid
          container
          className="CreateCourse_GridContainer"
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <form noValidate autoComplete="off">
            <Grid item xs={12} md={12} lg={12} sm={12} style={{display:"flex"}}>
              <Grid xs={9} md={9} lg={9} sm={9}>
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
                    CourseId{" "}
                  </label>
                  <TextField
                    id="courseId"
                    placeholder="Course Id"
                    variant="outlined"
                    name="courseId"
                    className="input_field"
                    select
                    value={formValues.courseId}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select course"
                    autoComplete="off"
                  >                  
                    <option key="" value=""> -- Select Course -- </option>
                    {courseDetails?.map((item, index)=> {
                      return(
                        <option key={item.courseId} value={item.courseId}> {item.courseId} - {item.courseName} </option>
                      )
                    })}
                    
                    
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                  alignItems="center"
                  className="courseFormInput"
                >
                  <label for="courseDuration" className="courseLabels">
                    {" "}
                    No of Days{" "}
                  </label>
                  <TextField
                    id="No. of Days"
                    placeholder="No. of Days"
                    variant="outlined"
                    name="daysCount"
                    value={formValues.daysCount}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
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
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              <div className="course_submit_button">
                <Button
                  onClick={(e) => {
                    log();
                     handleSubmit(e);
                    
                  }}
                  className="follow_btn "
                >
                  save course
                </Button>
              </div>
            </Grid>
          </form>
        </Grid>
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
}

export default Assignments;
