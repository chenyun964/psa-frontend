const API_HOSTS = process.env.REACT_APP_API_URL;

// Login APIs
const user_login_api = API_HOSTS + '/authenticate';
const user_register_api = API_HOSTS + '/register';

// Vessel APIs
const vessel_list_api = API_HOSTS + '/vesselschedule/list';
const vessel_get_api = API_HOSTS + '/vessel';

export default{
    API_HOSTS,
    user_login_api,
    user_register_api,
    vessel_list_api,
    vessel_get_api
}
