import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper,Link,Card } from "@material-ui/core";
import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";

const useStyles = makeStyles((theme) =>
createStyles({
  paper: {
    width: "80vw",
    height: "80vh",
    maxWidth: "500px",
    maxHeight: "700px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative"
  },
  paper2: {
    width: "80vw",
    maxWidth: "500px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative"
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  messagesBody: {
    width: "calc( 100% - 20px )",
    margin: 10,
    overflowY: "scroll",
    height: "calc( 100% - 80px )"
  }
})
);
const ChatHome = () => {
    const classes = useStyles();
    return (
        <div className="chat-home">
            <div className="chat-list">
        
                <div className="people-list">
                        <ul>
                            <Link to="/chats">
                            <li>Shiva</li>
                            </Link>
                            <Link to="/chats">
                            <Card variant="outlined">Shreeya</Card>
                            </Link>
                            <Link to="/chats">
                            <li>Harshi</li>
                            </Link>
                            <Link to="/chats">
                            <li>Deep</li>
                            </Link>
                        </ul>
                </div>
            </div>
            <div className="chat-input">
                <div className={classes.container}>
                <Paper className={classes.paper} zDepth={2}>
                    <Paper id="style-1" className={classes.messagesBody}>
                    <MessageLeft
                        message="hey,i want to talk to you"
                        photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
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
                        photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                        displayName="harshi"
                        avatarDisp={true}
                    />
                    <MessageRight
                        message="heyyyy! I want to talk to you" 
                        photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
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
}


export default ChatHome;