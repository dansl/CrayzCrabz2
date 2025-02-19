#pragma strict

public class MusicSpeaker extends MonoBehaviour {

	public var MaxHealth:int = 50;
	public var CurHealth:int  = 50;
	public var Explosion:GameObject;
	public var speakerObj:GameObject;
	
	public var RandoMusic:AudioClip;
	
	private var isDead:boolean = false;
	
	private var isHit:boolean = false;
	
	private var randoMusicStarted:boolean = false;
	
	public function Start(){
		CurHealth = MaxHealth;
	}
	
	public function DamageIt(amount:int){
		if(!isDead && !isHit){
			isHit = true;
			CurHealth -= amount;
			
			if(CurHealth <= 0){
				isDead = true;
				GameObject.Instantiate(Explosion, gameObject.transform.position, gameObject.transform.rotation);
				speakerObj.GetComponent.<Renderer>().enabled = false;
				gameObject.GetComponent.<AudioSource>().Stop();
			}else if(CurHealth <= MaxHealth*0.5 && !randoMusicStarted){
				randoMusicStarted = true;
				gameObject.GetComponent.<AudioSource>().clip = RandoMusic;
				gameObject.GetComponent.<AudioSource>().Play();
			}
			
			ResetIsHit();
		}
	}
	
	private function ResetIsHit(){
		yield WaitForSeconds(2);
		isHit = false;
	}
}