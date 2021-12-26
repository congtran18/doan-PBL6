/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: 12,
    color: '#F44336',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',

    margin: theme.spacing(1, 1.75, 0),
  },

  slide: {
    width: '60%',
    maxWidth: 200,
    height: 150,
    objectFit: 'cover',
  },
}));

function UploadField({ errors, name, register, imageSource, value }) {
  const classes = useStyles();
  const imagePlaceholder = 'https://via.placeholder.com/150';
  const uploadImage = imageSource || imagePlaceholder;
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (value && value[0]) {
      setImage(URL.createObjectURL(value[0]));
      return;
    }
    setImage(null);
  }, [value]);

  return (
    <Box>
      <Box>
        <img className={classes.slide} src={image || uploadImage} alt={name} />
      </Box>
      <input
        {...register(name)}
        accept="image/*"
        type="file"
        name={name}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        as="p"
        className={classes.error}
      />
    </Box>
  );
}

UploadField.propTypes = {
  control: PropTypes.object,
  errors: PropTypes.object,
  register: PropTypes.any,
  value: PropTypes.any,

  name: PropTypes.string,
  imageSource: PropTypes.string,
};

export default UploadField;
