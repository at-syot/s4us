import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Link, makeStyles, Typography } from '@material-ui/core';
import { Share, Send } from '@material-ui/icons';
import ScholarshipAmount from '../types/ScholarshipAmount';
import ScholarshiDetailCardCell from './ScholarshipDetailCardCell';

const useStyles = makeStyles((theme) => ({
  name: {
    fontWeight: '500',
  },
  actionsWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    padding: `${theme.spacing(1)}px 0`,
    '& button': {
      marginRight: theme.spacing(1),
    },
  },
  applyBtn: {
    backgroundColor: '#3FB1B5',
  },
  description: {
    whiteSpace: 'pre-line',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: theme.spacing(2),
  },
  groupCellWithoutHeader: {
    marginBottom: theme.spacing(2),
  },
  eligibilitiesWrapper: {},
}));

// TODO(issues/358): Style this.
export default function ScholarshipDetailCard({ scholarship }) {
  const classes = useStyles();
  const {
    name,
    organization,
    amount,
    deadline,
    website,
    description,
  } = scholarship.data;

  return (
    <Box>
      <Typography variant="h4" className={classes.name}>
        {name}
      </Typography>

      <Typography variant="h5">{organization}</Typography>

      <Box className={classes.actionsWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.applyBtn}
          startIcon={<Send />}>
          Apply
        </Button>

        <Button
          variant="outlined"
          className={classes.shareBtn}
          startIcon={<Share />}>
          Share
        </Button>
      </Box>

      <Typography
        gutterBottom
        variant="body1"
        component="p"
        className={classes.description}>
        {description}
      </Typography>

      <Box className={classes.groupCellWithoutHeader}>
        <ScholarshiDetailCardCell
          label="Deadline"
          text={deadline?.toLocaleDateString()}
        />
        <ScholarshiDetailCardCell
          label="Award Amount"
          text={amount?.toString()}
        />
        <ScholarshiDetailCardCell label="State" text="Washington" />
      </Box>

      <Box className={classes.eligibilitiesWrapper} />

      <Button
        component={Link}
        href={website}
        color="primary"
        variant="contained">
        Apply
      </Button>
    </Box>
  );
}

ScholarshipDetailCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string,
      organization: PropTypes.string,
      amount: PropTypes.instanceOf(ScholarshipAmount),
      description: PropTypes.string,
      deadline: PropTypes.instanceOf(Date),
      website: PropTypes.string,
    }).isRequired,
  }).isRequired,
};