const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');

const app = new Koa();

const main = async (ctx, next) => {
    const files = ctx.request.files || {}; //files属性新版本由于安全问题有改动，旧版：ctx.request.body.files
    // console.log(files)

    const filePaths = [];
    const tmpdir = os.tmpdir();

    for (let key in files) {
        const file = files[key];
        const filePath = path.join(tmpdir, file.name);
        const reader = fs.createReadStream(file.path,{
            flags: 'r',
            encoding: 'utf8',
            autoClose: true,
            mode: 0666,
        });
        // const writer = fs.createWriteStream(filePath);
        reader.on('open', function(fd){
            console.log('[createReadStream] file was opened, fd - ', fd);
        });

        reader.on('readable', function(){
            console.log('[createReadStream] received readable');
        });

        reader.on('data', function(chunk){
            console.log('[createReadStream] read %d bytes: %s', chunk.length, chunk);
        });

        reader.on('end', function(){
            console.log('[createReadStream] read end');
        });

        reader.on('close', function(){
            console.log('[createReadStream] file was closed.');
        });

        reader.on('error', function(err){
            console.log('[createReadStream] error occured: %s', err.message);
        });
        // reader.pipe(writer);
        // filePaths.push(filePath);
    }

    // ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
app.use(main);
app.listen(3001);

//打开另一个命令行窗口，运行下面的命令，上传一个文件。注意，/path/to/file要更换为真实的文件路径。
