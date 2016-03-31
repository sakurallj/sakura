$(function () {
    //插入顶部导航以及侧边栏
    var insertText_top = '<div class="navbar navbar-inverse"><div class="navbar-inner"><button type="button" class="btn btn-navbar visible-phone" id="menu-toggler"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="brand" href="index.html"><span>涛略台网互动系统</span><img src="" /></a><ul class="nav pull-right"><!--<li class="hidden-phone">--><!--<input class="search" type="text" />--><!--</li>--><li class="notification-dropdown hidden-phone"><a href="#" class="trigger"><i class="icon-warning-sign"></i><span class="count">8</span></a><div class="pop-dialog"><div class="pointer right"><div class="arrow"></div><div class="arrow_border"></div></div><div class="body"><a href="#" class="close-icon"><i class="icon-remove-sign"></i></a><div class="notifications"><h3>You have 6 new notifications</h3><a href="#" class="item"><i class="icon-signin"></i> New user registration<span class="time"><i class="icon-time"></i> 13 min.</span></a><a href="#" class="item"><i class="icon-signin"></i> New user registration<span class="time"><i class="icon-time"></i> 18 min.</span></a><a href="#" class="item"><i class="icon-envelope-alt"></i> New message from Alejandra<span class="time"><i class="icon-time"></i> 28 min.</span></a><a href="#" class="item"><i class="icon-signin"></i> New user registration<span class="time"><i class="icon-time"></i> 49 min.</span></a><a href="#" class="item"><i class="icon-download-alt"></i> New order placed<span class="time"><i class="icon-time"></i> 1 day.</span></a><div class="footer"><a href="#" class="logout">View all notifications</a></div></div></div></div></li><li class="notification-dropdown hidden-phone"><a href="#" class="trigger"><i class="icon-envelope-alt"></i></a><div class="pop-dialog"><div class="pointer right"><div class="arrow"></div><div class="arrow_border"></div></div><div class="body"><a href="#" class="close-icon"><i class="icon-remove-sign"></i></a><div class="messages"><a href="#" class="item"><img src="img/contact-img.png" class="display" /><div class="name">Alejandra Galván</div><div class="msg">There are many variations of available, but the majority have suffered alterations.</div><span class="time"><i class="icon-time"></i> 13 min.</span></a><a href="#" class="item"><img src="img/contact-img2.png" class="display" /><div class="name">Alejandra Galván</div><div class="msg">There are many variations of available, have suffered alterations.</div><span class="time"><i class="icon-time"></i> 26 min.</span></a><a href="#" class="item last"><img src="img/contact-img.png" class="display" /><div class="name">Alejandra Galván</div><div class="msg">There are many variations of available, but the majority have suffered alterations.</div><span class="time"><i class="icon-time"></i> 48 min.</span></a><div class="footer"><a href="#" class="logout">View all messages</a></div></div></div></div></li><li class="dropdown"><a href="#" class="dropdown-toggle hidden-phone" data-toggle="dropdown">Your account<b class="caret"></b></a><ul class="dropdown-menu"><li><a href="personal-info.html">Personal info</a></li><li><a href="#">Account settings</a></li><li><a href="#">Billing</a></li><li><a href="#">Export your data</a></li><li><a href="#">Send feedback</a></li></ul></li><li class="settings hidden-phone"><a href="personal-info.html" role="button"><i class="icon-cog"></i></a></li><li class="settings hidden-phone"><a href="signin.html" role="button"><i class="icon-share-alt"></i></a></li></ul></div></div>';
    //document.getElementById("insert-top").innerHTML = insertText_top;
    var insertText_side = '<div id="sidebar-nav"><ul id="dashboard-menu"><li id="sidebar-nav-home"><a class="dropdown-toggle" href="#"><i class="icon-home"></i><span>主页</span></a></li><li id="sidebar-nav-character"><a class="dropdown-toggle" href="#"><i class="icon-user"></i><span>角色管理</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a class="create" href="character-create.html">新建角色</a></li><li><a class="list" href="character-list.html">角色列表</a></li></ul></li><li id="sidebar-nav-user"><a class="dropdown-toggle" href="#"><i class="icon-group"></i><span>用户管理</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a class="create" href="user-create.html">新建用户</a></li><li><a class="list" href="user-list.html">用户列表</a></li></ul></li><li id="sidebar-nav-FM"><a class="dropdown-toggle" href="#"><i class="icon-headphones"></i><span>电台管理</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a class="create" href="FM-create.html">新建电台</a></li><li><a class="list" href="FM-list.html">电台列表</a></li></ul></li><li id="sidebar-nav-comment"><a class="dropdown-toggle" href="#"><i class="icon-comment"></i><span>聊天室管理</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a class="create" href="comment-create.html">新建聊天室</a></li><li><a class="list" href="comment-list.html">聊天室列表</a></li></ul></li><li id="sidebar-nav-vote"><a class="dropdown-toggle" href="#"><i class="icon-edit"></i><span>问卷管理</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a class="create" href="vote-create.html">新建问卷</a></li><li><a class="list" href="vote-list.html">问卷列表</a></li></ul></li><li id="sidebar-nav-ballot"><a class="dropdown-toggle" href="#"><i class="icon-list-alt"></i><span>投票管理</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a class="create" href="ballot-create.html">新建投票</a></li><li><a class="list" href="ballot-list.html">投票列表</a></li></ul></li><li id="sidebar-nav-mod"><a class="dropdown-toggle" href="#"><i class="icon-th-large"></i><span>模块管理</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a class="create" href="mod-create.html">新建模块</a></li><li><a class="list" href="mod-list.html">模块列表</a></li></ul></li></ul></div>';
    //document.getElementById("insert-side").innerHTML = insertText_side;
    
    // var href_sideNav = {
    //     "first_level": [{
    //         "character": "sidebar-nav-character"
    //     }, {
    //         "user": "sidebar-nav-user"
    //     }, {
    //         "vote": "sidebar-nav-vote"
    //     }, {
    //         "ballot": "sidebar-nav-ballot"
    //     }, {
    //         "mod": "sidebar-nav-mod"
    //     }, {
    //         "FM": "sidebar-nav-FM"
    //     }, {
    //         "comment": "sidebar-nav-comment"
    //     }, {
    //         "lottery": "sidebar-nav-lottery"
    //     }, {
    //         "signUp": "sidebar-nav-signUp"
    //     }],
    //     "second_level":[{
    //         "create": "create"
    //     }, {
    //         "list": "list"
    //     }]
    // };
    // var url = window.location.href;
    // var div;
    // var arrow;
    // arrow = document.createElement("div");
    // arrow.id = "arrow";
    // arrow.innerHTML = '<div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>';
    // for (var i = 0; i <= href_sideNav.first_level.length; i++) {
    //     for (var localurl in href_sideNav.first_level[i]) {
    //         if (url.indexOf(localurl) >= 0) {
    //             div = document.getElementById(href_sideNav.first_level[i][localurl]);
    //             div.appendChild(arrow);
    //             div.setAttribute('class', 'active');
    //             var div_ul = div.getElementsByTagName("ul")[0];
    //             for(var a=0; a<=href_sideNav.second_level.length; a++){
    //                 for(var second_localurl in href_sideNav.second_level[a]){
    //                     if(url.indexOf(second_localurl)>=0){
    //                         var div_ul_li_child = div_ul.getElementsByClassName(href_sideNav.second_level[a][second_localurl]);
    //                         $(div_ul).addClass('active');
    //                         $(div_ul_li_child).addClass('active');
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    var url = window.location.href;
    $("#dashboard-menu a").each(function(k,v){
        href=$(v).attr('href');
        if(url.indexOf(href)>=0){
            $(v).parent().parent().parent().addClass('active');
            $(v).parent().parent().addClass('active');
            $(v).addClass('active');
            arrow = document.createElement("div");
            arrow.id = "arrow";
            arrow.innerHTML = '<div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>';
            $(v).parent().parent().parent().append(arrow)
        }
    });

    $('.allow-ed').click(function () {
        if ($('.allow-ed:checked').length > 0) {
            $('.time-of-od').css({'display': 'block'});
        }
        else {
            $('.time-of-od').css({'display': 'none'});
        }
    });


    // navbar notification popups
    $(".notification-dropdown").each(function (index, el) {
        var $el = $(el);
        var $dialog = $el.find(".pop-dialog");
        var $trigger = $el.find(".trigger");

        $dialog.click(function (e) {
            e.stopPropagation()
        });
        $dialog.find(".close-icon").click(function (e) {
            e.preventDefault();
            $dialog.removeClass("is-visible");
            $trigger.removeClass("active");
        });
        $("body").click(function () {
            $dialog.removeClass("is-visible");
            $trigger.removeClass("active");
        });

        $trigger.click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            // hide all other pop-dialogs
            $(".notification-dropdown .pop-dialog").removeClass("is-visible");
            $(".notification-dropdown .trigger").removeClass("active")

            $dialog.toggleClass("is-visible");
            if ($dialog.hasClass("is-visible")) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    });


    // skin changer
    $(".skins-nav .skin").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("selected")) {
            return;
        }
        $(".skins-nav .skin").removeClass("selected");
        $(this).addClass("selected");

        if (!$("#skin-file").length) {
            $("head").append('<link rel="stylesheet" type="text/css" id="skin-file" href="">');
        }
        var $skin = $("#skin-file");
        if ($(this).attr("data-file")) {
            $skin.attr("href", $(this).data("file"));
        } else {
            $skin.attr("href", "");
        }

    });


    // sidebar menu dropdown toggle
    $("#dashboard-menu .dropdown-toggle").click(function (e) {
        e.preventDefault();
        var $item = $(this).parent();
        $item.toggleClass("active");
        if ($item.hasClass("active")) {
            $item.find(".submenu").slideDown("fast");
        } else {
            $item.find(".submenu").slideUp("fast");
        }
    });


    // mobile side-menu slide toggler
    var $menu = $("#sidebar-nav");
    $("body").click(function () {
        if ($menu.hasClass("display")) {
            $menu.removeClass("display");
        }
    });
    $menu.click(function (e) {
        e.stopPropagation();
    });
    $("#menu-toggler").click(function (e) {
        e.stopPropagation();
        $menu.toggleClass("display");
    });


    // build all tooltips from data-attributes
    $("[data-toggle='tooltip']").each(function (index, el) {
        $(el).tooltip({
            placement: $(this).data("placement") || 'top'
        });
    });


    // custom uiDropdown element, example can be seen in user-list.html on the 'Filter users' button
    var uiDropdown = new function () {
        var self;
        self = this;
        this.hideDialog = function ($el) {
            return $el.find(".dialog").hide().removeClass("is-visible");
        };
        this.showDialog = function ($el) {
            return $el.find(".dialog").show().addClass("is-visible");
        };
        return this.initialize = function () {
            $("html").click(function () {
                $(".ui-dropdown .head").removeClass("active");
                return self.hideDialog($(".ui-dropdown"));
            });
            $(".ui-dropdown .body").click(function (e) {
                return e.stopPropagation();
            });
            return $(".ui-dropdown").each(function (index, el) {
                return $(el).click(function (e) {
                    e.stopPropagation();
                    $(el).find(".head").toggleClass("active");
                    if ($(el).find(".head").hasClass("active")) {
                        return self.showDialog($(el));
                    } else {
                        return self.hideDialog($(el));
                    }
                });
            });
        };
    };

    // instantiate new uiDropdown from above to build the plugins
    new uiDropdown();
    tableCheckboxClickEvent();
    /**
     * table checkbox 点击事件
     */
    function tableCheckboxClickEvent(){
        // toggle all checkboxes from a table when header checkbox is clicked
        $(".table th input:checkbox").click(function () {
            $checks = $(this).closest(".table").find("tbody input:checkbox");
            if ($(this).is(":checked")) {
                $checks.prop("checked", true);
            } else {
                $checks.prop("checked", false);
            }
        });

        $(".table td input:checkbox").click(function () {
            $checks = $(this).closest(".table").find("thead input:checkbox");
            if ($(this).is(":checked")) {
                if($(this).closest(".table").find("tbody input:checked").length>=$(this).closest(".table").find("tbody input:checkbox").length){
                    $(this).closest(".table").find("thead input:checkbox").prop("checked", true);
                }
            } else {
                $checks.prop("checked", false);
            }
        });
    }
    var util = {};
    util.tableCheckboxClickEvent = tableCheckboxClickEvent;
    $.extend(true,window,{util:util});

    function left_right() {
        if ($(window).width()>=770)
        {
            $('.form-group>input.form-group-right').css({'width': $('.main-content').width() - 125 + 'px'});
            $('.form-group>div.form-group-right').css({'width': $('.main-content').width() - 125 + 'px'});
            $('.form-group>textarea.form-group-right').css({'width': $('.main-content').width() - 125 + 'px'});
            $('.left50>.form-group-right').css({'width': $('.main-content').width()/2 - 125 + 'px'});
            $('.panel-body>.form-group>.form-group-right').css({'width': $('.panel-body').width()/2 - 125 + 'px'});
            $('.note-editor').css({'width': $('.main-content').width() - 125 + 'px'});
        }
        else if ($(window).width()<770){
            $('.form-group>input.form-group-right').css({'width': '100%'});
            $('.form-group>div.form-group-right').css({'width': '100%'});
            $('.form-group>textarea.form-group-right').css({'width': '100%'});
            $('.left50>.form-group-right').css({'width': '100%'});
            $('.panel-body>.form-group>.form-group-right').css({'width': '100%'});
            $('.note-editor').css({'width': '100%'});
        }
    }
    $(window).resize(function(){
        left_right();
    });

    left_right();

});

