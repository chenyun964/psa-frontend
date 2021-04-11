const API_HOSTS = process.env.REACT_APP_API_URL;

// Auth APIs
const auth_validate_api = API_HOSTS + '/validate';

// APIs without token
const guest_reset_api = API_HOSTS + '/resetpassword';
const guest_confirmemail_api = API_HOSTS + '/confirmemail';

// Login APIs
const user_login_api = API_HOSTS + '/authenticate';
const user_register_api = API_HOSTS + '/register';
const user_request_email_api = API_HOSTS + '/requestemail';
const user_reset_api = API_HOSTS + '/reset';


// User APIs
const user_get_api = API_HOSTS + '/user';
const user_update_api = API_HOSTS + '/user';
const user_delete_api = API_HOSTS + '/user';

// Vessel APIs
const vessel_list_api = API_HOSTS + '/vesselschedule/list';
const vessel_today_api = API_HOSTS + '/vesselschedule/list/today';
const vessel_get_api = API_HOSTS + '/vesselschedule';

// Favourite APIs
const favourite_list_api = API_HOSTS + '/favourite/get/username';
const favourite_add_api = API_HOSTS + '/favourite/add';
const favourite_remove_api = API_HOSTS + '/favourite/remove';

// Notification APIs
const notification_list_api = API_HOSTS + '/notification/list/username';
const notification_check_all_api = API_HOSTS + '/notification/check/all';

const apis = {
    API_HOSTS,

    auth_validate_api,

    user_login_api,
    user_register_api,
    user_reset_api,
    user_request_email_api,

    guest_reset_api,
    guest_confirmemail_api,

    user_get_api,
    user_update_api,
    user_delete_api,
    
    vessel_list_api,
    vessel_get_api,
    vessel_today_api,

    favourite_list_api,
    favourite_add_api,
    favourite_remove_api,

    notification_list_api,
    notification_check_all_api
}

export default apis;