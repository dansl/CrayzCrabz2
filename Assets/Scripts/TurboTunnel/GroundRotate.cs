using UnityEngine;
using System.Collections;

public class GroundRotate : MonoBehaviour {

	public GameObject WallObj;
	public GameObject CrabObj;

	private float RotationSpeed = 60f;

	private float WallGenTimer = 0f;
	private float WallGenTimeTrigger = 2f;

	//private float SpeedUpTimer = 0f;
	//private float SpeedUpTimeTrigger = 5f;

	private float CrabGenTimer = 0f;
	private float CrabGenTimeTrigger = 0.5f;

	// Use this for initialization
	void Start () {
		GenerateWalls();
		WallGenTimer = Time.time;
		CrabGenTimer = Time.time;
		//SpeedUpTimer = Time.time;
	}
	
	// Update is called once per frame
	void Update () {
		/*if(Time.time >= SpeedUpTimer+SpeedUpTimeTrigger){
			SpeedUpTimer = Time.time;
			RotationSpeed += 3;
		}*/

		if(Time.time >= WallGenTimer+WallGenTimeTrigger){
			WallGenTimer = Time.time;
			CrabGenTimer = Time.time;

			GenerateWalls();
		}

		if(Time.time >= CrabGenTimer+CrabGenTimeTrigger){
			CrabGenTimer = Time.time;
			
			GenerateCrab();
		}


		transform.Rotate(0, Time.deltaTime*RotationSpeed, 0);
	}

	void GenerateWalls(){
		int wallAmount = Random.Range(1,4);
		for(int i = 0; i < wallAmount; i++){
			float rando = Random.Range(-10, 10);
			GameObject newWall = (GameObject)Instantiate(WallObj, new Vector3(rando,0,7), Quaternion.identity);
			newWall.transform.parent = gameObject.transform;
		}
	}

	void GenerateCrab(){
		float rando = Random.Range(-10, 10);
		GameObject newCrab = (GameObject)Instantiate(CrabObj, new Vector3(rando,0,5), Quaternion.Euler(new Vector3(-90, -180, 0)));
		newCrab.transform.parent = gameObject.transform;

	}
}
