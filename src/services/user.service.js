

export const userService = {
    login,
    logout,
    recoveryLoggedUser
};

function login(user) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('user',  JSON.stringify(user));
        resolve();
    });
}

function logout() {
    return new Promise((resolve, reject) => {
        localStorage.removeItem('user');
        resolve();
    });
}

function recoveryLoggedUser(){
    
    return new Promise((resolve, reject) => {
        JSON.parse(localStorage.getItem('user'));
        resolve();
    });
}