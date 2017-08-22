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
        'comma-style': [1, 'first'] // 逗号放在下一行起始
        , 'comma-dangle': [1, 'never'] // 禁止使用拖尾逗号
    }
};