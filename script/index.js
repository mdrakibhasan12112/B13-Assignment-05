
document.getElementById('signin-btn').addEventListener('click',() => {

 const inputText = document.getElementById('input-text');
 const text = inputText.value;
 console.log(text);
 const inputPin = document.getElementById('input-pin');
 const pin = inputPin.value;
 console.log(pin);

 if (text == "admin" && pin == "admin123") {
  alert("log-in successful")

  window.location.assign("/home.html")
 } else {
  alert("log-in failed")
  return;
 }
})