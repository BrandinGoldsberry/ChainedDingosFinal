var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");

fetch('http://localhost:3000/api')
    .then(resp => resp.json()
        .then(jsonVal => 
        {
            var colorPiechart = new Piechart(
                {
                canvas: canvas1,
                data: jsonVal.Q1,
                colors: ["#ff0000", "#57d9ff", "#fde23e"],
                }
                );
                colorPiechart.draw();
            var siblingsPiechart = new Piechart(
                {
                    canvas:canvas2,
                    data:jsonVal.Q2,
                    colors:["#ff0000", "#57d9ff", "#fde23e", "#32a852", "#a232a8"]
                }
                );
                siblingsPiechart.draw();
            var identityPiechart = new Piechart(
                {
                    canvas:canvas3,
                    data:jsonVal.Q3,
                    colors:["#ff0000", "#a232a8", "#57d9ff", "#fde23e"]
                }
                );
                identityPiechart.draw();
        }
    )
);


var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    
    this.draw = function() {
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data){
            var val = this.options.data[categ];
            total_value += val;
        }
        
        var start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;
            
            drawPieSlice(
                this.ctx,
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
    }
}
    function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }