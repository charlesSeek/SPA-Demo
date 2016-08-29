import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import axios from 'axios';

const buttonIntialValue = "Send";
const buttonRequestSendingValue = "Sending,please wait...";
const requestURL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

/*
 Component state:
 	showInviteModal: whether show the request form modal
 	showAllDoneModal: whether show the request done modal
 	errorMessage: request error message
 */
class PageBody extends Component{
	componentWillMount(){
		this.state = {
			showInviteModal:false,  
			showAllDoneModal:false,
			errorMessage:'',
			requestSendButtonDisable:false,
			requestSendButtonValue:buttonIntialValue,
			nameFieldValided:true,
			emailFieldValided:true,
			confirmEmailFieldValided:true
		}
	}

	//function to check the data validation of form submitted
	formValidation({name,email,confirmEmail}){
		let flag = true;
		console.log(name,email,confirmEmail);
		this.setState({
			nameFieldValided:true,
			emailFieldValided:true,
			confirmEmailFieldValided:true
		});
		if (name.trim().length<3){
			this.setState({nameFieldValided:false});
			flag = false;
		}
		const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!reg.test(email)){
			this.setState({emailFieldValided:false});
			flag =  false;
		}
		if (!reg.test(confirmEmail)||confirmEmail!==email){
			this.setState({confirmEmailFieldValided:false});
			flag =  false;
		}
		return flag;
	}
	onClickRequestButton(){
		this.setState({showInviteModal:true});
	}

	//handler function of request form submit event
	onSubmitRequestForm(event){
		event.preventDefault();
		console.log("submitting data");
		const name = this.refs.name.value;
		const email = this.refs.email.value;
		const confirmEmail = this.refs.confirmEmail.value;
		if (this.formValidation({name,email,confirmEmail})){
			this.setState({
				requestSendButtonDisable:true,
				requestSendButtonValue:buttonRequestSendingValue
			})

			//data post promise
			axios.post(requestURL,{name,email})
				.then(response=>{
					console.log('success',response.status);
					if (response.status===200){
						this.setState({
							showInviteModal:false,
							showAllDoneModal:true,
							requestSendButtonDisable:false,
							requestSendButtonValue:buttonIntialValue
						})
					}
				})
				.catch(error=>{
					this.setState({
						errorMessage:error.toString(),
						requestSendButtonDisable:false,
						requestSendButtonValue:buttonIntialValue
					});
				})
		}
	}
	render(){
		const buttonDisable = this.state.requestSendButtonDisable;
		const requestSendButtonValue = this.state.requestSendButtonValue;
		const styleName = this.state.nameFieldValided ? {} : {"border":"1px solid red"};
		const styleEmail = this.state.emailFieldValided ? {} : {"border":"1px solid red"};
		const styleConfirmEmail = this.state.confirmEmailFieldValided ? {} : {"border":"1px solid red"};
		return(
			<div className="main">
				<h1>A better way</h1>
				<h1>to enjoy every day.</h1>
				<p>Be the first to know when we launch.</p>
				<button id="requestButton" onClick={this.onClickRequestButton.bind(this)}>Request an invite</button>
				<Modal show={this.state.showInviteModal} className="form-modal">
					<div className="modal-header">
						<Modal.Title>Request an invite</Modal.Title>
					</div>
					<div className="modal-body">
						<form onSubmit={this.onSubmitRequestForm.bind(this)}>
							<div className="form-group">
								<input ref="name" style={styleName} type="text" className="form-control" placeholder="Full Name"/>
							</div>
							<div className="form-group">
								<input style={styleEmail} ref="email" type="text" className="form-control" placeholder="Email"/>
							</div>
							<div className="form-group">
								<input style={styleConfirmEmail} ref="confirmEmail" type="text" className="form-control" placeholder="Confirm Email"/>
							</div>
							<button className="form-control" type="submit" disabled={buttonDisable}>{requestSendButtonValue}</button>
						</form>
					</div>
					<div className="modal-footer">
						<p>{this.state.errorMessage}</p>
					</div>
				</Modal>
				<Modal show={this.state.showAllDoneModal} className="dialog-modal">
					<div className="modal-header">
						<h1>All Done</h1>
					</div>
					<div className="modal-body">
						<p>You will be one of the first to experience</p>
						<p>Broccoli & Co. When we launch</p>
					</div>
					<div className="modal-footer">
						<button onClick={()=>this.setState({showAllDoneModal:false})} className="form-control">OK</button>
					</div>
				</Modal>
			</div>
		)
	}
}
export default PageBody;