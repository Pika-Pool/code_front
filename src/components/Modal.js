import React from 'react';
import '../styles/Modal.css';

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			path: this.props.routePath || '/',
			request_method: this.props.routeMethod || 'POST',
			type: 'render_template',
			render_path: '',
			redirect_path: '',
			// json_data_user is string entered by user
			json_data_user: '',
			// json_data is after removing whitespace from json_data_user
			json_data: '', // data sent to server
			// form_data_user is string entered by user
			form_data_user: '',
			// from_data is after removing whitespace and splitting form_data_user into an array
			form_data: '', // data sent to server
		};

		this.onChange = this.onChange.bind(this);
		this.onCreateNewRoute = this.onCreateNewRoute.bind(this);
	}

	onChange(event) {
		const key = event.currentTarget.name;
		let value = event.currentTarget.value;

		if (key === 'json_data_user') {
			this.setState({
				[key]: value,
				json_data: value.replace(/\s/g, ''),
			});
		} else if (key === 'form_data_user') {
			this.setState({
				[key]: value,
				form_data: value.replace(/\s/g, '').split(','),
			});
		} else {
			this.setState({
				[key]: value,
			});
		}
	}

	onCreateNewRoute(event) {
		// if cancel button is clicked
		if (event.currentTarget.id === 'cancel') {
			this.props.onCreateNewRoute(null);
			return;
		}

		if (!this.validateInputFields()) {
			return;
		}

		this.props.onCreateNewRoute(this.state);
		// reset data
		this.setState({
			path: this.props.routePath || '',
			request_method: this.props.routeMethod || 'POST',
			type: 'render_template',
			render_path: '',
			redirect_path: '',
			json_data_user: '',
			json_data: '',
			form_data_user: '',
			form_data: '',
		});
	}

	validateInputFields() {
		// get all invalid fields
		// if there are any, do not submit
		return (
			this._formElement.querySelectorAll(
				'input:invalid,select:invalid,textarea:invalid'
			).length === 0
		);
	}

	render() {
		return (
			this.props.children || (
				<div className='absolute top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center'>
					<div className='opacity-50 absolute top-0 left-0 right-0 bottom-0 bg-black z-20'></div>
					<div className='bg-white opacity-100 z-30 modal'>
						<h3>Add Route</h3>

						<form
							onSubmit={e => e.preventDefault()}
							className='space-y-2'
							ref={el => {
								this._formElement = el;
							}}
						>
							<div className='input-block'>
								<label htmlFor='routePath'>Path:</label>
								<input
									id='routePath'
									name='path'
									onChange={this.onChange}
									value={this.state.path}
									required
								/>
							</div>
							<div className='input-block'>
								<label htmlFor='routeMethod'>Method:</label>
								<select
									id='routeMethod'
									name='request_method'
									onChange={this.onChange}
									value={this.state.request_method}
									required
								>
									<option value='GET'>GET</option>
									<option value='POST'>POST</option>
									<option value='PUT'>PUT</option>
									<option value='DELETE'>DELETE</option>
								</select>
							</div>
							<div className='input-block'>
								<label htmlFor='routeType'>Type:</label>
								<select
									id='routeType'
									name='type'
									onChange={this.onChange}
									value={this.state.type}
									required
								>
									<option value='render_template'>
										Render Template
									</option>
									<option value='redirect'>Redirect</option>
									<option value='api'>Send JSON data</option>
								</select>
							</div>

							{/* template path */}
							{this.state.type === 'render_template' ? (
								<div className='input-block'>
									<label htmlFor='templatePath'>
										Template Path:
									</label>
									<input
										type='text'
										id='templatePath'
										name='render_path'
										onChange={this.onChange}
										value={this.state.render_path}
										required
									/>
									<small>
										Keep your templates inside Templates
										folder
									</small>
								</div>
							) : (
								void 0
							)}

							{/* redirect path */}
							{this.state.type === 'redirect' ? (
								<div className='input-block'>
									<label htmlFor='redirectPath'>
										Redirect Path:
									</label>
									<input
										type='text'
										id='redirectPath'
										name='redirect_path'
										onChange={this.onChange}
										value={this.state.redirect_path}
										required
									/>
								</div>
							) : (
								void 0
							)}

							<div className='input-block'>
								<label htmlFor='formData'>Form data:</label>
								<input
									id='formData'
									name='form_data_user'
									onChange={this.onChange}
									value={this.state.form_data_user}
								/>
							</div>

							{/* json data */}
							{this.state.type !== 'redirect' ? (
								<div className='input-block'>
									<label htmlFor='jsonData'>JSON data:</label>
									<textarea
										id='jsonData'
										name='json_data_user'
										onChange={this.onChange}
										value={this.state.json_data_user}
									/>
								</div>
							) : (
								void 0
							)}
						</form>
						<div className='buttons'>
							<button
								id='cancel'
								name='cancel'
								onClick={this.onCreateNewRoute}
							>
								Cancel
							</button>
							<button
								id='addRoute'
								name='addRoute'
								onClick={this.onCreateNewRoute}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			)
		);
	}
}

export default Modal;
