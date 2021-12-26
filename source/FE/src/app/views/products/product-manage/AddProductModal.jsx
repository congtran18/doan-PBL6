import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../../../contexts/ProductContext'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios'

const AddProductModal = () => {
	// Contexts
	const {
		showAddProductModal,
		setShowAddProductModal,
		setShowToast
	} = useContext(ProductContext)

	const [validated, setValidated] = useState(false);


	// State
	const [newProduct, setNewProduct] = useState({
		realname: '',
		type: '',
		category: '',
		cost: '',
		status: '',
		description: '',
		discount: '',
		image: [],
		color: [],
		size: []
	})

	const [select, setSelect] = useState("");
	const [imageinput, setImageinput] = useState("");
	const [categorystate, setCategorystate] = useState(0);
	const [previouscategoryProducts, setPreviouscategoryProducts] = useState("");
	const [typeProducts, setTypeProducts] = useState([]);
	const [categoryProducts, setCategoryProducts] = useState([]);

	// Add product
	const addProduct = async newProduct => {
		try {
			const response = await axios.post(`http://localhost:5000/api/products`, newProduct)
			if (response.data.success) {
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}


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


	const imageHandler = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setImageinput(reader.result)
			}
		}
		reader.readAsDataURL(e.target.files[0])
		newProduct.image[0] = e.target.files[0]
		setNewProduct({ ...newProduct });
	};

	useEffect(() => {
		getCategoryProducts("");
		setValidated(false);
	}, [showAddProductModal])

	useEffect(() => {
		getTypeProducts();
		if (select !== "") {
			getCategoryProducts(select);
		} else {
			getCategoryProducts("");
		}
		setCategorystate(1)
		setPreviouscategoryProducts(categoryProducts)
	}, [select])

	const { realname, type, category, status, cost, description, discount, image, color, size } = newProduct

	const onChangeNewProductForm = event => {
		setNewProduct({ ...newProduct, [event.target.name]: event.target.value })
	}

	const onChangeNewProductFormSize = (input, e) => {
		setNewProduct({ ...newProduct, size: [...input] })
	}

	const onChangeNewProductFormColor = (input, e) => {
		setNewProduct({ ...newProduct, color: [...input] })
	}

	const onChangeSelectNewProductForm = event => {
		setSelect(event.target.value)
		setNewProduct({ ...newProduct, [event.target.name]: event.target.value })
	}

	const closeDialog = () => {
		resetAddProductData();
		// setValidated(false);
		setCategorystate(0)
		setPreviouscategoryProducts("")
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
			setNewProduct({ ...newProduct, [e.target.name]: "" })
		}
	}

	const onSubmit = async event => {
		event.preventDefault()
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			const formData = new FormData();
			formData.append('realname', realname);
			formData.append('type', type);
			formData.append('category', category);
			formData.append('status', status);
			formData.append('discount', discount);
			for (let i = 0; i < size.length; i++) {
				formData.append('size', size[i]);
			}
			for (let i = 0; i < color.length; i++) {
				formData.append('color', color[i]);
			}
			formData.append('cost', cost);
			formData.append('description', description);
			formData.append('image', image[0]);
			const { success, message } = await addProduct(formData)
			resetAddProductData()
			setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		}

		setValidated(true);
	}

	const resetAddProductData = () => {
		setNewProduct({ realname: '', type: '', status: '', category: '', cost: '', description: '', image: [] })
		setShowAddProductModal(false)
		setImageinput("")
		setSelect("")
	}

	return (
		<Modal show={showAddProductModal} onHide={closeDialog} encType='multipart/form-data' dialogClassName="my-modal" >
			<MDBContainer>
				<Modal.Header closeButton>
					<Modal.Title className="formtitle" >Thêm sản phẩm mới</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={onSubmit} id="add">
					<Modal.Body>
						<MDBRow>
							<MDBCol md="6">
								<Form.Group controlId="validationCustom01">
									<Form.Label>Tên sản phẩm</Form.Label>
									<Form.Control
										type='text'
										placeholder='Tên sản phẩm'
										name='realname'
										value={realname}
										required
										onBlur={checkallspace}
										onChange={onChangeNewProductForm}
										minLength={5}
										maxLength={30}
									/>
									<Form.Control.Feedback type="invalid">
										Chọn tên sản phẩm ít nhất 5 kí tự và không có kí tự đặc biệt
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom02">
									<Form.Label>Loại sản phẩm</Form.Label>
									<Form.Control
										as='select'
										id="type"
										name="type"
										required
										value={type}
										onChange={onChangeSelectNewProductForm} >
										<option value="" selected disabled hidden>Chọn loại sản phẩm</option>
										{typeProducts.map(typeProduct => (
											<option key={typeProduct._id} value={typeProduct._id}>
												{typeProduct.realname}
											</option>
										))}
									</Form.Control>
									<Form.Control.Feedback type="invalid">
										Chọn một loại sản phẩm
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom03">
									<Form.Label>Danh mục sản phẩm</Form.Label>
									<Form.Control
										as='select'
										id="category"
										name="category"
										required
										value={category}
										onChange={onChangeNewProductForm}
									>
										{/* <option value="" selected disabled hidden>Chọn danh mục sản phẩm</option> */}
										{categoryProducts.map((categoryProduct, index) => {
											if (index === 0 && categorystate === 1 && categoryProducts !== previouscategoryProducts) {
												setNewProduct({ ...newProduct, category: categoryProduct._id })
												setCategorystate(0)
												// console.log(categoryProduct.realname)
											}
											return (
												<option key={categoryProduct._id} value={categoryProduct._id}>
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
										value={status}
										onChange={onChangeNewProductForm}
									>
										<option value="Nổi bật" selected>Nổi bật</option>
										<option value="Mới">Mới</option>
										<option value="Bình thường">Bình thường</option>
									</Form.Control>
									<Form.Control.Feedback type="invalid">
										Chọn một danh mục sản phẩm
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom04">
									<Form.Label>Giá</Form.Label>
									<Form.Control
										type='number'
										placeholder='Giá sản phẩm'
										required
										name='cost'
										onKeyDown={handleKeypress}
										value={cost}
										min="1000"
										onChange={onChangeNewProductForm}
									/>
									<Form.Control.Feedback type="invalid">
										Chọn giá sản phẩm 1000 trở lên
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom05">
									<Form.Label>Mô tả</Form.Label>
									<Form.Control
										as='textarea'
										rows={3}
										placeholder='Mô tả sản phẩm'
										name='description'
										value={description}
										onChange={onChangeNewProductForm}
									/>
									<Form.Control.Feedback type="invalid">
										Chọn giá sản phẩm 1000 trở lên
									</Form.Control.Feedback>
								</Form.Group>
							</MDBCol>
							<MDBCol md="6">
								<Form.Group controlId="validationCustom01">
									<Form.Label>% Giảm Giá</Form.Label>
									<Form.Control
										type='text'
										placeholder='% Giảm giá'
										name='discount'
										value={discount}
										required
										onChange={onChangeNewProductForm}
									/>
									<Form.Control.Feedback type="invalid">
										Chọn % giảm giá
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group style={{ marginTop: '20px' }}>
									<Form.Label>Size</Form.Label>
									<Typeahead
										id="basic-typeahead-multiple"
										labelKey="Size"
										multiple
										onChange={onChangeNewProductFormSize}
										options={['S', 'M', 'XL', 'XXL', 'XXXL', '35', '36', '40', '41', '42', '43']}
										placeholder="Chọn danh sách size..."
									// selected={multiSelections}
									/>
								</Form.Group>
								<Form.Group style={{ marginTop: '20px' }}>
									<Form.Label>Màu sắc</Form.Label>
									<Typeahead
										id="basic-typeahead-multiple"
										labelKey="name"
										multiple
										onChange={onChangeNewProductFormColor}
										options={['trang', 'den', 'vang', 'do', 'xanh', 'hong']}
										placeholder="Chọn danh sách màu..."
									// selected={multiSelections}
									/>
								</Form.Group>
								<Form.Group controlId="validationCustom06">
									<Form.Label>
										Chọn ảnh minh hoạ:
									</Form.Label>
									<div className="img-holder">
										<img src={imageinput} alt="" id="img" className="img" />
									</div>
									<Form.Control type="file" accept=".png, .jpg, .jpeg" name="image" id="file" onChange={imageHandler} required />
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
						</MDBRow>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={closeDialog}>
							Cancel
						</Button>
						<Button variant='primary' type='submit'>
							Save!
						</Button>
					</Modal.Footer>
				</Form>
			</MDBContainer>
		</Modal>
	)
}

export default AddProductModal
