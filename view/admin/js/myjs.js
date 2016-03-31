//=============================================================================e空格
//去掉前后
function trim (str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//=============================================================================
 function exist(id){
    var s=document.getElementById('l'+id);
    if(s){return true}
    else{return false}
   }

function reinitIframe(){var iframe = document.getElementById("frame_content");

try{

var bHeight = iframe.contentWindow.document.body.scrollHeight;

var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;

var height = Math.max(bHeight, dHeight);

iframe.height =  height;

}catch (ex){}

}

//window.setInterval("reinitIframe()", 200);
		function clearme(id,htmlclass){
            if(typeof(id)=="string"){
                u=$("#"+id).attr('class',htmlclass);
            }else if(typeof(id)=='object'){
                u=$("#"+id).attr('class',htmlclass);
            }
    		writeInnerText(id,"");
		}
		
		function writeInnerText(id,text){
			if (document.getElementsByTagName("*")){
				document.getElementById(id).innerText=text;
			}else{
				document.getElementById(id).textContent=text;
			}
		}

/*
function ckreg(val){

this.val = val;

if(ckreg.prototype.cle == undefined){
       ckreg.prototype.cle = function(){
				alert(this.val);
              }

       }

}

txt=new ckreg('mememe')
txt.cle();
		*/
//===========================================邮箱start===========================================		
		function validateEmail(userEmail,htmlname,htmlclass){
			if (userEmail!=""){
				var reg=/^([\.a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+\.[a-zA-Z0-9]+\.?[a-zA-Z0-9]+/;
		     	if (reg.exec(userEmail)==null){
					document.getElementById(htmlname).className=htmlclass;
		     		writeInnerText(htmlname,"邮箱格式错误，请重新输入");
		     		return false;
		     	}else{
					return true;
				}
			}else{
				document.getElementById(htmlname).className=htmlclass;
				writeInnerText(htmlname,"邮箱地址不能为空");
				return false;
			}
		}
//===========================================邮箱end===========================================
//===========================================手机start===========================================		
		function validateMobile(val,htmlname,htmlclass){
			if (val!=""){
				var reg=/1[3-8]\d{9}/;
				if (reg.exec(val)==null){
					document.getElementById(htmlname).className=htmlclass;
					writeInnerText(htmlname,"手机号格式错误");
					return false;
				}else{
					return true;	
				}
			}else{
				document.getElementById(htmlname).className=htmlclass;
				writeInnerText(htmlname,"手机号不能为空");
				return false;
			}
		}
//===========================================手机end===========================================
//===========================================用户start===========================================		
		function filterChinese(input,htmlname,htmlclass){
    		// 提示用户全角不允许
    		if(filterFull(input,htmlname,htmlclass)){
      			return false;
    		}
    		// 过滤汉字字符集 CJK
    		input = input.replace(/[\\u4E00-\\u9FA5\\uF900-\\uFA2D]/g,'');
    		// 过滤英文、数字
    		input = input.replace(/[A-Za-z0-9]/g,'');
    		// 过滤@、下划线_、顿号.
    		input = input.replace(/[@\.\_]/g,'');
    		if(input.length>0){
				document.getElementById(htmlname).className=htmlclass;
      			writeInnerText(htmlname,"填写的内容含有非法字符，请重新输入");
      			return false;
    		}
			return true;
  		}
  
  		function filterFull(input,htmlname,htmlclass){
    		// 测试字符串中是否存在全角英文，数字，符号
    		reg = /[\uFF10-\uFF5A]/g
    		// 尝试匹配搜索字符串
    		r = input.match(reg);
    		if(r){
				document.getElementById(htmlname).className=htmlclass;
				writeInnerText(htmlname,"内容不允许使用全角字符，请重新输入");
      			return true;
    		}
      		return false;
  		}
  		
		function validateUser(val,htmlname,htmlclass,evalstr){
			if (val!=""){
				if (val.length<6 || val.length>16){
					document.getElementById(htmlname).className=htmlclass;
					writeInnerText(htmlname,"填写的内容应该在6-16字符之间，请重新输入");
					return false;
				}else{
                    var reg=/[\w]{6,16}$/;
                    if(reg.exec(val)==null){
                        writeInnerText(htmlname,"填写的内容含有非法字符，请重新输入");
                        return false;
                    }
					if (filterChinese(val,htmlname,htmlclass)){
					    document.getElementById(htmlname).className=htmlclass;
				        aj(evalstr+val,htmlname)
					}
				}
			}else{
				document.getElementById(htmlname).className=htmlclass;
				writeInnerText(htmlname,"填写的内容不能为空");
				return false;
			}
		}

        function validateNum(val,htmlname,htmlclass)
        {
            if(val!=parseInt(val)){
                document.getElementById(htmlname).className=htmlclass;
                writeInnerText(htmlname,"请填写整数");
                return false;
            }
            return true;
        }

        // function validateText(val,htmlname,htmlclass){
        //     if(val==''){
        //         document.getElementById(htmlname).className=htmlclass;
        //         writeInnerText(htmlname,"该字段不能为空");
        //     }
        // }

        function validateText(val,htmlname,htmltxt,htmlclass){
            if(val=='' || val==null){
                document.getElementById(htmlname).className=htmlclass;
                writeInnerText(htmlname,htmltxt);
                return false;
            }else{
                return true;
            }
        }

        function validateNumeric(val,htmlname,htmlclass) 
        { 
            var re = /^-?[1-9]+(\.\d+)?$|^-?0(\.\d+)?$|^-?[1-9]+[0-9]*(\.\d+)?$/; 
            if (!re.test(val)) { 
                writeInnerText(htmlname,"输入的不是一个数字");
                return false; 
            }
            return true;
        }  
//===========================================用户end===========================================
//===========================================密码start===========================================
		function validatePWD(val,htmlname,htmlclass){
			if (val==""){
				document.getElementById(htmlname).className=htmlclass;
				writeInnerText(htmlname,"密码不能为空");
				return false;
			}else{
				var reg=/^[a-zA-Z0-9!@#$%^&*()?<>_-]{6,16}$/;
				if (!reg.test(val)){
				document.getElementById(htmlname).className=htmlclass;
					writeInnerText(htmlname,"密码只能由6-16个英文,数字,符号（!@#$%^&*()?<>_-）构成");
					return false;
				}else{
					return true;
				}
			}
		}

		function validatePWD2(val,val2,htmlname,htmlclass){
			//var pwd=document.getElementById("pass1").value;
			//var pwd2=document.getElementById("pass2").value;
			if (val!=val2){
				document.getElementById(htmlname).className=htmlclass;
				writeInnerText(htmlname,"确认密码错误");
				return false;
				//return;
			}
			if (val2==""){
				document.getElementById(htmlname).className=htmlclass;
				writeInnerText(htmlname,"确认密码不能为空");
				return false;
			}else{
				var reg=/^[a-zA-Z0-9!@#$%^&*()?<>_-]{6,16}$/;
				if (reg.exec(val2)==null){
					document.getElementById(htmlname).className=htmlclass;
					writeInnerText(htmlname,"密码只能由6-16个英文,数字,符号（!@#$%^&*()?<>_-）构成");
					return false;
				}else{
					return true;
				}
			}
		}

        function validateAjax(val,htmlname,htmlclass,evalstr,text){
            if (val!=""){
                if (val.length<2 || val.length>35){
                    document.getElementById(htmlname).className=htmlclass;
                    writeInnerText(htmlname,"填写的内容应该在2-35字符之间，请重新输入");
                    return false;
                }else{
                    //if (filterChinese(val,htmlname,htmlclass)){
                    //document.getElementById(htmlname).className=htmlclass;
                    aj(evalstr+val,htmlname)
                    //}
                }
            }else{
                document.getElementById(htmlname).className=htmlclass;
                writeInnerText(htmlname,"该字段不能为空");
                return false;
            }
        }
//===========================================密码end===========================================
function onlynum()
{
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13) || (window.event.keyCode == 46)|| (window.event.keyCode == 45)))
	{
	window.event.keyCode = 0 ;
	alert("请输入数字");
	}
}

function onlychinese()
{
	if ((window.event.keyCode >=32) && (window.event.keyCode <= 126))
	{
	window.event.keyCode = 0 ;
	alert("请输入中文");
	}
}

function onlyother()
{
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13) || (window.event.keyCode == 46) || (window.event.keyCode == 45) || ((window.event.keyCode >= 84) && (window.event.keyCode <= 90))))
	{
	window.event.keyCode = 0 ;
	alert("请输入0-9和T-Z之间的字符。。。");
	}
}


