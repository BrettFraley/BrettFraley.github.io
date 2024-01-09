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

/**
 * Easter egg elements
 * Note: specific class names are used when IDs should be,
 * but then one could more easily find all eggs by browsing
 * elements with ids
 */

const settings = {
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
    headerSoftwareEngineer: () => document.getElementsByClassName('site-description')[0]
}

const eggHandler = {
    hasAttr: (el, attrName) => el.hasOwnProperty(attrName),
    setAttr: (el, name, val) => el.setAttribute(name, val),
    setEgg:  el => el.setAttribute('egg', newStrand(settings.DNA))
}

const landingPage = {

    init: () => {
        let egg = easterEggElements.headerSoftwareEngineer()

        egg.addEventListener('mouseover', () => {
            eggHandler.setEgg(egg)
            egg.classList.add('landing_1')
        }, false )

        egg.addEventListener('mouseout', () => {
            egg.classList.remove('landing_1')
        }, false )
    }
}

landingPage().init()
