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
    console.log(formData);
    refs.email.value = formData.email;
    refs.textarea.value = formData.message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACKFORM_KEY);

}

function onFormInput(e) {
  formData[e.target.name] = e.target.value
  localStorage.setItem(FEEDBACKFORM_KEY, JSON.stringify(formData));
}