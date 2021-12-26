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
import ProductOverview from './ProductOverview'
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
import AddProductModal from './AddProductModal'
import Pagination from 'app/components/Pagination/Pagination'
import { Link } from 'react-router-dom'
import axios from 'axios'


const ProductRestore = () => {

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

    const {
		showAddProductModal,
		setShowAddProductModal,
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

    const getProducts = async (page, search, typeID, categoryID) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/track-product/track?page=${page}&&filters=${search}&&types=${typeID}&&categories=${categoryID}`)
            if (response.data.data.length === 0) {
                setProductsLoading(true)
            }else{
                console.log(response)
                setProducts(response.data.data)
                setTotalPages(response.data.pages)
                setProductsLoading(false)
            }
        } catch (error) {
            setProducts([])
            setProductsLoading(false)
        }
    }

    // Delete product
    const deleteProduct = async productId => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/products/${productId}`)
            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const retoreProduct = async productId => {
        try {
            const response = await axios.put(`http://localhost:5000/api/products/track/${productId}`)
            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletProductById = async productId => {
        const confirmBox = window.confirm(
            "Bạn có chắc chắn muốn xoá sản phẩm?"
        )
        if (confirmBox === true) {
            const { success, message } = await deleteProduct(productId)
            setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
            setDeletedProduct(true)
        }
    }

    const retoreProductById = async productId => {
        const confirmBox = window.confirm(
            "Bạn có chắc chắn muốn khôi phục sản phẩm?"
        )
        if (confirmBox === true) {
            const { success, message } = await retoreProduct(productId)
            setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
            setDeletedProduct(true)
        }
    }


    // Start: Get all products

    useEffect(() =>{
		if(showAddProductModal === false || deletedProduct === true){
			getProducts(page,"","","");
			setPages(totalPages);
			setDeletedProduct(false)
		}
	}, [page,showAddProductModal,deletedProduct])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setcategoryID("");
            getTypeProducts();
            getCategoryProducts(typeID);
        }, 200)
        return () => {
            clearTimeout(timeout)
        }
    }, [typeID])


    useEffect(() => {
        if (search !== previoussearch || typeID !== previoustype || categoryID !== previouscategory) {
            setPage(1);
        }
        const timeout = setTimeout(() => {
            setPages(totalPages);
            getProducts(page, search, typeID, categoryID);
            setPrevioussearch(search);
            setPrevioustype(typeID);
            setPreviouscategory(categoryID);
        }, 200)
        return () => {
            clearTimeout(timeout)
        }
    }, [page, search, typeID, categoryID])


    let body = null

    if (productsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else if (products.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Body>
                        <Card.Title>Không có sản phẩm</Card.Title>
                    </Card.Body>
                </Card>
                <Pagination page={page} pages={pages} changePage={setPage} />

            </>
        )
    } else {
        body = (
            <>
                <Divider />
                {products.map(product => (
                <>
                <div className="py-4">
                <Grid container alignItems="center">
                <ProductOverview product={product} />
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
                        onClick={retoreProductById.bind(this, product._id)}
                    ><img src='https://cdn2.iconfinder.com/data/icons/files-and-folders-vol-2-2/48/folder_file_restore_recovery_encryption-256.png' alt='edit' width='24' height='24' /></Button>
                    <Button
                        className='post-button'
                        onClick={deletProductById.bind(this, product._id)}
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

                <AddProductModal />
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
                            <h4 className="font-medium">Khôi phục sản phẩm</h4>
                        </div>

                        <Divider className="mb-6" />

                        <div className="flex mb-5 justify-between items-center h-full">
                            <div className="flex">
                                <Autocomplete
                                    options={[{ realname: "Tất cả", _id: "" }, ...typeProducts]}
                                    getOptionLabel={(option) => option.realname}
                                    style={{ width: '12rem', marginRight: '2rem' }}
                                    onChange={onChangeSelectTypeProduct}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Thể loại"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    )
                                    }
                                />
                                <Autocomplete
                                    options={[{ realname: "Tất cả", _id: "" }, ...categoryProducts]}
                                    getOptionLabel={(option) => option.realname}
                                    style={{ width: '12rem' }}
                                    onChange={onChangeSelectCategoryProduct}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Kiểu"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    )
                                    }
                                />
                                <Button variant='secondary' className="image8"  to={'/products/manage'} as={Link}>
							        Quay lại
						        </Button>
                            </div>

                            <div className="flex items-center">
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Tìm kiếm sản phẩm..."
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
                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <h6 className="m-0 font-medium">
                                                Product Details
                                            </h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Phân loại</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Giá</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Vote sao</h6>
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
                overlay={<Tooltip>Add a new product</Tooltip>}
            >
                <Button
                    className='btn-floating'
                    onClick={setShowAddProductModal.bind(this, true)}
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
				delay={2000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
        </div>
    )
}

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

export default ProductRestore
