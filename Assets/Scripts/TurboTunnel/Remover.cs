using UnityEngine;
using System.Collections;

public class Remover : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerEnter(Collider obj) {
		if(obj.gameObject.transform.tag == "Wall" || obj.gameObject.transform.tag == "Crab"){

			Destroy(obj.gameObject);
		}
	}
}
