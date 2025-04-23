
// TRANG ĐĂNG KÝ//

let users = JSON.parse(localStorage.getItem("users")) || [];
let btnSigup = document.getElementById('btn-signup');
let formLogin = document.getElementById('form-login');
let formSignup = document.getElementById('form-signup');


btnSigup.addEventListener('click', function (event) {
    event.preventDefault();

    let email = document.getElementById('email').value.trim();
    let userName = document.getElementById('username').value.trim();
    let passWord = document.getElementById('password').value.trim();

    if (!email || !userName || !passWord) {
        alert('Vui lòng nhập đủ thông tin!');
        return;
    }


    //check mail
    if (checkEmail(email)) {
        alert('Email đã tồn tại');
        return;
    }

    let emailFormat = /^\S+@\S+\.\S+$/;
    if (!emailFormat.test(email)) {
        alert('Email Không Hợp Lệ');
        return;
    }

    //check password voi regex
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!regex.test(passWord)) {
        alert("Mật khẩu phải từ 8-20 ký tự, có ít nhất 1 chữ thường, 1 chữ hoa, 1 số");
        return;
    }


    let result = {
        id: Math.floor(Math.random() * 1000),
        email: email,
        username: userName,
        password: passWord,
    }
    users.push(result);

    localStorage.setItem('users', JSON.stringify(users));
    alert('Đăng Ký Thành Công');
    formLogin.style.display = "block";
    formSignup.style.display = "none";
    return;
});

//check Email ton tai
function checkEmail(index) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === index) {
            return true;
        };
    };
    return false;
};

//chuyển trang đăng ký khi nhấn Click here! ở trang đăng nhập

let comeRegister = document.getElementById('comeRegister');
comeRegister.addEventListener('click', function () {
    formLogin.style.display = "none";
    formSignup.style.display = "block";
});

//chuyển trang đăng nhập khi nhấn click here! ở trang đăng ký

function backLogin() {
    formLogin.style.display = "block";
    formSignup.style.display = "none";
};



//TRANG LOGIN//

let btnSignin = document.getElementById('btn-signin');
btnSignin.addEventListener('click', function (event) {
    event.preventDefault();

    let emailLogin = document.getElementById('emailLogin').value.trim();
    let passLogin = document.getElementById('passwordLogin').value.trim();

    if (!emailLogin || !passLogin) {
        // alert('Mật khẩu  hoặc Email không được bỏ trống');
        document.getElementById('error').style.display = "block";
        document.getElementById('logged_in').style.display = "none";

        //set TimOut để error tự mất
        setTimeout(() => {
            document.getElementById('error').style.display = "none";
        }, 3000);
        return;
    }


    let isLogin = users.some(function (user) {
        return user.email === emailLogin && user.password === passLogin;
    })
    if (isLogin) {
        // alert('Login thành công')
        document.getElementById('logged_in').style.display = "block";
        document.getElementById('error').style.display = "none";
        setTimeout(() => {
            window.location.href = "./page/dashboard.html"

        }, 2000);
    }
    else {
        alert('Email hoặc Mật Khẩu Không Đúng!')
        return;
    }

})

