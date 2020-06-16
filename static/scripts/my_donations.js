authentication.onAuthStateChanged((user) => {
    //display user on nav bar
    var userinfo = document.getElementById("userinfo");
    userinfo.textContent += user.email;

    //get user's location and display events in 10 mile radius
    database.collection('donations').where('Email','==',user.email)
                                .get()
                                .then(function(data){

                                    
                                    let html =`
                                        <table class="table table-striped">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">EventName</th>
                                                <th scope="col">Donation Amount</th>
                                                <th scope="col">Bank</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    `;
                                    const listOfDonations = document.querySelector('.tableDonations');
                                    data.forEach(doc => {
                                        const guide = doc.data();
                                        const li = `
                                        <tr>
                                            <td>${guide.EventName}</td>
                                            <td>${guide.DonationAmount}</td>
                                            <td>${guide.BankName}</td>
                                        </tr>
                                        `;
                                        html += li
                                    });

                                    html += '</tbody></table>';
                                    listOfDonations.innerHTML = html;

                                })
                                .catch((error)=>{console.log(error);});
    });


//logout
const logout = document.querySelector("#logout")
logout.addEventListener('click',(e) => {
    e.preventDefault();
    authentication.signOut();
    window.location.href = "/";
});