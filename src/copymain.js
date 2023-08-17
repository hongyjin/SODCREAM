var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileSotre = require('session-file-store')(session)

var authRouter = require('./lib_login/auth');
var authCheck = require('./lib_login/authCheck.js');
var template = require('./lib_login/template.js');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
    res.redirect('/main');
    return false;
  }
})

// 인증 라우터
app.use('/auth', authRouter);

// 메인 페이지
app.get('/main', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  }
  var html = template.HTML('Welcome',
    `<hr>
        <h2>메인 페이지에 오신 것을 환영합니다</h2>
        <p>로그인에 성공하셨습니다.</p>`,
    authCheck.statusUI(req, res)
  );
  res.send(html);
})


app.post('/register',(req,res)=>{
  console.log('회원가입 하는중')
  const body = req.body;
  const id = body.id;
  const pw = body.pw;
  const name = body.name;
  const age = body.age;

  client.query('select * from userdata where id=?',[id],(err,data)=>{
      if(data.length == 0){
          console.log('회원가입 성공');
          client.query('insert into userdata(id, name, age, pw) values(?,?,?,?)',[
              id, name, age, pw
          ]);
          res.redirect('/');
      }else{
          console.log('회원가입 실패');
          res.send('<script>alert("회원가입 실패");</script>')
          res.redirect('/login');
      }
  });
});

app.get('/logout',(req,res)=>{
  console.log('로그아웃 성공');
  req.session.destroy(function(err){
      // 세션 파괴후 할 것들
      res.redirect('/');
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})