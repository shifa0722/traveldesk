document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const terminalId =
                document.getElementById("terminalId").value.trim();

            const userId =
                document.getElementById("userId").value.trim();

            const password =
                document.getElementById("password").value.trim();


            if (
                terminalId === "" ||
                userId === "" ||
                password === ""
            ) {

                alert("Please enter all login details.");

                return;
            }


            localStorage.setItem("travelUser", userId);

            window.location.href = "dashboard.html";

        });

    }


    const forgotPassword =
        document.getElementById("forgotPassword");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (event) {

            event.preventDefault();

            alert(
                "Please contact the administrator to reset your password."
            );

        });

    }


// dashboard user

    const displayUser =
        document.getElementById("displayUser");

    if (displayUser) {

        const user =
            localStorage.getItem("travelUser");

        if (user) {
            displayUser.textContent = user;
        }

    }


   
    //    LOGOUT
  

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            localStorage.removeItem("travelUser");

            window.location.href = "index.html";

        });

    }


 
    //    TRAIN SEARCH


    const busSearchForm =
        document.getElementById("busSearchForm");

    if (busSearchForm) {

        busSearchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const from = document.getElementById("fromStation").value;
            const to = document.getElementById("toStation").value;
            const date = document.getElementById("journeyDate").value;

            if (from === "" || to === "" || date === "") {
                alert("Please select From, To and Journey Date.");
                return;
            }

            if (from === to) {
                alert("From and To cities cannot be same.");
                return;
            }

            showBuses(from, to);

        });

    }


    const busFilter =
        document.getElementById("busFilter");

    if (busFilter) {

        busFilter.addEventListener("input", function () {

            const searchValue = busFilter.value.toLowerCase();

            document.querySelectorAll(".bus-card").forEach(function (card) {
                card.style.display =
                    card.textContent.toLowerCase().includes(searchValue)
                        ? ""
                        : "none";
            });

        });

    }

    const flightSearchForm =
        document.getElementById("flightSearchForm");

    if (flightSearchForm) {

        flightSearchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const from =
                    document.getElementById("fromStation").value;

                const to =
                    document.getElementById("toStation").value;

                const date =
                    document.getElementById("journeyDate").value;

                if (from === "" || to === "" || date === "") {

                    alert("Please select From, To and Journey Date.");

                    return;
                }

                if (from === to) {

                    alert("From and To airports cannot be same.");

                    return;
                }

                showFlights(from, to);

            }
        );

    }


    const flightFilter =
        document.getElementById("flightFilter");

    if (flightFilter) {

        flightFilter.addEventListener("input", function () {

            const searchValue =
                flightFilter.value.toLowerCase();

            document.querySelectorAll(".flight-card").forEach(function (card) {

                card.style.display =
                    card.textContent.toLowerCase().includes(searchValue)
                        ? ""
                        : "none";

            });

        });

    }

    const trainSearchForm =
        document.getElementById("trainSearchForm");


    if (trainSearchForm) {

        trainSearchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const from =
                    document.getElementById("fromStation").value;

                const to =
                    document.getElementById("toStation").value;

                const date =
                    document.getElementById("journeyDate").value;


                if (
                    from === "" ||
                    to === "" ||
                    date === ""
                ) {

                    alert(
                        "Please select From, To and Journey Date."
                    );

                    return;
                }


                if (from === to) {

                    alert(
                        "From and To stations cannot be same."
                    );

                    return;
                }


                showTrains(from, to);

            }
        );

    }

    const trainFilter =
        document.getElementById("trainFilter");

    if (trainFilter) {

        trainFilter.addEventListener(
            "input",
            function () {

                const searchValue =
                    trainFilter.value.toLowerCase();

                const trainCards =
                    document.querySelectorAll(".train-card");


                trainCards.forEach(function (card) {

                    const trainText =
                        card.textContent.toLowerCase();


                    if (
                        trainText.includes(searchValue)
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

            }
        );

    }



    //    PASSENGER FORM


    const passengerForm =
        document.getElementById("passengerForm");


    if (passengerForm) {

        passengerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("passengerName").value.trim();

                const contact =
                    document.getElementById("contactNumber").value.trim();

                const email =
                    document.getElementById("email").value.trim();

                const gender =
                    document.getElementById("gender").value;

                const address =
                    document.getElementById("address").value.trim();


                if (
                    name === "" ||
                    contact === "" ||
                    email === "" ||
                    gender === "" ||
                    address === ""
                ) {

                    alert(
                        "Please fill all required passenger details."
                    );

                    return;
                }


                if (!/^[0-9]{10}$/.test(contact)) {

                    alert(
                        "Please enter a valid 10 digit contact number."
                    );

                    return;
                }


                const otpModal =
                    new bootstrap.Modal(
                        document.getElementById("otpModal")
                    );

                otpModal.show();

            }
        );

    }


    //    OTP VERIFICATION

    const verifyOtp =
        document.getElementById("verifyOtp");


    if (verifyOtp) {

        verifyOtp.addEventListener(
            "click",
            function () {

                const otp =
                    document.getElementById("otpInput").value.trim();

                const otpMessage =
                    document.getElementById("otpMessage");


                if (otp === "123456") {

                    otpMessage.innerHTML =
                        '<div class="alert alert-success">OTP Verified!</div>';


                    createBooking();

                } else {

                    otpMessage.innerHTML =
                        '<div class="alert alert-danger">Invalid OTP. Please try again.</div>';

                }

            }
        );

    }


    //    LOAD TICKET
   

     loadHistory();
    loadTicket();

});



