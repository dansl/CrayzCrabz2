using UnityEngine;
using System.Collections;

public class TouchableObject : MonoBehaviour {

	private bool TouchDown = false;
	protected Vector2 TouchStartPOS;
	protected Vector2 TouchEndPOS;

	void Start () {
	
	}

	void Update (){
		foreach (Touch touch in Input.touches){
			//Debug.Log(touch.position);
			if (touch.phase == TouchPhase.Began) {
				if (GetComponent<GUITexture>().HitTest (touch.position)){
					TapStart();
					TouchStartPOS = touch.position;
				}
			}
			
			if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled) {
				if (GetComponent<GUITexture>().HitTest (touch.position) && TouchDown){
					Tapped();
				}
				
				if(TouchDown){
					TapEnd();
					TouchEndPOS = touch.position;
				}
			}
			
			if(touch.phase == TouchPhase.Moved){
				if (GetComponent<GUITexture>().HitTest (touch.position) && TouchDown){
					Dragging(touch.position);
				}
			}
		}
	}

	public void TapStart(){
		TouchDown = true;
	}
	
	public void Tapped(){
		
	}

	public void TapEnd(){
		TouchDown = false;
	}

	public void Dragging(Vector2 pos){
		
	}
}
