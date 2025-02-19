#pragma strict

public class MainPlayer extends MonoBehaviour {

	public var MaxHealth:float = 60;
	public var CurHealth:float = 60;

	public var MainRig:GameObject;
	public var MainModel:GameObject;
	
	public var injuredSound:AudioClip;
	public var smashSoundObj:GameObject;
	
	public var AttackPOS:GameObject;
	
	public var GrowPowerupLength:float = 3;
	
	public var isDead:boolean = false;
	
	public var deathExplosion:GameObject;
	
	private var GrowTimer:float = 0;
	private var GrowStarted:boolean = false;
	
	private var up:Vector3 = Vector3(0,0,0);
	private var down:Vector3 = Vector3(0,180,0);
	private var left:Vector3 = Vector3(0,270,0);
	private var right:Vector3 = Vector3(0,90,0);
	private var turnSpeed:float = 1.0;
	
	private var accelAmount:float = 20;
	private var maxVelocity:float = 5;
	
	private var sqrMaxVelocity:float;
	
	private var isAttacking:boolean = false;
	
	private var newPOS:Vector3;
	
	private var theGameMaster:GameMaster;
	
	private var MovementX:float = 0;
	private var MovementY:float = 0;
	
	private var injurDelay:boolean = false;
	private var injurDelayTime:int = 0;
	
	public function Start () {
		var findGameMaster:GameObject = GameObject.FindWithTag("GameMaster");
		if(findGameMaster != null){
			theGameMaster = findGameMaster.GetComponent(GameMaster);
		}
	
		sqrMaxVelocity = maxVelocity * maxVelocity;
		
		MainRig.GetComponent.<Animation>()["Idle"].layer = 1;
		MainRig.GetComponent.<Animation>()["Idle"].speed = 0.7;
		
		MainRig.GetComponent.<Animation>()["Run"].layer = 1;
		
		MainRig.GetComponent.<Animation>()["Attack"].layer = 2;
		MainRig.GetComponent.<Animation>()["Attack"].speed = 1.75;
		MainRig.GetComponent.<Animation>()["Attack"].blendMode = AnimationBlendMode.Blend;
	}
	
	function OnCollisionEnter(hit:Collision){
		//Debug.Log("COLLIDE: "+hit.gameObject.transform.tag);
		if(!isDead){
			if(hit.gameObject.transform.tag == "SandboxItem" || hit.gameObject.transform.tag == "Music"){
				
				hit.rigidbody.AddExplosionForce(200, this.gameObject.transform.position, 10, 3.0);
				hit.gameObject.SendMessage("PlayRandomSound", SendMessageOptions.DontRequireReceiver);
			}
		}
	}
	
	function OnCollisionStay (hit : Collision) {
		//Debug.Log("COLLIDE: "+hit.gameObject.transform.tag);
		if(!isDead){
			if(hit.gameObject.transform.tag == "Crab"){
				if(GrowStarted){
					hit.gameObject.SendMessage("KillIt");
					theGameMaster.AddCrabCount(1);
				}else{
					Injure(10);
				}
			}
		}
		
	}
	
	public function Injure(amount:float){
		if(!isDead && !injurDelay){
			injurDelay = true;
			injurDelayTime = Time.time + 3;
			this.GetComponent.<AudioSource>().clip = injuredSound;
			this.GetComponent.<AudioSource>().Play();
			CurHealth -= amount;
			if(CurHealth <= 0){
				CurHealth = 0;
				Death();
			}
			PlayInjurdAni();	
		}
	}
	
	private function PlayInjurdAni(){
		MainModel.GetComponent.<Renderer>().material.color = Color.red;
		yield WaitForSeconds(0.3);
		MainModel.GetComponent.<Renderer>().material.color = Color.white;
		yield WaitForSeconds(0.3);
		MainModel.GetComponent.<Renderer>().material.color = Color.red;
		yield WaitForSeconds(0.3);
		MainModel.GetComponent.<Renderer>().material.color = Color.white;
		yield WaitForSeconds(0.3);
		MainModel.GetComponent.<Renderer>().material.color = Color.red;
		yield WaitForSeconds(0.3);
		MainModel.GetComponent.<Renderer>().material.color = Color.white;
	}
	
	
	public function Death(){
		isDead = true;
		Instantiate(deathExplosion, gameObject.transform.localPosition, Quaternion.identity);
		MainModel.GetComponent.<Renderer>().enabled = false;
	}
	
