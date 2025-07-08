const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData !== null) {
  const parsedData = JSON.parse(savedData);

  if (parsedData.email !== undefined) {
    form.elements.email.value = parsedData.email;
    formData.email = parsedData.email;
  }

  if (parsedData.message !== undefined) {
    form.elements.message.value = parsedData.message;
    formData.message = parsedData.message;
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name === 'email' || name === 'message') {
    formData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const isEmailEmpty = formData.email.trim() === '';
  const isMessageEmpty = formData.message.trim() === '';

  if (isEmailEmpty || isMessageEmpty) {
    alert('Fill please all fields!');
    return;
  }

  console.log('Submitted data:', formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';
});

const emailInput = form.elements.email;
const hint = emailInput.nextElementSibling;

emailInput.addEventListener('focus', () => {
  if (emailInput.value.trim() === '') {
    hint.style.opacity = '1';
  }
});

emailInput.addEventListener('blur', () => {
  if (emailInput.value.trim() === '') {
    hint.style.opacity = '0';
  }
});
