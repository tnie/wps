// --------------------------  通用常量  ---------------------------

//OA门户网站用接口,配置默认服务器接口
var OA_DOOR = {
    templateDataUrl: undefined, //正文模板列表接口
    templateBaseURL: undefined, //指定正文模板基础接口
    redHeadsPath: undefined, //默认红头模板列表获取路径
    getRedHeadPath: undefined, //默认获取红头文件路径
    bookmarkPath: undefined, //书签列表接口
    redHeadsPath: undefined, //默认红头模板列表获取路径
}
//OA系统单独触发置顶函数
function handleShowToFront(data){
   console.log(data)
}
// --------------------------  通用方法  ---------------------------
//去除字符串左边空格
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}

//去除字符串右边空格
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

//扩展js string endwith,startwith方法
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
}

String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
}

//UTF-16转UTF-8
function utf16ToUtf8(s) {
    if (!s) {
        return;
    }
    var i, code, ret = [],
        len = s.length;
    for (i = 0; i < len; i++) {
        code = s.charCodeAt(i);
        if (code > 0x0 && code <= 0x7f) {
            //单字节
            //UTF-16 0000 - 007F
            //UTF-8  0xxxxxxx
            ret.push(s.charAt(i));
        } else if (code >= 0x80 && code <= 0x7ff) {
            //双字节
            //UTF-16 0080 - 07FF
            //UTF-8  110xxxxx 10xxxxxx
            ret.push(
                //110xxxxx
                String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)),
                //10xxxxxx
                String.fromCharCode(0x80 | (code & 0x3f))
            );
        } else if (code >= 0x800 && code <= 0xffff) {
            //三字节
            //UTF-16 0800 - FFFF
            //UTF-8  1110xxxx 10xxxxxx 10xxxxxx
            ret.push(
                //1110xxxx
                String.fromCharCode(0xe0 | ((code >> 12) & 0xf)),
                //10xxxxxx
                String.fromCharCode(0x80 | ((code >> 6) & 0x3f)),
                //10xxxxxx
                String.fromCharCode(0x80 | (code & 0x3f))
            );
        }
    }

    return ret.join('');

}
var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(e) {
		var t = "";
		var n, r, i, s, o, u, a;
		var f = 0;
		e = Base64._utf8_encode(e);
		while (f < e.length) {
			n = e.charCodeAt(f++);
			r = e.charCodeAt(f++);
			i = e.charCodeAt(f++);
			s = n >> 2;
			o = (n & 3) << 4 | r >> 4;
			u = (r & 15) << 2 | i >> 6;
			a = i & 63;
			if (isNaN(r)) {
				u = a = 64
			} else if (isNaN(i)) {
				a = 64
			}
			t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
		}
		return t
	},
	decode: function(e) {
		var t = "";
		var n, r, i;
		var s, o, u, a;
		var f = 0;
		e = e.replace(/[^A-Za-z0-9+/=]/g, "");
		while (f < e.length) {
			s = this._keyStr.indexOf(e.charAt(f++));
			o = this._keyStr.indexOf(e.charAt(f++));
			u = this._keyStr.indexOf(e.charAt(f++));
			a = this._keyStr.indexOf(e.charAt(f++));
			n = s << 2 | o >> 4;
			r = (o & 15) << 4 | u >> 2;
			i = (u & 3) << 6 | a;
			t = t + String.fromCharCode(n);
			if (u != 64) {
				t = t + String.fromCharCode(r)
			}
			if (a != 64) {
				t = t + String.fromCharCode(i)
			}
		}
		t = Base64._utf8_decode(t);
		return t
	},
	_utf8_encode: function(e) {
		e = e.replace(/rn/g, "n");
		var t = "";
		for (var n = 0; n < e.length; n++) {
			var r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r)
			} else if (r > 127 && r < 2048) {
				t += String.fromCharCode(r >> 6 | 192);
				t += String.fromCharCode(r & 63 | 128)
			} else {
				t += String.fromCharCode(r >> 12 | 224);
				t += String.fromCharCode(r >> 6 & 63 | 128);
				t += String.fromCharCode(r & 63 | 128)
			}
		}
		return t
	},
	_utf8_decode: function(e) {
		var t = "";
		var n = 0;
		var r = c1 = c2 = 0;
		while (n < e.length) {
			r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r);
				n++
			} else if (r > 191 && r < 224) {
				c2 = e.charCodeAt(n + 1);
				t += String.fromCharCode((r & 31) << 6 | c2 & 63);
				n += 2
			} else {
				c2 = e.charCodeAt(n + 1);
				c3 = e.charCodeAt(n + 2);
				t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
				n += 3
			}
		}
		return t
	}
}
//UTF-8转UTF-16
function utf8ToUtf16(s) {
    if (!s) {
        return;
    }

    var i, codes, bytes, ret = [],
        len = s.length;
    for (i = 0; i < len; i++) {
        codes = [];
        codes.push(s.charCodeAt(i));
        if (((codes[0] >> 7) & 0xff) == 0x0) {
            //单字节  0xxxxxxx
            ret.push(s.charAt(i));
        } else if (((codes[0] >> 5) & 0xff) == 0x6) {
            //双字节  110xxxxx 10xxxxxx
            codes.push(s.charCodeAt(++i));
            bytes = [];
            bytes.push(codes[0] & 0x1f);
            bytes.push(codes[1] & 0x3f);
            ret.push(String.fromCharCode((bytes[0] << 6) | bytes[1]));
        } else if (((codes[0] >> 4) & 0xff) == 0xe) {
            //三字节  1110xxxx 10xxxxxx 10xxxxxx
            codes.push(s.charCodeAt(++i));
            codes.push(s.charCodeAt(++i));
            bytes = [];
            bytes.push((codes[0] << 4) | ((codes[1] >> 2) & 0xf));
            bytes.push(((codes[1] & 0x3) << 6) | (codes[2] & 0x3f));
            ret.push(String.fromCharCode((bytes[0] << 8) | bytes[1]));
        }
    }
    return ret.join('');

}

