/* TODO: refactoring */

var $body = $('body');

$body.prepend($('<h1/>').text('jQuery: ' + jQuery.prototype.jquery));

$body.append('<input id="input" type="text" value="あいうえおかきくけこさしすせそ">');
$body.append('<textarea id="textarea">あいうえお\nかきくけこさしすせそ\n<h1>たちつてと</h1></textarea>');

var $input = $('#input');
var $textarea = $('#textarea');

// IEでは改行コードが \r\n で処理されるため、
// value 値を直接取らないと期待した通りに動かない
// (val() で取ると改行コードが \n になる)
var strInput = $input[0].value;
var strTextarea = $textarea[0].value;

module('$.fn.selection');

test('getPos/get Test', function () {
    var $target, str;

    expect(8);

    $target = $input;
    str = strInput;

    deepEqual($target.selection('getPos'), {start: 0, end: 0});
    equal($target.selection('get'), '');

    $target.val(str).focus().select();
    deepEqual($target.selection('getPos'), {start: 0, end: str.length});
    equal($target.selection('get'), str);


    $target = $textarea;
    str = strTextarea;

    deepEqual($target.selection('getPos'), {start: 0, end: 0});
    equal($target.selection('get'), '');

    $target.val(str).focus().select();
    deepEqual($target.selection('getPos'), {start: 0, end: str.length});
    equal($target.selection('get'), str);
});

test('setPos/get Test', function () {
    var $target, str;
    var start, end;

    expect(8);

    $target = $input;
    str = strInput;

    start = 0;
    end = 7;
    $target.val(str).focus().selection('setPos', {start: start, end: end});
    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end - start));

    start = 5;
    end = str.length;
    $target.val(str).focus().selection('setPos', {start: start, end: end});
    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end - start));


    $target = $textarea;
    str = strTextarea;

    start = 0;
    end = 10;
    $target.val(str).focus().selection('setPos', {start: start, end: end});
    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end - start));

    start = 10;
    end = str.length;
    $target.val(str).focus().selection('setPos', {start: start, end: end});
    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end - start));
});

test('replace Test', function () {
    var $target, str;
    var start, end, replace;

    expect(36);

    $target = $input;
    str = strInput;

    replace = 'こんにちは！世界！';
    start = 0;
    end = 7;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'keep'});

    deepEqual($target.selection('getPos'), {start: start, end: start + replace.length});
    equal($target.selection('get'), replace);
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'start'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'end'});

    deepEqual($target.selection('getPos'), {start: start + replace.length, end: start + replace.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));


    start = 5;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'keep'});

    deepEqual($target.selection('getPos'), {start: start, end: start + replace.length});
    equal($target.selection('get'), replace);
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'start'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'end'});

    deepEqual($target.selection('getPos'), {start: start + replace.length, end: start + replace.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));


    $target = $textarea;
    str = strTextarea;

    replace = 'こんにちは';
    start = 0;
    end = 10;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'keep'});

    deepEqual($target.selection('getPos'), {start: start, end: start + replace.length});
    equal($target.selection('get'), replace);
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'start'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'end'});

    deepEqual($target.selection('getPos'), {start: start + replace.length, end: start + replace.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));


    start = 10;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'keep'});

    deepEqual($target.selection('getPos'), {start: start, end: start + replace.length});
    equal($target.selection('get'), replace);
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'start'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('replace', {text: replace, caret: 'end'});

    deepEqual($target.selection('getPos'), {start: start + replace.length, end: start + replace.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + replace + str.substr(end, str.length - end));
});

test('insert(before) Test', function () {
    var $target, str;
    var start, end, insert;

    expect(36);

    $target = $input;
    str = strInput;

    insert = 'こんにちは！世界！';
    start = 0;
    end = 7;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: end + insert.length});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: start + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: end + insert.length, end: end + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));


    start = 5;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: end + insert.length});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: start + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: end + insert.length, end: end + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));


    $target = $textarea;
    str = strTextarea;

    insert = 'こんにちは';
    start = 0;
    end = 10;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: end + insert.length});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: start + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: end + insert.length, end: end + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));


    start = 10;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: end + insert.length});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: start + insert.length, end: start + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'before'});

    deepEqual($target.selection('getPos'), {start: end + insert.length, end: end + insert.length});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, start) + insert + str.substr(start, str.length - start));
});

test('insert(after) Test', function () {
    var $target, str;
    var start, end, insert;

    expect(36);

    $target = $input;
    str = strInput;

    insert = 'こんにちは！世界！';
    start = 0;
    end = 7;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: end, end: end});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));


    start = 5;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: end, end: end});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));


    $target = $textarea;
    str = strTextarea;

    insert = 'こんにちは';
    start = 0;
    end = 10;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: end, end: end});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));


    start = 10;
    end = str.length;

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'keep', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: end});
    equal($target.selection('get'), str.substr(start, end));
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'start', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: start, end: start});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));

    $target.val(str).focus()
        .selection('setPos', {start: start, end: end})
        .selection('insert', {text: insert, caret: 'end', mode: 'after'});

    deepEqual($target.selection('getPos'), {start: end, end: end});
    equal($target.selection('get'), '');
    equal($target[0].value, str.substr(0, end) + insert + str.substr(end, str.length - end));
});


module('$.selection');

test('get text Test', function () {
    $('body').focus().select('text');
    equal($.selection(), '');
});

test('get html Test', function () {
    $('body').focus().select('html');
    equal($.selection(), '');
});
