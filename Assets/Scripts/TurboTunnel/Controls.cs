using UnityEngine;
using System.Collections;

public class Controls : MonoBehaviour {

	//private bool TouchDown = false;
	//private Vector2 TouchStartPOS;
	//private Vector2 TouchEndPOS;

	private Player MainPlayer;

	// Use this for initialization
	void Start () {
		GameObject findMP = GameObject.FindGameObjectWithTag("Player");
		MainPlayer = findMP.GetComponent<Player>();
	}
	
	// Update is called once per frame
	void Update () {
		if(!MainPlayer.IsDead()){
			if(GameData.useTouchControls){
				if(Input.touches.Length > 0){
					foreach (Touch touch in Input.touches){

						//Debug.Log (touch.position.x);
						if(touch.position.x < (Screen.width * 0.5f)){
							MainPlayer.MoveLeft(true);
							MainPlayer.MoveRight(false);
						}
						if(touch.position.x > (Screen.width * 0.5f)){
							MainPlayer.MoveLeft(false);
							MainPlayer.MoveRight(true);
						}
					}
				}else{
					MainPlayer.MoveLeft(false);
					MainPlayer.MoveRight(false);
				}

			}else{
				MainPlayer.MoveRight(Input.GetKey (KeyCode.RightArrow) || Input.GetKey (KeyCode.D));
				MainPlayer.MoveLeft(Input.GetKey (KeyCode.LeftArrow) || Input.GetKey (KeyCode.A));
			}
		}

	}

	public void Dragging(Vector2 pos){
		
	}

}
