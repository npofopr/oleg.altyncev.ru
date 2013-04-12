function blinkPseudoCursor()
{
if (document.getElementById){
var pseudoCursor = document.getElementById('pseudoCursor');
if (pseudoCursor) pseudoCursor.style.color = RGBtoHex(pseudoCursor.style.color)=='#e8e8e8'?'#222222':'#e8e8e8';
}
}
setInterval(blinkPseudoCursor, 700);
function RGBtoHex(rgb)
{
if(rgb.indexOf("rgb(")==-1) return rgb;
var rgb_array = rgb.replace("rgb(","").replace(")","").split(",");
rgb_array[0] = decToHex(rgb_array[0]);
rgb_array[1] = decToHex(rgb_array[1]);
rgb_array[2] = decToHex(rgb_array[2]);
return "#"+rgb_array.join("");
}
function decToHex(n){return Number(n).toString(16);}
function hexTodec (hex){return parseInt(hex,16);}