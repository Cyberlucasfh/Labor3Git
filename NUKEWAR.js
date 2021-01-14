var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
divide();



function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}




function divide(){
    ctx.moveTo(c.width/2, 0);
    ctx.lineTo(c.width/2,c.height);
    ctx.stroke();
    ctx.moveTo(0,0);
    ctx.fillStyle="blue";
    ctx.fillRect(0, 0, c.width/2-10, c.height);
    ctx.fillStyle="red";
    ctx.fillRect(c.width/2+10, 0, c.width, c.height);
}

class Country{
    constructor(name, cities, minX,maxX, Names) {
        this.name=name;
        this.cityNr= cities;
        this.minX=minX;
        this.maxX=maxX;
        this.towns =[];
        this.nukeChance = 99.99
        this.Names=Names

        this.ruNames = ["Soralsk", "Mezhduzan", "Irkulovka", "Stuluga", "Naverertsy", "Vorozan", "Tualensk", "Lymbov", "Kuzneratov", "Lesnkovo","Moscow"]
        this.usNames =["Ecktrie", "Colcana", "Eatomeny", "Upersuaq", "Sitat", "Havigsiaat", "Chilpancan", "Comalnito", "Tantro", "Salispool", "Wrentshire", "Derlem","Washington"]
        console.log(this.ruNames)
        this.createCities()
    }

    createCities(){
        var i;
        for (i = 0; i < this.cityNr; i++){
            if (this.Names ==true){
            this.towns[i]= new City(this.ruNames[i],Math.random()*(this.maxX-this.minX)+this.minX,Math.random()*c.height);}
            else{this.towns[i]= new City(this.usNames[i],Math.random()*(this.maxX-this.minX)+this.minX,Math.random()*c.height);}
        }
        console.log(this.towns);
    }

    drawCities(){
        var i;
        for (i = 0; i < this.cityNr; i++){
            if (this.towns[i].population >1){
            ctx.fillStyle ="yellow";
            ctx.beginPath();
            ctx.arc(this.towns[i].posX, this.towns[i].posY, 5, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();}
            else{
                this.towns[i].population =0
                ctx.fillStyle ="yellow";
                ctx.font = "10px Arial";
                ctx.fillText("X", this.towns[i].posX, this.towns[i].posY);
            }
            ctx.fillStyle ="black";
            ctx.font = "10px Arial";
            ctx.fillText(this.towns[i].name, this.towns[i].posX-10, this.towns[i].posY+15);
            ctx.fillText("Pop:"+Math.round(this.towns[i].population)+"K", this.towns[i].posX-10, this.towns[i].posY+25);

        }
    }
    killPeople(){
        var i;
        for (i = 0; i < this.cityNr; i++){
            if (this.towns[i].population>1){
            this.towns[i].population-=1;}

        }
    }


}

class City{
    constructor(name, posX,posY){
        this.name=name;
        this.posX = posX;
        this.posY = posY;
        this.population = Math.random()*100+10
        console.log(this.name+","+this.posX+","+this.posY);
    }


}

class War{
    constructor(CountryA, CountryB) {
        this.A = CountryA
        this.B = CountryB
        this.nukes =[]
        this.explosions=[]
    }
    determineLauch(){
        var i
        for (i = 0; i < this.A.cityNr; i++){
            var rng = Math.random()*100
            if (rng>this.A.nukeChance){
                var target = randomIntFromInterval(0,this.B.cityNr-1)
                if (this.B.towns[target].population>0 && this.A.towns[i].population>0){
                this.nukes.push(new Nuke(this.A.towns[i],this.B.towns[target]))
                console.log("NUKE LAUNCHED"+this.A.name+i+":"+target+"-"+this.A.nukeChance)}
                this.A.nukeChance-=0.01
            }

    }
        for (i = 0; i < this.B.cityNr; i++){
            var rng = Math.random()*100
            if (rng>this.B.nukeChance){
                var target = randomIntFromInterval(0,this.A.cityNr-1)
                if (this.A.towns[target].population>0 && this.B.towns[i].population>0){
                this.nukes.push(new Nuke(this.B.towns[i],this.A.towns[target]))
                console.log("NUKE LAUNCHED"+this.B.name+i+":"+target+"-"+this.B.nukeChance)}
                this.B.nukeChance-=0.01
            }
        }
    }
    drawNukes(){
        var i
        for (i = 0; i < this.nukes.length; i++){
            if(this.nukes[i]!=null){
            this.nukes[i].draw()

            if (this.nukes[i].done ==true){
                this.explosions.push(new Explosion(this.nukes[i].epx,this.nukes[i].epy))
                this.nukes[i]=null
            }}
        }
    }
    drawExplosions(){
        var i
        for (i = 0; i < this.explosions.length; i++){
            this.explosions[i].draw()
    }

}
}

class Nuke {
    constructor(townA,townB) {
        this.spx = townA.posX
        this.spy =townA.posY
        this.posX = this.spx
        this.posY = this.spy
        this.epx =townB.posX
        this.epy =townB.posY
        this.townA=townA
        this.townB=townB
        this.done =false

    }
    draw(){
        this.update()
        if (this.townB.population<1){
            this.done=true;
        }
        ctx.fillStyle ="green";
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    update(){

        if (this.posX<this.epx){
            this.posX+=1
        }
        else if (this.posX>this.epx){
            this.posX-=1
        }
        if (this.posY<this.epy){
            this.posY+=1
        }
        else if (this.posY>this.epy){
            this.posY-=1
        }
        if (this.posX-this.epx<=5 && this.posY-this.epy<=5 &&
            this.posX+this.epx>=-5 && this.posY+this.epy>=-5){
            console.error("BOOM")
            this.townB.population-=10
            this.done = true
        }
    }

}
class Explosion{
    constructor(x,y) {
        this.x = x
        this.y = y
        this.radius = 0
    }
    draw (){
        this.update();
        if (this.radius<=3){
            ctx.fillStyle ="white";
            ctx.fillRect(0,0,c.width,c.height)
        }
        else if (this.radius <=15){
            ctx.fillStyle ="white";

        }
        else {
            ctx.fillStyle ="#00ff0009";
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    update (){
        if (this.radius <=30){
            this.radius+=1
        }



    }
}

USSR= new Country("USSR",10,c.width/2+10,c.width,true)
USA = new Country("USA",10,0, c.width/2-10,false);


WW3 = new War(USA,USSR)

function draw(){
    ctx.clearRect(0,0,c.width,c.height)
    divide()
    USA.drawCities()
    USSR.drawCities()
    WW3.determineLauch()
    WW3.drawNukes()
    WW3.drawExplosions()

}
timer=setInterval(draw, 10);
