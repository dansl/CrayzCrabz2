using UnityEditor;
using UnityEngine;
using System.Collections;
 
public class MyTools : MonoBehaviour {

	[MenuItem("My Tools/Clear All Player Data")] 
	static void ClearBTLPrefs() { 
		PlayerPrefs.DeleteAll();
	} 

}