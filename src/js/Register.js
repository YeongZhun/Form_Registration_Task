let ageValid = false;

function getFromSession() {
    try {
        //Function implementation here with exception handling
        var url = "./types.json";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Parse the JSON response and store it in an object.
                var types = JSON.parse(xhr.responseText);

                // Get the type of class selected by the user from session storage.
                var type = sessionStorage.getItem("type");

                // Populate the heading, varieties, and city array based on the type of class selected.
                var heading = "Register for " + type + " cooking class";
                var varieties = types[type].varieties;
                var cityArray = types[type].city;

                // Set the heading and varieties in the HTML.
                document.getElementById("type").innerHTML = heading;
                var list = document.getElementById("list");
                list.innerHTML = "";
                for (var i = 0; i < varieties.length; i++) {
                    var li = document.createElement("li");
                    li.innerHTML = varieties[i];
                    list.appendChild(li);
                }

                // Get the current time
                var now = new Date();

                // Get the hour of the day
                var hour = now.getHours();

                // Greet the user based on the hour of the day
                var greeting;
                if (hour >= 23 && hour < 8) {
                    greeting = "Sorry We Are Off, Come Back Soon!";
                } else if (hour >= 8 && hour < 12) {
                    greeting = "Good Morning, Happy To see you";
                } else if (hour >= 12 && hour < 15) {
                    greeting = "Good After Noon, Happy To see you";
                } else {
                    greeting = "Good Evening, Happy To see you";
                }

                // Set the greeting in the HTML
                document.getElementById("showGreeting").innerHTML = greeting;

                showDropdown(cityArray); //I can only put here if not it doesnt work, dk why yet. How to put this in finally block instead.
            }
        };
        xhr.send();
    } catch (error) {
        // Handle the error here
        // Display an error message.
        document.getElementById("list").innerHTML =
            '<span class="error-message">Couldn\'t fetch data</span>';
        console.log(error);
    } finally {
        // Show the dropdown in the finally block
        // showDropdown(cityArray);
    }
}

function showDropdown(cityArr) {
    // Get the city dropdown element
    var dropdown = document.getElementById("showDrop");

    // Clear the existing options from the dropdown
    dropdown.innerHTML = "";

    // Add the city array to the dropdown
    for (var i = 0; i < cityArr.length; i++) {
        var option = document.createElement("option");
        option.value = cityArr[i];
        option.text = cityArr[i];
        dropdown.appendChild(option);
    }
}

function enableButton() {
    checkAge();
    // Get the name input field and select city dropdown elements.
    const nameInput = document.getElementById("yourname");
    const selectCity = document.getElementById("showDrop");

    // Add an event listener for the keyup event on the name input field.
    nameInput.addEventListener("keyup", enableButton);

    // Add an event listener for the change event on the select city dropdown.
    selectCity.addEventListener("change", enableButton);

    // Get the name entered by the user and the selected city.
    const name = nameInput.value;
    const selectedCity = selectCity.options[selectCity.selectedIndex].value; //Need to add this into condition later
    console.log("enableButton");
    console.log(ageValid);
    // Check if the name, age, and selected city are valid.
    if (name !== "" && ageValid) {
        // Enable the register button.
        document.getElementById("btn").disabled = false;
    } else {
        // Disable the register button.
        document.getElementById("btn").disabled = true;
    }
}

function changeToUpper() {
    //function implementation here
}

//debugg the below function as per given requirements
// function checkAge() {
// 	var age = document.getElementById("age").innerHTML;
// 	if (age > 18 && age < 60) {
// 		document.getElementById("ageError").innerText = "Sorry, You should be between 18-60 years old!"
// 		document.getElementById("successMessage").innerText = ""
// 		document.getElementById('btn').disabled = true;
// 		ageValid=false;
// 	} else {
// 		document.getElementById("ageError").innerText = ""
// 		ageValid=true;

// 	}
// }

function checkAge() {
    // Get the age entered by the user.
    var age = document.getElementById("age").value;

    // Check if the age is greater than 18 and less than 60.
    if (age > 18 && age < 60) {
        // Enable the register button.
        document.getElementById("btn").disabled = false;

        // Set the ageValid variable to true.
        ageValid = true;

        // Clear any error messages.
        document.getElementById("ageError").innerHTML = "";
    } else {
        // Disable the register button.
        document.getElementById("btn").disabled = true;

        // Set the ageValid variable to false.
        ageValid = false;

        // Display an error message.
        document.getElementById("ageError").innerHTML =
            "Sorry, you should be between 18-60 years old!";
    }
}

function register(event) {
    //function implementation here
    // Get the registration amount for the selected type of class.
    const registrationAmount = {
        healthy: 4500,
        desserts: 5000,
        regulars: 3500,
    };

    const amountToPay = registrationAmount[type];

    // Populate the success message.
    const successMessage = document.getElementById("successMessage");
    successMessage.innerHTML = `Registered! You will be paying ${amountToPay} at the time of admission.`;

    // Display the success message.
    successMessage.classList.remove("hidden");

	//Prevent form from refreshing
	event.preventDefault();
}
//Do not remove below line of code

if (typeof exports !== "undefined") {
    module.exports = {
        register,
        checkAge,
        enableButton,
        showDropdown,
        getFromSession,
    };
}
