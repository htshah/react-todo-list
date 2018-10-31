import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withStyles, Typography } from '@material-ui/core';
import MonthComponent from './MonthComponent';

import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';

const style = {
  dateScrollContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 'calc(100vw - 30px)',
    padding: '0px 15px !important',
    overflowX: 'scroll',
    flexWrap: 'nowrap',
    '-webkit-overflow-scrolling': 'touch', //For iOS smooth scrolling
  },
  dateInput: {
    position: 'absolute',
    left: '-100%',
  },
  datePicker: {
    display: 'none',
  },
  yearTitle: {
    padding: '0 15px',
  },
};

class DateTimeline extends Component {
  constructor(props) {
    super(props);

    const { classes } = props;
    this.classes = classes;
    this.state = {
      date: typeof props.date === 'undefined' ? new Date() : props.date,
    };

    this.isMobile = typeof window.orientation !== 'undefined';

    this.dateFieldRef = React.createRef();
  }

  handleDateSelect = date => {
    console.log(date);
    this.setState({
      date: date,
    });
  };

  componentDidMount() {
    this.scrollDateIntoView();
  }

  scrollDateIntoView = () => {
    const container = document.querySelector('.date-timeline-container');
    const node = ReactDOM.findDOMNode(this.currentDateRef.current);

    container.scrollTo(node.offsetLeft, 0);
  };

  handleDateInput = e => {
    let date = e;
    if (!(e instanceof Date)) {
      const [year, month, day] = e.target.value.split('-');
      date = new Date(year, month, day);
    }
    this.setState({
      date: date,
    });

    this.dateUpdated = true;
  };

  handleCalendarClick = e => {
    if (this.isMobile) {
      this.dateFieldRef.current.focus();
    } else {
      this.picker.open(e);
    }
  };

  componentDidUpdate() {
    if (this.dateUpdated) {
      this.dateUpdated = false;
      this.scrollDateIntoView();
    }
  }

  renderDefaultDateInput(val) {
    return (
      <input
        type="date"
        className={this.props.classes.dateInput + ' date-timeline-input'}
        value={val}
        ref={this.dateFieldRef}
        onChange={e => this.handleDateInput(e)}
      />
    );
  }

  renderDatePicker(val) {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={this.props.classes.datePicker + ' picker'}>
          <InlineDatePicker
            label="Date"
            className="date-timeline-input"
            ref={node => {
              this.picker = node;
            }}
            value={val}
            onChange={this.handleDateInput}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }

  renderMonth() {
    let months = [];
    const { date } = this.state;
    this.currentDateRef = null;
    this.currentDateRef = React.createRef();
    for (let i = 0; i < 12; i++) {
      let currMonth = new Date(date.getFullYear(), i, 1);
      const isTarget = currMonth.getMonth() === date.getMonth();

      months.push(
        <MonthComponent
          key={i}
          {...isTarget && { dateRef: this.currentDateRef }}
          current={currMonth}
          target={date}
          onDateSelect={this.handleDateSelect}
        />
      );
    }

    return <Fragment>{months}</Fragment>;
  }
  render() {
    const { date } = this.state;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${date.getFullYear()}-${
      month < 10 ? '0' : ''
    }${month}-${day < 10 ? '0' : ''}${day}`;
    return (
      <div className="date-timeline">
        {this.isMobile
          ? this.renderDefaultDateInput(dateString)
          : this.renderDatePicker(date.toString())}

        <Typography
          variant="subheading"
          className={this.classes.yearTitle}
          onClick={this.handleCalendarClick}
        >
          {this.state.date.getFullYear()}
        </Typography>
        <div
          className={`date-timeline-container ${
            this.classes.dateScrollContainer
          }`}
        >
          {this.renderMonth()}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(DateTimeline);
