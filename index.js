import characterData from "./data.js"
import Character from "./character.js"
let isWaiting = false
let monstersArray = ["orc", "demon", "goblin"];

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

const wizard = new Character(characterData.hero)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}



function attack() {
    if (!isWaiting) {
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()

        if (wizard.dead) {
            endGame()
        } else if (monster.dead) {
            isWaiting = true
            if (monstersArray.length > 0) {
                
                setTimeout(() => {
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                }, 1500);
            } else {
                endGame()
            }
        }
    }
}

function endGame() {
    const endMessage = wizard.health === 0 && monster.health === 0 ?
    "No victors - all creatures are dead" :
    wizard.health > 0 ? "The Wizard Wins" :
    "The monsters are Victorious"
    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    
    isWaiting = true
    setTimeout(() => {
    document.body.innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>` 
    }, 1500);
    console.log(endMessage)
}

document.getElementById('attack-button').addEventListener('click', attack)

let monster = getNewMonster()
render()