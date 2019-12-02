var canvas = document.getElementById("canvas3");
var ctx = canvas.getContext("2d");

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    
    this.draw = function(){
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