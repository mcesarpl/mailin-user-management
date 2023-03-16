### **URL**

  **_/user?params_**

* **Method:**

  `GET`

    ----
  
*  **URL Requirements**

    ----
    ----
    <br />
 
    **Example : Get All**

   `/user`

    **Example : Get with params**

   `/user?_id=231`


    <br />

    _**Header**:_

    ```json
        {
            "authorization": "api_token",
            "x-access-token": "user_token"
        }
    ```


    <br />

    ----

    ### **Success :**

    * **Code:** 200 <br />
      **Content:** `{["_id": 231, "name": "test", ...]},`

    ### **Unauthorized :**

    * **Code:** 400 <br />
      **Content:**

    ### **Unauthorized :**

    * **Code:** 401 <br />
      **Content:** `{ message: Unauthorized }`
 
    ### **Error :**

    * **Code:** 500 <br />
      **Content:** `{ error: Internal server Error }`

    <br />

    ----
    ----