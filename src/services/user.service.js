

export const userService = {
    login,
};

function login(username) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('user', username);
        resolve();
    });
}