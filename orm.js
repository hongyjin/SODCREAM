const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("lms2db", "yang", "lms2", {
      host: "34.64.189.108",
      port: "3306",
      dialect: "mysql",
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})