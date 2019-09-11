import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { grey, teal } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';

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
        maxWidth: 600,
    },
    cardHeader: {
        backgroundColor: grey[300],
    },
    cardBody: {
        
        display: 'flex',
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

class NewQuestion extends Component {
    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader className={classes.cardHeader}
                        title="New Question"
                    />
                    <div >
                        <Typography>
                            Complete the question
                        </Typography>
                        <Typography>
                            Would you rather
                        </Typography>
                        
                        <form className={classes.form} >
                            <TextField
                                id="filled-full-width"
                                label="First Option"
                                style={{ margin: 8 }}
                                placeholder="Enter Option One Text Here"
                                fullWidth
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <Typography align='center'>
                                OR
                            </Typography>
                            
                            <TextField
                                id="filled-full-width"
                                label="Second Option"
                                style={{ margin: 8 }}
                                placeholder="Enter Option Two Text Here"
                                helperText="Full width!"
                                fullWidth
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            SUBMIT
                        </Button>
                    </form>
                        
                    </div>
                </Card>
            </Container>
            </React.Fragment>
            
        )
    }
}

export default connect() (withStyles(useStyles)(NewQuestion));