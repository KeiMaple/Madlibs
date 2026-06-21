document.addEventListener('DOMContentLoaded', () => {
    // 1. Stage Element Handles Viewport Group Links
    const titleScreenStage = document.getElementById("title-screen-stage");
    const chooseStoryStage = document.getElementById("choose-story-stage");
    const cinematicStage = document.getElementById("cinematic-stage");
    const mainShufflePickerStage = document.getElementById("main-shuffle-picker-stage");
    const shuffleStage = document.getElementById("shuffle-animation-stage");
    const shuffleCardHolder = document.querySelector(".shuffle-card-holder");
    const intermissionStage = document.getElementById("scenario-intermission-stage");
    const interactiveDashboard = document.getElementById("interactive-dashboard");
    const matrixContainer = document.getElementById("matrix-grid");
    
    // 2. Full-Screen Ornate Gothic Frame View State Panel Selectors
    const frameStage = document.getElementById("gothic-frame-stage");
    const frameTitle = document.getElementById("frame-title");
    const formView = document.getElementById("frame-form-view");
    const resultView = document.getElementById("frame-result-view");
    const modalText = document.getElementById("modal-text");
    
    // 3. INTERNAL VIEW COMPONENT NODES (FIXED: Re-added missing element handles)
    const inputsContainer = document.getElementById("dynamic-inputs-container");
    const generateBtn = document.getElementById("generate-story-btn");
    const backBtn = document.getElementById("back-to-form-btn");

    // Fix initial canvas rendering values so hidden stages fade in flawlessly
    if (chooseStoryStage) chooseStoryStage.style.opacity = "0";
    if (cinematicStage) cinematicStage.style.opacity = "0";

    let rawStoryContent = "";
    let globalSelectedImagePath = "";
    let selectedFilename = "story1_unrequited-love.txt"; 
    let chosenDeckIndex = 1;


    // ==========================================================================
    // PHASE 0: INTERACTIVE CLICK TO PLAY SPLASH INITIATOR
    // ==========================================================================
    if (titleScreenStage) {
        titleScreenStage.addEventListener('click', () => {
            console.log(" Title Splash clicked! Triggering timeline loop...");
            
            // FORCE IMAGE PATH INJECTION: This makes sure the browser can't lose the file path!
            if (chooseStoryStage) {
                chooseStoryStage.style.backgroundImage = "url('assets/Choose Your Story.png')";
            }
            
            titleScreenStage.style.transition = "opacity 0.8s ease-in-out";
            titleScreenStage.style.opacity = "0";
            
            setTimeout(() => {
                titleScreenStage.classList.add("hidden");
                
                if (chooseStoryStage) {
                    chooseStoryStage.classList.remove("hidden");
                    void chooseStoryStage.offsetWidth; 
                    chooseStoryStage.style.transition = "opacity 0.8s ease-in-out";
                    chooseStoryStage.style.opacity = "1";
                    
                    // Phase 0.5: Hold butterfly graphics for 3 full seconds
                    setTimeout(() => {
                        chooseStoryStage.style.opacity = "0";
                        
                        setTimeout(() => {
                            chooseStoryStage.classList.add("hidden"); 
                            
                            if (cinematicStage) {
                                cinematicStage.classList.remove("hidden");
                                void cinematicStage.offsetWidth;
                                cinematicStage.style.transition = "opacity 1.0s ease-in-out";
                                cinematicStage.style.opacity = "1";
                                playIntroSequenceTimeline(); 
                            }
                        }, 1000);
                    }, 3000);
                }
            }, 800);
        });
    }

    // ==========================================================================
    // PHASE 1: AUTOMATED INTRO TIMELINE (SYNCHRONIZED PATHS)
    // ==========================================================================
    const introSequence = [
        "assets/Intro 1.png",
        "assets/Intro 2.png",
        "assets/Intro 3.png",
        "assets/Intro 4.png"
    ];
    let currentIntroStep = 0;

    const playIntroSequenceTimeline = () => {
        if (currentIntroStep < introSequence.length) {
            console.log(`🎬 Loading slideshow frame asset: ${introSequence[currentIntroStep]}`);
            cinematicStage.style.backgroundImage = `url('${encodeURI(introSequence[currentIntroStep])}')`;
            currentIntroStep++;
            setTimeout(playIntroSequenceTimeline, 3500); 
        } else {
            // Intro Concludes -> Shift view directly onto Phase 1.5 Picker
            cinematicStage.style.transition = "opacity 1.0s ease-in-out";
            cinematicStage.style.opacity = "0";
            setTimeout(() => {
                cinematicStage.classList.add("hidden");
                
                // FIXED COMPONENT BLOCK HYGIENE PATCH: 
                // Explicitly tells the browser to turn off and hide the butterfly stage layout block completely,
                // ensuring it can never block your picker screen or float over Scene 1 and Scene 1-1.png later!
                if (chooseStoryStage) {
                    chooseStoryStage.classList.add("hidden");
                    chooseStoryStage.style.display = "none";
                    chooseStoryStage.style.opacity = "0";
                }

                if (mainShufflePickerStage) {
                    mainShufflePickerStage.classList.remove("hidden");
                    void mainShufflePickerStage.offsetWidth;
                    mainShufflePickerStage.style.transition = "opacity 1.0s ease-in-out";
                    mainShufflePickerStage.style.opacity = "1";
                    mainShufflePickerStage.style.backgroundImage = "url('assets/Main Card Shuffle 1.png')";
                }
            }, 1000);
        }
    };


    // ==========================================================================
    // PHASE 1.5: DYNAMIC DECK HOVERS & PATHWAY CLICK ACTIONS (ANTI-LAG REPAIRED)
    // ==========================================================================
    chosenDeckIndex = 1; 
    const deckButtons = document.querySelectorAll(".deck-trigger-btn");
    
    deckButtons.forEach((btn, index) => {
        // Hovering over a card spot maps directly to its starting matrix frame
        btn.addEventListener('mouseenter', () => {
            const laneIndex = index + 1;
            mainShufflePickerStage.style.backgroundImage = `url('assets/Card ${laneIndex}_1 Shuffle.png')`;
        });

        // FIXED: The 'mouseleave' block has been completely removed.
        // Whichever card your mouse touches last will remain locked on screen smoothly, 
        // completely eliminating the lag and snapping stutters!

        btn.addEventListener('click', () => {
            const targetStoryFile = btn.dataset.story;
            chosenDeckIndex = index + 1; 
            
            const targetFileNode = Array.from(document.querySelectorAll('.file-tree li.file')).find(el => el.textContent.trim() === targetStoryFile);
            if (targetFileNode) {
                document.querySelector(".file-tree li.file.active")?.classList.remove("active");
                targetFileNode.classList.add("active");
                selectedFilename = targetStoryFile;
            }

            mainShufflePickerStage.style.opacity = "0";
            setTimeout(() => {
                mainShufflePickerStage.classList.add("hidden");
                fadeIntoInteractiveDashboard();
            }, 1000);
        });
    });

    // ==========================================================================
    // PHASE 2: REVEAL DASHBOARD AND POPULATE MATRIX GRID
    // ==========================================================================
    const fadeIntoInteractiveDashboard = () => {
        cinematicStage.classList.remove("hidden");
        cinematicStage.style.opacity = "1";
        cinematicStage.style.backgroundImage = `linear-gradient(rgba(10,10,12,0.85), rgba(10,10,12,0.85)), url('${encodeURI(introSequence[introSequence.length - 1])}')`;
        interactiveDashboard.classList.remove("hidden");
    };

    // Programmatically render all 21 cell items for the matrix panel
    const totalRows = 3; const totalCols = 7;
    for (let row = 1; row <= totalRows; row++) {
        for (let col = 1; col <= totalCols; col++) {
            const imagePath = encodeURI(`assets/Card ${row}_${col} Shuffle.png`);
            matrixContainer.insertAdjacentHTML('beforeend', `
                <div class="card-item" data-row="${row}" data-col="${col}" data-path="${imagePath}">
                    <div class="thumbnail-wrapper" style="background-image: url('${imagePath}');"></div>
                    <span class="card-label">Card ${row}:${col} Shuffle</span>
                </div>
            `);
        }
    }

    // ==========================================================================
    // PHASE 3: DYNAMIC SEQUENTIAL DECK SHUFFLE + CINEMATIC SCENE TRANSITION
    // ==========================================================================
    matrixContainer.addEventListener('click', (event) => {
        const clickedCard = event.target.closest('.card-item');
        if (!clickedCard) return;

        globalSelectedImagePath = clickedCard.dataset.path;

        // FIXED: Enforce bulletproof layer separation by explicitly hiding the butterfly stage 
        // with every hidden class toggle option possible so it can NEVER cover your Scene files!
        // BULLETPROOF LAYER PURGE:
        // Physically erases the butterfly background property from the browser memory 
        // the millisecond a matrix card cell is clicked!
        if (chooseStoryStage) {
            chooseStoryStage.classList.add("hidden");
            chooseStoryStage.style.opacity = "0";
            chooseStoryStage.style.display = "none";
            chooseStoryStage.style.pointerEvents = "none";
            chooseStoryStage.style.backgroundImage = "none"; // WIPES OUT THE BUTTERFLY IMAGE FOR GOOD
        }


        if (intermissionStage) {
            intermissionStage.classList.add("hidden");
            intermissionStage.style.opacity = "0";
            intermissionStage.style.display = "none";
        }

        interactiveDashboard.classList.add("hidden");
        shuffleStage.classList.remove("hidden");

        let matrixStep = 1;
        const totalMatrixSteps = 7;
        
        // Cycle rapidly through Card X_1 Shuffle.png to Card X_7 Shuffle.png
        const sequenceIntervalTimer = setInterval(() => {
            if (matrixStep <= totalMatrixSteps) {
                const stepImagePath = "assets/Card " + chosenDeckIndex + "_" + matrixStep + " Shuffle.png";
                shuffleCardHolder.style.backgroundImage = "url('" + stepImagePath + "')";
                matrixStep++;
            } else {
                clearInterval(sequenceIntervalTimer);
                
                // STEP 1: Turn off and clear out the shuffle card shaker box instantly
                shuffleStage.classList.add("hidden");
                
                // STEP 2: Load full screen "Scene X.png" with NO input fields or titles visible yet
                const targetScenePath = "assets/Scene " + chosenDeckIndex + ".png";
                frameStage.style.backgroundImage = "url(" + targetScenePath + ")";
                
                // Hide the story title and form view so the screen is completely clean art
                if (frameTitle) frameTitle.style.display = "none"; 
                formView.classList.add("hidden"); 
                
                frameStage.classList.remove("hidden");
                frameStage.style.transition = "opacity 0.8s ease-in-out, background-image 0.8s ease-in-out";
                frameStage.style.opacity = "1";
                
                // Hold the magnificent Scene X frame for exactly 3.0 seconds, 
                // setting the dark gothic atmosphere before smoothly fading the inputs into place!
                setTimeout(() => {
                    triggerGothicFrameFormProcessing();
                }, 3000);
            }
        }, 100); 
    });




    // ==========================================================================
    // PHASE 4: AMBIENT WALLPAPER OVERLAY & FORM INPUT FIELD GENERATOR
    // ==========================================================================
    const triggerGothicFrameFormProcessing = async () => {
        try {
            const response = await fetch(`/api/story/${selectedFilename}`);
            const data = await response.json();
            
            if (data.content) {
                rawStoryContent = data.content;
                
                // Hide or update title text block if you want the open space completely clean
                if (frameTitle) frameTitle.textContent = data.title;
                inputsContainer.innerHTML = "";

                if (!data.placeholders || data.placeholders.length === 0) {
                    modalText.textContent = data.content;
                    formView.classList.add("hidden");
                    resultView.classList.remove("hidden");
                } else {
                    data.placeholders.forEach(tag => {
                        const group = document.createElement("div");
                        group.className = "input-group";
                        group.innerHTML = `
                            <label for="tag-${tag}">${tag.replace(/_/g, ' ').toUpperCase()}</label>
                            <input type="text" id="tag-${tag}" data-tag="${tag}" placeholder="Enter ${tag.replace(/_/g, ' ')}..."/>
                        `;
                        inputsContainer.appendChild(group);
                    });
                    
                    // FIXED: Bring the heading back so the title shows cleanly above the text inputs
                    if (frameTitle) {
                        frameTitle.style.display = "block";
                        frameTitle.textContent = data.title;
                    }
                    
                    formView.style.opacity = "0";
                    formView.classList.remove("hidden");
                    void formView.offsetWidth; 
                    formView.style.transition = "opacity 0.6s ease-in-out";
                    formView.style.opacity = "1";
                    
                    resultView.classList.add("hidden");
                }

                
                // FIXED COMPONENT BACKGROUND ROUTER:
                // When the text box form wakes up, we apply a dark transparent overlay 
                // directly on top of your Scene X.png file so it keeps your magnificent silver gothic borders visible!
                const sceneX_Path = "assets/Scene " + chosenDeckIndex + ".png";
                frameStage.style.backgroundImage = "linear-gradient(rgba(10, 10, 12, 0.70), rgba(10, 10, 12, 0.70)), url(" + sceneX_Path + ")";
                
                // Swap visible layers to isolate the full-screen Gothic Frame viewport stage
                cinematicStage.classList.add("hidden");
                frameStage.classList.remove("hidden");
                frameStage.style.opacity = "1";

            }
        } catch (error) {
            console.error("Communications failure compiling text target inputs:", error);
        }
    };


// Sidebar tree text folder highlights updates
const fileItems = document.querySelectorAll('.file-tree li.file');
fileItems.forEach(file => {
    file.addEventListener('click', () => {
        document.querySelector(".file-tree li.file.active")?.classList.remove("active");
        file.classList.add("active");
        selectedFilename = file.textContent.trim();
    });
});

// Compile inputs inside the Gothic Border Space Frame
generateBtn.addEventListener('click', () => {
    let compiledStory = rawStoryContent;
    inputsContainer.querySelectorAll('input').forEach(input => {
        const tagValue = input.value.trim() || `[${input.dataset.tag}]`;
        const escapedTag = input.dataset.tag.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        compiledStory = compiledStory.replace(new RegExp(`\\{${escapedTag}\\}`, 'g'), tagValue);
    });
    
    modalText.textContent = compiledStory;
    formView.classList.add("hidden");
    resultView.classList.remove("hidden");
});

backBtn.addEventListener('click', () => {
    resultView.classList.add("hidden");
    formView.classList.remove("hidden");
});
});

