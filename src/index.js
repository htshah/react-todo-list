import React from 'react'
import ReactDOM from 'react-dom'

//styles
import {MuiThemeProvider} from "@material-ui/core/styles";
import theme from "./theme";
import './index.css';
//components
import NavBar from './components/NavBar'
import DateTimeline from './components/DateTimeline/'
import { Grid } from '@material-ui/core';



class App extends React.Component{
    render(){
        return(
            <MuiThemeProvider theme={theme}>
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch">
                    <Grid item container xs className="header">
                            <NavBar />
                            <DateTimeline />
                    </Grid>
                    <Grid item xs>
                        <h1>This is lower grid</h1>
                    </Grid>
                </Grid>
                
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
