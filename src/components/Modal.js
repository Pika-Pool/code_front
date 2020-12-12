import React from 'react';
import '../styles/Modal.css';

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			routePath: this.props.routePath || '',
			routeMethod: this.props.routeMethod || 'POST',
			routeType: 'render_template',
			template_path: '',
			redirect_path: '',
			json_data_cleaned: '',
			json_data: '',
			form_data_cleaned: '',
			form_data: '',
		};

		this.onChange = this.onChange.bind(this);
		this.onCreateNewRoute = this.onCreateNewRoute.bind(this);
	}

	onChange(event) {
		const key = event.currentTarget.name;
		let value = event.currentTarget.value;

		if (key === 'json_data') {
			this.setState({
				[key]: value,
				json_data_cleaned: value.replace(/\s/g, ''),
			});
		} else if (key === 'form_data') {
			this.setState({
				[key]: value,
				form_data_cleaned: value.replace(/\s/g, '').split(','),
			});
		} else {
			this.setState({
				[key]: value,
			});
		}
	}

	onCreateNewRoute(event) {
		if (event.currentTarget.id === 'addRoute') {
			this.props.onCreateNewRoute(this.state);
		} else {
			this.props.onCreateNewRoute(null);
		}
	}

	render() {
		return (
			<div className='absolute top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center'>
				<div className='opacity-50 absolute top-0 left-0 right-0 bottom-0 bg-black z-20'></div>
				<div className='bg-white opacity-100 z-30 modal'>
					<h3>Add Route</h3>

					<form
						onSubmit={e => e.preventDefault()}
						className='space-y-2'
					>
						<div className='input-block'>
							<label htmlFor='routePath'>Path:</label>
							<input
								id='routePath'
								name='routePath'
								onChange={this.onChange}
								value={this.state.routePath}
								required
							/>
						</div>
						<div className='input-block'>
							<label htmlFor='routeMethod'>Method:</label>
							<select
								id='routeMethod'
								name='routeMethod'
								onChange={this.onChange}
								value={this.state.routeMethod}
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
								name='routeType'
								onChange={this.onChange}
								value={this.state.routeType}
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
						{this.state.routeType === 'render_template' ? (
							<div className='input-block'>
								<label htmlFor='templatePath'>
									Template Path:
								</label>
								<input
									type='text'
									id='templatePath'
									name='template_path'
									onChange={this.onChange}
									value={this.state.template_path}
									required
								/>
								<small>
									Keep your templates inside Templates folder
								</small>
							</div>
						) : (
							void 0
						)}

						{/* redirect path */}
						{this.state.routeType === 'redirect' ? (
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
								name='form_data'
								onChange={this.onChange}
								value={this.state.form_data}
							/>
						</div>

						{/* json data */}
						{this.state.routeType !== 'redirect' ? (
							<div className='input-block'>
								<label htmlFor='jsonData'>JSON data:</label>
								<textarea
									id='jsonData'
									name='json_data'
									onChange={this.onChange}
									value={this.state.json_data}
								/>
							</div>
						) : (
							void 0
						)}

						<div className='buttons'>
							<button
								id='cancel'
								type='submit'
								name='cancel'
								onClick={this.onCreateNewRoute}
							>
								Cancel
							</button>
							<button
								id='addRoute'
								type='submit'
								name='addRoute'
								onClick={this.onCreateNewRoute}
							>
								Add
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Modal;
