/**
 * Created by LiaoLingjia on 15-12-10.
 * jquery.validate相关客制化的代码  如 错误提语 客制化校验方法等
 */
(function ($) {
    //定义中文消息
    var cnmsg = {
        required: "不能为空",
        remote: "请修正该字段",
        email: "邮件不正确",
        url: "请输入合法的网址",
        date: "请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
        minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
        rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: $.validator.format("请输入一个最大为 {0} 的值"),
        min: $.validator.format("请输入一个最小为 {0} 的值"),
        //自定义验证方法的提示信息
        //stringCheck: "用户名只能包括中文字、英文字母、数字和下划线",
        //byteRangeLength: "用户名必须在4-15个字符之间(一个中文字算2个字符)",
        //isIdCardNo: "请正确输入您的身份证号码",
    };
    jQuery.extend(jQuery.validator.messages, cnmsg);
})(window.jQuery);