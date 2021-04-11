import axiosJwt from '../../libs/AxiosJwt';
import config from '../../config/config';

class FavouriteModel {
    async list(username){
        return axiosJwt.get(config['favourite_list_api'] + "/" + username);
    }

    async add(data){
        return axiosJwt.post(config['favourite_add_api'], data);
    }
    
    async remove(id){
        return axiosJwt.post(config['favourite_remove_api'] + "/" + id);
    }
}

export default new FavouriteModel();
