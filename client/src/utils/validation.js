const username = (username) => {
    const usernamePattern = /^[a-zA-Z0-9]{5,}$/;
    return usernamePattern.test(username);
}

const email = (email) => {
    
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}

const password = (password) => {
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{5,}$/;
    return passwordPattern.test(password);
}

const validation = {
    email,
    password,
    username
}

export default validation;