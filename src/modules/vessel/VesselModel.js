import axiosJwt from '../../libs/AxiosJwt';
import config from '../../config/config';

class VesselModel {

  async list(username){
    return axiosJwt.get(config['vessel_list_api'] + "/" + username);
  }

  async get(username, vessel_id){
    return axiosJwt.get(config['vessel_get_api'] + "/" + username + "/" + vessel_id);
  }

  async addFavourite(data){
    return axiosJwt.post(config['favourite_add_api'], data);
  }

  async removeFavourite(data){
    return axiosJwt.post(config['favourite_remove_api'], data);
  }
}

export default new VesselModel();
