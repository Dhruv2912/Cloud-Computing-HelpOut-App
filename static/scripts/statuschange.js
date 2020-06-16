//listen for changes 
authentication.onAuthStateChanged(user =>{
    var login = document.getElementById("login");
    var signup = document.getElementById("signup");
    var logout = document.getElementById("logout");
    var userinfo = document.getElementById("userinfo");
    var Createcause = document.getElementById("Createcause");
    var Nearme = document.getElementById("Nearme");
    var MyDonations = document.getElementById("MyDonations");
    var OpenFinancialCause = document.getElementById("OpenFinancialCause");
    var OpenResourceCause = document.getElementById("OpenResourceCause");

    if(user){
        console.log("Logged in:",user.email);
        login.style.display = "none";
        signup.style.display = "none";
        logout.style.display = "block";
        Createcause.style.display = "block"
        Nearme.style.display = "block";
        OpenFinancialCause.style.display = "block";
        OpenResourceCause.style.display = "block";
        MyDonations.style.display = "block";
        

        //add email info in navbar
        userinfo.textContent += user.email;
        userinfo.style.display = "block"

        //get data from the databse
        database.collection('causes').get().then(snapshot =>{
            listFinancialCauses(snapshot.docs)
        }).catch(function(error){console.log(error);});

        database.collection('resourceCauses').get().then(snapshot =>{
            listResourceCauses(snapshot.docs)
        }).catch(function(error){console.log(error);});
    }
    else{
        console.log("Logged out!")
        login.style.display = "block";
        signup.style.display = "block";
        logout.style.display = "none";
        Createcause.style.display = "none"
        Nearme.style.display = "none";
        OpenFinancialCause.style.display = "none";
        OpenResourceCause.style.display = "none";
        MyDonations.style.display = "none";
        //making the name null 
        userinfo.textContent = "";
        userinfo.style.display = "none"

        //DOnt diplay if not logged in 
        listFinancialCauses([]);
        listResourceCauses([]);
    }
})