function closew(){
window.close()
}

// 日期选择
// By Ziyue(http://www.web-v.com/)
var months = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"); 
var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 
var days = new Array("日","一", "二", "三", "四", "五", "六"); 
var today; 

document.writeln("<div id='Calendar' style='position:absolute; z-index:1; visibility: hidden; filter:\"progid:DXImageTransform.Microsoft.Shadow(direction=135,color=#999999,strength=3)\"'></div>");

function getDays(month, year)
{ 
    //下面的这段代码是判断当前是否是闰年的 
    if (1 == month) 
        return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28; 
    else 
        return daysInMonth[month]; 
} 

function getToday() 
{ 
    //得到今天的年,月,日 
    this.now = new Date(); 
    this.year = this.now.getFullYear(); 
    this.month = this.now.getMonth(); 
    this.day = this.now.getDate(); 
}

function getStringDay(str) 
{ 
    //得到输入框的年,月,日
    var str=str.split("-")
    
    this.now = new Date(parseFloat(str[0]),parseFloat(str[1])-1,parseFloat(str[2])); 
    this.year = this.now.getFullYear(); 
    this.month = this.now.getMonth(); 
    this.day = this.now.getDate(); 
}

function newCalendar() { 
    var parseYear = parseInt(document.getElementsByTagName("*").Year.options[document.getElementsByTagName("*").Year.selectedIndex].value); 
    var newCal = new Date(parseYear, document.getElementsByTagName("*").Month.selectedIndex, 1); 
    var day = -1; 
    var startDay = newCal.getDay(); 
    var daily = 0; 
    
    if ((today.year == newCal.getFullYear()) &&(today.month == newCal.getMonth())) 
        day = today.day; 
        
    var tableCal = document.getElementsByTagName("*").calendar; 
    var intDaysInMonth =getDays(newCal.getMonth(), newCal.getFullYear());
     
    for (var intWeek = 1; intWeek < tableCal.rows.length;intWeek++) 
        for (var intDay = 0;intDay < tableCal.rows[intWeek].cells.length;intDay++) 
        { 
            var cell = tableCal.rows[intWeek].cells[intDay]; 
            if ((intDay == startDay) && (0 == daily)) 
                daily = 1; 
                
            if(day==daily) //今天，调用今天的Class 
            {
                cell.style.background='#6699CC';
                cell.style.color='#FFFFFF';
                //cell.style.fontWeight='bold';
            }
            else if(intDay==6) //周六 
                cell.style.color='green'; 
            else if (intDay==0) //周日 
                cell.style.color='red';
            
            if ((daily > 0) && (daily <= intDaysInMonth)) 
            { 
                cell.innerText = daily; 
                daily++; 
            } 
            else 
                cell.innerText = ""; 
        } 
} 

