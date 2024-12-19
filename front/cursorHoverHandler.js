let cursor = document.getElementById("cursor");

cursor.addEventListener("mouseover", () => cursorHoverHandler(true));
cursor.addEventListener("mouseout", () => cursorHoverHandler(false));

document.addEventListener("mousemove", (event) => mouseMoveHandler(event));

let cursorTooltip = document.getElementById("cursorTooltip");
let cursorShadow = document.getElementById("cursorShadow");
let points = document.getElementsByClassName("point");

let previousVisibleState = false;
function cursorHoverHandler(isOver) 
{
    if (previousVisibleState != isOver)
    {
        for (let i = 0; i < points.length; i++) {
            points.item(i).classList.toggle('hide');
        }
        cursorTooltip.classList.toggle('hide');
        cursorShadow.classList.toggle('cursorShadowEnabled');
        if (!isOver)
        {
            previousVisibleState = !previousVisibleState;
        }
    }
}

function mouseMoveHandler(event)
{    
    if (cursorShadow.classList.contains('cursorShadowEnabled'))
    {
        cursorShadow.style.top = (event.pageY - event.clientY * -1) / 2 - 25 + 'px';
        cursorShadow.style.left = (event.pageX - event.clientX * -1) / 2 - 25 + 'px';
        console.log(event.screenY / 2 - event.pageY * -1);
    }
}