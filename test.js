var Validator = require('./index.js');

var validator = new Validator({
    strategies: {
        isNaN(val, msg) {
            if (val !== val) {
                return msg
            }
        }
    }
});

validator.add('13764996022', 'minLength:10', '最少10个字符');
validator.add('1376499602555', 'maxLength:12', '最多12个字符');
validator.add(NaN, 'isNaN', 'not a number');
validator.add('', 'isNonEmpty', '手机号不能为空');

console.log(validator.check());