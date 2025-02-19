using UnityEngine;
using System.Collections;

public static class GameData {

	public static bool isGameStopped = false;
	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE
	public static bool useTouchControls = false;
	#else
	public static bool useTouchControls = true;
	#endif

}
