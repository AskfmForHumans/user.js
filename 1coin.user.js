// ==UserScript==
// @name         AskfmForHumans/1coin
// @namespace    https://github.com/AskfmForHumans
// @version      1.0
// @description  Restore 1 click = 1 coin behavior on ASKfm
// @homepage     https://github.com/AskfmForHumans/user.js
// @license      MIT
//
// @grant        none
// @match        https://ask.fm/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict'

    const oldPost = window.Ajax.post.bind(window.Ajax)

    window.Ajax.post = (elems, req) => {
        if (elems[0] && elems[0].className == 'fire-coin') {
            const oldAmount = req.data.amount
            const newAmount = Math.floor(oldAmount / 5)
            console.info(`AskfmForHumans/1coin.user.js: sending ${newAmount} instead of ${oldAmount} coins`)
            req.data.amount = newAmount
        }

        return oldPost(elems, req)
    }
})()
