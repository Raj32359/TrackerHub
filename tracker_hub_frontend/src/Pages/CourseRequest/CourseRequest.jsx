import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    maxHeight:900
  },
});

const CourseRequest = () => {
  const classes = useStyles();
  const [followRequestDetails, setFollowRequestDetails] = useState();

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

  const APIURL = "http://localhost:9092/course/followRequest"
  const getFollowRequestDetails = () => {
    axios
      .get(APIURL)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setFollowRequestDetails(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  }

  useEffect(() => {
    getFollowRequestDetails();
  
  }, [])
  

  return (
    <div>
      <Typography variant="h3" align="center">
        Request Access Control
      </Typography>
      <Grid
        container
        className="CreateCourse_GridContainer"
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item spacing={4}>
          <Chip
            avatar={<Avatar>69</Avatar>}
            label="Request"
            color="secondary"
          /> &nbsp;
          <Chip
            avatar={<Avatar>85</Avatar>}
            label="Accepted"
            color="primary"
          />
          &nbsp;
          <Chip
            avatar={<Avatar>20</Avatar>}
            label="Rejected"
          />
        </Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Request Id</StyledTableCell>
                <StyledTableCell align="right">Course Name</StyledTableCell>
                <StyledTableCell align="right">User Name</StyledTableCell>
                <StyledTableCell align="right">Accept / Reject</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {followRequestDetails?.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {row?.requestId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.courseName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.useremail}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained" color="primary">
                      Accept
                    </Button>{" "}
                    &nbsp; &nbsp;
                    <Button variant="contained" color="secondary">
                      Reject
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default CourseRequest;
