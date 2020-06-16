
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 33.4255, lng: -111.9400},
      zoom: 11
    });

    var userLngLat;
    //get current user
    authentication.onAuthStateChanged((user) => {
        //display user on nav bar
        var userinfo = document.getElementById("userinfo");
        userinfo.textContent += user.email;

        //get user's location and display events in 10 mile radius
        database.collection('users').where('email','==',user.email)
                                    .get()
                                    .then(function(querySnapshot) {

                                        //get user's location data
                                        querySnapshot.forEach(function(doc) {
                                            userLngLat = doc.data().Location;
                                        });

                                         //get data from firebase
                                        database.collection("causes")
                                                .get().then(function(querySnapshot) {
                                                            querySnapshot.forEach(function(doc) {
                                                                
                                                                //calculate distance of each cause's location from user's location
                                                                var eventLngLat = doc.data().Location;
                                                                var guide = doc.data();
                                                                if(isWithinRadius(userLngLat, eventLngLat)){
                                                                    var marker = new google.maps.Marker({position: eventLngLat, map: map});
                                                                    var infoWindow = new google.maps.InfoWindow({
                                                                        content:`
                                                                        <div class="card">
                                                                          <div class="card-header">
                                                                            <h4 class="mb-0">
                                                                              ${guide.Name}
                                                                            </h4>
                                                                          </div>
                                                                          <div class="card-body">
                                                                            <h5 class="card-title"><span class="text-success">${guide.Raised}$</span>&nbsp; raised out of &nbsp;<span class="text-primary">${guide.Amount}$</span></h5>
                                                                            <p class="card-text">${guide.Description}</p>
                                                                            <button class="btn btn-primary dnt-btn" data-toggle="modal" data-target="#modal-donation" id="${doc.id}" onclick="passEventId()">Donate</button>
                                                                          </div>
                                                                        </div>
                                                                      `
                                                                    });

                                                                    marker.addListener('click', function(){
                                                                        infoWindow.open(map,marker);
                                                                    })
                                                                }
                                                                
                                                            });


                                                        })
                                                        .catch(function(error) {
                                                            console.log("Error getting documents: ", error);
                                                        });

                                        //get data from firebase
                                        database.collection("resourceCauses")
                                                .get().then(function(querySnapshot) {
                                                            querySnapshot.forEach(function(doc) {
                                                                
                                                                //calculate distance of each cause's location from user's location
                                                                var eventLngLat = doc.data().Location;
                                                                var guide = doc.data();
                                                                if(isWithinRadius(userLngLat, eventLngLat)){
                                                                    var marker = new google.maps.Marker({position: eventLngLat, map: map});
                                                                    var infoWindow = new google.maps.InfoWindow({
                                                                        content:`
                                                                        <div class="card">
                                                                          <div class="card-header">
                                                                            <h4 class="mb-0">
                                                                              ${guide.Name}
                                                                            </h4>
                                                                          </div>
                                                                          <div class="card-body">
                                                                            <h5 class="card-title"><span class="text-success">Resources We Need: &nbsp; ${guide.ResourcesNeeded}</h5>
                                                                            <p class="card-text">${guide.Description}</p>
                                                                            <p class="card-text">You can contribute by dropping donation items at the address below. Thank you!</p>
                                                                            <p class="card-text">Address: &nbsp; ${guide.Address}</p>
                                                                          </div>
                                                                        </div>
                                                                      `
                                                                    });

                                                                    marker.addListener('click', function(){
                                                                        infoWindow.open(map,marker);
                                                                    })
                                                                }
                                                                
                                                            });


                                                        })
                                                        .catch(function(error) {
                                                            console.log("Error getting documents: ", error);
                                                        });

                                        
                                    })
                                    .catch(function(error) {
                                        console.log("Error getting documents: ", error);
                                    });

                                    
    });
    
}





const isWithinRadius = (userLocation, eventLocation)=>{
    //convert it to google LatLng objects
    var userLngLat = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    var eventLngLat = new google.maps.LatLng(eventLocation.lat, eventLocation.lng);
  
    //calculate distance
  	var distance = google.maps.geometry.spherical.computeDistanceBetween(userLngLat, eventLngLat); //distance in meters between your location and the marker

    //convert distance to miles
    const distanceInMiles = distance / 1609;
    
    if(distanceInMiles <= 10){
        return true;
    }
    else{
        return false;
    }
}



//logout
const logout = document.querySelector("#logout")
logout.addEventListener('click',(e) => {
    e.preventDefault();
    authentication.signOut();
    window.location.href = "/";
});

//passing the document id to donation modal form
function passEventId(){
  var docId = document.querySelector("#docId");
  docId.value = event.target.id;
}

//for donation
const donate = document.querySelector("#donationform");

donate.addEventListener('submit',(e) => {
  e.preventDefault();
  
  var email = donate['d-login-email'].value;
  var donationAmount = donate['d-amount'].value;
  var bankName = donate['d-bankname'].value;
  var accountNo = donate['d-account'].value;
  var eventId = donate['docId'].value;

  //update money raised in causes collection
  //1. get the event and raised money
  database.collection('causes').doc(eventId).get()
          .then(function(doc) {
              var moneyRaised = doc.data().Raised;
              moneyRaised = parseFloat(moneyRaised) + parseFloat(donationAmount);

              //update in the document
              database.collection('causes').doc(eventId).update({Raised: moneyRaised})
                      .then(function(){
                        $("#modal-donation .close").click();
                        donate.reset();
                        console.log("updated raised amount successfully");})
                      .catch(function(error){console.log(error);});

              //add donation to user's donations
              database.collection('donations').add({
                AccountNo:accountNo,
                BankName:bankName,
                DonationAmount:parseFloat(donationAmount),
                Email:email,
                EventId:eventId,
                EventName:doc.data().Name
              });

          })
          .catch(function(error){
            console.log(error);
          });
  //add data to donations collection


  

  
});
