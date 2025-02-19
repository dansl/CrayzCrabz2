using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {

	public GameObject Explode;
	public GameObject MainModel;

	//private float speed = 5;
	private float velocity = 0f;
	private float maxVel = 10f;
	private float accel = 0.4f;
	
	//private float bobbingSpeed = 5f;
	//private float bobbingAmount = 0.03f;

	private bool isDead = false;

	private TurboTunnelGameMaster GameMaster;

	private bool MoveLeftBool = false;
	private bool MoveRightBool = false;
	
	void Awake () {
		GameObject findGM  = GameObject.FindWithTag("GameMaster");
		GameMaster = findGM.GetComponent<TurboTunnelGameMaster>();
	}

	public void MoveLeft(bool Bool){
		MoveLeftBool = Bool;
	}

	public void MoveRight(bool Bool){
		MoveRightBool = Bool;
	}

	void Update () {
		if(!isDead){

			if (MoveLeftBool) {
				velocity -= accel;
			}else if(MoveRightBool){
				velocity += accel;
			}else{
				if(velocity < -0.5f){
					velocity += accel;
				}else if(velocity > 0.5f){
					velocity -= accel;
				}else{
					velocity = 0f;
				}

			}

			velocity = Mathf.Clamp(velocity,-maxVel, maxVel);

			gameObject.transform.localPosition += new Vector3((velocity*Time.deltaTime), 0, 0);

			float xPOS = Mathf.Clamp(transform.localPosition.x, -10.0f, 10.0f);
			if(Mathf.Abs(xPOS) >= 9.9f){
				velocity = 0; //Kills velocity if it hits the bounds of the play area;
			}

			//transform.localPosition = new Vector3(xPOS, (Mathf.Sin(Time.time*bobbingSpeed)*bobbingAmount) + transform.localPosition.y, transform.localPosition.z); //For Bobbing
			transform.localPosition = new Vector3(xPOS, transform.localPosition.y, transform.localPosition.z);
		}

	}

	void OnTriggerEnter(Collider obj) {
		if(!isDead){
			if(obj.gameObject.transform.tag == "Wall"){
				Debug.Log("WALL HIT");
				Instantiate(Explode, gameObject.transform.localPosition, Quaternion.identity);
				GameMaster.SendMessage("GameOver");
				isDead = true;
				gameObject.GetComponent<Renderer>().enabled = false;
				MainModel.SetActive(false);
				//Destroy(gameObject);

			}else if(obj.gameObject.transform.tag == "Crab"){
				obj.gameObject.SendMessage("KillIt");
				GameMaster.AddCrabCount(1);

			}
		}
	}

	public bool IsDead(){
		return isDead;
	}
}
