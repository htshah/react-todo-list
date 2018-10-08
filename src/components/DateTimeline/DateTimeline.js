import React,{Component, Fragment} from "react";
import ReactDOM from "react-dom";
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
    dateInput:{
        position:"absolute",
        left: "-100%",
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

        this.dateFieldRef = React.createRef();
    }

    handleDateSelect = (date)=>{
        this.setState({
            date: date
        });
    }

    componentDidMount(){
        this.scrollDateIntoView();
    }

    scrollDateIntoView = () =>{
        const container = document.querySelector(".date-timeline-container");
        const node = ReactDOM.findDOMNode(this.currentDateRef.current);
        
        container.scrollTo(node.offsetLeft, 0);
    }

    handleDateInput = (e) =>{
        const [year,month,day] = e.target.value.split('-');
        this.setState({
            date: new Date(year,parseInt(month)-1,day),
        });

        this.dateUpdated = true;
    }

    componentDidUpdate(){
        if(this.dateUpdated){
            this.dateUpdated = false;
            this.scrollDateIntoView();
        }
    }
    
    renderMonth(){
        let months = [];
        const {date} = this.state;
        this.currentDateRef = null;
        this.currentDateRef = React.createRef();
        for(let i=0;i<12;i++){
            let currMonth = new Date(date.getFullYear(),i,1);
            const isTarget = currMonth.getMonth() === date.getMonth();
            
            months.push(
                <MonthComponent
                    key= {i}
                    {...(isTarget && { dateRef: this.currentDateRef })}
                    current= {currMonth}
                    target= {date}
                    onDateSelect= {this.handleDateSelect}/>

            );
        }

        return (
            <Fragment>
                {months}
            </Fragment>
        );
    }
    render(){
        const {date} = this.state;
        const month = date.getMonth()+1;
        const day = date.getDate();
        const dateString = 
            `${date.getFullYear()}-${month<10?"0":""}${month}-${day<10?"0":""}${day}`;
        return (
            <div className="date-timeline">
                <input type="date" 
                    className={this.props.classes.dateInput+" date-timeline-input"}
                    value={dateString}
                    ref={this.dateFieldRef}
                    onChange={(e)=>this.handleDateInput(e)}/>
                <Typography
                    variant="subheading"
                    className={this.classes.yearTitle}
                    onClick={() => this.dateFieldRef.current.focus()}>
                    {this.state.date.getFullYear()}
                </Typography>
                <div className={`date-timeline-container ${this.classes.dateScrollContainer}`}>
                    {this.renderMonth()}
                </div>
            </div>
        );
    }
}

export default withStyles(style)(DateTimeline);