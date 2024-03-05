class SeededRandom {
    constructor(seed = Math.floor(Math.random() * 10000)) {
        this.seed = seed;
    }
    
    random() {
        let x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
}

function shuffleArray(array, random) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(random.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function openForm(studyID, game, modality, checkboxId) {
    let modalityLetter;
    switch(modality) {
        case "A":
            modalityLetter = "A";
            break;
        case "B":
            modalityLetter = "B";
            break;
        case "C":
            modalityLetter = "C";
            break;
    }

    let formLink;
    switch(game) {
        case "miniGame 1":
            formLink = `https://docs.google.com/forms/d/e/1FAIpQLSfSxnb8346yARLVHl74LNOtVhQNiZrgpUB4Rfc7h5mdMKC7hA/viewform?usp=sf_link&entry.330827269=${studyID}&entry.498669131=${modalityLetter}`;
            break;
        case "miniGame 2":
            formLink = `https://docs.google.com/forms/d/e/1FAIpQLSekqte9ORxFmjda0wlmaSCrKQtSxASeqHrb0te__6zkYqp92Q/viewform?usp=sf_link&entry.1187714480=${studyID}&entry.1299003428=${modalityLetter}`;
            break;
        case "miniGame 3":
            formLink = `https://docs.google.com/forms/d/e/1FAIpQLScfT0Pz7JTW0moaG6v8Bhc5la2mqbjtcShtWbER8merJ3eWcA/viewform?usp=sf_link&entry.1549263789=${studyID}&entry.966537816=${modalityLetter}`;
            break;
    }
    console.log(formLink);
    window.open(formLink, '_blank');

    // Check the checkbox
    document.getElementById(checkboxId).checked = true;
}

function generateList() {
    let seedInput = document.getElementById('seedInput');
    let seed = seedInput.value || Math.floor(Math.random() * 10000);
    seedInput.value = seed; // Update the input with the seed value

    let random = new SeededRandom(seed);

    let miniGames = ["miniGame 1", "miniGame 2", "miniGame 3"];
    let modalities = ["B", "C", "A"];

    shuffleArray(miniGames, random);

    let output = document.getElementById('output');
    output.innerHTML = ''; // Clear the previous output

    // Generate and display Study ID
    let studyID = Math.floor(Math.random() * 10000);
    let studyIdDiv = document.createElement('div');
    studyIdDiv.classList.add('mb-3');
    studyIdDiv.innerHTML = `<h4>Study ID: ${studyID}</h4>`;
    output.appendChild(studyIdDiv);

    miniGames.forEach((game, i) => {
        let gameDiv = document.createElement('div');
        gameDiv.classList.add('mb-3');
        gameDiv.innerHTML = `<h5>${game}</h5>`;
        
        shuffleArray(modalities, random); // Shuffle modalities for each game

        modalities.forEach((modality, j) => {
            let modalityDiv = document.createElement('div');
            modalityDiv.classList.add('row');
            modalityDiv.innerHTML = `
                <div class="col-8">${j+1}.) ${modality}</div>
                <div class="col-4">
                    <input type="checkbox" id="${game}_${modality}" disabled>
                    <button onclick="openForm(${studyID}, '${game}','${modality}', '${game}_${modality}')">Take Survey</button>
                </div>
            `;
            gameDiv.appendChild(modalityDiv);
        });

        output.appendChild(gameDiv);
    });
}
