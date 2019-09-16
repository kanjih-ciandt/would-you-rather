import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LeaderBoardCard from '../LeaderBoadCard/LeaderBoardCard'
import { withStyles } from '@material-ui/core/styles';
import { apiService } from '../../services/api.service';


const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200,
        padding: '10px'
    },
    card: {
        maxWidth: 500,
        paddingBottom: '20px'
    }
    

});

class LeaderBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
        };
        
    
    }

    // componentDidMount(){
    //     apiService.getUsers()
    //     .then(({ users}) => {
    //     Object.values(users).forEach(user => {
    //             const countAnswer = Object.keys(user.answers).length;
    //             const countCreated =  user.questions.length;
    //             user.score = countAnswer + countCreated
    //     });
            
    //     this.setState(() => ({
    //         users: Object.values(users).sort((a,b,) =>  a.score > b.score ? -1 : 1 ).slice(0,3),
    //       }));
    //     })

        
    // }
    
    render(){
        // const { users } = this.state;
        const { classes, users } = this.props;
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                <div>
                    {users && users.map((user, index) => (
                        <div key={user.id} className={classes.card}>
                            <LeaderBoardCard user={user} position={index}/>
                        </div>
                    ))}
                </div>
            </Container>
            </React.Fragment>
            
        )
    }
}

function loadQuestionBoard(users, authedUser) {
    Object.values(users).forEach(user => {
        const countAnswer = Object.keys(user.answers).length;
        const countCreated =  user.questions.length;
        user.score = countAnswer + countCreated
    });
    
    
    return Object.values(users).sort((a,b,) =>  a.score > b.score ? -1 : 1 ).slice(0,3);
}


function mapStateToProps ({users}) {
    return {
        users: users && Object.keys(users).length > 0 ? loadQuestionBoard(users) : null,
    }
}

export default connect(mapStateToProps) (withStyles(useStyles)(LeaderBoard));