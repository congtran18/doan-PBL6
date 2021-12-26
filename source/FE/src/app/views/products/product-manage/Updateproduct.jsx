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

const Updateproduct = () => {
    const { productid } = useParams()
    const history = useHistory();

    const {
        setShowImagePreviewModal,
        setImagePreview,
        setShowToast
    } = useContext(ProductContext)

    const chooseProduct = async (id) => {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`)
        setDataUpdate(response.data.findProduct)
        setImageinput(response.data.findProduct.image)
        setType(response.data.findProduct.type._id)
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

    const updateProduct = async (_id, updatedProduct) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/products/${_id}`,
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

    const handleKeypress = (e) => {
        const characterCode = e.key
        if (characterCode === 'Backspace') return

        const characterNumber = Number(characterCode)
        if (characterNumber >= 0 && characterNumber <= 9) {
            if (e.currentTarget.value && e.currentTarget.value.length) {
                return
            } else if (characterNumber === 0) {
                e.preventDefault()
            }
        } else {
            e.preventDefault()
        }
    }

    const checkallspace = (e) => {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;//kiểm tra kí tự đặc biệt
        if (e.currentTarget.value.trim().length === 0 || e.currentTarget.value.trim().replace(/ /g, "").length < 5 || format.test(e.currentTarget.value) === true) {
            e.preventDefault();
            setDataUpdate({ ...dataUpdate, [e.target.name]: "" })
        }
    }

    const imagepreview = (index) => {
        setImagePreview(imageinput[index]);
        setShowImagePreviewModal(true);
    }

    const deleteimage = (index) => {
        imageupdated[index] = 'xoa'
        setImageupdated({ ...imageupdated })
        setImageinput(imageinput => ({ ...imageinput, [index]: undefined }))
    }



    const imageHandler = (index, e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageinput(imageinput => ({ ...imageinput, [index]: reader.result }))
            }
        }
        reader.readAsDataURL(e.target.files[0])
        imageupdated[index] = e.target.files[0]
        setImageupdated({ ...imageupdated })
    };

    useEffect(() => {
        if (dataUpdate === '') {
            setCategorystate(0)
            setSelect("")
            getTypeProducts();
            chooseProduct(productid)
            for (let i = 0; i < 5; i++) {
                imageupdated[i] = undefined
            }
        }
    }, [dataUpdate])


    useEffect(() => {
        // getTypeProducts();
        if (select !== "") {
            getCategoryProducts(select);
            setCategorystate(1)
        } else if (type !== '') {
            getCategoryProducts(type);
        }
        setPreviouscategoryProducts(categoryProducts)
    }, [select, type])


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


    // const closeDialog = () => {
    // 	setUpdatedProduct(product)
    // 	setValidated(false);
    // 	setCategorystate(0)	
    // 	setPreviouscategoryProducts("")
    // 	setImageinput([])
    // }

    const onSubmit = async event => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            for (let i = 0; i < 5; i++) {
                if (imageupdated[i] !== undefined && imageupdated[i] !== 'undefined' && imageupdated[i] !== 'xoa') {
                    dataUpdate.image[i] = imageupdated[i]
                } else if (imageupdated[i] === 'xoa') {
                    dataUpdate.image[i] = undefined
                }
            }
            const formData = new FormData();
            formData.append('realname', dataUpdate.realname);
            formData.append('code', dataUpdate.code);
            formData.append('status', dataUpdate.status);
            if (dataUpdate.type._id !== undefined) {
                formData.append('type', dataUpdate.type._id);
            } else {
                formData.append('type', dataUpdate.type);
            }
            if (dataUpdate.category._id !== undefined) {
                formData.append('category', dataUpdate.category._id);
            } else {
                formData.append('category', dataUpdate.category);
            }
            formData.append('cost', dataUpdate.cost);
            formData.append('description', dataUpdate.description);
            for (let i = 0; i < dataUpdate.size.length; i++) {
				formData.append('size', dataUpdate.size[i]);
			}
			for (let i = 0; i < dataUpdate.color.length; i++) {
				formData.append('color', dataUpdate.color[i]);
			}
            for (let i = 0; i < 5; i++) {
                if (dataUpdate.image[i] !== undefined && isFile(dataUpdate.image[i])) {
                    formData.append('image', dataUpdate.image[i])
                    formData.append('updateimage', 1)
                } else {
                    formData.append('image', dataUpdate.image[i]);
                    formData.append('updateimage', 0)
                    // console.log(product.image[i])
                }
            }
            const { success, message } = await updateProduct(dataUpdate._id, formData)
            setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
            setImageinput([])
            // setCategorystate(0)	
            // setPreviouscategoryProducts("")
            setTimeout(() => {
                history.push("/products/manage");
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
                                    <h4 className="font-medium">Cập nhật sản phẩm</h4>
                                </div>

                                <Divider className="mb-6" />
                                <MDBContainer>
                                    <Form noValidate validated={validated} onSubmit={onSubmit} id="add">
                                        <MDBRow>
                                            <MDBCol md="5">
                                                <Form.Group controlId="validationCustom01">
                                                    <Form.Label for="code">Mã sản phẩm</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        placeholder='Mã sản phẩm'
                                                        name='code'
                                                        required
                                                        value={dataUpdate.code}
                                                        onChange={onChangeUpdatedProductForm}
                                                        disabled
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="validationCustom02">
                                                    <Form.Label for="realname">Tên sản phẩm</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        placeholder='Tên sản phẩm'
                                                        name='realname'
                                                        required
                                                        value={dataUpdate.realname}
                                                        minLength={5}
                                                        maxLength={30}
                                                        onBlur={checkallspace}
                                                        onChange={onChangeUpdatedProductForm}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn tên sản phẩm từ 5 đến 30 kí tự
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="validationCustom03">
                                                    <Form.Label for="type">Loại sản phẩm</Form.Label>
                                                    <Form.Control as='select' onChange={onChangeSelectNewProductForm} id="type" name="type" form="add" defaultValue={(dataUpdate.type === undefined) ? "" : dataUpdate.type._id}>
                                                        {typeProducts.map(typeProduct => {
                                                            return (
                                                                <option key={typeProduct._id} value={typeProduct._id}>
                                                                    {typeProduct.realname}
                                                                </option>
                                                            )
                                                        })}
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn một loại sản phẩm
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="validationCustom04">
                                                    <Form.Label for="category">Danh mục sản phẩm</Form.Label>
                                                    <Form.Control as='select' onChange={onChangeUpdatedProductForm} id="category" name="category" form="add" value={(dataUpdate.category === undefined) ? "" : dataUpdate.category._id}>
                                                        {categoryProducts.map((categoryProduct, index) => {
                                                            if (index === 0 && categorystate === 1 && categoryProducts !== previouscategoryProducts) {
                                                                setDataUpdate({ ...dataUpdate, category: categoryProduct._id })
                                                                setCategorystate(0)
                                                            }
                                                            return (
                                                                <option key={categoryProduct.realname} value={categoryProduct._id} selected={index === 0}>
                                                                    {categoryProduct.realname}
                                                                </option>)
                                                        })}
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn một danh mục sản phẩm
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
                                                        <option value="Nổi bật" selected>Nổi bật</option>
                                                        <option value="Mới">Mới</option>
                                                        <option value="Bình thường">Bình thường</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn một danh mục sản phẩm
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="validationCustom05">
                                                    <Form.Label for="cost">Giá</Form.Label>
                                                    <Form.Control
                                                        type='number'
                                                        placeholder='Giá sản phẩm'
                                                        onKeyDown={handleKeypress}
                                                        name='cost'
                                                        value={dataUpdate.cost}
                                                        min="1000"
                                                        onChange={onChangeUpdatedProductForm}
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn giá sản phẩm 1000 trở lên
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="validationCustom06">
                                                    <Form.Label for="description">Mô tả</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        placeholder='Mô tả sản phẩm'
                                                        rows="3"
                                                        name='description'
                                                        value={dataUpdate.description}
                                                        onChange={onChangeUpdatedProductForm}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="validationCustom07">
                                                    <Form.Label>
                                                        Chọn ảnh minh hoạ:
                                                    </Form.Label>
                                                    <div className="img-holder">
                                                        <img src={imageinput[0]} alt="" id="img" className="img" />
                                                    </div>
                                                    <Form.Control type="file" accept=".png, .jpg, .jpeg" name="image" id="file" onChange={(e) => imageHandler(0, e)} />
                                                    <div className="label-image">
                                                        <Form.Label className="image-upload" htmlFor="file">
                                                            Chọn file ảnh
                                                        </Form.Label>
                                                    </div>
                                                    <Form.Control.Feedback className="text-center" type="invalid">
                                                        Chọn ảnh cho sản phẩm
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </MDBCol>
                                            <MDBCol md="7">
                                                <Form.Group controlId="validationCustom02">
                                                    <Form.Label for="realname">Giảm giá %</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        placeholder='% Giảm giá'
                                                        name='discount'
                                                        required
                                                        value={dataUpdate.discount}
                                                        // minLength={5}
                                                        // maxLength={30}
                                                        // onBlur={checkallspace}
                                                        onChange={onChangeUpdatedProductForm}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Chọn % Giảm giá
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group style={{ marginTop: '20px' }}>
                                                    <Form.Label>Size</Form.Label>
                                                    <Typeahead
                                                        id="basic-typeahead-multiple"
                                                        labelKey="Size"
                                                        multiple
                                                        onChange={onChangeUpdatedProductFormSize}
                                                        options={['S', 'M', 'XL', 'XXL', 'XXXL', '35', '36', '40', '41', '42', '43']}
                                                        placeholder="Chọn danh sách size..."
                                                        selected={dataUpdate.size}
                                                    />
                                                </Form.Group>
                                                <Form.Group style={{ marginTop: '20px' }}>
                                                    <Form.Label>Màu sắc</Form.Label>
                                                    <Typeahead
                                                        id="basic-typeahead-multiple"
                                                        labelKey="name"
                                                        multiple
                                                        onChange={onChangeUpdatedProductFormColor}
                                                        options={['trang', 'den', 'vang', 'do', 'xanh', 'hong']}
                                                        placeholder="Chọn danh sách màu..."
                                                        selected={dataUpdate.color}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Chọn slide ảnh minh hoạ:
                                                    </Form.Label>
                                                    <div className="flex-container">
                                                        {numberimageslide.map((numberimageslide, index) => {
                                                            return (
                                                                <div>
                                                                    <div className="img-holder">
                                                                        <img src={((imageinput[numberimageslide] !== 'undefined') ? (imageinput[numberimageslide]) : "")} alt="" id="img" className="img" />
                                                                        <div className="overlay-image" hidden={(imageinput[numberimageslide] !== 'undefined' && imageinput[numberimageslide] !== undefined) ? '' : 'hiden'}></div>
                                                                        <div className="button-image-view">
                                                                            <Button className='post-button' hidden={(imageinput[numberimageslide] !== 'undefined' && imageinput[numberimageslide] !== undefined) ? '' : 'hiden'} onClick={imagepreview.bind(this, numberimageslide)}>
                                                                                <img src="https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-21-128.png" alt='view' width='45' height='45' />
                                                                            </Button>
                                                                        </div>
                                                                        <div className="button-image-delete">
                                                                            <Button className='post-button' hidden={(imageinput[numberimageslide] !== 'undefined' && imageinput[numberimageslide] !== undefined) ? '' : 'hiden'} onClick={deleteimage.bind(this, numberimageslide)}>
                                                                                <img src="https://cdn4.iconfinder.com/data/icons/email-2-2/32/Trash-Email-Bin-128.png" alt='trash' width='45' height='45' />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                    <Form.Control type="file" accept=".png, .jpg, .jpeg" name={fileimageslide[index]} id={fileimageslide[index]} onChange={(e) => imageHandler(numberimageslide, e)} />
                                                                    <div className="label-image">
                                                                        <Form.Label className="image-upload" htmlFor={fileimageslide[index]}>
                                                                            Chọn file ảnh {numberimageslide}
                                                                        </Form.Label>
                                                                    </div>
                                                                </div>)
                                                        })}
                                                    </div>
                                                </Form.Group>
                                            </MDBCol>
                                        </MDBRow>
                                        <Button variant='secondary' className="centerall1" to={'/products/manage'} as={Link}>
                                            Cancel!
                                        </Button>
                                        <Button variant='primary' type='submit' className="centerall">
                                            Save!
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

export default Updateproduct
