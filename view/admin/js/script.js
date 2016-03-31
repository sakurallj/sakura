function ShowDiv(show_div,bg_div){
		var shwdiv=document.getElementById(show_div);
        shwdiv.style.display='block';
        shwdiv.style.top = document.body.scrollTop+window.screen.height/2-130+"px";
        var bgdiv = document.getElementById(bg_div);
        bgdiv.style.display='block';
        bgdiv.style.width = document.body.scrollWidth;
        $("#"+bg_div).height($(document).height());
    }

function HideDiv(hide_div,bg_div){
    document.getElementById(hide_div).style.display='none';
    document.getElementById(bg_div).style.display='none' ;
}

function showmsgbox(msg_box){
    $("#"+msg_box).show();
    $("#"+msg_box).fadeOut(2300);
}

function checkmobile(mobile){
    if(!/^1[3-8]\d{8,9}$/i.test(mobile))
    {
        return false;
    }
    return true;
}