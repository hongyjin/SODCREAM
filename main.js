const express = require("express");//express 요청
const app = express();
const path = require('path');
const mysql = require('mysql');
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs"); //ejs 사용

app.use(express.static("public")); //외부에서 public 디렉토리 접근 가능
app.set("port", process.env.PORT || 3000);

//body-parser 추가
app.use(
        express.urlencoded({
                extended: false
        })
);
app.use(express.json()); // Express 미들웨어 설정

//데이터베이스 연결
const connection = mysql.createConnection({
        host: '34.64.189.108',
        user: 'yang',
        password: 'lms2',
        database: 'lms2db'
      });

app.use(express.json()); // Express 미들웨어 설정
db.sequelize.sync({force : false}) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드 
.then(() => {
        console.log('데이터 베이스 연결 성공');
})
.catch((err) => {
        console.log(err);
});

//URL 연결
console.log(homeController);
//app.get("/hobby", homeController.showHobby); //취미
//app.get("/error", errorController.pageNotFoundError); //에러
app.get('/users', (req, res) => {
        connection.query('SELECT * from User', (error, rows) => {
          if (error) throw error;
          console.log('User info is: ', rows);
          res.send(rows);
        });
      });
app.get("/", (req, res) => { //루트 라우트 생성
        res.render("Home");
});

//app.use(errorController.pageNotFoundError); //에러 처리 추
//app.use(errorController.internalServerError);

app.listen(app.get("port"), () => { //80번 포트 리스닝 설정
        console.log(`Server running at http://localhost:${app.get("port")}`);
});