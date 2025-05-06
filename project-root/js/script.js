
// TRANG ĐĂNG KÝ//

let users = JSON.parse(localStorage.getItem("users")) || [];
let btnSigup = document.getElementById('btn-signup');
let formLogin = document.getElementById('form-login');
let formSignup = document.getElementById('form-signup');
let error = document.getElementById('error');

// let passWord = document.getElementById('password').value.trim();

//function show/hide password REG
function showHidePassReg(){
    let passReg = document.getElementById('password');
        if(passReg.type === "password"){
            passReg.type = "text";
    }else{
        passReg.type = "password";
    } 
}
//function show/hide password LOGIN
function showHidePasslogin(){
    let passLogin = document.getElementById('passwordLogin');
        if(passLogin.type === "password"){
            passLogin.type = "text";
    }else{
        passLogin.type = "password";
    } 
}



btnSigup.addEventListener('click', function (event) {
    event.preventDefault();

    let email = document.getElementById('email').value.trim();
    let userName = document.getElementById('username').value.trim();
    let passWord = document.getElementById('password').value.trim();




    //mã hóa pass với SHA-256
    function hashPassword() {
        //function mã hóa pass
        let hashed = CryptoJS.SHA256(passWord);
        let strHex = hashed.toString(CryptoJS.enc.Hex);
        return strHex;
    }
    let hashedPass = hashPassword(passWord);


    if (!email || !userName || !passWord) {

        error.innerHTML = `
                <div class="headError">
                    <img src="./assets/icons/Header_Error.png" alt="">
                </div>
                <div class="textError">Email, Username hoặc Password <br>
                     không được bỏ trống! 
                    </div> `;
        // console.log(error);
        error.style.display = "block";
        errorOut();
        return;
    }






    //check mail
    if (checkEmail(email)) {

        // alert('Email đã tồn tại');
        error.innerHTML = `
                <div class="headError">
                    <img src="./assets/icons/Header_Error.png" alt="">
                </div>
                <div class="textError">Email đã tồn tại...<br>
                Vui lòng nhập Email khác! 
                    </div> `;
        error.style.display = "block";
        errorOut();
        return;
    }

    let emailFormat = /^\S+@\S+\.\S+$/;
    if (!emailFormat.test(email)) {
        error.innerHTML = `
        <div class="headError">
            <img src="./assets/icons/Header_Error.png" alt="">
        </div>
        <div class="textError">Email không hợp lệ <br>
        Vui lòng nhập đúng định dạng! 
            </div> `;
        // console.log(error);
        error.style.display = "block";
        errorOut();
        return;
    }

    //check password voi regex
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!regex.test(passWord)) {
        alert("Mật khẩu phải từ 8-20 ký tự, có ít nhất 1 chữ thường, 1 chữ hoa, 1 số");
        return;
    }


    let result = {
        id: `TR` + Math.floor(Math.random() * 1000),
        email: email,
        username: userName,
        password: hashedPass,
        role: "USER",
        birthday: "",
        Noactive: "",
        isActive: true,
        decription: "",

    }
    users.push(result);

    //NOTIFICATION KHI ĐĂNG KÝ THÀNH CÔNG
    localStorage.setItem('users', JSON.stringify(users));
    let notifiLogged = document.getElementById('logged_in');
    notifiLogged.innerHTML = `
     <div class="loggedText">
                    <img src="./assets/icons/check_circle.png" alt="">
                    <span> Đăng ký thành công</span>
                </div>`;
    setTimeout(() => {
        notifiLogged.style.display = "block";
    }, 0);

    //
    setTimeout(() => {
        notifiLogged.style.display = "none";
        formLogin.style.display = "block";
        formSignup.style.display = "none";
    }, 1500);

    return;
});
 
//CHECK EMAIL ĐÃ TỒN TẠI
function checkEmail(index) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === index) {
            return true;
        };
    };
    return false;
};


//chuyển trang đăng ký khi nhấn Click here! ở trang đăng nhập

function comeRegister() {
    formLogin.style.display = "none";
    formSignup.style.display = "block";
};

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

        //gọi hàm errout để tắt err
        errorOut();
        return;
    }


    // mã hóa passLogin để giống với mk đã hash lúc đăng ký
    let hashPassLogin = CryptoJS.SHA256(passLogin).toString(CryptoJS.enc.Hex);

    let isLogin = users.some(function (user) {

        return user.email === emailLogin && user.password === hashPassLogin;
    })
    if (isLogin) {
        // alert('Login thành công')
        //REMEMBER ME nếu được tick thì lưu trạng thái loginStatus = true vào local
        //ngược lại nếu k tick thì lưu vào session

        let loginStatus = document.getElementById('checkStatus').checked;
        console.log(loginStatus);
        
        if (loginStatus) {
            localStorage.setItem('loginStatus', true);
        } else {
            sessionStorage.setItem('loginStatus', true);
        }

        //ĐĂNG NHẬP THÀNH CÔNG
        let notiLogged = document.getElementById('logged_in');
        notiLogged.innerHTML = `
                 <div class="loggedText">
                    <img src="./assets/icons/check_circle.png" alt="">
                    <span> Đăng nhập thành công</span>
                </div>`
        // console.log(notiLogged);
        notiLogged.style.display = "block";
        document.getElementById('error').style.display = "none";
        setTimeout(() => {
            window.location.href = "./page/dashboard.html"
        }, 2000);
    }
    else {

        error.innerHTML = `
                <div class="headError">
                    <img src="./assets/icons/Header_Error.png" alt="">
                </div>
                <div class="textError">Email hoặc Password chưa đúng<br>
                Vui lòng kiểm tra lại!
                    </div> `;
        // alert('Email hoặc Mật Khẩu Không Đúng!')
        error.style.display = "block";
        errorOut();
        return;
    }

})

//function ErrorOut
function errorOut() {
    setTimeout(() => {
        error.style.display = "none";
    }, 3000);
} 


