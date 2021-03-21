import axiosJwt from '../../libs/AxiosJwt';
import config from '../../config/config';

class VesselModel {

  async list(){
    return axiosJwt.get(config['vessel_list_api']);
  }

  async get(vessel_id){
    return axiosJwt.get(config['vessel_get_api'] + "/" + vessel_id);
  }

  async addFavourite(data){
    return axiosJwt.post(config['favourite_add_api'], data);
  }

  async removeFavourite(data){
    return axiosJwt.post(config['favourite_remove_api'], data);
  }

}

export default new VesselModel();
