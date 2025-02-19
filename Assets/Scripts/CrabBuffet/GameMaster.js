#pragma strict

public class GameMaster extends MonoBehaviour {

	public var crabCount:int = 0;
	public var CrabCountText:GUIText;
	public var PlayerHealthBar:HealthBar;
	public var GameOverPopup:GameObject;
	public var HighScoreText:GUIText;
	
	public var GameMusic:AudioClip;
	public var CrayzMusic:AudioClip;
	public var GameOverMusic:AudioClip;
	
	private var theMusicManager:GameObject;
	private var MainPlayer:MainPlayer;
	
	private var isGameOver:boolean = false;
	
	private var PlayerHighScore:int;
	
	public function Start(){
		var findGO: GameObject = GameObject.FindWithTag("Music");
		if(findGO){
			theMusicManager = findGO;
		}
		var findPlayer: GameObject = GameObject.FindWithTag("Player");
		if(findPlayer){
			MainPlayer = findPlayer.GetComponent("MainPlayer");
		}
		
		if(!PlayerPrefs.HasKey("HighScore")){
			PlayerPrefs.SetInt("HighScore", 0);
		}else{
			PlayerHighScore = PlayerPrefs.GetInt("HighScore");
		}
	}
	
	public function AddCrabCount(num:int){
		if(!MainPlayer.isDead){
			crabCount += num;
			CrabCountText.text = "Crabz: "+crabCount;
			CrabCountText.SendMessage("Awake");
		}
	}
	
	public function StartCrayzMusic(){
		theMusicManager.GetComponent.<AudioSource>().clip = CrayzMusic;
		theMusicManager.GetComponent.<AudioSource>().Play();
		yield WaitForSeconds(CrayzMusic.length);
		theMusicManager.GetComponent.<AudioSource>().clip = GameMusic;
		theMusicManager.GetComponent.<AudioSource>().Play();
	}
	
	public function FixedUpdate(){
		if(MainPlayer.isDead && !isGameOver){
			GameOver();
		}
		var playerHealth:float = (MainPlayer.CurHealth / MainPlayer.MaxHealth);
		if(playerHealth < 1){
			PlayerHealthBar.SetPercentage(playerHealth);
		}
	}
	
	public function GameOver(){
		isGameOver = true;
		if(crabCount > PlayerHighScore){
			PlayerHighScore = crabCount;
			PlayerPrefs.SetInt("HighScore", crabCount);
		}
		HighScoreText.GetComponent.<GUIText>().text = ("High Score: "+PlayerHighScore);
		//MainPlayer.gameObject.SetActive(false);
		theMusicManager.GetComponent.<AudioSource>().clip = GameOverMusic;
		theMusicManager.GetComponent.<AudioSource>().Play();
		GameOverPopup.SetActive(true);
		//yield WaitForSeconds(10);
		//Application.LoadLevel(0);
	}
	
}