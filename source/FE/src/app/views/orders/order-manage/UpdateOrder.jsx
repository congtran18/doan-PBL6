import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ProductContext } from 'app/contexts/ProductContext'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import viewIcon from '../../assets/eye.png'
// import trashIcon from '../../assets/trash.png'
import Spinner from 'react-bootstrap/Spinner'
import { useHistory, useParams } from 'react-router-dom'
import ImagePreviewModal from './ImagePreviewModal'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom'
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
import moment from 'moment'
import OrderItem from './OrderItem'
import OrderOverview from './OrderOverview'

const UpdateOrder = () => {
    const { orderid } = useParams()
    const history = useHistory();

    const {
        setShowImagePreviewModal,
        setImagePreview,
        setShowToast
    } = useContext(ProductContext)

    const chooseProduct = async (id) => {
        const response = await axios.get(`http://localhost:5000/api/admin-order/${id}`)
        setDataUpdate(response.data)
        // setImageinput(response.data.findProduct.image)
        // setType(response.data.findProduct.type._id)
        setLoadapi(false)
        return dataUpdate
    }

    const [loadapi, setLoadapi] = useState(true);
    const [dataUpdate, setDataUpdate] = useState("")
    const [imageupdated, setImageupdated] = useState([]);
    const [validated, setValidated] = useState(false);
    const [select, setSelect] = useState("");
    const [categorystate, setCategorystate] = useState(0);
    const [previouscategoryProducts, setPreviouscategoryProducts] = useState("");
    const [imageinput, setImageinput] = useState([]);
    const numberimageslide = [1, 2, 3, 4];
    const fileimageslide = ["file1", "file2", "file3", "file4"];
    const [typeProducts, setTypeProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [type, setType] = useState('')

    // State
    const getTypeProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/typeProduct/type`)
            if (response.data.success) {
                setTypeProducts(response.data.typeProducts)
            }
        } catch (error) {
            setTypeProducts([])
        }
    }

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

    const updateProduct = async (_id, updatedProduct) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/admin-order/admin-update/${_id}`,
                updatedProduct
            )
            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    useEffect(() => {
        if (dataUpdate === '') {
            // setCategorystate(0)
            // setSelect("")
            // getTypeProducts();
            chooseProduct(orderid)
            // for (let i = 0; i < 5; i++) {
            //     imageupdated[i] = undefined
            // }
        }
        console.log(dataUpdate)
    }, [dataUpdate])


    // useEffect(() => {
    //     // getTypeProducts();
    //     if (select !== "") {
    //         getCategoryProducts(select);
    //         setCategorystate(1)
    //     } else if (type !== '') {
    //         getCategoryProducts(type);
    //     }
    //     setPreviouscategoryProducts(categoryProducts)
    // }, [select, type])


    const isFile = input => {
        if ('File' in window && input instanceof File)
            return true;
        else return false;
    }

    const onChangeSelectNewProductForm = event => {
        setSelect(event.target.value)
        setDataUpdate({ ...dataUpdate, [event.target.name]: event.target.value })
        // setNewProduct({ ...newProduct, [event.target.name]: event.target.value })
    }

    const onChangeUpdatedProductForm = event => {
        setDataUpdate({ ...dataUpdate, [event.target.name]: event.target.value })
    }

    const onChangeUpdatedProductFormSize = (input, e) => {
        setDataUpdate({ ...dataUpdate, size: [...input] })
    }
    const onChangeUpdatedProductFormColor = (input, e) => {
        setDataUpdate({ ...dataUpdate, color: [...input] })
    }

    const onSubmit = async event => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // for (let i = 0; i < 5; i++) {
            //     if (imageupdated[i] !== undefined && imageupdated[i] !== 'undefined' && imageupdated[i] !== 'xoa') {
            //         dataUpdate.image[i] = imageupdated[i]
            //     } else if (imageupdated[i] === 'xoa') {
            //         dataUpdate.image[i] = undefined
            //     }
            // }
            // const formData = new FormData();
            // formData.append('realname', dataUpdate.realname);
            // formData.append('code', dataUpdate.code);
            // formData.append('status', dataUpdate.status);
            // if (dataUpdate.type._id !== undefined) {
            //     formData.append('type', dataUpdate.type._id);
            // } else {
            //     formData.append('type', dataUpdate.type);
            // }
            // if (dataUpdate.category._id !== undefined) {
            //     formData.append('category', dataUpdate.category._id);
            // } else {
            //     formData.append('category', dataUpdate.category);
            // }
            // formData.append('cost', dataUpdate.cost);
            // formData.append('description', dataUpdate.description);
            // for (let i = 0; i < dataUpdate.size.length; i++) {
            //     formData.append('size', dataUpdate.size[i]);
            // }
            // for (let i = 0; i < dataUpdate.color.length; i++) {
            //     formData.append('color', dataUpdate.color[i]);
            // }
            // for (let i = 0; i < 5; i++) {
            //     if (dataUpdate.image[i] !== undefined && isFile(dataUpdate.image[i])) {
            //         formData.append('image', dataUpdate.image[i])
            //         formData.append('updateimage', 1)
            //     } else {
            //         formData.append('image', dataUpdate.image[i]);
            //         formData.append('updateimage', 0)
            //         // console.log(product.image[i])
            //     }
            // }
            const { success, message } = await updateProduct(dataUpdate._id, dataUpdate)
            setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
            setImageinput([])
            setTimeout(() => {
                history.push("/orders/manage");
            }, 200);
        }
        setValidated(true);
    }

    let body = null

    if (loadapi) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else {
        body = (
            <>
                <div className="m-sm-30">
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            {/* <ProductOverview /> */}

                            <Card className="p-0">
                                <div className="mb-1 flex justify-between items-center">
                                    <h4 className="font-medium">Cập nhật hoá đơn</h4>
                                </div>

                                <Divider className="mb-6" />
                                <MDBContainer>
                                    <Form noValidate validated={validated} onSubmit={onSubmit} id="add">
                                        <MDBRow>
                                            <MDBCol md="8">
                                                <div>
                                                    <span>Mã hoá đơn: </span>
                                                    <span><b>&nbsp;{dataUpdate._id}</b></span>
                                                </div>
                                                <div>
                                                    <span>Tên người mua: </span>
                                                    <span><b>&nbsp;{dataUpdate.realname ? dataUpdate.realname : dataUpdate.user.name}</b></span>
                                                </div>
                                                <div>
                                                    <span>Số điện thoại: </span>
                                                    <span><b>&nbsp;{dataUpdate.shippingAddress.mobile ? dataUpdate.shippingAddress.mobile : dataUpdate.mobile}</b></span>
                                                </div>
                                                <div>
                                                    <span>Phương thức thanh toán: </span>
                                                    <span><b>&nbsp;{dataUpdate.paymentMethod}</b></span>
                                                </div>
                                                <div>
                                                    <span>Cập nhật: </span>
                                                    <span><b>&nbsp;Ngày&nbsp;{moment(new Date(dataUpdate.updatedAt)).format('DD/MM/YYYY')}&nbsp;lúc&nbsp;{moment(new Date(dataUpdate.updatedAt)).format('HH:mm:ss')}</b></span>
                                                </div>
                                                <br />
                                                <div>
                                                    <div className="py-4">
                                                        <Grid container alignItems="center">
                                                            <Grid
                                                                item
                                                                lg={3}
                                                                md={3}
                                                                sm={3}
                                                                xs={3}
                                                            // className="text-center"
                                                            >
                                                                <h6 className="m-0 text-15">Hình ảnh</h6>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                lg={2}
                                                                md={2}
                                                                sm={2}
                                                                xs={2}
                                                                className="text-center"
                                                            >
                                                                <h6 className="m-0 text-15">Tên </h6>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                lg={2}
                                                                md={2}
                                                                sm={2}
                                                                xs={2}
                                                                className="text-center"
                                                            >
                                                                <h6 className="m-0 text-15">Số lượng</h6>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                lg={1}
                                                                md={1}
                                                                sm={1}
                                                                xs={1}
                                                                className="text-center"
                                                            >
                                                                <h6 className="m-0 text-15">Size</h6>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                lg={2}
                                                                md={2}
                                                                sm={2}
                                                                xs={2}
                                                                className="text-center"
                                                            >
                                                                <h6 className="m-0 text-15">Màu sắc</h6>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                lg={2}
                                                                md={2}
                                                                sm={2}
                                                                xs={2}
                                                                className="text-center"
                                                            >
                                                                <h6 className="m-0 text-15">Đơn giá</h6>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    < Divider />
                                                    {dataUpdate.orderItems && dataUpdate.orderItems.map(orderItem => (
                                                        <>
                                                            <div className="py-4">
                                                                <Grid container alignItems="center">
                                                                    <OrderItem orderItem={orderItem} />
                                                                </Grid>
                                                            </div>
                                                        </>

                                                    ))}
                                                </div>
                                                {/* <div className="py-4">
                                                    <Grid container alignItems="center">
                                                        <orderItem orderItem={dataUpdate.orderItem[0]} />
                                                    </Grid>
                                                </div> */}
                                            </MDBCol>
                                            <MDBCol md="4">
                                                <Form.Group controlId="validationCustom03">
                                                    <Form.Label>Thanh toán</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        id="isPaid"
                                                        name="isPaid"
                                                        required
                                                        value={dataUpdate.isPaid}
                                                        onChange={onChangeUpdatedProductForm}
                                                    >
                                                        <option value={true} selected>Đã thanh toán</option>
                                                        <option value={false}>Chưa thanh toán</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn trạng thái thanh toán
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="validationCustom03">
                                                    <Form.Label>Vận chuyển</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        id="isDelivered"
                                                        name="isDelivered"
                                                        required
                                                        value={dataUpdate.isDelivered}
                                                        onChange={onChangeUpdatedProductForm}
                                                    >
                                                        <option value={true} selected>Đã vận chuyển đến</option>
                                                        <option value={false}>Chưa vận chuyển đến</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn trạng thái vận chuyển
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="validationCustom03">
                                                    <Form.Label>Trạng thái</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        id="status"
                                                        name="status"
                                                        required
                                                        value={dataUpdate.status}
                                                        onChange={onChangeUpdatedProductForm}
                                                    >
                                                        <option value="Chuẩn bị hàng" selected>Chuẩn bị hàng</option>
                                                        <option value="Đang giao">Đang giao</option>
                                                        <option value="Thành công">Thành công</option>
                                                        <option value="Đã huỷ">Đã huỷ</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn trạng thái đơn hàng
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                < br />
                                                <div style={{ display: 'flex', fontsize: '80px', justifyContent: 'center' }}>
                                                    {/* <span style={{ fontsize: '180px' }} className="fontsize1" >Tổng giá: </span> */}
                                                    <span className="fontsize2"><b>Tổng giá:&nbsp;{costFormat(dataUpdate.totalPrice)}đ</b></span>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                        <Button variant='secondary' className="centerall1" to={'/orders/manage'} as={Link}>
                                            Quay lại!
                                        </Button>
                                        <Button variant='primary' type='submit' className="centerall">
                                            Lưu!
                                        </Button>
                                    </Form>
                                </MDBContainer>
                            </Card>

                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }


    return (
        <>
            {body}
            <ImagePreviewModal />
        </>
    )
}

export default UpdateOrder
