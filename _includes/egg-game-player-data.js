<script>

    let dataUI = document.getElementById('player-data-wrapper')
    let playerId = document.getElementById('player-id')
    let playerEggs = document.getElementById('player-eggs')

    let game = JSON.parse(localStorage.getItem('bf_egg_game'))
    console.log(game)
    let eggs = game.eggs
    console.log(eggs)

    eggs.forEach(egg => {
        let p = document.createElement('p')
        p.innerHTML = `Egg Name: ${egg.name} EggId: ${egg.eggId}`
        dataUI.appendChild(p)
    })

</script>
