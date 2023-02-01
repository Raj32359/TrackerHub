import {
  AccordionActions,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import axios from "axios";
import {
  AttachFile,
  FileCopy,
  QuestionAnswer,
  Send,
  Telegram,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Editor } from "@tinymce/tinymce-react";
import { toast, ToastContainer } from "react-toastify";
import "./ViewAssignment.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1000px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

function ViewAssignments() {
  const [expanded, setExpanded] = React.useState("");
  const [prevAssignments, setPrevAssignments] = useState();
  const [msgSection, setMsgSection] = useState();
  const [userDetails, setUserDetails] = useState();
  const [currentAssignmentId, setCurrentAssignmentId] = useState();

  const editorRef = useRef(null);
  var real = "";
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
    attachments: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [description, setDescription] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const [apiResponse, setApiResponse] = useState();
  const [messagesList, setMessagesList] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const APIURL = "http://192.168.1.7:9092/assignment/student";
  const GetPrevAssignmentDetails = (email) => {
    axios
      .get(APIURL + `/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setPrevAssignments(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const APIURL3 = "http://192.168.1.7:9092/sumbitAssignment";
  const GetSubmittedAssignments = (assigmentId) => {
    axios
      .get(APIURL3 + `/${assigmentId}/${userDetails?.email}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setApiResponse(response)
        }
      })
      .catch((error) => {
        console.log(error.response);
        setApiResponse(error.response);
      });
  };

  const APIURL4 = "http://192.168.1.7:9092/message";
  const GetAllMessages = (assigmentId) => {
    axios
      .get(APIURL4 + `/${assigmentId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setMessagesList(response.data);
        }
      })
      .catch((error) => {
        console.log(" Messages :: " + error.response.data);
      });
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    GetPrevAssignmentDetails(userDetails.email);
    setUserDetails(userDetails);
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmitAssignment = (assigmentId) => {
    setOpen(true);
    setMsgSection("submitAssignment");
    GetSubmittedAssignments(assigmentId);
  };

  const handleComment = (assigmentId) => {
    setOpen(true);
    setMsgSection("comment");
    GetAllMessages(assigmentId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      console.log("files Slected :: " + e.target.files.length);
    }
  };

  const APIURL2 = "http://192.168.1.7:9092/sumbitAssignment/";

  const submitApiAssignment = (e, assigmentId) => {
    e.preventDefault();
    const data = {
      assignmentId: assigmentId,
      description: description,
      messagedBy: userDetails?.email,
    };
    const formData = new FormData();
    formData.append("assignment", JSON.stringify(data));
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    console.log("Files Selected :: " + selectedFiles);
    axios({
      method: "post",
      url: APIURL2,
      data: formData,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          notify(response.data);
          setFormValues({
            description: "",
            attachments: "",
          });
          setSelectedFiles({});
          editorRef.current.setContent("");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
        setFormValues({
          description: "",
          attachments: "",
        });
        setSelectedFiles({});
        editorRef.current.setContent("");
      });
  };

  const APIURL5 = "http://192.168.1.7:9092/message/";

  const submitComment = (e) => {
    e.preventDefault();
    const data = {
      assignmentId: currentAssignmentId,
      description: description,
      messagedBy: userDetails?.email,
    };
    const formData = new FormData();
    formData.append("message", JSON.stringify(data));
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    console.log("Files Selected :: " + selectedFiles);
    axios({
      method: "post",
      url: APIURL5,
      data: formData,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          notify(response.data);
          setFormValues({
            description: "",
            attachments: "",
          });
          setSelectedFiles({});
          editorRef.current.setContent("");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
        setFormValues({
          description: "",
          attachments: "",
        });
        setSelectedFiles({});
        editorRef.current.setContent("");
      });
  };

  return (
    <div>
      <Typography variant="h3" align="center">
        Assignments
      </Typography>
      {prevAssignments?.map((item, index) => {
        return (
          <Accordion
            square
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>
                Assignment : <b>{item?.assigmentId}</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${item?.description}`,
                  }}
                />
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button
                variant="contained"
                color="default"
                onClick={(e) => {
                  handleSubmitAssignment(item?.assigmentId);
                  setCurrentAssignmentId(item?.assigmentId);
                }}
              >
                submit Assigment &nbsp; <Telegram />{" "}
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={(e) => {
                  handleComment(item?.assigmentId);
                  setCurrentAssignmentId(item?.assigmentId);
                }}
              >
                Comments &nbsp; <QuestionAnswer />{" "}
              </Button>
              {item?.attachements.map((ping, index) => {
                return (
                  <>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        window.open(ping);
                      }}
                    >
                      {ping.includes("jpg" || "png") ? (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
                          height="30px"
                          alt="IMAGE"
                        />
                      ) : ping.includes("pdf") ? (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                          height="30px"
                          alt="PDF"
                        />
                      ) : null}
                    </Button>
                  </>
                );
              })}
            </AccordionActions>
          </Accordion>
        );
      })}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {msgSection === "submitAssignment" ? (
            <div className={`${classes.paper} model_Controller`}>
              {apiResponse?.status === 400 ? (
                <>
                  <h2 id="transition-modal-title">Submit Assignment</h2>
                  <div id="transition-modal-description">
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      sm={12}
                      alignItems="center"
                    >
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
                          height: 300,
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
                    </Grid>
                    <div>
                      <label htmlFor="">Attach</label>{" "}
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input
                          hidden
                          accept="*"
                          type="file"
                          id="attachments"
                          name="attachments"
                          value={formValues.attachments}
                          multiple
                          onChange={(e) => {
                            log();
                            handleChanges(e);
                          }}
                        />
                        <AttachFile />
                      </IconButton>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="default"
                        onClick={(e) => {
                          submitApiAssignment(e, currentAssignmentId);
                        }}
                      >
                        {" "}
                        <Send />{" "}
                      </Button>
                    </div>
                  </div>
                </>
              ) : apiResponse?.status === 200 ? (
                <div style={{display:"flex", alignItems:"center", height: "600px"}}>
                <Typography variant="h5" >
                  You already Submitted the task{" "}
                </Typography>
                </div>
              ) : null}
            </div>
          ) : msgSection === "comment" ? (
            <div className={`${classes.paper} model_Controller`}>
              <h2 id="transition-modal-title">Comments</h2>
              <div id="transition-modal-description">
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
                      height: 300,
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
                </Grid>
                <div>
                  <label htmlFor=""> Attach</label>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="*"
                      type="file"
                      id="attachments"
                      name="attachments"
                      value={formValues.attachments}
                      multiple
                      onChange={(e) => {
                        log();
                        handleChanges(e);
                      }}
                    />
                    <AttachFile />
                  </IconButton>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={(e) => {
                      submitComment(e);
                    }}
                  >
                    {" "}
                    <Send />{" "}
                  </Button>
                </div>
              </div>
              <div className="comment_Collection_MainController">
                <Grid container spacing={3} className="grid_loop_Controll">
                  {messagesList?.map((msg, index) => {
                    return (
                      <Grid item xs={12}>
                        <Paper className={classes.paper}>
                          <h5>
                            {msg?.messagedBy} {msg?.messageDate}{" "}
                          </h5>
                          {msg?.attachments?.map((pic, i) => {
                            return (
                              <IconButton
                                key={i}
                                color="default"
                                aria-label="add to shopping cart"
                                onClick={() => {
                                  window.open(pic);
                                }}
                              >
                                <FileCopy />
                              </IconButton>
                            );
                          })}

                          <Typography variant="body1">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: `${msg?.description}`,
                              }}
                            />
                          </Typography>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </div>
          ) : null}
        </Fade>
      </Modal>
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

export default ViewAssignments;
