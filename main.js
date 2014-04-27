/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */
define(function (require, exports, module) {
    'use strict';
    
    //vars
    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        Menus = brackets.getModule("command/Menus"),
        Commands = brackets.getModule("command/Commands"),
        AppInit = brackets.getModule("utils/AppInit"),
        KeyEvent = brackets.getModule("utils/KeyEvent");
    
    function containsChar(word) {
        var erg;
        if (word.indexOf("&") > -1) {
            erg = true;
        } else if (word.indexOf("§") > -1) {
            erg = true;
        } else if (word.indexOf("ä") > -1) {
            erg = true;
        } else if (word.indexOf("ü") > -1) {
            erg = true;
        } else if (word.indexOf("ö") > -1) {
            erg = true;
        } else if (word.indexOf("ß") > -1) {
            erg = true;
        } else {
            erg = false;
        }
        return erg;
    }
        
    function clear(text, editor, start, end) {
        text = text.replace(/§/g, "&sect;").replace(/ä/g, "&aauml;").replace(/ü/g, "&uuml;").replace(/ö/g, "&ouml;").replace(/ß/g, "&szlig;");
        editor.document.replaceRange(text, start, end);
    }
        
    var parseLine = function (line, cursorColumn) {
        var words;
        line = line.substring(0, cursorColumn);
        //split the line in "words" made of alphanumeric char or underscores (a-zA-Z0-9 and _)
        words = line.split(" ");
        return words[words.length - 1];
    };
    
    var keyEventHandler = function ($event, editor, event) {
        var cursorPosition,
            line,
            word,
            start;
        if (((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_SPACE)) || ((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_ENTER)) || ((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_RIGHT))) {
            cursorPosition = editor.getCursorPos();
            line = editor.document.getLine(cursorPosition.line);
            word = parseLine(line, cursorPosition.ch);
            start = {
                line: cursorPosition.line,
                ch: cursorPosition.ch - word.length
            };
            if (containsChar(word)) {
                clear(word, editor, start, cursorPosition);
            }
        }
    };
            
    var activeEditorChangeHandler = function ($event, focusedEditor, lostEditor) {
        if (lostEditor) {
            $(lostEditor).off("keyEvent", keyEventHandler);
        }
        if (focusedEditor) {
            $(focusedEditor).on("keyEvent", keyEventHandler);
        }
    };
    
    function scSelect() {
        var editor = EditorManager.getFocusedEditor();
        editor.document.batchOperation(function () {
            var text = clear(editor.getSelectedText(true), editor, editor.getSelection().start, editor.getSelection().end);
        });
        
    }
    
    AppInit.appReady(function () {
        CommandManager.register("SC Select", "specialchars.scselect", scSelect);
        var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
        menu.addMenuItem("specialchars.scselect", "Ctrl-Alt-H");
        var currentEditor = EditorManager.getCurrentFullEditor();
        $(currentEditor).on('keyEvent', keyEventHandler);
        $(EditorManager).on('activeEditorChange', activeEditorChangeHandler);
    });
});