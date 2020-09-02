import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { BrowserRouter as Router} from 'react-router-dom'
import './application.scss'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://sunny.fr">
                Sunny.fr
            </Link> {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    title: {
        flexGrow: 1,
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },

}))


const ApplicationLayout = ({children}) => {
    const classes = useStyles()


    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                {/*<AppBar position="absolute">*/}
                {/*    <Toolbar className={classes.toolbar}>*/}

                {/*        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>*/}
                {/*            Recon*/}
                {/*        </Typography>*/}

                {/*    </Toolbar>*/}
                {/*</AppBar>*/}

                <main className={classes.content}>

                    {/*<div className={classes.appBarSpacer}/>*/}
                    <Container maxWidth="lg" className={classes.container}>
                        {children}
                    </Container>
                    <footer>
                        <Copyright/>
                    </footer>

                </main>
            </div>
        </Router>
    )
}


export default ApplicationLayout
