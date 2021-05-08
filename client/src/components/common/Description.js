import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        position: 'relative',
        left: '80%',
        top: '0'
    },
}));

const Description = ({ resume, section, index, name }) => {
    const classes = useStyles();

    const description = (name === 'description') ? 'description' : 'projectDescription'

    const [lines, setLines] = React.useState(resume[section][index][description]);

    //console.log(resume, '-', section, '-', resume[section], '-', Array.isArray(resume[section][index].description), '-', resume[section][0])

    const addSection = () => {
        const updatedLines = [...lines, '']
        setLines(updatedLines);
        resume[section][index][description] = lines;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        resume[section][index][description][id] = value;
    }

    return (
        <React.Fragment>
            {resume[section][index][description].map((text, idx) => (
                <TextField
                    id={idx}
                    name={idx}
                    label={`Description Line ${idx + 1}`}
                    value={text}
                    onChange={handleChange}
                    type='text'
                    fullWidth
                />
            ))}

            <Button onClick={addSection}
                variant="contained"
                color="primary"
                className={classes.button}
            >
                +
            </Button>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        resume: state.resume.data
    }
}

export default connect(mapStateToProps)(Description);