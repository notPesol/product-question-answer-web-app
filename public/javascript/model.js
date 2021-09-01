// Get the modal
const modal = document.getElementById("model-wrapper");

// Get the <span> element that closes the modal
const span = document.getElementById("close");


// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
  modal.style.display = "none";
}); 

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function showModel(questionId, questionName){
  modal.style.display = 'block'; 
  
  // When the user clicks on <span> (x), close the modal
  span.addEventListener('click', function() {
    modal.style.display = "none";
  }); 

  const question = document.querySelector('#question');
  const form = document.querySelector('#model-wrapper form');
  form.action = `/answer/${questionId}`;
  question.textContent = questionName;

  
}