function currentTime() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var ss = now.getSeconds();
    var clock = year + "";

    if (month < 10)
        clock += "0";

    clock += month + "";

    if (day < 10)
        clock += "0";

    clock += day + "";

    if (hh < 10)
        clock += "0";

    clock += hh + "";
    if (mm < 10) clock += '0';
    clock += mm;
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

/**
 * 获取文件路径
 * @param {*} html 文件全称
 */
function getHtmlURL(html) {
    //弹出辅助窗格框
    var GetUrlPath = ()=> {
        var e = document.location.toString();
        return -1 != (e = decodeURI(e)).indexOf("/") && (e = e.substring(0, e.lastIndexOf("/"))), e
    }

    var url = GetUrlPath();

    if (url.length != 0) {
        url = url.concat("/" + html);
    } else {
        url = url.concat("./" + html);
    }
    return url;
}

/**
 * wps内弹出web页面
 * @param {*} html 文件名
 * @param {*} title 窗口标题
 * @param {*} hight 窗口高
 * @param {*} width 窗口宽
 */
function OnShowDialog(html, title, height, width, bModal) {
    var l_ActiveDoc = wps.WpsApplication().ActiveDocument;
    if (!l_ActiveDoc) {
        alert("WPS当前没有可操作文档！")
        return;
    }
    if (typeof bModal == "undefined" || bModal == null) {
        bModal = true;
    }
    width *= window.devicePixelRatio;
    height *= window.devicePixelRatio;
    var url = getHtmlURL(html);
    wps.ShowDialog(url, title, height, width, bModal);
}

/**
 * 解析返回response的参数
 * @param {*} resp
 * @return {*} body
 */
function handleResultBody(resp) {
    var result = "";
    if (resp.Body) {
        // 解析返回response的参数
    }
    return result;
}


/**
 * 判断WPS中的文件个数是否为0，若为0则关闭WPS函数
 * @param {*} name
 */
