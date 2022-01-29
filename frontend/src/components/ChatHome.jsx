import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Link, Card } from "@material-ui/core";
import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "200%",
      height: "200%",
      // maxWidth: "500px",
      // maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    //   paper2: {
    //     width: "100%",
    //     maxWidth: "500px",
    //     display: "flex",
    //     alignItems: "center",
    //     flexDirection: "column",
    //     position: "relative"
    //   },
    container: {
      width: "500%",
      height: "700%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
    },
  })
);
const ChatHome = () => {
  const classes = useStyles();
  return (
    <div className="chat-home">
      <div className="people-list">
        <ul>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Add Trader
          </Button>
          <Link to="/chats">
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Typography variant="body2">Shiva</Typography>
              </CardContent>
            </Card>
          </Link>
          <Link to="/chats">
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Typography variant="body2">Shreeya</Typography>
              </CardContent>
            </Card>
          </Link>
          <Link to="/chats">
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Typography variant="body2">Deep</Typography>
              </CardContent>
            </Card>
          </Link>
          <Link to="/chats">
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Typography variant="body2">Harshi</Typography>
              </CardContent>
            </Card>
          </Link>
        </ul>
      </div>

      <div className="chat-input">
        <div className={classes.container}>
          <Paper className={classes.paper} zDepth={2}>
            <Paper id="style-1" className={classes.messagesBody}>
              <MessageLeft
                message="hey,i want to talk to you"
                displayName="Deep"
                avatarDisp={true}
              />
              <MessageLeft
                message="hey,i want to talk to you"
                photoURL=""
                displayName="Deep"
                avatarDisp={false}
              />
              <MessageRight
                message="heyyyy!"
                displayName="harshi"
                avatarDisp={true}
              />
              <MessageRight
                message="heyyyy! I want to talk to you"
                displayName="shreeya"
                avatarDisp={false}
              />
            </Paper>
            <TextInput />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
