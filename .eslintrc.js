module.exports = {
    env: { // 环境
        browser: true
        , node: true
        , jquery: true
        , es6: true
    }, globals: { // 全局变量
        GLO: true
    }, extends: "google" // 遵循google语法规范
    , rules: { // 自定义规则
        'linebreak-style': 0 // 关闭换行符检查，防止windows和mac开发环境问题
        , 'space-before-function-paren': 0 // 关闭函数前空格检查
        , 'comma-style': [1, 'first'] // 逗号放在下一行起始
        , 'comma-dangle': [1, 'never'] // 禁止使用拖尾逗号
        , 'max-len': [2, 120] // 行长度限制120个字符
        , 'one-var': [2, 'always'] // 变量声明必须在函数顶部
        , 'arrow-parens': [2, 'as-needed'] // 箭头函数形参为一个时可省略括号
    }
};
