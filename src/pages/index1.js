

const loginDetails = document.getElementById('login-button');


loginDetails.addEventListener('click',async(e)=>{
    e.preventDefault();
    console.log('clicked');
    const email = document.getElementById('email1').value;
    const password = document.getElementById("password1").value;

    console.log(email,password);

    const data = await fetch("http://localhost:8000/user/login",{
        method: "POST",
        body:JSON.stringify({
            email: email,
            password: password,
        }),
        headers:{
            "Content-Type": "application/json",
        }
    })
    console.log(data);
    if(data.status<400){
        window.location.href = '../../public/drawing.html';
    }
})
