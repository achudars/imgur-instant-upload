/* Drag and drop */

window.ondragover = function(e) {
    e.preventDefault();
};

window.ondrop = function(e) {
    e.preventDefault();
    upload(e.dataTransfer.files[0]);
};

function upload(file) {
    document.getElementById("view1").style.display = "none";
    document.getElementById("loading").style.display = "inline";
    var imageLink ="";
    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;
    document.body.className = "uploading";
    var fd = new FormData();
    fd.append("image", file); // Append the file
    fd.append("key", "6528448c258cff474ca9701c5bab6927"); // Get your own key http://api.imgur.com/
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://api.imgur.com/2/upload.json");
    xhr.onload = function() {
        var link = JSON.parse(xhr.responseText).upload.links.imgur_page;

        document.getElementById("loading").style.display = "none";

        document.querySelector("#link").href = link;
        document.querySelector("#link").innerHTML = link;
        var imageLink = ""+document.querySelector("#link").innerHTML.replace("http://imgur.com/", "http://i.imgur.com/")+".jpg";

        /* Image Preview */
        document.getElementById("result").style.display = "inline";
        document.getElementById("link-to-image").style.background = "url(" + imageLink + ") center center no-repeat";
        
        document.body.className = "uploaded";
    };

    /* Send the formdata */
    xhr.send(fd);
    /* Remove the button */
    document.getElementById("button").remove();
};