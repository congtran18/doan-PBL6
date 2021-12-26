/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import {
    FormControl,
    FormHelperText,
    InputLabel,
    NativeSelect,
    makeStyles,
    Box,
  } from '@material-ui/core';
  import PropTypes from 'prop-types';
  import React from 'react';
  import { Controller } from 'react-hook-form';
  
  const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(1.2, 1.5),
      marginTop: theme.spacing(2),
  
      border: '0.5px solid #c4c4c4',
      borderRadius: 5,
  
      position: 'relative',
    },
    select: {
      border: 'none',
      outline: 'none',
    },
    title: {
      position: 'absolute',
      top: theme.spacing(-1),
      left: '20px',
  
      fontSize: 12,
  
      padding: theme.spacing(0, 0.5),
  
      backgroundColor: 'white',
    },
    error: {
      margin: theme.spacing(1, 1.75, 3, 1.75),
  
      fontSize: 12,
      color: '#F44336',
      fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    },
  
    errorStatus: {
      borderColor: '#F44336',
      color: '#F44336',
    },
  }));
  
  function SelectField({
    control,
    errors,
    label,
    name,
    values,
    onChange,
    disable,
  }) {
    const classes = useStyles();
    const isError = !!errors[name]?.message;
  
    const handleSelectChange = (e) => {
      if (!onChange) return;
  
      onChange(e.target.value);
    };
  
    return (
      <>
        <Box
          className={
            isError
              ? `${classes.container} ${classes.errorStatus}`
              : classes.container
          }
        >
          <InputLabel
            className={
              isError ? `${classes.title} ${classes.errorStatus}` : classes.title
            }
          >
            {label}
          </InputLabel>
          <FormControl disabled={disable} fullWidth error={!!errors[name]}>
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  className={classes.select}
                  onChange={(e) => {
                    handleSelectChange(e);
                    field.onChange(e);
                  }}
                >
                  <option key="all" value="">
                    All
                  </option>
                  {values.map((x) => (
                    <option key={x.name} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </NativeSelect>
              )}
            />
          </FormControl>
        </Box>
        <p className={classes.error}>{errors[name]?.message}</p>
      </>
    );
  }
  
  SelectField.propTypes = {
    control: PropTypes.object,
    errors: PropTypes.object,
    onChange: PropTypes.func,
  
    values: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    disable: PropTypes.bool,
  };
  
  export default SelectField;
  