function closeWpsIfNoDocument() {
    var wpsApp = wps.WpsApplication();
    var docs = wpsApp.Documents;
    if (!docs || docs.Count == 0) {
        wps.ApiEvent.Cancel = true;
        setTimeout(function(){
            wpsApp.Quit();
        },500)
        //根据业务可以选择是否退出进程 wpsApp.Quit();
    }
}

function activeTab() {
    //启动WPS程序后，默认显示的工具栏选项卡为ribbon.xml中某一tab
    if (wps.ribbonUI)
        wps.ribbonUI.ActivateTab('WPSWorkExtTab');
}

function showOATab() {
    wps.PluginStorage.setItem("ShowOATabDocActive", pCheckIfOADoc()); //根据文件是否为OA文件来显示OA菜单
    wps.ribbonUI.Invalidate(); // 刷新Ribbon自定义按钮的状态
}

function getDemoTemplatePath() {
    var url = document.location.toString();
    url = decodeURI(url);
    if (url.indexOf("/") != -1) {
        url = url.substring(0, url.lastIndexOf("/"));
    }
    if (url.length !== 0)
        url = url.concat("/template/红头文件.docx");

    if (url.startsWith("file:///"))
        url = url.substr("file:///".length);
    return url;
}

function getDemoSealPath() {
    var url = document.location.toString();
    url = decodeURI(url);
    if (url.indexOf("/") != -1) {
        url = url.substring(0, url.lastIndexOf("/"));
    }
    if (url.length !== 0)
        url = url.concat("/template/OA模板公章.png");

    if (url.startsWith("file:///"))
        url = url.substr("file:///".length);
    return url;
}

function pGetParamName(data, attr) {
    var start = data.indexOf(attr);
    data = data.substring(start + attr.length);
    return data;
}
/**
 * 从requst中获取文件名（确保请求中有filename这个参数）
 * @param {*} request 
 * @param {*} url 
 */
 function pGetFileName(request, url) {
    var disposition = request.getResponseHeader("Content-Disposition");
    var filename = "";
    if (disposition) {
        var matchs = pGetParamName(disposition, "filename=");
        if (matchs) {
            filename = decodeURIComponent(matchs);
        } else {
            filename = "petro" + Date.getTime();
        }
    } else {
        filename = url.substring(url.lastIndexOf("/") + 1);
        filename=filename.split("?")[0]
    }
    return filename;
}


function StringToUint8Array(string) {
    var binLen, buffer, chars, i, _i;
    binLen = string.length;
    buffer = new ArrayBuffer(binLen);
    chars = new Uint8Array(buffer);
    for (var i = 0; i < binLen; ++i) {
        chars[i] = String.prototype.charCodeAt.call(string, i);
    }
    return buffer;
}
//套红
function InsertFile(url,bookmark,activeDoc,callback,callback1){ 
    DownloadFile(url,function(url){
        wps.WpsApplication().Options.PasteFormatBetweenStyledDocuments=0//跨文档保存时，设置保存源文档格式
        //清空原文页脚
        var footer=activeDoc.Sections.Item(1).Footers.Item(1);
        footer.Range.Text="";

        var selection=activeDoc.ActiveWindow.Selection;
        selection.WholeStory();//全选正文并剪切
        var oriList=getOrientation(activeDoc);
        selection.Cut();
        var doc=wps.WpsApplication().Documents.Open(url,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,false);//隐藏打开红头文件
        //var doc1 = wps.WpsApplication().ActiveDocument;
        var pageInfomation=getPageInfo(doc); //获取模板页面信息
        var selection1=doc.ActiveWindow.Selection;
        var bookMarks=doc.Bookmarks;
        if (bookMarks.Exists(bookmark)) {
            var bookmark1 = bookMarks.Item(bookmark);
            bookmark1.Range.Select(); //获取指定书签位置
            // selection1.InsertBreak(3)
            // selection1.Paste();
            var index=selection1.Information(2)
            selection1.PasteAndFormat(16)//将内容带格式粘贴到模板中
            setOrientation(oriList,index,doc)
        } else {
            alert("套红头失败，您选择的红头模板没有对应书签：" + bookmark);
        }

        selection.PageSetup.TopMargin=pageInfomation.TopMargin
        selection.PageSetup.BottomMargin=pageInfomation.BottomMargin
        selection.PageSetup.LeftMargin=pageInfomation.LeftMargin
        selection.PageSetup.RightMargin=pageInfomation.RightMargin
        selection.PageSetup.FooterDistance=pageInfomation.FooterDistance
        selection.PageSetup.HeaderDistance=pageInfomation.HeaderDistance
        // selection.PageSetup.OddAndEvenPagesHeaderFooter=pageInfomation.OddAndEvenPagesHeaderFooter//设置是否奇偶页不同
       
        
       
         selection1.WholeStory();
         selection1.Copy();
         
        activeDoc.Activate()
         
       
         selection.WholeStory()
        //  selection.InsertBreak(3) //插入连续分节符
         selection.PasteAndFormat(16);
         //粘贴完成之后，设置页码
         if(pageInfomation.isHavePageNumber){
            var pageNum=pageInfomation.PageNumbers;
            setPageNumber(pageNum.Left,pageNum.NumberStyle,pageNum.Text,pageNum.Size,pageNum.Name,pageNum.NameBi,activeDoc)
        }
        if(pageInfomation.DifferentFirstPageHeaderFooter){
            doc.Sections.Item(doc.Sections.Count).Footers.Item(1).Range.Copy();
            activeDoc.Sections.Item(1).Footers.Item(1).Range.Paste();
        }
         //复制并粘贴模板页码
         doc.Close(0);
        callback&&callback();
        callback1&&callback1()
    },undefined,true)
}

