<script>
/**
 * If you've discovered this file, then you have unlocked the secrets to
 * finding all of the easter eggs!
 * 
 * This is obviously not a best practice, but this is my personal site
 * so it must reflect my personality, and love of sometimes going back to good ol'
 * vanilla JS.
 * 
 * The fun "easter egg" game-like features of my site live here in one file.
 * At least it's an include in my Jekyll templates and not burried in the html.
 * 
 * Cheers,
 * Brett
 */

/** Content */
const content = {
    pres1: [
        'My website has hidden easter eggs throughout it!',
        'You have unlocked Level 1 of the game!',
        'Level 1 contains a dozen hidden eggs throughout the site.',
        'The game description and rules are posted here.',
    ]
}

/** Misc Utils */

const utils = {
    // Returns a Promise that resolves after "ms" Milliseconds
    timer: ms => new Promise(res => setTimeout(res, ms)),
}

/** Dom and browser specific utils */
const dom = {

    // Element Lookup
    byId:    id => document.getElementById(id),
    byClass: className => document.getElementsByClassName(className),
    hasAttr: (el, attrName) => el.hasOwnProperty(attrName),
    setAttr: (el, name, val) => el.setAttribute(name, val),

    // Local Storage
    storSet: (k, v) => localStorage.setItem(k, v),
    storGet: k => localStorage.getItem(k),
    storRem: k => localStorage.removeItem(k),
}

const settings = {
    devMode: true,
    strandLength: 64,
    eggCount: 12,
    DNA: ['A', 'C', 'G', 'T'],
    RNA: ['A', 'C', 'G', 'U'],
}

const genStrand = chars => {
  let strand = ""
  for (i = 0; i < settings.strandLength; i++) {
    let char = Math.floor(Math.random()*4)
    strand += chars[char]
  }
  return strand
}

const newStrand = bases => genStrand(bases)

const easterEggElements = {
    eggGameInit: () => dom.byId('egg-game-init-hide'),
    playerInitButton: () => dom.byId('player-init'),
    headerSoftwareEngineer: () => dom.byClass('header-tagline')[0]
}

const eggHandler = {
    setEgg: (el, baseType) => dom.setAttr(el, 'eggId', newStrand(settings.DNA)),
    storeEgg: (num, id) => dom.storSet(`egg_${num}`, id)
}

// Word scramble effect for fun
const scrambler = (chars, count) => {
    let result = chars.split("")

    let lastIndex = chars.length - count
    let first = result[count]
    let last = result[lastIndex]

    result[count] = last
    result[lastIndex] = first

    return result.join("")
}

const landingPage = {

    // On init, need to know which eggs have already been found or not,
    // as to not add events to them

    init: () => {
        let egg = easterEggElements.headerSoftwareEngineer()            // egg 1
        let eggPres1 = easterEggElements.eggGameInit()                  // presentation 1
        let playerInitButton = easterEggElements.playerInitButton()    // accept egg 1 button
        playerInitButton.style.display = 'none'


        // This all is only for egg 1 on the landing page,
        // so the trick will be to elegantly apply a pattern to
        // different egg target types, actions, triggered etc.

        // Egg is clicked
        egg.addEventListener('click', () => {

            // @devMode
            settings.devMode = false
            if (dom.storGet('egg_1') && !settings.devMode) {
                return;
            }

            egg.id = 'landing_1_active'
            eggHandler.setEgg(egg, settings.DNA)                // sets egg's egg ID (it's strand)'
            eggHandler.storeEgg(1, egg.getAttribute('eggId'))   // store egg 1 and id in localstorage
            eggPres1.id = 'egg-game-init-show'

            // Landing scrambler thing :)
            let count = 0

            setInterval(() => {
                let text = egg.innerHTML

                count  > text.length ? count = 0 : count += 1

                egg.id === 'landing_1_active' ? egg.innerHTML = scrambler(text, count) : false

            },100)

            // Render presentation
            // TODO: Do all this in one iteration of the lines area for Egg 1 Presentation
            let line1 = dom.byId('pres1-line1')
            let line2 = dom.byId('pres1-line2')
            let line3 = dom.byId('pres1-line3')
            let line4 = dom.byId('pres1-line4')

            let contentLine1 = content.pres1[0].split("")
            let contentLine2 = content.pres1[1].split("")
            let contentLine3 = content.pres1[2].split("")
            let contentLine4 = content.pres1[3].split("")

            async function writer() {
                for (var i = 0; i < contentLine1.length; i++) {
                    line1.innerHTML += contentLine1[i]
                    await utils.timer(50);
                }
                for (var i = 0; i < contentLine2.length; i++) {
                    line2.innerHTML += contentLine2[i]
                    await utils.timer(50);
                }
                for (var i = 0; i < contentLine3.length; i++) {
                    line3.innerHTML += contentLine3[i]
                    await utils.timer(50);
                }
                for (var i = 0; i < contentLine4.length; i++) {
                    line4.innerHTML += contentLine4[i]
                    await utils.timer(50);
                }
                // Only render the bottom button after text is printed
                playerInitButton.style.display = "inline"
                playerInitButton.style.opacity = '0.7'
            }

            writer()

        }, false)

        playerInitButton.addEventListener('click', () => {
            // @devMode
            if (!settings.devMode) {
                playerInitButton.style.display = 'none'
            }
            egg.innerHTML = 'Software Engineer'
            egg.id = 'landing_1_inactive'
            egg.classList.add('egg-complete')
            eggPres1.id = 'egg-game-init-hide'

        }, false)
    },

    player: {
        eggsFound: 0,
    }




}

landingPage.init()

</script>
