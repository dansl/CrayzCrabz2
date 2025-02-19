#pragma strict

@script RequireComponent(GUITexture)
@script ExecuteInEditMode()

public class HUDElementTexture extends MonoBehaviour {

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
	public var ScaleFullProportionally:boolean = false;
	public var ScaleFullAmount:Vector2 = new Vector2(1,1); //Percent of screen to fill

	//Sizing variables
	protected var minAtScreenHeight:float = 384;// at what screen height should the texture be it's preset size (as setup in the inspector)?
	protected var maxAtScreenHeight:float = 1536;// at what screen height should the texture be fully scaled by maxFactor? 
	protected var minFactor:float = 0.5;
	protected var maxFactor:float = 1;
	protected var scaleFactor:float = 0.0;
	
	protected var thisGUItex:GUITexture;
	
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
		
		//this.transform.localScale = Vector3(0,0,0);
		
		ScreenWidth = Screen.width;
		ScreenHeight = Screen.height;
		
		
		
		ScaleIt();
		PositionIt();
	}
	
	protected function GetGUIComponent(){
		thisGUItex = this.GetComponent(GUITexture);
		
		thisGUItex.pixelInset.width = thisGUItex.texture.width;
		thisGUItex.pixelInset.height = thisGUItex.texture.height;
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
			thisGUItex.pixelInset.y = (ScreenHeight-thisGUItex.pixelInset.height)-offsetY;
		}
		
		if(AnchorRight){
			thisGUItex.pixelInset.x = (ScreenWidth-thisGUItex.pixelInset.width)-offsetX;
		}
		
		if(AnchorBottom){
			thisGUItex.pixelInset.y = offsetY;
		}
		
		if(AnchorLeft){
			thisGUItex.pixelInset.x = offsetX;
		}
		
		if(CenterX){
			thisGUItex.pixelInset.x = (ScreenWidth*0.5)-(thisGUItex.pixelInset.width*0.5)+offsetX;
		}
		
		if(CenterY){
			thisGUItex.pixelInset.y = (ScreenHeight*0.5)-(thisGUItex.pixelInset.height*0.5)+offsetY;
		}
	}
	
	protected function ScaleIt(){
		
        if(ScaleFullProportionally == true){
        	//Scaled image fully and proportionally
			var maxWidth:float = ScreenWidth * ScaleFullAmount.x;
			var maxHeight:float = ScreenHeight * ScaleFullAmount.y;
			var ratio:float = 0;
			var width:float = thisGUItex.pixelInset.width; 
			var height:float = thisGUItex.pixelInset.height;
			
			//if(ScaleFullX == true){
				
				ratio = maxWidth / width;
				thisGUItex.pixelInset.width = maxWidth;
				thisGUItex.pixelInset.height = (height * ratio);
				height = height * ratio;
				width = width * ratio;
				
			//}
			
			
			/*if(ScaleFullY == true){
				ratio = maxHeight / height;
				thisGUItex.pixelInset.height = maxHeight;
				thisGUItex.pixelInset.width = (width * ratio);
				width = width * ratio;
			}*/
		}else{
        
			if(ScaleFullX == true){
				thisGUItex.pixelInset.width = (ScreenWidth * ScaleFullAmount.x);
			}else{
				thisGUItex.pixelInset.width *= GetScaleFactor();	
			}
			
			if(ScaleFullY == true){
				thisGUItex.pixelInset.height = (ScreenHeight * ScaleFullAmount.y);
			}else{
				thisGUItex.pixelInset.height *= GetScaleFactor();	
			}
		}
		
		
	}
	
	protected function GetScaleFactor():float{
		
		if(scaleFactor == 0){
			var factor = Mathf.InverseLerp(minAtScreenHeight, maxAtScreenHeight, Screen.height);
			scaleFactor = Mathf.Lerp(minFactor, maxFactor, factor);
			
		}
		//Debug.Log("Scale Factor: "+scaleFactor);
		return scaleFactor;
	}
		
}