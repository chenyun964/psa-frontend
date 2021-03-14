import axiosJwt from '../../libs/AxiosJwt';
import config from '../../config/config';

class VesselModel {

  async list(){
    return axiosJwt.get(config['vessel_list_api']);
  }

  async get(vessel_id){
    return axiosJwt.get(config['vessel_get_api'] + "/" + vessel_id);
  }

}

export default new VesselModel();