function requeired(){
    //表单验证
    //如果是必填的，则加红星标识.
    $("form :input.required").each(function(){
        var $required = $("<strong class='must'> *</strong>"); //创建元素
        if($(this).parent().children('label').find('strong').length<=0){
            $(this).parent().children('label').append($required);
        }//然后将它追加到文档中
    });
    //文本框失去焦点后
    $('form :input.required').blur(function(){
        var $parent = $(this).parent();
        $parent.find(".input-error").remove();
        $parent.find(".clearfix").remove();
        var $labelName = $parent.find("label").html();
        //验证表单
        if( this.value==""){
            var errorMsg = ' '+$labelName+'不能为空';
            $parent.append('<div class="input-error"><i class="icon-exclamation-sign"></i>'+errorMsg+'</div><div class="clearfix"></div>');
            $parent.addClass('has-error');
        }
        else{
            $parent.removeClass('has-error');
        }
    }).keyup(function(){
        $(this).triggerHandler("blur");
    });

    $('a[data-toggle="modal"]').click(function(){
        $('.modal-dialog').css({'margin-top':($(window).height()-$('.modal-dialog').height())/2});
    });
}
requeired();

function left_right() {
    if ($(window).width()>=770)
    {
        $('.form-group input.form-group-right').css({'width': $('.main-content').width() - 125 + 'px'});
        $('.form-group div.form-group-right').css({'width': $('.main-content').width() - 125 + 'px'});
        $('.form-group textarea.form-group-right').css({'width': $('.main-content').width() - 125 + 'px'});
        $('.left50 .form-group-right').css({'width': $('.main-content').width()/2 - 125 + 'px'});
        $('.panel-body .form-group-right').css({'width': $('.panel-body').width()/2 - 125 + 'px'});
    }
    else if ($(window).width()<770){
        $('.form-group .form-group-right').css({'width':'100%'});
    }
}
$(window).resize(function(){
    left_right();
});

left_right();