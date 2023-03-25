async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    axios.post('http://localhost:3000/login', { username: username, password: password }).then(
        (res) => {
            console.log(res);
        }
    );

}
