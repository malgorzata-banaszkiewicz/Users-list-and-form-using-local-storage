//definig variables
let usersBox = document.querySelector('#users');
let addUserForm = document.querySelector('#newUserForm');
let userName = document.querySelector('#user-name');
let userEmail = document.querySelector('#email');
let userCity = document.querySelector('#city');
let userStreet = document.querySelector('#street');
let progressBox = document.querySelector('#progress');

const submitButton = document.querySelector('#add-user');
const allUsers = document.querySelector('#list-title');

const progressItem = document.createElement('progress');
const loadingComplete = document.createElement('meter');

//creating iterator
if(localStorage.getItem('id') === null) {
    localStorage.setItem('id', 0);
};

//fetching and adding users to the html
const getUsers = (users) => {

        users.filter((user) => {
            const listItem = document.createElement('li');
            listItem.innerText = user.name + ' ' + user.email + ' ' + user.address.city + ' ' + user.address.street;
            usersBox.append(listItem);
        })
}

const fetchUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users').then(response => {
        if(!response.ok) 
        {
            progressBox.innerText = 'Failed to load data...';
            loadingComplete.classList.add('disabled');
        
        }
        progressItem.setAttribute('id', users);
        progressBox.append(progressItem);
        addUserForm.classList.add('disabled');
        return response.json();
    }).then((users) => {   
        if(!users.ok)
        {
            progressItem.remove();
            loadingComplete.remove();
        }
        addUserForm.classList.remove('disabled');
        loadingComplete.setAttribute('min', 0);
        loadingComplete.setAttribute('max', 100);
        loadingComplete.setAttribute('value', 100);
        progressBox.appendChild(loadingComplete);
        return users;
    })
}

fetchUsers().then(users => {
    getUsers(users);
})

//adding event listeners
submitButton.addEventListener('click', store);
submitButton.addEventListener('click', getItem);
submitButton.addEventListener('click', changeLooks);

//submiting data to local storage 

function store() {
    let i = localStorage.getItem('id');
    i++;
    localStorage.setItem('name-' + i, userName.value);
    localStorage.setItem('email-' + i, userEmail.value);
    localStorage.setItem('city-' + i, userCity.value);
    localStorage.setItem('street-' + i, userStreet.value);
    localStorage.setItem('id', i);
    return;
}

//retrieving data from local storage on page reload
addEventListener("load", (event) => {});
onload = (event) => {
        if (localStorage.length > 0) {
            for(let i = 1; i <= localStorage.getItem('id'); i ++) {
                const newFormUser = document.createElement('li');
                newFormUser.innerHTML = `${localStorage.getItem('name-' + i)} ${localStorage.getItem('email-' + i)} ${localStorage.getItem('city-' + i)} ${localStorage.getItem('street-' + i)}`;
                usersBox.prepend(newFormUser)};
            }
        }


//function to add new user to the list
function getItem() {
    let id = localStorage.getItem('id');
    let addedUser = localStorage.getItem('name-' + id) + ' ' + localStorage.getItem('email-' + id) + ' ' + localStorage.getItem('city-' + id) + ' ' + localStorage.getItem('street-' + id);  
    const newFormUser = document.createElement('li');
    newFormUser.innerHTML = addedUser;
    usersBox.prepend(newFormUser);
}

//function to change button and title color plus clear the form
function changeLooks() {
    submitButton.classList.add('clicked');
    submitButton.innerText = "ADDED";
    allUsers.classList.remove('grey'); 
    setTimeout(addAgain, 3000);  
    return;
};


//reseting styles to the initial form

    function addAgain() {
        submitButton.classList.remove('clicked');
        submitButton.innerText = "ADD";
        userName.value = '';
        userEmail.value = '';
        userCity.value = '';
        userStreet.value = '';
        allUsers.classList.add('grey');
    }; 




