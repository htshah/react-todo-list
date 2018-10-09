import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";

const style = {
    dateItem: {
        position: "relative",
        padding: "10px 15px",
        textAlign: "center",
        cursor: "pointer",
        '&:first-child': {
            paddingLeft: "0",
            '&:after':{
                left: "calc(50% - 13px) !important",
            }
        },
        '&:last-child': {
            paddingRight: "15px",
        },
        '&:after':{
            position    : "absolute",
            content     : "no-close-quote",
            left        : "calc(50% - 5px)",
            width       : "6px",
            bottom      : "0",
            height      : "6px",
            border      : "2px solid transparent",
            borderRadius: "50%",
        },
        '&.active:after':{
            borderColor      : "#2196f3",
            background       : "#2196f3",
            // boxShadow        : "0 1px 7px 2px rgba(152, 152, 152, 0.21)",
        }
    }
}

class DayComponent extends Component {

    shouldComponentUpdate = ({current,target}) =>{
        const {current: oldCurrent,target: oldTarget} = this.props;
        return (
            oldCurrent.getFullYear() !== target.getFullYear() ||
            current.toDateString() === target.toDateString() ||
            oldCurrent.toDateString() === oldTarget.toDateString()
        );
    }
    
    handleClick = () =>
        this.props.onDateSelect(this.props.current)

    render() {
        const days = ["S", "M", "T", "W", "T", "F", "S"];
        const {current,target} = this.props;
        const isTarget = current.toDateString() === target.toDateString();
        const date = current.getDate();
        return (
            // { ...(this.props.dateRef && { ref: this.props.dateRef }) }
            <div className={
                `date-timeline-item ${this.props.classes.dateItem} ${isTarget?"active":""}`}
                onClick={this.handleClick}
                >
                <Typography variant="body1" color="textSecondary">
                    {days[current.getDay()]}
                </Typography>
                <Typography variant="body1">
                    {`${date<10?"0":""}${date}`}
                </Typography>
            </div>
        );
    }
}

export default withStyles(style)(DayComponent);