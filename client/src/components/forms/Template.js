import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setTitle } from '../../redux/actionCreators';
import templates from '../templates/templates';

const useStyles = makeStyles((theme) => ({
    line: {
        height: '10px',
        marginLeft: '0',
        marginRight: '0',
        marginTop: '35px',
        marginBottom: '35px',
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        opacity: '0.75',
        width: '100%'
    },
    button: {
        flexBasis: "50%"
    }
}));


const Template = (props) => {

    const classes = useStyles();
    const history = useHistory()

    //const [title, setTitle] = useState(props.resume.title);

    const handleChange = (e) => {
        const { value } = e.target;

        props.setTitle(value);
        //console.log(resume.personal, personal, value);
        //props.resume.title = title;
    }

    const handleClick = (template) => {
        props.resume.template = template
        const update = 'update'
        history.push(`/${template}`, update)
    }

    return (
        <React.Fragment>
            <h5>Choose Template</h5>
            <React.Fragment>
                <hr className={classes.line}></hr>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Title"
                            value={props.resume.title}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    {templates.map((template, index) => (
                        <Grid key={index} item xs={12} className={classes.button} >
                            <Button onClick={() => { handleClick(template) }}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                {template}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        </React.Fragment >
    )
}

const mapStateToProps = state => {
    return {
        resume: state.resume,
    }
}

const mapDispatchToProps = dispatch => ({
    setTitle: (props, callback) => { dispatch(setTitle(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);