import {
  Backdrop,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Courses.css";
import CommentSystem from "../Comment/CommentSystem";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "7px",
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

const CourseDetails = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [courseDetails, setCourseDetails] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { id } = useParams();

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

  const APIURL = "http://192.168.1.7:9092/course/" + id;
  useEffect(() => {
    axios
      .get(APIURL)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCourseDetails(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = (val) => {
    setOpen(val);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Typography variant="h3" align="center">
        CourseDetails
      </Typography>
      <Container>
        <Grid
          Container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={12} lg={12} style={{ display: "flex" }}>
            <Grid item sm={3} md={3} lg={3}>
              <Typography variant="h6">
                Course Name :{" "}
                <span className="courseDetailsInfo">
                  {courseDetails?.courseName}
                </span>
              </Typography>
            </Grid>

            <Grid item sm={3} md={3} lg={3}>
              <Typography variant="h6">
                Course Duration :{" "}
                <span className="courseDetailsInfo">
                  {courseDetails?.courseDuration}
                </span>
              </Typography>
            </Grid>

            <Grid item sm={3} md={3} lg={3}>
              <Typography variant="h6">
                Professor :{" "}
                <span className="courseDetailsInfo">
                  {courseDetails?.professorName}
                </span>
              </Typography>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <Button
                className="follow_btn"
                onClick={() => {
                  handleOpen(true);
                }}
              >
                Follow
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          style={{ marginTop: "15px" }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${courseDetails?.courseContent}`,
                }}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
        
      </Container>
      <CommentSystem />
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
          <div className={classes.paper}>
            <Typography id="transition-modal-title"  align="center" variant="h5">
              Please Enter Activate Key
            </Typography>
            <Grid
              container
              className="CreateCourse_GridContainer"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item spacing={4}>
                  <Button
                    className="follow_btn"
                    style={{ height: "55px", padding: "0px 20px" }}
                  >
                    Send Request
                  </Button>
                </Grid>
              </Grid>
              <div className="cusom_Divider"></div>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item spacing={4}>
                  <TextField
                    variant="outlined"
                    placeholder="Acivate key"
                  ></TextField>
                </Grid>
                <Grid item spacing={4}>
                  <Button
                    className="follow_btn"
                    style={{ height: "55px", padding: "0px 20px" }}
                  >
                    Activate
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CourseDetails;
