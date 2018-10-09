import React, { Component, Fragment } from "react";
import { Typography, withStyles } from "@material-ui/core";
import DayComponent from "./DayComponent";

const style = {
    monthContainer:{
        '&:not(:first-child)':{
            marginLeft: "15px",
        }
    },
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

    getDateString = (date) =>{
        return `${date.getFullYear()}${date.getMonth()}`;
    }

    shouldComponentUpdate = ({target: newTarget}) => {
        const {current,target} = this.props;
        return (
            current.getFullYear() !== newTarget.getFullYear() ||
            current.getMonth() === newTarget.getMonth() ||
            this.getDateString(current) === this.getDateString(target)
        );

    }
    
    renderDays() {
        let days = [];
        const {current,target,onDateSelect} = this.props;
    
        for(let i=1;i<=31;i++){
            let date = new Date(current.toString());
            date.setDate(i);
            if(date.getMonth() !== current.getMonth()){
                break;
            }
            const isTargetDate = date.toDateString() === target.toDateString();
            days.push(
                <DayComponent
                    key={i}
                    {...(isTargetDate && {ref: this.props.dateRef})}
                    current={date}
                    target={target}
                    onDateSelect={onDateSelect}/>
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
            <div className={this.props.classes.monthContainer+" month-container"}>
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