import React from 'react';
import Chart from "react-google-charts";
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Api from "./config/Api";

const superagent = require('superagent')

type Props = {
  classes,
}

type State = {
  pollArray: number[],
}

export class App extends React.Component<Props, State> {
  private intervalSetting?: any
  constructor(props) {
    super(props);
    this.state = {
      pollArray: [1,0,0,0,0],
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
      .get(Api.BASE_URL)
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }
        this.setState({pollArray: res.body})
      })
  }

  createButtons = () => {
    return this.state.pollArray.map((v, i) =>
      <Button onClick={() => this.setPollUp(i)}
              key={i}
              variant="contained"
              color="primary"
              className={this.props.classes.button}
              size="medium">{i + 1}</Button>
    )
  }

  setPollUp = (i) => {
    superagent
      .post(Api.BASE_URL + 'poll/')
      .send({
        addIndex: i,
      })
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }
        this.setState({pollArray: res.body})
      })
  }

  reset = () => {
    superagent
      .get(Api.BASE_URL + 'reset/')
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }
        this.setState({pollArray: res.body})
      })
  }

  render() {
    return (
      <>
        <Chart
            width={'800px'}
            height={'500px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Index', 'Poll per All Members'],
              ['1', this.state.pollArray[0]],
              ['2', this.state.pollArray[1]],
              ['3', this.state.pollArray[2]],
              ['4', this.state.pollArray[3]],
              ['5', this.state.pollArray[4]],
            ]}
            options={{
              title: 'Realtime Feedback & Questionnaire',
            }}
            rootProps={{ 'data-id': '1' }}
        />
        <div className={this.props.classes.buttons}>
          {this.createButtons()}
        </div>
        <Button onClick={() => this.reset()}
                variant="outlined"
                color="secondary"
                className={this.props.classes.button}
                size="medium">reset</Button>
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

export default withStyles(styles)(App)
