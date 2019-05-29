/**
 * 作者 涛涛
 * 发布日期 2019/5/29 下午 15:59
 * 内容 ：
 *  日期格式的过滤  
 *  表单的校验
 *  数字的转换  金额
 */

var CustomTils={
	//校验字符串是否为空
	isBlank:function(text){
		if(text==null){
			return true;
		}
		if(text==""){
			return true;
		}
		if(text.length==0){
			return true;
		}
		if(text==undefined){
			return true;
		}
		return false;
	},
	//校验字符串是否不为空
	isNotBlank:function(text){
		return !(this.isBlank(text))
    },
    // 校验是否为中文
    isChinese : function(str){
        var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
        if(reg.test(str)){
            return false;
        }
        return true;
    },
	//格式化金额
	formatCurrency:function(account){
		if(this.isBlank(account)){
	    	return '￥0.00';
	    }
	    var str = this.formatNumber(account) + '';
		var intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
		var dot = str.substring(str.length,str.indexOf("."))//取到小数部分搜索
		var ret = intSum + dot;
		return "￥"+ret;
	},
	//转换成小数
	formatNumber:function(x){
		x = Number(parseFloat(x).toFixed(3).slice(0,-1));
	 	var f = parseFloat(x);  
	    if (isNaN(f)) {  
	        return false;  
	    }  
	    var f = Math.round(x*100)/100;  
	    var s = f.toString();  
	    var rs = s.indexOf('.');  
	    if (rs < 0) {  
	        rs = s.length;  
	        s += '.';  
	    }  
	    while (s.length <= rs + 2) {  
	        s += '0';  
	    }
	    return s;
	},
	//判断一个对象是否为空
	objectIsBlank:function(obj){
		if(JSON.stringify(obj)=="{}"){
			return true
		}
		if(Object.keys(obj).length==0){
			return true
		}
		return false
	},
	//判断一个对象是否不为空
	objectIsNotBlank:function(obj){
		return !(this.objectIsBlank(obj))
	},
	//拿取form表单数据转成json格式返回(基于jquery)
	formToJson:function(select){
		var arry=$(select).serializeArray();
		var data={}
		arry.forEach(function(element,index){
			if(data[element.name]){
				data[element.name] = data[element.name]+'$#'+element.value;
			}else{
				data[element.name]=element.value;
			}
		})
		return data
	},
	formToJsonNoNUll:function(select){
		var arry=$(select).serializeArray()
		var data={}
		arry.forEach(function(element,index){
			if(element.value!=""){
				data[element.name]=element.value
			}
		})
		return data
	},
	//补0操作
	getzf:function(num){
		if(parseInt(num) < 10){  
	        num = '0'+num;  
	    }  
	    return num;  
	},
	//格式化日期	格式(yyyy-MM-dd hh:mm:ss)
	formatDate:function(fmt,date){
		if(this.isBlank(date)){
			date=new Date()
		}
		date=new Date(date)
    	var o = {   
		    "M+" : date.getMonth()+1,                 //月份   
		    "d+" : date.getDate(),                    //日   
		    "h+" : date.getHours(),                   //小时   
		    "m+" : date.getMinutes(),                 //分   
		    "s+" : date.getSeconds(),                 //秒   
		    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
		    "S"  : date.getMilliseconds()             //毫秒   
		};   
		if(/(y+)/.test(fmt))   
		    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
		for(var k in o)   
			if(new RegExp("("+ k +")").test(fmt))   
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		return fmt;
	},
	//时间计算
	dateCalculate:function(date,num){
		if(this.isBlank(date)){
			date=new Date()
		}
		var a = new Date(date)
		a = a.valueOf()
		a = a - num * 24 * 60 * 60 * 1000
		a = new Date(a)
		return this.formatDate("yyyy-MM-dd hh:mm:ss",a)
	},
	/**
	 * 距离当前时间差
	 * @param date1  2019/5/29 下午2:54:45
	 * @returns {String}
	 */
	timeToNow:function(date1){
	   //兼容微信浏览器,主动格式化时间字符串
	    var arr1 = date1.split(" ");
	    var sdate = arr1[0].split('-');
	    var sTime = arr1[1].split(':');
	    var date = new Date(sdate[0], sdate[1] - 1, sdate[2], sTime[0], sTime[1], sTime[2]); 
	    var setTime = new Date(date).getTime();
	    var timer = null;
		var nowTime = new Date().getTime(),
		  leftTime = 0,
		  d = 0, h = 0, m = 0, s = 0;
		leftTime = Math.ceil((nowTime - setTime) / 1000);
		
		if (nowTime >= setTime) {
		  d = ~~(leftTime / 86400);
		  h = ~~(leftTime % 86400 / 3600);
		  m = ~~(leftTime % 86400 % 3600 / 60);
		  s = ~~(leftTime % 86400 % 3600 % 60);
		}
		if ((h + '').length == 1) {
		  h = '0' + h;
		}
		if((m+'').length==1){
		  m = '0'+m;
		}
		if ((s + '').length == 1) {
		  s = '0' + s;
		}
		return d + '天 ' + h + '时' + m + '分';
    },
    // 返回星期
    CustomWeek : function(date){
        if(date instanceof Date){
            var dayNames = new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六");
            return dayNames[date.getDay()];
        } else{
            return "Param error,date type!";
        }
    },
	// 字符串转换成日期
    CustomStringToDate : function(str){
        var   re   =   /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
        var   dt;
        if   (re.test(str)){
            dt   =   new   Date(RegExp.$1,RegExp.$2   -   1,RegExp.$3);
        }
        return dt;
    },
    //  过滤时间
     CustomTimeFilter : function(str) {
        if (!str) return '1'
        var date = new Date(str)
        //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
        var time = new Date().getTime() - date.getTime() 
        if (time < 0) {
            return ''
        } else if ((time / 1000 < 30)) {
            return '刚刚'
        } else if (time / 1000 < 60) {
            return parseInt((time / 1000)) + '秒前'
        } else if ((time / 60000) < 60) {
            return parseInt((time / 60000)) + '分钟前'
        } else if ((time / 3600000) < 24) {
            return parseInt(time / 3600000) + '小时前'
        } else if ((time / 86400000) < 31) {
            return parseInt(time / 86400000) + '天前'
        } else if ((time / 2592000000) < 12) {
            return parseInt(time / 2592000000) + '月前'
        } else {
            return parseInt(time / 31536000000) + '年前'
        }
    }
    
}
 
 
//表单校验
var CustomAlidate={
	//校验手机号码
	mobile: function(value,param){
      	return [/^(?:1\d\d)-?\d{5}(\d{3}|\*{3})$/.test(value),"手机号码不正确"]
    },
    // 验证邮箱
    email: function(value,param){
      	return [/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value),"邮箱格式不正确"];
    },
    // 判断长度
    length:function(value,param){
      var message="长度必须在在"+param[0]+"与"+param[1]+"之间";
      	if(value.length>=param[0] && value.length<=param[1]){
      		return [true]
      	}else{
      		return [false,message]
      	}
    },
    //  判断QQ号
    QQ: function (value, param){
      	return [/^[1-9]\d{4,10}$/.test(value),"QQ号码不正确"];
    },
    // 判断邮政编码
    ZIP: function (value, param){
      return [/^[0-9]\d{5}$/.test(value),'邮政编码不存在'];
    },
 
 
 
}


