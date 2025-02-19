#pragma strict

public class PlayerInputControls extends MonoBehaviour {
	
	/******* PUBLIC VARS ********/
	public var JoyPadLeft: GUITexture;
	public var JoyPadBGLeft: GUITexture;
	
	public var shootBG: GUITexture;
	
	/******* PRIVATE VARS ********/
	private var leftTouchZoneWidth : int;
	private var leftTouchZoneHeight : int;
	private var leftStickDown : boolean = false;
	private var leftStickBounds : Rect;
	private var leftStickCenter : Vector2;
	private var leftStickTouchId : int = -1;
	
	private var rightSideBounds:Rect;

	private var shootDown:boolean = false;
	private var shootTouchId : int = -1;
	
	private var theMainPlayer:MainPlayer;
	
	public function Start():void{
		var findMainPlayer:GameObject = GameObject.FindWithTag("Player");
		if(findMainPlayer != null)
			theMainPlayer = findMainPlayer.GetComponent(MainPlayer);
		
		//Sets default variables, and adjusts posision of joypads for certain screen sizes.
		
		leftTouchZoneWidth = JoyPadBGLeft.pixelInset.width;
		leftTouchZoneHeight = JoyPadBGLeft.pixelInset.height;
		
		leftStickBounds = new Rect(0, 0, Screen.width * 0.5, Screen.height);
		leftStickCenter = Vector2 (JoyPadBGLeft.pixelInset.x + (JoyPadBGLeft.pixelInset.width * 0.5), JoyPadBGLeft.pixelInset.y + (JoyPadBGLeft.pixelInset.height * 0.5));
		
		moveLeft(leftStickCenter.x, leftStickCenter.y);
		
		rightSideBounds = new Rect(Screen.width * 0.5, 0, Screen.width * 0.5, Screen.height);		
	}

	
	public function Update ():void{
		if(GameData.isGameStopped == false){
			if(GameData.useTouchControls){	
				//Touch Controls
				for (var touch : Touch in Input.touches) {
					if (touch.phase == TouchPhase.Began){
						if (!leftStickDown){
						
							leftStickCenter = Vector2 (touch.position.x, touch.position.y); //For setting the center of the joystick to where the finger touched down
							leftStickDown = IsThumbInsideBounds(touch.position, leftStickBounds);
							if (leftStickDown){
							
								//User is touching in the bounds of the Stick, so we move the joypad graphic
								showLeft();
								leftStickTouchId = touch.fingerId;
								moveLeft(touch.position.x, touch.position.y);
								
								var tempX:float = touch.position.x - (JoyPadBGLeft.GetComponent.<GUITexture>().pixelInset.width * 0.5);
								var tempY:float = touch.position.y - (JoyPadBGLeft.GetComponent.<GUITexture>().pixelInset.height * 0.5);
								
								JoyPadBGLeft.GetComponent.<GUITexture>().pixelInset.x = tempX;
								JoyPadBGLeft.GetComponent.<GUITexture>().pixelInset.y = tempY;
								continue;
							}
						}
						
					
						
						if(!shootDown && IsThumbInsideBounds(touch.position, rightSideBounds)){
							
							shootDown = true;
							shootTouchId = touch.fingerId;
							showShoot();
							
							var tempShootX:float = touch.position.x - (shootBG.GetComponent.<GUITexture>().pixelInset.width * 0.5);
							var tempShootY:float = touch.position.y - (shootBG.GetComponent.<GUITexture>().pixelInset.height * 0.5);
							
							shootBG.GetComponent.<GUITexture>().pixelInset.x = tempShootX;
							shootBG.GetComponent.<GUITexture>().pixelInset.y = tempShootY;
							
							theMainPlayer.Attack();
						}
					}else if (touch.phase == TouchPhase.Moved){
						
						if (leftStickDown && leftStickTouchId == touch.fingerId){
							
							//Move the left joypad and apply movement to main character
							
							moveLeft(touch.position.x, touch.position.y);
							var lDiff : Vector2 = touch.position - leftStickCenter;
							
							var minYDistance:int = 1; //min before applying movement 
							var maxYDistance:int = 80; //Max before going full speed
							var minXDistance:int = 40;
							var maxXDistance:int = 80;
							
							var XMovementAmount:float = 0;
							var YMovementAmount:float = 0;
							
							var xPOS:float = lDiff.x;
							
							var yPOS:float = lDiff.y;
							
							if(Mathf.Abs(xPOS) > minXDistance && Mathf.Abs(xPOS) < maxXDistance){
								XMovementAmount = xPOS > 0 ? 0.5 : -0.5;
							}else if(Mathf.Abs(xPOS) > maxXDistance){
								XMovementAmount = xPOS > 0 ? 1 : -1;
							}
							
							if(Mathf.Abs(yPOS) > minYDistance && Mathf.Abs(yPOS) < maxYDistance){
								YMovementAmount = yPOS > 0 ? 0.5 : -0.5;
							}else if(Mathf.Abs(yPOS) > maxYDistance){
								YMovementAmount = yPOS > 0 ? 1 : -1;
							}
							
							if(Mathf.Abs(xPOS) > minXDistance){
								theMainPlayer.SetMovementX(XMovementAmount);
							}else{
								theMainPlayer.SetMovementX(0);
							}
							
							if(Mathf.Abs(yPOS) > minYDistance){
								theMainPlayer.SetMovementY(YMovementAmount);
							}else{
								theMainPlayer.SetMovementY(0);
							}
							
						}
						
					}
					else if (touch.phase == TouchPhase.Stationary){
						
					}
					else if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled){
						// release left stick
						if (leftStickDown && leftStickTouchId == touch.fingerId){
							LeftTouchEnd();
						}
						
						//End drag rotation
						if (shootDown && shootTouchId == touch.fingerId){
							ShootEnd();
						}
					}
				}
			}else{
				JoyPadLeft.enabled = false;
				JoyPadBGLeft.enabled = false;
				shootBG.enabled = false;
				
				//PC Controls
				theMainPlayer.SetMovementX(Input.GetAxis ("Horizontal"));
				theMainPlayer.SetMovementY(Input.GetAxis ("Vertical"));

				if(Input.GetKeyDown("space")){
					theMainPlayer.Attack();
				}
				
			}
		}else{
			
			LeftTouchEnd();
			ShootEnd();
							
		}
	}
	
	/******* PRIVATE METHODS ********/
	private function hideLeft(){
		JoyPadLeft.enabled = false;
		JoyPadBGLeft.enabled = false;
	}
	
	private function showLeft(){
		JoyPadLeft.enabled = true;
		JoyPadBGLeft.enabled = true;
	}
	
	private function hideShoot(){
		shootBG.enabled = false;
	}
	
	private function showShoot(){
		shootBG.enabled = true;
	}
	
	private function LeftTouchEnd(){
		leftStickDown = false;
		theMainPlayer.SetMovementX(0);
		theMainPlayer.SetMovementY(0);
		leftStickTouchId = -1;
		moveLeft(leftStickCenter.x, leftStickCenter.y);
		hideLeft();
	}
	
	private function ShootEnd(){
		shootDown = false;
		shootTouchId = -1;
		hideShoot();
	}
	
	//Tests if the touch is within the bounds
	private function IsThumbInsideBounds (touchPosition : Vector2, analogBounds : Rect):boolean{
		return (analogBounds.Contains (touchPosition));
	}
	
	//Moves the left joypad graphic
	private function moveLeft(xPOS:float, yPOS:float):void {
		var tempX:float = xPOS - (JoyPadLeft.GetComponent.<GUITexture>().pixelInset.width * 0.5);
		var tempY:float = yPOS - (JoyPadLeft.GetComponent.<GUITexture>().pixelInset.height * 0.5);
		
		tempX = Mathf.Clamp(tempX, leftStickCenter.x - JoyPadLeft.GetComponent.<GUITexture>().pixelInset.width, leftStickCenter.x);
		tempY = Mathf.Clamp(tempY, leftStickCenter.y - JoyPadLeft.GetComponent.<GUITexture>().pixelInset.height, leftStickCenter.y);
		
		JoyPadLeft.GetComponent.<GUITexture>().pixelInset.x = tempX;
		JoyPadLeft.GetComponent.<GUITexture>().pixelInset.y = tempY;
	}
	
}
