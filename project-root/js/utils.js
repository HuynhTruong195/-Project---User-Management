const users = JSON.parse(localStorage.getItem('users')) || [];
let displayContainer = document.getElementById('container');
let displayContainerAdd = document.getElementById('containerAdd');
let displayContainerEdit = document.getElementById('containerEdit');
let clickBack = document.getElementById('btn-Back');

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
    window.location.href = "../index.html"
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




//DELETE USER

function deleteUserButton(index) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    render();
}




//HIEN THI USER IN MANAGEMENT
function render(data = users) { //ở search nếu render k truyền gì thì mặc định là users
    //như ở function của search thì render users đã được filtter rồi nên sẽ trả kết quả filter ra dashboard

    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += `
        <tr>
          <td>${data[i].id}</td>
          <td>${data[i].username}</td>
          <td>${data[i].email}</td>
          <td>${data[i].role}</td>
          <td>${data[i].birthday}</td>
          <td>${data[i].isActive ? "Active" : "Deactive"}</td>
          <td id = "iconAction"> 
          <span  id="btnEdit" onclick=editUserButton(${i}) data-index="${i}">
              <img src="../assets/icons/icon edit.png" alt="">
              </span>
              <span   onclick=deleteUserButton(${i}) data-index="${i}"><img src="../assets/icons/iconDelete.png" alt="">
          </span>
          </td>
        </tr>
      `;

    }

    document.getElementById('userInfo').innerHTML = str;

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

function editUserButton(index) { //index ở đây là chỉ số {i}
    currentEditIndex = index; //gán giá trị i cho current để biết đang edit người nào và lấy giá trị từ đó

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
    let role = document.getElementById('editOption').value;
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

// có độ dài của mảng users
//1 trang có 5 phần tử
let pageItem = 4;
let currentPage=1;
//có tổng bao nhiêu trang. tính bằng công thức
let totalPage = Math.ceil(users.length / pageItem);
//function render ra số trang
function renderPage(index) {
    currentPage=index;
    let str = "";
    for (let i = 0; i < totalPage; i++) {
        str +=`
         <li>${i+1} </li>
       `
    }
    document.getElementById('numberPage').innerHTML=str;
}
renderPage();




























