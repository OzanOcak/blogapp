## Error: Can't set headers after they are sent to the client

we need to close connection to avoid memory leak

```javascript
finally {
    res.end();
  }
```

but to use bcrypt copy to object snd the connection and the second connection give same error.
to avoid the error, we can ignore eslint with below code in

```javascript
finally {
    eslint: {
    ignoreDuringBuilds: true,
  },
  }
```

we hash password and save user doc into db, we shouldn't use spread operator because it copies object's data and cause memory leak, and eslint give error

````javascript
    const hashedPassword = await bcrypt.hash(password, 8);
   /* const user = new User({ ...req.body password: hashedPassword });
             Error: Can't set headers after they are sent to the client*/
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();
```


## Cannot overwrite model once compiled Mongoose

Because we already created user schema we can not over write it so we need to export previous created one if it is exists.

```javascript
export default mongoose.models.User || mongoose.model("User", UserSchema);
````

## 400 Bad request error after changing the ip address

```json
{
  "hasError": true,
  "errorMessage": {
    "ok": 0,
    "code": 8000,
    "codeName": "AtlasError"
  }
}
```

the best way to fix this issue creating new admin user to connect to database
