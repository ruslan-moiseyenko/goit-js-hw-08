const throttle = require('lodash.throttle');

const FEEDBACKFORM_KEY = "feedback-form-state";

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
document.addEventListener('DOMContentLoaded', setFormData);

function setFormData() {
  const formData = JSON.parse(localStorage.getItem(FEEDBACKFORM_KEY));
  if (formData) {
    if (formData.email) {
      refs.email.value = formData.email;

    }
    if (formData.message) {

      refs.textarea.value = formData.message;
    }

  }
}

function onFormSubmit(e) {
  e.preventDefault();
  if (refs.email.value === "") {
    alert('You need to enter your email');
    return;
  }
  if (refs.textarea.value === "") {
    alert('Please, leave a message');
    return;
  }

  console.log(JSON.parse(localStorage.getItem(FEEDBACKFORM_KEY)));

  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACKFORM_KEY);

}

function onFormInput(e) {
  formData[e.target.name] = e.target.value
  localStorage.setItem(FEEDBACKFORM_KEY, JSON.stringify(formData));
}