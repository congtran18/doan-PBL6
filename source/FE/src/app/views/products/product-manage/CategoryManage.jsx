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
import CategoryOverview from './CategoryOverview'
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
import AddCategoryModal from './AddCategoryModal'
import UpdateCategoryModal from './UpdateCategoryModal'
import Pagination from 'app/components/Pagination/Pagination'
import { Link } from 'react-router-dom'
import axios from 'axios'


const CategoryManage = () => {

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [indexpage, setIndexpage] = useState(0);
    const [previousproductslength, setPreviousproductslength] = useState("");
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [deletedProduct, setDeletedProduct] = useState(false);
    const [search, setSearch] = useState("");
    const [previoussearch, setPrevioussearch] = useState("");
    const [previoustype, setPrevioustype] = useState("");
    const [previouscategory, setPreviouscategory] = useState("");
    const [typeID, settypeID] = useState("");
    const [categoryID, setcategoryID] = useState("");
    const [typeProducts, setTypeProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [categoryId, setCategoryId] = useState({});

    const {
        showUpdateCategoryModal,
        setShowUpdateCategoryModal,
        showAddCategoryModal,
        setShowAddCategoryModal,
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

    const getCategoryProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/categoryProduct/category?typeId=")
            if (response.data.success) {
                setCategoryProducts(response.data.categoryProducts)
                setProductsLoading(false)
                console.log(response.data.categoryProducts)
            }
        } catch (error) {
            setCategoryProducts([])
            setProductsLoading(false)
        }
    }

    const showUpdate = async (_id) => {
        setCategoryId(_id)
        setShowUpdateCategoryModal(true)
    }

    // const getCategoryProducts = async (typeID) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/products/categoryProduct/category?typeID=${typeID}`)
    //         if (response.data.success) {
    //             setCategoryProducts(response.data.categoryProducts)
    //         }
    //     } catch (error) {
    //         setCategoryProducts([])
    //     }
    // }

    useEffect(() => {
        getCategoryProducts()
        setDeletedProduct(false)
    }, [showAddCategoryModal, deletedProduct, showUpdateCategoryModal])

    const getProducts = async (page, search, typeID, categoryID) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products?page=${page}&&filters=${search}&&types=${typeID}&&categories=${categoryID}`)
            setProducts(response.data.data)
            setTotalPages(response.data.pages)
            setProductsLoading(false)
        } catch (error) {
            setProducts([])
            setProductsLoading(false)
        }
    }

    // Delete product
    const deleteProduct = async productId => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/products/categoryProduct/category/${productId}`)
            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletProductById = async productId => {
        const confirmBox = window.confirm(
            "Bạn có chắc chắn muốn xoá danh mục?"
        )
        if (confirmBox === true) {
            const { success, message } = await deleteProduct(productId)
            setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
            setDeletedProduct(true)
        }
    }

    let body = null
    if (productsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else if (categoryProducts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Body>
                        <Card.Title>Không có danh mục</Card.Title>
                    </Card.Body>
                </Card>
                {/* <Pagination page={page} pages={pages} changePage={setPage} /> */}

            </>
        )
    } else {
        body = (
            <>
                <Divider />
                {categoryProducts.map(categoryProduct => (
                    <>
                        <div className="py-4">
                            <Grid container alignItems="center">
                                <CategoryOverview categoryProduct={categoryProduct} />
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
                                        // to={`/updateproduct/${categoryProduct._id}`}
                                        // as={Link}
                                        onClick={showUpdate.bind(this, categoryProduct)}
                                    ><img src='https://cdn0.iconfinder.com/data/icons/ui-essence/32/_8ui-128.png' alt='edit' width='24' height='24' /></Button>
                                    <Button
                                        className='post-button'
                                        onClick={deletProductById.bind(this, categoryProduct._id)}
                                    ><img src="https://cdn0.iconfinder.com/data/icons/ui-essence/32/_18ui-128.png" alt='delete' width='24' height='24' /></Button>
                                </Grid>
                            </Grid>
                        </div>
                    </>

                ))}

                <Divider className="mt-4 mb-6" />

                {/* {page ? (
                    <Pagination page={page} pages={totalPages} changePage={setPage} />
                ) : (
                    <Pagination page={page} pages={pages} changePage={setPage} />
                )} */}

                {/* <AddProductModal /> */}
                <AddCategoryModal />
                <UpdateCategoryModal categoryId={categoryId} />
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
                            <h4 className="font-medium">Quản lý danh mục sản phẩm</h4>
                        </div>

                        <Divider className="mb-6" />

                        <div className="flex mb-5 justify-between items-center h-full">
                                <Button variant='secondary' className="image8" to={'/category/restore'} as={Link}>
                                    Khôi phục
                                </Button>


                        </div>

                        <div className="overflow-auto">
                            <div className="min-w-600">
                                <div className="py-3">
                                    <Grid container>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Mã</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Tên</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Loại</h6>
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
                overlay={<Tooltip>Thêm danh mục mới</Tooltip>}
            >
                <Button
                    className='btn-floating'
                    onClick={setShowAddCategoryModal.bind(this, true)}
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

// const suggestions = [
//     { _id: '60e7ef4aef93d24450381105', type: 'áo', realname: 'áo thun' },
//     { _id: '60e7ef52ef93d24450381107', type: 'áo', realname: 'áo sơ mi' },
//     { _id: '60e7ef58ef93d24450381109', type: 'áo', realname: 'áo khoác' },
//     { _id: '60e7ef8def93d2445038110b', type: 'quần', realname: 'quần jean' },
//     { _id: '60e7ef93ef93d2445038110d', type: 'quần', realname: 'quần kaki' },
//     { _id: '60e7ef9eef93d2445038110f', type: 'quần', realname: 'quần lửng' },
//     { _id: '60e7efb2ef93d24450381111', type: 'giày dép', realname: 'giày da' },
//     { _id: '60e7efb7ef93d24450381113', type: 'giày dép', realname: 'giày bata' },
//     { _id: '60e7efd2ef93d24450381115', type: 'giày dép', realname: 'dép lê' },
// ]

export default CategoryManage
