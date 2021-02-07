var newsDiv = document.getElementById("newsDiv");

var newsSrc = "https://yeetree.github.io/ElectronBuilderSite/news-sys/";

//a list of posts to be shown in the NEWS section
//place newer posts in the front
var postList = ["2-6-2021-3.html", "2-6-2021-2.html", "2-6-2021.html"];

var i;
function uploadPosts() {
  for (i = 0; i <postList.length; i++) {
    newsDiv.innerHTML += "<iframe src='" + newsSrc + postList[i] + "' onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight+`px`;}(this));' style='height:200px;width:100%;border:none;overflow:hidden;'</iframe>"
  }
}