/**
 * WPS下载文件到本地打开（业务系统可根据实际情况进行修改）
 * @param {*} url 文件流的下载路径
 * @param {*} callback 下载后的回调
 * @param {*} fileName 自定义文件名称
 * @param {*} isDelete 操作完成后，是否删除本地文件
 */
function DownloadFile(url, callback, fileName, isDelete) {
    url=url.indexOf("?")>-1?url+"&newTime="+new Date().getTime():url+"?newTime="+new Date().getTime()//给文件下载地址添加时间戳
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //需要业务系统的服务端在传递文件流时，确保请求中的参数有filename
            fileName = fileName ? fileName : pGetFileName(xhr, url)
            //落地打开模式下，WPS会将文件下载到本地的临时目录，在关闭后会进行清理
            var path = wps.Env.GetTempPath() + "/" + fileName;
            var reader = new FileReader();
            reader.onload = function () {
                wps.FileSystem.Remove(path)//先删除掉本地已有的文档
                if(wps.FileSystem.Exists(path)){//如果执行了删除，还是有该文档，说明文档已打开，直接提示并返回，不执行回调函数
                    alert("已有相同名称的文档打开了");
                    return ;
                }
                wps.FileSystem.writeAsBinaryString(path, reader.result);
                callback(path);
                isDelete && wps.FileSystem.Remove(path)
            };
            reader.readAsBinaryString(xhr.response);
        }
    }
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
/**
 * WPS下载文件到本地打开（业务系统可根据实际情况进行修改）
 * @param {*} url 文件流的下载路径
 * @param {*} callback 下载后的回调
 * @param {*} fileName 自定义文件名称
 * @param {*} isDelete 操作完成后，是否删除本地文件
 */
 function DownloadFileOnline(url, callback, fileName, isDelete) {
    url=url.indexOf("?")>-1?url+"&newTime="+new Date().getTime():url+"?newTime="+new Date().getTime()//给文件下载地址添加时间戳
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //需要业务系统的服务端在传递文件流时，确保请求中的参数有filename
            fileName = fileName ? fileName : pGetFileName(xhr, url)
            //落地打开模式下，WPS会将文件下载到本地的临时目录，在关闭后会进行清理
            var path = wps.Env.GetTempPath() + "/" + fileName;
            var reader = new FileReader();
            reader.onload = function () {
                var l_Doc=wps.Application.Documents.OpenFromBinaryString({arg0:fileName,arg1:reader.result});
                callback(l_Doc);
                isDelete && wps.FileSystem.Remove(path)
            };
            reader.readAsBinaryString(xhr.response);
        }
    }
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}



