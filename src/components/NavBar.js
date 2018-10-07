import React from 'react';
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Icon, withStyles } from '@material-ui/core';

const style={
    root: {
        background: "#ffffff !important",
        padding: "100px 15px 0px !important",
        marginBottom: "20px",
    },
    grow:{
        flexGrow:1,
    },
};

function NavBar(props){
    const {classes} = props;
    return (
            <AppBar 
                position="relative" 
                className={classes.root}
                elevation={0}
            >
            <Toolbar disableGutters>
                    <Typography variant="display1" className={classes.grow}>
                        To-Do
                    </Typography>
                    <IconButton aria-label="Search">
                        <Icon fontSize="small">search</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(style)(NavBar);