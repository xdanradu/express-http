function login() {
    console.log('GET request');

    fetch("http://localhost:3000/students")
        .then((response) => response.json())
        .then((data) => console.log(data));
}
