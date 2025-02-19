#pragma strict

public class CrabSpawner extends MonoBehaviour {
	
	public var SpawnerEnabled:boolean = true;
	
	public var MaxCrabs:int = 10;
	
	public var waypoints:GameObject[];
	public var StartDelay:float = 0;
	public var rateOfSpawn:float = 2.0;
	public var CrabObject:GameObject;
	
	private var startTime:float;
	
	private var SpawnedCrabs:ArrayList = new ArrayList();
	
	public function OnDrawGizmos():void {
		Gizmos.DrawIcon(this.transform.position, "spawner.psd");
		Gizmos.color = Color.red;
		Gizmos.DrawWireSphere(transform.position, 1);
	}
	
	public function Start(){
		if(StartDelay == 0 && SpawnerEnabled == true){
			SpawnCrab();
		}
	}
	
	public function FixedUpdate(){
		if(SpawnerEnabled == true){
			if(Time.time >= (startTime + rateOfSpawn)+StartDelay){
				SpawnCrab();
				startTime = Time.time;
				StartDelay = 0;
			}
		}
	}
	
	public function SpawnCrab(){
		CheckCrabAmount();
	
		if(SpawnedCrabs.Count < MaxCrabs){
			var crab:GameObject = GameObject.Instantiate(CrabObject, this.transform.position, this.transform.rotation);
			crab.SendMessage("SetWaypoints", waypoints);
			SpawnedCrabs.Add(crab);
		}
	}
	
	public function CheckCrabAmount(){
		//Debug.Log(SpawnedCrabs.Count +" "+ MaxCrabs);
		for(var i:int = 0; i < SpawnedCrabs.Count; i++){
			var item:GameObject = SpawnedCrabs[i];
			if(item == null){
				SpawnedCrabs.Remove(i);
			}
		}
	}
	
	
}