/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
function store(){
    const params = new URLSearchParams(window.location.search);
    const value = params.get('token');
    localStorage.setItem('token', value);
}

function postData(){
    const token =  localStorage.getItem('token');
    const pwd = document.getElementsByName('pwd1')

    fetch('http://localhost:8000/api/changePassword', {method : 'POST', body : {
        'userId' : token,
        'password' : pwd
    }})
}