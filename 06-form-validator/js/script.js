const form = document.getElementById("registration-form");
const username = document.getElementById("username");  
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


form.addEventListener("submit", function(e){
    e.preventDefault();

    const isRequiredValid = checkRequired([username, email, password, confirmPassword ]);
    let isFormValid = isRequiredValid;

    if(isRequiredValid){
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isPasswordMatch = checkPasswordMatch(password, confirmPassword);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch;
    }

    if(isFormValid){
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll(".form-group").forEach(group => {
            group.className = "form-group"; // Reset all form groups to default state

        })
    }
    
})

function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, `${formatFieldName(input)} must be at least ${min} characters`);
        return false;
    }else if(input.value.length > max){
        showError(input, `${formatFieldName(input)} must be less than ${max} characters`);
        return false;
    }else{
        showSuccess(input);
        return true;
    }
}

function checkEmail(email){
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value.trim())){
        showSuccess(email);
        return true;
    }else{
        showError(email, "Email is not valid");
        return false;
    }
}

function checkPasswordMatch(password, confirmPassword){
    if(password.value !== confirmPassword.value){
        showError(confirmPassword, "Passwords do not match");
        return false;
    }else{
        return true;
    }
}
function checkRequired(inputArray) {
    let isValid = true;
    inputArray.forEach(input =>{
        if(input.value.trim() === ""){
            showError(input, `${formatFieldName(input)} is required`);
            isValid = false;
        }else{
            showSuccess(input);
        }
    });
    return isValid;
}


function formatFieldName(input) {
    return input.id
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .trim();
}

function showError(input,message){
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;

}
function showSuccess(input){
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
}