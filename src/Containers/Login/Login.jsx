import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CTAButton from '../../components/CTAButton/CTAButton';
import FormInput from '../../components/FormInput/FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Loading from '../../components/Loading/Loading';
import validate from '../../tools/validate';
import { Form } from 'antd';
import axios from 'axios';
import Message from '../../components/Message/Message';
import './Login.scss';
import Button from '@material-ui/core/Button';
import { LOGIN, LOGOUT, UPDATE_USER } from '../../Redux/Types';
import { connect } from 'react-redux';
import userReducer from '../../Redux/Root-reducers';





const Login = (props) => {

    const history = useHistory();

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);

    const updateCredentials = (key, value) => {
        setCredentials({ ...credentials, [key]: value });
        if (Object.keys(errors).length > 0) setErrors(validate({ ...credentials, [key]: value }, 'login'));
    }

    const handleResponse = (response) => {
        if (response.status == 200) {
            props.dispatch({ type: LOGIN, payload: response.data });

            localStorage.setItem('credentials', JSON.stringify(response.data));
           
            if (response.data.user.admin == true) history.push('/admin');
            else history.push('/myspace');
        } else {
            setLoading(false);
            newMessage(response.data.message);
        }
    }

    const newMessage = (msg, style = 'error') => {
        const key = (~(Math.random() * 99999));
        setMessage([...message, <Message key={key} text={msg} style={style}></Message>]);
    }

    const sendData = async () => {

        const errs = validate(credentials, 'login');
        setErrors(errs);

        if (Object.keys(errs).length === 0) {
            setLoading(true);
            setTimeout(() => {
                axios.post('http://localhost:3002/login', credentials)
                    .then(handleResponse)
                    .catch((err) => { handleResponse({ data: { message: 'Error de conexión.' } }) });
            }, 500);
        }
    }



    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                sendData();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [credentials]);

    return (
        <div>
            <Loading visible={loading}></Loading>
            <div className="login-render-container">
                <h2 className="login-render-h2">Login</h2><br />


                <div className="inputContainer">
                    <Form.Item validateStatus={errors.email?.status} help={errors.email?.help}>
                        <FormInput label="Correo Electrónico" name="email" onChange={updateCredentials} maxLength="50"></FormInput>
                    </Form.Item>
                </div>
                <div className="inputContainer">
                    <Form.Item validateStatus={errors.password?.status} help={errors.password?.help}>
                        <FormInput type="Password" label="Contraseña" name="password" onChange={updateCredentials} maxLength="99"></FormInput>
                    </Form.Item>
                </div>




                <Button variant="contained" color="secondary" onClick={() => sendData()}>
                    Entrar
                   </Button>

                <div className="goggleRegister">
                    <div className="button-login button-login-facebook">
                        <FontAwesomeIcon icon={faGoogle} className='button-login-icon' />
                        <em className='button-login-letter'>Google</em>
                    </div>
                    <div className="vista-register-login" onClick={() => history.push('/register')}>¿Aún no estas registrado?</div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {

    return {
        user: state.userReducer.user,
        token: state.userReducer.token
    }
}



export default connect(mapStateToProps)(Login);