import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect, useRef } from 'react'
import { ProductContext } from '../../../contexts/ProductContext'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios'

const AddOrderModal = () => {
	// Contexts
	const {
		showAddOrderModal,
		setShowAddOrderModal,
		setShowToast
	} = useContext(ProductContext)

	const [validated, setValidated] = useState(false);


	// State
	const [newOrder, setNewOrder] = useState({
		realname: '',
		mobile: '',
		orderItems: [{
		'code': '',
		'qty': '',
		'size': '',
		'color': ''
	}],
		totalPrice: '',
		isPaid: true,
		isDelivered: true,
	})

	const [select, setSelect] = useState("");
	const [imageinput, setImageinput] = useState("");
	const [categorystate, setCategorystate] = useState(0);
	const [previouscategoryProducts, setPreviouscategoryProducts] = useState("");
	const [typeProducts, setTypeProducts] = useState([]);
	const [categoryProducts, setCategoryProducts] = useState([]);
	const [count, setCount] = useState(['1']);
	const orderItems1 = useRef([{
		'code': '',
		'qty': '',
		'size': '',
		'color': ''
	}]);
	// orderItems1.current = [
	// 	{
	// 		'code': '',
	// 		'qty': '',
	// 		'size': '',
	// 		'color': ''
	// 	}
	// ];

	const updateForm = () => {
		setCount([...count, (parseInt(count[count.length] + 1)).toString()])
		orderItems1.current.push(
			{
				'code': '',
				'qty': '',
				'size': '',
				'color': ''
			}
		)
		setNewOrder({ ...newOrder, orderItems: orderItems1 }) 
		console.log(orderItems.current);
	}

	// Add product
	const addOrder = async newOrder => {
		try {
			const response = await axios.post(`http://localhost:5000/api/admin-order`, newOrder)
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


	// const imageHandler = (e) => {
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 		if (reader.readyState === 2) {
	// 			setImageinput(reader.result)
	// 		}
	// 	}
	// 	reader.readAsDataURL(e.target.files[0])
	// 	newProduct.image[0] = e.target.files[0]
	// 	setNewProduct({ ...newProduct });
	// };

	useEffect(() => {
		getCategoryProducts("");
		setValidated(false);
	}, [setShowAddOrderModal, count])

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

	const { realname, mobile, orderItems, totalPrice, isPaid, isDelivered } = newOrder

	const onChangeNewOrderForm = event => {
		setNewOrder({ ...newOrder, [event.target.name]: event.target.value })
	}

	const onChangeNewOrderFormItemId = (event, index) => {
		orderItems1.current[index].code = event.target.value
		setNewOrder({ ...newOrder, orderItems : orderItems1.current })
	}

	const onChangeNewOrderFormItemQty = (event, index) => {
		orderItems1.current[index].qty = event.target.value
		setNewOrder({ ...newOrder, orderItems : orderItems1.current })
	}

	const onChangeNewOrderFormItemSize = (event, index) => {
		orderItems1.current[index].size = event.target.value
		setNewOrder({ ...newOrder, orderItems : orderItems1.current })
	}

	const onChangeNewOrderFormItemColor = (event, index) => {
		orderItems1.current[index].color = event.target.value
		setNewOrder({ ...newOrder, orderItems : orderItems1.current })
	}

	const getCodeProduct = async (code) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/code/${code}`)
			console.log(response.data.findProduct)
			if (response.data.success) {
            	return response.data.findProduct 
			}else{
				return {}
			}
        } catch (error) {
			console.log("co loi")
            // setOrders([])
            // setOrdersLoading(false)
        }
    }

	const closeDialog = () => {
		resetAddOrderData();
		setCount(['1'])
			orderItems1.current = [
		{
			'code': '',
			'qty': '',
			'size': '',
			'color': ''
		}
	];
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
			setNewOrder({ ...newOrder, [e.target.name]: "" })
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
			// formData.append('mobile', mobile);
			// for (let i = 0; i < orderItems.length; i++) {
			// 	formData.append('orderItems', orderItems[i]);
			// }
			// formData.append('totalPrice', '2000');
			// formData.append('isPaid', isPaid);
			// formData.append('isDelivered', isDelivered);
			let totalPrice = 0;
			for(let i = 0; i < orderItems1.current.length; i++){
				const data = await getCodeProduct(orderItems1.current[i].code)
				orderItems1.current[i] = {...orderItems1.current[i], ...{_id : data && data._id}}
				orderItems1.current[i] = {...orderItems1.current[i], ...{realname : data && data.realname}}
				orderItems1.current[i] = {...orderItems1.current[i], ...{image : data && data.image[0]}}
				orderItems1.current[i] = {...orderItems1.current[i], ...{cost : data && data.cost}}
				setNewOrder({ ...newOrder, orderItems: orderItems1.current })
				totalPrice =  ( parseInt(totalPrice) + parseInt(orderItems1.current[i].cost) * parseInt(orderItems1.current[i].qty)).toString()
			}

			console.log(newOrder)
			const { success, message } = await addOrder({...newOrder, ...{totalPrice : totalPrice}})
			resetAddOrderData()
			setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		}

		setValidated(true);
	}

	const resetAddOrderData = () => {
		setNewOrder({ realname: '', mobile: '', orderItems: [{
			'code': '',
			'qty': '',
			'size': '',
			'color': ''
		}], totalPrice: '', isPaid: true, isDelivered: true })
		setShowAddOrderModal(false)
	}

	return (
		<Modal show={showAddOrderModal} onHide={closeDialog} encType='multipart/form-data' dialogClassName="my-modal3" >
			<MDBContainer>
				<Modal.Header closeButton>
					<Modal.Title className="formtitle" >Thêm hoá đơn mới</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={onSubmit} id="add">
					<Modal.Body>
						<MDBRow>
							<MDBCol md="6">
								<Form.Group controlId="validationCustom01">
									<Form.Label>Tên khách hàng</Form.Label>
									<Form.Control
										type='text'
										placeholder='Tên khách hàng'
										name='realname'
										value={realname}
										required
										onBlur={checkallspace}
										onChange={onChangeNewOrderForm}
										minLength={5}
										maxLength={30}
									/>
									<Form.Control.Feedback type="invalid">
										Chọn tên sản phẩm ít nhất 5 kí tự và không có kí tự đặc biệt
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom04">
									<Form.Label>Số điện thoại</Form.Label>
									<Form.Control
										type='number'
										placeholder='Số điện thoại'
										required
										name='mobile'
										onKeyDown={handleKeypress}
										value={mobile}
										min="1000"
										onChange={onChangeNewOrderForm}
									/>
									<Form.Control.Feedback type="invalid">
										Chọn Số điện thoại của khách hàng
									</Form.Control.Feedback>
									< br />
									<Button variant='dark' onClick={updateForm}>
										Thêm sản phẩm
									</Button>
								</Form.Group>
								</MDBCol>
							{/* <MDBCol md="6">

							</MDBCol> */}
						</MDBRow>
								{/* < br/>
									<Button variant='dark' onClick={updateForm}>
										Thêm sản phẩm		
									</Button>
									< br/> */}
								{count.map((count, index) => {
									return (
										<MDBRow>
											<MDBCol md="4">
												<Form.Group controlId="validationCustom01">
													<Form.Label>Mã sản phẩm<span>&nbsp;&nbsp;{index}</span></Form.Label>
													<Form.Control
														type='text'
														placeholder='Mã sản phẩm'
														name='code'
														required
														value = {orderItems[index] && orderItems[index].code}
														onChange={e => onChangeNewOrderFormItemId(e , index)}
														minLength={5}
														maxLength={30}
													/>
													<Form.Control.Feedback type="invalid">
														Chọn mã sản phẩm
													</Form.Control.Feedback>
												</Form.Group>
											</MDBCol>
											<MDBCol md="2">
												<Form.Group controlId="validationCustom01">
													<Form.Label>Số lượng</Form.Label>
													<Form.Control
														type='text'
														placeholder='...'
														name='qty'
														value = {orderItems[index] && orderItems[index].qty}
														required
														onChange={e => onChangeNewOrderFormItemQty(e , index)}
													/>
													<Form.Control.Feedback type="invalid">
														Chọn số lượng
													</Form.Control.Feedback>
												</Form.Group>
											</MDBCol>
											<MDBCol md="2">
												<Form.Group controlId="validationCustom01">
													<Form.Label>Size</Form.Label>
													<Form.Control
														type='text'
														placeholder='...'
														name='Size'
														value = {orderItems[index] && orderItems[index].size}
														required
														onChange={e => onChangeNewOrderFormItemSize(e , index)}
													/>
													<Form.Control.Feedback type="invalid">
														Chọn size
													</Form.Control.Feedback>
												</Form.Group>
											</MDBCol>
											<MDBCol md="2">
												<Form.Group controlId="validationCustom01">
													<Form.Label>Màu sắc</Form.Label>
													<Form.Control
														type='text'
														placeholder='...'
														name='color'
														value = {orderItems[index] && orderItems[index].color}
														required
														onChange={e => onChangeNewOrderFormItemColor(e , index)}
													/>
													<Form.Control.Feedback type="invalid">
														Chọn màu sắc
													</Form.Control.Feedback>
												</Form.Group>
											</MDBCol>
										</MDBRow>
									)
								})}
								<Form.Group controlId="validationCustom04">
									<Form.Label>Tổng Giá</Form.Label>
								</Form.Group>
								<Form.Group controlId="validationCustom04">
									<Form.Label><div>{0}</div></Form.Label>
								</Form.Group>
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

export default AddOrderModal
