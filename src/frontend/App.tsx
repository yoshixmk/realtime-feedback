import React from 'react';
import Chart from "react-google-charts";
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

type Props = {
  classes,
}

type State = {
  pollArray: number[],
}

export class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pollArray: [1,0,0,0,0],
    }
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
    this.state.pollArray[i] += 1
    this.setState({pollArray: this.state.pollArray})
  }

  reset = () => {
    this.setState({
      pollArray: [1,0,0,0,0],
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
