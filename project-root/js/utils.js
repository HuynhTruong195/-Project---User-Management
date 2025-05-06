const users = JSON.parse(localStorage.getItem('users')) || [];
let displayContainer = document.getElementById('container');
let displayContainerAdd = document.getElementById('containerAdd');
let displayContainerEdit = document.getElementById('containerEdit');
let clickBack = document.getElementById('btn-Back');

//KIỂM TRA TRẠNG THÁI ISLOGIN NẾU #TRUE THÌ TRẢ VỀ SIGNIN TRÁNH VIỆC COPPY LINK VÀO THẲNG
let checkIsLogin = localStorage.getItem('loginStatus') || sessionStorage.getItem('loginStatus');

if (!checkIsLogin) {
    window.location.href = "../index.html";
    formLogin.style.display = "block";

}





//MẶC ĐỊNH RENDER RA TOÀN BỘ USER Ở DASHBOARD
render();

//Click addnewuser
let clickAdd = document.getElementById('add');
clickAdd.addEventListener('click', function () {
    displayContainerAdd.style.display = "block";
    displayContainer.style.display = "none";
    // displayContainerEdit.style.display = "none";

});

//click signOut

function signOut() {
    //TRƯỚC KHI SIGNOUT THÌ CONFIRM NGƯỜI DÙNG
    //khi signout thì loại bỏ 2 trạng thái lưu của remember me ở checkbox
    let textConfirm = "Xác nhận Đăng Xuất.";
    if (confirm(textConfirm)) {
        localStorage.removeItem('loginStatus');
        sessionStorage.removeItem('loginStatus');
        window.location.href = "../index.html"
    } else {
        return;
    }

}

// click backLogin in Signup




//click Back
clickBack.addEventListener('click', function () {
    displayContainer.style.display = "block";
    displayContainerAdd.style.display = "none";
    // displayContainerEdit.style.display = "none";
})

//back Add form edit
let backAdd = document.getElementById('backAddUser');
backAdd.addEventListener('click', function () {
    displayContainerAdd.style.display = "block";
    displayContainerEdit.style.display = "none";
})

//show dashboard from edit and add

function dashboard() {
    displayContainer.style.display = "block";
    displayContainerAdd.style.display = "none";
    displayContainerEdit.style.display = "none";
}



//button Back from edit 
let btnBack = document.getElementById('btn-BackformEdit');
btnBack.addEventListener('click', function () {
    displayContainer.style.display = "block";
    displayContainerEdit.style.display = "none";

});


//SEARCH USER

function searchUser() {
    let result = document.getElementById('search').value.trim().toLowerCase();
    let filter = users.filter(function (user) {
        return user.username.includes(result);
    })
    console.log(filter);
    render(filter);

}




//ADD USERS


let btnAdd = document.getElementById('btn-Add');
btnAdd.addEventListener('click', function () {
    let id = 'TR' + Math.floor(Math.random() * 1000) + document.getElementById('idcode').value.trim();
    let email = document.getElementById('email').value.trim();
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value;
    let role = document.getElementById('option').value.toUpperCase();
    let birthday = document.getElementById('date').value;
    let isActive = document.getElementById('active').checked;
    let nonActive = document.getElementById('nonactive').checked;
    let decription = document.getElementById('textarea').value;

    let user = { id, email, password, role, birthday, isActive, nonActive, decription, username };

    //check email trùng khi add

    if (checkEmail(email)) {
        alert('Email đã được sử dụng')
        return;
    }

    //check pass mix 8 ky tu

    if (password.length < 8) {
        alert('Mật khẩu ít nhất 8 ký tự');
        return;
    }

    //check bỏ trống khi add

    if (!username || !email || !password || !role) {
        alert('Vui lòng không bỏ trống!!!');
        return;
    }


    //check active chọn 1 trong 2 FORM ADD

    if ((isActive && nonActive) || (!isActive && !nonActive)) {
        alert('vui lòng chọn 1 trong 2 Status');
        return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert('Add thành công');
    displayContainerAdd.style.display = "none";
    displayContainer.style.display = "block";
    render(users);

});




// ACTIVE / DEACTIVE
//dựa theo inActive ở local render ra icon lock hay unlock 
//khi đó phải thêm giá trị ở thẻ span khi render

function changeIsActive(index) {
    //toggle trạng thái nếu isActive là true->false và ngược lại
    users[index].isActive = !users[index].isActive;
    localStorage.setItem('users', JSON.stringify(users));
    render();
}



//HIEN THI USER IN MANAGEMENT
function render(data = users) { //ở search nếu render k truyền gì thì mặc định là users
    //như ở function của search thì render users đã được filtter rồi nên sẽ trả kết quả filter ra dashboard

    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += `
        <tr class="trTable">
          <td>${data[i].id}</td>
          <td>${data[i].username}</td>
          <td>${data[i].email}</td>
          <td>${data[i].role}</td>
          <td>${data[i].birthday.split("-").reverse().join("/")}</td>
          <td class="colorIsActive ${data[i].isActive ? "active-status" : "deactivate-status"}">${data[i].isActive ? "Active" : "Deactivate"}</td>
          <td id = "iconAction"> 
          <span  id="btnEdit" onclick=editUserButton(${i}) data-index="${i}">
              <img class="iconEdit" src="../assets/icons/icon edit.png" alt="">
              </span>
              <span id="iconDashboard${i}"  onclick=changeIsActive(${i}) data-index="${i}">
                ${data[i].isActive
                ? `<i class="fa-solid fa-lock-open" style="color: #00f0a8;"></i>`
                : `<i class="fa-solid fa-lock" style="color: #ff0000;"></i>`}
          </span>
          </td>
        </tr>
      `;

    }

    document.getElementById('userInfo').innerHTML = str;

    //ĐỔI COLOR CỦA STATUS SAU KHI RENDER.
    //dùng forEach duyệt qua từng dòng isActive
    let colorIsActive = document.querySelectorAll('.colorIsActive');
    colorIsActive.forEach((index) => {
        if (index.innerHTML === "Deactivate") {
            index.style.color = "#B91C1C";
            // index.style.backgroundColor = "#FEF2F2"
            // index.style.borderRadius = "20px"
        } else {
            index.style.color = "#027A48";
            // index.style.backgroundColor = "#ECFDF3"
            // index.style.borderRadius = "20px"

        }
    });
}




