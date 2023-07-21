const express = require("express"), //express 요청
    app = express(); //express 애플리케이션의 인스턴스화
const homeController = require("../controllers/homeController");

app.set("view engine", "ejs"); //ejs 사용
//app.set("views", path.join(__dirname, "views"));
//app.use(layouts); //레이아웃 등록

app.use(express.static("public")); //외부에서 public 디렉토리 접근 가능
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.render("gerneralHome");
});

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.listen(app.get("port"), () => {
    console.log('Server running at http://localhost:${app.get("port")}');
});