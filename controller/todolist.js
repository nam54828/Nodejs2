// import Model
const Todolist = require('../models/todolist');

// di toi man hinh tao todolist
exports.getTodolistCreate = (req, res, next) => {
    res.render('./todolist/add');
}
// tao moi todolist
exports.postTodolistCreate = (req, res, next) => {
    /* day la phan tao moi todolist */
    console.log("data gui tu form nhap len %j", req.body);
    var data = new Todolist();
    data.hinhanh = req.body.hinhanh;
    data.title = req.body.title;
    data.description = req.body.mieuta;
    data.price = req.body.price;
    data.save(function (err) {
        console.log(err);
        res.redirect('/quanly');
    });
}

// xem chi tiet
exports.getTodolistDetail = (req, res) => {
    const ID = req.params.id;
    Todolist.findById(ID, function (err, adventure) {
        res.render('./todolist/detail', { data: adventure });
    });
}

// get thông tin update
exports.getTodolistUpdate = (req, res) => {
    const ID = req.params.id;
    Todolist.findById(ID, function (err, adventure) {
        res.render('./todolist/edit', { data: adventure });
    });
}
// cap nhat
exports.postTodolistUpdate = (req, res) => {
    const data = {
        hinhanh: req.body.hinhanh,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }
    Todolist.update({ _id: req.params.id }, data, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.redirect('/quanly');
    });
}

// đi tới trang 
exports.getTodolistDelete = (req, res) => {
    const ID = req.params.id;
    Todolist.findById(ID, function (err, resData) {
        console.log(" du lieu query %j", resData);
        res.render('./todolist/delete', { datapost: resData });
    });
}
// xoa voi method post
exports.postTodolistDelete = (req, res) => {
    console.log("chay toi xoa %j", req.params.id);
    Todolist.deleteOne({ _id: req.params.id }, function (err) {
        if (err) console.log(err);
        res.redirect('/quanly');
    });
}
//danh sach todolist
exports.listTodolist = (req, res) => {
    console.log("chay toi day");
    Todolist.get(function (err, data) {
        if (err) {
            console.log('co loi xay ra');
        } else {
            res.render('index', { data: data });
        }
    })
}
exports.listQuanLy = (req, res) => {
    Todolist.get(function (err, data) {
        if (err) {
            console.log('co loi xay ra');
        } else {
            res.render('./todolist/quanly', { data: data });
        }
    })
}
exports.findProduct = async (req, res, next) => {
    let searchProduct = req.body.searchTerm;
    let data = await Todolist.find({
        $text: { $search: searchProduct, $diacriticSensitive: true },
    })
        .then((data) => {
            res.render("index", {
                title: "Search",
                data,
            });
        })
    .catch(next);
}



