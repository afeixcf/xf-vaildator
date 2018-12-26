require('./assign');

var strategies = {
    isNonEmpty: function(val, msg) {
        if (val === '') {
            return msg;
        }
    },

    minLength: function(val, len, msg) {
        if (val.length < len) {
            return msg;
        }
    },

    maxLength: function(val, len, msg) {
        if (val.length > len) {
            return msg;
        }
    },

    isMobile: function (val, msg) {
        if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(val))){ 
            return msg; 
        } 
    }
};

/**
 * 
 * @param {*} o startegies:新增或复写策略对象 end:验证不通过就结果验证
 * 
 */

function Validator(o) {
    this.caches = [];
    this.strategies = Object.assign({}, strategies, o && o.strategies || {});
    this.end = typeof o.end === 'boolean' ? o.end : false;
}

Validator.prototype.add = function (val, rule, msg) {
    var arg = rule.split(':'), _this = this;
    this.caches.push(function () {
        var strategy = arg.shift();
        arg.unshift(val);
        arg.push(msg);
        
        return _this.strategies[strategy].apply(null, arg);
    });
}

Validator.prototype.check = function () {
    var messages = [];
    for (var i = 0; i < this.caches.length; i++) {
        var msg = this.caches[i]();

        if (!msg) continue;

        if (this.end) {
            return msg;
        } else {
            messages.push(msg);
        }
    }

    return messages;
}

module.exports = Validator;