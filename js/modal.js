/**
 * VARIABLE
 * --------
 */
const app = {
  burgerMenu: document.querySelector("#burgerinput"),
  navbar: document.querySelector(".navbar"),
  togglerIcon: document.querySelector("#togglerIcon"),
  icon: {
    show: ["fas", "fa-times"],
    hiden: ["fas", "fa-bars"]
  },
  submitForm: document.querySelector(".btn-submit"),
  mailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  numberRegex: /^[0-9]*$/
}

const modal = {
    modalbg: document.querySelector(".register"),
    modalBtn: document.querySelectorAll(".modal-btn"),
    closeModal: document.querySelector(".close-register"),
    closeSucess: document.querySelector(".close-successRegister"),
    modalSucess: document.querySelector(".sucess-register")
}

const form = {
    firstName: document.querySelector("#first"),
    lastName: document.querySelector("#last"),
    email: document.querySelector("#email"),
    birthDate: document.querySelector("#birthdate"),
    quantity: document.querySelector("#quantity"),
    location: document.getElementsByName("location"),
    accept: document.querySelector("#checkbox1")
}

const messagesForm = {
  name: "Vous devez avoir au moins 2 caractères.",
  email: "Vous devez avoir un email valide",
  number: "Vous devez mettre un nombre",
  birthDate: "Vous devez mettre une date d'anniversaire",
  location: "Vous devez choisir une option",
  successForm: "Inscription effectuer !"
}


const errors = {
  firstName: document.querySelector("#error-first"),
  lastName: document.querySelector("#error-last"),
  email: document.querySelector("#error-email"),
  birthDate: document.querySelector("#error-birthdate"),
  quantity: document.querySelector("#error-quantity"),
  location: document.querySelector("#error-location")
  
}

const locations = {
  location1: document.querySelector("#location1"),
  location2: document.querySelector("#location2"),
  location3: document.querySelector("#location3"),
  location4: document.querySelector("#location4"),
  location5: document.querySelector("#location5"),
  location6: document.querySelector("#location6")
}

/**
 * INIT FUNCTION
 * ADD LISTENER
 * 
 * @param {*} app 
 * @param {*} modal 
 */
function init(app, modal) {
  
  const { modalBtn, modalbg, closeModal, closeSucess } = modal;
  const { submitForm, burgerMenu } = app;
  
  // launch modal event
  modalBtn.forEach((btn, event) => {
    btn.addEventListener("click", launchModal);
  });
  
  closeModal.addEventListener("click", closeModalRegister);
  
  closeSucess.addEventListener("click", closeModalSucess);
  
  burgerMenu.addEventListener("click", menuBurger);

  submitForm.addEventListener("click", formRegister)
  
};

function closeModalRegister() {
  modal.modalbg.style.display = "none";
}

function closeModalSucess() {
  modal.modalSucess.style.display = "none"
}

// launch modal form
function launchModal() {
  modal.modalbg.style.display = "block";
}



function menuBurger() {
  if (app.burgerMenu.checked) {
      app.navbar.style.display = "flex";
      app.icon.hiden.map(i => togglerIcon.classList.remove(i));
      app.icon.show.map(i => togglerIcon.classList.add(i));
  } else {
    app.navbar.style.display = "none";
    app.icon.show.map(i => togglerIcon.classList.remove(i));
    app.icon.hiden.map(i => togglerIcon.classList.add(i));
  }
}


function formRegister (event) {
  const { mailRegex } = app;
  let validateForm = true;
  event.preventDefault();

  const { firstName, lastName, email, birthDate, quantity, location, accept } = form;

  if (firstName.value.length < 3) {
    console.log(messagesForm.name);
    errors.firstName.innerHTML = messagesForm.name;
    validateForm = false;
    firstName.classList.add("error-input");
  }else {
      errors.firstName.innerHTML = "";
      firstName.classList.remove("error-input");
  }

  if (lastName.value.length < 3) {
      console.log(messagesForm.name);
      errors.lastName.innerHTML = messagesForm.name;
      validateForm = false;
      lastName.classList.add("error-input");
  } else {
      errors.lastName.innerHTML = "";
      lastName.classList.remove("error-input");
  }

  if (!email.value.match(mailRegex)) {
      console.log(messagesForm.email);
      errors.email.innerHTML = messagesForm.email;
      validateForm = false;
      email.classList.add("error-input");
  } else {
      errors.email.innerHTML = "";
      email.classList.remove("error-input");
  }

  if (birthDate.value == "") {
    errors.birthDate.innerHTML = messagesForm.birthDate;
      validateForm = false;
      birthDate.classList.add("error-input");
  } else {
    errors.birthDate.innerHTML = "";
    birthDate.classList.remove("error-input");
  }

  if (quantity.value == "" && !isNaN(quantity.value)) {
    errors.quantity.innerHTML = messagesForm.number;
      validateForm = false;
      quantity.classList.add("error-input");
  } else {
    errors.quantity.innerHTML = "";
    quantity.classList.remove("error-input");
  }

  optionForm(() => {
    errors.location.innerHTML = messagesForm.location;
    validateForm = false;
  }, () => {
      errors.location.innerHTML = ""
  });

  if (!accept.checked) {
    // SEND MESSAGE ERROR
    validateForm = false;
  }else {

  }

  if (validateForm) {
     // SHOW VALIDATE MESSAGE
     resetForm();
     console.log("INSCRIPTION OK");
     modal.modalbg.style.display = "none";
     modal.modalSucess.style.display = "flex";
  }

  if (!validateForm) validateForm = true;
}


function optionForm(error, validate) {
    const { location1, location2, location3, location4, location5, location6 } = locations;

    if (!location1.checked && !location2.checked && !location3.checked && !location4.checked && !location5.checked && !location6.checked) {
        console.log("Not checked");
        error();
    }else{
        validate();
    }
}

function resetForm() {
    form.firstName.value = "";
    form.lastName.value = "";
    form.email.value = "";
    form.birthDate.value = "";
    form.quantity.value = "";
    errors.firstName.innerHTML = "";
    errors.lastName.innerHTML = "";
    errors.birthDate.innerHTML = "";
    errors.email.innerHTML = "";
    errors.quantity.innerHTML = "";
    errors.location.innerHTML = "";
}

init(app, modal);