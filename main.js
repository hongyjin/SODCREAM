const express = require("express");//express 요청
const app = express();
const path = require('path');
const mysql = require('mysql');
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const db = require("./models/index.js");
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
app.get("/signup", (req, res) => {
        res.render("signup"); // signup.ejs 렌더링
});
app.get("/login", (req, res) => {
        res.render("login"); // login.ejs 렌더링
});
app.get("/TODO", (req, res) => { //루트 라우트 생성
        res.render("TODO");
});

//회원가입
const { User } = require('./models');
app.post("/signup", async (req, res) => {
        const { username, id, password, checkpass } = req.body;
    
        try {
            // User 테이블에 회원 정보 저장
            await User.create({
                userName: username,
                userId: id,
                password: password // 해싱 필요
            });
    
            console.log("회원가입 성공:", username);
            res.redirect("/login"); // 회원가입 완료 후 폼 페이지로 리다이렉트
        } catch (error) {
            console.error("회원가입 오류:", error);
            res.redirect("/signup"); // 오류 발생 시 폼 페이지로 리다이렉트
        }
    });

//로그인
app.post("/login", async (req, res) => {
        const { id, password } = req.body;
    
        try {
            const user = await User.findOne({ where: { id: id } });
            
            if (user) {
                if (user.password === password) {
                    console.log("로그인 성공:", user.username);
                    res.redirect("/Home"); // 로그인 성공 시 폼 페이지로 리다이렉트
                } else {
                    console.log("비밀번호가 일치하지 않음");
                    res.redirect("/login"); // 비밀번호 불일치 시 폼 페이지로 리다이렉트
                }
            } else {
                console.log("사용자가 존재하지 않음");
                res.redirect("/login"); // 사용자 없을 시 폼 페이지로 리다이렉트
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            res.redirect("/login"); // 오류 발생 시 폼 페이지로 리다이렉트
        }
    });

app.listen(app.get("port"), () => { //80번 포트 리스닝 설정
        console.log(`Server running at http://localhost:${app.get("port")}`);
});