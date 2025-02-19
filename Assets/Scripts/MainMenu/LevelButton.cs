using UnityEngine;
using System.Collections;

public class LevelButton : MonoBehaviour {

	public string SceneName;
	public int LevelNumber;
	public string HighScroreRefName;

	// Use this for initialization
	void Start () {
		if(PlayerPrefs.HasKey(HighScroreRefName)){
			int highscore = PlayerPrefs.GetInt(HighScroreRefName);
			this.GetComponent<GUIText>().text = "CLICK TO PLAY LEVEL"+LevelNumber+": High Score= "+highscore;
		}else{
			this.GetComponent<GUIText>().text = "CLICK TO PLAY LEVEL"+LevelNumber;
		}
		gameObject.GetComponent<GUIText>().SendMessage("Awake");
	}
	
	// Update is called once per frame
	void OnMouseDown () {
		Application.LoadLevel(SceneName);
	}
}
