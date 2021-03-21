const API_HOSTS = process.env.REACT_APP_API_URL;

// Login APIs
const user_login_api = API_HOSTS + '/authenticate';
const user_register_api = API_HOSTS + '/register';
const user_reset_api = API_HOSTS + '/reset_password';

// User APIs
const user_get_api = API_HOSTS + '/user';
const user_update_api = API_HOSTS + '/user';
const user_delete_api = API_HOSTS + '/user';

// Vessel APIs
const vessel_list_api = API_HOSTS + '/vesselschedule/list';
const vessel_get_api = API_HOSTS + '/vesselschedule';

// Favourite APIs
const favourite_add_api = API_HOSTS + '/favourite/vesselinfav/addtofav';
const favourite_remove_api = API_HOSTS + '/favourite/vesselinfav/removefromfav';

// Notification APIs
const notification_list_api = API_HOSTS + '/notification/list/username';

const apis = {
    API_HOSTS,
    user_login_api,
    user_register_api,
    user_reset_api,

    user_get_api,
    user_update_api,
    user_delete_api,
    
    vessel_list_api,
    vessel_get_api,

    favourite_add_api,
    favourite_remove_api,

    notification_list_api
}

export default apis;