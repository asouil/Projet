//variables de créations
var nbcolonnes=8;
var nblignes=8;
var nbcouleurs=5;
var jeu=true;
var txt="";
var plateau = [];
//variables d'interchangement de cases
var position="";
var res=[];
var temp="";
//variables de stockage avant disparition
var align=[];
var text="";
//variable pour arrêter la partie au bout d'un moment
var score = 0;


// for(var i=0; i<nblignes;i++) plateau[i]=new Array();
for(var i=0; i<nblignes;i++){
	plateau[i]=[];
}
NewGame();

function NewGame(){
	//this.nblignes indique le contexte courant (les variables disponibles) on peut donc noter this.nblignes ou nblignes.

	for(var i=0; i<nblignes;i++){
		for(var j=0;j<nbcolonnes;j++){
			plateau[i][j]=remplirCases(i,j);
		}
	}

	afficheTextAnnonce("Le jeu commence!");
	jeu=true;
	score=0;
	document.getElementById("score").innerHTML="Score : "+score;
	creerTableau();
	
}

function afficheTextAnnonce(texte){

    //va servir si le mouvement est invalide
	document.getElementById("text-annonce").innerHTML=texte;
}

function creerTableau(){
	txt="<table>";
	for(var i=0;i<nblignes;i++){
		txt+="<tr>";
		for(var j=0;j<nbcolonnes;j++){
			txt+="<td onclick='detecteclic("+i+','+j+");' id='"+i+"-"+j+"'>";
			if(plateau[i][j]==0){
				txt+='<div class="re">'+plateau[i][j]+'</div>';
			}
			if(plateau[i][j]==1){
				txt+='<div class="green">'+plateau[i][j]+'</div>';
			}
			if(plateau[i][j]==2){
				txt+='<div class="blue">'+plateau[i][j]+'</div>';
			}
			if(plateau[i][j]==3){
				txt+='<div class="purple">'+plateau[i][j]+'</div>';
			}
			if(plateau[i][j]==4){
				txt+='<div class="pink">'+plateau[i][j]+'</div>';
			}
			txt+="</td>";
		}
		txt+="</tr>";
	}
	txt+="</table>";
	document.getElementById("Jewelgame").innerHTML=txt;
}

function remplirCases(i,j){
	return Math.floor(Math.random()*Math.floor(nbcouleurs));
}

	
function detecteclic(un, deux){
	//clic, clic à coté, si alignement ok sinon rien faire
	if(!position){			
		afficheTextAnnonce("selection ok");
		position=un+'-'+deux;
		//stocker la position
		return null;
		}
	else 
	{
		
		res[0]=position.slice(0,1);
		res[1]=position.slice(2,3);
			if(plateau[un][deux]==plateau[res]){
				afficheTextAnnonce("Mouvement invalide");
				position=null;
			}
			else {
				afficheTextAnnonce("Mouvement en cours");
				position=plateau[un][deux];
				plateau[un][deux]=plateau[res[0]][res[1]];
				temp=document.getElementById(un+"-"+deux).innerHTML
				document.getElementById(un+"-"+deux).innerHTML=document.getElementById(res[0]+"-"+res[1]).innerHTML;
				document.getElementById(res[0]+"-"+res[1]).innerHTML=temp;
				plateau[res[0]][res[1]]=position;
				position=null;
				return alignement(un, deux, 0, 0);
			}
		}
	}


function alignement(ligne, colonne, l, c){
	
	if (l==0 && c==0) {
		align.push(ligne+"-"+colonne);
		/* on vérifie la ligne à l'horizontale */
		var va =1 + alignement (ligne, colonne-1, 0, -1) + alignement (ligne, colonne+1, 0, 1);
		/* on vérifie la colonne à la verticale */
		var vb =1 + alignement (ligne-1, colonne, -1, 0) + alignement (ligne+1, colonne, 1, 0);
		/* si l'une des valeurs renvoie 3 ou plus, elle explose les pièces  */
		if(va>=3 || vb>=3 ){
			//destroy (problème rencontré: seulement trois pièces explosent alors que la fonction 
			//ne devrait pas s'arrêter tant que toutes les pièces alignées ne soient prises en compte)
			return explosionDePieces(align);
		}
		else {
			align=[];
			return false;
		}
	}
	
	/* On ne calcule pas si on sort du tableau */
	if((ligne < nblignes) && (ligne >= 0) && (colonne < nbcolonnes) && (colonne >= 0)&& (ligne+l < nblignes) && (ligne+l >= 0) && (colonne+c < nbcolonnes) && (colonne+c >= 0)){
		if(plateau[ligne][colonne]==plateau[ligne+l][colonne+c]) {
			console.log("valeur:"+ligne+" "+colonne+" / increment "+l+" "+c);
			align.push(ligne+"-"+colonne);
			return 1 + alignement(ligne+l, colonne+c, l ,c);
		}
		else {
			return 0; 
		}
	}
	return false;
	//if(ligne > nblignes && ligne <= 0 && colonne > nbcolonnes && colonne <= 0){
	//	return false;
	//}
}


function explosionDePieces(tableau){
	var ligne;
	var colonne;
	for(i=0;i<tableau.length;i++){
		//tableau[i]=ligne-colonne
		text = document.getElementById(tableau[i]).innerHTML;
		ligne=tableau[i].slice(0,1);
		colonne=tableau[i].slice(2,3);
		temp=remplirCases(ligne, colonne);
		plateau[ligne][colonne]=temp;
		if(temp==0){
			document.getElementById(tableau[i]).innerHTML='<div class="re">'+plateau[ligne][colonne]+'</div>';
		}
		if(temp==1){
			document.getElementById(tableau[i]).innerHTML='<div class="green">'+plateau[ligne][colonne]+'</div>';
		}
		if(temp==2){
			document.getElementById(tableau[i]).innerHTML='<div class="blue">'+plateau[ligne][colonne]+'</div>';
		}
		if(temp==3){
			document.getElementById(tableau[i]).innerHTML='<div class="purple">'+plateau[ligne][colonne]+'</div>';
		}
		if(temp==4){
			document.getElementById(tableau[i]).innerHTML='<div class="pink">'+plateau[ligne][colonne]+'</div>';
		}
		score+=10;
		document.getElementById("score").innerHTML="Score : "+score;
	}
	align=[];
}

//fonctions manquantes à voir/modifier

function validmove(pos,un,deux){
	//fonction essayer d'autoriser moins de mouvements
	res[0]=pos.slice(0,1);
	res[1]=pos.slice(2,3);
	if(res[0]==un+1||res[1]==deux+1||res[1]==deux-1||res[0]==un-1||res[1]==deux+1){
		return true;
	}
	return false;
}