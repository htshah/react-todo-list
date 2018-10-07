import React,{Component, Fragment} from "react";
import { withStyles, Typography } from "@material-ui/core";
import MonthComponent from "./MonthComponent";

const style={
    dateScrollContainer:{
        display:"flex",
        flexDirection:"row",
        width:"calc(100vw - 30px)",
        padding:"0px 15px !important",
        overflowX:"scroll",
        flexWrap: "nowrap",
        "-webkit-overflow-scrolling":"touch",
    },
    yearTitle:{
        padding:"0 15px",
    },
}
class DateTimeline extends Component{
    constructor(props){
        super(props);

        const {classes} = props;
        this.classes = classes;
        this.state = {
            date:  typeof props.date === "undefined" ? new Date() : props.date,
        }
        console.log(this.state.date);
    }
    
    renderMonth(){
        let months = [];
        const {date} = this.state;
        for(let i=0;i<12;i++){
            let currMonth = new Date(date.getFullYear(),i,1);
            months.push(
                <MonthComponent 
                    current={currMonth} 
                    target={this.state.date}/>
            );
        }

        return (
            <Fragment>
                {months}
            </Fragment>
        );
    }
    render(){
        return (
            <div>
                <Typography
                    variant="subheading"
                    className={this.classes.yearTitle}>
                    {this.state.date.getFullYear()}
                </Typography>
                <div className={this.classes.dateScrollContainer}>
                    {this.renderMonth()}
                </div>
            </div>
        );
    }
}

export default withStyles(style)(DateTimeline);