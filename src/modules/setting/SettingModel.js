import axiosJwt from '../../libs/AxiosJwt';
import config from '../../config/config';

class SettingModel {

  async get(username){
    return axiosJwt.get(config['user_get_api'] + "/" + username);
  }

  async update(data){
    return axiosJwt.post(config['user_update_api'] + "/" + data.username, data);
  }

  async delete(username){
    return axiosJwt.delete(config['user_update_api'] + "/" + username);
  }

  async requestEmail(username){
    return axiosJwt.post(config['user_request_email_api'] + "?username=" + username);
  }

}

export default new SettingModel();
