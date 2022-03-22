const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const hbs = handlebars.create({extname: '.hbs'});
const morgan = require('morgan');
const app = express();
const port = 3000;
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();
// request chứa những thông tin liên quan tới yêu cầu gửi đi
// hoặc ứng dụng gửi lên server
// respone quyết định sẽ trả về client cái gì

// Get method xảy ra khi truy cập vào 1 website
//or click vào những thẻ a chứa những đường dẫn trang web
// get method lấy value ở trong những thẻ input có name trong 1 form
// đính lên trên URL

// Post method gửi từ client lên trên server
// gửi ngầm không đính lên trên URL

// Query parameters  truyền dữ liệu qua chính URL

// render dùng để render ra view 
// có 2 cách submit dữ liệu lên trên server:
// 1: thông qua html form
// 2: thư viện trong js: XMLHttpRequest, fetch, axios
// static
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());

// Custom middlewares
app.use(SortMiddleware);

//HTTP Logger
//app.use(morgan('combined'));
// Template engine
app.engine('hbs',hbs.engine);
app.set('view engine','hbs'); 
// thư viện path.join trả về quản lí các đường dẫn ở trong ứng dụng
app.set('views', path.join(__dirname,'resource', 'views'));

// Routes init  
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