/**
 * WPS上传文件到服务端（业务系统可根据实际情况进行修改，为了兼容中文，服务端约定用UTF-8编码格式）
 * @param {*} strFileName 上传到服务端的文件名称（包含文件后缀）
 * @param {*} strPath 上传文件的文件路径（文件在操作系统的绝对路径）
 * @param {*} uploadPath 上传文件的服务端地址
 * @param {*} strFieldName 业务调用方自定义的一些内容可通过此字段传递，默认赋值'file'
 * @param {*} OnSuccess 上传成功后的回调
 * @param {*} OnFail 上传失败后的回调
 */
function UploadFile(strFileName, strPath, uploadPath, strFieldName, OnSuccess, OnFail) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', uploadPath);

    var fileData = wps.FileSystem.readAsBinaryString(strPath);
    var data = new FakeFormData();
    if (strFieldName == "" || typeof strFieldName == "undefined"){//如果业务方没定义，默认设置为'file'
        strFieldName = 'file';
    }
    data.append(strFieldName, {
        name: utf16ToUtf8(strFileName), //主要是考虑中文名的情况，服务端约定用utf-8来解码。
        type: "application/octet-stream",
        getAsBinary: function () {
            return fileData;
        }
    });
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200)
                OnSuccess(xhr.response)
            else
                OnFail(xhr.response);
        }
    };
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (data.fake) {
        xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + data.boundary);
        var arr = StringToUint8Array(data.toString());
        xhr.send(arr);
    } else {
        xhr.send(data);
    }
}


/**
 * WPS上传文件到服务端（业务系统可根据实际情况进行修改，为了兼容中文，服务端约定用UTF-8编码格式）
 * @param {*} strFileName 上传到服务端的文件名称（包含文件后缀）
 * @param {*} uploadPath 上传文件的服务端地址
 * @param {*} strFieldName 业务调用方自定义的一些内容可通过此字段传递，默认赋值'file'
 * @param {*} OnSuccess 上传成功后的回调
 * @param {*} OnFail 上传失败后的回调
 */
 function UploadOnlineFile(strFileName, uploadPath, strFieldName, OnSuccess, OnFail) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', uploadPath);
    var fileData = wps.Application.ActiveDocument.SaveAsBinaryString();
    var data = new FakeFormData();
    if (strFieldName == "" || typeof strFieldName == "undefined"){//如果业务方没定义，默认设置为'file'
        strFieldName = 'file';
    }
    data.append(strFieldName, {
        name: utf16ToUtf8(strFileName), //主要是考虑中文名的情况，服务端约定用utf-8来解码。
        type: "application/octet-stream",
        getAsBinary: function () {
            return fileData;
        }
    });
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200)
                OnSuccess(xhr.response)
            else
                OnFail(xhr.response);
        }
    };
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (data.fake) {
        xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + data.boundary);
        var arr = StringToUint8Array(data.toString());
        xhr.send(arr);
    } else {
        xhr.send(data);
    }
}

/**
 * 打开WPS后通知到业务系统，可根据需求扩展
 * @param {*} p_Url 业务方接受请求的地址
 */
function NotifyToServer(p_Url) {
    $.ajax({
        url: p_Url, //   URL + '/wps/wpsCanOpen',
        async: true,
        method: "post",
        dataType: 'json'
    });
}

/**
 * 更新编辑状态
 * @param {*} p_Url 要传入OA端，通知业务系统，当前文档所处的编辑状态的URL地址路径
 * @param {*} p_OpenUrl 当前文档从业务系统打开时的入口URL，这个URL包含业务系统开发者需要传入的ID等参数
 * @param {*} docId 文档id
 * @param {*} state 0-正在编辑中 1-文件保存 2-文件关闭  状态可根据需要进行自定义扩展
 */
