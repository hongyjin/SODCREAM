const express = require("express");//express 요청
const app = express();
const session = require('express-session');
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
app.use(session({
    secret: 'your-secret-key', // 세션 암호화에 사용되는 키, 변경해주셔야 합니다
    resave: false,
    saveUninitialized: true,
}));
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
app.get('/users', (req, res) => {
        connection.query('SELECT * from User', (error, rows) => {
          if (error) throw error;
          console.log('User info is: ', rows);
          res.send(rows);
        });
      });
app.get("/", (req, res) => { //루트 라우트 생성
        res.render("gerneralHome");
});
app.get("/Home", (req, res) => { //루트 라우트 생성
    res.render("Home");
});
app.get("/signup", (req, res) => {
        res.render("signup"); // signup.ejs 렌더링
});
app.get("/login", (req, res) => {
        res.render("login"); // login.ejs 렌더링
});
app.get("/TODO", (req, res) => { 
        res.render("TODO");
});
app.get("/closet", (req, res) => { 
    res.render("colorcloset");
});
app.get("/colorcloset", (req, res) => { 
    res.render("colorcloset");
});
app.get("/eyecloset", (req, res) => { 
    res.render("eyecloset");
});
app.get("/haircloset", (req, res) => { 
    res.render("haircloset");
});
app.get("/mouthcloset", (req, res) => { 
    res.render("mouthcloset");
});
app.get("/nosecloset", (req, res) => { 
    res.render("nosecloset");
});
app.get("/othercloset", (req, res) => { 
    res.render("othercloset");
});
app.get("/shoescloset", (req, res) => { 
    res.render("shoescloset");
});
app.get("/collection", (req, res) => { 
    res.render("dictionary");
});

//회원가입
const { User } = require('./models');
app.post("/signup", async (req, res) => {
        const { username, id, password} = req.body;
    
        try {
            // User 테이블에 회원 정보 저장
            await db.User.create({
                userName: username,
                userId: userId,
                password: password // 해싱 필요..
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
        const { userId, password } = req.body;
    
        try {
            const user = await User.findOne({ where: { userId: userId } });
            
            if (user) {
                if (user.password === password) {
                    req.session.userId = user.userId; // 세션에 userId 저장
                    console.log("로그인 성공:", user.userId);
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

// Todo
app.post("/addTodo", async (req, res) => {
    const { todoContent, categoryName } = req.body;
    const userId = req.session.userId; // 클라이언트에서 받은 userId
  
    try {
        const user = await User.findOne({ where: { userId: userId } });
        // todoNum 값 조회
        const lastTodo = await db.Todo.findOne({
            where: { userId: userId },
            order: [['todoNum', 'DESC']]
        });
  
        // 기본값은 0으로 설정
        let nextTodoNum = 1;
  
        if (lastTodo) {
            nextTodoNum = lastTodo.todoNum + 1;
        }

        if (user) {
            // Todo 테이블에 새로운 Todo 추가
            await db.Todo.create({
                todoNum: nextTodoNum, // todoNum 값 설정
                todoContent: todoContent,
                categoryName: categoryName,
                userId: userId
            });

            console.log("Todo 추가 성공:", userId, todoContent);
            res.sendStatus(200); // 성공 응답
        } else {
            console.log("사용자가 존재하지 않음");
            res.sendStatus(400); // 실패 응답
        }
    } catch (error) {
      console.error("할일 추가 오류:", error);
      res.sendStatus(500);
    }
  });

//Todo 출력
app.get("/getTodos", async (req, res) => {
    const userId = req.session.userId; // 세션에서 userId 가져오기

    try {
        const todos = await db.Todo.findAll({
            where: { userId: userId },
            order: [['todoNum', 'ASC']]
        });

        res.json(todos); // JSON 형태로 Todo 목록을 클라이언트에게 전송
    } catch (error) {
        console.error("할일 목록 불러오기 오류:", error);
        res.sendStatus(500); // 오류 응답
    }
});

app.get("/TODO", async (req, res) => {
    try {
        const todos = await db.Todo.findAll({ where: { userId: req.session.userId } });
        res.render("TODO", { todos: todos }); // todos 배열을 TODO.ejs로 넘겨줌
        console.log(todos);
    } catch (error) {
        console.error("할일 목록 불러오기 오류:", error);
        res.redirect("/Home"); // 오류 발생 시 홈으로 리다이렉트
    }
});

app.listen(app.get("port"), () => { //80번 포트 리스닝 설정
        console.log(`Server running at http://localhost:${app.get("port")}`);
});