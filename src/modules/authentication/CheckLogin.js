import LoginModel from './LoginModel';

class CheckLogin {
    isLogin(check_token=false){
        if(!LoginModel.retrieveUserToken()){
          window.location.replace('/login');
          return;
        }
    }

    ifLoginRedirect(){
        if(LoginModel.retrieveUserToken()){
            this.getPageIdRedirect();
            window.location.replace('/');
            return;
        }
    }

    isLoginWithReturn(){
      var check = LoginModel.retrieveUserToken();
      if(!check){
        return false;
      }
      return true;
    }

}

export default new CheckLogin();
