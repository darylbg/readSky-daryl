
const loginFormHandler = async (event) => {
  event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#psw').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            alert('u have signed in');
          document.location.replace('/');
        } else {
          alert('Failed to log in.');
        }
      }
}
document.getElementById('loginbtn').addEventListener('click', loginFormHandler);