var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}
drawPieSlice(ctx, 150,150,150, Math.PI/2, Math.PI/2 + Math.PI/4, "#ff0000");

// const canvas;
// const context;
// const numItems;
// const xScalar;
// const yScalar;
// const radius;
// const pie;

// const itemNames = ["Color", "Siblings", "Identity"];
// const case1Value = ["Red", "Blue", "Yellow"]
// const case2Value = [0, 1, 2, 3, "4+"];
// const case3Value = ["Male", "Female", "Nonbinary", "Other"];
// const sectorColor = ["#FF5733", "#328fa8", "#FFBD33", "#33FF57", "#a832a0"];

// function init() {
//     numItems = 3;
//     canvas = document.getElementById("canvas");
//     pie = document.getElementById("pie");
//     context = canvas.getContext("2d");
//     drawPie();
// }

// function drawPie() {
//     radius = canvas.height / 3;
//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;
//     context.strokeStyle = "black";
//     context.font = "17 pt Arial";
//     context.textAlign = "center";
//     context.textBaseline = "middle";

//     const itemValues = case1Value;
//     if(pie.value == "case2") {
//         itemValues = case2Value;
//     }
//     if(pie.value == "case3") {
//         itemValues == case3Value;
//     }

//     const sum = 0;
//     for(i=0; i< numItems; i++) {
//         sum = sum + itemValues[i];
//     }

//     context.clearRect(0,0,canvas.width,canvas.height);
//     const initialAngle = 0;

//     for(i=0; i< numItems; i++) {
//         const sector = itemValues[i] / sum;
//         const wedge = 2 * Math.PI * sector;
//         context.beginPath();
//         const newAngle = initialAngle + wedge;
//         context.arc(centerX, centerY, radius, initialAngle, newAngle);
//         context.lineTo(centerX, centerY);
//         context.closePath();
//         context.fillStyle = sectorColor[i];
//         context.fill();
//         context.stroke();

//         const nameAngle = initialAngle + wedge / 2;
//         const nameX = centerX + Math.cos(nameAngle) * radius * 1.4;
//         const nameY = centerY + Math.sin(nameAngle) + radius * 1.3 - 14;

//         context.save();
//         context.fillStyle = fillColor[i];
//         context.fillText(itemNames[i], nameX, nameY);
//         context.fillText(itemValues[i], nameX, nameY);
//         context.restore();
//         initialAngle = initialAngle + wedge;
//     }
// }