function UpdateEditState(p_Url, p_OpenUrl, docId, state) {
    var formData = {
        "openUrl": p_OpenUrl,
        "docId": docId,
        "state": state
    };
    $.ajax({
        url: p_Url, //URL + '/document/stateMonitor',
        async: false,
        data: formData,
        method: "post",
        dataType: 'json',
        success: function (response) {
            if (response == "success") {
                console.log(response);
            }
        },
        error: function (response) {
            console.log(response);
        }
    });
}

/**
 * 作用：判断文档关闭后，如果系统已经没有打开的文档了，则设置回初始用户名
 */
function pSetWPSAppUserName() {
    //文档全部关闭的情况下，把WPS初始启动的用户名设置回去
    if (wps.WpsApplication().Documents.Count == 1) {
        var l_strUserName = wps.PluginStorage.getItem(constStrEnum.WPSInitUserName);
        wps.WpsApplication().UserName = l_strUserName;
    }
}

/**
 *  设置文档参数的属性值
 * @param {*} Doc 
 * @param {*} Key 
 * @param {*} Value 
 */
function SetDocParamsValue(Doc, Key, Value) {
    if (!Doc || !Key) {
        return;
    }

    var l_Params = wps.PluginStorage.getItem(Doc.DocID);
    if (!l_Params) {
        return;
    }

    var l_objParams = JSON.parse(l_Params);
    if (!(typeof(l_objParams) == "undefined")) {
        l_objParams[Key] = Value;
    }

    //把属性值整体再写回原来的文档ID中
    wps.PluginStorage.setItem(Doc.DocID, JSON.stringify(l_objParams));
}
//返回文件对应的类型
function returnFormatType(newName){
    var typeList=[{
        type:"ofd",
        value:102
    },{
        type:"dot",
        value:1
    },{
        type:"txt",
        value:2
    },{
        type:"rtf",
        value:6
    },{
        type:"html",
        value:8
    },{
        type:"mht",
        value:9
    },{
        type:"htm",
        value:10
    },{
        type:"xml",
        value:11
    },{
        type:"docx",
        value:12
    },{
        type:"docm",
        value:13
    },{
        type:"dotx",
        value:14
    },{
        type:"dotm",
        value:15
    },{
        type:"doc",
        value:16
    },{
        type:"wps",
        value:16
    },{
        type:"pdf",
        value:17
    },{
        type:"uot",
        value:1
    },{
        type:"uof",
        value:111
    }]
    let splitArr=newName.split(".")
    let newType=splitArr[splitArr.length-1];
    let formatType=12;
    typeList.map((item)=>{
        if(item.type==newType){
            formatType=item.value
        }
    })
    return formatType;
}

function rgbToColor(r,g,b){
    var a="0x"+toO(b)+toO(g)+toO(r);
    return Number(a);
}
function toO(num,bs=16){
    if(num>=bs){
        return num.toString(bs)
    }else{
        return "0"+num.toString(bs)
    }
}

