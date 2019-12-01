var globalVars = {
    avatarImg: document.getElementById("avatarImg"),
    noseInput: document.getElementById("noseOption"),
    eyeInput: document.getElementById("eyesOption"),
    mouthInput: document.getElementById("mouthOption"),
    colorInput: document.getElementById("colorOption"),
    bigJson: {
        face:
        {
            eyes: [
                "eyes1",
                "eyes10",
                "eyes2",
                "eyes3",
                "eyes4",
                "eyes5",
                "eyes6",
                "eyes7",
                "eyes9"
            ],
            nose: [
                "nose2",
                "nose3",
                "nose4",
                "nose5",
                "nose6",
                "nose7",
                "nose8",
                "nose9"
            ],
            mouth: [
                "mouth1",
                "mouth10",
                "mouth11",
                "mouth3",
                "mouth5",
                "mouth6",
                "mouth7",
                "mouth9"
            ]
        }
    }
}

//https://api.adorable.io/avatars/face/eyes4/nose3/mouth7/8e8895
const updateImage = () => {
    var mouth = globalVars.bigJson.face.mouth[globalVars.mouthInput.value];
    var nose = globalVars.bigJson.face.nose[globalVars.noseInput.value];
    var eyes = globalVars.bigJson.face.eyes[globalVars.eyeInput.value];
    var color = globalVars.colorInput.value.slice(1, 8);

    console.log(color);

    globalVars.avatarImg.src = `https://api.adorable.io/avatars/face/${eyes}/${nose}/${mouth}/${color}`;
}

updateImage();
globalVars.colorInput.addEventListener('input', updateImage);
globalVars.eyeInput.addEventListener('input', updateImage);
globalVars.mouthInput.addEventListener('input', updateImage);
globalVars.noseInput.addEventListener('input', updateImage);