### **URL**

  **_/auth/login_**

* **Method:**

  `POST`

    ----
  
*  **URL Requirements**

    ----
    ----
    <br />
 
    **Example :**

   `/auth/login`


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
          "username": "test",
          "password": "test123",
        }
    ```


    <br />

    ----

    ### **Success :**

    * **Code:** 200 <br />
      **Content:** `{"token": "eyJhbGciOiJ"},`

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