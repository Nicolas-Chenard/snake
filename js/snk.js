// CLASSIC SNAKE - 2019 code by Nicolas CHENARD

clear=function(){ctx.clearRect(0,0,can.width, can.height);}
var can=document.getElementById("can");
var ctx=can.getContext("2d");
var cote = 16;
var mapH = 15;
var mapL = 20;
var map=[];
var decors=[];
var snkTab=[];
var pommeX=0;
var pommeY=0;
var eTab=[];
var nbrE=3;
var langCpt=0;

var etat = "titre";

var sonMange = new Audio("./snd/mange.ogg");
var sonMort = new Audio("./snd/mort.ogg");
var sonLoop1 = new Audio("./snd/musique.ogg");


//initialisation du tableau contenant les objets
for(h=0;h<mapH;h++){map[h]=[];for(l=0;l<mapL;l++){map[h][l]=0;}}
//initialisation du DECORS //////////////
for(h=0;h<mapH;h++){decors[h]=[];for(l=0;l<mapL;l++){
        decors[h][l]=Math.floor(Math.random() * Math.floor(70));}}
         
function drawDecors(){
    with(ctx){
                    beginPath();
                    
        fillStyle="darkGreen";
     
 
        rect(0,0,mapL*cote,mapH*cote);
         fill();           
                    closePath();
        
        
        
    }
    for(h=0;h<mapH;h++){
        for(l=0;l<mapL;l++){
            switch(decors[h][l]){
            case 19 :case 20 :case 21 ://herbe
                
                   
                    
                    with(ctx){
                    beginPath();
                    strokeStyle="green";
                    moveTo(l*cote+cote/2,h*cote+cote/2);  
            
                    quadraticCurveTo(l*cote+3,h*cote, l*cote,h*cote+4);
                        moveTo(l*cote+cote/2,h*cote+cote/2);  
                    lineTo(l*cote+cote/2,h*cote);
                    moveTo(l*cote+cote/2,h*cote+cote/2);
                    quadraticCurveTo(l*cote+cote-3,h*cote, l*cote+cote,h*cote+4);
                        stroke();
                    closePath();}
                    break;
            case 49://fleur
                with(ctx){
                    beginPath();//haut
                    fillStyle="white";
                    fillRect(l*cote+4,h*cote,4,3);
                    closePath();
                    
                    beginPath();//milieu
                    fillStyle="red";
                    fillRect(l*cote+4,h*cote+3,4,3);
                    closePath();
                
                beginPath();//bas
                    fillStyle="lightGrey";
                    fillRect(l*cote+4,h*cote+6,4,3);
                    closePath();
                    
                     beginPath();//bas ombre
                    fillStyle="black";
                    fillRect(l*cote+4,h*cote+6+3,4,1);
                    closePath();
                    
                
                beginPath();//gauche
                    fillStyle="white";
                    fillRect(l*cote,h*cote+3,4,3);
                    closePath();
                    
                     beginPath();//gauche  ombre
                    fillStyle="black";
                    fillRect(l*cote,h*cote+3+3,4,1);
                    closePath();
                
                    
                    beginPath();//droite
                    fillStyle="lightGrey";
                    fillRect(l*cote+8,h*cote+3,4,3);
                    closePath();
                    
                    beginPath();//droite ombre
                    fillStyle="black";
                    fillRect(l*cote+8,h*cote+3+3,4,1);
                    closePath();
     
                }

                    break;

            }//switch 
        }}//for h l
}// drawDecors


document.addEventListener("keydown",pressee,true);
function pressee(x){
    switch(x.key){
        case "ArrowLeft":tete.sX=-1;tete.sY=0;break;
        case "ArrowRight":tete.sX=1;tete.sY=0;break;
        case "ArrowUp":tete.sX=0;tete.sY=-1;break;
        case "ArrowDown":tete.sX=0;tete.sY=1;break;
        }//switch

        if(event.code=="Space" && etat!=="jeu"){
            etat="jeu";
            pomme.pommeDraw();
            sonLoop1.play();
            sonLoop1.loop=1;
           
            ctx.interv = setInterval(jeu,200);
            
        }

   }//func pressee




