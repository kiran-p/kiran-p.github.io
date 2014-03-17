
function getCoordinates(element) {
    "use strict";
    var leftCorner = element.offset(),
        width = element.width(),
        height = element.height(),
        rand = Math.random(),
        randomCoordinates = {};
    randomCoordinates.X = rand * width;
    randomCoordinates.Y = leftCorner.top;
    return randomCoordinates;
}
/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gameInit(identifier) {
    var bestScore = localStorage.getItem('best-score');
    $('.best-score-container .score').html(bestScore || 0);
    $('.score-container .score').html(0);
    var counter = 0;
    initialise(identifier, counter);
}

function initialise(identifier, counter) {
    "use strict";
    counter =  counter + 1;
    var baseEle = $(identifier),
        coordinates = getCoordinates(baseEle);
    var cellElement = $('<div class="game-cell"><div>');
    cellElement.css({
        "width" : "24px",
        "height" : "24px",
        "position" : "absolute",
        "left" : coordinates.X - 24,
        "top" : coordinates.Y,
        "background" : "yellow",
        "textAlign" : "center",
        "padding" : "2px"
    })
        .html(getRandomInt(0, 10))
        .click(function () {
            var scoreEle = $('.score-container .score'),
                score = Number(scoreEle.html()) + Number($(this).html());
            scoreEle.html(score);
        });
    baseEle.append(cellElement);
    $(cellElement).animate({
        top: baseEle.height() - 24
//        height: "toggle"
    }, 10000, "linear", function () {
        this.remove();
        var score = Number($('.score-container .score').html());
        if (counter < 3) {
            initialise('.game', counter);
        } else {
            if (localStorage.getItem('best-score') < score) {
                localStorage.setItem('best-score', score);
                $('.best-score-container .score').html(score);
                $('.game').css({'font-size': 36, "color": "#FFF" }).html('Good try');
            } else {
                $('.game').css({'font-size': 36, "color": "#FFF" }).html('You can do better');
            }
        }
        // Animation complete.
    });
    console.log(coordinates);
}
