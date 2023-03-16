### **URL**

  **_/user/create_**

* **Method:**

  `POST`

    ----
  
*  **URL Requirements**

    ----
    ----
    <br />
 
    **Example :**

   `/user/create`


    <br />

    _**Header**:_

    ```json
        {
            "authorization": "api_token"
        }
    ```

    _**Body**:_

    ```json
        {
          "name": "test",
          "username": "test",
          "birthDate": "03/20/1995",
          "email": "test@email.com",
          "password": "test123",
          "level": "standard",
          "enable": true
        }
    ```


    <br />

    ----

    ### **Success :**

    * **Code:** 200 <br />
      **Content:** `{"_id": 231, "name": "test", ...},`

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