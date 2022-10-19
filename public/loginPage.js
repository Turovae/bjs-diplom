"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login( data, (respond) => {
        if (respond.success) {
            location.reload();
        } else {
            this.setLoginErrorMessage(respond.error);
        }
    });
} 

userForm.registerFormCallback = function(data) {
      ApiConnector.register( data, (respond) => {
        if (respond.success) {
            location.reload();
        } else {
            this.setRegisterErrorMessage(respond.error);
        }
    })
}