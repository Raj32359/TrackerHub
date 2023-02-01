import { AccordionActions, Button, Divider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
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

function PreviousAssignments() {
  const [expanded, setExpanded] = React.useState("");
  const [prevAssignments, setPrevAssignments] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const APIURL = "http://192.168.1.7:9092/assignment";
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

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    GetPrevAssignmentDetails(userDetails.email);
  }, []);

  return (
    <div>
      <Typography variant="h3" align="center">
        Previous Assignment
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
             {item?.attachements.map((ping, index) => {
               return (
                <Button size="small" color="primary" onClick={()=>{
                  window.open(ping)
                }}>
                {ping.includes("jpg" || "png")? (
                  <img src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png" height="30px" alt="IMAGE" />
                ):(ping.includes("pdf")? (
                  <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" height="30px" alt="PDF" />
                ):(null))}
              </Button>
               )
             })}
              
            </AccordionActions>
          </Accordion>
        );
      })}
    </div>
  );
}

export default PreviousAssignments;