var CustomNumberFormat = {
      /*随机数范围*/
     random : function (min, max) {
        if (arguments.length === 2) {
            return Math.floor(min + Math.random() * ( (max+1) - min ))
        }else{
            return null;
        }
        
    },
    /*将阿拉伯数字翻译成中文的大写数字*/
     numberToChinese :  function (num) {
        var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
        var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
        var a = ("" + num).replace(/(^0*)/g, "").split("."),
            k = 0,
            re = "";
        for(var i = a[0].length - 1; i >= 0; i--) {
            switch(k) {
                case 0:
                    re = BB[7] + re;
                    break;
                case 4:
                    if(!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                        .test(a[0]))
                        re = BB[4] + re;
                    break;
                case 8:
                    re = BB[5] + re;
                    BB[7] = BB[5];
                    k = 0;
                    break;
            }
            if(k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
                re = AA[0] + re;
            if(a[0].charAt(i) != 0)
                re = AA[a[0].charAt(i)] + BB[k % 4] + re;
            k++;
        }
    
        if(a.length > 1) // 加上小数部分(如果有小数部分)
        {
            re += BB[6];
            for(var i = 0; i < a[1].length; i++)
                re += AA[a[1].charAt(i)];
        }
        if(re == '一十')
            re = "十";
        if(re.match(/^一/) && re.length == 3)
            re = re.replace("一", "");
        return re;
    },
    /*将数字转换为大写金额*/
    changeToChinese :   function  (Num) {
        //判断如果传递进来的不是字符的话转换为字符
        if(typeof Num == "number") {
            Num = new String(Num);
        };
        Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
        Num = Num.replace(/ /g, "") //替换tomoney()中的空格
        Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
        if(isNaN(Num)) { //验证输入的字符是否为数字
            //alert("请检查小写金额是否正确");
            return "";
        };
        //字符处理完毕后开始转换，采用前后两部分分别转换
        var part = String(Num).split(".");
        var newchar = "";
        //小数点前进行转化
        for(var i = part[0].length - 1; i >= 0; i--) {
            if(part[0].length > 10) {
                return "";
                //若数量超过拾亿单位，提示
            }
            var tmpnewchar = ""
            var perchar = part[0].charAt(i);
            switch(perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            switch(part[0].length - i - 1) {
                case 0:
                    tmpnewchar = tmpnewchar + "元";
                    break;
                case 1:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 2:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 3:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 4:
                    tmpnewchar = tmpnewchar + "万";
                    break;
                case 5:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 6:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 7:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 8:
                    tmpnewchar = tmpnewchar + "亿";
                    break;
                case 9:
                    tmpnewchar = tmpnewchar + "拾";
                    break;
            }
            var newchar = tmpnewchar + newchar;
        }
        //小数点之后进行转化
        if(Num.indexOf(".") != -1) {
            if(part[1].length > 2) {
                // alert("小数点之后只能保留两位,系统将自动截断");
                part[1] = part[1].substr(0, 2)
            }
            for(i = 0; i < part[1].length; i++) {
                tmpnewchar = ""
                perchar = part[1].charAt(i)
                switch(perchar) {
                    case "0":
                        tmpnewchar = "零" + tmpnewchar;
                        break;
                    case "1":
                        tmpnewchar = "壹" + tmpnewchar;
                        break;
                    case "2":
                        tmpnewchar = "贰" + tmpnewchar;
                        break;
                    case "3":
                        tmpnewchar = "叁" + tmpnewchar;
                        break;
                    case "4":
                        tmpnewchar = "肆" + tmpnewchar;
                        break;
                    case "5":
                        tmpnewchar = "伍" + tmpnewchar;
                        break;
                    case "6":
                        tmpnewchar = "陆" + tmpnewchar;
                        break;
                    case "7":
                        tmpnewchar = "柒" + tmpnewchar;
                        break;
                    case "8":
                        tmpnewchar = "捌" + tmpnewchar;
                        break;
                    case "9":
                        tmpnewchar = "玖" + tmpnewchar;
                        break;
                }
                if(i == 0) tmpnewchar = tmpnewchar + "角";
                if(i == 1) tmpnewchar = tmpnewchar + "分";
                newchar = newchar + tmpnewchar;
            }
        }
        //替换所有无用汉字
        while(newchar.search("零零") != -1)
            newchar = newchar.replace("零零", "零");
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零元", "元");
        newchar = newchar.replace("零角", "");
        newchar = newchar.replace("零分", "");
        if(newchar.charAt(newchar.length - 1) == "元") {
            newchar = newchar + "整"
        }
        return newchar;
    }
}