/**
 * 页脚信息分四种情况
 * 首页不同：
 * @param {*} doc 需要获取页码信息的文档
 * 
 */
 function getPageInfo(doc){
    var app=wps.WpsApplication();
    var pageInfomation={};
    var l_doc=doc?doc:app.ActiveDocument;
    var selection=l_doc.ActiveWindow.Selection;
    pageInfomation.OddAndEvenPagesHeaderFooter=selection.PageSetup.OddAndEvenPagesHeaderFooter;//获取是否奇偶页不同
    pageInfomation.DifferentFirstPageHeaderFooter=selection.PageSetup.DifferentFirstPageHeaderFooter;//获取是否是首页不同
    pageInfomation.TopMargin=selection.PageSetup.TopMargin
    pageInfomation.BottomMargin=selection.PageSetup.BottomMargin
    pageInfomation.LeftMargin=selection.PageSetup.LeftMargin
    pageInfomation.RightMargin=selection.PageSetup.RightMargin
    pageInfomation.FooterDistance=selection.PageSetup.FooterDistance
    pageInfomation.HeaderDistance=selection.PageSetup.HeaderDistance
    var section=l_doc.Sections.Item(1);
    var footer=section.Footers.Item(wps.Enum.wdHeaderFooterPrimary)//获取页脚
    var shape=footer.Shapes.Item(1);
    pageInfomation.isHavePageNumber=false;
    if(shape&&shape.TextFrame&&shape.TextFrame.TextRange){//有页码
        pageInfomation.isHavePageNumber=true;
        pageInfomation.PageNumbers={};
        pageInfomation.PageNumbers.Left=shape.Left;
        var textRange=shape.TextFrame.TextRange;
        pageInfomation.PageNumbers.Size=textRange.Font.Size;
        pageInfomation.PageNumbers.NameBi=textRange.Font.NameBi;
        pageInfomation.PageNumbers.Name=textRange.Font.Name;
        pageInfomation.PageNumbers.NumberStyle=footer.PageNumbers.NumberStyle;
        pageInfomation.PageNumbers.Text="X";
        var textArr=textRange.Text.split("");
        if(textArr.includes("—")){
            pageInfomation.PageNumbers.Text="— X —";
            return pageInfomation;
        }
        if(textArr.includes("/")){
            pageInfomation.PageNumbers.Text="X / y";
            return pageInfomation;
        }
        var yeCount=0;
        for(var i=0;i<textArr.length;i++){
            if(textArr[i]=="页"){
                yeCount++;
            }
        }
        if(yeCount==1){
            pageInfomation.PageNumbers.Text="第 X 页";
            return pageInfomation;
        }
        if(pageInfomation.PageNumbers.NumberStyle==37&&yeCount==2){
            pageInfomation.PageNumbers.Text="第 X 页 共 Y 页";
            return pageInfomation;
        }
        if(yeCount==2){
            pageInfomation.PageNumbers.Text="第 X 页 共 y 页";
            return pageInfomation;
        }
        // 
    }
    return pageInfomation;
}
function getOrientation(doc){
    var oriList=[];
    var app=wps.WpsApplication();
    var l_doc=doc?doc:app.ActiveDocument;
    for(var i=1;i<=l_doc.Sections.Count;i++){//清空页脚
        oriList.push(l_doc.Sections.Item(i).PageSetup.Orientation)     
    }
    return oriList;
}
function setOrientation(oriList,index,doc){
    var app=wps.WpsApplication();
    var l_doc=doc?doc:app.ActiveDocument;
    for(var i=index;i<=l_doc.Sections.Count;i++){//清空页脚
        l_doc.Sections.Item(i).PageSetup.Orientation=oriList[i-index];   
    }
    return oriList;
}

