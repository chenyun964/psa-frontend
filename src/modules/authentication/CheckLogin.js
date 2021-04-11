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
            LoginModel.validate(LoginModel.retrieveUserToken()).then(res =>{
                window.location.replace('/dashboard');
            }).catch(error => {
              return;
            })
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