//    SAMPLE TRAIN DATA


const trains = [

    {
        number: "12124",
        name: "Deccan Queen",
        departure: "07:15 AM",
        arrival: "10:25 AM",
        fare: 845,
        availableSeats: 24,
        classes: ["1A", "2A", "CC"]
    },

    {
        number: "12110",
        name: "Panchavati Express",
        departure: "06:40 AM",
        arrival: "10:15 AM",
        fare: 620,
        availableSeats: 18,
        classes: ["2A", "3A", "SL"]
    },

    {
        number: "11010",
        name: "Sinhagad Express",
        departure: "09:25 AM",
        arrival: "12:55 PM",
        fare: 480,
        availableSeats: 31,
        classes: ["2A", "3A", "SL", "CC"]
    },

    {
        number: "11030",
        name: "Koyna Express",
        departure: "08:40 AM",
        arrival: "01:00 PM",
        fare: 710,
        availableSeats: 12,
        classes: ["1A", "2A", "3A", "SL"]
    }

];


const flights = [

    {
        number: "6E 204",
        name: "IndiGo",
        departure: "06:20 AM",
        arrival: "08:25 AM",
        fare: 4250,
        classes: ["Economy"]
    },

    {
        number: "AI 865",
        name: "Air India",
        departure: "09:10 AM",
        arrival: "11:20 AM",
        fare: 3890,
        classes: ["Economy", "Business"]
    },

    {
        number: "UK 955",
        name: "Vistara",
        departure: "02:45 PM",
        arrival: "04:50 PM",
        fare: 6200,
        classes: ["Premium Economy", "Business"]
    }

];


const buses = [

    {
        number: "VRL 102",
        name: "VRL Travels",
        departure: "09:00 PM",
        arrival: "05:30 AM",
        fare: 950,
        availableSeats: 22,
        classes: ["Sleeper", "AC Sleeper"]
    },

    {
        number: "SRS 218",
        name: "SRS Travels",
        departure: "07:30 AM",
        arrival: "01:15 PM",
        fare: 720,
        availableSeats: 16,
        classes: ["Seater", "Sleeper"]
    },

    {
        number: "KSRTC 406",
        name: "KSRTC Airavat",
        departure: "10:45 PM",
        arrival: "06:20 AM",
        fare: 1100,
        availableSeats: 9,
        classes: ["Seater", "AC Sleeper"]
    }

];


let selectedTrain = null;

let selectedClass = null;



