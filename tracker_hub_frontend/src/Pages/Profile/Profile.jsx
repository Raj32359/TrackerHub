import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
  media: {
    height: 140,
  },
});

export default function Profile() {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/200/300"
          title="Profile Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {userDetails?.username}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {userDetails?.role}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Email: {userDetails?.email}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Phone: 555-555-5555
          </Typography>
          {/* <Button variant="contained" color="primary">
            Edit
          </Button> */}
        </CardContent>
      </Card>
    </Container>
  );
}
