#pragma strict

public class HealthBar extends MonoBehaviour {

	public var TextureArray:Texture[];
	
	private var curPercent:float = 0;
	
	public function SetPercentage(percentage:float){
		if(curPercent != percentage){
			curPercent = percentage;
			var textureToShow:int = Mathf.RoundToInt((TextureArray.Length-1) * percentage);
			textureToShow = textureToShow < 0 ? 0 : textureToShow;
			Debug.Log("textureToShow: "+textureToShow);
			this.GetComponent.<GUITexture>().texture = TextureArray[(textureToShow)];
			PlayAni();
		}
	}
	
	public function PlayAni(){
		GetComponent.<GUITexture>().color = Color.red;
		yield WaitForSeconds(0.3);
		GetComponent.<GUITexture>().color = Color.gray;
	}
}