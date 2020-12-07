const fs = require('fs');
const path = require('path');
const ratiao = parseFloat(100/23.4375);
const reg = /[0-9]*([.]{1}[0-9]+){0,1}rem/g
// 遍历src下的文件
fs.readdir(path.resolve(__dirname, './src'), (err, files) => {
    // console.log(files)
    files.forEach((file) => {
        let  content = fs.readFileSync(path.resolve(__dirname, './src/' + file), 'utf-8');
        console.log(typeof content)
        // console.log(content.match(reg))
        content = content.replace(reg, function(matchStr,groups,index) {
            return parseFloat( parseFloat(groups) * ratiao).toFixed(3) + 'rem'
        });
        if (!fsExistsSync(path.join(__dirname,'dist'))) {
            fs.mkdirSync(path.resolve(__dirname, './dist'))
        }
        fs.writeFileSync(path.resolve(__dirname, './dist/' + file), content);
    });
})
function fsExistsSync(path) {
    try {
        fs.accessSync(path);
    }catch (e) {
        return false
    }
    return true;
}
