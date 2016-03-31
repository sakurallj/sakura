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
    var utilsHtmls = {
        loading: [
            "<div class='bg-loading' id='utils_loading'>",
            "   <div class='circle-loading'>",
            "       <div class='circle-loading-img'  ></div>",
            "       <div class='circle-loading-font' id='utils_loading_text'>loading</div>",
            "   </div>",
            "</div>"
        ].join("")
    };
    var utils = {};
    var defaultOptions = {
        loading:{
            msg:"",
            textId:"#utils_loading_text",
            id:"#utils_loading",
            imgUrl:"images/loading-circle.gif",
            imgId:"utils_img"
        }
    };
    utils.showLoading = function (opts) {
        $.extend(true,defaultOptions,opts);
        var loading = $(utilsHtmls.loading);
        loading.find(defaultOptions.loading.textId).html(defaultOptions.loading.msg);
        $('body').append(loading);
    };
    utils.hiddenLoading = function (opts) {
        $.extend(true,defaultOptions,opts);
        $(defaultOptions.loading.id).remove();
    };
    $.extend(true, window, { "ltutils": utils});
})(window.jQuery);