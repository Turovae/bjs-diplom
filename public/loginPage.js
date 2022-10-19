"use strict"

console.log('file userform is used');

console.log(UserForm);

const userForm = new UserForm();

console.log(userForm);

userForm.loginFormCallback = function(data) {
    // console.log(data);
    const {login, password} = data;
    ApiConnector.login({ login, password }, (respond) => {
        // console.log(respond)
        if (respond.success) {
            location.reload();
        } else {
            // console.log(respond.error);
            this.setLoginErrorMessage(respond.error);
        }
    });
} 

userForm.registerFormCallback = function(data) {
    // console.log(data);
    const {login, password} = data;
    ApiConnector.register({ login, password }, (respond) => {
        // console.log(respond);
        if (respond.success) {
            location.reload();
        } else {
            // console.log(respond.error);
            this.setRegisterErrorMessage(respond.error);
        }
    })
}