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

    async reset(data){
        return axios.post(config['user_reset_api'], data,  {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }});
    }

    storeTokens(data){
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
    }

    retrieveToken(){
        return cookies.get("_psausert");
    }
}

export default new LoginModel();
