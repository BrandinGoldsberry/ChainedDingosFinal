var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");
 
var answers = {
    "0": 10,
    "1": 14,
    "2": 2,
    "3": 8,
    "4+": 6
};

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    
    this.draw = function(){
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
    var piechart = new Piechart(
        {
            canvas:canvas,
            data:answers,
            colors:["#ff0000", "#57d9ff", "#fde23e", "#32a852", "#a232a8"]
        }
        );
        piechart.draw();