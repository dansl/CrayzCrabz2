using UnityEngine;
using System.Collections;

public class SmashSound : MonoBehaviour {

	public AudioClip[] SmashSounds;

	// Use this for initialization
	void Start () {
		int rando = Random.Range(0, SmashSounds.Length);
		this.GetComponent<AudioSource>().clip = SmashSounds[rando];
		this.GetComponent<AudioSource>().Play();

		Destroy (gameObject, 3);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
