
var starter;
var counter = 0;
var target = 0;
function getCoordinates(element) {
    "use strict";
    var leftCorner = element.offset(),
        width = element.width(),
        height = element.height(),
        rand = Math.random(),
        randomCoordinates = {};
    randomCoordinates.X = rand * (width - 24);
    randomCoordinates.Y = 10;
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

function initialise(identifier) {
    "use strict";
    counter =  counter + 1;
    var baseEle = $(identifier),
        coordinates = getCoordinates(baseEle),
        cellElement = $('<div class="game-cell"><div>');
    cellElement.css({
        "left" : coordinates.X,
        "top" : coordinates.Y
    })
        .html(getRandomInt(0, 10))
        .click(function () {
            if (Number($(this).html()) === target) {
                var scoreEle = $('.score-container .score'),
                    score = Number(scoreEle.html()) + ((Number($(this).html())) / target) * 10;
                scoreEle.html(score);
                $(this).remove();
            }
        });
    baseEle.append(cellElement);
    $(cellElement).animate({
        top: baseEle.height() - 24
    }, 10000, "linear", function () {
        this.remove();
        var score = Number($('.score-container .score').html());
        if (counter < 100) {
            initialise('.game');
        } else {
            clearInterval(starter);
            var game = $('.game');
            game.empty();
            if (localStorage.getItem('best-score') < score) {
                localStorage.setItem('best-score', score);
                $('.best-score-container .score').html(score);
                var scoreText = $('<p></p>').css({'font-size': 36, "color": "#FFF" }).html('Good try');
                game.append(scoreText);
            } else {
                var scoreText2 = $('<p></p>').css({'font-size': 36, "color": "#FFF" }).html('You can do better');
                game.append(scoreText2);
            }
        }
        // Animation complete.
    });
}

function gameInit(identifier) {
    "use strict";
    var bestScore = localStorage.getItem('best-score');
    $('.best-score-container .score').html(bestScore || 0);
    $('.score-container .score').html(0);
    $('.game').empty();
    counter = 0;
    target = getRandomInt(0, 10);
    $('.target').html('Catch ' + target);
    starter = setInterval(function () {initialise(identifier); }, 1000);
}


