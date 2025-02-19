using UnityEngine;
using System.Collections;

public class Crab : MonoBehaviour {

	public GameObject CrabDeathEffect;
	public GameObject CrabModelPath;

	//private bool isDead = false;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void KillIt(){
		//isDead = true;
		Destroy(this.GetComponent<Collider>());
		Destroy(this.GetComponent<Rigidbody>());
		GameObject tempEffect = GameObject.Instantiate(CrabDeathEffect, this.transform.position, this.transform.rotation) as GameObject;
		tempEffect.transform.parent = gameObject.transform;
		CrabModelPath.GetComponent<Animation>().Play("CrabDeath");
		Destroy(this.gameObject,1);
	}
}
