// ==UserScript==
// @name         AskfmForHumans/themes
// @version      1.0
// @namespace    https://github.com/AskfmForHumans
// @author       https://github.com/AskfmForHumans
// @homepage     https://github.com/AskfmForHumans/user.js
// @license      MIT
//
// @description  Restore the choice from 18 color themes (selectable in the userscript manager menu)
// @description:RU Возвращает выбор из 18 цветовых тем (управление через меню менеджера юзерскриптов)
//
// @match        https://ask.fm/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @resource     style https://github.com/AskfmForHumans/user.js/raw/main/themes.css
// @resource     icon https://github.com/AskfmForHumans/user.js/raw/main/icon-owl.ico
// ==/UserScript==

(function () {
    "use strict"

    const THEME_NUMBERS = [...Array(18).keys()]
    const MENU_ITEMS = []
    const LOG_PREFIX = "AskfmForHumans/themes:"

    GM_addStyle(GM_getResourceText("style"))
    rebuildMenu()
    applyTheme()

    // Re-apply when a new body is created (on URL change).
    const observer = new MutationObserver(applyTheme)
    observer.observe(document.documentElement, {
        childList: true,
    })

    function rebuildMenu() {
        const currentTheme = GM_getValue("afh-askfm-theme", null)
        for (const i of MENU_ITEMS) {
            GM_unregisterMenuCommand(i)
        }
        MENU_ITEMS.length = 0
        for (const i of THEME_NUMBERS) {
            const id = `theme-${i}`
            const name = (id === currentTheme ? `Theme ${i} ✔️` : `Theme ${i}`)
            const cmd = GM_registerMenuCommand(name, toggleTheme.bind(null, id))
            MENU_ITEMS.push(cmd)
        }
    }

    function toggleTheme(id) {
        const currentTheme = GM_getValue("afh-askfm-theme", null)
        const newTheme = (id === currentTheme ? null : id)
        console.info(LOG_PREFIX, `toggle old=${currentTheme} new=${newTheme}`)
        GM_setValue("afh-askfm-theme", newTheme)
        rebuildMenu()
        applyTheme()
    }

    function applyTheme() {
        const currentTheme = GM_getValue("afh-askfm-theme", null)
        console.info(LOG_PREFIX, `apply ${currentTheme}`)

        for (const i of THEME_NUMBERS) {
            document.body.classList.remove(`theme-${i}`)
        }

        let iconElem = document.getElementById("afh-icon")
        if (!iconElem) {
            iconElem = document.createElement("link")
            iconElem.id = "afh-icon"
            iconElem.rel = "icon"
            document.head.appendChild(iconElem)
        }

        if (currentTheme !== null) {
            document.body.classList.add(currentTheme)
            iconElem.href = GM_getResourceURL("icon")
        } else {
            iconElem.href = "/favicon.ico"
        }
    }
})()
