"use strict"

console.log('file userform is used');

console.log(UserForm);

const userForm = new UserForm();

console.log(userForm);

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