//    SHOW TRAINS


function showTrains(from, to) {

    const section =
        document.getElementById("trainResultsSection");

    const container =
        document.getElementById("trainResults");


    section.classList.remove("d-none");


    container.innerHTML = "";


    trains.forEach(function (train) {

        let classButtons = "";


        train.classes.forEach(function (className) {

            classButtons += `

                <button
                    class="btn btn-outline-primary btn-sm me-2 mb-2 class-btn"
                    onclick="selectTrain('${train.number}', '${className}')"
                >
                    ${className}
                </button>

            `;

        });


        container.innerHTML += `

            <div class="card train-card border-0 shadow-sm mb-3">

                <div class="card-body">

                    <div class="row align-items-center">

                        <div class="col-md-3">

                            <h5 class="fw-bold">
                                ${train.name}
                            </h5>

                            <small class="text-muted">
                                Train No: ${train.number}
                            </small>

                        </div>


                        <div class="col-md-3">

                            <strong>
                                ${train.departure}
                            </strong>

                            <br>

                            <small>
                                ${from}
                            </small>

                        </div>


                        <div class="col-md-2">

                            <strong>
                                ${train.arrival}
                            </strong>

                            <br>

                            <small>
                                ${to}
                            </small>

                        </div>


                        <div class="col-md-2 train-availability">

                            <small class="text-muted d-block">
                                Fare from
                            </small>

                            <strong>
                                ₹${train.fare}
                            </strong>

                            <small class="text-success d-block mt-1">
                                ${train.availableSeats} seats available
                            </small>

                        </div>


                        <div class="col-md-3">

                            <p class="mb-2 fw-semibold">
                                Select Class
                            </p>

                            ${classButtons}

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

}


//    SELECT TRAIN


function selectTrain(trainNumber, className) {

    selectedTrain =
        trains.find(function (train) {

            return train.number === trainNumber;

        });


    selectedClass = className;


    const passengerSection =
        document.getElementById("passengerSection");


    passengerSection.classList.remove("d-none");


    document.getElementById(
        "selectedTrainInfo"
    ).innerHTML = `

        <strong>${selectedTrain.name}</strong>
        (${selectedTrain.number})
        <br>

        Class:
        <strong>${selectedClass}</strong>

    `;

    passengerSection.scrollIntoView({
        behavior: "smooth"
    });

}


//    CREATE BOOKING


function createBooking() {

    const passengerCount =
        Number(document.getElementById("passengerCount").value);

    const booking = {

        service:
            document.getElementById("flightSearchForm")
                ? "Flight"
                : document.getElementById("busSearchForm")
                    ? "Bus"
                    : "Train",

        pnr:
            Math.floor(
                1000000000 +
                Math.random() * 9000000000
            ),

        trainName:
            selectedTrain.name,

        trainNumber:
            selectedTrain.number,

        from:
            document.getElementById("fromStation").value,

        to:
            document.getElementById("toStation").value,

        date:
            document.getElementById("journeyDate").value,

        quota:
            document.getElementById("quota").value,

        className:
            selectedClass,

        fare:
            selectedTrain.fare,

        passengerCount:
            passengerCount,

        totalFare:
            selectedTrain.fare *
            passengerCount,

        passenger:
            document.getElementById("passengerName").value,

        contact:
            document.getElementById("contactNumber").value,

        email:
            document.getElementById("email").value,

        gender:
            document.getElementById("gender").value,

        food:
            document.getElementById("food").value

    };


    localStorage.setItem(
        "bookingData",
        JSON.stringify(booking)
    );

    const bookingHistory =
        JSON.parse(localStorage.getItem("bookingHistory") || "[]");

    bookingHistory.unshift(booking);

    localStorage.setItem(
        "bookingHistory",
        JSON.stringify(bookingHistory)
    );


    window.location.href = "ticket.html";

}


//    LOAD TICKET


function loadTicket() {

    const ticketPnr =
        document.getElementById("ticketPnr");


    if (!ticketPnr) {
        return;
    }


    const booking =
        JSON.parse(
            localStorage.getItem("bookingData")
        );


    if (!booking) {

        alert("No booking found.");

        window.location.href =
            "train.html";

        return;
    }


    document.getElementById(
        "ticketPnr"
    ).textContent =
        booking.pnr;

    const ticketType =
        document.getElementById("ticketType");

    if (ticketType) {
        ticketType.textContent =
            `${booking.service} E-Ticket`;
    }


    document.getElementById(
        "ticketTrain"
    ).textContent =
        `${booking.trainName} (${booking.trainNumber})`;


    document.getElementById(
        "ticketRoute"
    ).textContent =
        `${booking.from} → ${booking.to}`;


    document.getElementById(
        "ticketDate"
    ).textContent =
        booking.date;

    const ticketPassengers =
        document.getElementById("ticketPassengers");

    if (ticketPassengers) {
        const passengerCount =
            booking.passengerCount || 1;

        ticketPassengers.textContent =
            `${passengerCount} ${passengerCount === 1 ? "Passenger" : "Passengers"}`;
    }

    const ticketFare =
        document.getElementById("ticketFare");

    if (ticketFare) {
        const totalFare =
            booking.totalFare || booking.fare || 0;

        const passengerCount =
            booking.passengerCount || 1;

        ticketFare.textContent =
            `₹${totalFare.toLocaleString("en-IN")}`;
    }

    document.getElementById(
        "ticketClass"
    ).textContent =
        booking.className;


    document.getElementById(
        "ticketQuota"
    ).textContent =
        booking.quota;


    document.getElementById(
        "ticketPassenger"
    ).textContent =
        booking.passenger;


    document.getElementById(
        "ticketContact"
    ).textContent =
        booking.contact;


    document.getElementById(
        "ticketEmail"
    ).textContent =
        booking.email;


    document.getElementById(
        "ticketGender"
    ).textContent =
        booking.gender;


    document.getElementById(
        "ticketFood"
    ).textContent =
        booking.food;

}


/* =========================
   COMING SOON
========================= */

function comingSoon() {

    alert(
        "This service will be available soon."
    );

}


function showFlights(from, to) {

    const section =
        document.getElementById("flightResultsSection");

    const container =
        document.getElementById("flightResults");

    section.classList.remove("d-none");
    container.innerHTML = "";

    flights.forEach(function (flight) {

        let classButtons = "";

        flight.classes.forEach(function (className) {

            classButtons += `
                <button
                    class="btn btn-outline-primary btn-sm me-2 mb-2 class-btn"
                    onclick="selectFlight('${flight.number}', '${className}')"
                >
                    ${className}
                </button>
            `;

        });

        container.innerHTML += `
            <div class="card flight-card train-card border-0 shadow-sm mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <h5 class="fw-bold">${flight.name}</h5>
                            <small class="text-muted">Flight No: ${flight.number}</small>
                        </div>
                        <div class="col-md-2">
                            <strong>${flight.departure}</strong><br>
                            <small>${from}</small>
                        </div>
                        <div class="col-md-2">
                            <strong>${flight.arrival}</strong><br>
                            <small>${to}</small>
                        </div>
                        <div class="col-md-2 train-availability">
                            <small class="text-muted d-block">Fare from</small>
                            <strong>₹${flight.fare}</strong>
                        </div>
                        <div class="col-md-3">
                            <p class="mb-2 fw-semibold">Select Class</p>
                            ${classButtons}
                        </div>
                    </div>
                </div>
            </div>
        `;

    });

}


function selectFlight(flightNumber, className) {

    selectedTrain =
        flights.find(function (flight) {
            return flight.number === flightNumber;
        });

    selectedClass = className;

    const passengerSection =
        document.getElementById("passengerSection");

    passengerSection.classList.remove("d-none");

    document.getElementById("selectedTrainInfo").innerHTML = `
        <strong>${selectedTrain.name}</strong>
        (${selectedTrain.number})
        <br>
        Class: <strong>${selectedClass}</strong>
    `;

    passengerSection.scrollIntoView({
        behavior: "smooth"
    });

}


function showBuses(from, to) {

    const section = document.getElementById("busResultsSection");
    const container = document.getElementById("busResults");

    section.classList.remove("d-none");
    container.innerHTML = "";

    buses.forEach(function (bus) {

        let classButtons = "";

        bus.classes.forEach(function (className) {
            classButtons += `
                <button
                    class="btn btn-outline-primary btn-sm me-2 mb-2 class-btn"
                    onclick="selectBus('${bus.number}', '${className}')"
                >
                    ${className}
                </button>
            `;
        });

        container.innerHTML += `
            <div class="card bus-card train-card border-0 shadow-sm mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <h5 class="fw-bold">${bus.name}</h5>
                            <small class="text-muted">Bus No: ${bus.number}</small>
                        </div>
                        <div class="col-md-2">
                            <strong>${bus.departure}</strong><br>
                            <small>${from}</small>
                        </div>
                        <div class="col-md-2">
                            <strong>${bus.arrival}</strong><br>
                            <small>${to}</small>
                        </div>
                        <div class="col-md-2 train-availability">
                            <small class="text-muted d-block">Fare from</small>
                            <strong>₹${bus.fare}</strong>
                            <small class="text-success d-block mt-1">${bus.availableSeats} seats available</small>
                        </div>
                        <div class="col-md-3">
                            <p class="mb-2 fw-semibold">Select Seat Type</p>
                            ${classButtons}
                        </div>
                    </div>
                </div>
            </div>
        `;

    });

}


function selectBus(busNumber, className) {

    selectedTrain =
        buses.find(function (bus) {
            return bus.number === busNumber;
        });

    selectedClass = className;

    const passengerSection =
        document.getElementById("passengerSection");

    passengerSection.classList.remove("d-none");

    document.getElementById("selectedTrainInfo").innerHTML = `
        <strong>${selectedTrain.name}</strong>
        (${selectedTrain.number})
        <br>
        Seat Type: <strong>${selectedClass}</strong>
    `;

    passengerSection.scrollIntoView({
        behavior: "smooth"
    });

}


function loadHistory() {

    const historyList =
        document.getElementById("historyList");

    if (!historyList) {
        return;
    }

    const historyEmpty =
        document.getElementById("historyEmpty");

    const clearHistoryBtn =
        document.getElementById("clearHistoryBtn");

    const bookingHistory =
        JSON.parse(localStorage.getItem("bookingHistory") || "[]");

    if (bookingHistory.length === 0) {
        historyEmpty.classList.remove("d-none");
        clearHistoryBtn.classList.add("d-none");
        return;
    }

    historyList.innerHTML = bookingHistory.map(function (booking) {

        const totalFare =
            booking.totalFare || booking.fare || 0;

        return `
            <div class="card history-card border-0 shadow-sm mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                        <div>
                            <span class="badge bg-primary mb-2">${booking.service}</span>
                            <h5 class="fw-bold mb-1">${booking.trainName} (${booking.trainNumber})</h5>
                            <p class="text-muted mb-0">${booking.from} → ${booking.to}</p>
                        </div>
                        <div class="text-end">
                            <small class="text-muted d-block">PNR</small>
                            <strong>${booking.pnr}</strong>
                        </div>
                    </div>
                    <hr>
                    <div class="row g-3 small">
                        <div class="col-sm-4"><span class="text-muted d-block">Journey Date</span><strong>${booking.date}</strong></div>
                        <div class="col-sm-4"><span class="text-muted d-block">Class / Type</span><strong>${booking.className}</strong></div>
                        <div class="col-sm-4"><span class="text-muted d-block">Passengers / Fare</span><strong>${passengerCount} / <span class="text-success">₹${totalFare.toLocaleString("en-IN")}</span></strong></div>
                    </div>
                </div>
            </div>
        `;

    }).join("");

    clearHistoryBtn.addEventListener("click", function () {

        localStorage.removeItem("bookingHistory");
        window.location.reload();

    });

}