import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";

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

function SubmittedAssignments() {
  const [expanded, setExpanded] = React.useState();
  const [userDetails, setUserDetails] = useState();
  const [submittedAssignments, setSubmittedAssignments] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const APIURL = "http://192.168.1.7:9092/sumbitAssignment/student";
  const GetSubmittedAssignmentDetails = (email) => {
    axios
      .get(APIURL + `/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setSubmittedAssignments(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    GetSubmittedAssignmentDetails(userDetails?.email);
    setUserDetails(userDetails);
  }, []);

  return (
    <div>
      <Typography variant="h3" align="center">
        Submitted Assignment
      </Typography>
      <div>
        {submittedAssignments?.map((item, index) => {
          return (
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              style={{marginBottom:"10px"}}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>AssignmentID : {item?.assignmentId}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{display: "block"}}>
                <div>
                  <Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${item?.description}`,
                      }}
                    />
                  </Typography>
                </div>
                <div>
                  {item?.attachments?.map((pic, i) => {
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
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

export default SubmittedAssignments;
