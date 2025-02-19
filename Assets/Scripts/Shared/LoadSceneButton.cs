using UnityEngine;
using System.Collections;

public class LoadSceneButton : MonoBehaviour {

	public string SceneToLoad;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnMouseDown(){
		Application.LoadLevel(SceneToLoad);
	}
}
