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
import moment from 'moment'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    Autocomplete: {
        height: 20,
    },
}))

const OrderItem = ({ orderItem: { _id, realname, qty, size, color, image, cost } }) => {
    const classes = useStyles()
    const [page, setPage] = useState(1);
    console.log("vo day roi")
    // let timeUpdate = moment(new Date(updatedAt)).format('DD/MM/YYYY');
    // timeUpdate = timeUpdate.concat("Vào")
    // timeUpdate = timeUpdate.concat(moment(new Date(updatedAt)).format('HH:mm:ss'));
    return (
        <>
            <Grid item lg={3} md={3} sm={3} xs={3}>
                <img
                    className="border-radius-4 w-100 mr-6"
                    src={image && image}
                    alt={realname}
                    width={70}
                    height={80}
                />
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className="text-center"
            >
                <h6 className="m-0 text-15">{realname}</h6>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className="text-center"
            >
                <h6 className="m-0 text-15">{qty}</h6>
            </Grid>
            <Grid
                item
                lg={1}
                md={1}
                sm={1}
                xs={1}
                className="text-center"
            >
                <h6 className="m-0 text-15">{size}</h6>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className="text-center"
            >
                <h6 className="m-0 text-15">{color}</h6>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className="text-center"
            >
                <h6 className="m-0 text-15">{cost}đ</h6>
            </Grid>
        </>

    )
}


export default OrderItem
