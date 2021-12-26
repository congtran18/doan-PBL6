import React, { useEffect, useState } from 'react'
import {
    Grid,
    Divider,
    Card,
    TextField,
    Icon,
    // Button,
    IconButton,
    Row,
} from '@material-ui/core'
import { Autocomplete, createFilterOptions, Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    Autocomplete: {
        height: 20,
    },
}))

const AccountOverview = ({ user: { _id, name, email, isAdmin } }) => {
    const classes = useStyles()
    const [page, setPage] = useState(1);
    return (
        <>
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    className="text-center"
                >
                    <h6 className="m-0 text-15">{_id}</h6>
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={2}
                    sm={2}
                    xs={2}
                    className="text-center"
                >
                    <h6 className="m-0 text-15">{name}</h6>
                </Grid>
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    className="text-center"
                >
                    <h6 className="m-0 text-15">{email}</h6>
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={2}
                    sm={2}
                    xs={2}
                    className="text-center"
                >
                    <big className={
					isAdmin === true
						? 'border-radius-4 bg-error text-white px-2 py-2px'
						// : type.realname === 'quần'
						// ? 'border-radius-4 bg-primary text-white px-2 py-2px'
						: 'border-radius-4 bg-primary text-white px-2 py-2px'
				}>
                        {isAdmin ? "Admin" : "User"}
                    </big>
                </Grid>
        </>

    )
}


export default AccountOverview
