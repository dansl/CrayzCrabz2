#pragma strict

public class CrabAI extends MonoBehaviour {
	
	public var CrabDeathEffect:GameObject;
	public var CrabModelPath:GameObject;
	
	private var accelAmount:float = 10;
	private var maxVelocity:float = 3;
	
	private var sqrMaxVelocity:float;
	
	private var waypoints:GameObject[];
	private var curWaypoint:int = 0;
	
	private var targetWaypoint:GameObject;
	
	private var stuckCheckTime:float = 10.0; //This is how long to wait before we assume the AI is stuck and isn't going to reach the next waypoint. So we pick a new waypoint
	private var lastStuckCheckTime:float = 0;

	private var isDead:boolean = false;

	public function Start(){
		GetNewWaypoint();
	}	
	
	public function FixedUpdate(){
		if(waypoints != null && !isDead){
			
			if(Vector3.Distance(this.transform.position, targetWaypoint.transform.position) <= 2){
				GetNewWaypoint();
			}
			
			var targetDirection:Vector3 = (targetWaypoint.transform.position - this.transform.position);
		
			if(targetDirection != Vector3.zero){
	
				var rotation:Quaternion = new Quaternion();
		        rotation.SetLookRotation(targetDirection,this.transform.up);
		        rotation.eulerAngles.x = 0;//Only rotate on Y
		        rotation.eulerAngles.z = 0;
		        transform.localRotation = Quaternion.Slerp(transform.rotation, rotation, 0.2);
	
			}
		
			this.GetComponent.<Rigidbody>().AddRelativeForce(Vector3(0,0,accelAmount));
			
			var v = this.GetComponent.<Rigidbody>().velocity;
			if(v.sqrMagnitude > sqrMaxVelocity){
				this.GetComponent.<Rigidbody>().velocity = v.normalized * maxVelocity;
			}
			
			CheckIfStuck();
		
			
		}
	}
	
	public function CheckIfStuck(){
	//This is for checking if the bot has reached its goal. If not, then it tries a new waypoint 
		if(Time.time >= (lastStuckCheckTime + stuckCheckTime)) {
			GetNewWaypoint();
		}
	}
	
	public function GetNewWaypoint(){
		var rando:int = Random.Range(0, waypoints.Length);
		targetWaypoint = waypoints[rando];
		//Debug.Log("GET WAYPOINT: "+rando);
		lastStuckCheckTime = Time.time;
	}
	
	public function SetWaypoints(newWP:GameObject[]){
		waypoints = newWP;
	}
	
	public function KillIt(){
		isDead = true;
		Destroy(this.GetComponent.<Collider>());
		Destroy(this.GetComponent.<Rigidbody>());
		GameObject.Instantiate(CrabDeathEffect, this.transform.position, this.transform.rotation);
		CrabModelPath.GetComponent.<Animation>().Play("CrabDeath");
		Destroy(this.gameObject,1);
	}
}