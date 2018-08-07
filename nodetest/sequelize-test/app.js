const Sequelize = require('sequelize');
const config = require('./config');

// 创建一个sequelize对象实例
var sequelize = new Sequelize(config.database, config.username, config.password,{
    host: config.host,
    dialect: 'mysql',
    pool : {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 定义模型Pet，告诉Sequelize如何映射数据库表
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false // 关闭Sequelize的自动添加timestamp的功能。所有的ORM框架都有一种很不好的风气，总是自作聪明地加上所谓“自动化”的功能，但是会让人感到完全摸不着头脑。
    }
);

// 往数据库中塞一些数据
// 1、用Promise的方式写
var now = Date.now();
Pet.create({
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2007-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});

// 2、用await的方式写
(async () => {
    var now = Date.now();
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();

// 查询数据
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
        // 更新数据
        p.gender = true;
        p.updateAt = Date.now();
        p.version ++;
        await p.save();
        if (p.version === 3) {
            await p.destroy(); // 删除数据
            console.log(`${p.name} was destroyed!`);
        }
    }
})();
