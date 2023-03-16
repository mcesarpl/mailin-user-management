### **URL**

  **_/user/create_**

* **Method:**

  `PUT`

    ----
  
*  **URL Requirements**

    ----
    ----
    <br />
 
    **Example :**

   `/user/update`


    <br />

    _**Header**:_

    ```json
        {
            "authorization": "api_token",
            "x-access-token": "user_token"
        }
    ```

    _**Body**:_

    ```json
        {
          "_id":"231",
          "name": "test 2",
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