/**
 * 
 * @param {*} position 页码位置
 * // -999998;左侧
 * // -999995;居中
 * // -999996;右侧
 * // -999993;双面打印1
 * // -999994;双面打印2
 * @param {*} applyRange 应用范围
 * 1：整篇文档
 * 2：本节及之后
 * 3：本节
 * @param {*} numberStyle 页码样式
 * @param {*} text 页码文字
 * @param {*} activeSection 插入的当前节，可不传
 * 
 * 
 */
 function setPageNumber(position,numberStyle,text,size,name,nameBi,doc,applyRange=1,activeSection){
    var positionKey=-999998;//默认是左侧
    switch(position){
        case 1:
            positionKey=-999998;
            break;
        case 2:
            positionKey=-999995;
            break;
        case 3:
            positionKey=-999996;
            break;
        case 4:
            positionKey=-999993;
            break;
        case 5:
            positionKey=-999994;
            break;
        default:
            positionKey=position;
            break;
    }
    var app=wps.WpsApplication();
    var l_doc=doc?doc:app.ActiveDocument;
    for(var i=1;i<=l_doc.Sections.Count;i++){//清空页脚
        var footer=l_doc.Sections.Item(i).Footers.Item(wps.Enum.wdHeaderFooterPrimary);
        footer.Range.Text=""
        if(i==2){
            l_doc.Sections.Item(i).Footers.Item(wps.Enum.wdHeaderFooterPrimary).LinkToPrevious=true;//设置同前节
        }
        for(var j=footer.Shapes.Count;j>0;j--){
            footer.Shapes.Item(j).Delete();
        }
        
    }
    var section=activeSection&&applyRange!=1?activeSection:l_doc.Sections.Item(1);//如果没有传递插入页码的节，那么默认取第一节
    var footer=section.Footers.Item(wps.Enum.wdHeaderFooterPrimary)//获取页脚
    footer.Shapes.AddTextbox(wps.Enum.msoTextOrientationHorizontal, 0, 0, 144, 144, footer.Range);//插入文本框
    var shape=footer.Shapes.Item(1);
    shape.Fill.Visible =wps.Enum.msoFalse;
    shape.Line.Visible = wps.Enum.msoFalse;
    var textFrame=shape.TextFrame
    textFrame.AutoSize = 1;
    textFrame.WordWrap = 0;
    textFrame.MarginLeft = 0;
    textFrame.MarginRight = 0;
    textFrame.MarginTop = 0;
    textFrame.MarginBottom = 0;
    textFrame.Orientation = wps.Enum.msoTextOrientationHorizontal;
    shape.RelativeHorizontalPosition = wps.Enum.wdRelativeHorizontalPositionMargin;
    shape.Left = positionKey;
    shape.RelativeVerticalPosition = wps.Enum.wdRelativeVerticalPositionParagraph;
    shape.Top = 0;
    shape.WrapFormat.Type = wps.Enum.wdWrapNone;
    var textRange=shape.TextFrame.TextRange
    textRange.Text = text;//添加页码模板
    if(text=="X / y"||text=="第 X 页 共 y 页"){
        textRange.Select();
        l_doc.ActiveWindow.Selection.Find.Execute("y");
        textRange.Fields.Add(l_doc.ActiveWindow.Selection.Range, wps.Enum.wdFieldNumPages, "", true);
    }else if(text=="第 X 页 共 Y 页"){
        l_doc.ActiveWindow.Selection.Find.Execute("y");
        textRange.Fields.Add(l_doc.ActiveWindow.Selection.Range, wps.Enum.wdFieldNumPages, "\\* CHINESENUM3", true);
    }
    textRange.Select();
    l_doc.ActiveWindow.Selection.Find.Execute("X");
    textRange.Fields.Add(l_doc.ActiveWindow.Selection.Range, wps.Enum.wdFieldPage, "", true);
    footer.PageNumbers.NumberStyle = numberStyle;
    textRange.Select()
    l_doc.ActiveWindow.Selection.ShapeRange?l_doc.ActiveWindow.Selection.ShapeRange.TextFrame.TextRange.Font.NameBi=nameBi:"";
    l_doc.ActiveWindow.Selection.ShapeRange?l_doc.ActiveWindow.Selection.ShapeRange.TextFrame.TextRange.Font.Name=name:"";
    l_doc.ActiveWindow.Selection.ShapeRange?l_doc.ActiveWindow.Selection.ShapeRange.TextFrame.TextRange.Font.Size=size:"";
    l_doc.ActiveWindow.ActivePane.View.SeekView=0;
    if(applyRange==1){
        for(var i=2;i<=l_doc.Sections.Count;i++){//从第二节开始，设置同前节
            l_doc.Sections.Item(i).Footers.Item(wps.Enum.wdHeaderFooterPrimary).LinkToPrevious=true;//取消同前节
        }
    }
    if(applyRange==2){//本节及以后
        footer.PageNumbers.RestartNumberingAtSection=true;
        footer.PageNumbers.StartingNumber = 1;//重新编号
    }
    if(applyRange==3&&l_doc.Sections.Count>=section.Index+1){//本节
        l_doc.Sections.Item(section.Index+1).Footers.Item(wps.Enum.wdHeaderFooterPrimary).LinkToPrevious=false;//取消同前节
    }
    l_doc.ActiveWindow.ActivePane.View.SeekView=0;
    l_doc.Range(0,0).Select();
}