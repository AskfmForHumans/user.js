// ==UserScript==
// @name         AskfmForHumans/1coin
// @version      1.1
// @namespace    https://github.com/AskfmForHumans
// @author       https://github.com/AskfmForHumans
// @homepage     https://github.com/AskfmForHumans/user.js
// @license      MIT
//
// @description Restore 1 click = 1 coin (not 5 coins) behavior on ASKfm
// @description:RU Возвращает отправку 1 монеты (а не 5) при клике по "огоньку"
//
// @grant        none
// @match        https://ask.fm/*
// @run-at       document-end
// @noframes
// ==/UserScript==

(function() {
    'use strict'

    const logPrefix = 'AskfmForHumans/1coin:'
    const oldPost = window.Ajax.post.bind(window.Ajax)

    window.Ajax.post = (elems, req) => {
        if (elems[0] && elems[0].className == 'fire-coin') {
            const oldAmount = req.data.amount
            const newAmount = Math.floor(oldAmount / 5)
            console.info(`${logPrefix} sending ${newAmount} instead of ${oldAmount} coins`)
            req.data.amount = newAmount
        }

        return oldPost(elems, req)
    }

    console.info(`${logPrefix} finished initialization`)
})()
