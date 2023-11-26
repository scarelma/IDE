from dependencies.http_initializer import codeClient



if __name__=="__main__":
    # languages = codeClient.get_languages()
    # for i in languages.json():
    #     print(i['Name'], end=' ')
    #     print(i['Id'], end=' ')

    response = codeClient.post_code_to_reciever({
        "langnumber": 1,
        "code": "print(\"hello this is miracle\")\n",
        "input": ""
    })
    print(response.json()['output'])