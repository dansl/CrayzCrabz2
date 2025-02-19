#pragma strict

public var sounds:AudioClip[];


public function PlayRandomSound(){
	var rando:int = Random.Range(0, sounds.Length);
	this.GetComponent.<AudioSource>().clip = sounds[rando];
	this.GetComponent.<AudioSource>().Play();
}