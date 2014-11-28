SpecialChars
======

An extension for [Brackets](https://github.com/adobe/brackets/) for better handling with some chars for HTML.

### How to Install

1. Select Brackets > File > Extension Manager
2. Search for this extension.
3. Click on the Install button.

### How to use SpecialChars
The extension checks after writing a word and then pressing right arrow or space, if there is a special char in it. 

**Chars supported:**

Ö,Ä,Ü,ö,ä,ü,§,ß,à,â,á,é,è,ê,î,ï,í,ô,ó,œ,ü,û,ù,«,»,’,¿,¡,°,À,É,È,ç,Ç,Â,Ê,Î,Ô,Û,ã,Ã,õ,Õ,ñ,Ñ,å,Å,æ,Ø,ø,€,•,ú,Ú

**For Example:**

    + `österreich` turns into `&ouml;sterreich`.
    + `§5` turn into `&sect;5`.
    
But if there is a file with such chars in it, which you didn't wrote, you can just select an specific area, which you want to change, and then just press `Ctrl-Shift-N`.

If you want to stop using the automatic replacement you can just uncheck the command in the Edit-Menu (SpecialChars).

***
Tested on Brackets Sprint 38, Windows 8.1 and Ubuntu.
    
