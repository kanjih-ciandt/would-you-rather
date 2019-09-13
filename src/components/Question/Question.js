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
import { setTabPosition } from '../../actions/tabPosition';
import { setCurrentQuestion } from '../../actions/currentQuestion';

export const questionType = Object.freeze({
    OPEN:   'OPEN',
    CLOSED:  'CLOSED',
    PREVIEW: 'PREVIEW'
});

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    card: {
        maxWidth: 500,
        width: 500,

    },
    cardHeader: {
        backgroundColor: grey[300],
    },
    cardBody: {
        
        display: 'flex',
        alignItems: 'center',
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
        margin: '40px',
        backgroundColor: theme.palette.secondary.main,
        width: 90,
        height: 90,
      },
      vertical:{
        borderLeft:'1px solid lightgrey',
        height:'10em',
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
    vote: {
        backgroundColor: theme.palette.secondary.main,
        width: 40,
        height: 40,
        position: 'absolute',
        top: '-15px',
        right: '-15px',
        fontSize: '12px',
        textAlign: 'center'
      },

});



function QuestionOpen (props) {
    const questionOne = props.questionsUser ? props.questionsUser.optionOne.text : ' '
    const questionTwo = props.questionsUser ? props.questionsUser.optionTwo.text : ' '
    return  <React.Fragment>
            <Typography component="h5" variant="h5">
                Would You Rather ...
            </Typography>
            <form className={props.classes.form} >
                <RadioGroup
                    aria-label="question"
                    name="question">
                    <FormControlLabel value="option1" control={<Radio />} label={questionOne} />
                    <FormControlLabel value="option2" control={<Radio />} label={questionTwo} />    
                </RadioGroup>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={props.classes.submit}
                >
                    Submit
                </Button>
            </form>
        </React.Fragment>
}

function QuestionPreview (props) {
    return  <React.Fragment>
            <Typography component="h5" variant="h5">
                Would You Rather ...
            </Typography>
                <Typography>
                    ...{props.text && props.text.substring(0, 30)} ...
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={props.classes.submit}
                    
                    onClick={props.handlePreview}
                >
                    View Pow
                </Button>
            
        </React.Fragment>
}

function QuestionClosed (props) {
    const questionOne = {
        text: props.questionsUser ? props.questionsUser.optionOne.text : ' ',
        votes: props.questionsUser ? props.questionsUser.optionOne.votes.length : 0,
        voted: props.authedUser && props.questionsUser && props.questionsUser.optionOne.votes.includes(props.authedUser.id)
    }
    const questionTwo = {
        text: props.questionsUser ? props.questionsUser.optionTwo.text : ' ',
        votes: props.questionsUser ? props.questionsUser.optionTwo.votes.length : 0,
        voted: props.authedUser && props.questionsUser && props.questionsUser.optionTwo.votes.includes(props.authedUser.id)
    }
    
    const totalVotes = questionOne.votes + questionTwo.votes
    questionOne.percent = questionOne.votes === 0 ? 0 : (questionOne.votes / totalVotes) * 100
    questionTwo.percent = questionTwo.votes === 0 ? 0 : (questionTwo.votes / totalVotes) * 100

    questionOne.theme =  questionOne.percent > questionTwo.percent  ? props.classes.resultBoxWin: props.classes.resultBoxLoser
    questionTwo.theme =  questionTwo.percent > questionOne.percent  ? props.classes.resultBoxWin: props.classes.resultBoxLoser

   
    return  <React.Fragment>
            <Typography component="h5" variant="h5">
                Results:
            </Typography>
            <div className={questionOne.theme}>
                {questionOne.voted && <Avatar className={props.classes.vote}>Your Vote</Avatar>}
                <Typography >
                    Would you rather {questionOne.text}
                </Typography>
                <Progress percent={ questionOne.percent }  status="success"
                    theme={
                        {
                            success: {
                                symbol: ` ${questionOne.percent}%`,
                                trailColor: grey[400],
                                color: teal[600]
                            }
                        }
                    }
                />
                <Typography align='center'>
                    {questionOne.votes} out {totalVotes} votes
                </Typography>
            </div>
            <div className={questionTwo.theme}>
                {questionTwo.voted && <Avatar className={props.classes.vote}>Your Vote</Avatar>}
                <Typography >
                Would you rather {questionTwo.text}
                </Typography>
                <Progress percent={questionTwo.percent}  status="success"
                    theme={
                        {
                            success: {
                                symbol: ` ${questionTwo.percent}%`,
                                trailColor: grey[400],
                                color: teal[600]
                            }
                        }
                    }/>
                <Typography align='center'>
                    {questionTwo.votes} out {totalVotes} votes
                </Typography>
            </div>
        </React.Fragment>
}



class Question extends Component {
    constructor(props) {
        super(props);
        this.handlePreview = this.handlePreview.bind(this);
      }

    handlePreview(event) {
        this.props.dispatch(setTabPosition(0));
        console.log(this.props.questionsUser.id)
        this.props.dispatch(setCurrentQuestion(this.props.questionsUser));
    }


    render(){
        const { classes, questionsUser, type, authedUser } = this.props;
        const author = questionsUser ? `${questionsUser.authorUser.name} asks` : ''
        
        
        let questionTag = null;
        switch(type){
            case questionType.PREVIEW:
                questionTag = <QuestionPreview classes={classes}  handlePreview={this.handlePreview} text={questionsUser && questionsUser.optionOne.text}/>
                break;
            case questionType.OPEN:
                questionTag = <QuestionOpen classes={classes} handlePreview={this.handlePreview} questionsUser = {questionsUser && questionsUser} />
                break;
            case questionType.CLOSED:
                    questionTag = <QuestionClosed classes={classes} questionsUser= {questionsUser && questionsUser} authedUser={authedUser}/>
                break;
            default:
                questionTag = <QuestionClosed classes={classes} />
        }


        return (
            <Card className={classes.card}>
                <CardHeader className={classes.cardHeader}
                    subheader= {author}
                />
                <div className={classes.cardBody}>
                    <div className={classes.divAvatar}>
                        <Avatar alt="{user.avatarURL}" src={questionsUser && questionsUser.authorUser.avatarURL} className={classes.avatar} />
                        
                        
                    </div>
                    
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {questionTag}
                        </CardContent>
                    </div>
                </div>
            </Card>
        )
    }
}

function mapStateToProps ({authedUser,tabPosition}) {
    return {
      authedUser,
      tabPosition
    }
}

export default connect(mapStateToProps) (withStyles(useStyles)(Question));