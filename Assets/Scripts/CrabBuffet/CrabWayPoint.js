#pragma strict

public class CrabWayPoint extends MonoBehaviour {
	
	public function OnDrawGizmos():void {
		Gizmos.DrawIcon(this.transform.position, "waypoint.psd");
		Gizmos.color = Color.green;
		Gizmos.DrawWireSphere(transform.position, 1);
	}
}