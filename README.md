# ParticleScript
Javascript plugin for creating a parallax and particle effect. 
View the <a href="http://andrewvickerman.com/exp/ParticleScript.js">demo</a>. 

<strong>Usage: </strong><br/>
//creates a new instance of ParticleScript<br/>
var ps = new ParticleScript({property:value});<br/>
<br/>
//clears the canvas and refills it with new particles<br/>
ps.refresh();<br/>
<br/>
//moves the particles in relation to x/y coordinates<br/>
//mousemove, draggable elements, etc.<br/>
ps.moveWith(x,y,{property:value});<br/>
<br/>
<strong>Defaults: </strong><br/>
ParticleScript defaults:<br/>
{<br/>
	selector: '#canvas',        //canvas id, it must be an id not a class<br/>
	refresh: 40,                //refresh rate of the canvas in miliseconds<br/>
	number: 200,                //the number of particles on the canvas at one time<br/>
	color: 'random',            //color of particles. accepts a color name, hex, rgba, or an array of colors<br/>
	size: 6,                    //size of the particles. if set as 1, all particles will be the same size. <br/>
	minSize: 0,                 //sets a minimum size of particles<br/>
	speed: 40,                  //speed of the particles<br/>
	minSpeed: 0,                //sets a minimum speed of particles<br/>
	shape: 'circle',            //the shape of the particles. square and circle are supported<br/>
	background: 'black',        //background color of the canvas<br/>
	pull: 'down',               //pull the particles in a direction. up/down/left/right/static<br/>
	height: window.innerHeight, //height of the canvas<br/>
	width: window.innerWidth    //width of the canvas<br/>
}<br/>
<br/>
moveWith method defaults:<br/>
{<br/>
  invertX: true,              //invert the x-axis<br/>
  invertY: true,              //invert the y-axis<br/>
  speed: 0.25                 //the speed of parallax effect<br/>
}<br/>
