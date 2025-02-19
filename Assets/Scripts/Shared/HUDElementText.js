#pragma strict

@script RequireComponent(GUIText)
@script ExecuteInEditMode()

public class HUDElementText extends MonoBehaviour {

	enum AmountType {Pixel, Percent}
	
	public var AnchorTop:boolean = false;
	public var AnchorRight:boolean = false;
	public var AnchorBottom:boolean = false;
	public var AnchorLeft:boolean = false;
	public var CenterX:boolean = false;
	public var CenterY:boolean = false;
	public var AnchorOffsetAmountType:AmountType;
	public var AnchorOffsetAmount:Vector2;
	
	public var ScaleFullX:boolean = false;
	public var ScaleFullY:boolean = false;
	public var ScaleFullAmount:Vector2 = new Vector2(1,1); //Percent of screen to fill
	
	public var minFontSize:float = 50;
	public var maxFontSize:float = 100;

	//Sizing variables
	protected var minAtScreenHeight:float = 384;// at what screen height should the texture be it's preset size (as setup in the inspector)?
	protected var maxAtScreenHeight:float = 1536;// at what screen height should the texture be fully scaled by maxFactor?
	protected var minFactor:float = 0.5;
	protected var maxFactor:float = 1;
	
	protected var thisGUItex:GUIText;
	protected var scaleFactor:float = 0.0;
	//protected var newFontSize:float = 0.0;
	protected var textRect:Rect;
	
	protected var ScreenWidth:float;
	protected var ScreenHeight:float;

	public function Awake () {
		GetGUIComponent();
		
		if(this.transform.parent != null){
			//Debug.Log("PARENT:"+this.transform.parent);
			this.transform.position = Vector3(this.transform.parent.transform.position.x,this.transform.parent.transform.position.y,this.transform.position.z); //Keeps z-position set in Unity Editor, sets others to 0
		}else{
			this.transform.position = Vector3(0,0,this.transform.position.z); //Keeps z-position set in Unity Editor, sets others to 0
		}
		this.transform.rotation.eulerAngles = Vector3(0,0,0);
		
		ScreenWidth = Screen.width;
		ScreenHeight = Screen.height;
		
		ScaleIt();
		PositionIt();
		
		GetComponent.<GUIText>().anchor = TextAnchor.LowerLeft;
	}
	
	protected function GetGUIComponent(){
		thisGUItex = this.GetComponent(GUIText);
	}
	
	protected function PositionIt(){
		
		var offsetX:float;
		var offsetY:float;
		if(AnchorOffsetAmountType == AmountType.Pixel){
			offsetX = (AnchorOffsetAmount.x * GetScaleFactor());
			offsetY = (AnchorOffsetAmount.y * GetScaleFactor());
		}else if(AnchorOffsetAmountType == AmountType.Percent){
			offsetX = (ScreenWidth * (AnchorOffsetAmount.x));
			offsetY = (ScreenHeight * (AnchorOffsetAmount.y));
			//Debug.Log("OFFSET X: "+offsetX);
		}
		
		if(AnchorTop){
			thisGUItex.pixelOffset.y = (ScreenHeight-textRect.height)-offsetY;
		}
		
		if(AnchorRight){
			thisGUItex.pixelOffset.x = (ScreenWidth-textRect.width)-offsetX;
		}
		
		if(AnchorBottom){
			thisGUItex.pixelOffset.y = offsetY;
		}
		
		if(AnchorLeft){
			thisGUItex.pixelOffset.x = offsetX;
		}
		
		if(CenterX){
			thisGUItex.pixelOffset.x = (ScreenWidth*0.5)-(textRect.width*0.5)+offsetX;
		}
		
		if(CenterY){
			thisGUItex.pixelOffset.y = (ScreenHeight*0.5)-(textRect.height*0.5)+offsetY;
		}
	}
	
	protected function ScaleIt(){
		thisGUItex.fontSize = GetFontSize();
		textRect = thisGUItex.GetScreenRect();
	}
	
	protected function GetFontSize () : float{
		var newFontSize:int = 0;
		
		if(newFontSize == 0){
			var factor = Mathf.InverseLerp(minAtScreenHeight, maxAtScreenHeight, Screen.height);
			newFontSize = Mathf.Lerp(minFontSize, maxFontSize, factor);
			
			newFontSize = newFontSize > maxFontSize ? maxFontSize : newFontSize;
			newFontSize = newFontSize < minFontSize ? minFontSize : newFontSize;
			
		}
		//Debug.Log('FONT SIZE:' +newFontSize+ " "+maxFontSize);
		return newFontSize;
	}
	
	public function GetScaleFactor():float{
		
		if(scaleFactor == 0){
			var factor = Mathf.InverseLerp(minAtScreenHeight, maxAtScreenHeight, Screen.height);
			scaleFactor = Mathf.Lerp(minFactor, maxFactor, factor);
			
		}
		
		return scaleFactor;
	}
}