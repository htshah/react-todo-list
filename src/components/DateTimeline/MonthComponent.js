import React, { Component, Fragment } from "react";
import { Typography, withStyles } from "@material-ui/core";
import DayComponent from "./DayComponent";

const style = {
    monthTitle: {
        display: "block",
        position: "sticky",
        width: "fit-content",
        left: "0",
        marginRight: "15px",
    },
    daysContainer: {
        display: "flex",
        flexDirection: "row",
        width: "max-content",
        flexWrap: "nowrap",
    },
}

class MonthComponent extends Component{
    
    renderDays() {
        let days = [];
        const {current} = this.props;
    
        for(let i=1;i<=31;i++){
            let date = new Date(current.toString());
            date.setDate(i);
            if(date.getMonth() !== current.getMonth()){
                break;
            }
            days.push(
                <DayComponent
                    current={date}
                    target={this.props.target}/>
            );
        }
        return <Fragment>{days}</Fragment>;
    }
    render(){
        const currDate = this.props.current;
        const months = [
            'January', 'Feburary', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ];
        return (
            <div className="month-container">
                <Typography
                    variant="caption" 
                    className={this.props.classes.monthTitle}>
                    {months[currDate.getMonth()]}
                </Typography>
                <div className={this.props.classes.daysContainer}>
                    {this.renderDays()}
                </div>
            </div>
        );
    }
}

export default withStyles(style)(MonthComponent);