import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../../../contexts/ProductContext'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios'

const AddCategoryModal = () => {
	// Contexts
	const {
        showAddCategoryModal,
		setShowAddCategoryModal,
        showUpdateCategoryModal,
		setShowUpdateCategoryModal,
		setShowToast
	} = useContext(ProductContext)

	const [validated, setValidated] = useState(false);



    const [newCategory, setNewCategory] = useState({
		realname: '',
		type: ''
	})

	const [select, setSelect] = useState("");
	const [imageinput, setImageinput] = useState("");
	const [categorystate, setCategorystate] = useState(0);
	const [previouscategoryProducts, setPreviouscategoryProducts] = useState("");
	const [typeProducts, setTypeProducts] = useState([]);
	const [categoryProducts, setCategoryProducts] = useState([]);

	// Add product
	const addProduct = async newCategory => {
		try {
			const response = await axios.post(`http://localhost:5000/api/products/categoryProduct/category`, newCategory)
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
			const response = await axios.get(`http://localhost:5000/api/products/categoryProduct/category?typeID=`)
			if (response.data.success) {
				setCategoryProducts(response.data.categoryProducts)
			}
		} catch (error) {
			setCategoryProducts([])
		}
	}

    const showUpdate = async () => {
		setShowUpdateCategoryModal(true)
	}


	useEffect(() => {
		getCategoryProducts("");
        getTypeProducts();
		setValidated(false);
	}, [showAddCategoryModal])

	// useEffect(() => {
	// 	getTypeProducts();
	// 	if (select !== "") {
	// 		getCategoryProducts(select);
	// 	} else {
	// 		getCategoryProducts("");
	// 	}
	// 	setCategorystate(1)
	// 	setPreviouscategoryProducts(categoryProducts)
	// }, [select])

    const { realname, type } = newCategory

	const onChangeNewProductForm = event => {
		setNewCategory({ ...newCategory, [event.target.name]: event.target.value })
	}

	const onChangeSelectNewProductForm = event => {
		setSelect(event.target.value)
		setNewCategory({ ...newCategory, [event.target.name]: event.target.value })
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
			setNewCategory({ ...newCategory, [e.target.name]: "" })
		}
	}

	const onSubmit = async event => {
		event.preventDefault()
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			// const formData = new FormData();
			// formData.append('realname', realname);
			// formData.append('type', type);
			// formData.append('category', category);
			// formData.append('status', status);
			// formData.append('discount', discount);
			// for (let i = 0; i < size.length; i++) {
			// 	formData.append('size', size[i]);
			// }
			// for (let i = 0; i < color.length; i++) {
			// 	formData.append('color', color[i]);
			// }
			// formData.append('cost', cost);
			// formData.append('description', description);
			// formData.append('image', image[0]);
			const { success, message } = await addProduct(newCategory)
			resetAddProductData()
			setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		}

		setValidated(true);
	}

	const resetAddProductData = () => {
		setNewCategory({ realname: '', type: '' })
		setShowAddCategoryModal(false)
		setImageinput("")
		setSelect("")
	}

	return (
		<Modal show={showAddCategoryModal} onHide={closeDialog} encType='multipart/form-data' dialogClassName="my-modal2" >
			<MDBContainer>
				<Modal.Header closeButton>
					<Modal.Title className="formtitle" >Thêm danh mục mới</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={onSubmit} id="add">
					<Modal.Body>
						<MDBRow>
							<MDBCol md="12">
								<Form.Group controlId="validationCustom01">
									<Form.Label>Tên danh mục</Form.Label>
									<Form.Control
										type='text'
										placeholder='Tên danh mục'
										name='realname'
										value={realname}
										required
										onBlur={checkallspace}
										onChange={onChangeNewProductForm}
										minLength={5}
										maxLength={30}
									/>
									<Form.Control.Feedback type="invalid">
										Chọn tên danh mục ít nhất 5 kí tự và không có kí tự đặc biệt
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom02">
									<Form.Label>Loại danh mục</Form.Label>
									<Form.Control
										as='select'
										id="type"
										name="type"
										required
										value={type}
										onChange={onChangeSelectNewProductForm} >
										<option value="" selected disabled hidden>Chọn loại danh mục</option>
										{typeProducts.map(typeProduct => (
											<option key={typeProduct._id} value={typeProduct._id}>
												{typeProduct.realname}
											</option>
										))}
									</Form.Control>
									<Form.Control.Feedback type="invalid">
										Chọn một loại danh mục
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

export default AddCategoryModal
