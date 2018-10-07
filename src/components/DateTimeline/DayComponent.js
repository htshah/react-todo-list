import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";

const style = {
    dateItem: {
        position: "relative",
        margin: "10px 15px",
        textAlign: "center",
        '&:first-child': {
            marginLeft: "0",
        },
        '&:last-child': {
            marginRight: "30px",
        },
        '&:after':{
            position    : "absolute",
            content     : "no-close-quote",
            left        : "calc(50% - 5px)",
            width       : "6px",
            bottom      : "-9px",
            height      : "6px",
            border      : "2px solid transparent",
            borderRadius: "50%",
        },
        '&.active:after,&:hover:after':{
            borderColor      : "#2196f3",
            background       : "#2196f3",
            boxShadow        : "0 1px 7px 2px rgba(152, 152, 152, 0.21)",
            transition       : "all .1s ease-in",
        }
    }
}

class DayComponent extends Component {
    
    render() {
        const days = ["S", "M", "T", "W", "T", "F", "S"];
        const currDate = this.props.current;
        const isTarget = currDate.toDateString() === this.props.target.toDateString();

        return (
            <div className={
                `${this.props.classes.dateItem} ${isTarget?"active":""}`}>
                <Typography variant="body1" color="textSecondary">
                    {days[currDate.getDay()]}
                </Typography>
                <Typography variant="body1">
                    {currDate.getDate()}
                </Typography>
            </div>
        );
    }
}

export default withStyles(style)(DayComponent);