///////////////////////////// CLASSE ////////////////////////////////////
////////////////////////////////////////////////////////////////////////
Clss=function(id,mX,mY,col){
    this.id=id;
    this.sX=0;
    this.sY=0;
    this.x=mX;
    this.y=mY;
    this.name=name;
    this.color=col;
   
    this.draw =function(){ // affichage d'un element
        with(ctx){
            beginPath();
            fillStyle=this.color;
            fillRect(this.x*cote,this.y*cote,cote,cote);
            stroke();
            closePath();
        }
     }//draw
    this.pommeDraw=function(){
    with(ctx){
        
            beginPath();
        
var my_gradient = createLinearGradient(this.x*cote+8,this.y*cote+cote, this.x*cote+cote, this.y*cote);
my_gradient.addColorStop(0, "black");
my_gradient.addColorStop(0.5 ,"red");
my_gradient.addColorStop(1, "red");
fillStyle = my_gradient;
        
            //fillStyle="red";
            arc((this.x*cote)+8, (this.y*cote)+8, 8, 0, Math.PI*2, false);
            fill();
            closePath();
        beginPath();
            strokeStyle="black";
            moveTo((this.x*cote), (this.y*cote));
            //lineTo((this.x*cote)+4, (this.y*cote)+4);
        //queue de la pomme à ajuster:
        quadraticCurveTo(this.x*cote+8, this.y*cote+4, this.x*cote+4,this.y*cote+4);
        lineCap="round";
        stroke();
            closePath();
        
        beginPath();
            fillStyle="white";
            arc((this.x*cote)+10, (this.y*cote)+3, 1, 0, Math.PI*2, false);
            fill();
            closePath();
           
        
    }//ctx
    }//pommeDraw
    
     this.teteMouv=function(){// mouvement de la tête
         this.x+=this.sX;
         this.y+=this.sY;
            if(this.x+this.sX>mapL){this.x=0}
            if(this.x<0){this.x=mapL+this.sX}
            if(this.y+this.sY>mapH){this.y=0}
            if(this.y<0){this.y=mapH+this.sY}
     }
    

    this.enemis=function(){ //mouvement de l' enemis
       
        
        this.sX=0; this.sY=0;
        let dir = Math.floor(Math.random() * Math.floor(40));
        switch(dir){
            case 1:this.sX=1;break;case 2:this.sX=-1;break;
            case 3:this.sY=1;break;case 4:this.sY=-1;break;
            default :this.sX=0;this.sY=0;break;
            }//switch 
        if(this.x+this.sX==mapL||
           this.x+this.sX<0){this.sX=0}
         else{this.x+=this.sX}
         
        if(this.y+this.sY==mapH||
           this.y+this.sY<0){this.sY=0}
         else{this.y+=this.sY}
     
        
    }// enemis
    
    this.drawEnemis=function(){
    with(ctx){
    beginPath();
            //fillStyle="white";
        var grad = createLinearGradient(this.x*cote+cote/2,0,this.x*cote+cote/2,this.y*cote+cote);
grad.addColorStop(0.9, "white");
      
grad.addColorStop(1, "lightGrey");
fillStyle = grad;     
        
        
        
        arc((this.x*cote+cote/2), (this.y*cote+cote/2), cote/2, 0, Math.PI*2, false);
            fill();
            closePath();
        
       
        
        beginPath();
            fillStyle="black";
            arc((this.x*cote+cote/2), (this.y*cote+cote/2), cote/3, 0, Math.PI*2, false);
            fill();
            closePath();
        
        beginPath();
            fillStyle="white";
            arc((this.x*cote+cote/2)+1, (this.y*cote+cote/2)-1, 1, 0, Math.PI*2, false);
            fill();
            closePath();
        
       
    }//ctx
    }//drawEnemis
    
    this.drawCorps=function(){
    
        with(ctx){
    let e2=4;
            let ee = 6;   
    let e=2;
            let x=this.x*cote;
            let y = this.y*cote;
            let c = cote;
            
            beginPath();
fillStyle="green";
            moveTo(x+e,y);//haut
            lineTo(x+c-e,y)
            lineTo(x+c,y+e)
            lineTo(x+c,y+c-e)
            lineTo(x+c-e,y+c)
            lineTo(x+e,y+c)
            lineTo(x,y+c-e)
            lineTo(x,y+e)
            lineTo(x+e,y);
            stroke();
            fill();
            closePath();

            beginPath();
            fillStyle="white";
            arc((this.x*cote+cote/2)+cote/5, (this.y*cote+cote/2)-cote/5, 1, 0, Math.PI*2, false);
            fill();
            closePath();
        }//ctx
    
       
    }//DrawCorps
    
    
    this.drawTete=function(){
        
        if(this.sY==-1){
            
            with(ctx){
        let x=this.x*cote;
        let c=cote;
        let y=this.y*cote;
        let e=2;
        let ee=4;
        let eee=4;
        
        ///forme BAS
        beginPath();
        strokeStyle="black";
        fillStyle="green";
        moveTo(x+eee,y);
        lineTo(x+c-eee,y);
        lineTo(x+c,y+c-eee-e);
        lineTo(x+c,y+c-e);
        lineTo(x+c-e,y+c);
        lineTo(x+e,y+c);
        lineTo(x,y+c-e);
        lineTo(x,y+c-ee-e);
        lineTo(x+eee,y);
        stroke();
        fill();
        closePath();
                
                beginPath();
            fillStyle="white";
            arc(this.x*cote+cote/2-cote/4, this.y*cote+cote/2, 3, 0, Math.PI, false);
            fill();
            closePath();
        
        beginPath();
            fillStyle="white";
            arc(this.x*cote+cote/2+cote/4, this.y*cote+cote/2, 3, 0, Math.PI, false);
            fill();
            closePath();
        
        beginPath();
            fillStyle="black";
            arc(this.x*cote+cote/2+cote/4, this.y*cote+cote/2, 2, 0, Math.PI, false);
            fill();
            closePath();
        
         beginPath();
            fillStyle="black";
            arc(this.x*cote+cote/2-cote/4, this.y*cote+cote/2, 2, 0, Math.PI, false);
            fill();
            closePath();
            }//ctx   
        }// if y==-1


else{
        
    with(ctx){
        let x=this.x*cote;
        let c=cote;
        let y=this.y*cote;
        let e=2;
        let ee=4;
        let eee=4;
        
        ///forme BAS
        beginPath();
        strokeStyle="black";
        fillStyle="green";
        moveTo(x+e,y);
        lineTo(x+c-e,y);
        lineTo(x+c,y+e);
        lineTo(x+c,y+ee);
        lineTo(x+c,y+e+ee);//joue d
        lineTo(x+c-eee,y+c);
        lineTo(x+eee,y+c);
        lineTo(x,y+e+ee);
        lineTo(x,y+e);//joueg
        lineTo(x+e,y);
        stroke();
        fill();
        closePath();
        
        beginPath();
            fillStyle="white";
            arc(this.x*cote+cote/2-cote/4, this.y*cote+cote/2, 3, 0, Math.PI, true);
            fill();
            closePath();
        
        beginPath();
            fillStyle="white";
            arc(this.x*cote+cote/2+cote/4, this.y*cote+cote/2, 3, 0, Math.PI, true);
            fill();
            closePath();
        
        beginPath();
            fillStyle="black";
            arc(this.x*cote+cote/2+cote/4, this.y*cote+cote/2, 2, 0, Math.PI, true);
            fill();
            closePath();
        
         beginPath();
            fillStyle="black";
            arc(this.x*cote+cote/2-cote/4, this.y*cote+cote/2, 2, 0, Math.PI, true);
            fill();
            closePath();
    }//ctx
        
        //langue
        langCpt++;
        if(langCpt%2==0){
        with(ctx){
            let x=this.x*cote;
        let c=cote;
        let y=this.y*cote;
            let e=2;
            let ee=8;
        beginPath();
        fillStyle="red";
            moveTo(x+c/2-e,y+c);
            lineTo(x+c/2+e,y+c);
            lineTo(x+c/2+e,y+c+ee);
            lineTo(x+c/2,y+c+ee-e-e);
            lineTo(x+c/2-e,y+c+ee);
            lineTo(x+c/2-e,y+c);
        fill();
            closePath();
        
        }//ctx
        
        }//if langCpt;
    
        }//else bas droite gauche

        
    }//drawTete
    
}//Clss



