

const signupDetails = document.getElementById('signup-button');

signupDetails.addEventListener('click', async (e)=>{
    e.preventDefault();
    
    console.log('clicked');

    const email = document.getElementById('email2').value;
    const password = document.getElementById('password2').value;

    console.log(email," ",password,'\n');

    const data = await fetch("http://localhost:8000/user/register",{
        method: "POST",
        body:JSON.stringify({
            email: email,
            password: password,
        }),
        headers:{
            "Content-Type": "application/json",
        }
    })
    //const d = await data.json();
    console.log(data);
    console.log(data.status);
})