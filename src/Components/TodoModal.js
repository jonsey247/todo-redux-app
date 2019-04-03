import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux";

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
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
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
  const { classes, item , tags, handleDelete} = props;
  const generate = () => {
    return tags.map(tag => (
      <Chip label={tag} className={styles.chip} onDelete={() => {}} />
      ));
  };
  return (
    <div className={styles.root}>
      <ExpansionPanel defaultExpanded>
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
            {generate()}
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
