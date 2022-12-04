var express = require('express');
var router = express.Router();
const todolistController = require('../controller/todolist');


router.get("/quanly", todolistController.listQuanLy);
//tao moi
router.get('/add', todolistController.getTodolistCreate);
router.post('/add', todolistController.postTodolistCreate);

//xem chi tiet
router.get('/detail/:id', todolistController.getTodolistDetail);

// chinh sua
router.get('/edit/:id', todolistController.getTodolistUpdate);
router.post('/edit/:id', todolistController.postTodolistUpdate);

//xoa
router.get('/delete/:id',todolistController.getTodolistDelete);
router.post('/delete/:id',todolistController.postTodolistDelete);

// tìm kiếm
router.post("/search", todolistController.findProduct);


module.exports = router;