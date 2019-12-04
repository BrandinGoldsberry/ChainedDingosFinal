fetch('http://localhost:3000/api')
    .then(resp => resp.json()
        .then(jsonVal => 
            {
                var c = document.getElementById("ageGraph");
                var graphWidth = 200;
                var graphHeight = 300;
                var ageGraph = c.getContext("2d");
                console.log(jsonVal);
                
                drawLines([[0, graphHeight - ((graphHeight / 100) * jsonVal.Ages.max)], [graphWidth, graphHeight - ((graphHeight / 100) * jsonVal.Ages.max)]], ageGraph, "black", 1);
                drawLines([[0, graphHeight], [graphWidth, graphHeight]], ageGraph, "black", 1);
                drawLines([[graphWidth / 2, graphHeight], [graphWidth / 2, graphHeight - ((graphHeight / 100) * jsonVal.Ages.max)]], ageGraph, "black", 1);
                drawRectangle(
                    [
                        [(graphWidth / 4), graphHeight - ((graphHeight / 100) * jsonVal.Ages.upperQuart)], 
                        [(graphWidth / 4) * 3, graphHeight - ((graphHeight / 100) * jsonVal.Ages.upperQuart)],
                        [(graphWidth / 4) * 3, graphHeight - ((graphHeight / 100) * jsonVal.Ages.lowerQuart)],
                        [(graphWidth / 4), graphHeight - ((graphHeight / 100) * jsonVal.Ages.lowerQuart)]
                    ], 
                    ageGraph, 
                    "#57d9ff"
                );

                console.log(graphHeight - (graphHeight / jsonVal.Ages.max * jsonVal.Ages.upperQuart));
                console.log(graphHeight - (graphHeight / jsonVal.Ages.max * jsonVal.Ages.lowerQuart));

                drawLines([[graphWidth / 4, graphHeight - ((graphHeight / 100) * jsonVal.Ages.mean)], [(graphWidth / 4) * 3, graphHeight - ((graphHeight / 100) * jsonVal.Ages.mean)]], ageGraph, "#", 5);

                drawLabel(graphWidth, graphHeight - ((graphHeight / 100) * jsonVal.Ages.mean), jsonVal.Ages.mean, "black", ageGraph);
                drawLabel(graphWidth, graphHeight - ((graphHeight / 100) * jsonVal.Ages.upperQuart), jsonVal.Ages.upperQuart, "black", ageGraph);
                drawLabel(graphWidth, graphHeight - ((graphHeight / 100) * jsonVal.Ages.lowerQuart), jsonVal.Ages.lowerQuart, "black", ageGraph);
                drawLabel(graphWidth, graphHeight, jsonVal.Ages.min, "black", ageGraph);
                drawLabel(graphWidth, graphHeight - ((graphHeight / 100) * jsonVal.Ages.max) + 5, jsonVal.Ages.max, "black", ageGraph);
                
            }));

const drawLabel = (x, y, text, color, canvas) => {
    canvas.font = "12px Arial";
    canvas.fillStyle = color;
    canvas.fillText(text, x, y + 5); 
}

const drawRectangle = (pointSets, canvasContext, color) => {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.moveTo(pointSets[0][0], pointSets[0][1]);
    for (const pointSetId in pointSets) {
        if(pointSetId != 0) {
            canvasContext.lineTo(pointSets[pointSetId][0], pointSets[pointSetId][1]);
        }
    }
    canvasContext.fill();
}
   

const drawLines = (pointSets, canvasContext, color, strokeSize) => {
    canvasContext.strokeStyle = color;
    canvasContext.lineWidth = strokeSize;
    canvasContext.beginPath();
    canvasContext.moveTo(pointSets[0][0], pointSets[0][1]);
    for (const pointSetId in pointSets) {
        if(pointSetId != 0) {
            canvasContext.lineTo(pointSets[pointSetId][0], pointSets[pointSetId][1]);
        }
    }
    canvasContext.stroke();
}
