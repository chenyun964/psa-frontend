import axios from 'axios';
import config from '../../config/config.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const maxage = 2592000;
class LoginModel {

    static defaultState() {
        this.setState = {
            token:"",
        }
    }

    async login(data){
        return axios.post(config['user_login_api'], data,  {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});
    }

    async register(data){
        return axios.post(config['user_register_api'], data,  {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});
    }

    async reset(email){
        return axios.post(config['user_reset_api'] + "?email=" + email,  {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});
    }

    async resetPassword(token, data){
        return axios.post(config['guest_reset_api'] + "?token=" + token,  data, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});
    }

    async verifyEmail(token){
        return axios.post(config['guest_confirmemail_api'] + "?token=" + token, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});
    }

    storeTokens(data){
        let user = {
            username : data.username,
            email : data.email
        }
        cookies.set("_psauser", user ,  {maxAge:maxage});
        cookies.set("_psausert", data.token, {maxAge: maxage});
    }

    retrieveUserToken(){
        var token = cookies.get("_psausert");
        if(!token || token == "" || token == null){
           return;
        }
        return token;
    }

    async destory(){
        cookies.remove('_psausert',{ path: '/' });
        cookies.remove('_psauser',{ path: '/' });
    }

    retrieveToken(){
        return cookies.get("_psausert");
    }

    getUserName(){
        var user = cookies.get("_psauser");
        if(!user || user == "" || user == null){
           return;
        }
        return user.username;
    }

    getUserEmail(){
        var user = cookies.get("_psauser");
        if(!user || user == "" || user == null){
           return;
        }
        return user.email;
    }

    validate(){
        let token = this.retrieveToken();
        if(!token){
            window.location.replace('/login');
        } else {
            axios.post(config['auth_validate_api'] + "?token=" + token,  {headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then((res) => {
            }).catch((error) => {
                window.location.replace('/login');
            });
        }
    }
}

export default new LoginModel();
