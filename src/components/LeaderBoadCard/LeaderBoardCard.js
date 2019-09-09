import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { grey, teal } from '@material-ui/core/colors';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';




import Container from '@material-ui/core/Container';
import { gray, bold } from 'ansi-colors';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    listBase: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center' 

    },
    card: {
        // maxWidth: 400,
    },
    cardHeader: {
        backgroundColor: grey[300],
    },
    cardBody: {
        display: 'flex',
        position: 'relative',
    },
    media: {
        flexGrow: 1,
    },
    
    details: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' 
      },
    content: {
        flex: '1 0 auto',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    divAvatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        margin: theme.spacing(0, 3, 0),
        backgroundColor: theme.palette.secondary.main,
        width: 90,
        height: 90,
      },
      vertical:{
        borderLeft:'1px solid lightgrey',
        height:'8em',
      },
      submit: {
        margin: theme.spacing(1, 0, 0),
      },
      
      resultBoxWin: {
          position: 'relative',
          borderRadius: '10px',
          border:'1px solid Teal',
          backgroundColor: teal[100],
          margin: theme.spacing(1, 1, 1),
          padding: theme.spacing(3),

      },
      resultBoxLoser: {
        position: 'relative',
        borderRadius: '10px',
        border:`1px solid Grey`,
        backgroundColor: grey[100],
        margin: theme.spacing(1, 1, 1),
        padding: theme.spacing(3),

    },
    scoreBox: {
        position: 'relative',
        borderRadius: '10px',
        margin: theme.spacing(1, 1, 1),
        padding: theme.spacing(3),

    },
    scoreTitle: {
        margin: theme.spacing(0, 3, 0),
        fontWeight: 'bold',
        

    },
    score: {
        backgroundColor: theme.palette.secondary.main,
        width: 40,
        height: 40,
        fontSize: '20px',
        textAlign: 'center'
      },
    triangleTopLeft: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '0',
        height: '0', 
        borderTop: `60px solid ${grey[200]}`,
        borderRight: '60px solid transparent;'
      },
      positionRank: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '0',
        height: '0',
       
      }

});



function UserPoint (props) {
    return  <React.Fragment>
            <Typography component="h5" variant="h5">
                Sarah Edo
            </Typography>
            <List className={props.classes.listBase}>
                {[['Answered questions', 7], ['Created questions', 3]].map(value => {
                    return (
                    <ListItem key={value} role={undefined} >
                        <ListItemText id={value[0]} primary={`${value[0]}`} />
                        <ListItemText id={value[1]} primary={`${value[1]}`}/>
                    </ListItem>
                    );
                })}
            </List>
        </React.Fragment>
}

function Score (props) {
    return  <React.Fragment>
            <Typography align='center' component="div" className={props.classes.scoreTitle}>
                Score
            </Typography>
            <div className={props.classes.scoreBox}>
                <Avatar className={props.classes.score}>10</Avatar>
            </div>
        </React.Fragment>
}




class LeaderBoardCard extends Component {
    render(){
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <div className={classes.cardBody}>
                    <div className={classes.triangleTopLeft}/>
                    <div className={classes.positionRank}>
                        1
                    </div>
                    <div className={classes.divAvatar}>
                        <Avatar alt="{user.avatarURL}" src="batman.png" className={classes.avatar} />
                        <div className={classes.vertical}></div>
                    </div>
                    
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <UserPoint classes={classes} />
                        </CardContent>
                    </div>
                    <div className={classes.divAvatar}>
                        <div className={classes.vertical}/>
                    </div>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Score classes={classes} />
                        </CardContent>
                    </div>
                </div>
            </Card>
        )
    }
}

export default connect() (withStyles(useStyles)(LeaderBoardCard));