# 🔭 telescope

A web server that takes screenshots of web pages. Useful for dynamic Open Graph images.

## Install

1. Clone this repository
2. `yarn start`

## Start server

```
yarn start
```

The server will start running on port 3000.

## Screenshot

Generate screenshots by passing the parameters to the endpoint:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `url`     | Website to take screenshot of (needs protocol e.g. `http://`) | **Required** |
| `width`   | Image width | `1280` |
| `height`  | Image height | `800` |
| `dpi` (integers only)     | Image DPI (integers only) | `1` |

### Example
```
http://localhost:3000?url=https://quartzo.studio&w=1280&h=640&dpi=2
```

#### Result
![image](https://github.com/user-attachments/assets/7be06d2d-9c0c-4dd8-8ae2-d9b648b77f9d)


