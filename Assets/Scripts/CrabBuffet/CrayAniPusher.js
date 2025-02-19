#pragma strict

function ApplyAttack(){
	this.transform.parent.SendMessage("ApplyAttack");
}

function SoundEffect(){
	this.transform.parent.SendMessage("SoundEffect");
}
