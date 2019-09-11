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
        // justifyContent: 'center',
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
    return  <React.Fragment>
            <Typography component="h5" variant="h5">
                Results:
            </Typography>
            <div className={props.classes.resultBoxWin}>
                <Avatar className={props.classes.vote}>Your Vote</Avatar>
                <Typography >
                    Would you rather find $50 yourself ? 
                </Typography>
                <Progress percent={67}  status="success"
                    theme={
                        {
                            success: {
                                symbol: '67' + '%',
                                trailColor: grey[300],
                                color: teal[600]
                            }
                        }
                    }
                />
                <Typography align='center'>
                    2 out 3 votes
                </Typography>
            </div>
            <div className={props.classes.resultBoxLoser}>
                <Typography >
                    Would you rather have your best friend find $500 ? 
                </Typography>
                <Progress percent={33}  status="success"
                    theme={
                        {
                            success: {
                                symbol: '33' + '%',
                                trailColor: grey[300],
                                color: grey[600]
                            }
                        }
                    }/>
                <Typography align='center'>
                    1 out 3 votes
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
    }


    render(){
        const { classes, questionsUser, type } = this.props;
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
                    questionTag = <QuestionClosed classes={classes} />
                break;
            default:
                questionTag = <QuestionOpen classes={classes} />
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

function mapStateToProps ({tabPosition}) {
    return {
      tabPosition
    }
}

export default connect(mapStateToProps) (withStyles(useStyles)(Question));