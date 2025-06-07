import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk, loginFacebookThunk } from './auth/thunks';
import { InputGroup, Form, Button,FormControl} from 'react-bootstrap';
import ReactFacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import img from './game/asset/png/snake_head_yellow.png'
import img2 from './game/asset/png/snake_head_blue.png'
import img3 from './game/asset/png/snake_head_green.png'
import './login.scss'




export function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
	const dispatch = useDispatch();


	const handleSubmit = (event:React.FormEvent<HTMLButtonElement>)=>{
		event.preventDefault();
		dispatch(loginThunk(username,password));
	}	

	const fBCallback = (userInfo: ReactFacebookLoginInfo & { accessToken: string })=>{
		if(userInfo.accessToken){
			dispatch(loginFacebookThunk(userInfo.accessToken));
		}
		return null;
	}

    return (
        <Form >
			<img src={img} alt="snakeimg"/><img src={img2} alt="snakeimg"/><img src={img3} alt="snakeimg"/><img src={img} alt="snakeimg"/><img src={img} alt="snakeimg"/><img src={img3} alt="snakeimg"/><img src={img2} alt="snakeimg"/><img src={img} alt="snakeimg"/>
           <InputGroup className="mb-3">
				<FormControl
					placeholder="Username"
					aria-label="Username"
					aria-describedby="basic-addon2"
					onChange={(event:React.FormEvent<HTMLInputElement>)=>setUsername(event.currentTarget.value)}
					value={username}
				/>
			</InputGroup> 
			<InputGroup className="mb-3">
				<FormControl
					type="password"
					placeholder="Password"
					aria-label="Password"
					aria-describedby="basic-addon2"
					onChange={(event:React.FormEvent<HTMLInputElement>)=>setPassword(event.currentTarget.value)}
					value={password}
				/>
			</InputGroup>
			<Button onClick={handleSubmit} onSubmit={handleSubmit}>
				Sign In
			</Button>
			
			<div>
			<ReactFacebookLogin
				appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
				autoLoad={false}
				fields="name,email,picture"
				onClick={()=>null}
				callback={fBCallback}
			/>
			</div> 
        </Form>
    )
}
