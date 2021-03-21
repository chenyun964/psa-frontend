import axiosJwt from '../../libs/AxiosJwt';
import config from '../../config/config';

class NotificationModel {

  async list(username){
    return axiosJwt.get(config['notification_list_api'] + "/" + username);
  }
}

export default new NotificationModel();
