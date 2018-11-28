using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

/*
 * 
 * Add model in a place obj
 * 
 */
[System.Serializable]
public class Statics
{
    public int x;
    public int y;
    public int z;
    public float scale;
}

public class AddModel : MonoBehaviour {

    public GameObject placeObject;
    public GameObject itemObject;
    public Vector3 place;
    public float scale;

    private Vector3 scaleOfPlace;
    private Bounds boundForPlace;
    private Bounds boundForItem;

    //private JsonData data;

    string path;
    string jsonString;

	// Use this for initialization
	void Start () {
        placeObject.SetActive(true);
        itemObject.SetActive(true);

        boundForPlace = placeObject.GetComponent<MeshFilter>().mesh.bounds;
        boundForItem = placeObject.GetComponent<MeshFilter>().mesh.bounds;

        Debug.Log(boundForPlace);
        Debug.Log(boundForItem);

        path = Application.streamingAssetsPath + "/statics.json";
        Debug.Log(path);
        jsonString = File.ReadAllText(path);
        Statics data = JsonUtility.FromJson<Statics>(jsonString);

        place.x = data.x;
        place.y = data.y;
        place.z = data.z;
        scale = data.scale;

        //Debug.Log(data.scale);
        Vector3 fix = new Vector3(0, -boundForItem.center.y, 0);
        Vector3 scale3 = new Vector3(data.scale, data.scale, data.scale);

        placeObject.transform.position = -boundForPlace.center;
        itemObject.transform.position += fix + place;
        //itemObject.transform.position += place;
        itemObject.transform.localScale = scale3;
	}


    // Use this for update the position of item
    void Update()
    {
        //itemObject.transform.position = place + boundForPlace.center;
    }
}

