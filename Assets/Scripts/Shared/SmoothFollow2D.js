#pragma strict


public class SmoothFollow2D extends MonoBehaviour {
	public var target : Transform;
	public var smoothTime = 0.3;
	public var MaxXPosition:float;
	public var MinXPosition:float;
	
	private var thisTransform : Transform;
	private var velocity : Vector2;
	
	function Start(){
		thisTransform = transform;
	}
	
	function Update() {
		thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, 
			target.position.x, velocity.x, smoothTime);
		thisTransform.position.y = Mathf.SmoothDamp( thisTransform.position.y, 
			target.position.y, velocity.y, smoothTime);
			
		thisTransform.position.x = Mathf.Clamp(thisTransform.position.x, MinXPosition, MaxXPosition);
	}
}