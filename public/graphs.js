var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");

var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var blue = document.getElementById('blue');

var zero = document.getElementById('zeroSib');
var one = document.getElementById('oneSib');
var two = document.getElementById('twoSib');
var three = document.getElementById('threeSib');
var four = document.getElementById('fourSib');

var male = document.getElementById('male');
var female = document.getElementById('female');
var nonbinary = document.getElementById('nonbinary');
var other = document.getElementById('other');

var counter = 0;

fetch('http://localhost:3000/api')
    .then(resp => resp.json()
        .then(jsonVal => 
        {
            var colorPiechart = new Piechart(
                {
                canvas: canvas1,
                data: jsonVal.Q1,
                colors: ["#AD1136", "#DE991D", "#3318DE"]
                }
                );
                colorPiechart.draw();
            var siblingsPiechart = new Piechart(
                {
                    canvas:canvas2,
                    data:jsonVal.Q2,
                    colors:["#AD1136", "#DE991D", "#3318DE", "#6F03A8", "#80DE1D"]
                }
                );
                siblingsPiechart.draw();
            var identityPiechart = new Piechart(
                {
                    canvas:canvas3,
                    data:jsonVal.Q3,
                    colors:["#AD1136", "#DE991D", "#3318DE", "#6F03A8"]
                }
                );
                identityPiechart.draw();
        }
    )
);


var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.context = this.canvas.getContext("2d");
    this.colors = options.colors;
    
    this.draw = function() {
        var total_value = 0;
        var color_index = 0;
        for (var category in this.options.data){
            var value = this.options.data[category];
            total_value += value;
        }
        
        var start_angle = 0;
        for (category in this.options.data){
            value = this.options.data[category];
            var slice_angle = 2 * Math.PI * value / total_value;
            
            drawPieSlice(
                this.context,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
                );
                
            start_angle += slice_angle;
            color_index++;
        }   
        generatePercents(options, total_value);
    }

}

function generatePercents(options, total_value) {
    this.options = options;
    var values = []

    //console.log('Options: ', this.options);
    //console.log('Total Value: ', total_value);

    for (var category in this.options.data) {
        var value = this.options.data[category]
        values.push(value);
    }

    //console.log('Values: ', values);

    if(counter % 3 == 0) {
        //console.log('Canvas 1 Values: ', values);
        //console.log('Canvas 1 Total Value: ', total_value);
        //console.log('Canvas 1 Percent Test: ', values[0]/total_value);
        
        red.innerHTML = `${((values[0]/total_value)*100).toPrecision(4)}%`;
        yellow.innerHTML = `${((values[1]/total_value)*100).toPrecision(4)}%`;
        blue.innerHTML = `${((values[2]/total_value)*100).toPrecision(4)}%`;
        
        counter = counter + 1;
    }
    else if (counter % 3 == 1) {
        //console.log('Canvas 2 Values: ', values);
        //console.log('Canvas 2 Total Value: ', total_value);
        //console.log('Canvas 2 Percent Test: ', values[0]/total_value);

        zero.innerHTML = `${((values[0]/total_value)*100).toPrecision(4)}%`;
        one.innerHTML = `${((values[1]/total_value)*100).toPrecision(4)}%`;
        two.innerHTML = `${((values[2]/total_value)*100).toPrecision(4)}%`;
        three.innerHTML = `${((values[3]/total_value)*100).toPrecision(4)}%`;
        four.innerHTML = `${((values[4]/total_value)*100).toPrecision(4)}%`;

        counter = counter + 1;
    }
    else {
        //console.log('Canvas 3 Values: ', values);
        //console.log('Canvas 3 Total Value: ', total_value);
        //console.log('Canvas 3 Percent Test: ', values[0]/total_value);

        male.innerHTML = `${((values[0]/total_value)*100).toPrecision(4)}%`;
        female.innerHTML = `${((values[1]/total_value)*100).toPrecision(4)}%`;
        nonbinary.innerHTML = `${((values[2]/total_value)*100).toPrecision(4)}%`;
        other.innerHTML = `${((values[3]/total_value)*100).toPrecision(4)}%`;

        counter = counter + 1;
    }
    
}

function drawPieSlice(context,centerX, centerY, radius, startAngle, endAngle, color){
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(centerX,centerY);
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.closePath();
    context.fill();
}