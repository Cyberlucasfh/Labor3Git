function browsertype() {
    console.log("Called browsertype");

    var divTag = document.createElement("div");
    var browser = getBrowser();
    var place = document.getElementById("browsertype")

    divTag.innerHTML= "<div>";
    divTag.innerHTML+= "browser:";
    divTag.innerHTML+= browser;
    divTag.innerHTML+= "---";
    if (document.cookie != null){
        divTag.innerHTML+=document.cookie;
        console.log(document.cookie)

    }

    divTag.innerHTML+="</div>";
    place.appendChild(divTag);
    makeCookie();
}
function getBrowser(){
    if (navigator.userAgent.indexOf("Chrome") != -1){
        return "Chrome@"+navigator.userAgent.indexOf("Chrome");
    }
    else if (navigator.userAgent.indexOf("Safari") != -1){
        return "Safari";
    }
    else if (navigator.userAgent.indexOf("Edge") != -1){
        return "Edge";
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1){
        return "Firefox";
    }
}
function makeCookie(){
    console.log("Cookie Called")
    var cookie = getTime()
    cookie += "---"
    cookie += "Test Cookie for WEBAPP"
    cookie += "; max-age=" + (1*24*60*60);
    document.cookie=cookie;

}

function getTime(){
    var now = new Date();

    var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

    var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();

    function fourdigits(number)	{
        return (number < 1000) ? number + 1900 : number;
    }
    today =  now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"--"+
        days[now.getDay()] + ", " +
        months[now.getMonth()] + " " +
        date + ", " +
        (fourdigits(now.getYear())) ;

   return today;
}
function ajax(){
  console.log("WWWWWWWWW")
    var query ={
      name: $("#namefield").value,
        email:$("#emailfield").value,
        date:$("#datefield").value,
        message:$("#messagefield").value,
      password:$("#passwordfield").value
  };
}

function reset(event){
    event.preventDefault()
    var fields = document.getElementsByTagName("input")
    fields.push(document.getElementsByTagName("textarea"))
    for (var i = 0; i < fields.length; i++){
        fields[i].value = null;
    }
}

var btn = document.getElementById("ajaxrequest");
btn.addEventListener("click", ajaxreq);

var resbtn = document.getElementById("reset")
resbtn.addEventListener("click",reset,false)

function download_txt(object) {

}
function ajaxreq(){
    console.log("Called AjaxRequest ")
var ajaxRequest = new XMLHttpRequest();
    var form = document.getElementById("form")


ajaxRequest.addEventListener("load", ajaxGeladen);
ajaxRequest.addEventListener("error", ajaxFehler);
ajaxRequest.open("post","scripts/handleForm.php")
    var formdata = new FormData(form);
//formdata.append("name","KLAUS HINNERK")
 //   formdata.append("email","kh@fakemail.de")
    for (var pair of formdata.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
ajaxRequest.send(formdata);}

function ajaxGeladen(event){
    event.preventDefault()
    console.log("AJAX LOADED")
    //alert(event.target.responseText)
    var article = document.createElement("div");
    var place =document.getElementById("ajaxplaceholder")
    // article.innerHTML= "<div>";
    //article.innerHTML+=event.target.responseText
    //article.innerHTML+="</div>";
    article.innerHTML=event.target.responseText
    place.appendChild(article);

}

function ajaxFehler(event){
    var ergebnis = JSON.parse(event.target.responseText);
    alert(ergebnis)
}

