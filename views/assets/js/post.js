/**
 * This function return a date formatted
 * @param {Date} date date
 * @return {String} date 
 */
function dateFormater(date){
    return ("0" + date.getDate()).slice(-2) + "/" + ("0" + date.getMonth()).slice(-2) + "/" + date.getFullYear() + " " + ("0" + date.getUTCHours()).slice(-2) + ":" + ("0" + date.getUTCMinutes()).slice(-2);
}


/**
 * This function return a randomColor for tag
 */
function randomColor(){
    const random = Math.floor((Math.random() * 3) + 0);
    switch (random){
        case 0:
            return "blue";
        case 1:
            return "red";
        case 2:
            return "pink";
        case 3:
            return "purple";
    }
}


/**
 * This manage request for update this entrie
 * @param {number} postId 
 * @param {String} content 
 * @param {String} description 
 */
function updateEntrie(postId, content, description){
    const url = "/api/update-entrie-content?postId=" + postId + "&content=" + content + "&description=" + description;
    const req = new XMLHttpRequest();

    req.open("post", url, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = (event) => {
        if (req.readyState === 4)
            if (req.status === 200) {
                this.posts = JSON.parse(req.responseText);
                this.buildPosts();
            } 
            else console.error(req.statusText);
    };
    req.send("postId=" + postId + "&content=" + content + "&description=" + description);
}


/**
 * This manage UX for web content while press the bubble button
 */
function onUpdaterClick(){
    const newContent = $(".jqte_editor").html();
    const postId = parseInt($(".updater").attr('id'));//Set postid in the var
    const description = strip(newContent).substring(0, 80);

    if (newContent == null || newContent == undefined || newContent == ""){
        const svg = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMS45OTkgNTExLjk5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjk5OSA1MTEuOTk5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZFMEEyNDsiIGQ9Ik01MDcuNzMsNDkwLjMxYy01LjQyNyw5LjA0NS0xNC45NjEsMTQuNDQxLTI1LjQ5NSwxNC40NDFIMjkuNzU1ICBjLTEwLjM3NCwwLTE5LjgyOC01LjI3Ny0yNS4yODUtMTQuMTAycy01Ljk0Ni0xOS42MzgtMS4zMDktMjguOTIzbDAuMDktMC4xOEwyMjkuNjY2LDIzLjU3OGM1LjAwNy05LjkyNCwxNS4wMTEtMTYuMTgsMjYuMTQ0LTE2LjMzICBoMC4zMmMxMS4wODMtMC4wNywyMS4xMDcsNS45NjYsMjYuMzE0LDE1LjczMWwwLjA5LDAuMThMNTA4LjUyLDQ2MS4xMzhDNTEzLjQyNyw0NzAuNDEyLDUxMy4xMjYsNDgxLjMwNiw1MDcuNzMsNDkwLjMxeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRTMwMTMzOyIgZD0iTTUwNy43Myw0OTAuMzFjLTUuNDI3LDkuMDQ1LTE0Ljk2MSwxNC40NDEtMjUuNDk1LDE0LjQ0MUgyNTYuMTNWNy4yNDggIGMxMS4wODMtMC4wNywyMS4xMDcsNS45NjYsMjYuMzE0LDE1LjczMWwwLjA5LDAuMThMNTA4LjUyLDQ2MS4xMzhDNTEzLjQyNyw0NzAuNDEyLDUxMy4xMjYsNDgxLjMwNiw1MDcuNzMsNDkwLjMxeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRUJFQkZGOyIgZD0iTTQyMy45Niw0NDEuNDc5Yy00LjQ3Nyw3LjQ2Ni0xMi4zNDMsMTEuOTIzLTIxLjA0NywxMS45MjNIMTA5LjMyNyAgYy04LjU3NSwwLTE2LjM4LTQuMzQ3LTIwLjg4OC0xMS42MzNjLTQuNTA3LTcuMjk2LTQuOTA3LTE2LjIyLTEuMDc5LTIzLjg5NmwwLjA5LTAuMThsMTQ2Ljg5My0yODQuMTUxICBjNC4xNDgtOC4xODUsMTIuNDAzLTEzLjM0MiwyMS41ODctMTMuNDYyaDAuMzNjOS4wOTUsMCwxNy4zNyw0Ljk0NywyMS42NTcsMTIuOTkybDAuMSwwLjE4TDQyNC42Myw0MTcuNDA0ICBDNDI4LjY2Niw0MjUuMDU5LDQyOC40MjYsNDM0LjA1NCw0MjMuOTYsNDQxLjQ3OXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0QyRDJGNzsiIGQ9Ik00MjMuOTYsNDQxLjQ3OWMtNC40NzcsNy40NjYtMTIuMzQzLDExLjkyMy0yMS4wNDcsMTEuOTIzSDI1Ni4xM1YxMjAuMDgxaDAuMTMgIGM5LjA5NSwwLDE3LjM3LDQuOTQ3LDIxLjY1NywxMi45OTJsMC4xLDAuMThMNDI0LjYzLDQxNy40MDRDNDI4LjY2Niw0MjUuMDU5LDQyOC40MjYsNDM0LjA1NCw0MjMuOTYsNDQxLjQ3OXoiLz4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojNDQ0NDVFOyIgZD0iTTI3MS4xMTEsMjMwLjE0NXYxMDYuNDI3YzAsOC4yNzUtNi43MDYsMTQuOTgxLTE0Ljk4MSwxNC45OTFoLTAuMDEgICBjLTguMjg1LDAtMTQuOTkxLTYuNzE2LTE0Ljk5MS0xNC45OTFWMjMwLjE0NWMwLTguMjc1LDYuNzA2LTE0Ljk5MSwxNC45OTEtMTQuOTkxaDAuMDEgICBDMjY0LjQwNSwyMTUuMTY0LDI3MS4xMTEsMjIxLjg3LDI3MS4xMTEsMjMwLjE0NXoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM0NDQ0NUU7IiBkPSJNMjcxLjExMSwzODcuODExYzAsMC40OS0wLjAzLDAuOTc5LTAuMDgsMS40NjljLTAuMDUsMC40OS0wLjEyLDAuOTc5LTAuMjIsMS40NTkgICBjLTAuMDksMC40OC0wLjIxLDAuOTU5LTAuMzYsMS40MTljLTAuMTQsMC40Ny0wLjMsMC45MjktMC40OSwxLjM3OWMtMC4xOSwwLjQ1LTAuNCwwLjg5OS0wLjYzLDEuMzI5ICAgYy0wLjIzLDAuNDMtMC40OCwwLjg1OS0wLjc1LDEuMjU5Yy0wLjI3LDAuNDEtMC41NywwLjgxLTAuODc5LDEuMTg5Yy0wLjMxLDAuMzgtMC42NCwwLjc1LTAuOTg5LDEuMDg5ICAgYy0wLjM0LDAuMzUtMC43MSwwLjY4LTEuMDg5LDAuOTg5Yy0wLjM4LDAuMzEtMC43OCwwLjYxLTEuMTg5LDAuODc5Yy0wLjQsMC4yNy0wLjgyOSwwLjUyLTEuMjU5LDAuNzUgICBjLTAuNDMsMC4yMy0wLjg2OSwwLjQ0LTEuMzI5LDAuNjNjLTAuNDUsMC4xOC0wLjkwOSwwLjM1LTEuMzc5LDAuNDljLTAuNDYsMC4xNC0wLjkzOSwwLjI3LTEuNDE5LDAuMzYgICBjLTAuNDgsMC4xLTAuOTY5LDAuMTctMS40NTksMC4yMmMtMC40OSwwLjA1LTAuOTY5LDAuMDgtMS40NTksMC4wOGgtMC4wMWMtMC40OSwwLTAuOTg5LTAuMDMtMS40NzktMC4wOCAgIGMtMC40OC0wLjA1LTAuOTY5LTAuMTItMS40NDktMC4yMmMtMC40OC0wLjA5LTAuOTU5LTAuMjItMS40MjktMC4zNmMtMC40Ni0wLjE0LTAuOTI5LTAuMzEtMS4zNzktMC40OSAgIGMtMC40NS0wLjE5LTAuODk5LTAuNC0xLjMyOS0wLjYzYy0wLjQzLTAuMjMtMC44NS0wLjQ4LTEuMjU5LTAuNzVjLTAuNDEtMC4yNy0wLjgtMC41Ny0xLjE3OS0wLjg3OSAgIGMtMC4zOC0wLjMxLTAuNzUtMC42NC0xLjA5OS0wLjk4OWMtMC4zNC0wLjM0LTAuNjgtMC43MS0wLjk4OS0xLjA4OWMtMC4zMS0wLjM4LTAuNi0wLjc4LTAuODY5LTEuMTg5ICAgYy0wLjI3LTAuNC0wLjUzLTAuODI5LTAuNzYtMS4yNTljLTAuMjItMC40My0wLjQ0LTAuODc5LTAuNjItMS4zMjljLTAuMTktMC40NS0wLjM2LTAuOTA5LTAuNS0xLjM3OSAgIGMtMC4xNC0wLjQ2LTAuMjYtMC45MzktMC4zNi0xLjQxOWMtMC4wOS0wLjQ4LTAuMTctMC45NjktMC4yMi0xLjQ1OWMtMC4wNS0wLjQ5LTAuMDctMC45NzktMC4wNy0xLjQ2OSAgIGMwLTAuNDksMC4wMi0wLjk4OSwwLjA3LTEuNDc5YzAuMDUtMC40OCwwLjEzLTAuOTY5LDAuMjItMS40NDljMC4xLTAuNDgsMC4yMi0wLjk1OSwwLjM2LTEuNDI5YzAuMTQtMC40NiwwLjMxLTAuOTI5LDAuNS0xLjM3OSAgIGMwLjE4LTAuNDUsMC40LTAuODk5LDAuNjItMS4zMjljMC4yMy0wLjQzLDAuNDktMC44NDksMC43Ni0xLjI1OXMwLjU2LTAuODEsMC44NjktMS4xNzljMC4zMS0wLjM4LDAuNjUtMC43NSwwLjk4OS0xLjA5OSAgIGMwLjM1LTAuMzQsMC43Mi0wLjY4LDEuMDk5LTAuOTg5YzAuMzgtMC4zMSwwLjc3LTAuNiwxLjE3OS0wLjg2OWMwLjQxLTAuMjcsMC44My0wLjUzLDEuMjU5LTAuNzZjMC40My0wLjIzLDAuODc5LTAuNDQsMS4zMjktMC42MiAgIGMwLjQ1LTAuMTksMC45MTktMC4zNiwxLjM3OS0wLjVjMC40Ny0wLjE0LDAuOTQ5LTAuMjYsMS40MjktMC4zNmMwLjQ4LTAuMSwwLjk2OS0wLjE3LDEuNDQ5LTAuMjJjMC41LTAuMDUsMC45OTktMC4wNywxLjQ4OS0wLjA3ICAgYzMuOTM4LDAuMDEsNy44MDUsMS41OTksMTAuNTg0LDQuMzg3YzAuMzUsMC4zNSwwLjY4LDAuNzIsMC45ODksMS4wOTljMC4zMSwwLjM3LDAuNjEsMC43NywwLjg3OSwxLjE3OSAgIGMwLjI3LDAuNDEsMC41MiwwLjgyOSwwLjc1LDEuMjU5YzAuMjMsMC40MywwLjQ0LDAuODc5LDAuNjMsMS4zMjlzMC4zNSwwLjkxOSwwLjQ5LDEuMzc5YzAuMTUsMC40NywwLjI3LDAuOTQ5LDAuMzYsMS40MjkgICBjMC4xLDAuNDgsMC4xNywwLjk2OSwwLjIyLDEuNDQ5QzI3MS4wODEsMzg2LjgyMiwyNzEuMTExLDM4Ny4zMjIsMjcxLjExMSwzODcuODExeiIvPgo8L2c+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6IzM0MzQ0RjsiIGQ9Ik0yNzEuMDMxLDM4Ni4zMzJjMC4wNSwwLjQ5LDAuMDgsMC45ODksMC4wOCwxLjQ3OWMwLDAuNDktMC4wMywwLjk3OS0wLjA4LDEuNDY5ICAgYy0wLjA1LDAuNDktMC4xMiwwLjk3OS0wLjIyLDEuNDU5Yy0wLjA5LDAuNDgtMC4yMSwwLjk1OS0wLjM2LDEuNDE5Yy0wLjE0LDAuNDctMC4zLDAuOTI5LTAuNDksMS4zNzkgICBjLTAuMTksMC40NS0wLjQsMC44OTktMC42MywxLjMyOWMtMC4yMywwLjQzLTAuNDgsMC44NTktMC43NSwxLjI1OWMtMC4yNywwLjQxLTAuNTcsMC44MS0wLjg3OSwxLjE4OSAgIGMtMC4zMSwwLjM4LTAuNjQsMC43NS0wLjk4OSwxLjA4OWMtMC4zNCwwLjM1LTAuNzEsMC42OC0xLjA4OSwwLjk4OWMtMC4zOCwwLjMxLTAuNzgsMC42MS0xLjE4OSwwLjg3OSAgIGMtMC40LDAuMjctMC44MjksMC41Mi0xLjI1OSwwLjc1Yy0wLjQzLDAuMjMtMC44NjksMC40NC0xLjMyOSwwLjYzYy0wLjQ1LDAuMTgtMC45MDksMC4zNS0xLjM3OSwwLjQ5ICAgYy0wLjQ2LDAuMTQtMC45MzksMC4yNy0xLjQxOSwwLjM2Yy0wLjQ4LDAuMS0wLjk2OSwwLjE3LTEuNDU5LDAuMjJjLTAuNDksMC4wNS0wLjk2OSwwLjA4LTEuNDU5LDAuMDhWMzcyLjgyICAgYzMuOTM4LDAuMDEsNy44MDUsMS41OTksMTAuNTg0LDQuMzg3YzAuMzUsMC4zNSwwLjY4LDAuNzIsMC45ODksMS4wOTljMC4zMSwwLjM3LDAuNjEsMC43NywwLjg3OSwxLjE3OSAgIGMwLjI3LDAuNDEsMC41MiwwLjgyOSwwLjc1LDEuMjU5YzAuMjMsMC40MywwLjQ0LDAuODc5LDAuNjMsMS4zMjlzMC4zNSwwLjkxOSwwLjQ5LDEuMzc5YzAuMTUsMC40NywwLjI3LDAuOTQ5LDAuMzYsMS40MjkgICBDMjcwLjkxMSwzODUuMzYzLDI3MC45ODEsMzg1Ljg1MywyNzEuMDMxLDM4Ni4zMzJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMzQzNDRGOyIgZD0iTTI3MS4xMTEsMjMwLjE0NXYxMDYuNDI3YzAsOC4yNzUtNi43MDYsMTQuOTgxLTE0Ljk4MSwxNC45OTFWMjE1LjE1NCAgIEMyNjQuNDA1LDIxNS4xNjQsMjcxLjExMSwyMjEuODcsMjcxLjExMSwyMzAuMTQ1eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
        $("body").append(`<div class='alert top danger'><div class='content'><a><img width='64px' height='64px' src=${svg} alt='danger svg'/>You can't send content as null</a></div></div>`);
        setInterval(() => $(".alert.top.danger").remove(),4000);//Remove alert later 4 seconds
        return;
    }
    else {
        updateEntrie(postId, newContent, description);
        $("#description").text(description);
        $("#content").html(newContent);
    }
}


/**
 * This function extract text from html node
 * @param {String} html 
 */
function strip(html){
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}


$(document).ready(() => {
    /** START THE LAZYLOAD */
    new LazyLoad();

    /** FORMAT TEXT */
    $(".date").text(
        dateFormater(
            new Date($(".date").text())
        )
    );

    $("#content").html(
        $.parseHTML($("#content").html())
    );

    //START THE EDITOR
    if (document.getElementById("editor")){
        const postContent = $("#content").html();
        $("textarea").jqte().jqteVal($.parseHTML(postContent));
    }

    /** TAG COLORS */
    Object.keys($(".tag")).forEach(key => {
        const node = $(".tag")[key];
        const color = randomColor();

        try {
            node.setAttribute("class", "label tag label-" + color);
        } 
        catch (ignored){}
    });


});