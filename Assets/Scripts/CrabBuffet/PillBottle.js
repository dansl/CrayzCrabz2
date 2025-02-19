#pragma strict

public class PillBottle extends MonoBehaviour {

	
	public function OnTriggerEnter(obj:Collider){
		Debug.Log("HIT: "+obj);
		if(obj.gameObject.tag == "Player"){
			obj.gameObject.SendMessage("GrowPowerup");
			Destroy(this.gameObject);
		}
	}

	public function Update () {
		this.transform.Rotate(Vector3(0,200,0) * Time.deltaTime);
	}

}

