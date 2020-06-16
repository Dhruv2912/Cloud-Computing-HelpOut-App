// This is for signup authentication
const signup = document.querySelector("#signupform");

signup.addEventListener('submit',(e) => {
    e.preventDefault();

    //getting user information 
    const email = signup['signup-email'].value;
    const address = signup['user-address'].value;
    const password = signup['signup-password'].value;
    
    //sign up a new user
    authentication.createUserWithEmailAndPassword(email, password).then(cred=>{
        //insert user and location data in a separate collection
        addUserToUserCollection(email, address);
        $("#modal-signup .close").click();
        signup.reset();
    });

});

//logout
const logout = document.querySelector("#logout")
logout.addEventListener('click',(e) => {
    e.preventDefault();
    authentication.signOut()
})

// This is for login authentication
const login = document.querySelector("#loginform");

login.addEventListener('submit',(e) => {
    e.preventDefault();

    //getting user information 
    const email = login['login-email'].value;
    const password = login['login-password'].value;
    
    //sign up a new user
    authentication.signInWithEmailAndPassword(email, password).then(cred=>{  
        $("#modal-login .close").click()
        login.reset();
    })
})