import axiosJwt from '../../libs/AxiosJwt';
import config from '../../config/config';
import axios from 'axios';

class NotificationModel {

  async list(username){
    return axiosJwt.get(config['notification_list_api'] + "/" + username);
  }

  async checkAll(username){
    return axiosJwt.post(config['notification_check_all_api'] + "/" + username);
  }

  async clear(username){
    return axiosJwt.post(config['notification_clear_api'] + "/" + username);
  }

}

export default new NotificationModel();
