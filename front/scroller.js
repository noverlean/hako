window.scrollBy(0, 0);

//объект, отвечающий за наличие на страницах этажей прокруток и управление текущими этажами
let pageFloors = {
    main: {
        count: 1,
        current: 0,
    },
    design: {
        count: 3,
        current: 0
    },
    increment(floor)
    {
        if (floor.current + 1 >= floor.count)
            return false;
        floor.current++;
        return true;
    },
    decrement(floor)
    {
        if (floor.current - 1 < 0)
            return false;
        floor.current--;
        return true;
    },
    setOn(floor, value)
    {
        if (value >= floor.count || value < 0)
            return false;
        floor.current = value;
        return true;
    }
}

//инициируем этаж через роутинг по пути страницы
let floor;
switch (location.pathname)
{
    case "/main.html":
        floor = pageFloors.main;
        break;
    case "/design.html":
        floor = pageFloors.design;
        break;
    default:
        throw new Error('Страница не добавлена в scroller.js');
}

//вставляем теги скроллера на страницу
document.getElementById('main').insertAdjacentHTML(
    'afterbegin',
    `<div id="scroller" class="scroller"></div>`
);

for (let i = 0; i < floor.count; i++)
{
    document.getElementById('scroller').insertAdjacentHTML(
        'beforeEnd',
        `<div class="scrollerOption ${i == 0 ? 'scrollerOptionEnabled' : ''}" onclick="scrollToFloor(${i})"></div>`
    );
}

//добавляем обработчик событий для прокрута колеса мыши для разных версий бразуеров
if (document.addEventListener) {
    if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        document.addEventListener("wheel", onWheel, { passive: false });
    } else if ('onmousewheel' in document) {
        // устаревший вариант события
        document.addEventListener("mousewheel", onWheel, { passive: false });
    } else {
        // Firefox < 17
        document.addEventListener("MozMousePixelScroll", onWheel, { passive: false });
    }
} else { // IE8-
    document.attachEvent("onmousewheel", onWheel, { passive: false });
}

//создаем локи
let lockedByWheel = false;
let lockedByScroll = false;
//подключаем в работу лок при прокрутке (хз, помогает ли именно он, но пусть будет)
window.addEventListener('scroll', () => {
    lockedByScroll = true;
    setTimeout(() => {
        lockedByScroll = false;
    }, 200);
});

let previousPos = 0;
function onWheel(e) {
    e = e || window.event;

    // wheelDelta не даёт возможность узнать количество пикселей
    var delta = e.deltaY || e.detail || e.wheelDelta;

    //отменяем автоматическую браузерную прокрутку
    e.preventDefault();

    if (delta < 0)
    {
        scrollToFloor(floor.current - 1);
    }
    else if (delta > 0)
    {
        scrollToFloor(floor.current + 1);
    }
}

function scrollToFloor(floorId)
{
    //локер для синхронизации потока обработки скролла
    if (lockedByWheel || lockedByScroll)
    {
        return;
    }
    else
    {
        lockedByWheel = true;
    }

    let offset = 0;
    let clientHeight = document.documentElement.clientHeight;
    let previousFloor = 0;

    //изменяем текущий этаж
    previousFloor = floor.current;
    if (pageFloors.setOn(floor, floorId))
    {
        offset = clientHeight * floor.current - window.scrollY;

        if (floorId == 0)
        {
            document.getElementById('tooltipContainer').classList.remove('hide');
            document.getElementById('tooltip').innerHTML = '[SCROLL DOWN]';
        }
        else
        {
            document.getElementById('tooltipContainer').classList.add('hide');
        }
        if (floorId == floor.count - 1)
        {
            document.getElementById('tooltipContainer').classList.remove('hide');
            document.getElementById('tooltip').innerHTML = '[SCROLL UP]';
        }
    }
    
    //вызываем скролл страницы, если есть куда скроллить (был баг с остановкой прокрута)
    if (offset != 0)
    {
        document.getElementsByClassName('scrollerOption').item(previousFloor).classList.remove('scrollerOptionEnabled');
        document.getElementsByClassName('scrollerOption').item(floor.current).classList.add('scrollerOptionEnabled');

        window.scrollBy({
            top: offset,
            behavior: 'smooth'
        });
    }
    
    //снимаем лок
    previousPos = window.scrollY;
    lockedByWheel = false;
}