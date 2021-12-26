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

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
]

const ProductOverview = ({ product: { _id, realname, code, status, type, category, cost, description, image, rating } }) => {
    const classes = useStyles()
    const [page, setPage] = useState(1);

	const costFormat = (cost) => {
		var costlength;
		if((cost.length/3-parseInt(cost.length/3)) > 0){
			costlength = parseInt(cost.length/3);
		}else{
			costlength = parseInt(cost.length/3)-1;
		}
		for(let i=1; i <= costlength; i++){
			cost = [cost.slice(0, ((-3*i)-(i-1))), ".", cost.slice((-3*i)-(i-1))].join('');
		}
		return cost;  
	}

    return (
        <>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <div className="flex">
                        <img
                            className="border-radius-4 w-100 mr-6"
                            src={image[0]}
                            alt={realname}
                            width={110}
                            height={110}
                        />
                        <div className="flex-grow">
                            <h6 className="mt-0 mb-3 text-16 text-primary">
                                {realname}
                            </h6>
                            <p className="mt-0 mb-6px text-14">
                                <span className="text-muted">
                                    Mã:{' '}
                                </span>
                                <span className="font-medium">
                                    {code}
                                </span>
                            </p>
                            <p className="mt-0 mb-6px text-14">
                                <span className="text-muted">
                                    Thể loại:{' '}
                                </span>
                                <span className="font-medium">
                                    {type.realname}
                                </span>
                            </p>
                            <p className="mt-0 mb-6px text-14">
                                <span className="text-muted">
                                    Kiểu:{' '}
                                </span>
                                <span className="font-medium">
                                    {category.realname}
                                </span>
                            </p>
                        </div>
                    </div>
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
					status === 'Mới'
						? 'border-radius-4 bg-error text-white px-2 py-2px'
						: status === 'Nổi bật'
						? 'border-radius-4 bg-primary text-white px-2 py-2px'
						: 'border-radius-4 bg-secondary text-white px-2 py-2px'
				}>
                        {status}
                    </big>
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={2}
                    sm={2}
                    xs={2}
                    className="text-center"
                >
                    <h6 className="m-0 text-15">{costFormat(cost)}đ</h6>
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={2}
                    sm={2}
                    xs={2}
                    className="text-center"
                >
                    <h6 className="m-0 text-15">{rating}</h6>
                </Grid>
        </>

    )
}

const dummyProductList = [
    {
        id: '323sa680b32497dsfdsgga21rt47',
        imgUrl: 'https://aoxuanhe.com/upload/product/axh-150/ao-thun-nam-den-cao-cap-dep.jpg',
        price: 324.0,
        amount: 19999,
        title: 'Áo thun nam',
        vote: 5,
        category: 'Áo thun',
        brand: 'Áo',
        item: 'AT-2488',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: 'https://media3.scdn.vn/img4/2021/05_14/HM4fCbfIZIoEcRg4oNTn.jpg',
        price: 454.0,
        amount: 15000,
        title: 'Áo polo nam',
        vote: 4.5,
        category: 'Áo polo',
        brand: 'Áo',
        item: 'AP-2800',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: 'https://vn-live-05.slatic.net/p/a64dbf2b8edcbac7425f168f1816696a.jpg_720x720q80.jpg_.webp',
        price: 454.0,
        amount: 24000,
        title: 'Áo polo đẹp',
        vote: 4.8,
        category: 'Áo polo',
        brand: 'Áo',
        item: 'AP-4800',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/345/647/products/6efd240964ac9cf2c5bd.jpg',
        price: 454.0,
        amount: 84000,
        title: 'Quần jean đen',
        vote: 4,
        category: 'Quần jean',
        brand: 'Quần',
        item: '2019 6582 2365',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: 'https://salt.tikicdn.com/cache/w444/ts/product/93/45/82/8fa12430783fd326a5634c3d6a2c0273.png',
        price: 454.0,
        amount: 88888,
        title: 'Áo bomber chất',
        vote: 4.5,
        category: 'Áo khoác',
        brand: 'Áo',
        item: 'AK-1444',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: 'https://benryhomme.com/upload/image/2020/ao-khoac-2020/18-1.jpg',
        price: 454.0,
        amount: 44444,
        title: 'Áo khoác jacket',
        vote: 4.8,
        category: 'Áo khoác',
        brand: 'Áo',
        item: 'AK-8822',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: 'https://teefit.vn/wp-content/uploads/2018/04/ao-thun-tron-trang.jpg',
        price: 454.0,
        amount: 42000,
        title: 'Áo thun trắng',
        vote: 5,
        category: 'Áo thun',
        brand: 'Áo',
        item: 'AT-4421',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: 'https://yinxx.vn/wp-content/uploads/2020/08/O1CN01my9BOI1pcXmF4oywA_66695381.jpg',
        price: 454.0,
        amount: 84000,
        title: 'Áo thun unisex',
        vote: 4.5,
        category: 'Áo thun',
        brand: 'Áo',
        item: 'AT-8822',
    },
]

export default ProductOverview
