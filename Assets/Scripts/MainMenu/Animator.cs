using UnityEngine;
using System.Collections;

public class Animator : MonoBehaviour {

	public GameObject Title;
	public GameObject Level1;
	public GameObject Level2;

	// Use this for initialization
	void Start () {
		Title.transform.position = new Vector3(0,1,Title.transform.position.z);
		Level1.transform.position = new Vector3(-1.5f,0,Title.transform.position.z);
		Level2.transform.position = new Vector3(1,0,Title.transform.position.z);
	
		iTween.MoveTo(Title, iTween.Hash("position", new Vector3(0,0,Title.transform.position.z), "time",3, "easetype","easeOutBounce"));
		iTween.MoveTo(Level1, iTween.Hash("position", new Vector3(0,0,Title.transform.position.z), "time",3, "delay", 1, "easetype","easeOutElastic"));
		iTween.MoveTo(Level2, iTween.Hash("position", new Vector3(0,0,Title.transform.position.z), "time",3, "delay", 1.5,"easetype","easeOutElastic"));

	}

	// Update is called once per frame
	void Update () {
	
	}
}
