module.exports = {
    "extends": "google"
    , env: { // 环境
        browser: true
        , node: true
        , jquery: true
        , es6: true
    }, globals: { // 全局变量
        GLO: true
    }, rules: { // 语法规则,0>off,1>warning,2>error
        eqeqeq: 1
        , curly: 2
    }
};