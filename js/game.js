const $board = $('#card-board');
let Size = 'small';
let Ics = 'fa-4x';
let Bomb = [];
let Rows = 3;
let Cols = 4;
let Level = 0;
let disabled = false;
let Factor = [];
let sClick = document.getElementById("sClick");
let sLose = document.getElementById("sLose");
let sWin = document.getElementById("sWin");


$('#STartBet').click(function() {
    $(this).hide();
    disabled = true;
    Level = 0;
    start(Level);
});

function createBoard(rows, cols) {
    $board.empty();
    Bomb = [];
    for (let i = 0; i < rows + 1; i++) {
        if (i < rows) {
            var $row = $('<div>').addClass('col-12 d-block text-center');
            for (j = 0; j < cols; j++) {
                const $col = $('<button>')
                    .addClass('item btn btn2   font-weight-bolder waves-effect waves-light hidden ' + Size)
                    .attr('data-row', j)
                    .attr('data-col', i);

                $row.append($col);
            }
        } else {
            var $row = $('<div>').addClass('col-12 d-block text-center');
            for (j = 0; j < cols; j++) {
                const $col = $('<div>')
                    .addClass('btn btn2 ratio ' + Size)
                    .append(
                        $('<p>').addClass()
                    )
                    .text('x' + Factor[j]);

                $row.append($col);
            }
        }

        $board.append($row);
    }

    $board.append($row);
    for (j = 0; j < Cols; j++) {
        b = Math.floor(Math.random() * Rows);
        Bomb.push(b);
    }

}


function start(level) {

    createBoard(Rows, Cols);
    // alert(level);
    for (j = 0; j < Rows; j++) {
        const $cell = $(`.item[data-row=${level}][data-col=${j}]`);
        $cell.removeClass('hidden');
        $cell.removeClass('teal');
        $cell.removeClass('darken-4');
        $cell.addClass('active');
    }



}

function levelUp(level) {
    for (i = 0; i < Rows; i++) {
        const $cell = $(`.item[data-row=${level-1}][data-col=${i}]`);
        $cell.addClass('hidden');
        $cell.removeClass('active');
    }
    for (j = 0; j < Rows; j++) {
        const $cell = $(`.item[data-row=${level}][data-col=${j}]`);
        $cell.removeClass('hidden');
        $cell.removeClass('teal');
        $cell.removeClass('darken-4');
        $cell.addClass('active');
    }

}
// createBoard(10,10);

function restart() {
    createBoard(Rows, Cols);
}

$board.on('click', '.item', function() {
    const $cell = $(this);
    const row = $cell.data('row');
    const col = $cell.data('col');
    iconf = 'fas fa-futbol text-white ' + Ics;
    iconb = 'fas  fa-bomb text-dark ' + Ics;
    iconl = 'fas fa-bahai text-dark ' + Ics;
    iconp = 'far fa-circle text-dark ' + Ics;
    if (Bomb[Level] == col) {
        sLose.play();
        for (i = 0; i < Cols; i++) {
            const $cell = $(`.item[data-row=${Level}][data-col=${i}]`);
            $cell.addClass('hidden');
        }
        for (j = 0; j < Cols; j++) {
            if (j === row) {
                const $cell = $(`.item[data-row=${row}][data-col=${col}]`);

                $cell.append(
                    $('<i>').addClass(iconl)
                );
            } else {
                const $cell = $(`.item[data-row=${j}][data-col=${Bomb[j]}]`);
                $cell.empty();
                $cell.append(
                    $('<i>').addClass(iconb)
                );
            }
        }
        reset();

    } else {
        sClick.play();
        $cell.append(
            $('<i>').addClass(iconp)
        );
        $cell.removeClass('active');

        const $bomb = $(`.item[data-row=${row}][data-col=${Bomb[Level]}]`);
        $bomb.append(
            $('<i>').addClass(iconb)
        );
        if ((Level + 1) == Cols) {
            sWin.play();
            for (i = 0; i < Cols; i++) {
                const $cell = $(`.item[data-row=${Level}][data-col=${i}]`);
                $cell.addClass('hidden');
            }
            reset();
        } else {
            Level++;
            levelUp(Level);
        }


    }

});

function bigSize() {
    Size = 'w55';
    Rows = 5;
    Cols = 10;
    Factor = [1.21, 1.51, 1.89, 2.36, 2.96, 3.70, 4.62, 5.78, 7.22, 9.03];
    createBoard(Rows, Cols);
}

function mediumSize() {
    Size = 'w64';
    Rows = 4;
    Cols = 7;
    Factor = [1.29, 1.72, 2.29, 3.06, 4.08, 5.45, 7.26];
    createBoard(Rows, Cols);
}

function smallSize() {
    Size = 'w78';
    Ics = 'fa-4x';
    Rows = 3;
    Cols = 4;
    Factor = [1.45, 2.18, 3.27, 4.91];
    createBoard(Rows, Cols);
}

function reset() {
    $('#STartBet').show();
    disabled = false;
}


$('#radioBtn a').on('click', function() {
    if (disabled == false) {
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        var size = $(this).data('size');
        switch (size) {
            case 'big':
                {
                    bigSize();
                    break;
                }
            case 'medium':
                {
                    mediumSize();
                    break;
                }
            default:
                {
                    smallSize();
                    break;
                }
        }
        $('#' + tog).prop('value', sel);
        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
    }

});

smallSize();