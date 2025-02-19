using UnityEngine;
using System.Collections;

public class TurboTunnelGameMaster : MonoBehaviour {

	public int crabCount = 0;
	public GUIText CrabCountText;
	public GameObject GameOverPopup;
	public GUIText HighScoreText;

	public AudioClip GameMusic;
	public AudioClip GameOverMusic;

	private GameObject theMusicManager;
	private Player MainPlayer;
	
	//private bool isGameOver = false;
	
	private int PlayerHighScore;

	// Use this for initialization
	void Start () {
		GameObject findGO  = GameObject.FindWithTag("Music");
		theMusicManager = findGO;
		
		GameObject findPlayer  = GameObject.FindWithTag("Player");
		MainPlayer = findPlayer.GetComponent<Player>();

		
		if(!PlayerPrefs.HasKey("TurboTunnelHighScore")){
			PlayerPrefs.SetInt("TurboTunnelHighScore", 0);
		}else{
			PlayerHighScore = PlayerPrefs.GetInt("TurboTunnelHighScore");
		}
	}

	public void AddCrabCount(int num){
		if(!MainPlayer.IsDead()){
			crabCount += num;
			CrabCountText.text = "Crabz: "+crabCount;
			CrabCountText.SendMessage("Awake");
		}
	}

	// Update is called once per frame
	void Update () {
	
	}

	public void GameOver(){
		//isGameOver = true;
		if(crabCount > PlayerHighScore){
			PlayerHighScore = crabCount;
			PlayerPrefs.SetInt("TurboTunnelHighScore", crabCount);
		}
		HighScoreText.GetComponent<GUIText>().text = ("High Score: "+PlayerHighScore);
		//MainPlayer.gameObject.SetActive(false);
		theMusicManager.GetComponent<AudioSource>().clip = GameOverMusic;
		theMusicManager.GetComponent<AudioSource>().Play();
		GameOverPopup.SetActive(true);
		//yield WaitForSeconds(10);
		//Application.LoadLevel(0);
	}
}
