import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";



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



const CourseDetails = () =>{
  const [expanded, setExpanded] = React.useState("panel1");
  const [courseDetails, setCourseDetails] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const {id} = useParams();

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

  const APIURL = "http://localhost:9092/course/"+id;
  useEffect(() => {
    axios.get(APIURL)
    .then((response)=> {
      if(response.status === 200){
        console.log(response.data);
        setCourseDetails(response.data)
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      badNotify(error.response.data);
    })
  }, [])
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
                Course Name : <span className="courseDetailsInfo">{courseDetails?.courseName}</span>
              </Typography>
            </Grid>

            <Grid item sm={3} md={3} lg={3}>
              <Typography variant="h6">
                Course Duration : <span className="courseDetailsInfo">{courseDetails?.courseDuration}</span>
              </Typography>
            </Grid>

            <Grid item sm={3} md={3} lg={3}>
              <Typography variant="h6">
                Professor : <span className="courseDetailsInfo">{courseDetails?.professorName}</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <div dangerouslySetInnerHTML={{__html: `${courseDetails?.courseContent}`}} />            
            </Typography>
          </AccordionDetails>
        </Accordion>
       </Container>
    </div>
  );
}

export default CourseDetails;
