/**
 * Created by dawei on 01/09/14.
 * Change  by LiaoLingjia on 2015-12-15.
 *
 * Usage:
 *      1.modalmsg.alert(String msg);
 *      2.modalmsg.confirm(String msg,Callback callback);
 *      3.modalmsg.alert/confirm/dialog(Object options);
 *      4.modalmsg.popup(title,content,callback);
 *          options:
 *              colour: "red"
 *              title:  "Failed"
 *              msgKey: "Epic fail"
 *              msg:    "you failed."
 *              ctrls:
 *                  ok:
 *                      display:    "OK"
 *                      class:      "btn-primary btn"
 *                      callback:   callback(e)
 *          callback: Returns true to keep modal alive 返回true可保持窗口不被关闭.
 */

(function ($) {
    var modalHtmls = {
        dialog: [
            "<div class='modal fade' tabindex='-1' role='dialog'>",
            "   <div class='modalmsg-dialog modal-dialog '>",
            "       <div class='modal-content modal-modalmsg'>",
            "       </div>",
            "   </div>",
            "</div>"
        ].join(""),
        body  : [
            "<div class='modal-body'>",
            "   <div>",
            "       <i class='fa-info-circle fa-2x fa pull-left'>",
            "       </i>",
            "       <p style='margin-top: 10px;font-size: 14px'><i class='icon-warning-sign modal-icon' style='margin-right: 20px'></i> <strong></strong></p>",
            "   </div>",
            "</div>"
        ].join(""),
        bodyPopup  : [
            "<div class='modalmsg-dialog modal-body'>",
            "   <div>",
            "       <p></p>",
            "   </div>",
            "</div>"
        ].join(""),
        header: [
            "<div class='modalmsg-dialog modal-header'>",
            "   <h4 class='modal-title'>",
            "   </h4>",
            "</div>"
        ].join(""),
        footer: [
            "<div class='modalmsg-dialog modal-footer'>",
            "</div>"
        ].join(""),
        close : [
            "<span class='close' data-dismiss='modal' aria-hidden='true'>",
            "&times;</span>"
        ].join("")
    };

    var modalmsg = {};
    var cnf = {
        locale: "zh_CN"
    };
    modalmsg.dialog = function (opts) {

        var dialog = $(modalHtmls.dialog);
        var body = "";
        if(opts.type){
            body = $(modalHtmls.bodyPopup);
            body.find("p").html(opts.msg );
        }
        else{
            body = $(modalHtmls.body);
            body.find("strong").html(opts.msgKey );
            body.find("strong").after(opts.msg);
        }
        var header = $(modalHtmls.header);
        var footer = $(modalHtmls.footer);
        var close = $(modalHtmls.close);


        dialog.find(".modal-content").html(body);

        var colourClass = "alert alert-";
        switch (opts.colour) {
            case "blue":
            case "info":
                colourClass += "info";
                break;
            case "green":
            case "success":
                colourClass += "success";
                break;
            case "yellow":
            case "warning":
                colourClass += "warning";
                break;
            case "red":
                colourClass += "danger";
                break;
            case "error":
                colourClass += "danger";
                break;
            case "danger":
                colourClass += "danger";
                break;
            case "white":
                colourClass  = " ";
                break;
            default:
                //colourClass += "danger";

        }
        //body.children("div").addClass(colourClass);

        body.before(header);
        header.prepend(close);
        header.find(".modal-title").html(opts.title);

        body.after(footer);
        $.each(opts.ctrls, function (k, v) {
            var ctrl = $("<span ></span>");
            ctrl.addClass(v.class);
            ctrl.html(v.display);
            ctrl.click(function (e) {
                invokeCallback(e, dialog, v.callback);
            });
            footer.append(ctrl);
        });

        dialog.modal().on("hidden.bs.modal", function () {dialog.remove()});
        return dialog;
    };

    function invokeCallback(e, dialog, callback) {
        var bool = $.isFunction(callback) && callback(e) === true;
        bool || dialog.modal("hide");
    }

    modalmsg.initialise = function () {
        if (typeof arguments[0] === "object")
            $.extend(cnf, arguments[0]);
    };

    modalmsg.alert = function (msg) {
        var opts = {
            ctrls : {
                ok: {
                    display : translate("ok"),
                    class   : "btn btn-primary",
                    callback: null
                }
            },
            title : translate("errorTitle"),
            msgKey: translate("errorMsgKey"),
            colour: "error"};


        switch (typeof msg) {
            case "string":
                $.extend(true, opts, {msg: msg});
                break;
            case "object":
            default:
                $.extend(true, opts, msg);
        }

        return modalmsg.dialog(opts);
    };
    modalmsg.confirm = function (msg, callback) {
        var opts = {
            ctrls : {
                cancel : {
                    display : translate("cancel"),
                    class   : "btn btn-default",
                    callback: null},
                confirm: {
                    display : translate("confirm"),
                    class   : "btn btn-primary",
                    callback: null}},
            title : translate("confirmTitle"),
            msgKey: translate("confirmMsgKey"),
            colour: "info"};


        switch (typeof msg) {
            case "string":
                $.extend(true, opts, {
                    msg  : msg,
                    ctrls: {
                        confirm: {
                            callback: callback
                        }}});
                break;
            case "object":
            default:
                $.extend(true, opts, msg);
        }

        return modalmsg.dialog(opts);
    };

    modalmsg.popup = function (title,content, callback) {
        var opts = {
            ctrls : {
                cancel : {
                    display : translate("cancel"),
                    class   : "btn btn-default",
                    callback: null},
                confirm: {
                    display : translate("confirm"),
                    class   : "btn btn-primary",
                    callback: null}},
            title : title,
            msgKey: "",
            colour: "white",
            type:"popup"
        };

        switch (typeof content) {
            case "string":
                $.extend(true, opts, {
                    msg  : content,
                    ctrls: {
                        confirm: {
                            callback: callback
                        }}});
                break;
            case "object":
            default:
                $.extend(true, opts, content);
        }
        return modalmsg.dialog(opts);
    };

    function translate(k) {
        var locale = resolveLocale(cnf.locale);
        return locale ? locale[k] : locales.en[k];
    }

    function resolveLocale(mnemonic) {
        var p = "^" + mnemonic;
        var locale = null;
        $.each(locales, function (k, v) {
            if (k.match(p)) {
                locale = v;
                return false;
            } else
                return true;
        });
        return locale;
    }

    var locales = {
        en   : {
            confirmTitle : "Notice",
            confirmMsgKey: "Please verify: ",
            errorTitle   : "Error Message",
            errorMsgKey  : "An error has occurred: ",
            ok           : "OK",
            cancel       : "Cancel",
            confirm      : "OK"
        },
        zh_CN: {
            confirmTitle : "操作确认",
            confirmMsgKey: "",
            errorMsgKey  : "",
            errorTitle   : "错误提示",
            ok           : "确认",
            cancel       : "取消",
            confirm      : "确认"
        },
        zh_TW: {
            confirmTitle : "操作确认",
            confirmMsgKey: "请查验: ",
            errorTitle   : "错误提示",
            errorMsgKey  : "发生了错误: ",
            ok           : "確認",
            cancel       : "取消",
            confirm      : "確認"
        }
    };
    $.extend(true, window, { "modalmsg": modalmsg});
})(window.jQuery);