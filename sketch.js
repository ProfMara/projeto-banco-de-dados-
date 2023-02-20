var hypnoticBall, database;
var position = 0;
var bola;
var ref;
function setup() {
    createCanvas(500, 500);
    bola = createSprite(250, 250, 10, 10);
    bola.shapeColor = "red";
    //facilitar a sua vida
    database = firebase.database();
    //indica o lugar dos dados da posição da bola
    ref = database.ref("bola/posição");
    //manda ler os dados
    ref.on("value", lerPos , mostrarErro);

}





function draw() {
    background("white");
    if(position !== undefined){

        if (keyDown(LEFT_ARROW)) {
            mexer(-3,0);
        }
        if (keyDown(RIGHT_ARROW)) {
            mexer(3,0);
        }
        if (keyDown(UP_ARROW)) {
            mexer(0,-3);
        }
        if (keyDown(DOWN_ARROW)) {
            mexer(0,3);
        }
        drawSprites();

    }
}

//função que irá escrever os valores no banco de dados 
function mexer(x,y){
    //escreve no banco de dados
    ref.set({
        'x': bola.x + x,
        'y': bola.y + y
    })

}

//função que irá ler a posição da bola do banco de dados
function lerPos(data){
    //copia os valores do banco de dados
    //e guarda na variável pos
    pos = data.val();
    console.log("x: " + pos.x);
    console.log("y: " + pos.y);
    bola.x = pos.x;
    bola.y = pos.y;
}

function mostrarErro(){
    console.log("Dados não recebidos do banco de dados");
}