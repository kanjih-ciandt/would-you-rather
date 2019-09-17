import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import "react-sweet-progress/lib/style.css";
import Icon from '@material-ui/core/Icon';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center' 

    },
    cardBody: {
        display: 'flex',
        position: 'relative',
    },
    details: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' 
      },
    content: {
        flex: '1 0 auto',
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
    scoreBox:{
        display:'flex',
        alignItems: 'right',
        justifyContent: 'flex-end'

    },
    score: {
        backgroundColor: theme.palette.primary.main,
        width: 80,
        height: 80,
        fontSize: '40px',
        
      },
    triangleTopLeft: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '0',
        height: '0', 
        borderTop: `60px solid ${blue[700]}`,
        borderRight: '60px solid transparent;'
      },
      positionRank: {
        position: 'absolute',
        top: '8px',
        left: '6px',
        width: '0',
        height: '0',
       
      },
      first: {
        color: '#FFC400'
      },
      second: {
        color: '#E0E0E0'
      },
      third: {
        color: '#CD7F32'
      },

});



function UserPoint (props) {
    const {userScore} = props;
    
    return  <React.Fragment>
            <Typography component="h5" variant="h5">
                {userScore.name}
            </Typography>
            <Typography >
                Answered questions: {userScore.countAnswer}
            </Typography>
            <Typography >
                Created questions: {userScore.countCreated}
            </Typography>
            
        </React.Fragment>
}





class LeaderBoardCard extends Component {
    
    render(){
        const { classes, user, position } = this.props;
        const userScore = {
            name: user.name,
            countAnswer: user ?  Object.keys(user.answers).length : 0,
            countCreated: user ? user.questions.length : 0,
        }
        userScore.score = userScore.countAnswer + userScore.countCreated
        const colorPosition = position === 0 ? classes.first : position === 1 ? classes.second : classes.third

        
        return (
            <Card >
                <div className={classes.cardBody}>
                    <div className={classes.triangleTopLeft}/>
                    <div className={classes.positionRank}>
                        <Icon className={colorPosition} >emoji_events</Icon>
                    </div>
                    <div className={classes.divAvatar}>
                        <Avatar alt={user.name} src={user.avatarURL} className={classes.avatar} />
                        
                    </div>
                    
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <UserPoint classes={classes} userScore={userScore}/>
                        </CardContent>
                    </div>
                    <div className={classes.scoreBox}>
                        <CardContent >
                            <Avatar className={classes.score}>{userScore.score}</Avatar>
                        </CardContent>
                    </div>
                    
                </div>
            </Card>
        )
    }
}

export default connect() (withStyles(useStyles)(LeaderBoardCard));