//Getting data from database for causes 
const listOfFinancialCauses = document.querySelector('#financial-causes');

//List financial causes
const listFinancialCauses = (data) => {
    let html ='';
    data.forEach(doc => {
        const guide = doc.data();
        const li = `
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

        `;
        html += li
    });

    listOfFinancialCauses.innerHTML = html;
}

const listOfResourceCauses = document.querySelector('#resource-causes');

//List financial causes
const listResourceCauses = (data) => {
    let html ='';
    data.forEach(doc => {
        const guide = doc.data();
        const li = `
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

        `;
        html += li
    });

    listOfResourceCauses.innerHTML = html;
}


// This is for entering new financial cause in database
const createcause = document.querySelector("#createcauseform");

createcause.addEventListener('submit',(e) => {
    e.preventDefault();
    
    //conver address to formatted address and get long and lat.
    var formattedAddress, longitude, latitude;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address: createcause['location'].value,
          key:'AIzaSyDicE8wQSGD8TGaj2RQtVRJJfIwtQNn6eU'
        }
      })
      .then(function(response){


        formattedAddress = response.data.results[0].formatted_address;
        longitude = response.data.results[0].geometry.location.lng;
        latitude = response.data.results[0].geometry.location.lat;

        database.collection('causes').add({
            Name: createcause['causename'].value,
            Description: createcause['description'].value,
            Address: formattedAddress,
            Location: {
              lng: longitude,
              lat: latitude
            },
            Amount: createcause['amount'].value,
            AccountNo: createcause['account'].value,
            Raised: 0
          }).then(()=>{
              $("#modal-financial-cause .close").click();
              createcause.reset();
              window.location = "/"; 
          })
        

      })
      .catch(function(error){
        console.log(error);
    });

    

    
});


// This is for entering new resource cause in database
const createResourceCause = document.querySelector("#createResourceCauseForm");

createResourceCause.addEventListener('submit',(e) => {
    e.preventDefault();
    
    //conver address to formatted address and get long and lat.
    var formattedAddress, longitude, latitude;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address: createResourceCause['r-location'].value,
          key:'AIzaSyDicE8wQSGD8TGaj2RQtVRJJfIwtQNn6eU'
        }
      })
      .then(function(response){


        formattedAddress = response.data.results[0].formatted_address;
        longitude = response.data.results[0].geometry.location.lng;
        latitude = response.data.results[0].geometry.location.lat;

        database.collection('resourceCauses').add({
            Name: createResourceCause['r-causename'].value,
            Description: createResourceCause['r-description'].value,
            Address: formattedAddress,
            Location: {
              lng: longitude,
              lat: latitude
            },
            ResourcesNeeded: createResourceCause['r-resources'].value,
            DonationsReceived: 0
          }).then(()=>{
              $("#modal-resource-cause .close").click();
              createResourceCause.reset();
              window.location = "/"; 
          })
        

      })
      .catch(function(error){
        console.log(error);
    });

    

    
});

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


              }).then(function(){
                window.location='/';
              });

          })
          .catch(function(error){
            console.log(error);
          });
  //add data to donations collection


  

  
});


const addUserToUserCollection = (email, address) => {
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: address,
      key: apiKey
    }
  })
  .then(function(response){
      formattedAddress = response.data.results[0].formatted_address;
      longitude = response.data.results[0].geometry.location.lng;
      latitude = response.data.results[0].geometry.location.lat;
      database.collection('users').doc(email).set({
          email: email,
          Address: formattedAddress,
          Location: {
            lng: longitude,
            lat: latitude
          }
      }).then(()=>{
        console.log("User added successfully to users collection");
      }).catch(function(error){
        console.log(error);
      });
    

  })
  .catch(function(error){
    console.log(error);
});

}


//passing the document id to donation modal form
function passEventId(){
  var docId = document.querySelector("#docId");
  docId.value = event.target.id;
}