function GetDate(InputBox)
{ 
    var sDate; 
    //这段代码处理鼠标点击的情况 
    if (event.srcElement.tagName == "TD") 
        if (event.srcElement.innerText != "") 
        { 
            sDate = document.getElementsByTagName("*").Year.value + "-" + document.getElementsByTagName("*").Month.value + "-" + event.srcElement.innerText;
            eval("document.getElementsByTagName("*")."+InputBox).value=sDate;
            HiddenCalendar();
        } 
} 

function HiddenCalendar()
{
    //关闭选择窗口
    document.getElementsByTagName("*").Calendar.style.visibility='hidden';
}

function ShowCalendar(InputBox)
{
    var x,y,intLoop,intWeeks,intDays;
    var DivContent;
    var year,month,day;
    var o=eval("document.getElementsByTagName("*")."+InputBox);
    var thisyear; //真正的今年年份
    
    thisyear=new getToday();
    thisyear=thisyear.year;
    
    today = o.value;
    if(isDate(today))
        today = new getStringDay(today);
    else
        today = new getToday(); 
    
    //显示的位置
    x=o.offsetLeft;
    y=o.offsetTop;
    while(o=o.offsetParent)
    {
        x+=o.offsetLeft;
        y+=o.offsetTop;
    }
    document.getElementsByTagName("*").Calendar.style.left=x+2;
    document.getElementsByTagName("*").Calendar.style.top=y+20;
    document.getElementsByTagName("*").Calendar.style.visibility="visible";
    
    //下面开始输出日历表格(border-color:#9DBAF7)
    DivContent="<table border='0' cellspacing='0' style='border:1px solid #0066FF; background-color:#EDF2FC'>";
    DivContent+="<tr>";
    DivContent+="<td style='border-bottom:1px solid #0066FF; background-color:#C7D8FA'>";
    
    //年
    DivContent+="<select name='Year' id='Year' onChange='newCalendar()' style='font-family:Verdana; font-size:12px'>";
    for (intLoop = thisyear - 35; intLoop < (thisyear + 2); intLoop++) 
        DivContent+="<option value= " + intLoop + " " + (today.year == intLoop ? "Selected" : "") + ">" + intLoop + "</option>"; 
    DivContent+="</select>";
    
    //月
    DivContent+="<select name='Month' id='Month' onChange='newCalendar()' style='font-family:Verdana; font-size:12px'>";
    for (intLoop = 0; intLoop < months.length; intLoop++)
		DivContent+="<option value= " + (intLoop + 1) + " " + (today.month == intLoop ? "Selected" : "") + ">" + months[intLoop] + "</option>";
    DivContent+="</select>";
    
    DivContent+="</td>";
    
    DivContent+="<td style='border-bottom:1px solid #0066FF; background-color:#C7D8FA; font-weight:bold; font-family:Wingdings 2,Wingdings,Webdings; font-size:16px; padding-top:2px; color:#4477FF; cursor:hand' align='center' title='关闭' onClick='javascript:HiddenCalendar()'>S</td>";
    DivContent+="</tr>";
     
    DivContent+="<tr><td align='center' colspan='2'>";
    DivContent+="<table id='calendar' border='0' width='100%'>";
    
    //星期
    DivContent+="<tr>";
    for (intLoop = 0; intLoop < days.length; intLoop++) 
        DivContent+="<td align='center' style='font-size:12px'>" + days[intLoop] + "</td>"; 
    DivContent+="</tr>";
    
    //天
    for (intWeeks = 0; intWeeks < 6; intWeeks++)
    { 
        DivContent+="<tr>"; 
        for (intDays = 0; intDays < days.length; intDays++)
            DivContent+="<td onClick='GetDate(\"" + InputBox + "\")' style='cursor:hand; border-right:1px solid #BBBBBB; border-bottom:1px solid #BBBBBB; color:#215DC6; font-family:Verdana; font-size:12px' align='center'></td>";
        DivContent+="</tr>"; 
    } 
    DivContent+="</table></td></tr></table>";

    document.getElementsByTagName("*").Calendar.innerHTML=DivContent;
    newCalendar();
}

