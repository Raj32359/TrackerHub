import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid, Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: "100%",
    height: "200px",
  },
  button: {
    margin: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  banner: {
    backgroundImage: `url(${"/path/to/image"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "500px",
    width: "100%",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Landing() {
  const classes = useStyles();
  let navigate = useNavigate();

  return (
    <div className={classes.root}>
      {/* <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            College Name
          </Typography>
          <Button color="inherit" onClick={() => navigate("/about")}>About</Button>
          <Button color="inherit" onClick={() => navigate("/academics")}>Academics</Button>
          <Button color="inherit" onClick={() => navigate("/admissions")}>Admissions</Button>
          <Button color="inherit" onClick={() => navigate("/campuslife")}>Campus Life</Button>
          <Button color="inherit" onClick={() => navigate("/contact")}>Contact</Button>
        </Toolbar>
      </AppBar> */}
      <div className={classes.banner}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={12}>
            <img
              className={classes.logo}
              src={"https://picsum.photos/id/900/1000"}
              alt="college logo"
            />
            <Typography
              variant="h3"
              style={{ color: "white", marginTop: "20px" }}
            >
              Welcome to our College
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Link to="/about" className={classes.link}>
                Learn More
              </Link>
            </Button>
          </Grid>
        </Box>
      </div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" style={{ color: "black" }}>
              Academics
            </Typography>
            <Typography variant="body1">
              Our college offers a wide range of academic programs, including
              engineering, business, and liberal arts.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Link to="/academics" className={classes.link}>
                Explore Programs
              </Link>
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" style={{ color: "black" }}>
              Admissions
            </Typography>
            <Typography variant="body1">
              Our admissions team is here to help you navigate the application
              process and answer any questions you may have.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Link to="/admissions" className={classes.link}>
                Apply Now
              </Link>
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" style={{ color: "black" }}>
              Campus Life
            </Typography>
            <Typography variant="body1">
              Our campus offers a variety of activities and organizations to get
              involved in, as well as state-of-the-art facilities.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Link to="/campuslife" className={classes.link}>
                Discover Campus
              </Link>
            </Button>
          </Grid>
        </Grid>
      </div>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            College Name
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Address Line 1<br />
            Address Line 2<br />
            City, State Zipcode
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Phone: 555-555-5555
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            <Link color="inherit" href="mailto:info@collegename.edu">
              info@collegename.edu
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Copyright © {new Date().getFullYear()} College Name
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