//////////////////////////////////////////////////// init tete/corps

var tete=new Clss("tete",1,12,"yellow");
snkTab.push(tete);
var pomme=new Clss("pomme",13,1,"black");


for(i=0;i<nbrE;i++){
eTab[i]=new Clss("e"+i,10+i*2,10+i*2,"black");

}



function corps(){ // bouger le corps
    for(c=snkTab.length-1;c>0;c--){
        snkTab[c].x=snkTab[c-1].x;
        snkTab[c].y=snkTab[c-1].y;   
    }
}// corps


function assignMap(){ // assigne tout les objets à map
    for(i=0;i<mapH;i++){
    for(j=0;j<mapL;j++){
        map[i][j]=0;//toute la carte à 0;
    for(s=1;s<snkTab.length;s++){
        map[snkTab[s].y][snkTab[s].x]=1; 
        }
    }}// for ij
    map[pomme.y][pomme.x]=2;
    
    for(i=0;i<eTab.length;i++){
    map[eTab[i].y][eTab[i].x]=1;
    }
}// assignMap

function testCol(){


  switch(map[snkTab[0].y][snkTab[0].x]){//test de la tete :
      case 1:
         sonLoop1.pause();
         sonLoop1.currentTime = 0;
          sonMort.play();
        clearInterval(ctx.interv);

 ctx.fillStyle = "rgba(0, 0, 0, 0.518), 2, 2)";
 ctx.fillRect(0,70,can.width,80)
        ctx.font = "20px sans-serif"
    ctx.fillStyle="white";
    ctx.fillText("GAME OVER !",90,100);
    ctx.font = "15px sans-serif"
    ctx.fillText("- press space to play -",85,130);
    tete.x=0;
    tete.y=0;
    snkTab=[];
    snkTab.push(tete);
    
etat = "titre";
        break;
      case 2:
            sonMange.play();
        snkTab[snkTab.length]=new Clss("corps",0,0,"orange");
        pomme.x=Math.floor(Math.random() * Math.floor(mapL));
        pomme.y=Math.floor(Math.random() * Math.floor(mapH));
        break;
    
  
  }//switch
                //  }
}

tete.sX=0;tete.sY=1;

function titre(){

}

function jeu(){
    
    clear();
    drawDecors();

    corps();
    tete.teteMouv();
    tete.drawTete();
    pomme.pommeDraw();
    
    for(i=1;i<snkTab.length;i++){
       snkTab[i].drawCorps();
    } 
    for(i=0;i<eTab.length;i++){
    eTab[i].enemis();
    eTab[i].drawEnemis();
    }
   
    
    assignMap();
    
    testCol();
    }

   
    drawDecors();
    ctx.fillStyle = "rgba(0, 0, 0, 0.518), 2, 2)";
 ctx.fillRect(0,70,can.width,80)
    ctx.font = "20px sans-serif"
    ctx.fillStyle="white";
    ctx.fillText("CLASSIC SNAKE",80,100);
    ctx.font = "15px sans-serif"
    ctx.fillText("- press space to play -",85,130);

   