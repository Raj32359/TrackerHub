import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function Courses() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Container >
      <Typography variant="h3" align="center">
        Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://images.news18.com/ibnlive/uploads/2021/08/spotify-1-16302113003x2.jpg"
              title="Live from space album cover"
            />
          </Card>          
        </Grid>
      </Grid>
      </Container>
    </div>
  );
}

export default Courses;
