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

const settings = {
    strandLength: 64,
    eggCount: 12,
    DNA: ['A', 'C', 'G', 'T'],
    RNA: ['A', 'C', 'G', 'U'],
}

const eggUtils = {
    storSet: (k, v) => localStorage.setItem(k, v),
    storGet: k => localStorage.getItem(k),
    storRem: k => localStorage.removeItem(k),
    // storCheck
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
    eggGameInit: () => document.getElementById('egg-game-init-hide'),
    playerInitButton: () => document.getElementById('player-init'),
    headerSoftwareEngineer: () => document.getElementsByClassName('header-tagline')[0]
}

const eggHandler = {
    hasAttr: (el, attrName) => el.hasOwnProperty(attrName),
    setAttr: (el, name, val) => el.setAttribute(name, val),
    setEgg:  el => el.setAttribute('egg', newStrand(settings.DNA))
}

const landingPage = {
    // On init, need to know which eggs have already been found or not,
    // as to not add events to them
    init: () => {
        let egg = easterEggElements.headerSoftwareEngineer()            // egg 1
        let eggPres1 = easterEggElements.eggGameInit()                  // presentation 1
        let playerInitButton = easterEggElements.playerInitButton()    // accept egg 1 button

        egg.addEventListener('mouseover', () => {
            egg.id = 'landing_1_active'
            eggHandler.setEgg(egg)
            eggPres1.id='egg-game-init-show'
        }, false )

        playerInitButton.addEventListener('click', () => {
            egg.id = 'landing_1_inactive'
            eggPres1.id='egg-game-init-hide'
        }, false)



        // egg.addEventListener('mouseout', () => {
        //     egg.id = 'landing_1_inactive'
        // }, false )
    }
}

landingPage.init()

</script>
