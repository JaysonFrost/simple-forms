import React, { Component } from 'react'
import styles from './styles.sss'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTimes, faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import classnames from 'classnames/bind'

const cx = classnames.bind(styles)

class Home extends Component {
	
	state = {
		users: [
			{
				name: '1232',
				phone: '232',
				email: '232',
				date: '2323',
				sum: '232',
				visits: '232',
				activity: '2322'
			}
		],
		modal: true,
		values: {
			name: '',
			phone: '',
			email: '',
			userIndex: 0
		},
		isEditing: false,
		isEmpty: false
	}
	
	handleChange(e, field) {
		this.setState({
			values: {
				...this.state.values,
				[field]: e.target.value
			}
		})
	}

	saveButton() {
		const {
			users,
			isEditing,
			values: {
				name,
				phone,
				email
			},
			userIndex
		} = this.state
		
		if (name || phone || email) {
			if ( isEditing ) {
				const newArr = this.state.users.map((e, index) => {
					if (index === userIndex) {
						return {
							...e,
							email,
							name,
							phone
						}
					}
					return e
				})
				this.setState({
					users: newArr
				})
			} else {
				this.setState({
					users: [...users, {
						name: name || '-',
						phone: phone || '-',
						email: email || '-',
						date: '----',
						sum: '----',
						visits: '----',
						activity: '----'
					}],
					values: {
						name: '',
						phone: '',
						email: ''
					}
				})
			}
		}
	}

	editUser(name, phone, email, userIndex) {
		this.setState({
			values: {
				name,
				phone,
				email
			},
			modal: false,
			isEditing: true,
			userIndex
		})
	}

	showModal() {
		this.setState({
			modal: !this.state.modal,
			isEditing: false,
			values: {
				name: '',
				phone: '',
				email: ''
			}
		})
	}

	deleteUser(index) {
		const {
			users
		} = this.state
		const newArr = users.map((e, i) => {
					if (index === i) {
					return null
				}
				return e
			}).filter(Boolean)

			this.setState({
				users: newArr
			})
	}

	render() {
		const {
			modal,
			values: {
				name,
				phone,
				email
			}
		} = this.state
		console.log(this.state.users)
		return (
			<div className={styles.home}>
				<div className={styles.form}>
					<div className={styles.form_wrapper}>
						<div className={styles.form_top}>
							<div className={styles.form_title}>Клиенты</div>
							<div className={styles.form_close}>
								<FontAwesomeIcon icon={faTimes} />
							</div>
						</div>
						<div className={styles.form_addClient} onClick={() => this.showModal()}>
							<FontAwesomeIcon icon={faPlusCircle} />
							<span className={styles.form_addClient_text}>Добавить клиента</span>
						</div>
						<div className={cx(styles.form_addForm, { open: modal })}>
							<div className={styles.form_addForm_input}>
								<span className={styles.form_addForm_title}>Имя</span>
								<input type="text" name="name" value={name} onChange={(e) => this.handleChange(e, 'name')} />
							</div>
							<div className={styles.form_addForm_input}>
								<span className={styles.form_addForm_title}>Телефон</span>
								<input type="text" name="phone" value={phone} onChange={(e) => this.handleChange(e, 'phone')} />
							</div>
							<div className={styles.form_addForm_input}>
								<span className={styles.form_addForm_title}>Email</span>
								<input type="text" name="email" value={email} onChange={(e) => this.handleChange(e, 'email')} />
							</div>
							<div className={styles.form_addForm_input} onClick={() => this.saveButton()}>
								<div className={styles.form_addForm_button}>Сохранить</div>
							</div>
						</div>
						<div className={styles.clientsTable}>
							{this.state.users.length ?
								<table className={styles.table}>
									<thead className={styles.table_head}>
										<tr>
											<th></th>
											<th>Клиент</th>
											<th>Телефон</th>
											<th>E-Mail</th>
											<th>Дата последнего посещения</th>
											<th>Сумма оплат</th>
											<th>Количество посещений</th>
											<th>Активный абонемент</th>
										</tr>
									</thead>
									<tbody>
										{this.state.users.map((e, index) => {
											if (e) {
												return (
													<tr key={index}>
														<td className={styles.buttons}>
															<div
																onClick={() => this.editUser(e.name, e.phone, e.email, index)}
																className={styles.buttons_edit}
																>
																<FontAwesomeIcon icon={faPencilAlt} />
															</div>
															<div
																onClick={() => this.deleteUser(index)}
																className={styles.buttons_delete}
															>
																<FontAwesomeIcon icon={faTimes} />
															</div>
														</td>
														<td>{e.name}</td>
														<td>{e.phone}</td>
														<td>{e.email}</td>
														<td>{e.date}</td>
														<td>{e.sum}</td>
														<td>{e.visits}</td>
														<td>{e.activity}</td>
													</tr>
												)
											}
										}
										)}
									</tbody>
								</table> : null
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home
