### **URL**

  **_/user/delete/:id_**
  **_/user/hard-delete/:id_**

* **Method:**

  `DELETE`

    ----
  
*  **URL Requirements**

    ----
    ----
    <br />
 
    **Example : Sof delete**

    Turns the enable property into false

   `/user/delete/231`

       **Example : Hard delete**
       **Example : must have high permission level**

    Delete the user

   `/user/hard-delete/231`


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
      **Content:**

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