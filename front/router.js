route();

function route()
{
    console.log(location.pathname);
    
    switch (location.pathname)
    {
        case "/index.html":
            location.pathname = "/mainPage.html";
            break;    
    }
}

document.getElementById("logo").addEventListener("click", () => directTo("/main.html"));

document.getElementById("design_dir_btn").addEventListener("click", () => directTo("/design.html"));
document.getElementById("dev_dir_btn").addEventListener("click", () => directTo("/development.html"));
document.getElementById("naming_dir_btn").addEventListener("click", () => directTo("/naming.html"));
document.getElementById("youtube_dir_btn").addEventListener("click", () => directTo("/youtube.html"));
document.getElementById("tiktok_dir_btn").addEventListener("click", () => directTo("/tiktok.html"));

function directTo(pageName)
{
    location.href = pageName;
}