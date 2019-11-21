fetch('//puzzle.mead.io/puzzle')
  .then(res => {
    return res.json();
  }).then(data => {
    console.log(data);
  })
  .catch(e => {

  })

const $weatherForm = document.querySelector('form');
const $location = $weatherForm.firstElementChild;
const message1 = document.querySelector('[data-js="message-1"]')
const message2 = document.querySelector('[data-js="message-2"]')

$weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  message2.textContent = '';
  message1.textContent = 'Loading...';
  const location = $location.value;

  fetch(`/weather?address=${location}`).then(res => {
    return res.json();
  }).then(data => {
    if (data.error) {
      message1.textContent = data.error
    } else {
      message1.textContent = data.location;
      message2.textContent = data.forecast;
    }
  });

});
