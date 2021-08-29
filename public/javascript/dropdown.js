const btn = document.getElementById('btn-toggle');
btn.addEventListener('click', () => {
  document.querySelector('.dropdown').classList.toggle('show')
});

const userToggle = document.querySelector('#btn-user-toggle');
userToggle.addEventListener('click', () => {
  document.querySelector('.dropdown-menu').classList.toggle('show');
});