function isDate(dateStr)
{ 
    var datePat = /^(\d{4})(\-)(\d{1,2})(\-)(\d{1,2})$/;
    var matchArray = dateStr.match(datePat);
    if (matchArray == null) return false; 
    var month = matchArray[3];
    var day = matchArray[5]; 
    var year = matchArray[1]; 
    if (month < 1 || month > 12) return false; 
    if (day < 1 || day > 31) return false; 
    if ((month==4 || month==6 || month==9 || month==11) && day==31) return false; 
    if (month == 2)
    {
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); 
        if (day > 29 || (day==29 && !isleap)) return false; 
    } 
    return true;
}

var formchecker={
    flag:true,
    formid:"",
    jobs:['checkdate','checkrequire','checkint','checknumber','checkchinese','filterchinese','checkemail','checkurl','checkphone','checkerror'],
    check:function (formid){//表单的id
        if(formid!=undefined && jQuery.trim(formid)!=""){
            this.formid=formid+" ";
        }
        this.flag=true;
        for(i in this.jobs){
            myname=this.jobs[i];
            str='if(typeof this.'+myname+' === "function" ){this.'+myname+'();}';
            eval(str);
        }
    },
    checkrequire:function(){
        jQuery(this.formid+".require").each(function(k,v){
            if(jQuery(v).val()==''){
                jQuery(v).addClass("error");
            }
        });
    },
    checkint:function(){
        jQuery(this.formid+".checkint").each(function(k,v){
            val=jQuery(v).val();
            if(val!=parseInt(val)){
                //writeInnerText(htmlname,"请填写整数");
                jQuery(v).addClass("error");
            }
        });
    },
    checknumber:function(){
        jQuery(this.formid+".checknumber").each(function(k,v){
            val=jQuery(v).val();
            var re = /^-?[1-9]+(\.\d+)?$|^-?0(\.\d+)?$|^-?[1-9]+[0-9]*(\.\d+)?$/; 
            if (!re.test(val)) { 
                //writeInnerText(htmlname,"输入的不是一个数字");
                jQuery(v).addClass("error");
            }
        });
    },
    checkchinese:function(){
        // jQuery(this.formid+".checkchinese").each(function(k,v){
        //     if(jQuery(v).val()==''){
        //         jQuery(v).addClass("error");
        //     }
        // });
    },
    filterchinese:function(){
        jQuery(this.formid+".filterchinese").each(function(k,v){
            input=jQuery(v).val();
            // 提示用户全角不允许,测试字符串中是否存在全角英文，数字，符号
            //reg = /[\uFF10-\uFF5A]/g;
            reg=/[\\u4E00-\\u9FA5\\uF900-\\uFA2D]/g;
            if(input.match(reg)){// 尝试匹配搜索字符串
                jQuery(v).addClass("error");
            }else{
                input = input.replace(/[\u4E00-\u9FA5]/g,'');// 过滤汉字字符集 CJK
                input = input.replace(/[A-Za-z0-9]/g,'');// 过滤英文、数字
                input = input.replace(/[@\.\_]/g,'');// 过滤@、下划线_、顿号.
                if(input.length>0){
                    //writeInnerText(htmlname,"用户名含有非法字符，请重新输入");
                    jQuery(v).addClass("error");
                }
            }
        });
    },
    checkemail:function(){
        jQuery(this.formid+".checkemail").each(function(k,v){
            userEmail=jQuery(v).val();
            if (userEmail!=""){
                var reg=/^([\.a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+\.[a-zA-Z0-9]+\.?[a-zA-Z0-9]+/;
                if (reg.exec(userEmail)==null){
                    jQuery(v).addClass("error");
                }
            }else{
                jQuery(v).addClass("error");
            }
        });
    },
    checkurl:function(){
        // jQuery(this.formid+".checkurl").each(function(k,v){
        //     if(jQuery(v).val()==''){
        //         jQuery(v).addClass("error");
        //     }
        // });
    },
    checkphone:function(){
        jQuery(this.formid+".checkphone").each(function(k,v){
            val=jQuery(v).val();
            if (val!=""){
                var reg=/1[3-8]\d{9}/;
                if (reg.exec(val)==null){
                    jQuery(v).addClass("error");
                }
            }else{
                jQuery(v).addClass("error");
            }
        });
    },
    checkdate:function(){
        jQuery(this.formid+".checkdate").each(function(k,v){
            val=jQuery(v).val();
            if (val!=""){
                var datePat = /^(\d{4})(\-)(\d{1,2})(\-)(\d{1,2})$/;
                var matchArray = val.match(datePat);
                if (matchArray == null){
                    jQuery(v).addClass("error");
                    return false;
                }
                var month = matchArray[3];
                var day = matchArray[5]; 
                var year = matchArray[1]; 
                if (month < 1 || month > 12) jQuery(v).addClass("error");
                if (day < 1 || day > 31) jQuery(v).addClass("error");
                if ((month==4 || month==6 || month==9 || month==11) && day==31) jQuery(v).addClass("error");; 
                if (month == 2)
                {
                    var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); 
                    if (day > 29 || (day==29 && !isleap)) jQuery(v).addClass("error"); 
                } 
            }
        });
    },
    checkerror:function(){
        jQuery(this.formid+".error").each(function(k,v){
            formchecker.flag=false;
        });
    },
    errormsg:function(id,msg){//显示错误信息
        jQuery(id).html(msg);
    },
}
