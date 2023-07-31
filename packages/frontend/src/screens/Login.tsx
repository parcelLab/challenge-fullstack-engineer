import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function Login() {
	const [requestingData, setRequestingData] = useState(false);
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const onClickSend = async() => {
		setRequestingData(true);
		console.log("here")
		navigate(`/trackings?email=${email}`)
	}
	return (
		<div className={"container col-sm-4 shadow-container"}>
			<div className={"login-screen col-sm-12 col-md-6"}>
				<p>Please enter your email address to see recent orders</p>
				<div className={"form-group"}>
					<label htmlFor="email">Email address</label>
					<input type="email" className="form-control" value={email}
						   onChange={(e) => setEmail(e.target.value)}
						   id="email" aria-describedby="emailHelp"
						   placeholder="Enter email"/>
				</div>
				<button onClick={onClickSend} className="btn btn-primary" type="button" disabled={requestingData}>
					{requestingData ?
						<span className="spinner-border spinner-border-sm" role="status"
							  aria-hidden="true"></span> : null
					}
					{requestingData ? <span>Loading...</span>:<span>Send</span>}
				</button>
			</div>
		</div>
	)
}
