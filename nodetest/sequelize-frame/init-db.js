// 初始化数据库

require('babel-core/register')({
    presets: ['stage-3']
});

const model = require('./model.js');
model.sync();

console.log('init db ok.');
process.exit(0);




// const models = require('./models');

// models.sequelize.sync().then(() => {
//   console.log('sync done,db inited');
//   process.exit(0);
// }).catch((e) => {
//   console.log(`failed:${e}`);
//   process.exit(0);
// });
