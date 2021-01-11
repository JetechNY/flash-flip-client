import React from "react";
import { Button } from "semantic-ui-react";

class Timer extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
  };

  startTimer = () => {
    if (!this.state.timerOn) {
      this.setState({
        timerOn: true,
        timerTime: 0,
        timerStart: Date.now() - this.state.timerTime,
      });
      this.timer = setInterval(() => {
        this.setState({
          timerTime: Date.now() - this.state.timerStart,
        });
      }, 10);
    }
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    });
    clearInterval(this.timer);
  };

  render() {
    const { timerTime } = this.state;
    // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2)
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    // let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2)

    return (
      <div className="timer-component">
        <h3 className="timer-component-header">Timer</h3>
        <div className="timer-component-display">
          {minutes} : {seconds}
        </div>
        {/* {this.state.timerOn === false && this.state.timerTime === 0 && (<Button onClick={this.startTimer}>Start</Button>)}
            {this.state.timerOn === true && (<Button id="timer-stop-button" onClick={this.stopTimer}>Stop</Button>)}
            {this.state.timerOn === false && this.state.timerTime > 0 && (<Button onClick={this.startTimer}>Resume</Button>)}
            {this.state.timerOn === false && this.state.timerTime > 0 && (<Button id="timer-reset-button" onClick={this.resetTimer}>Reset</Button>)} */}
        {<Button onClick={this.startTimer}>Start</Button>}
        {
          <Button id="timer-stop-button" onClick={this.stopTimer}>
            Stop
          </Button>
        }
        {
          <Button id="timer-reset-button" onClick={this.resetTimer}>
            Reset
          </Button>
        }
      </div>
    );
  }
}

export default Timer;
