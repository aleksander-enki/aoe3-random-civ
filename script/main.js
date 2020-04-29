const randomizeButton = document.querySelector('#civilization-randomizer');
const toggleOptionsModalButton = document.querySelector('#toggle-options');
const optionsModal = document.querySelector("#options-modal");
const resultsDisplay = document.querySelector("#civilization-results");
const loadSettings = function (){
    return JSON.parse(document.querySelector("#settings").innerHTML);
}
const updateResults = function(results, civilizations){
    let clipboardCopy = "";
    let iteration = 0;
    resultsDisplay.innerHTML = "";
    while(iteration < results.length){
        if(iteration != 0) clipboardCopy += ' | '
        civ = results[iteration];
        player = iteration+1;
        console.log(`Player ${player} is ${civilizations[civ]}`);

        resultsDisplay.innerHTML += `<section class="result"><span>Player ${player}</span><span>${civilizations[civ]}</span><span class="civ-flag civ-flag-${civ}"></span></section>`

        clipboardCopy += `${player}:  ${civilizations[civ]}`
        
        iteration++;
    }
    
    let dummyElement = document.createElement('textarea');
    dummyElement.value = clipboardCopy;
    dummyElement.setAttribute('readonly', '');
    dummyElement.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(dummyElement);
    dummyElement.select();
    document.execCommand('copy');
    document.body.removeChild(dummyElement);

    console.log("COPIED TO CLIPBOARD: " + clipboardCopy)
}
const randomizeCivilizations = function(){
    let settings = loadSettings();
    let civilizations = settings['civs'];
    let players = settings['maxPlayers'];
    let amountOfCivRepeats = settings['uniqueCivs'];

    let civTracker = new Array(civilizations.length).fill(0,0);
    let player = new Array(players).fill(0,0);
    let iteration = 0;
    let loopIterations = 0;
    while(iteration < players){
        let temp = Math.floor(civilizations.length * Math.random());
        let update = true;
        let currentCivCheck = civTracker[temp];

        //if random civ already chosen and is at limit.
        if(currentCivCheck == amountOfCivRepeats && currentCivCheck > 0) update = false;
        if(update){
            civTracker[temp]++;
            player[iteration] = temp;
            iteration++;
        }
        loopIterations++;
    }
    updateResults(player, civilizations);
}
toggleOptionsModalButton.addEventListener('click', function(e){
    e.preventDefault();
    console.log("Toggling Modal");
    optionsModal.classList.toggle("modal-open");
    toggleOptionsModalButton.classList.toggle("is-active");
})
randomizeButton.addEventListener('click', function(e){
    e.preventDefault();
    console.log('Running Randomization...');
    randomizeCivilizations();
})