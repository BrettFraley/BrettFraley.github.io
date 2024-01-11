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

// Make me a class
let bf_egg_game = {
    player: {
        id: '',
        eggsFoundCount: 0,
    },
    egg1Id: '',
    eggs: []
}

const landingPage = {

    // On init, need to know which if any/which eggs have already been found or not,
    // as to not add events to them

    // Pseudo: If storage get game.. extract player data, extract

    init: () => {

        // @devMode - this makes it easy to test on refresh, clearing localStorage
        if (settings.devMode) {
            localStorage.removeItem('bf_egg_game')
        }

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
            if (dom.storGet('bf_egg_game') && !settings.devMode) {
                return;
            }

            egg.id = 'landing_1_active'                         // here egg is the HTML target element, not data
            eggHandler.setEgg(egg, settings.DNA)                // sets egg's egg ID (it's strand)'

            eggPres1.id = 'egg-game-init-show'

            // Player storage setup

            // Okay they've found the first egg
            // so we must initiate a game/player object
            // in local storage for game state persistance
            // This will all have to be revamped into something
            // not so preocedural, but egg1 is the kickoff point here
            // with this onclick ;)

            // NOTE: this can/should only happen once,
            // and all init code like this from the landing page,
            // especially show/hide stuff shouldn't really need to exist'

            let eggId = egg.getAttribute('eggId')
            bf_egg_game.player.id = 'test'
            bf_egg_game.eggsFoundCount += 1
            bf_egg_game.egg1Id = eggId // should just assign this above
            bf_egg_game.eggs.push({ name: 'egg_1',eggId: eggId })

            dom.storSet('bf_egg_game', JSON.stringify(bf_egg_game))

            let testData = JSON.parse(dom.storGet('game'))

            console.table(testData)

            //..................................................................
            // Landing scrambler thing :)
            let count = 0

            setInterval(() => {
                let text = egg.innerHTML

                count  > text.length ? count = 0 : count += 1

                egg.id === 'landing_1_active' ? egg.innerHTML = scrambler(text, count) : false

            },100)

            // Render presentation - This write the text on the screen like it's
            // being printed out kind of thing.

            // note: this function could now accept a list of content strings,
            //       and a list of element ids, or target elements
            async function writer() {

                for (let i = 0; i < content.pres1.length; i++) {

                    let el = dom.byId(`pres1-line${i+1}`)
                    let line = content.pres1[i].split("")

                    for (let j = 0; j < line.length; j++) {
                        el.innerHTML += line[j]
                        await utils.timer(50);
                    }
                }
                // Only render the bottom button after text is printed
                playerInitButton.style.display = "inline"
            }

            writer()

        }, false)

        playerInitButton.addEventListener('click', () => {

            // This is all UI style and show/hide state logic

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

}

// TODO: Only call init if there is not a player.
// Things needed outside of init, should be moved
// outside of init.

landingPage.init()

</script>
