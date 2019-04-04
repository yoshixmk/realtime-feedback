import React from 'react';
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Api from "./config/Api";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const superagent = require('superagent')

type Props = {
  classes,
}

type State = {
  messages: string[],
  nowMessage: string,
}

export class MessageBoard extends React.Component<Props, State> {
  private intervalSetting?: any
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      nowMessage: "",
    }
  }

  componentDidMount(): void {
    this.intervalSetting = setInterval(this.refresh, 1000)
  }

  componentWillUnmount(): void {
    clearInterval(this.intervalSetting)
  }

  refresh = () => {
    superagent
      .get(Api.BASE_URL + "message/")
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }
        this.setState({messages: res.body})
      })
  }

  getMessageComponent = () => {
    return this.state.messages
      .reverse()
      .map((v, i) => {
        return (
          <ListItem key={i}>
          <Typography>{v}</Typography>
        </ListItem>)
    })
  }

  onSend = () => {
    superagent
      .post(Api.BASE_URL + "message/post/")
      .send({message: this.state.nowMessage})
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }
        console.log(res)
        this.setState({messages: res.body})
      })
  }

  handleChange = (event) => {
    this.setState({ nowMessage: event.target.value })
  }

  render() {
    return (
      <>
        <TextField fullWidth
                   label={"ここにメッセージを入力"}
                   autoFocus
                   onChange={this.handleChange}
        />
        <Button onClick={this.onSend}
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                size="medium">送信</Button>
        {this.getMessageComponent()}
      </>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: "100px",
  },
  input: {
    display: 'none',
  },
  buttons: {
    width: "800px",
  }
});

export default withStyles(styles)(MessageBoard)
