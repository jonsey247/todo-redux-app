import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: theme.typography.pxToRem(10)
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
    alignContent: 'center'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  chip: {
    flexBasis: '33.33%',
    alignContent: 'right'
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function TodoModal(props) {
  const { item , tags, handleDelete} = props;
  
  return (
    <div className={styles.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={styles.column}>
            <Typography className={styles.heading}>{item.title}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={styles.details}>
          <div className={styles.column}>
            <Typography className={styles.secondaryHeading}>{item.description}</Typography>
          </div>
          <div className={styles.column} />
          <div className={styles.column}>
          <Chip label={tags} className={styles.chip} onDelete={() => {}} />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <IconButton aria-label="Delete" onClick={handleDelete}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

TodoModal.propTypes = {
  classes: PropTypes.object.isRequired,
};



export { TodoModal };
