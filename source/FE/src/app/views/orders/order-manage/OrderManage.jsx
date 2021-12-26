import React from 'react'
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
import OrderOverview from './OrderOverview'
import ProductCustomer from './ProductCustomer'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { ProductContext } from 'app/contexts/ProductContext'
import { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
// import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import AddOrderModal from './AddOrderModal'
import Pagination from 'app/components/Pagination/Pagination'
import { Link } from 'react-router-dom'
import axios from 'axios'


const OrderManage = () => {

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [indexpage, setIndexpage] = useState(0);
    const [previousproductslength, setPreviousproductslength] = useState("");
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [deletedProduct, setDeletedProduct] = useState(false);
    const [search, setSearch] = useState("");
    const [previoussearch, setPrevioussearch] = useState("");
    const [previoustype, setPrevioustype] = useState("");
    const [previouscategory, setPreviouscategory] = useState("");
    const [typeID, settypeID] = useState("");
    const [categoryID, setcategoryID] = useState("");
    const [typeProducts, setTypeProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);

    const {
        showAddOrderModal,
        setShowAddOrderModal,
        showToast: { show, message, type },
        setShowToast
    } = useContext(ProductContext)

    const onChangeSelectTypeProduct = (name, value) => {
        setTimeout(() => {
            if (value._id !== undefined && value._id !== 'undefined') {
                settypeID(value._id)
            }
        }, 200);
    }

    const onChangeSelectCategoryProduct = (name, value) => {
        setTimeout(() => {
            if (value._id !== undefined && value._id !== 'undefined') {
                setcategoryID(value._id)
            }
        }, 200);
    }

    const onChangesearch = event => {
        setTimeout(() => {
            setSearch(event)
        }, 500);
    }

    const getTypeProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/typeProduct/type")
            if (response.data.success) {
                setTypeProducts(response.data.typeProducts)
            }
        } catch (error) {
            setTypeProducts([])
        }
    }

    const getCategoryProducts = async (typeID) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/categoryProduct/category?typeID=${typeID}`)
            if (response.data.success) {
                setCategoryProducts(response.data.categoryProducts)
            }
        } catch (error) {
            setCategoryProducts([])
        }
    }

    const getOders = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin-order?page=${page}`)
            setOrders(response.data.data)
            setTotalPages(response.data.pages)
            setOrdersLoading(false)
        } catch (error) {
            setOrders([])
            setOrdersLoading(false)
        }
    }

    // Delete product
    const deleteProduct = async productId => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admin-order/track/${productId}`)
            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletProductById = async productId => {
        const confirmBox = window.confirm(
            "Bạn có chắc chắn muốn xoá hoá đơn?"
        )
        if (confirmBox === true) {
            const { success, message } = await deleteProduct(productId)
            setShowToast({ show: true, message: 'Hoá đơn được đưa vào thùng rác!', type: success ? 'success' : 'danger' })
            setDeletedProduct(true)
        }
    }


    // Start: Get all products

    // useEffect(() =>{
    // 	{products.map((product, index) => {				
    // 		if(product.category._id === undefined){
    // 			getProducts(page,"","","");
    // 			setPages(totalPages);
    // 		}
    // 	})}
    // 	setIndexpage((page-1)*8)
    // }, [products])

    useEffect(() =>{
		if(showAddOrderModal === false || deletedProduct === true){
			getOders(page);
			setPages(totalPages);
			setDeletedProduct(false)
		}
	}, [page,showAddOrderModal,deletedProduct])

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setcategoryID("");
    //         getTypeProducts();
    //         getCategoryProducts(typeID);
    //     }, 200)
    //     return () => {
    //         clearTimeout(timeout)
    //     }
    // }, [typeID])


    // useEffect(() => {
    //     if (search !== previoussearch || typeID !== previoustype || categoryID !== previouscategory) {
    //         setPage(1);
    //     }
    //     const timeout = setTimeout(() => {
    //         setPages(totalPages);
    //         getOders(page);
    //         setPrevioussearch(search);
    //         setPrevioustype(typeID);
    //         setPreviouscategory(categoryID);
    //     }, 200)
    //     return () => {
    //         clearTimeout(timeout)
    //     }
    // }, [page, search, typeID, categoryID])


    let body = null

    if (ordersLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else if (orders.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Body>
                        <Card.Title>Không có hoá đơn</Card.Title>
                    </Card.Body>
                </Card>
                <Pagination page={page} pages={pages} changePage={setPage} />

            </>
        )
    } else {
        body = (
            <>
                <Divider />
                {orders.map(order => (
                    <>
                        <div className="py-4">
                            <Grid container alignItems="center">
                                <OrderOverview order={order} />
                                <Grid
                                    item
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={2}
                                    className="text-center"
                                >
                                    <Button
                                        className='post-button'
                                        to={`/update-order/${order._id}`}
                                        as={Link}
                                    ><img src='https://cdn0.iconfinder.com/data/icons/ui-essence/32/_8ui-128.png' alt='edit' width='24' height='24' /></Button>
                                    <Button
                                        className='post-button'
                                        onClick={deletProductById.bind(this, order._id)}
                                    ><img src="https://cdn0.iconfinder.com/data/icons/ui-essence/32/_18ui-128.png" alt='delete' width='24' height='24' /></Button>
                                </Grid>
                            </Grid>
                        </div>
                    </>

                ))}

                <Divider className="mt-4 mb-6" />

                {page ? (
                    <Pagination page={page} pages={totalPages} changePage={setPage} />
                ) : (
                    <Pagination page={page} pages={pages} changePage={setPage} />
                )}

                <AddOrderModal />
            </>
        )
    }


    return (
        <div className="m-sm-30">
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    {/* <ProductOverview /> */}

                    <Card className="p-0">
                        <div className="mb-1 flex justify-between items-center">
                            <h4 className="font-medium">Quản lý hoá đơn</h4>
                        </div>

                        <Divider className="mb-6" />

                        <div className="flex mb-5 justify-between items-center h-full">
                            <div className="flex">
                                <Autocomplete
                                    options={[{ realname: "Tổng giá", _id: "" }, { realname: "Ngày tạo", _id: "" }]}
                                    getOptionLabel={(option) => option.realname}
                                    style={{ width: '12rem', marginRight: '2rem' }}
                                    // onChange={onChangeSelectTypeProduct}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Sắp xếp"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    )
                                    }
                                />
                                <Button variant='secondary' className="image8" to={'/orders/restore'} as={Link}>
                                    Khôi phục
                                </Button>
                            </div>


                            <div className="flex items-center">
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Tìm kiếm hoá đơn..."
                                    style={{ width: '20rem' }}
                                    onChange={({ target }) => setTimeout(() => {
                                        setSearch(target.value)
                                    }, 500)}


                                    InputProps={{
                                        startAdornment: (
                                            <Icon className="mr-3" fontSize="small">
                                                search
                                            </Icon>
                                        ),
                                    }}
                                />
                            </div>
                        </div>

                        <div className="overflow-auto">
                            <div className="min-w-600">
                                <div className="py-3">
                                    <Grid container>
                                        {/* <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Mã hoá đơn</h6>
                                        </Grid> */}
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Tên người mua</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Tổng giá</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Thanh toán</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Trạng thái</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Ngày tạo</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Thao tác</h6>
                                        </Grid>
                                    </Grid>
                                </div>

                                {body}
                            </div>
                        </div>
                    </Card>

                </Grid>
            </Grid>
            <OverlayTrigger
                placement='left'
                overlay={<Tooltip>Thêm hoá đơn mới</Tooltip>}
            >
                <Button
                    className='btn-floating'
                    onClick={setShowAddOrderModal.bind(this, true)}
                >
                    <img src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/53-256.png' alt='add-post' width='60' height='60' />
                </Button>
            </OverlayTrigger>
            <Toast
                show={show}
                style={{ position: 'fixed', top: '50%', left: '50%' }}
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null
                })}
                delay={1500}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default OrderManage