	public function Heal(amount:float){
		CurHealth += amount;
	}
	
	public function SetMovementX(amount:float){
		//Debug.Log("MovementX: "+MovementX);
		MovementX = amount;
	}
	
	public function SetMovementY(amount:float){
		//Debug.Log("MovementY: "+MovementY);
		MovementY = amount;
	}
	
	public function FixedUpdate () {
		if(!isDead){
			if (MovementY > 0){
				Move(Vector3(0,0,accelAmount));
				newPOS = up;
			}
			
			if (MovementY < 0){
				Move(Vector3(0,0,-accelAmount));
				newPOS = down;
			}
			
			if (MovementX < 0){
				Move(Vector3(-accelAmount,0,0));
				newPOS = left;
			}
			if (MovementX > 0){
				Move(Vector3(accelAmount,0,0));
				newPOS = right;
			}
			
			
			var v = this.GetComponent.<Rigidbody>().velocity;
			if(v.sqrMagnitude > sqrMaxVelocity){
				this.GetComponent.<Rigidbody>().velocity = v.normalized * maxVelocity;
			}
			
			
			MainRig.transform.localRotation = Quaternion.Slerp(MainRig.transform.rotation, Quaternion.Euler(newPOS), Time.deltaTime * 5);
			
			
			if(this.GetComponent.<Rigidbody>().velocity.magnitude > 1){
				MainRig.GetComponent.<Animation>().CrossFade("Run");
			}else{
				MainRig.GetComponent.<Animation>().CrossFade("Idle");
			}
			
			if(GrowStarted){
				if(Time.time >= GrowTimer+GrowPowerupLength){
					EndGrowPowerUp();
				}
			}
			
			if(injurDelay){
				if(Time.time >= injurDelayTime){
					injurDelay = false;
				}
			}
		}
		
	}
	
	public function Attack(){
		if(!isDead){
			this.GetComponent.<Rigidbody>().velocity = Vector3.zero;
			MainRig.GetComponent.<Animation>().Play("Attack");
		}		
	}
	
	public function SoundEffect(){
		GameObject.Instantiate(smashSoundObj, transform.position+(Vector3.forward*1), transform.rotation);
	}
	
	public function ApplyAttack(){
	
		var nearObjects:Collider[] = Physics.OverlapSphere(AttackPOS.transform.position, 1);
		for(var item:Collider in nearObjects){
			if(item.gameObject.tag != "Player" && item.gameObject.GetComponent(Rigidbody) != null){
				Debug.Log("EXPLODE "+item.transform.name);
				item.GetComponent.<Rigidbody>().AddExplosionForce(200, transform.position, 10, 3.0);
			}
			if(item.gameObject.tag == "Crab"){
				item.SendMessage("KillIt");
				//Debug.Log("HIT CRAB");
				theGameMaster.AddCrabCount(1);
			}else if(item.gameObject.tag == "Music"){
				item.SendMessage("DamageIt", 5);
			}
		}
	}
	
	public function Move(force:Vector3){
		this.GetComponent.<Rigidbody>().AddRelativeForce(force);
	}
	
	public function GrowPowerup(){
		//Debug.Log("GROW!");
		GrowStarted = true;
		GrowTimer = Time.time;
		maxVelocity = 6;
		iTween.ScaleTo(MainRig.gameObject, {"scale":Vector3(30,30,30), "time":2});
		theGameMaster.StartCrayzMusic();
		
	}
	
	public function EndGrowPowerUp(){
		GrowStarted = false;
		maxVelocity = 5;
		iTween.ScaleTo(MainRig.gameObject, {"scale":Vector3(10,10,10), "time":2});
	}
	
}