//function checkEmail 

function checkEmail(emailtoCheck) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === emailtoCheck) {
            return true;
        }
    }
    return false;
}


//EDIT USER
// 1. tạo biến currentEditIndex = null để nhớ index khi nhấn edit
// 2. trước khi show form edit thì nhận giá trị index (0,1,2..)  bằng cách gán current = index để khi gọi form edit sẽ biết được đang edit ở user nào từ đó có thể trỏ đến .username
// 3. đổ dữ liệu user cần edit lên form edit bằng user[index].username ... 
// 4.sau khi save thì cập nhật lại thông tin tại users[current]

let currentEditIndex = null;

function editUserButton(index) { //index ở đây là chỉ số của btn
    currentEditIndex = index;
    //gán giá trị của btn cho current để biết đang edit người nào và lấy giá trị từ đó

    // Show form Edit, ẩn các view khác
    displayContainer.style.display = 'none';
    displayContainerAdd.style.display = 'none';
    displayContainerEdit.style.display = 'block';

    // Đổ giá trị của user ra form Edit để hiển thị
    document.getElementById('idEditUsercode').value = users[index].id;
    document.getElementById('editEmail').value = users[index].email;
    document.getElementById('editUsername').value = users[index].username;
    document.getElementById('editPassword').value = users[index].password;
    document.getElementById('editOption').value = users[index].role;
    document.getElementById('editDate').value = users[index].birthday;
    document.getElementById('editActive').checked = users[index].isActive;
    document.getElementById('editNonactive').checked = !users[index].isActive;
    document.getElementById('editTextarea').value = users[index].decription;


}


let btnSave = document.getElementById("btn-Save");
btnSave.addEventListener('click', function () {

    let id = document.getElementById('idEditUsercode').value.trim();
    let email = document.getElementById('editEmail').value.trim();
    let username = document.getElementById('editUsername').value.trim();
    let password = document.getElementById('editPassword').value;
    let role = document.getElementById('editOption').value.toUpperCase();
    let birthday = document.getElementById('editDate').value;
    let isActive = document.getElementById('editActive').checked;
    let Nonactive = document.getElementById('editNonactive').checked;
    let decription = document.getElementById('editTextarea').value;

    if (!username && !email && !password) {
        alert('Nhập đủ thông tin');
        return;

    }

    //check pass > 8
    if (password.length < 8) {
        alert('Mật khẩu ít nhất 8 ký tự');
        return;
    }

    //check bỏ trống khi add

    if (!username || !email || !password || !role) {
        alert('Vui lòng không bỏ trống!!!');
        return;
    }

    //check active chọn 1 trong 2 FORM EDIT

    if ((isActive && Nonactive) || (!isActive && !Nonactive)) {
        alert('vui lòng chọn 1 trong 2 Status');
        return;
    }

    users[currentEditIndex] = { id, email, username, password, role, birthday, isActive, Nonactive, decription };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cập nhật thành công!');
    currentEditIndex = null;
    //current = null reset lại current về null tránh trường hợp nhấn save thêm -> data bị đè
    displayContainerEdit.style.display = 'none';
    displayContainer.style.display = 'block';
    render();
})





//PHÂN TRANG
// có độ dài của mảng users
//1 trang có 5 phần tử
let pageItem = 4;
let currentPage = 1;
//có tổng bao nhiêu trang. tính bằng công thức
let totalPage = Math.ceil(users.length / pageItem);
//function render ra số trang
function renderPage(index) {
    currentPage = index;
    let str = "";
    for (let i = 0; i < totalPage; i++) {
        str += `
         <li>${i + 1} </li>
       `
    }
    document.getElementById('numberPage').innerHTML = str;
}
renderPage();




























