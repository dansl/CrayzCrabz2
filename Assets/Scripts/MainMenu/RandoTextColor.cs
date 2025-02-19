using UnityEngine;
using System.Collections;

public class RandoTextColor : MonoBehaviour {

	private float timer;
	private float changeTime = 0.25f;

	private Color[] randoColor = {Color.black, Color.blue, Color.cyan, Color.grey, Color.green, Color.magenta, Color.red, Color.white, Color.yellow};

	// Use this for initialization
	void Start () {
		timer = Time.time+changeTime;
	}
	
	// Update is called once per frame
	void Update () {
		if(Time.time >= timer){
			timer = Time.time + changeTime;
			int rando = Random.Range(0,randoColor.Length);
			gameObject.GetComponent<GUIText>().color = randoColor[rando];
		}
	}
}
