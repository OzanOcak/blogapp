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
